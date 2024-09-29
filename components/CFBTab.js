import React, { useState, useMemo } from 'react';

const CFBTab = ({ searchTerm, data }) => {
  const [activeTab, setActiveTab] = useState('industry');

  const processedData = useMemo(() => {
    const industryTally = {};
    const conferenceTally = {};
    const agencyTally = {};
    
    if (Array.isArray(data)) {
      data.forEach(row => {
        const industry = row[4];
        const conference = row[1];
        const agency = row[6];
        
        if (industry && (!searchTerm || row.some(cell => cell && cell.toLowerCase().includes(searchTerm.toLowerCase())))) {
          industryTally[industry] = (industryTally[industry] || 0) + 1;
        }
        if (conference && (!searchTerm || row.some(cell => cell && cell.toLowerCase().includes(searchTerm.toLowerCase())))) {
          conferenceTally[conference] = (conferenceTally[conference] || 0) + 1;
        }
        if (agency && (!searchTerm || row.some(cell => cell && cell.toLowerCase().includes(searchTerm.toLowerCase())))) {
          agencyTally[agency] = (agencyTally[agency] || 0) + 1;
        }
      });
    }

    const sortData = (data) => {
      return Object.entries(data)
        .map(([label, value]) => ({ label, value }))
        .sort((a, b) => b.value - a.value);
    };

    return {
      industry: sortData(industryTally),
      conference: sortData(conferenceTally),
      agency: sortData(agencyTally)
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
          <span>{activeTab === 'industry' ? getEmoji(label) : ''}</span>
        </span>
        <span className="text-xs text-gray-400 font-medium text-center">
          {label}
        </span>
      </div>
    );
  };

  const renderTabContent = () => {
    return (
      <div className="grid grid-cols-1 gap-4 h-full">
        {processedData[activeTab].map((item, index) => (
          <div key={index} className="flex-1">
            {formatCell(item.label, item.value)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black p-4 rounded-lg shadow-md w-full h-full border border-gray-800 flex flex-col">
      <div className="flex mb-4">
        <button
          className={`flex-1 px-4 py-2 ${activeTab === 'industry' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
          onClick={() => setActiveTab('industry')}
        >
          Industry
        </button>
        <button
          className={`flex-1 px-4 py-2 ${activeTab === 'conference' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
          onClick={() => setActiveTab('conference')}
        >
          Conference
        </button>
        <button
          className={`flex-1 px-4 py-2 ${activeTab === 'agency' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
          onClick={() => setActiveTab('agency')}
        >
          Agency
        </button>
      </div>
      <div className="flex-grow overflow-y-auto">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default CFBTab;