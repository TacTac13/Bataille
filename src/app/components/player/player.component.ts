import { Component, Input } from '@angular/core';
import { Card, Player } from 'src/app/models/bataille.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent {

  @Input({ required: true }) player!: Player;
  @Input({ required: true }) cardPlayer!: Card | null;
}
