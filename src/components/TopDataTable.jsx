import React from 'react';

const TopDataTable = ({ data, columns }) => {
  const formatValue = (value, type) => {
    switch (type) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(value);
      case 'number':
        return new Intl.NumberFormat('en-US').format(value);
      case 'percentage':
        return `${value.toFixed(1)}%`;
      default:
        return value;
    }
  };

  if (!data || data.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 p-8 text-center text-slate-500">
        <div className="text-4xl mb-2">📄</div>
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white/90 shadow-lg backdrop-blur">
      <table className="min-w-full divide-y divide-slate-100">
        <thead className="bg-slate-50/70">
          <tr>
            <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">
              Rank
            </th>
            {columns.map((column, colIndex) => (
              <th
                key={colIndex}
                className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="transition hover:bg-slate-50/80">
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-sky-500 text-xs font-semibold text-white">
                  {rowIndex + 1}
                </span>
              </td>
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-slate-700">
                    {formatValue(row[column.key], column.type)}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopDataTable;
