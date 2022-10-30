/* eslint-disable no-underscore-dangle */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Subclass, SubclassData } from '../models/subclass.model';

@Injectable({
  providedIn: 'root'
})
export class SubclassService {

  private _subclasses = new BehaviorSubject<Subclass[]>(null);

  constructor(private http: HttpClient) { }

  get subclasses(): Observable<Subclass[]> {
    return this._subclasses.pipe(
      switchMap((subclasses) => {
        if (!!subclasses) {
          return of(subclasses);
        } else {
          return this.fetchSubclasses();
        }
      })
    );
  }

  fetchSubclasses() {
    const headers = new HttpHeaders()
    .set('Guild-ID', environment.guildId);
    return this.http.get<SubclassData[]>(
      `${environment.waghamApi}/subclass`,
      {headers}
      ).pipe(
        take(1),
        map((responseData) => responseData.map((subclassData) => new Subclass(subclassData)))
    );
  }

}
