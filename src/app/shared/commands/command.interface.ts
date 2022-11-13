import { TableRow } from '../paginated-table/table-row';

export interface TableCommand<T extends TableRow> {

  commandName: string;
  commandTitle: string;
  commandType: CommandType;

  execute(row: T): any;

}

export enum CommandType {
  text,
  button
}
