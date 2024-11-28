import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CardService } from 'src/app/services/cardService.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from 'src/app/models/bataille.model';

@Component({
  selector: 'app-end-game-modal',
  templateUrl: 'endGameModal.component.html',
  styleUrls: ['./endGameModal.component.scss'],
})
export class EndGameModalComponent {

  winner$: Observable<string | null> = this.cardService.winner$

  constructor(
    public dialogRef: MatDialogRef<EndGameModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private cardService: CardService
  ) { }


}
