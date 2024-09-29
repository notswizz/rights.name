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
    let bgColor = 'bg-gray-800';
    let textColor = 'text-white';
    let icon = null;

    if (typeof cell === 'string' && cell.includes('%')) {
      bgColor = 'bg-yellow-900';
      textColor = 'text-yellow-300';
      icon = '📊';
    } else if (typeof cell === 'string' && cell.includes('$')) {
      bgColor = 'bg-green-900';
      textColor = 'text-green-300';
      icon = '💵';
    } else if (!isNaN(cell)) {
      bgColor = 'bg-blue-900';
      textColor = 'text-blue-300';
      icon = '🔢';
    }

    return (
      <div className={`${bgColor} p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105`}>
        <div className="flex items-center justify-between">
          <span className={`${textColor} text-2xl font-bold`}>{cell}</span>
          {icon && <span className="text-xl ml-2">{icon}</span>}
        </div>
        <span className="text-xs text-gray-400 font-medium mt-2 block">{label}</span>
      </div>
    );
  };

  return (
    <div className="stats-container bg-gray-900 p-2 rounded-xl shadow-2xl max-w-6xl mx-auto">
  
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
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