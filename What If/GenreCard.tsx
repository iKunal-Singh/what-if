'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRef } from 'react';

interface GenreCardProps {
  genre: string;
  imageSrc: string;
  onHover?: () => void;
  onClick?: () => void;
}

const GenreCard: React.FC<GenreCardProps> = ({ 
  genre, 
  imageSrc, 
  onHover, 
  onClick 
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const handleHover = () => {
    // Play sound snippet on hover
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => console.log('Audio playback error:', err));
    }
    
    if (onHover) onHover();
  };
  
  const handleClick = () => {
    if (onClick) onClick();
  };
  
  return (
    <motion.div 
      className="genre-card aspect-square relative"
      whileHover={{ 
        scale: 1.1,
        boxShadow: '0 10px 25px rgba(232, 65, 24, 0.3)'
      }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={handleHover}
      onClick={handleClick}
    >
      {/* Hidden audio element for hover sound */}
      <audio 
        ref={audioRef} 
        src={`/audio/${genre.toLowerCase()}-snippet.mp3`} 
        preload="auto"
      />
      
      {/* Background image */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(100%)'
        }}
      />
      
      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/40 hover:bg-black/30 transition-colors duration-300" />
      
      {/* Genre name */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-textLight text-2xl font-display uppercase tracking-wider">
          {genre}
        </h2>
      </div>
    </motion.div>
  );
};

export default GenreCard;
