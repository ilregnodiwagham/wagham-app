/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { BuildingTypes, EnumDictionary, Languages, Proficiencies, Territories } from 'src/app/shared/common-enums.model';

export class Character {
  name: string;
  player: string;
  race: string;
  class: string;
  territory: Territories;
  status: CharacterStatus;
  ms: number;
  errata: CharacterErrata[];
  created?: Date;
  lastPlayed?: Date;
  lastMastered?: Date;
  reputation: EnumDictionary<Territories, number>[];
  age?: number;
  buildings: EnumDictionary<BuildingTypes, Building[]>;
  inventory: {[key: string]: number};
  money: number;
  languages: Languages[];
  proficiencies: Proficiencies[];

  constructor(data: CharacterData) {
    this.name = data._id;
    this.player = data.player;
    this.race = data.race;
    this.class = data.class;
    this.territory = data.territory;
    this.status = data.status;
    this.ms = (data.sessionMS + data.masterMS + data.PBCMS + data.errataMS);
    this.errata = data.errata.map( it => new CharacterErrata(it));
    this.created = !!data.created ? new Date(data.created) : null;
    this.lastPlayed = !!data.lastPlayed ? new Date(data.lastPlayed) : null;
    this.reputation = this.reputation;
    this.age = data.age;
    this.buildings = data.buildings;
    this.inventory = data.inventory;
    this.money = data.money;
    this.languages = data.languages;
    this.proficiencies = data.proficiencies;
  }

  MSToInt() {
    return Math.floor(this.ms);
  }

}

export interface CharacterData {
  _id: string;
  player: string;
  race: string;
  class: string;
  territory: Territories;
  status: CharacterStatus;
  masterMS: number;
  sessionMS: number;
  PBCMS: number;
  errataMS: number;
  errata: CharacterErrataData[];
  created?: string;
  lastPlayed?: string;
  lastMastered?: string;
  reputation: EnumDictionary<Territories, number>[];
  age?: number;
  buildings: EnumDictionary<BuildingTypes, Building[]>;
  inventory: {[key: string]: number};
  money: number;
  languages: Languages[];
  proficiencies: Proficiencies[];
}

export interface Building {
  name: string;
  description: string;
  zone: string;
  status: string;
}

export class CharacterErrata {
  private ms: number;
  private description: string;
  private reputationAdjustment: EnumDictionary<Territories, number>;
  private date: Date;
  private statusChange: CharacterStatus;

  constructor(data: CharacterErrataData) {
    this.ms = data.ms;
    this.description = data.description;
    this.reputationAdjustment = data.reputationAdjustment;
    this.date = new Date(data.date);
    this.statusChange = data.statusChange;
  }
}

export interface CharacterErrataData {
  ms: number;
  description: string;
  reputationAdjustment: EnumDictionary<Territories, number>;
  date: string;
  statusChange: CharacterStatus;
}

export enum CharacterStatus {
  active = 'active',
  dead = 'dead',
  npc = 'npc',
  retired = 'retired',
  traitor = 'traitor'
}

export interface MSTable {
  mstable: number[];
  leveltable: number[];
}
