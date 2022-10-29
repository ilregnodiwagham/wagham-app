/* eslint-disable no-underscore-dangle */
import { ExternalResourceTableRow } from '../paginated-table/table-row';
import { Tabulable } from '../paginated-table/tabulable';

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

export class FeatTableRow implements ExternalResourceTableRow {

  constructor(
    public name: string,
    private _race: string[],
    private _asi: boolean,
    public source: string,
    public link: string
  ) {}

  get url(): string {
    return this.link;
  }

  get race(): string {
    return this._race.join(', ');
  }

  get asi(): string {
    if(this._asi) {
      return 'Sì';
    } else {
      return 'No';
    }
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
      source: 'fonte'
    };
  }

  compare(anyOther: any, key: string): number {
    const other = anyOther as FeatTableRow;
    if(this[key] > other[key]) {return 1;}
    else if (this[key] < other[key]) {return -1;}
    return 0;
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
