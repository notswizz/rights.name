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
    let bgColor = 'bg-gray-200';
    let textColor = 'text-gray-800';

    if (typeof cell === 'string' && cell.includes('%')) {
      bgColor = 'bg-yellow-500';
      textColor = 'text-white';
    } else if (typeof cell === 'string' && cell.includes('$')) {
      bgColor = 'bg-green-500';
      textColor = 'text-white';
    } else if (!isNaN(cell)) {
      bgColor = 'bg-blue-500';
      textColor = 'text-white';
    }

    return (
      <div className="flex flex-col items-center">
        <span className={`${bgColor} ${textColor} text-xl font-bold px-3  rounded-full mb-1`}>
          {cell}
        </span>
        <span className="text-sm text-gray-600">{label}</span>
      </div>
    );
  };

  return (
    <div className="stats-container bg-black p-2 rounded-xl shadow-lg max-w-5xl mx-auto border-8 border-blue-300">

      <div className="grid grid-cols-5 gap-4">
        {data.slice(1).map((row, rowIndex) => (
          <div key={rowIndex} className="bg-blue-50 p-2 rounded-lg shadow-sm">
            {formatCell(row[1], row[0])}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CFBStats;