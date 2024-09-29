import React from 'react';

const News = ({ twitterHandle = 'ISE_Properties' }) => {
  return (
    <div className="w-full max-w-2xl mx-auto my-8 bg-white rounded-lg shadow-lg overflow-hidden">
      <h2 className="text-2xl font-bold text-gray-800 p-4 bg-blue-100">Latest News</h2>
      <div className="relative" style={{ paddingTop: '100%' }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://twitter.com/${twitterHandle}`}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default News;