'use client';

import React from 'react';
import GenreCard from '../genre/GenreCard';

const genres = [
  { name: 'TECHNO', image: '/images/techno.jpg' },
  { name: 'CHILL', image: '/images/chill.jpg' },
  { name: 'HIP HOP', image: '/images/hiphop.jpg' },
  { name: 'SOUL', image: '/images/soul.jpg' },
  { name: 'FUNK', image: '/images/funk.jpg' },
  { name: 'JAZZ', image: '/images/jazz.jpg' },
];

const GenreGrid = () => {
  const handleGenreClick = (genre: string) => {
    console.log(`Navigating to ${genre} page`);
    // In a real implementation, this would navigate to the genre page
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {genres.map((genre) => (
          <GenreCard
            key={genre.name}
            genre={genre.name}
            imageSrc={genre.image}
            onClick={() => handleGenreClick(genre.name)}
          />
        ))}
      </div>
    </section>
  );
};

export default GenreGrid;
