'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ResponsiveGrid from './ResponsiveGrid';
import GenreCard from '../genre/GenreCard';

const genres = [
  { name: 'TECHNO', image: '/images/techno.jpg' },
  { name: 'CHILL', image: '/images/chill.jpg' },
  { name: 'HIP HOP', image: '/images/hiphop.jpg' },
  { name: 'SOUL', image: '/images/soul.jpg' },
  { name: 'FUNK', image: '/images/funk.jpg' },
  { name: 'JAZZ', image: '/images/jazz.jpg' },
];

const ResponsiveGenreGrid = () => {
  const handleGenreClick = (genre: string) => {
    console.log(`Navigating to ${genre} page`);
    // In a real implementation, this would navigate to the genre page
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <ResponsiveGrid 
        columns={{ sm: 1, md: 2, lg: 3 }}
        gap="6"
        className="w-full"
      >
        {genres.map((genre) => (
          <motion.div
            key={genre.name}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <GenreCard
              genre={genre.name}
              imageSrc={genre.image}
              onClick={() => handleGenreClick(genre.name)}
            />
          </motion.div>
        ))}
      </ResponsiveGrid>
    </section>
  );
};

export default ResponsiveGenreGrid;
