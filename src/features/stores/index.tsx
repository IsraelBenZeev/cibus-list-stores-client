import { useState, useCallback } from 'react';
import { useStores } from './hooks/useStores';
import { StoreTable } from './components/StoreTable';
import { SearchBar } from '../search/components/SearchBar';
import { StoreFiltersBar } from '../filters/components/StoreFilters';
import type { StoreFilters } from './types/store.types';

const DEFAULT_FILTERS: StoreFilters = {
  query: '',
  city: '',
  hasMenu46: null,
  sortBy: 'name',
  sortDir: 'asc',
};

function exportToCsv(data: { restaurantId: number; name: string; address: string; city: string; hasMenu46: boolean; menuDetails: string | null }[]) {
  const header = 'מספר מסעדה,שם מסעדה,כתובת,עיר,תפריט 46,פירוט';
  const rows = data.map((s) =>
    [s.restaurantId, `"${s.name}"`, `"${s.address}"`, `"${s.city}"`, s.hasMenu46 ? 'כן' : 'לא', `"${s.menuDetails ?? ''}"`].join(',')
  );
  const csv = '﻿' + [header, ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'מסעדות-סיבוס.csv';
  a.click();
  URL.revokeObjectURL(url);
}

export function StoresFeature() {
  const [filters, setFilters] = useState<StoreFilters>(DEFAULT_FILTERS);

  const { stores, cities, total, menu46Count } = useStores(filters);

  const handleReset = useCallback(() => setFilters(DEFAULT_FILTERS), []);
  const hasActiveFilters = filters.query || filters.city || filters.hasMenu46 !== null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10" dir="rtl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">מסעדות סיבוס</h1>
              <p className="mt-1 text-sm text-gray-500">
                מציג <span className="font-semibold text-gray-700">{stores.length.toLocaleString()}</span> מתוך {total.toLocaleString()} מסעדות
              </p>
            </div>
            <button
              onClick={() => exportToCsv(stores)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-white border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              ייצוא CSV
            </button>
          </div>

          {/* Stats chips */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block" />
              סה"כ {total.toLocaleString()} מסעדות
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              {menu46Count.toLocaleString()} עם תפריט 46
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 inline-block" />
              {cities.length} ערים
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-3 mb-5 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
          <SearchBar value={filters.query} onChange={(q) => setFilters((f) => ({ ...f, query: q }))} />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <StoreFiltersBar filters={filters} cities={cities} onChange={setFilters} />
            {hasActiveFilters && (
              <button
                onClick={handleReset}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors underline underline-offset-2"
              >
                נקה הכל
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <StoreTable stores={stores} />
      </div>
    </div>
  );
}
