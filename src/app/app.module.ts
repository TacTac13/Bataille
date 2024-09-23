import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { PlayerComponent } from "./components/player/player.component";
import { MatDialogModule } from '@angular/material/dialog';
import { EndGameModalComponent } from './components/endGameModal/endGameModal.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    EndGameModalComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatDialogModule
  ],
  providers: [EndGameModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
