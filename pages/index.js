import React from 'react';
import Header from '../components/Header';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      {/* Landing Page Section */}
      <div className="container mx-auto px-4 py-16 text-center">
      <div className="mb-8">
  <div className="relative mx-auto w-52 h-52 rounded-full shadow-2xl overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-xl">
    <Image
      src="/isecover.jpeg"
      alt="ISE Cover"
      layout="fill"
      objectFit="cover"
      className="rounded-full"
    />
  </div>
</div>
  
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-800">
          Independent Sports & Entertainment
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-600">
          The Leader in College Naming Rights 
        </p>
        <div className="flex justify-center space-x-4">
          <div className="text-center">
            <Link href="/research" className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-6 px-6 rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-110 hover:shadow-xl">
              Explore Our Data
            </Link>
           
          </div>
          <div className="text-center">
            <Link href="/chat" className="inline-block bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold py-6 px-6 rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-110 hover:shadow-xl">
              Chat With Bot
            </Link>
           
          </div>
        </div>
      </div>
    </div>
  );
}