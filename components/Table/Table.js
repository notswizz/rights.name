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

  const columnsToHide = useMemo(() => ['Conference1', 'Link 1', 'Link 2', 'Notes', 'stadium-url', 'Wikipedia', 'Industry'], []);
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
    <div className="bg-white shadow-xl rounded-lg overflow-hidden mx-auto border border-gray-300">
      <div 
        className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 border-b border-blue-700 relative h-64"
        style={{ 
          backgroundImage: `url(${searchBackgroundImage})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          boxShadow: 'inset 0 0 50px rgba(0,0,0,0.4)'
        }}
      >
        <div className="flex items-center justify-left">
          <FaSearch className="text-white mr-3" />
          <input
            type="text"
            placeholder="Search..."
            className="w-60 p-3 rounded-md border-2 border-blue-300 bg-white bg-opacity-20 text-white placeholder-white focus:bg-white focus:text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="ml-4 text-lg text-white">
            {sortedData.length}
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="min-h-[200px] max-h-[50vh] border-t border-gray-200 overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-300">
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