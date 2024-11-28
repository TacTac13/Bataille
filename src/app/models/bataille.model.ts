export interface GamesModel {
  id: number;
  scores: ScoresModel[]
}

export interface ScoresModel {
  playerId: number;
  score: number
}

export interface PlayerModel {
  id: number;
  name: string
}

export interface PlayersRequestModel {
  name: string
}

export interface Card {
  value: number;
}

export class GamePlayerModel {
  name: string;
  cards: Card[];
  score: number;

  constructor(name: string, cards: Card[]) {
    this.name = name;
    this.cards = cards;
    this.score = 0;
  }
}

export interface DialogData {
  equality: boolean;
}
