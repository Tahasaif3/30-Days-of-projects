"use client"

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-blue-800 to-teal-500 flex flex-col items-center justify-center p-4 text-white">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold mb-4">GitHub Profile Explorer</h1>
        <p className="text-xl mb-8">Discover and visualize GitHub profiles with style</p>
        <Link href="/explore">
          <Button size="lg" className="bg-white text-purple-700 hover:bg-purple-100">
            Start Exploring
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
