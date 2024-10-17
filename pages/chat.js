import React from 'react';
import Header from '../components/Header';

export default function Chat() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <iframe
            src="https://ise-chatbot.vercel.app/"
            title="ISE Chatbot"
            className="w-full h-screen border-0"
            style={{ borderRadius: '10px' }}
          ></iframe>
        </div>
      </div>
    </div>
  );
}