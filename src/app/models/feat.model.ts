/* eslint-disable no-underscore-dangle */
import { ExternalResourceTableRow } from '../shared/paginated-table/table-row';
import { Tabulable } from '../shared/paginated-table/tabulable';

export interface FeatData {
  name: string;
  race: string[] | null;
  asi: boolean;
  source: string;
  link: string;
}

export class Feat implements Tabulable<FeatTableRow> {
  name: string;
  race: string[];
  asi: boolean;
  source: string;
  link: string;

  constructor(data: FeatData) {
    this.name = data.name;
    this.race = !!data.race ? data.race : [];
    this.asi = data.asi;
    this.source = data.source;
    this.link = data.link;
  }

  toTableRow(): FeatTableRow {
    return new FeatTableRow(
      this.name,
      this.race,
      this.asi,
      this.source,
      this.link
    );
  }

}

export class FeatTableRow extends ExternalResourceTableRow {

  constructor(
    public name: string,
    private _race: string[],
    private _asi: boolean,
    public source: string,
    public link: string
  ) { super(); }

  get url(): string {
    return this.link;
  }

  get race(): string {
    return this._race.join(', ');
  }

  get asi(): string {
    return this._asi ? 'Sì' : 'No';
  }

  keys(): string[] {
    return [
      'name',
      'race',
      'asi',
      'source'
    ];
  }

  header(): { [key: string]: string } {
    return {
      name: 'Nome',
      race: 'Limitazioni di razza',
      asi: 'Aumento di caratteristica',
      source: 'Manuale'
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
