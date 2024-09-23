import { Component, OnInit } from '@angular/core';
import { Card, Player } from './models/bataille.model';
import { CardService } from './services/cardService.service'
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EndGameModalComponent } from './components/endGameModal/endGameModal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  player1!: Player;
  player2!: Player;
  winner$: Observable<string | null> = this.cardService.winner$
  deck: Card[] = this.cardService.createDeck();
  cardPlayer1: Card | null = null
  cardPlayer2: Card | null = null

  constructor(
    private cardService: CardService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    [this.player1, this.player2] = this.cardService.deal(this.deck);
  }

  retry() {
    this.cardPlayer1 = null;
    this.cardPlayer2 = null;
    this.cardService.winnerSubject.next(null);
    this.deck = this.cardService.createDeck();
    [this.player1, this.player2] = this.cardService.deal(this.deck);
  }

  playRound() {
    this.cardPlayer1 = this.player1.cards[0];
    this.cardPlayer2 = this.player2.cards[0];
    this.cardService.playRound(this.player1, this.player2);
    if (this.player1.cards.length === 0 && this.player2.cards.length === 0) {
      if (this.player1.score === this.player2.score) {
        this.cardService.winnerSubject.next(null);
        this.openDialog(true);
      } else {
        this.openDialog(false)
      }
    }
  }

  openDialog(equality: boolean): void {
    const dialogRef = this.dialog.open(EndGameModalComponent, {
      data: { equality }
    });
    dialogRef.afterClosed().subscribe(() => this.retry());
  }
}
