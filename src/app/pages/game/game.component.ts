import { Component, OnInit } from '@angular/core';
import { Card, GamePlayerModel, PlayerModel, PlayerNumber, ScoresModel } from '../../models/bataille.model';
import { CardService } from '../../services/cardService.service'
import { combineLatest, filter } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EndGameModalComponent } from '../../components/endGameModal/endGameModal.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { BattleActions } from 'src/app/store/battle.action';
import { BattleState } from 'src/app/store/battle.state';
import { LoadingActions } from 'src/app/store/loading.action';
import { LoadingState } from 'src/app/store/loading.state';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {

  playersList!: PlayerModel[];
  player1!: GamePlayerModel;
  player2!: GamePlayerModel;
  winner: string | undefined;
  deck: Card[] = this.cardService.createDeck();
  cardPlayer1: Card | null = null;
  cardPlayer2: Card | null = null;
  isPlayersLoading = false;

  playersForm = new FormGroup({
    player1: new FormControl<string | undefined>(undefined, Validators.required),
    player2: new FormControl<string | undefined>(undefined, Validators.required)
  });

  constructor(
    private cardService: CardService,
    private dialog: MatDialog,
    private store: Store,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.cardService.winner$.pipe(filter(Boolean))
      .subscribe(winner => {
        this.winner = winner;
        if (this.player1.id && this.player2.id) {
          const newScores: ScoresModel[] = [
            {
              playerId: this.player1.id,
              score: this.player1.score
            },
            {
              playerId: this.player2.id,
              score: this.player2.score
            }
          ]
          this.store.dispatch(new BattleActions.AddScores(newScores));
        };
      })

    combineLatest([
      this.store.select(BattleState.players),
      this.store.select(BattleState.player1),
      this.store.select(BattleState.player2),
    ]).subscribe(([players, player1, player2]) => {
      this.playersList = players;
      if (player1 && player2) {
        [this.player1, this.player2] = this.cardService.deal(this.deck, player1, player2);
        this.store.dispatch(new LoadingActions.SetPlayersLoading(false))
      }
    })

    this.store.select(LoadingState.playersLoading).subscribe(isPlayersLoading => this.isPlayersLoading = isPlayersLoading);
  }

  retry() {
    this.cardPlayer1 = null;
    this.cardPlayer2 = null;
    this.cardService.winnerSubject.next(null);
    this.deck = this.cardService.createDeck();
    [this.player1, this.player2] = this.cardService.deal(this.deck, this.player1, this.player2);
  }

  playRound() {
    this.cardPlayer1 = this.player1.cards[0];
    this.cardPlayer2 = this.player2.cards[0];
    this.cardService.playRound(this.player1, this.player2);
    if (this.player1.cards.length === 0 && this.player2.cards.length === 0) {
      if (this.player1.score === this.player2.score) {
        this.cardService.winnerSubject.next(null);
        this.openDialog(true);
      } else {
        this.openDialog(false)
      }
    }
  }

  openDialog(equality: boolean): void {
    const dialogRef = this.dialog.open(EndGameModalComponent, {
      disableClose: true,
      data: { equality }
    });
    dialogRef.afterClosed().subscribe(() => this.retry());
  }

  savePlayers() {
    if (this.playersForm.controls.player1.value && this.playersForm.controls.player2.value) {
      const player1Name: string = this.playersForm.controls.player1.value;
      const player2Name: string = this.playersForm.controls.player2.value;
      const isPlayer1Exist: boolean = !!this.playersList.find(players => players.name === this.playersForm.controls.player1.value);
      const isPlayer2Exist: boolean = !!this.playersList.find(players => players.name === this.playersForm.controls.player2.value);
      if (isPlayer1Exist) {
        this.snackBar.open('Le joueur 1 exist déjà', '', {
          duration: 3000,
          panelClass: ['snack']
        })
      }
      if (isPlayer2Exist) {
        this.snackBar.open('Le joueur 2 exist déjà', '', {
          duration: 3000,
          panelClass: ['snack']
        })
      }
      if (!isPlayer1Exist && !isPlayer2Exist) {
        this.store.dispatch([
          new LoadingActions.SetPlayersLoading(true),
          new BattleActions.AddPlayer({ name: player1Name }, PlayerNumber.PLAYER1),
          new BattleActions.AddPlayer({ name: player2Name }, PlayerNumber.PLAYER2),
        ]).subscribe();
      }
    }
  }

}
