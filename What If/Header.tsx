'use client';

import React from 'react';
import Link from 'next/link';

const genres = [
  { name: 'TECHNO', path: '/genre/techno' },
  { name: 'CHILL', path: '/genre/chill' },
  { name: 'HIP HOP', path: '/genre/hip-hop' },
  { name: 'SOUL', path: '/genre/soul' },
  { name: 'FUNK', path: '/genre/funk' },
  { name: 'JAZZ', path: '/genre/jazz' },
];

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <nav className="genre-nav">
        {genres.map((genre) => (
          <Link 
            key={genre.name} 
            href={genre.path}
            className="genre-nav-item"
          >
            {genre.name}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
