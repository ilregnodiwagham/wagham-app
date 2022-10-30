import { ExternalResourceTableRow } from '../../paginated-table/table-row';
import { TableCommand } from '../command.interface';
import { Browser } from '@capacitor/browser';

export class LinkCommand implements TableCommand<ExternalResourceTableRow> {
  commandName = 'Link';

  execute(row: ExternalResourceTableRow): void {
    Browser.open({ url: row.url });
  }

}
