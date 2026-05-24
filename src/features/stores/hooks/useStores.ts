import { useMemo } from 'react';
import storesData from '../../../data/stores.json';
import type { Store, StoreFilters } from '../types/store.types';

const allStores = storesData as Store[];

export function useStores(filters: StoreFilters) {
  const cities = useMemo(
    () => [...new Set(allStores.map((s) => s.city))].sort((a, b) => a.localeCompare(b, 'he')),
    []
  );

  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase();

    const result = allStores.filter((s) => {
      if (
        q &&
        !s.name.toLowerCase().includes(q) &&
        !s.address.toLowerCase().includes(q) &&
        !s.city.toLowerCase().includes(q)
      ) {
        return false;
      }
      if (filters.city && s.city !== filters.city) return false;
      if (filters.hasMenu46 !== null && s.hasMenu46 !== filters.hasMenu46) return false;
      return true;
    });

    return result.sort((a, b) => {
      const dir = filters.sortDir === 'asc' ? 1 : -1;
      switch (filters.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name, 'he') * dir;
        case 'city':
          return a.city.localeCompare(b.city, 'he') * dir;
        case 'restaurantId':
          return (a.restaurantId - b.restaurantId) * dir;
        default:
          return 0;
      }
    });
  }, [filters]);

  const menu46Count = useMemo(() => filtered.filter((s) => s.hasMenu46).length, [filtered]);

  return { stores: filtered, cities, total: allStores.length, menu46Count };
}
