const ACTION_SCOPE = '[LOADING] -';

export namespace LoadingActions {

  export class SetScoresLoading {
    static readonly type = `${ACTION_SCOPE} Set scores loading`;
    constructor(
      public isScoresLoading: boolean
    ) { }
  }

  export class SetPlayersLoading {
    static readonly type = `${ACTION_SCOPE} Set players loading`;
    constructor(
      public isPlayersLoading: boolean
    ) { }
  }
}
