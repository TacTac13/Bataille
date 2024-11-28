import { Component, Input } from '@angular/core';
import { Card, GamePlayerModel } from 'src/app/models/bataille.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {

  @Input({ required: true }) player!: GamePlayerModel;
  @Input({ required: true }) cardPlayer!: Card | null;
}
