/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  Manuals,
  Proficiencies,
  ProficienciesCraft,
  Tier,
} from '../common-enums.model';
import { TableRow } from '../paginated-table/table-row';
import { Tabulable } from '../paginated-table/tabulable';

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
  }

  toTableRow(): ItemTableRow {
    return new ItemTableRow(
      this.name,
      this.category,
      this.buyPrice,
      this.sellPrice,
      this.craft == null ? null : this.craft.craftTools,
      this.attunement,
      this.craft == null ? null : this.craft.craftMoCost,
      this.craft == null ? null : this.craft.tier,
      this.craft == null ? null : this.craft.craftTbadge,
      this.craft == null ? null : this.craft.craftTotalCost,
      this.manual,
      this.link,
    );
  }
}

export class ItemTableRow implements TableRow {
  constructor(
    public name: string,
    public category: string,
    public _buyPrice: number,
    public _sellPrice: number,
    public _craftTools: ProficienciesCraft[],
    public _attunement: boolean,
    public _craftMoCost: number,
    public _tier: string,
    public _craftTbadge: number,
    public _craftTotalCost: number,
    public manual: string,
    public _link: string,
  ) {}

  get buyPrice() {
    if(!this._craftTools || this._buyPrice === 0) {
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
    if(!this._craftTbadge || this._craftTbadge === 0) {
      return 'Non craftabile';
    } else {
      return this._craftTbadge;
    }
  }

  get link() {
    return this._link;
  }

  get tier() {
    if(!this._tier) {
      return 'Non craftabile';
    } else {
      return this._tier;
    }
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
      'craftTools',
      'attunement',
      'craftMoCost',
      'tier',
      'craftTbadge',
      'craftTotalCost',
      'manual',
      'link',
    ];
  }

  header(): {[key: string]: string} {
    return {
      name: 'Oggetto',
      category: 'Categoria',
      buyPrice: 'Prezzo di acquisto dal BOT',
      sellPrice: 'Prezzo di vendita al BOT',
      craftTools: 'Strumenti',
      attunement: 'Attunement',
      craftMoCost: 'Costo craft (MO)',
      tier: 'Tipo/Tier TBadge consumati nel Craft',
      craftTbadge: 'Quantità TBadge consumati nel craft',
      craftTotalCost: 'Costo Totale di Craft (mo + Tbadge)',
      manual: 'Fonte',
      link: 'Link descrizione'
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
  buy_price: number;
  is_usable: boolean;
  link: string;
  category: ItemCategories;
  manual: Manuals;
  attunement: boolean;
  give_ratio: number;
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
  craftIngredients: { [key: string]: number }[];

  constructor(json: CraftData) {
    this.craftMoCost = json.craft_mo_cost;
    this.tier = json.tier;
    this.craftTools = json.craft_tools;
    this.craftTime = json.craft_time;
    this.craftTools = json.craft_tools;
    this.craftMinQty = json.craft_min_qty;
    this.craftMaxQty = json.craft_max_qty;
    this.craftIngredients = json.craft_ingredients;
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
