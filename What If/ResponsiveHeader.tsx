'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import MobileMenu from './MobileMenu';

const genres = [
  { name: 'TECHNO', path: '/genre/techno' },
  { name: 'CHILL', path: '/genre/chill' },
  { name: 'HIP HOP', path: '/genre/hip-hop' },
  { name: 'SOUL', path: '/genre/soul' },
  { name: 'FUNK', path: '/genre/funk' },
  { name: 'JAZZ', path: '/genre/jazz' },
];

const ResponsiveHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="genre-nav hidden md:flex">
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
        
        {/* Mobile Navigation Bar */}
        <div className="flex justify-between items-center p-4 md:hidden">
          <Link href="/" className="text-2xl music-logo">
            MUSIC
          </Link>
          
          <motion.button
            className="text-2xl"
            onClick={() => setMobileMenuOpen(true)}
            whileTap={{ scale: 0.9 }}
          >
            ☰
          </motion.button>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <MobileMenu 
        genres={genres} 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />
    </>
  );
};

export default ResponsiveHeader;
