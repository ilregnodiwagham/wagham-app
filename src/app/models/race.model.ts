/* eslint-disable no-underscore-dangle */
import { ExternalResourceTableRow } from '../shared/paginated-table/table-row';
import { Tabulable } from '../shared/paginated-table/tabulable';

export class Race implements Tabulable<RaceTableRow> {
  race: string;
  subrace: string;
  link: string;
  territories: { [key: string]: string };

  constructor(data: RaceData) {
    this.race = data.race;
    this.subrace = data.subrace;
    this.link = data.link;
    this.territories = data.territories;
  }

  toTableRow(): RaceTableRow {
    return new RaceTableRow(
      this.race,
      this.subrace,
      this.link,
      this.territories
    );
  }

}

export interface RaceData {
  id: string;
  race: string;
  subrace: string;
  link: string;
  territories: {[key: string]: string};
}

export class RaceTableRow extends ExternalResourceTableRow {

  constructor(
    public race: string,
    public subrace: string,
    private _link: string,
    public territories: {[key: string]: string}
  ) { super(); }

  get url(): string {
    return this._link;
  }

  keys(): string[] {
    return [
      'race',
      'subrace'
    ];
  }

  header(): { [key: string]: string } {
    return {
      race: 'Razza',
      subrace: 'Sottorazza',
      territories: 'Territorio'
    };
  }

  filter(field: string, value: string): boolean {
    if(field === 'territories') {
      return value in this.territories;
    } else {
      return this[field] === value;
    }
  }

  getValuesForFiltering(field: string): string | string[] {
    if(field === 'territories') {
      return Object.keys(this.territories);
    } else {
      return this[field];
    }
  }

}
