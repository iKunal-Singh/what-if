'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AdProps {
  slot: string;
  format: string;
  className?: string;
}

const Ad: React.FC<AdProps> = ({ slot, format, className = '' }) => {
  // In a real implementation, this would integrate with Google AdSense or AdThrive
  // For now, we'll create a placeholder that simulates an ad
  
  // Determine dimensions based on format
  let width = '300px';
  let height = '250px';
  
  if (format === 'leaderboard') {
    width = '728px';
    height = '90px';
  } else if (format === 'banner') {
    width = '468px';
    height = '60px';
  } else if (format === 'skyscraper') {
    width = '160px';
    height = '600px';
  } else if (format === 'large-rectangle') {
    width = '336px';
    height = '280px';
  }
  
  return (
    <motion.div 
      className={`ad-container mx-auto overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div 
        className="ad-placeholder bg-gray-200 flex items-center justify-center text-gray-500 text-sm border border-gray-300"
        style={{ width, height, maxWidth: '100%' }}
      >
        <div className="text-center p-2">
          <p className="font-bold">ADVERTISEMENT</p>
          <p>{slot} - {format}</p>
          <p className="text-xs mt-2">Your ad could be here</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Ad;
