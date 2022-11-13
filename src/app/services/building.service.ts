/* eslint-disable no-underscore-dangle */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Building, BuildingData } from '../models/building.model';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {
  private _buildings = new BehaviorSubject<Building[]>(null);

  constructor(private http: HttpClient) {}

  get buildings(): Observable<Building[]> {
    return this._buildings.pipe(
      switchMap((feats) => {
        if (!!feats) {
          return of(feats);
        } else {
          return this.fetchBuildings();
        }
      })
    );
  }

  fetchBuildings() {
    const headers = new HttpHeaders()
      .set('Guild-ID', environment.guildId);
    return this.http.get<BuildingData[]>(
      `${environment.waghamApi}/building`,
      {headers}
      ).pipe(
        take(1),
        map((responseData) => responseData.map((featData) => new Building(featData)))
    );
  }
}
