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
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        if (Array.isArray(result)) {
          setData(result);
        } else {
          throw new Error('Invalid data format received');
        }
      } catch (err) {
        setError(`Error fetching data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const styleConfig = {
    dollar: {
      icon: '💵',
      textColor: 'text-green-600',
      borderColor: 'border-green-300',
      bgColor: 'from-green-50 to-green-100',
    },
    percent: {
      icon: '📊',
      textColor: 'text-yellow-600',
      borderColor: 'border-yellow-300',
      bgColor: 'from-yellow-50 to-yellow-100',
    },
    number: {
      icon: '🤝',
      textColor: 'text-indigo-600',
      borderColor: 'border-indigo-300',
      bgColor: 'from-indigo-50 to-indigo-100',
    },
    default: {
      icon: '📊',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-300',
      bgColor: 'from-blue-50 to-blue-100',
    },
  };

  const formatCell = (cell, label) => {
    let style = styleConfig.default;
    let formattedCell = cell;

    if (typeof cell === 'string') {
      if (cell.includes('$')) {
        style = styleConfig.dollar;
        formattedCell = cell.replace('$', '') + 'M';
      } else if (cell.includes('%')) {
        style = styleConfig.percent;
      }
    } else if (!isNaN(parseFloat(cell))) {
      style = styleConfig.number;
    }

    return (
      <div
        className={`bg-gradient-to-br ${style.bgColor} p-2 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl border-2 ${style.borderColor} flex flex-col items-center justify-center h-full transform hover:-translate-y-1`}
      >
        <div className="flex items-center justify-center space-x-2">
          <span className={`${style.textColor} text-xl font-bold`}>{formattedCell}</span>
          <span className="text-lg">{style.icon}</span>
        </div>
        <span className="text-xs text-gray-600 font-medium text-center">{label}</span>
      </div>
    );
  };

  return (
    <div className="stats-container bg-gradient-to-br from-black to-black p-2 rounded-lg shadow-md w-full mx-auto border border-gray-200">
      {data.length > 1 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {data.slice(1).map((row, index) => (
            <div key={index} className="h-20">
              {formatCell(row[1], row[0])}
            </div>
          ))}
        </div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default CFBStats;