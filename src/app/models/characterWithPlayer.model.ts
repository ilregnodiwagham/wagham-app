/* eslint-disable no-underscore-dangle */
import { AbstractCharacter, AbstractCharacterData } from './character.model';
import { Player, PlayerData } from './player.model';
import {Tabulable} from '../shared/paginated-table/tabulable';
import {TableRow} from '../shared/paginated-table/table-row';
import { MSTable } from './msTable.model';
import { EnumDictionary, Territories } from '../shared/common-enums.model';

const asIntervalDays = (endInterval: Date): number => {
  const intervalMillis = new Date().getTime() - endInterval.getTime();
  return Math.floor(intervalMillis / 1000 / 3600 / 24);
};

export class CharacterWithPlayer extends AbstractCharacter implements Tabulable<CharacterTableRow> {
  player: Player;
  level: string;

  constructor(data: CharacterWithPlayerData, msTable: MSTable) {
    super(data);
    this.player = new Player(data.player);
    this.level = msTable.expToLevel(this.ms);
  }

  toTableRow(): CharacterTableRow {
    return new CharacterTableRow(
      this.player.name,
      this.name,
      this.race,
      this.dndClass,
      this.territory,
      this.ms,
      this.level,
      !!this.lastPlayed ? asIntervalDays(this.lastPlayed) : null,
      !!this.lastMastered ? asIntervalDays(this.lastMastered) : null,
      this.reputation
    );
  }

}

export interface CharacterWithPlayerData extends AbstractCharacterData{
  player: PlayerData;
}

export class CharacterTableRow implements TableRow {

  constructor(
    public player: string,
    public name: string,
    public race: string,
    public dndClass: string,
    public territory: string,
    public ms: number,
    public level: string,
    public _playerInactivity: number | null,
    public _masterInactivity: number | null,
    public reputation: EnumDictionary<Territories, number>[]
  ) {
  }

  get playerInactivity(): string {
    if (!this._playerInactivity || this._playerInactivity <= 0) {
      return `${this.name } non ha mai giocato`;
    } else {
      return `${this._playerInactivity} giorni`;
    }
  }

  get masterInactivity(): string {
    if (!this._masterInactivity || this._masterInactivity <= 0) {
      return `${this.name } non ha mai masterato`;
    } else {
      return `${this._masterInactivity} giorni`;
    }
  }

  keys(): string[] {
    return [
      'player',
      'name',
      'race',
      'dndClass',
      'territory',
      'ms',
      'level',
      'playerInactivity',
      'masterInactivity'
    ];
  }

  header(): { [key: string]: string } {
    return {
      player: 'Giocatore',
      name: 'Personaggio',
      race: 'Razza',
      dndClass: 'Classe',
      territory: 'Provenienza',
      ms: 'MS',
      level: 'Livello',
      playerInactivity: 'Inattività Giocatore',
      masterInactivity: 'Inattività Master'
    };
  }

  compare(anyOther: any, key: string): number {
    const other = anyOther as CharacterTableRow;
    if(key === 'playerInactivity') {
      const thisInactivity = this._playerInactivity ?? 0;
      const otherInactivity = other._playerInactivity ?? 0;
      if(thisInactivity > otherInactivity) {return 1;}
      else if (thisInactivity < otherInactivity) {return -1;}
      return 0;
    } else if (key === 'masterInactivity') {
      const thisInactivity = this._masterInactivity ?? 0;
      const otherInactivity = other._masterInactivity ?? 0;
      if(thisInactivity > otherInactivity) {return 1;}
      else if (thisInactivity < otherInactivity) {return -1;}
      return 0;
    } else {
      if(this[key] > other[key]) {return 1;}
      else if (this[key] < other[key]) {return -1;}
      return 0;
    }
  }

  filter(field: string, value: string): boolean {
    return this[field] === value;
  }

  getValuesForFiltering(field: string): string | string[] {
    return this[field];
  }

}
