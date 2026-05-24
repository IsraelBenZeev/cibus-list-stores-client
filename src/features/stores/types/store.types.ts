export interface Store {
  id: number;
  restaurantId: number;
  name: string;
  hasMenu46: boolean;
  menuDetails: string | null;
  address: string;
  city: string;
}

export type SortBy = 'name' | 'city' | 'restaurantId';
export type SortDir = 'asc' | 'desc';

export interface StoreFilters {
  query: string;
  city: string;
  hasMenu46: boolean | null;
  sortBy: SortBy;
  sortDir: SortDir;
}
