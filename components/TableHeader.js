import React from 'react';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const TableHeader = ({ visibleHeaders, requestSort, sortConfig }) => {
  const getSortIcon = (header) => {
    if (sortConfig.key === header) {
      return sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  return (
    <thead className="bg-gradient-to-r from-black to-sky-900 sticky top-0 z-10">
      <tr>
        {visibleHeaders.map((header, index) => (
          <th
            key={index}
            scope="col"
            className="px-3 py-3 text-left text-xs font-medium text-sky-200 uppercase tracking-wider cursor-pointer hover:bg-sky-800 transition-colors duration-200"
            onClick={() => requestSort(header)}
          >
            <div className="flex items-center">
              {header}
              <span className="ml-1">{getSortIcon(header)}</span>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;