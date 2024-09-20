import { TestBed } from '@angular/core/testing';
import { CardService } from './cardService.service';
import {Card} from '../models/bataille.model';

describe('Test du service CardService', () => {
    let cardService: CardService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        cardService = TestBed.inject(CardService);

    });

    it('Le deck doit être composé de 52 cartes', () => {
        const deck: Card[] = cardService.createDeck();
        expect(deck.length).toBe(52);
    });

    it('Toutes les cartes du deck doivent être unique', () => {
        const deck: Card[] = cardService.createDeck();
        const uniqueValues: Set<number> = new Set(deck.map(card => card.value));
        expect(uniqueValues.size).toBe(52);
    });

    it('Chaque joueur doit recevoir la moitié des cartes', () => {
        const deck: Card[] = cardService.createDeck();
        const [player1, player2] = cardService.deal(deck);
        expect(player1.cards.length).toBe(deck.length / 2);
        expect(player2.cards.length).toBe(deck.length / 2);
    });
});