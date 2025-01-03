'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const HomePage: React.FC = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/countdown');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <h1 className="text-5xl font-bold mb-8">Welcome to My Countdown Timer</h1>
      <button
        onClick={handleRedirect}
        className="text-white px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 transition duration-300"
      >
        Go to Countdown Timer
      </button>
    </div>
  );
};

export default HomePage;
