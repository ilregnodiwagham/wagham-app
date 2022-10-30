/* eslint-disable no-underscore-dangle */
import { ExternalResourceTableRow } from '../shared/paginated-table/table-row';

export interface SpellData {
  name: string;
  school: string;
  dndClass: string[];
  ritual: boolean;
  manual: string;
  link: string;
}

export class Spell {
  name: string;
  school: string;
  dndClass: string[];
  ritual: boolean;
  manual: string;
  link: string;

  constructor(data: SpellData) {
    this.name = data.name;
    this.school = data.school;
    this.dndClass = data.dndClass;
    this.ritual = data.ritual;
    this.manual = data.manual;
    this.link = data.link;
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

}
