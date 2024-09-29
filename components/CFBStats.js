import React, { useEffect, useState } from 'react';

const CFBStats = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getSheetData?sheet=CFB-STATS');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const formatCell = (cell, label) => {
    let icon = '📊';
    let textColor = 'text-blue-600';
    let borderColor = 'border-blue-300';
    let bgColor = 'from-blue-50 to-blue-100';
    let formattedCell = cell;

    if (typeof cell === 'string' && cell.includes('$')) {
      icon = '💵';
      textColor = 'text-green-600';
      borderColor = 'border-green-300';
      bgColor = 'from-green-50 to-green-100';
      formattedCell = cell.replace('$', '$') + 'M';
    } else if (!isNaN(cell) && !cell.includes('%')) {
      icon = '🤝';
      textColor = 'text-indigo-600';
      borderColor = 'border-indigo-300';
      bgColor = 'from-indigo-50 to-indigo-100';
    } else if (cell.includes('%')) {
      textColor = 'text-yellow-600';
      borderColor = 'border-yellow-300';
      bgColor = 'from-yellow-50 to-yellow-100';
    }

    return (
      <div className={`bg-gradient-to-br ${bgColor} p-2 rounded-lg shadow-lg transition-all duration-300 hover:shadow-lg border-2 ${borderColor} flex flex-col items-center justify-center h-full transform hover:-translate-y-1`}>
        <div className="flex items-center justify-center space-x-2">
          <span className={`${textColor} text-xl font-bold`}>{formattedCell}</span>
          <span className="text-lg">{icon}</span>
        </div>
        <span className="text-xs text-gray-600 font-medium block text-center">{label}</span>
      </div>
    );
  };

  return (
    <div className="stats-container bg-gradient-to-br from-black to-black p-2 rounded-lg shadow-md w-full mx-auto border border-gray-200">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {data.slice(1).map((row, rowIndex) => (
          <div key={rowIndex} className="h-18">
            {formatCell(row[1], row[0])}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CFBStats;