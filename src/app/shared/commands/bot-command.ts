/* eslint-disable no-underscore-dangle */
import { ItemTableRow } from 'src/app/models/items.model';
import { TableRow } from '../paginated-table/table-row';
import { CommandType, TableCommand } from './command.interface';

export class BotCommand implements TableCommand<ItemTableRow> {
  commandName = 'BotCommand';
  commandType = CommandType.text;

  constructor(
    private command: string,
    public commandTitle: string,
    private hasArgument: boolean = false,
    private isCraftable: boolean = false,
    private isBuyable: boolean = false,
    private isSellable: boolean = false,
    private isUsable: boolean = false,
  ) {}

  execute(row: ItemTableRow): string {
    return (row._isUsable || !this.isUsable)
    && (row.craftTbadge !== 'Non craftabile' || !this.isCraftable)
    && (row.sellPrice > 0 || !this.isSellable)
    && (row.buyPrice > 0 || !this.isBuyable)
      ? `rp!${this.command} "${row.name}" 1${this.hasArgument ? ' @pg' : ''}`
      : '-';
  }

}
