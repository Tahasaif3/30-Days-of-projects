'use client';

import React, { useState, useEffect } from 'react';

const CountdownTimer: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState<number>(0);

  
  const radius = 90;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, remainingTime]);

  const handleStart = () => {
    if (time > 0) {
      setRemainingTime(time);
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setRemainingTime(0);
    setTime(0);
  };

  const progress = (remainingTime / time) * circumference || 0;

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-gray-800 to-gray-600">
<img
        src="https://cdn.leonardo.ai/users/a89cf29b-c2c2-480a-860e-8e4c26cda6e5/generations/0fc94a18-4fbb-4376-a9d3-37a96c374679/variations/Default_create_a_vector_logo_of_my_name_taha_1_0fc94a18-4fbb-4376-a9d3-37a96c374679_0.png"
        alt="MyLogo"
        className="absolute top-4 right-4 h-auto w-32"
      />
      <h1 className="text-5xl font-extrabold uppercase text-white mb-8 animate-fade-in">Countdown Timer</h1>
 


      {/* Input field */}
      <input
        type="number"
        className="border-2 border-gray-400 bg-transparent p-3 mb-6 text-blue-400 text-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 animate-fade-in"
        placeholder="Enter Time (in Seconds)"
        value={time > 0 ? time : ""}
        onChange={(e) => setTime(Number(e.target.value))}
      />

      {/* Circular Progress Bar */}
      <div className="relative w-48 h-48 mb-8">
        <svg className="w-full h-full">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="gray"
            strokeWidth="12"
            fill="transparent"
          />
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="blue"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        <div
          className={`absolute inset-0 flex items-center justify-center text-4xl font-bold text-white ${
            remainingTime <= 10 && remainingTime > 0 ? "animate-pulse" : ""
          } animate-fade-in`}
        >
          {remainingTime} <span className="text-lg ml-1">s</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mb-10">
        <button
          onClick={handleStart}
          className="text-white px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 transition duration-300 animate-fade-in"
        >
          Start
        </button>
        <button
          onClick={handlePause}
          className="text-white px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 transition duration-300 animate-fade-in"
        >
          Pause
        </button>
        <button
          onClick={handleReset}
          className="text-white px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 transition duration-300 animate-fade-in"
        >
          Reset
        </button>
      </div>

      <footer className="text-black text-sm mt-10">
        <p className="text-gray-300">Made By Taha Saif (GIAIC Student)</p>
      </footer>
    </div>
  );
};

export default CountdownTimer;
