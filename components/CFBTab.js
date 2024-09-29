import React, { useEffect, useState } from 'react';

const CFBTab = () => {
  const [data, setData] = useState({ industry: [], conference: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('industry');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getSheetData?sheet=CFB-TAB');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        
        // Process the data
        const processedData = {
          industry: [],
          conference: []
        };
        
        let currentCategory = '';
        result.forEach(row => {
          if (row[0] === 'Industry' || row[0] === 'Conference') {
            currentCategory = row[0].toLowerCase();
          } else if (row[0] && row[1]) {
            processedData[currentCategory].push({ label: row[0], value: row[1] });
          }
        });

        setData(processedData);
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

  const getEmoji = (label) => {
    const emojiMap = {
      'Financial Services': '🏦',
      'Technology': '💻',
      'Retail': '🛍️',
      'Law': '⚖️',
      'Healthcare': '🏥',
      'Bank': '🏦',
      'Telecommunications': '📱',
      'Automotive': '🚗',
      'Food & Beverage': '🍔',
      'Insurance': '🛡️',
      'Real Estate': '🏠',
      'Entertainment': '🎭',
      'Education': '🎓',
      'Transportation': '🚂',
      'Agriculture': '🌾',
      'Construction': '🏗️',
      'Aerospace': '✈️',
      'Hospitality': '🏨',
      'Media': '📺',
      'Sports': '🏅',
    };
    return emojiMap[label] || '🏢'; // Default emoji for unknown industries
  };

  const formatCell = (label, value) => {
    return (
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-2 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-700 flex flex-col items-center justify-center w-full h-full">
        <span className="text-white text-lg font-bold mb-1 flex items-center">
          <span className="mr-2">{value}</span>
          <span>{getEmoji(label)}</span>
        </span>
        <span className="text-xs text-gray-400 font-medium text-center">
          {label}
        </span>
      </div>
    );
  };

  const renderTabContent = () => {
    return (
      <div className="grid grid-cols-1 gap-6 h-full">
        {data[activeTab].map((item, index) => (
          <div key={index} className="flex-1">
            {formatCell(item.label, item.value)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black p-4 rounded-lg shadow-md w-full h-full border border-gray-800 flex flex-col">
      <div className="flex mb-6">
        <button
          className={`flex-1 px-4 py-2 rounded-l-lg ${activeTab === 'industry' ? 'bg-blue-300 text-black' : 'bg-gray-700 text-gray-300'}`}
          onClick={() => setActiveTab('industry')}
        >
          Industry
        </button>
        <button
          className={`flex-1 px-4 py-2 rounded-r-lg ${activeTab === 'conference' ? 'bg-blue-300 text-black' : 'bg-gray-700 text-gray-300'}`}
          onClick={() => setActiveTab('conference')}
        >
          Conference
        </button>
      </div>
      <div className="flex-grow overflow-y-auto">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default CFBTab;