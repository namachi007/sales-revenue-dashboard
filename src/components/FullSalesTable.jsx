import React, { useState, useMemo } from 'react';

const FullSalesTable = ({ data }) => {
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10;



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
    if (field !== sortField) return '↕️';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <div className="text-4xl mb-2">📊</div>
        <p>No sales records available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search sales records..."
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">🔍</span>
          </div>
        </div>
      </div>

      
      <div className="table overflow-x-auto bg-white border border-gray-200 rounded-lg">
        <table className="min-w-full w-full table-fixed">
          <thead className="bg-gray-50">
            <tr>
              {[
                { key: 'id', label: 'ID' },
                { key: 'date', label: 'Date' },
                { key: 'salesRepresentative', label: 'Sales Rep' },
                { key: 'client', label: 'Client' },
                { key: 'product', label: 'Product' },
                { key: 'unitsSold', label: 'Units' },
                { key: 'revenue', label: 'Revenue' },
                { key: 'target', label: 'Target' },
              ].map(column => (
                <th
  key={column.key}
  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
  onClick={() => handleSort(column.key)}
>
  {column.label}
  <span className="ml-1 text-gray-400">{getSortIcon(column.key)}</span>
</th>
              ))}
            </tr>
          </thead>
          <tbody className="tsgit bg-white mr-8">
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FullSalesTable;
