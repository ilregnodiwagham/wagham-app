/* eslint-disable no-underscore-dangle */
import { ExternalResourceTableRow } from '../shared/paginated-table/table-row';
import { Tabulable } from '../shared/paginated-table/tabulable';

export interface SubclassData {
  id: number;
  class: string;
  subclass: string;
  race: string[];
  territory: string;
  source: string;
  link: string;
}

export class Subclass implements Tabulable<SubclassTableRow> {
  name: string;
  dndClass: string;
  race: string[];
  territory: string;
  source: string;
  link: string;

  constructor(data: SubclassData) {
    this.name = data.subclass;
    this.dndClass = data.class;
    this.race = data.race;
    this.territory = data.territory;
    this.source = data.source;
    this.link = data.link;
  }

  toTableRow(): SubclassTableRow {
    return new SubclassTableRow(
      this.name,
      this.dndClass,
      this.race,
      this.territory,
      this.source,
      this.link
    );
  }

}

export class SubclassTableRow extends ExternalResourceTableRow {

  constructor(
    public name: string,
    public dndClass: string,
    private _race: string[],
    public territory: string,
    public manual: string,
    public link: string
  ) { super(); }

  get url(): string {
    return this.link;
  }

  get race(): string {
    return this._race.join(', ');
  }

  keys(): string[] {
    return [
      'name',
      'dndClass',
      'race',
      'territory',
      'manual'
    ];
  }

  header(): { [key: string]: string } {
    return {
      name: 'Nome',
      dndClass: 'Classe',
      race: 'Razza',
      territory: 'Territorio',
      manual: 'Manuale'
    };
  }

  filter(field: string, value: string): boolean {
    if(field === 'race') {
      return this._race.includes(value);
    } else {
      return this[field] === value;
    }
  }

  getValuesForFiltering(field: string): string | string[] {
    if(field === 'race') {
      return this._race;
    } else {
      return this[field];
    }
  }

}

