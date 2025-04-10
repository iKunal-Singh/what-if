'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

interface HeroProps {
  backgroundImage?: string;
}

const Hero: React.FC<HeroProps> = ({ backgroundImage = '/images/hero-bg.jpg' }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const musicTextRef = useRef<HTMLHeadingElement>(null);
  
  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current && musicTextRef.current) {
        const scrollPosition = window.scrollY;
        gsap.to(musicTextRef.current, {
          y: scrollPosition * 0.3,
          duration: 0.5,
          ease: 'power1.out'
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Floating musical notes animation
  useEffect(() => {
    if (heroRef.current) {
      // Create floating musical notes
      const notes = ['♪', '♫', '♩', '♬', '♭', '♮'];
      const notesContainer = document.createElement('div');
      notesContainer.className = 'absolute inset-0 overflow-hidden pointer-events-none';
      
      for (let i = 0; i < 15; i++) {
        const note = document.createElement('div');
        note.className = 'absolute text-primary/30 text-3xl floating';
        note.style.left = `${Math.random() * 100}%`;
        note.style.top = `${Math.random() * 100}%`;
        note.style.animationDelay = `${Math.random() * 5}s`;
        note.textContent = notes[Math.floor(Math.random() * notes.length)];
        notesContainer.appendChild(note);
      }
      
      heroRef.current.appendChild(notesContainer);
      
      return () => {
        if (heroRef.current) {
          heroRef.current.removeChild(notesContainer);
        }
      };
    }
  }, []);
  
  return (
    <div ref={heroRef} className="hero-section">
      {/* Background image with parallax effect */}
      <div 
        className="parallax-bg"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(100%)'
        }}
      />
      
      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/30" />
      
      {/* MUSIC text */}
      <motion.h1 
        ref={musicTextRef}
        className="music-logo text-9xl md:text-[15rem] relative z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        MUSIC
      </motion.h1>
    </div>
  );
};

export default Hero;
