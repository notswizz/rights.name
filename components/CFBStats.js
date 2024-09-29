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
    let borderColor = 'border-blue-500';
    let textColor = 'text-blue-400';
    let icon = null;

    if (typeof cell === 'string' && cell.includes('%')) {
      borderColor = 'border-yellow-500';
      textColor = 'text-yellow-400';
      icon = '📊';
    } else if (typeof cell === 'string' && cell.includes('$')) {
      borderColor = 'border-green-500';
      textColor = 'text-green-400';
      icon = '💵';
    } else if (!isNaN(cell)) {
      borderColor = 'border-blue-500';
      textColor = 'text-blue-400';
      icon = '🔢';
    }

    return (
      <div className={`border ${borderColor} bg-gray-900 p-2 rounded-md shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105`}>
        <div className="flex items-center justify-between">
          <span className={`${textColor} text-xl font-bold`}>{cell}</span>
          {icon && <span className="text-sm ml-1">{icon}</span>}
        </div>
        <span className="text-xs text-gray-400 font-medium mt-1 block truncate">{label}</span>
      </div>
    );
  };

  return (
    <div className="stats-container bg-gray-900 p-4 rounded-lg shadow-md max-w-5xl mx-auto">
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-10">
        {data.slice(1).map((row, rowIndex) => (
          <div key={rowIndex}>
            {formatCell(row[1], row[0])}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CFBStats;