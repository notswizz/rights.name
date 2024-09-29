import React from 'react';
import TableRow from './TableRow';

const TableBody = ({ sortedData, visibleHeaders, headers, columnsToHide, onStadiumClick }) => {
  return (
    <tbody>
      {sortedData.map((row, rowIndex) => (
        <TableRow
          key={rowIndex}
          row={row}
          visibleHeaders={visibleHeaders}
          headers={headers}
          columnsToHide={columnsToHide}
          onStadiumClick={onStadiumClick}
        />
      ))}
    </tbody>
  );
};

export default TableBody;