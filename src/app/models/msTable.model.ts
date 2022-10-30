import { findPrevious } from '../shared/utils';

/* eslint-disable no-underscore-dangle */
export interface ExpTableData {
  utilType: string;
  table: { [key: number]: string };
}

export class MSTable {
  private _expToLevel: { [key: number]: string };
  private _levelToExp: { [key: string]: number };

  constructor(data: ExpTableData) {
    this._expToLevel = data.table;
    this._levelToExp = Object.keys(data.table)
      .reduce( (previous, current) => ({
        ...previous,
        [data.table[current]]: current
      }), {});
  }

  levelToExp(level: string): number {
    return this._levelToExp[level];
  }

  expToLevel(exp: number): string {
    return this._expToLevel[findPrevious(Object.values(this._levelToExp), exp)];
  }

}
