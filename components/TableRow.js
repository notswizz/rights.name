import React from 'react';
import { renderCell } from './tableUtils';

const getColorClass = (value, min, max) => {
  if (typeof value !== 'number') return '';
  const normalizedValue = (value - min) / (max - min);
  if (normalizedValue < 0.25) return 'bg-green-100 text-green-800';
  if (normalizedValue < 0.5) return 'bg-green-200 text-green-800';
  if (normalizedValue < 0.75) return 'bg-green-300 text-green-800';
  return 'bg-green-400 text-green-800';
};

const TableRow = ({ row, visibleHeaders, headers, columnsToHide, onStadiumClick, minMaxValues, isMobile }) => {
  const link1Index = headers.indexOf('Link 1');
  const signedIndex = headers.indexOf('Signed');
  const stadiumUrlIndex = headers.indexOf('stadium-url');
  const wikipediaIndex = headers.indexOf('Wikipedia');

  const handleRowClick = () => {
    const stadiumUrl = row[stadiumUrlIndex];
    if (stadiumUrl) {
      onStadiumClick(stadiumUrl);
    }
  };

  const mobileColumnsToHide = ['AGENCY', 'LENGTH', 'ANNUAL', 'TOTAL', 'Signed'];
  
  return (
    <tr
      className="hover:bg-sky-50 transition-colors duration-200 ease-in-out cursor-pointer border-b border-gray-200 relative"
      onClick={handleRowClick}
    >
      {row.filter((_, index) => !columnsToHide.includes(headers[index]) && headers[index] !== 'Wikipedia').map((cell, cellIndex) => {
        const header = visibleHeaders[cellIndex];
        const isSignedColumn = header === 'Signed';
        const link1 = row[link1Index];
        const wikipediaUrl = row[wikipediaIndex];

        let cellContent;
        let cellClass = 'px-2 py-2 text-sm';

        if (cell === '' || cell === null || cell === undefined) {
          cellContent = <span className="text-gray-400">❓</span>;
        } else if (header === 'ANNUAL' || header === 'TOTAL') {
          const numValue = parseFloat(cell.replace(/[^0-9.-]+/g, ""));
          const { min, max } = minMaxValues[header];
          cellClass += ` ${getColorClass(numValue, min, max)}`;
          cellContent = <span className="font-medium">{cell}</span>;
        } else if (isSignedColumn) {
          cellContent = (
            <a href={link1} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">
              {renderCell(cell, header)}
            </a>
          );
        } else if (header === 'LOGO') {
          cellContent = <img src={cell} alt="Team Logo" className="w-8 h-8 rounded-full" />;
        } else if (header === 'CONFERENCE') {
          cellContent = <img src={cell} alt="Conference Logo" className="w-6 h-6" />;
        } else if (header === 'LENGTH') {
          cellContent = (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {cell}y
            </span>
          );
        } else if (header === 'FOOTBALL STADIUM') {
          const words = cell.split(' ');
          const firstLine = words.slice(0, Math.ceil(words.length / 2)).join(' ');
          const secondLine = words.slice(Math.ceil(words.length / 2)).join(' ');
          cellContent = (
            <a
              href={wikipediaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 hover:underline block"
              onClick={(e) => e.stopPropagation()} // Prevent row click when clicking the link
            >
              <span className="block">{firstLine}</span>
              <span className="block">{secondLine}</span>
            </a>
          );
        } else {
          cellContent = renderCell(cell, header);
        }

        if (header === 'School') {
          cellClass += ' font-semibold text-gray-900';
        } else if (header === 'FOOTBALL STADIUM') {
          cellClass += ' max-w-[150px]';
        }

        return (
          <td key={cellIndex} className={cellClass}>
            {cellContent}
          </td>
        );
      })}
    </tr>
  );
};

export default TableRow;