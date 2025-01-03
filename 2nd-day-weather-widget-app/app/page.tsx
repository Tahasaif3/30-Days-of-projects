'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const HomePage: React.FC = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/weather-widget');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-600 text-white p-4">
      <img
        src="https://cdn.leonardo.ai/users/a89cf29b-c2c2-480a-860e-8e4c26cda6e5/generations/0fc94a18-4fbb-4376-a9d3-37a96c374679/variations/Default_create_a_vector_logo_of_my_name_taha_1_0fc94a18-4fbb-4376-a9d3-37a96c374679_0.png"
        alt="MyLogo"
        className="absolute top-4 right-4 h-auto w-24 sm:w-32"
      />
      <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-center">
        <span className="typing-animation">Welcome to My Weather Widget App</span>
      </h1>
      <button
        onClick={handleRedirect}
        className="text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 transition duration-300"
      >
        Go to Weather Widget App
      </button>
    </div>
  );
};

export default HomePage;
