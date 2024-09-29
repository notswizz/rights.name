import React, { useState, useEffect, useCallback, useMemo } from 'react';

import Header from '../components/Header';
import Image from 'next/image';
import Link from 'next/link';



export default function Home() {


  return (
    <div className="min-h-screen ">
      <Header />
      
      {/* Landing Page Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mb-8">
          <Image
            src="/ise.jpeg"
            alt="ISE Logo"
            width={200}
            height={200}
            className="mx-auto rounded-full shadow-lg"
          />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-800">
          Independent Sports & Entertainment
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-600">
          The Leader in College Naming Rights 
        </p>
        <Link href="/research">
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            Explore Our Data
          </button>
        </Link>
      </div>

    
   
    </div>
  );
}