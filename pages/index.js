import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Table from '../components/Table';
import CFBStats from '../components/CFBStats';
import dynamic from 'next/dynamic';
import Header from '../components/Header';

const DynamicTable = dynamic(() => import('../components/Table'), { ssr: false });

export default function Home() {
  const [sport, setSport] = useState('College Football');
  const [category, setCategory] = useState('Stadium Naming Rights');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState('isecover.jpeg');

  const sportCategories = useMemo(() => ({
    'College Football': ['Stadium Naming Rights', 'Field Logos'],
    'College Basketball': ['Arena Naming Rights'],
    'MLB': ['Jersey Patches'],
    'NBA': ['Jersey Patches']
  }), []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    let sheet = 'FOOTBALL';
    if (sport === 'College Basketball' && category === 'Arena Naming Rights') {
      sheet = 'BASKETBALL';
    } else if (sport === 'MLB' && category === 'Jersey Patches') {
      sheet = 'MLB';
    } else if (sport === 'NBA' && category === 'Jersey Patches') {
      sheet = 'NBA';
    }

    try {
      const response = await fetch(`/api/getSheetData?sheet=${sheet}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const sheetData = await response.json();
      if (Array.isArray(sheetData)) {
        setData(sheetData);
      } else {
        throw new Error('Received data is not in the expected format');
      }
    } catch (e) {
      console.error('Error fetching data:', e);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, [sport, category]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleStadiumClick = useCallback((url) => {
    setCoverPhoto(url);
  }, []);

  const handleSportChange = useCallback((e) => {
    const newSport = e.target.value;
    setSport(newSport);
    setCategory(sportCategories[newSport][0]);
  }, [sportCategories]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-sky-600 py-4 sm:py-8 px-2 sm:px-4 md:px-6 lg:px-8 relative">
      <Header/>
      <div className="max-w-6xl mx-auto">
      <div className="text-center mb-4">
  <div className="inline-flex items-center bg-gray-800 rounded-lg p-1 shadow-lg">
    <select 
      value={sport} 
      onChange={handleSportChange}
      className="bg-transparent text-white focus:outline-none text-sm sm:text-base px-3 py-2 rounded-l-lg hover:bg-gray-700 transition-colors duration-200"
    >
      {Object.keys(sportCategories).map(s => (
        <option key={s} value={s} className="bg-gray-800">{s}</option>
      ))}
    </select>
    <span className="text-gray-500 px-2">|</span>
    <select 
      value={category} 
      onChange={(e) => setCategory(e.target.value)}
      className="bg-transparent text-white focus:outline-none text-sm sm:text-base px-3 py-2 rounded-r-lg hover:bg-gray-700 transition-colors duration-200"
    >
      {sportCategories[sport].map(c => (
        <option key={c} value={c} className="bg-gray-800">{c}</option>
      ))}
    </select>
  </div>
</div>
        <div className="flex bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg rounded-lg shadow-xl overflow-hidden">
          <div
            className="w-full p-2 sm:p-4"
            style={{  backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            {loading ? (
              <div className="text-center mt-10">Loading...</div>
            ) : error ? (
              <div className="text-red-500 text-center mt-10">{error}</div>
            ) : (
              <DynamicTable data={data} onStadiumClick={handleStadiumClick} />
            )}
          </div>
        </div>
        <div className="mt-2">
          <CFBStats />
        </div>
      </div>
    </div>
  );
}