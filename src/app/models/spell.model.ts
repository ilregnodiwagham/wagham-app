/* eslint-disable no-underscore-dangle */
import { ExternalResourceTableRow } from '../shared/paginated-table/table-row';
import { Tabulable } from '../shared/paginated-table/tabulable';

export interface SpellData {
  name: string;
  level: number;
  srd: boolean;
  school: string;
  class: string[];
  ritual: boolean;
  manual: string;
  link: string;
}

export class Spell implements Tabulable<SpellTableRow> {
  name: string;
  level: number;
  srd: boolean;
  school: string;
  dndClass: string[];
  ritual: boolean;
  manual: string;
  link: string;

  constructor(data: SpellData) {
    this.name = data.name;
    this.level = data.level;
    this.srd = data.srd;
    this.school = data.school;
    this.dndClass = data.class;
    this.ritual = data.ritual;
    this.manual = data.manual;
    this.link = data.link;
  }

  toTableRow(): SpellTableRow {
    return new SpellTableRow(
      this.name,
      this.level,
      this.srd,
      this.school,
      this.dndClass,
      this.ritual,
      this.manual,
      this.link
    );
  }

}

export class SpellTableRow extends ExternalResourceTableRow {

  constructor(
    public name: string,
    private _level: number,
    private _srd: boolean,
    public school: string,
    private _dndClass: string[],
    private _ritual: boolean,
    public manual: string,
    public link: string
  ) { super(); }

  get url(): string {
    return this.link;
  }

  get dndClass(): string {
    return this._dndClass.join(', ');
  }

  get ritual(): string {
    return this._ritual ? 'Sì' : 'No';
  }

  get srd(): string {
    return this._srd ? 'Sì' : 'No';
  }

  get level(): string {
    return this._level === 0 ? 'Cantrip' : this._level.toString();
  }

  keys(): string[] {
    return [
      'name',
      'level',
      'school',
      'dndClass',
      'ritual',
      'manual',
      'srd'
    ];
  }

  header(): { [key: string]: string } {
    return {
      name: 'Nome',
      level: 'Livello',
      school: 'Scuola',
      dndClass: 'Classe',
      ritual: 'Rituale',
      manual: 'Manuale',
      srd: 'SRD'
    };
  }

  filter(field: string, value: string): boolean {
    if(field === 'dndClass') {
      return this._dndClass.includes(value);
    } else {
      return this[field] === value;
    }
  }

  getValuesForFiltering(field: string): string | string[] {
    if(field === 'dndClass') {
      return this._dndClass;
    } else {
      return this[field];
    }
  }

}
