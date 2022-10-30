/* eslint-disable no-underscore-dangle */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Spell, SpellData } from '../models/spell.model';

@Injectable({
  providedIn: 'root'
})
export class SpellService {
  private _spells = new BehaviorSubject<Spell[]>(null);

  constructor(private http: HttpClient) { }

  get spells(): Observable<Spell[]> {
    return this._spells.pipe(
      switchMap((spells) => {
        if (!!spells) {
          return of(spells);
        } else {
          return this.fetchSpells();
        }
      })
    );
  }

  fetchSpells() {
    const headers = new HttpHeaders()
    .set('Guild-ID', environment.guildId);
  return this.http.get<SpellData[]>(
    `${environment.waghamApi}/spell`,
    {headers}
    ).pipe(
      take(1),
      map((responseData) => responseData.map((spellData) => new Spell(spellData)))
  );
  }

}
