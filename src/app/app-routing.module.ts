import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GameComponent } from './pages/game/game.component';
import { ScoresComponent } from './pages/scores/scores.component';


const routes: Routes = [
  {
    path: '',
    component: ScoresComponent
  },
  {
    path: 'game',
    component: GameComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
