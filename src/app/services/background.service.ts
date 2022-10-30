/* eslint-disable no-underscore-dangle */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Background, BackgroundData } from '../models/background.model';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {
  private _backgrounds = new BehaviorSubject<Background[]>(null);

  constructor(private http: HttpClient) { }

  get backgrounds(): Observable<Background[]> {
    return this._backgrounds.pipe(
      switchMap((backgrounds) => {
        if (!!backgrounds) {
          return of(backgrounds);
        } else {
          return this.fetchBackgrounds();
        }
      })
    );
  }

  fetchBackgrounds() {
    const headers = new HttpHeaders()
    .set('Guild-ID', environment.guildId);
  return this.http.get<BackgroundData[]>(
    `${environment.waghamApi}/background`,
    {headers}
    ).pipe(
      take(1),
      map((responseData) => responseData.map((backgroundData) => new Background(backgroundData)))
  );
  }

}
