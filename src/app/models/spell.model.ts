/* eslint-disable no-underscore-dangle */
import { ExternalResourceTableRow } from '../shared/paginated-table/table-row';
import { Tabulable } from '../shared/paginated-table/tabulable';

export interface SpellData {
  name: string;
  school: string;
  class: string[];
  ritual: boolean;
  manual: string;
  link: string;
}

export class Spell implements Tabulable<SpellTableRow> {
  name: string;
  school: string;
  dndClass: string[];
  ritual: boolean;
  manual: string;
  link: string;

  constructor(data: SpellData) {
    this.name = data.name;
    this.school = data.school;
    this.dndClass = data.class;
    this.ritual = data.ritual;
    this.manual = data.manual;
    this.link = data.link;
  }

  toTableRow(): SpellTableRow {
    return new SpellTableRow(
      this.name,
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

  keys(): string[] {
    return [
      'name',
      'school',
      'dndClass',
      'ritual',
      'manual'
    ];
  }

  header(): { [key: string]: string } {
    return {
      name: 'Nome',
      school: 'Scuola',
      dndClass: 'Classe',
      ritual: 'Rituale',
      manual: 'Manuale'
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
