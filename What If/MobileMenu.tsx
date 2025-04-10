'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MobileMenuProps {
  genres: { name: string; path: string }[];
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ genres, isOpen, onClose }) => {
  // Animation variants
  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    closed: { x: 20, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-background"
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      variants={menuVariants}
    >
      <div className="flex flex-col h-full p-6">
        <div className="flex justify-end mb-8">
          <button 
            onClick={onClose}
            className="text-2xl text-primary"
          >
            ✕
          </button>
        </div>
        
        <nav className="flex flex-col space-y-6">
          {genres.map((genre) => (
            <motion.a
              key={genre.name}
              href={genre.path}
              className="text-2xl font-medium uppercase tracking-wider hover:text-primary transition-colors"
              variants={itemVariants}
              whileHover={{ x: 10 }}
              onClick={onClose}
            >
              {genre.name}
            </motion.a>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export default MobileMenu;
