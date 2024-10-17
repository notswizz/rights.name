import React from 'react';
import TableRow from './TableRow';

const TableBody = ({ sortedData, visibleHeaders, headers, columnsToHide, onStadiumClick }) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {sortedData.map((row, rowIndex) => (
        <TableRow
          key={rowIndex}
          row={row}
          visibleHeaders={visibleHeaders}
          headers={headers}
          columnsToHide={columnsToHide}
          onStadiumClick={onStadiumClick}
          className="hover:bg-gray-50 transition-colors duration-150"
        />
      ))}
    </tbody>
  );
};

export default TableBody;