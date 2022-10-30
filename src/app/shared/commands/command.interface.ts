import { TableRow } from '../paginated-table/table-row';

export interface TableCommand<T extends TableRow> {

  commandName: string;
  execute(row: T): void;

}
