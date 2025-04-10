'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TrackCard from '../player/TrackCard';
import ResponsiveGrid from './ResponsiveGrid';

// Sample track data
const tracks = [
  {
    id: 1,
    title: 'Midnight Groove',
    artist: 'Your Name',
    genre: 'TECHNO',
    bpm: 128,
    key: 'A Minor',
    coverImage: '/images/techno.jpg',
    previewAudio: '/audio/techno-snippet.mp3',
    downloadUrl: '/audio/techno-full.mp3'
  },
  {
    id: 2,
    title: 'Sunset Waves',
    artist: 'Your Name',
    genre: 'CHILL',
    bpm: 95,
    key: 'G Major',
    coverImage: '/images/chill.jpg',
    previewAudio: '/audio/chill-snippet.mp3',
    downloadUrl: '/audio/chill-full.mp3'
  },
  {
    id: 3,
    title: 'Urban Flow',
    artist: 'Your Name',
    genre: 'HIP HOP',
    bpm: 90,
    key: 'E Minor',
    coverImage: '/images/hiphop.jpg',
    previewAudio: '/audio/hiphop-snippet.mp3',
    downloadUrl: '/audio/hiphop-full.mp3'
  },
  {
    id: 4,
    title: 'Deep Feelings',
    artist: 'Your Name',
    genre: 'SOUL',
    bpm: 75,
    key: 'D Minor',
    coverImage: '/images/soul.jpg',
    previewAudio: '/audio/soul-snippet.mp3',
    downloadUrl: '/audio/soul-full.mp3'
  },
  {
    id: 5,
    title: 'Groove Machine',
    artist: 'Your Name',
    genre: 'FUNK',
    bpm: 110,
    key: 'C Major',
    coverImage: '/images/funk.jpg',
    previewAudio: '/audio/funk-snippet.mp3',
    downloadUrl: '/audio/funk-full.mp3'
  },
  {
    id: 6,
    title: 'Blue Notes',
    artist: 'Your Name',
    genre: 'JAZZ',
    bpm: 85,
    key: 'Bb Major',
    coverImage: '/images/jazz.jpg',
    previewAudio: '/audio/jazz-snippet.mp3',
    downloadUrl: '/audio/jazz-full.mp3'
  }
];

const TracksGrid = () => {
  const [activeGenre, setActiveGenre] = useState<string | null>(null);
  
  // Filter tracks by genre if a genre is selected
  const filteredTracks = activeGenre 
    ? tracks.filter(track => track.genre === activeGenre)
    : tracks;
  
  const handleGenreFilter = (genre: string) => {
    setActiveGenre(genre === activeGenre ? null : genre);
  };
  
  const genres = [...new Set(tracks.map(track => track.genre))];
  
  return (
    <section className="container mx-auto px-4 py-16">
      {/* Genre filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {genres.map(genre => (
          <motion.button
            key={genre}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeGenre === genre 
                ? 'bg-primary text-white' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleGenreFilter(genre)}
          >
            {genre}
          </motion.button>
        ))}
      </div>
      
      {/* Tracks grid */}
      <ResponsiveGrid 
        columns={{ sm: 1, md: 2, lg: 3 }}
        gap="6"
        className="w-full"
      >
        {filteredTracks.map(track => (
          <motion.div
            key={track.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            layout
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.4 }}
          >
            <TrackCard
              title={track.title}
              artist={track.artist}
              genre={track.genre}
              bpm={track.bpm}
              key={track.key}
              coverImage={track.coverImage}
              previewAudio={track.previewAudio}
            />
          </motion.div>
        ))}
      </ResponsiveGrid>
    </section>
  );
};

export default TracksGrid;
