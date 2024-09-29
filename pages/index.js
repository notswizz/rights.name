import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import CFBStats from '../components/CFBStats';
import Image from 'next/image';

export default function Home() {
  const [sport, setSport] = useState('College Football');
  const [category, setCategory] = useState('Stadium Naming Rights');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState('isecover.jpeg');

  const sportCategories = {
    'College Football': ['Stadium Naming Rights', 'Field Logos'],
    'College Basketball': ['Arena Naming Rights'],
    'MLB': ['Jersey Patches'],
    'NBA': ['Jersey Patches']
  };

  useEffect(() => {
    async function fetchData() {
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
    }
    fetchData();
  }, [sport, category]);

  const handleStadiumClick = (url) => {
    setCoverPhoto(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-sky-600 py-8 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-2">
          <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl flex items-center justify-center space-x-4">
            <select 
              value={sport} 
              onChange={(e) => {
                setSport(e.target.value);
                setCategory(sportCategories[e.target.value][0]);
              }}
              className="bg-transparent text-white border-b border-white focus:outline-none text-sm sm:text-base"
            >
              {Object.keys(sportCategories).map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <span className="text-white">|</span>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="bg-transparent text-white border-b border-white focus:outline-none text-sm sm:text-base"
            >
              {sportCategories[sport].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </h1>
        </div>
        <div className="flex bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg rounded-lg shadow-1xl overflow-hidden">
          <div
            className="w-full p-4"
            style={{  backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            {loading ? (
              <div className="text-center mt-10">Loading...</div>
            ) : error ? (
              <div className="text-red-500 text-center mt-10">{error}</div>
            ) : (
              <Table data={data} onStadiumClick={handleStadiumClick} />
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