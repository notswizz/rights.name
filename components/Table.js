import React, { useState, useMemo } from 'react';
import { FaSearch } from 'react-icons/fa';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import { filterData, sortData } from './tableUtils';

const Table = ({ data, onStadiumClick }) => {
  const [headers, setHeaders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [searchBackgroundImage, setSearchBackgroundImage] = useState('isecover.jpeg');

  useMemo(() => {
    if (data && data.length > 0) {
      setHeaders(data[0]);
    }
  }, [data]);

  const columnsToHide = ['Conference1', 'Link 1', 'Link 2', 'Notes', 'stadium-url'];
  const visibleHeaders = headers.filter(header => !columnsToHide.includes(header));

  const filteredData = useMemo(() => filterData(data, searchTerm), [data, searchTerm]);
  const sortedData = useMemo(() => sortData(filteredData, sortConfig, headers), [filteredData, sortConfig, headers]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleStadiumClick = (url) => {
    setSearchBackgroundImage(url);
    if (onStadiumClick) {
      onStadiumClick(url);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-6xl mx-1">
      <div 
        className="p-20 bg-blue-100 border-b border-blue-700 relative"
        style={{ 
          backgroundImage: `url(${searchBackgroundImage})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-grow mr-4">
            <FaSearch className="text-green-400 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-4 rounded-md border-4 border-blue-400 bg-transparent text-white placeholder-white focus:bg-white focus:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <span className="inline-flex items-center justify-center px-2 py-4 text-lg border-black border-4 leading-none text-black bg-blue-300">
              {sortedData.length}
            </span>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="min-h-[300px] max-h-[50vh] overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <TableHeader
              visibleHeaders={visibleHeaders}
              requestSort={requestSort}
              sortConfig={sortConfig}
            />
            <TableBody
              sortedData={sortedData}
              visibleHeaders={visibleHeaders}
              headers={headers}
              columnsToHide={columnsToHide}
              onStadiumClick={handleStadiumClick}
            />
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;