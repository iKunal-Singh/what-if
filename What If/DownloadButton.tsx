'use client';

import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DownloadButtonProps {
  trackName: string;
  audioPreviewSrc: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ 
  trackName, 
  audioPreviewSrc 
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isHovering, setIsHovering] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  
  const handleMouseEnter = () => {
    setIsHovering(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => console.log('Audio preview playback error:', err));
      setIsPlaying(true);
    }
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };
  
  const handleClick = () => {
    // Pulse animation is handled by Framer Motion
    console.log(`Downloading ${trackName}`);
    // In a real implementation, this would trigger the download
  };
  
  return (
    <div className="relative">
      {/* Hidden audio element for preview */}
      <audio 
        ref={audioRef} 
        src={audioPreviewSrc} 
        preload="auto"
      />
      
      <motion.button
        className="download-btn flex items-center space-x-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        initial={{ boxShadow: "0 0 0 rgba(232, 65, 24, 0)" }}
        animate={{ 
          boxShadow: isHovering 
            ? "0 0 20px rgba(232, 65, 24, 0.5)" 
            : "0 0 0 rgba(232, 65, 24, 0)" 
        }}
        transition={{ duration: 0.3 }}
      >
        <span>Free Download</span>
        
        {/* Audio wave animation when hovering */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div 
              className="flex items-center space-x-1"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
            >
              {[1, 2, 3].map((i) => (
                <motion.span 
                  key={i}
                  className="bg-white w-0.5 h-3"
                  animate={{ 
                    height: [3, 12, 5, 9, 3],
                  }}
                  transition={{ 
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 0.8,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default DownloadButton;
