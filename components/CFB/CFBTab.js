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
        const dealValue = parseFloat(row[7]);
        const conferenceImageUrl = row[0];

        if (!searchTerm || row.some(cell => cell && cell.toLowerCase().includes(searchTerm.toLowerCase()))) {
          ['industry', 'conference', 'agency'].forEach(category => {
            const value = category === 'industry' ? industry : category === 'conference' ? conference : agency;
            if (value) {
              if (!tally[category][value]) {
                tally[category][value] = { 
                  count: 0, 
                  total: 0, 
                  imageUrls: category === 'conference' ? [conferenceImageUrl] : [],
                  isISE: category === 'agency' && value === 'ISE'
                };
              } else if (category === 'conference') {
                tally[category][value].imageUrls.push(conferenceImageUrl);
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
        .map(([label, { count, total, imageUrls, isISE }]) => ({
          label,
          count,
          total: total.toFixed(2),
          average: (total / count).toFixed(2),
          imageUrl: category === 'conference' && imageUrls && imageUrls.length > 0 
            ? imageUrls[Math.floor(Math.random() * imageUrls.length)] 
            : '',
          isISE
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
    const isISECard = activeTab === 'agency' && item.isISE;
  
    return (
      <div className={`p-1 rounded-md shadow-md transition-all duration-300 hover:shadow-xl 
                       flex flex-col justify-between w-full h-full text-xs
                       ${isISECard 
                         ? 'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 animate-gradient-x' 
                         : 'bg-gradient-to-br from-gray-800 to-gray-900'}`}>
        <div className={`rounded-md p-2 h-full flex flex-col justify-between
                        ${isISECard 
                          ? 'bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm border-2 border-transparent' 
                          : 'border border-gray-600'}`}
             style={isISECard ? {
               boxShadow: '0 0 15px rgba(88, 101, 242, 0.5), inset 0 0 15px rgba(88, 101, 242, 0.5)',
               animation: 'pulse 2s infinite'
             } : {}}>
          <div className="text-center mb-1">
            <span className={`font-semibold truncate
                              ${isISECard ? 'text-white text-sm' : 'text-white text-xs'}`}>
              {item.label}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center flex-grow">
            {activeTab === 'industry' && (
              <span className="text-5xl mb-1">{getEmoji(item.label)}</span>
            )}
            {activeTab === 'conference' && item.imageUrl && (
              <img src={item.imageUrl} alt={item.label} className="w-12 h-12 object-contain mb-1" />
            )}
            {isISECard && (
             
                
                <div className="absolute inset-0 bg-blue-500 opacity-20 rounded-full animate-pulse"></div>
              
            )}
            <span className={`text-2xl font-bold ${isISECard ? 'text-pink-300' : 'text-blue-300'}`}>
              {item.count}
            </span>
          </div>
          <div className="flex justify-between items-end text-[0.6rem] mt-1">
            <div className="flex flex-col items-center">
              <span className={isISECard ? 'text-blue-200' : 'text-gray-400'}>Avg:</span>
              <span className={`font-bold ${isISECard ? 'text-green-300' : 'text-green-400'}`}>
                ${Math.round(item.average)}M
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className={isISECard ? 'text-blue-200' : 'text-gray-400'}>Total:</span>
              <span className={`font-bold ${isISECard ? 'text-yellow-300' : 'text-yellow-400'}`}>
                ${Math.round(item.total)}M
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    return (
      <div className="grid grid-cols-2 gap-1 auto-rows-fr">
        {processedData[activeTab].map((item, index) => (
          <div key={index} className="h-50">
            {formatCell(item)}
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="bg-gradient-to-br from-gray-500 to-black p-1 rounded-md shadow-lg w-full min-w-[250px] h-[750px] flex flex-col">
      <div className="flex mb-2">
        <button
          className={`flex-1 text-xs py-2 px-2 rounded-md ${activeTab === 'industry' ? 'bg-blue-300 text-black' : 'bg-gray-700 text-gray-300'}`}
          onClick={() => setActiveTab('industry')}
        >
          Industry
        </button>
        <button
          className={`flex-1 text-xs py-2 px-2 rounded-md ${activeTab === 'conference' ? 'bg-blue-300 text-black' : 'bg-gray-700 text-gray-300'}`}
          onClick={() => setActiveTab('conference')}
        >
          Conference
        </button>
        <button
          className={`flex-1 text-xs py-2 px-2 rounded-md ${activeTab === 'agency' ? 'bg-blue-300 text-black rounded-r-md' : 'bg-gray-700 text-gray-300'}`}
          onClick={() => setActiveTab('agency')}
        >
          Agency
        </button>
      </div>
      <div className="overflow-y-auto flex-grow">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default CFBTab;