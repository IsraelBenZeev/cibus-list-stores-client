import type { StoreFilters, SortBy, SortDir } from '../../stores/types/store.types';

interface StoreFiltersProps {
  filters: StoreFilters;
  cities: string[];
  onChange: (filters: StoreFilters) => void;
}

const SORT_OPTIONS: { value: SortBy; label: string }[] = [
  { value: 'name', label: 'שם מסעדה' },
  { value: 'city', label: 'עיר' },
  { value: 'restaurantId', label: 'מספר מסעדה' },
];

const selectClass =
  'px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg outline-none cursor-pointer transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 min-w-[140px]';

export function StoreFiltersBar({ filters, cities, onChange }: StoreFiltersProps) {
  const toggleDir = () =>
    onChange({ ...filters, sortDir: filters.sortDir === 'asc' ? 'desc' : 'asc' });

  return (
    <div className="flex flex-wrap gap-3 items-center" dir="rtl">
      {/* City */}
      <select
        value={filters.city}
        onChange={(e) => onChange({ ...filters, city: e.target.value })}
        className={selectClass}
      >
        <option value="">כל הערים</option>
        {cities.map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>

      {/* Menu 46 toggle */}
      <div className="flex rounded-lg border border-gray-300 overflow-hidden text-sm">
        {([
          { value: null, label: 'הכל' },
          { value: true, label: 'יש תפריט 46' },
          { value: false, label: 'אין תפריט 46' },
        ] as { value: boolean | null; label: string }[]).map(({ value, label }) => {
          const active = filters.hasMenu46 === value;
          return (
            <button
              key={String(value)}
              onClick={() => onChange({ ...filters, hasMenu46: value })}
              className={`px-3 py-2 transition-colors ${
                active
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Sort by */}
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-gray-500 whitespace-nowrap">מיין לפי:</span>
        <select
          value={filters.sortBy}
          onChange={(e) => onChange({ ...filters, sortBy: e.target.value as SortBy })}
          className={selectClass}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        {/* Sort direction */}
        <button
          onClick={toggleDir}
          title={filters.sortDir === 'asc' ? 'סדר עולה' : 'סדר יורד'}
          className="p-2 rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
        >
          {filters.sortDir === 'asc' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
