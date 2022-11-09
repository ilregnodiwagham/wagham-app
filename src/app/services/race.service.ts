/* eslint-disable no-underscore-dangle */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Race, RaceData } from '../models/race.model';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  private _races = new BehaviorSubject<Race[]>(null);

  constructor(private http: HttpClient) {}

  get races(): Observable<Race[]> {
    return this._races.pipe(
      switchMap((feats) => {
        if (!!feats) {
          return of(feats);
        } else {
          return this.fetchRaces();
        }
      })
    );
  }

  fetchRaces() {
    const headers = new HttpHeaders()
      .set('Guild-ID', environment.guildId);
    return this.http.get<RaceData[]>(
      `${environment.waghamApi}/race`,
      {headers}
      ).pipe(
        take(1),
        map((responseData) => responseData.map((raceData) => new Race(raceData)))
    );
  }
}
