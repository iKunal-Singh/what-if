'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ResponsiveHeader from '../components/layout/ResponsiveHeader';
import Hero from '../components/layout/Hero';
import ResponsiveGenreGrid from '../components/layout/ResponsiveGenreGrid';
import TracksGrid from '../components/layout/TracksGrid';
import AdLayout from '../components/layout/AdLayout';
import ParallaxBackground from '../components/ui/ParallaxBackground';

export default function Home() {
  return (
    <AdLayout>
      <main className="min-h-screen">
        {/* Header */}
        <ResponsiveHeader />
        
        {/* Hero Section with Parallax Background */}
        <div className="relative">
          <Hero backgroundImage="/images/hero-bg.jpg" />
          <ParallaxBackground />
        </div>
        
        {/* Genre Grid Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <ResponsiveGenreGrid />
        </motion.section>
        
        {/* Tracks Grid Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <TracksGrid />
        </motion.section>
        
        {/* Footer */}
        <footer className="py-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Your Music Website. All rights reserved.</p>
        </footer>
      </main>
    </AdLayout>
  );
}
