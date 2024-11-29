import { Component, type OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { combineLatest } from 'rxjs';
import { GamesModel, PlayerModel } from 'src/app/models/bataille.model';
import { BattleActions } from 'src/app/store/battle.action';
import { BattleState } from 'src/app/store/battle.state';
import { LoadingState } from 'src/app/store/loading.state';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss'],
})
export class ScoresComponent implements OnInit {

  scoresList!: GamesModel[];
  playersList!: PlayerModel[];
  isScoresLoading = false;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new BattleActions.ResetPlayers());
    combineLatest([
      this.store.select(BattleState.games),
      this.store.select(BattleState.players),
    ]).subscribe(([scores, players]) => {
      this.scoresList = scores;
      this.playersList = players;
    });

    this.store.select(LoadingState.scoresLoading).subscribe(isScoresLoading => this.isScoresLoading = isScoresLoading);
  }

  getPlayerName(playerId: number) {
    return this.playersList.find(player => player.id === playerId)?.name.toUpperCase();
  }

}
