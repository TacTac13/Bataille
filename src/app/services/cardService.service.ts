import { Injectable } from '@angular/core';
import { Card, Player } from '../models/bataille.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  winnerSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  winner$: Observable<string | null> = this.winnerSubject.asObservable();
  createDeck(): Card[] {                                      // Creation et mélange du deck de cartes
    const deck: Card[] = [];
    for (let i = 1; i <= 52; i++) {
      deck.push({ value: i });
    }
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

  deal(cards: Card[]): [Player, Player] {                         // Distribution des cartes aux joueurs
    const halfDeck: number = Math.ceil(cards.length / 2);
    const player1Deck: Card[] = cards.slice(0, halfDeck);
    const player2Deck: Card[] = cards.slice(halfDeck);

    const player1: Player = new Player('Joueur 1', player1Deck);
    const player2: Player = new Player('Joueur 2', player2Deck);

    return [player1, player2];
  }

  playRound(player1: Player, player2: Player) {
    const card1: Card | undefined = player1.cards.shift();
    const card2: Card | undefined = player2.cards.shift();
    if (card1 && card2) {                                 // Partie en cours, les joueurs peuvent continuer à jouer
      if (card1.value > card2.value) {
        player1.score++;
        this.winnerSubject.next(player1.name);
      } else {
        player2.score++;
        this.winnerSubject.next(player2.name);
      }
      if (player1.cards.length === 0 && player2.cards.length === 0) {    // Fin de partie et determination du gagnant
        player1.score > player2.score ? this.winnerSubject.next(player1.name) : this.winnerSubject.next(player2.name);
      }
    }
  }
}
