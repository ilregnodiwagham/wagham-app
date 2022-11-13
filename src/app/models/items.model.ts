/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  Manuals,
  Proficiencies,
  ProficienciesCraft,
  Tier,
} from '../shared/common-enums.model';
import { ExternalResourceTableRow } from '../shared/paginated-table/table-row';
import { Tabulable } from '../shared/paginated-table/tabulable';
import { Territories } from '../shared/common-enums.model';

export class Item implements Tabulable<ItemTableRow> {
  name: string;
  sellPrice: number;
  sellProficiencies: Proficiencies[];
  buyPrice: number;
  isUsable: boolean;
  link: string;
  category: ItemCategories;
  manual: Manuals;
  giveRatio: number;
  craft?: Craft;
  attunement: boolean;
  sellBuildingRequirement: string | null;
  buyRepRequirement: { [key: string]: number} | null;

  constructor(json: ItemData) {
    this.name = json.name;
    this.sellPrice = json.sell_price;
    this.sellProficiencies = json.sell_proficiencies;
    this.buyPrice = json.buy_price;
    this.isUsable = json.is_usable;
    this.link = json.link;
    this.category = json.category;
    this.manual = json.manual;
    this.giveRatio = json.give_ratio;
    this.craft = new Craft(json.craft);
    this.attunement = json.attunement;
    this.sellBuildingRequirement = json.sell_building_requirement;
    this.buyRepRequirement = json.buy_rep_requirement;
  }

  toTableRow(): ItemTableRow {
    return new ItemTableRow(
      this.name,
      this.category,
      this.buyPrice,
      this.sellPrice,
      this.sellBuildingRequirement,
      this.buyRepRequirement,
      !this.craft ? null : this.craft.craftTools,
      this.attunement,
      !this.craft ? null : this.craft.craftMoCost,
      !this.craft ? null : this.craft.tier,
      !this.craft ? null : this.craft.craftTbadge,
      !this.craft ? null : this.craft.craftTotalCost,
      !this.craft ? null : this.craft.buildingRequired,
      !this.craft ? null : this.craft.craftRepRequirement,
      this.isUsable,
      this.manual,
      this.link,
    );
  }
}

export class ItemTableRow extends ExternalResourceTableRow {
  constructor(
    public name: string,
    public category: string,
    private _buyPrice: number,
    private _sellPrice: number,
    private _sellBuildingRequirement: string | null,
    private _buyReputation: { [key: string]: number} | null,
    private _craftTools: ProficienciesCraft[],
    private _attunement: boolean,
    private _craftMoCost: number,
    private _tier: string,
    private _craftTbadge: number,
    private _craftTotalCost: number,
    private _craftBuilding: string | null,
    private _craftRep: { [key: string]: number} | null,
    public _isUsable: boolean,
    public manual: string,
    public link: string,
  ) { super(); }

  get sellBuildingRequirement(): string {
    return !!this._sellBuildingRequirement
      ? this._sellBuildingRequirement
      : 'Nessun edificio richiesto per vendere questo oggetto';
  }

  get buyReputation(): string {
    if(!!this._buyReputation) {
      const repList = Object.keys(this._buyReputation).reduce( (prev, current) =>
        [...prev, `almeno ${this._buyReputation[current]} presso ${current}`],
        [])
        .join(', ');
      return `${repList[0].toUpperCase()}${repList.slice(1).toLowerCase()}`;
    } else {
      return 'Nessun vincolo di reputazione richiesto';
    }
  }

  get craftBuilding(): string {
    return !!this._craftBuilding
      ? this._craftBuilding
      : 'Nessun edificio richiesto per craftare questo oggetto';
  }

  get craftRep(): string {
    if(!!this._craftRep) {
      const repList = Object.keys(this._craftRep).reduce( (prev, current) =>
        [...prev, `almeno ${this._craftRep[current]} presso ${current}`],
        [])
        .join(', ');
      return `${repList[0].toUpperCase()}${repList.slice(1).toLowerCase()}`;
    } else {
      return 'Nessun vincolo di reputazione richiesto';
    }
  }

  get buyPrice() {
    if(!this._buyPrice || this._buyPrice === 0) {
      return 'Non acquistable';
    } else {
      return this._buyPrice;
    }
  }

  get sellPrice() {
    if(!this._sellPrice || this._sellPrice === 0) {
      return 'Non vendibile';
    } else {
      return this._sellPrice;
    }
  }

  get craftMoCost() {
    if(!this._craftMoCost || this._craftMoCost === 0) {
      return 'Non craftabile';
    } else {
      return this._craftMoCost;
    }
  }

  get craftTotalCost() {
    if(!this._craftTotalCost || this._craftTotalCost === 0) {
      return 'Non craftabile';
    } else {
      return this._craftTotalCost;
    }
  }

  get craftTbadge() {
    if(!this._craftTbadge || this._craftTbadge === 0 || !this._tier) {
      return 'Non craftabile';
    } else {
      return `${this._craftTbadge} 1Day${this._tier}Badge`;
    }
  }

  get url() {
    return this.link;
  }

  get craftTools() {
    if(!this._craftTools || this._craftTools.length === 0) {
      return 'Non craftabile';
    } else {
      return this._craftTools[0];
    }
  }

  get attunement() {
    return this._attunement ? 'Sì' : 'No';
  }

  keys(): string[] {
    return [
      'name',
      'category',
      'buyPrice',
      'sellPrice',
      'sellBuildingRequirement',
      'buyReputation',
      'craftTools',
      'attunement',
      'craftMoCost',
      'craftTbadge',
      'craftTotalCost',
      'craftBuilding',
      'craftRep',
      'manual'
    ];
  }

  header(): {[key: string]: string} {
    return {
      name: 'Oggetto',
      category: 'Categoria',
      buyPrice: 'Prezzo di acquisto dal BOT',
      sellPrice: 'Prezzo di vendita al BOT',
      sellBuildingRequirement: 'Edificio richiesto per vendere al BOT',
      buyReputation: 'Reputazione richiesta per acquistare dal BOT',
      craftTools: 'Strumenti',
      attunement: 'Attunement',
      craftMoCost: 'Costo craft (MO)',
      craftTbadge: 'TBadge necessari per il craft',
      craftTotalCost: 'Costo Totale di Craft (mo + Tbadge)',
      craftBuilding: 'Edificio richiesto per craftare',
      craftRep: 'Reputazione richiesta per craftare',
      manual: 'Fonte'
    };
  }

  compare(anyOther: any, key: string): number {
    const other = anyOther as ItemTableRow;
    if(key === 'buyPrice') {
      if(this._buyPrice > other._buyPrice) {return 1;}
      else if (this._buyPrice < other._buyPrice) {return -1;}
      return 0;
    } else {
      if(this[key] > other[key]) {return 1;}
      else if (this[key] < other[key]) {return -1;}
      return 0;
    }
  }

}

export interface ItemData {
  name: string;
  sell_price: number;
  sell_proficiencies: Proficiencies[];
  sell_building_requirement: string | null;
  buy_price: number;
  is_usable: boolean;
  link: string;
  category: ItemCategories;
  manual: Manuals;
  attunement: boolean;
  give_ratio: number;
  buy_rep_requirement: { [key: string]: number} | null;
  craft: CraftData;
}

export class Craft {
  craftMoCost: number;
  tier: Tier;
  craftTools: ProficienciesCraft[];
  craftTbadge: number;
  craftTime: number;
  craftTotalCost: number;
  craftMinQty: number;
  craftMaxQty: number;
  craftRepRequirement: { [key: string]: number} | null;
  buildingRequired: string | null;
  craftIngredients: { [key: string]: number }[];

  constructor(json: CraftData) {
    this.craftMoCost = json.craft_mo_cost;
    this.tier = json.tier;
    this.craftTools = json.craft_tools;
    this.craftTime = json.craft_time;
    this.craftTools = json.craft_tools;
    this.craftMinQty = json.craft_min_qty;
    this.craftMaxQty = json.craft_max_qty;
    this.craftRepRequirement = json.craft_rep_requirement;
    this.buildingRequired = json.building_required;
    this.craftIngredients = json.craft_ingredients;
    this.craftTotalCost = json.craft_total_cost;
    this.craftTbadge = json.craft_tbadge;
  }
}

export interface CraftData {
  craft_mo_cost: number;
  tier: Tier;
  craft_tools: ProficienciesCraft[];
  craft_tbadge: number;
  craft_time: number;
  craft_total_cost: number;
  craft_min_qty: number;
  craft_max_qty: number;
  craft_rep_requirement: { [key: string]: number} | null;
  building_required: string | null;
  craft_ingredients: { [key: string]: number }[];
}

export enum ItemCategories {
  components = 'Craft/Spell Comp.',
  base = 'Adv. Gear',
  upgrade = 'Smithing upgrade',
  poison = 'Poison',
  trading = 'Trading Goods',
  companion = 'Beast Companion',
  mount = 'Mount and Accesories',
  vehiclesSea = 'Vehicles(Sea)',
  vehiclesLand = 'Vehicles(Land)',
  food = 'Food recipes',
  ink = 'Arcane Ink',
  t1 = 'Common Magic Item (T1)',
  t2 = 't2Uncommon Magic Item (T2)',
  t3 = 'Rare Magic Item (T3)',
  t4 = 'Very Rare Magic Item (T4)',
  t4Plus = 'Ultra Rare Magic Item (T4)',
  t5 = 'Legendary Magic Item (T5)',
  cursed = 'Cursed',
  homebrew = 'Homebrew',
  tbadge = 'TBadge',
}
