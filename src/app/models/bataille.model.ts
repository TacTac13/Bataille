export interface Card {
    value: number;
}

export class Player {
    name: string;
    cards: Card[];
    score: number;

    constructor(name: string, cards: Card[]) {
        this.name = name;
        this.cards = cards;
        this.score = 0;
    }
}