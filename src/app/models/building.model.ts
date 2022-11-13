/* eslint-disable no-underscore-dangle */
import { AbstractTableRow } from '../shared/paginated-table/table-row';
import { Tabulable } from '../shared/paginated-table/tabulable';

/* eslint-disable @typescript-eslint/naming-convention */
export class Building implements Tabulable<BuildingTableRow> {

  name: string;
  cost: number;
  tbadgeCost: number;
  tbadgeType: string;
  proficiencyReduction: string | null;
  size: string;
  areas: string[];
  descriptionSize: number;
  bounty: { id: string; prizes: Prize[] };

  constructor(data: BuildingData) {
    this.name = data.name;
    this.cost = data.mo_cost;
    this.tbadgeCost = data.tbadge_cost;
    this.tbadgeType = data.tbadge_type;
    this.proficiencyReduction = data.proficiency_reduction;
    this.size = data.size;
    this.areas = data.areas;
    this.descriptionSize = data.desc_size;
    this.bounty = {
      id: data.bounty.id,
      prizes: data.bounty.prizes.map( (it) => new Prize(it))
    };
  }

  toTableRow(): BuildingTableRow {
   return new BuildingTableRow(
    this.name,
    this.cost,
    this.tbadgeCost,
    this.tbadgeType,
    this.proficiencyReduction,
    this.size,
    this.areas,
    this.bounty.prizes
   );
  }

}

export class BuildingTableRow extends AbstractTableRow {

  constructor(
    public name: string,
    public cost: number,
    private _tbadgeCost: number,
    private _tbadgeType: string,
    private _proficiencyReduction: string | null,
    public size: string,
    private _areas: string[],
    public prizes: Prize[],
  ) { super(); }

  get areas(): string {
    return this._areas
      .map( (it) => it === 'Estero' ? it : `Wagham - Zona ${it}`)
      .join(', ');
  }

  get proficiencyReduction(): string {
    return !!this._proficiencyReduction ? this._proficiencyReduction : 'Nessuno sconto competenza';
  }

  get tbadgeCost(): string {
    return `${this._tbadgeCost} ${this._tbadgeType}`;
  }

  keys(): string[] {
    return [
      'name',
      'cost',
      'tbadgeCost',
      'proficiencyReduction',
      'areas',
      'size'
    ];
  }

  header(): { [key: string]: string } {
    return {
      name: 'Nome',
      cost: 'Costo (MO)',
      tbadgeCost: 'Costo (TBadge)',
      proficiencyReduction: 'Competenza per riduzione TBadge',
      areas: 'Zone',
      size: 'Dimensione'
    };
  }

  filter(field: string, value: string): boolean {
    if(field === 'areas') {
      return this._areas.includes(value);
    } else {
      return this[field] === value;
    }
  }

  getValuesForFiltering(field: string): string | string[] {
    if(field === 'areas') {
      return this._areas;
    } else {
      return this[field];
    }
  }

}

export class Prize {

  probability: number;
  mo: number;
  prize: string | null;
  prizeQty: number | null;

  constructor(data: PrizeData) {
    this.probability = data.p;
    this.mo = data.mo_delta;
    this.prize = data.prize_id;
    this.prizeQty = data.prize_delta;
  }

}

export interface BuildingData {
  name: string;
  mo_cost: number;
  tbadge_cost: number;
  tbadge_type: string;
  proficiency_reduction: string | null;
  bounty: { id: string; prizes: PrizeData[] };
  size: string;
  areas: string[];
  desc_size: number;
}

export interface PrizeData {
  p: number;
  mo_delta: number;
  prize_id: string | null;
  prize_delta: number | null;
}
