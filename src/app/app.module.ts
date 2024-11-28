import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { PlayerComponent } from "./components/player/player.component";
import { MatDialogModule } from '@angular/material/dialog';
import { EndGameModalComponent } from './components/endGameModal/endGameModal.component';
import { NgxsModule } from '@ngxs/store';
import { BattleState } from './store/battle.state';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { GameComponent } from './pages/game/game.component';
import { ScoresComponent } from './pages/scores/scores.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingState } from './store/loading.state';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    EndGameModalComponent,
    GameComponent,
    ScoresComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressBarModule,
    MatIconModule,
    MatSnackBarModule,
    MatInputModule,
    NgxsModule.forRoot([BattleState, LoadingState])
  ],
  providers: [EndGameModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
