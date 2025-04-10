'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DownloadButton from '../ui/DownloadButton';
import Image from 'next/image';

interface TrackCardProps {
  title: string;
  artist: string;
  genre: string;
  bpm: number;
  key: string;
  coverImage: string;
  previewAudio: string;
}

const TrackCard: React.FC<TrackCardProps> = ({
  title,
  artist,
  genre,
  bpm,
  key,
  coverImage,
  previewAudio
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };
  
  return (
    <motion.div 
      className="track-card bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden"
      whileHover={{ y: -10 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Hidden audio element for preview */}
      <audio 
        ref={audioRef} 
        src={previewAudio} 
        preload="auto"
      />
      
      {/* Cover Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image 
          src={coverImage} 
          alt={`${title} by ${artist}`}
          className="w-full h-full object-cover transition-transform duration-300"
          width={400}
          height={400}
          style={{
            transform: isHovering ? 'scale(1.05)' : 'scale(1)',
            filter: 'grayscale(100%)'
          }}
        />
        
        {/* Overlay with play indicator on hover */}
        <AnimatePresence>
          {isHovering && (
            <motion.div 
              className="absolute inset-0 bg-black/40 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div 
                className="text-white text-5xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                ▶
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Track Info */}
      <div className="p-4">
        <h3 className="text-lg font-bold truncate">{title}</h3>
        <p className="text-sm text-gray-400 mb-2">{artist}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="inline-block px-2 py-1 text-xs bg-primary/20 text-primary rounded-full">
            {genre}
          </span>
          <span className="inline-block px-2 py-1 text-xs bg-gray-700/20 text-gray-300 rounded-full">
            {bpm} BPM
          </span>
          <span className="inline-block px-2 py-1 text-xs bg-gray-700/20 text-gray-300 rounded-full">
            {key}
          </span>
        </div>
        
        <DownloadButton 
          trackName={title}
          audioPreviewSrc={previewAudio}
        />
      </div>
    </motion.div>
  );
};

export default TrackCard;
