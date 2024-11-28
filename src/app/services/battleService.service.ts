import { Injectable } from '@angular/core';
import { GamesModel, PlayerModel, PlayersRequestModel, ScoresModel } from '../models/bataille.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class BattleService {

  readonly GAMES = 'games';
  readonly PLAYERS = 'players';

  constructor(public http: HttpClient) {
  }

  getScores(): Observable<GamesModel[]> {
    return this.http.get<GamesModel[]>(`${environment.apiUrl}/${this.GAMES}`, environment.httpOptions);
  }

  getPlayers(): Observable<PlayerModel[]> {
    return this.http.get<PlayerModel[]>(`${environment.apiUrl}/${this.PLAYERS}`, environment.httpOptions);
  }

  addPlayers(player: PlayersRequestModel): Observable<PlayerModel> {
    return this.http.post<PlayerModel>(`${environment.apiUrl}/${this.PLAYERS}`, player, environment.httpOptions);
  }

  addScores(scores: ScoresModel[]): Observable<GamesModel> {
    return this.http.post<GamesModel>(`${environment.apiUrl}/${this.GAMES}`, scores, environment.httpOptions);
  }
}
