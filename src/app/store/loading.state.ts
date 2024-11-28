import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Observable, of } from "rxjs";
import { LoadingActions } from "./loading.action";

interface LoadingStateModel {
  scoresLoading: boolean,
  playersLoading: boolean,
}

@State<LoadingStateModel>({
  name: 'Loading_state',
  defaults: {
    scoresLoading: false,
    playersLoading: false,
  }
})

@Injectable()
export class LoadingState {

  @Selector()
  static scoresLoading(model: LoadingStateModel): boolean {
    return model.scoresLoading;
  }

  @Selector()
  static playersLoading(model: LoadingStateModel): boolean {
    return model.playersLoading;
  }


  @Action(LoadingActions.SetScoresLoading)
  setScoresLoading(ctx: StateContext<LoadingStateModel>, { isScoresLoading }: LoadingActions.SetScoresLoading): Observable<boolean> {
    ctx.patchState({
      scoresLoading: isScoresLoading
    });
    return of();
  }

  @Action(LoadingActions.SetPlayersLoading)
  setPlayersLoading(ctx: StateContext<LoadingStateModel>, { isPlayersLoading }: LoadingActions.SetPlayersLoading): Observable<boolean> {
    ctx.patchState({
      playersLoading: isPlayersLoading
    });
    return of();
  }


}
