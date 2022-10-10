import { BehaviorSubject, Observable } from 'rxjs';
import Fuse from 'fuse.js';

export interface Tabulable<T> {

  toTableRow(): T;

}

export interface TableRow {

  keys(): string[];

  header(): {[key: string]: string};

  compare(anyOther: any, key: string): number;

}

type Comparator<T> = (obj1: T, obj2: T) => number;

interface Transforms<T> {
  sorter: Comparator<T> | null;
  filter: { key: string; value: string } | null;
  searcher: { searchKeys: string[]; query: string} | null;
}

export class PaginatedTable<T extends TableRow> {
  private index = this.pageSize;
  private currentPage = new BehaviorSubject<T[]>(this.array.slice(0, this.index));
  private transforms: Transforms<T> = { sorter: null, filter: null, searcher: null };
  private cleanArray = [...this.array];

  constructor(
    private array: T[],
    public sortFields: string[],
    private pageSize: number
  ) {}

  get page(): Observable<T[]> {
    return this.currentPage.asObservable();
  }

  get keys(): string[] {
    if(this.array.length > 0) {
      return this.array[0].keys();
    }
    else {
      return [];
    }
  }

  get header(): {[key: string]: string} {
    if(this.array.length > 0) {
      return this.array[0].header();
    }
    else {
      return {};
    }
  }

  get length(): number {
    return this.array.length;
  }

  get finished(): boolean {
    return this.index >= this.array.length;
  }

  loadMore(): void {
    if(this.index < this.array.length) {
      this.index += this.pageSize;
    }
    this.currentPage.next(this.array.slice(0, this.index));
  }

  applyTransforms(): T[] {
    const sorted = !!this.transforms.sorter ? this.cleanArray.sort(this.transforms.sorter) : this.cleanArray;
    const filtered = !!this.transforms.filter
      ? sorted.filter( (it) => it[this.transforms.filter.key] === this.transforms.filter.value )
      : sorted;
    const searchFilters = this.transforms.searcher;
    const searched = !!searchFilters
      ? new Fuse(filtered, { keys: searchFilters.searchKeys, threshold: 0.35 }).search(searchFilters.query).map( (it) => it.item )
      : filtered;
    this.array = searched;
    return this.array;
  }

  sort(key: string | undefined): void {
    this.transforms.sorter = !!key ? (obj1: T, obj2: T) => obj1.compare(obj2, key) : null;
    this.currentPage.next(this.applyTransforms().slice(0, this.index));
  }

  search(query: string, keys: string[]): void {
    this.transforms.searcher = (!query || query.length === 0)
      ? null
      : { searchKeys: keys, query };
    this.index = this.pageSize;
    this.currentPage.next(this.applyTransforms().slice(0, this.index));
  }

  filter(key: string | undefined, value: string | undefined): void {
    this.transforms.filter = (!!key && !!value) ? {key, value} : null;
    this.currentPage.next(this.applyTransforms().slice(0, this.index));
  }
}
