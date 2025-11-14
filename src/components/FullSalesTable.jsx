import React, { useState, useMemo } from 'react';

const columnsConfig = [
  { key: 'id', label: 'ID' },
  { key: 'date', label: 'Date' },
  { key: 'salesRepresentative', label: 'Sales Rep' },
  { key: 'client', label: 'Client' },
  { key: 'product', label: 'Product' },
  { key: 'unitsSold', label: 'Units' },
  { key: 'revenue', label: 'Revenue' },
  { key: 'target', label: 'Target' },
];

const FullSalesTable = ({ data }) => {
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10;

  const formatCurrency = value =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);

  const formatDate = dateString =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  const filteredAndSortedData = useMemo(() => {
    const filtered = (data || []).filter(item =>
      Object.values(item).some(value =>
        value
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );

    return filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === 'date') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });
  }, [data, searchTerm, sortField, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSortedData.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredAndSortedData.slice(startIndex, endIndex);

  const handleSort = field => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  const getSortIcon = field => {
    if (field !== sortField) return '↕';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  if (!data || data.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 p-8 text-center text-slate-500">
        <div className="text-4xl mb-2">📊</div>
        <p>No sales records available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M8.5 3a5.5 5.5 0 013.993 9.343l4.082 4.083a.75.75 0 11-1.06 1.06l-4.083-4.082A5.5 5.5 0 118.5 3zm0 1.5a4 4 0 100 8 4 4 0 000-8z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search sales records..."
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-2xl border border-slate-200 bg-white/70 py-2 pl-10 pr-4 text-sm text-slate-700 shadow-inner focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-emerald-600">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            Live data
          </span>
          <span className="hidden sm:inline">Sorted by {columnsConfig.find(col => col.key === sortField)?.label}</span>
        </div>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-slate-100 bg-white/95 shadow-xl">
        <table className="min-w-full divide-y divide-slate-100 text-sm">
          <thead className="bg-slate-50/80">
            <tr>
              {columnsConfig.map(column => (
                <th
                  key={column.key}
                  className="whitespace-nowrap px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500"
                  onClick={() => handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    <span>{column.label}</span>
                    <span className="text-slate-400">{getSortIcon(column.key)}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {currentData.length > 0 ? (
              currentData.map(row => (
                <tr key={row.id} className="transition hover:bg-slate-50/70">
                  <td className="px-6 py-4 font-semibold text-slate-900">#{row.id}</td>
                  <td className="px-6 py-4 text-slate-700">{formatDate(row.date)}</td>
                  <td className="px-6 py-4 text-slate-700">{row.salesRepresentative}</td>
                  <td className="px-6 py-4 text-slate-700">{row.client}</td>
                  <td className="px-6 py-4 text-slate-700">
                    <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                      {row.product}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-700">{row.unitsSold.toLocaleString()}</td>
                  <td className="px-6 py-4 font-semibold text-emerald-600">{formatCurrency(row.revenue)}</td>
                  <td className="px-6 py-4 text-slate-500">{formatCurrency(row.target)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columnsConfig.length} className="px-6 py-10 text-center text-slate-400">
                  No matching records found. Try adjusting your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
              const pageNumber = index + Math.max(1, currentPage - 2);
              if (pageNumber > totalPages) return null;
              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl border text-sm font-semibold ${
                    currentPage === pageNumber
                      ? 'border-indigo-500 bg-indigo-500/90 text-white shadow-lg'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="text-sm text-slate-500">
        Showing {Math.min(filteredAndSortedData.length, startIndex + 1)}-
        {Math.min(endIndex, filteredAndSortedData.length)} of {filteredAndSortedData.length} records
      </div>
    </div>
  );
};

export default FullSalesTable;
