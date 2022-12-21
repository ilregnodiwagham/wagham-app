import { ExternalResourceTableRow } from '../../paginated-table/table-row';
import { CommandType, TableCommand } from '../command.interface';
import { Browser } from '@capacitor/browser';

export class LinkCommand implements TableCommand<ExternalResourceTableRow> {
  commandName: string;
  commandTitle: string;
  commandType = CommandType.button;

  constructor(
    name?: string | null,
    title?: string | null
  ) {
    this.commandName = name ?? 'Link';
    this.commandTitle = title ?? 'Link';
  }

  execute(row: ExternalResourceTableRow): void {
    Browser.open({ url: row.url });
  }

}
