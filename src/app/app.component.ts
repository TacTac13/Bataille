import {Component, OnInit} from '@angular/core';
import {Card, Player} from './models/bataille.model';
import {CardService} from './services/cardService.service'
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  player1!: Player;
  player2!: Player;
  winner$: Observable<string | null> = this.cardService.winner$
  equality: boolean = false
  deck : Card[] = this.cardService.createDeck();
  cardPlayer1: Card | null = null
  cardPlayer2: Card | null = null

  constructor(
      private cardService: CardService
  ) {}

  ngOnInit() {
    [this.player1, this.player2] = this.cardService.deal(this.deck);
  }

  retry(){
    this.cardPlayer1 = null;
    this.cardPlayer2 = null;
    this.equality = false;
    this.cardService.winnerSubject.next(null);
    this.deck = this.cardService.createDeck();
    [this.player1, this.player2] = this.cardService.deal(this.deck);
  }

  playRound() {
    this.cardPlayer1 = this.player1.cards[0];
    this.cardPlayer2 = this.player2.cards[0];
    this.cardService.playRound(this.player1, this.player2);
    if ((this.player1.cards.length === 0 && this.player2.cards.length === 0) &&       //Gestion d'une égualité
        this.player1.score === this.player2.score){
      this.equality = true;
      this.cardService.winnerSubject.next(null);
    }

  }
}
