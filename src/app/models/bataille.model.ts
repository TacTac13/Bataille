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
  id: number;
  name: string;
  cards: Card[];
  score: number;

  constructor(id: number, name: string, cards: Card[]) {
    this.id = id;
    this.name = name;
    this.cards = cards;
    this.score = 0;
  }
}

export interface DialogData {
  equality: boolean;
}


export enum PlayerNumber {
  PLAYER1 = 'player1',
  PLAYER2 = 'player2'
}
