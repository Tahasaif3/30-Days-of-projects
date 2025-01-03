'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Play, Pause, RotateCcw, Flag } from 'lucide-react';

function padTime(time: number): string {
  return time.toString().padStart(2, '0');
}

function formatTime(time: number): string {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);

  return `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}.${padTime(milliseconds)}`;
}

const MotionCard = motion(Card);

export default function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    console.log('Current time:', time);
    console.log('Formatted time:', formatTime(time));
  }, [time]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const handleStartStop = useCallback(() => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  }, []);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  }, []);

  const handleLap = useCallback(() => {
    setLaps((prevLaps) => [...prevLaps, time]);
  }, [time]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center p-4">
      <MotionCard
        className="w-full max-w-md bg-gray-800/50 border-gray-700 backdrop-blur-md"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <CardContent className="p-6">
          {/* Timer Display */}
          <motion.div
            className="text-7xl font-bold text-center mb-8 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {formatTime(time).split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, type: 'spring', stiffness: 300, damping: 20 }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </motion.div>

          {/* Buttons */}
          <div className="flex justify-center space-x-4 mb-8">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant={isRunning ? 'destructive' : 'default'}
                size="lg"
                onClick={handleStartStop}
                className="relative overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isRunning ? 'pause' : 'play'}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isRunning ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                    {isRunning ? 'Stop' : 'Start'}
                  </motion.div>
                </AnimatePresence>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="secondary"
                size="lg"
                onClick={handleReset}
                disabled={time === 0 && laps.length === 0}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="lg" onClick={handleLap} disabled={!isRunning}>
                <Flag className="mr-2 h-4 w-4" />
                Lap
              </Button>
            </motion.div>
          </div>

          {/* Lap Section */}
          <AnimatePresence>
            {laps.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ScrollArea className="h-[200px] rounded-md border border-gray-700 p-4 bg-gray-800/30 backdrop-blur-sm">
                  <h3 className="font-semibold mb-2">Laps</h3>
                  {laps
                    .map((lapTime, index) => (
                      <motion.div
                        key={index}
                        className="flex justify-between items-center py-2 border-b border-gray-700"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span>Lap {laps.length - index}</span>
                        <span>{formatTime(lapTime)}</span>
                      </motion.div>
                    ))
                    .reverse()}
                </ScrollArea>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </MotionCard>
    </div>
  );
}
