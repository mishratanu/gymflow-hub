import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiChevronUp, HiChevronDown } from 'react-icons/hi';

const Table = ({ columns, data, onRowClick, emptyMessage = 'No data available' }) => {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState('asc');

  const handleSort = (key) => {
    if (!key) return;
    if (sortKey === key) {
      setSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sorted = sortKey
    ? [...data].sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];
        if (typeof aVal === 'string') {
          return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        }
        return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
      })
    : data;

  return (
    <div className="overflow-x-auto rounded-xl">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-700/50">
            {columns.map((col) => (
              <th
                key={col.key || col.label}
                onClick={() => col.sortable && handleSort(col.key)}
                className={`
                  px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider
                  ${col.sortable ? 'cursor-pointer hover:text-white select-none' : ''}
                  ${col.align === 'right' ? 'text-right' : ''}
                  ${col.align === 'center' ? 'text-center' : ''}
                `}
              >
                <div className={`flex items-center gap-1 ${col.align === 'right' ? 'justify-end' : ''}`}>
                  {col.label}
                  {col.sortable && sortKey === col.key && (
                    sortDir === 'asc' ? <HiChevronUp size={14} /> : <HiChevronDown size={14} />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-12 text-center text-slate-500">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sorted.map((row, idx) => (
              <motion.tr
                key={row.id || idx}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                onClick={() => onRowClick && onRowClick(row)}
                className={`
                  border-b border-slate-700/30 table-row-hover
                  ${onRowClick ? 'cursor-pointer' : ''}
                `}
              >
                {columns.map((col) => (
                  <td
                    key={col.key || col.label}
                    className={`
                      px-4 py-3.5 text-sm text-slate-300
                      ${col.align === 'right' ? 'text-right' : ''}
                      ${col.align === 'center' ? 'text-center' : ''}
                    `}
                  >
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </motion.tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
