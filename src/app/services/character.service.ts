/* eslint-disable no-underscore-dangle */
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { map, take, switchMap, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { IllegalStateError } from 'src/app/shared/illegal-state-error';
import { environment } from 'src/environments/environment';
import { Character, CharacterData } from '../models/character.model';
import {CharacterWithPlayer, CharacterWithPlayerData} from '../models/characterWithPlayer.model';
import { ExpTableData, MSTable } from '../models/msTable.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private _characters = new BehaviorSubject<CharacterWithPlayer[]>(null);
  private _character = new BehaviorSubject<Character>(null);
  private _msTable = new BehaviorSubject<MSTable>(null);
  private readonly headers = new HttpHeaders().set('Guild-ID', environment.guildId);

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  get msTable(): Observable<MSTable> {
  return this._msTable.asObservable()
    .pipe(
      switchMap( table => {
        if (!!table) {
          return of(table);
        } else {
          return this.http.get<ExpTableData>(
            `${environment.waghamApi}/utility/expTable`,
            { headers: this.headers }
            )
            .pipe(
              take(1),
              map(response => {
                const newTable = new MSTable(response);
                this._msTable.next(newTable);
                return table;
              })
            );
        }
      })
    );
  }

  get character(): Observable<Character> {
  return this._character.asObservable()
    .pipe(
      switchMap( character => {
        if (!!character) {
          return of(character);
        } else {
          return this.fetchCharacter();
        }
      })
    );
  }

  get characters(): Observable<CharacterWithPlayer[]> {
    return this._characters.asObservable()
      .pipe(
        switchMap( characters => {
          if (!!characters) {
            return of(characters);
          } else {
            return this.fetchCharacters();
          }
        })
      );
  }

  fetchCharacter() {
  return this.authService.token
    .pipe(
      take(1),
      switchMap(token => {
        const headers = new HttpHeaders()
          .set('Authorization', `Bearer ${token.accessToken}`)
          .set('Content-Type', 'application/json');
        return this.http.get<CharacterData>(`${environment.waghamApi}/character`, {headers});
      }),
      catchError( (error: HttpErrorResponse) => {
        throw new IllegalStateError(error.error.message, `${error.status}_${error.statusText}`);
      }),
      map( responseData => {
        const newCharacter = new Character(responseData);
        this._character.next(newCharacter);
        return newCharacter;
      })
    );
  }

  fetchCharacters() {
    return this.msTable
      .pipe(
        take(1),
        switchMap( (table) => this.http.get<CharacterWithPlayerData[]>(
            `${environment.waghamApi}/character/withPlayer?status=active`,
            { headers: this.headers }
          )
          .pipe(
            take(1),
            map( (responseData) => responseData.map( (characterData) =>
                new CharacterWithPlayer(characterData, table)
              )
            )
          ))
      );
  }


}
