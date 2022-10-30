export interface TableRow {

  keys(): string[];

  header(): {[key: string]: string};

  compare(anyOther: any, key: string): number;

  filter(field: string, value: string): boolean;

  getValuesForFiltering(field: string): string | string[];

}

export abstract class AbstractTableRow implements TableRow {

  compare(anyOther: any, key: string): number {
    const other = anyOther as AbstractTableRow;
    if(this[key] > other[key]) {return 1;}
    else if (this[key] < other[key]) {return -1;}
    return 0;
  }
  filter(field: string, value: string): boolean {
    return this[field] === value;
  }
  getValuesForFiltering(field: string): string | string[] {
    return this[field];
  }

  abstract keys(): string[];

  abstract header(): { [key: string]: string };

}

export abstract class ExternalResourceTableRow extends AbstractTableRow {

  abstract get url(): string;

}
