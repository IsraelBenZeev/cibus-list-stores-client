import type { Store } from '../types/store.types';

interface StoreTableProps {
  stores: Store[];
}

function googleSearchUrl(store: Store) {
  const query = `${store.name} ${store.address} ${store.city}`;
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

function GoogleSearchButton({ store }: { store: Store }) {
  return (
    <a
      href={googleSearchUrl(store)}
      target="_blank"
      rel="noopener noreferrer"
      title={`חפש בגוגל: ${store.name}`}
      className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
    >
      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
      גוגל
    </a>
  );
}

export function StoreTable({ stores }: StoreTableProps) {
  if (stores.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-gray-200 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-base">לא נמצאו מסעדות התואמות את החיפוש</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm border-collapse" dir="rtl">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 text-right font-semibold text-gray-500 border-b border-gray-200 w-20">#</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700 border-b border-gray-200">שם מסעדה</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700 border-b border-gray-200">כתובת</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700 border-b border-gray-200 w-36">עיר</th>
              <th className="px-4 py-3 text-center font-semibold text-gray-700 border-b border-gray-200 w-28">תפריט 46</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700 border-b border-gray-200 max-w-xs">פירוט</th>
              <th className="px-4 py-3 border-b border-gray-200 w-20"></th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store, idx) => (
              <tr
                key={store.id}
                className={`border-b border-gray-100 last:border-0 transition-colors hover:bg-indigo-50/40 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
              >
                <td className="px-4 py-3 text-gray-400 text-xs">{store.restaurantId}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{store.name}</td>
                <td className="px-4 py-3 text-gray-600">{store.address}</td>
                <td className="px-4 py-3 text-gray-600">{store.city}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${store.hasMenu46 ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                    {store.hasMenu46 ? 'כן' : 'לא'}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs max-w-xs truncate">{store.menuDetails ?? '—'}</td>
                <td className="px-4 py-3 text-center"><GoogleSearchButton store={store} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden flex flex-col gap-3">
        {stores.map((store) => (
          <div key={store.id} className="bg-white rounded-xl border border-gray-200 p-4" dir="rtl">
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="font-semibold text-gray-900 text-sm leading-snug">{store.name}</span>
              <span className={`shrink-0 inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${store.hasMenu46 ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                {store.hasMenu46 ? 'תפריט 46 ✓' : 'ללא תפריט 46'}
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{store.address}, {store.city}</span>
            </div>
            {store.menuDetails && (
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">{store.menuDetails}</p>
            )}
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-gray-300">#{store.restaurantId}</span>
              <GoogleSearchButton store={store} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
