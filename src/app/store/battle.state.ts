import { Injectable } from "@angular/core";
import { Action, NgxsOnInit, Selector, State, StateContext, Store } from "@ngxs/store";
import { BattleActions } from "./battle.action";
import { catchError, Observable, tap } from "rxjs";
import { BattleService } from "../services/battleService.service";
import { GamePlayerModel, GamesModel, PlayerModel, PlayerNumber, ScoresModel } from "../models/bataille.model";
import { LoadingActions } from "./loading.action";
import { MatSnackBar } from "@angular/material/snack-bar";

interface BattleStateModel {
  games: GamesModel[],
  players: PlayerModel[],
  player1: GamePlayerModel | undefined
  player2: GamePlayerModel | undefined
}

@State<BattleStateModel>({
  name: 'Battle_state',
  defaults: {
    games: [],
    players: [],
    player1: undefined,
    player2: undefined,
  }
})

@Injectable()
export class BattleState implements NgxsOnInit {

  constructor(
    private battleService: BattleService,
    private store: Store,
    private snackBar: MatSnackBar
  ) {
  }

  @Selector()
  static games(model: BattleStateModel): GamesModel[] {
    return model.games;
  }

  @Selector()
  static players(model: BattleStateModel): PlayerModel[] {
    return model.players;
  }

  @Selector()
  static player1(model: BattleStateModel): GamePlayerModel | undefined {
    return model.player1;
  }

  @Selector()
  static player2(model: BattleStateModel): GamePlayerModel | undefined {
    return model.player2;
  }


  ngxsOnInit(): void {
    this.store.dispatch([
      new LoadingActions.SetScoresLoading(true),
      new BattleActions.GetScores(),
      new BattleActions.GetPlayers()
    ]).subscribe(() => {
      this.store.dispatch(new LoadingActions.SetScoresLoading(false));
    })
  }

  @Action(BattleActions.GetScores)
  getScores(ctx: StateContext<BattleStateModel>): Observable<GamesModel[]> {
    return this.battleService.getScores().pipe(
      tap((games: GamesModel[]) => {
        ctx.patchState({
          games
        });
      }),
      catchError(error => {
        this.snackBar.open('Erreur lors de la récupération des scrores', '', {
          duration: 3000,
          panelClass: ['snack']
        });
        this.store.dispatch(new LoadingActions.SetPlayersLoading(false));
        throw error;
      })
    );
  }

  @Action(BattleActions.GetPlayers)
  getPlayers(ctx: StateContext<BattleStateModel>): Observable<PlayerModel[]> {
    return this.battleService.getPlayers().pipe(
      tap((players: PlayerModel[]) => {
        ctx.patchState({
          players
        });
      }),
      catchError(error => {
        this.snackBar.open('Erreur lors de la récupération des joueurs', '', {
          duration: 3000,
          panelClass: ['snack']
        });
        this.store.dispatch(new LoadingActions.SetPlayersLoading(false));
        throw error;
      })
    );
  }

  @Action(BattleActions.AddPlayer)
  addPlayer(ctx: StateContext<BattleStateModel>, { player, playerNumber }: BattleActions.AddPlayer): Observable<PlayerModel> {
    return this.battleService.addPlayers(player).pipe(
      tap((playerResponse: PlayerModel) => {
        const state = ctx.getState();
        const newPlayer: GamePlayerModel = {
          id: playerResponse.id,
          name: playerResponse.name,
          cards: [],
          score: 0
        }
        ctx.setState({
          ...state,
          players: [...state.players, playerResponse],
          player1: playerNumber === PlayerNumber.PLAYER1 ? newPlayer : state.player1,
          player2: playerNumber === PlayerNumber.PLAYER2 ? newPlayer : state.player2
        });
      }),
      catchError(error => {
        this.snackBar.open('Erreur lors de l\'ajout d\'un nouveau joueur', '', {
          duration: 3000,
          panelClass: ['snack']
        });
        this.store.dispatch(new LoadingActions.SetPlayersLoading(false));
        throw error;
      })
    );
  }

  @Action(BattleActions.AddScores)
  addScores(ctx: StateContext<BattleStateModel>, { scores }: BattleActions.AddScores): Observable<GamesModel> {
    return this.battleService.addScores(scores).pipe(
      tap((gameResponse: GamesModel) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          games: [...state.games, gameResponse]
        });
      }),
      catchError(error => {
        this.snackBar.open('Erreur lors de l\'ajout d\'un nouveau score', '', {
          duration: 3000,
          panelClass: ['snack']
        });
        this.store.dispatch(new LoadingActions.SetPlayersLoading(false));
        throw error;
      })
    );
  }

  @Action(BattleActions.ResetPlayers)
  resetPlayer(ctx: StateContext<BattleStateModel>) {
    ctx.patchState({
      player1: undefined,
      player2: undefined
    });
  }


}
