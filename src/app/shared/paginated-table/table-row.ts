export interface TableRow {

  keys(): string[];

  header(): {[key: string]: string};

  compare(anyOther: any, key: string): number;

}
