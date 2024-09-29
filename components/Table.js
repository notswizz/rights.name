import React, { useState, useMemo, useCallback } from 'react';
import { FaSearch } from 'react-icons/fa';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import { filterData, sortData } from './tableUtils';

const Table = ({ data, onStadiumClick, onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [searchBackgroundImage, setSearchBackgroundImage] = useState('isecover.jpeg');

  const memoizedHeaders = useMemo(() => {
    if (data && data.length > 0) {
      return data[0];
    }
    return [];
  }, [data]);

  const columnsToHide = useMemo(() => ['Conference1', 'Link 1', 'Link 2', 'Notes', 'stadium-url', 'Wikipedia'], []);
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

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    if (onSearchChange) {
      onSearchChange(newSearchTerm);
    }
  };

  return (
    <div className="bg-white shadow-2xl rounded-lg overflow-hidden max-w-full mx-auto border border-gray-200">
      <div 
        className="p-4 sm:p-8 md:p-12 lg:p-16 bg-gradient-to-r from-blue-400 to-indigo-500 border-b border-blue-700 relative h-30 sm:h-48 md:h-30 lg:h-30"
        style={{ 
          backgroundImage: `url(${searchBackgroundImage})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5)'
        }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center w-full sm:w-auto mb-4 sm:mb-0">
            <FaSearch className="text-white mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 sm:p-3 rounded-md border-2 sm:border-4 border-blue-300 bg-white bg-opacity-20 text-white placeholder-white focus:bg-white focus:text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className="flex items-center ml-2">
              <span className="inline-flex items-center justify-center px-2 py-2 sm:py-3 text-base sm:text-lg border-white border-2 sm:border-4 leading-none text-white bg-blue-500 bg-opacity-50 rounded-md">
                {sortedData.length}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="min-h-[200px] sm:min-h-[300px] max-h-[50vh] border-t border-gray-200 overflow-y-auto">
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