/* eslint-disable no-underscore-dangle */
import { ExternalResourceTableRow } from '../paginated-table/table-row';
import { Tabulable } from '../paginated-table/tabulable';

export class Background implements Tabulable<BackgroundTableRow>{
  name: string;
  race: string;
  link: string;

  constructor(data: BackgroundData) {
    this.name = data.name;
    this.race = data.race;
    this.link = data.link;
  }

  toTableRow(): BackgroundTableRow {
    return new BackgroundTableRow(
      this.name,
      this.race,
      this.link
    );
  }
}

export class BackgroundTableRow implements ExternalResourceTableRow {

  constructor(
    public name: string,
    private _race: string,
    public link: string
  ) {}

  get url(): string {
    return this.link;
  }

  get race(): string {
    if(this._race === 'no') {
      return 'Nessuna';
    } else {
      return this._race;
    }
  }

  keys(): string[] {
    return [
      'name',
      'race'
    ];
  }

  header(): { [key: string]: string } {
    return {
      name: 'Nome',
      race: 'Limitazioni di razza'
    };
  }

  compare(anyOther: any, key: string): number {
    const other = anyOther as BackgroundTableRow;
    if(this[key] > other[key]) {return 1;}
    else if (this[key] < other[key]) {return -1;}
    return 0;
  }

  filter(field: string, value: string): boolean {
    return this[field] === value;
  }

  getValuesForFiltering(field: string): string | string[] {
    return this[field];
  }

}

export interface BackgroundData {
  name: string;
  race: string;
  link: string;
}
