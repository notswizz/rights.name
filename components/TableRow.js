import React from 'react';
import { renderCell } from './tableUtils';

const TableRow = ({ row, visibleHeaders, headers, columnsToHide, onStadiumClick }) => {
  const link1Index = headers.indexOf('Link 1');
  const signedIndex = headers.indexOf('Signed');
  const stadiumUrlIndex = headers.indexOf('stadium-url');

  const handleRowClick = () => {
    const stadiumUrl = row[stadiumUrlIndex];
    if (stadiumUrl) {
      onStadiumClick(stadiumUrl);
    }
  };

  return (
    <tr
      className="hover:bg-sky-50 transition-colors duration-200 ease-in-out cursor-pointer"
      onClick={handleRowClick}
    >
      {row.filter((_, index) => !columnsToHide.includes(headers[index])).map((cell, cellIndex) => {
        const header = visibleHeaders[cellIndex];
        const isSignedColumn = header === 'Signed';
        const link1 = row[link1Index];

        return (
          <td
            key={cellIndex}
            className={`px-1 py-3 whitespace-nowrap text-sm ${
              header === 'School' ? 'font-bold text-gray-900' : 'text-gray-700'
            }`}
          >
            {isSignedColumn ? (
              <a href={link1} target="_blank" className="text-blue-500 underline">
                {renderCell(cell, header)}
              </a>
            ) : (
              renderCell(cell, header)
            )}
          </td>
        );
      })}
    </tr>
  );
};

export default TableRow;