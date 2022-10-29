import { BehaviorSubject, Observable } from 'rxjs';
import Fuse from 'fuse.js';
import { TableRow } from './table-row';
import { FilterOption, SortOption, Transforms } from './transforms';

export class PaginatedTable<T extends TableRow> {
  private index = this.pageSize;
  private currentPage = new BehaviorSubject<T[]>(this.array.slice(0, this.index));
  private transforms: Transforms<T> = { sorter: null, filter: null, searcher: null };
  private cleanArray = [...this.array];

  constructor(
    private array: T[],
    private pageSize: number
  ) { }

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
    const sorted = !!this.transforms.sorter
      ? this.cleanArray.sort(this.transforms.sorter)
      : [...this.cleanArray];
    const filtered = !!this.transforms.filter
      ? sorted.filter( (it) => it.filter(this.transforms.filter.filterField, this.transforms.filter.filterValue) )
      : sorted;
    const searchFilters = this.transforms.searcher;
    const searched = !!searchFilters
      ? new Fuse(filtered, { keys: searchFilters.searchKeys, threshold: 0.35 }).search(searchFilters.query).map( (it) => it.item )
      : filtered;
    this.array = searched;
    return this.array;
  }

  sort(sortOption: SortOption | null): void {
    this.transforms.sorter = !!sortOption ? (obj1: T, obj2: T) => sortOption.sortOrder*obj1.compare(obj2, sortOption.sortKey) : null;
    this.currentPage.next(this.applyTransforms().slice(0, this.index));
  }

  search(query: string, keys: string[]): void {
    this.transforms.searcher = (!query || query.length === 0)
      ? null
      : { searchKeys: keys, query };
    this.index = this.pageSize;
    this.currentPage.next(this.applyTransforms().slice(0, this.index));
  }

  filter(filterOption: FilterOption | null): void {
    this.transforms.filter = filterOption;
    this.currentPage.next(this.applyTransforms().slice(0, this.index));
  }
}
