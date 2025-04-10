'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

interface MusicNoteProps {
  delay: number;
  x: number;
  y: number;
  size: number;
  note: string;
}

const MusicNote: React.FC<MusicNoteProps> = ({ delay, x, y, size, note }) => {
  return (
    <motion.div
      className="absolute text-primary/30 pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        fontSize: `${size}rem`
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: [0.2, 0.5, 0.2],
        y: [0, -50, 0],
        x: [0, 10, 0, -10, 0]
      }}
      transition={{
        duration: 6,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {note}
    </motion.div>
  );
};

const ParallaxBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { width, height } = containerRef.current.getBoundingClientRect();
      
      // Calculate mouse position as percentage of container
      const xPercent = (clientX / width) * 100;
      const yPercent = (clientY / height) * 100;
      
      // Calculate movement offset (subtle effect)
      const moveX = (xPercent - 50) * 0.05;
      const moveY = (yPercent - 50) * 0.05;
      
      // Apply parallax effect to notes
      const notes = containerRef.current.querySelectorAll('.music-note');
      notes.forEach((note, index) => {
        const depth = index % 3 + 1; // Different depths for different notes
        gsap.to(note, {
          x: moveX * depth,
          y: moveY * depth,
          duration: 0.5,
          ease: "power1.out"
        });
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Generate random music notes
  const notes = ['♪', '♫', '♩', '♬', '♭', '♮'];
  const musicNotes = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    note: notes[Math.floor(Math.random() * notes.length)],
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 5
  }));
  
  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {musicNotes.map((noteProps) => (
        <MusicNote
          key={noteProps.id}
          delay={noteProps.delay}
          x={noteProps.x}
          y={noteProps.y}
          size={noteProps.size}
          note={noteProps.note}
        />
      ))}
    </div>
  );
};

export default ParallaxBackground;
