/* eslint-disable no-underscore-dangle */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Feat, FeatData } from '../shared/models/feat.model';

@Injectable({
  providedIn: 'root'
})
export class FeatService {
  private _feats = new BehaviorSubject<Feat[]>(null);

  constructor(private http: HttpClient) {}

  get items(): Observable<Feat[]> {
    return this._feats.pipe(
      switchMap((feats) => {
        if (!!feats) {
          return of(feats);
        } else {
          return this.fetchFeats();
        }
      })
    );
  }

  fetchFeats() {
    const headers = new HttpHeaders()
      .set('Guild-ID', environment.guildId);
    return this.http.get<FeatData[]>(
      `${environment.waghamApi}/feat`,
      {headers}
      ).pipe(
        take(1),
        map((responseData) => responseData.map((featData) => new Feat(featData)))
    );
  }
}
