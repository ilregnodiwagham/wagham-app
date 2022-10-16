export type SortOption = { sortKey: string; sortOrder: number };

export type FilterOption = { filterField: string; filterValue: string };

export type Comparator<T> = (obj1: T, obj2: T) => number;

export interface Transforms<T> {
  sorter: Comparator<T> | null;
  filter: FilterOption | null;
  searcher: { searchKeys: string[]; query: string } | null;
}

