import { PlayerModel, PlayersRequestModel, ScoresModel } from "../models/bataille.model";

const ACTION_SCOPE = '[BATTLE] -';

export namespace BattleActions {

  export class GetScores {
    static readonly type = `${ACTION_SCOPE} Get scores`;
  }

  export class GetPlayers {
    static readonly type = `${ACTION_SCOPE} Get players`;
  }

  export class AddPlayer {
    static readonly type = `${ACTION_SCOPE} Add player`;
    constructor(
      public player: PlayersRequestModel
    ) { }
  }

  export class AddScores {
    static readonly type = `${ACTION_SCOPE} Add score`;
    constructor(
      public scores: ScoresModel[]
    ) { }
  }
}
