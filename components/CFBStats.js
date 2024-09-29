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
    let bgColor = 'bg-white';
    let textColor = 'text-gray-800';
    let icon = null;

    if (typeof cell === 'string' && cell.includes('%')) {
      bgColor = 'bg-yellow-50';
      textColor = 'text-yellow-700';
      icon = '📊';
    } else if (typeof cell === 'string' && cell.includes('$')) {
      bgColor = 'bg-green-50';
      textColor = 'text-green-700';
      icon = '💵';
    } else if (!isNaN(cell)) {
      bgColor = 'bg-blue-50';
      textColor = 'text-blue-700';
      icon = '🔢';
    }

    return (
      <div className={`${bgColor} p-3 rounded-md shadow-sm transition-all duration-300 hover:shadow-md hover:scale-102`}>
        <div className="flex items-center justify-between">
          <span className={`${textColor} text-xl font-bold`}>{cell}</span>
          {icon && <span className="text-lg ml-2">{icon}</span>}
        </div>
        <span className="text-xs text-gray-500 font-medium mt-1 block">{label}</span>
      </div>
    );
  };

  return (
    <div className="stats-container bg-gradient-to-br from-black to-black p-4 rounded-lg shadow-xl max-w-4xl mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
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