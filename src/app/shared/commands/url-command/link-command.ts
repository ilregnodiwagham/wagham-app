import { ExternalResourceTableRow } from '../../paginated-table/table-row';
import { CommandType, TableCommand } from '../command.interface';
import { Browser } from '@capacitor/browser';

export class LinkCommand implements TableCommand<ExternalResourceTableRow> {
  commandName = 'Link';
  commandTitle = 'Link';
  commandType = CommandType.button;

  execute(row: ExternalResourceTableRow): void {
    Browser.open({ url: row.url });
  }

}
