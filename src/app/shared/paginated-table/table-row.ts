export interface TableRow {

  keys(): string[];

  header(): {[key: string]: string};

  compare(anyOther: any, key: string): number;

  filter(field: string, value: string): boolean;

  getValuesForFiltering(field: string): string | string[];

}

export interface ExternalResourceTableRow extends TableRow {

  url: string;

}
