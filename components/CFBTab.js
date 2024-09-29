import React, { useState, useMemo } from 'react';

const CFBTab = ({ searchTerm, data }) => {
  const [activeTab, setActiveTab] = useState('industry');

  const processedData = useMemo(() => {
    const tally = {
      industry: {},
      conference: {},
      agency: {}
    };
    
    if (Array.isArray(data)) {
      data.forEach(row => {
        const industry = row[4];
        const conference = row[1];
        const agency = row[6];
        const dealValue = parseFloat(row[7]); // Assuming deal value is in the 8th column
        
        if (!searchTerm || row.some(cell => cell && cell.toLowerCase().includes(searchTerm.toLowerCase()))) {
          ['industry', 'conference', 'agency'].forEach(category => {
            const value = category === 'industry' ? industry : category === 'conference' ? conference : agency;
            if (value) {
              if (!tally[category][value]) {
                tally[category][value] = { count: 0, total: 0 };
              }
              tally[category][value].count++;
              if (!isNaN(dealValue)) {
                tally[category][value].total += dealValue;
              }
            }
          });
        }
      });
    }

    const processCategory = (category) => {
      return Object.entries(tally[category])
        .map(([label, { count, total }]) => ({
          label,
          count,
          total: total.toFixed(2),
          average: (total / count).toFixed(2)
        }))
        .sort((a, b) => b.count - a.count);
    };

    return {
      industry: processCategory('industry'),
      conference: processCategory('conference'),
      agency: processCategory('agency')
    };
  }, [data, searchTerm]);


  const getEmoji = (label) => {
    const emojiMap = {
      'Financial Services': '🏦',
      'Technology': '💻',
      'Retail': '🛍️',
      'Law': '⚖️',
      'Healthcare': '🏥',
      'Energy': '⚡',
      'Tele': '📱',
      'Automobile': '🚗',
      'Food & Beverage': '🍔',
      'Insurance': '🛡️',
      'Credit Union': '🏠',
      'Entertainment': '🎭',
      'Education': '🎓',
      'Transportation': '🚂',
      'Agriculture': '🌾',
      'Construction': '🏗️',
      'Bank': '🏦',
      'Manufacturing': '🔨',
      'Grocery': '🛒',
      'Airline': '✈️',
    };
    return emojiMap[label] || '🏢'; // Default emoji for unknown industries
  };

  const formatCell = (item) => {
    return (
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-2 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-700 flex flex-col justify-between w-full h-full">
        <div className="text-center mb-1">
          <span className="text-white text-md font-bold truncate">
            {item.label}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center flex-grow">
          {activeTab === 'industry' && (
            <span className="text-6xl mb-1">{getEmoji(item.label)}</span>
          )}
          <span className="text-blue-400 text-3xl font-bold">
            {item.count}
          </span>
        </div>
        <div className="flex justify-between items-end text-[0.6rem] mt-1">
          <div className="flex flex-col items-center">
            <span className="text-gray-400">Avg:</span>
            <span className="text-green-400 font-bold">${Math.round(item.average)}M</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-gray-400">Total:</span>
            <span className="text-yellow-400 font-bold">${Math.round(item.total)}M</span>
          </div>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    return (
      <div className="grid grid-cols-2 gap-2 auto-rows-fr h-full">
        {processedData[activeTab].map((item, index) => (
          <div key={index} className="h-full">
            {formatCell(item)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black p-2 rounded-lg shadow-md w-full h-full border border-gray-800 flex flex-col">
      <div className="flex mb-2">
        <button
          className={`flex-1 px-2 py-1 text-xs ${activeTab === 'industry' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
          onClick={() => setActiveTab('industry')}
        >
          Industry
        </button>
        <button
          className={`flex-1 px-2 py-1 text-xs ${activeTab === 'conference' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
          onClick={() => setActiveTab('conference')}
        >
          Conference
        </button>
        <button
          className={`flex-1 px-2 py-1 text-xs ${activeTab === 'agency' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
          onClick={() => setActiveTab('agency')}
        >
          Agency
        </button>
      </div>
      <div className="flex-grow overflow-hidden">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default CFBTab;