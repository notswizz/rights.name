import React, { useState, useMemo, useCallback } from 'react';
import { FaSearch } from 'react-icons/fa';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import { filterData, sortData } from './tableUtils';

const Table = ({ data, onStadiumClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [searchBackgroundImage, setSearchBackgroundImage] = useState('isecover.jpeg');

  const memoizedHeaders = useMemo(() => {
    if (data && data.length > 0) {
      return data[0];
    }
    return [];
  }, [data]);

  const columnsToHide = useMemo(() => ['Conference1', 'Link 1', 'Link 2', 'Notes', 'stadium-url'], []);
  const visibleHeaders = useMemo(() => memoizedHeaders.filter(header => !columnsToHide.includes(header)), [memoizedHeaders, columnsToHide]);

  const filteredData = useMemo(() => filterData(data, searchTerm), [data, searchTerm]);
  const sortedData = useMemo(() => sortData(filteredData, sortConfig, memoizedHeaders), [filteredData, sortConfig, memoizedHeaders]);

  const requestSort = useCallback((key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'ascending' ? 'descending' : 'ascending',
    }));
  }, []);

  const handleStadiumClick = useCallback((url) => {
    setSearchBackgroundImage(url);
    if (onStadiumClick) {
      onStadiumClick(url);
    }
  }, [onStadiumClick]);

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-full mx-auto">
 <div 
  className="p-4 sm:p-8 md:p-12 lg:p-16 bg-blue-100 border-b border-blue-700 relative h-30 sm:h-48 md:h-30 lg:h-30"
  style={{ 
    backgroundImage: `url(${searchBackgroundImage})`, 
    backgroundSize: 'cover', 
    backgroundPosition: 'center' 
  }}
>
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center w-full sm:w-auto mb-4 sm:mb-0">
            <FaSearch className="text-green-400 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 sm:p-3 rounded-md border-2 sm:border-4 border-blue-400 bg-transparent text-white placeholder-white focus:bg-white focus:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <span className="inline-flex opacity-50 items-center justify-center px-2 py-2 sm:py-3 text-base sm:text-lg border-black border-2 sm:border-4 leading-none text-black bg-blue-300">
              {sortedData.length}
            </span>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="min-h-[200px] sm:min-h-[300px] max-h-[50vh] overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <TableHeader
              visibleHeaders={visibleHeaders}
              requestSort={requestSort}
              sortConfig={sortConfig}
            />
            <TableBody
              sortedData={sortedData}
              visibleHeaders={visibleHeaders}
              headers={memoizedHeaders}
              columnsToHide={columnsToHide}
              onStadiumClick={handleStadiumClick}
            />
          </table>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Table);