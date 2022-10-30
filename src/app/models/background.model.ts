/* eslint-disable no-underscore-dangle */
import { ExternalResourceTableRow } from '../shared/paginated-table/table-row';
import { Tabulable } from '../shared/paginated-table/tabulable';

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

export class BackgroundTableRow extends ExternalResourceTableRow {

  constructor(
    public name: string,
    private _race: string,
    public link: string
  ) { super(); }

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

}

export interface BackgroundData {
  name: string;
  race: string;
  link: string;
}
