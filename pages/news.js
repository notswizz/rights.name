import React from 'react';
import Header from '../components/Header';
import Image from 'next/image';
import Link from 'next/link';
import News from '../components/News';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      {/* Landing Page Section */}
      <div className="container mx-auto px-4 py-16 text-center">
      <a class="twitter-timeline" href="https://twitter.com/ISE_Properties?ref_src=twsrc%5Etfw">Tweets by ISE_Properties</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
      </div>

      {/* News Section */}

    </div>
  );
}