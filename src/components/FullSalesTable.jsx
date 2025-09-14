import React, { useState, useMemo } from 'react';

const FullSalesTable = ({ data }) => {
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10;

    const formatCurrency = value => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

 
  const filteredAndSortedData = useMemo(() => {
    let filtered = [...data]; 


    if (searchTerm) {
      filtered = data.filter(item =>
        Object.values(item).some(value =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

   
    const sortedData = [...filtered].sort((a, b) => {
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
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return sortedData;
  }, [data, searchTerm, sortField, sortDirection]
  );

 
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
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
            {currentData.map(row => (
              <tr
                key={row.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{row.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(row.date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.salesRepresentative}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.client}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {row.product}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.unitsSold.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                  {formatCurrency(row.revenue)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(row.target)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
{totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="hidden sm:flex space-x-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNumber = i + Math.max(1, currentPage - 2);
              if (pageNumber > totalPages) return null;
              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md ${
                    currentPage === pageNumber
                      ? 'z-10 bg-blue-600 text-white border-blue-600'
                      : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>  
        </div>
      )}
    </div>
  );
};

export default FullSalesTable;
