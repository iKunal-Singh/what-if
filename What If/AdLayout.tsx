'use client';

import React from 'react';
import Ad from '../ui/Ad';

interface AdLayoutProps {
  children: React.ReactNode;
}

const AdLayout: React.FC<AdLayoutProps> = ({ children }) => {
  return (
    <div className="ad-layout">
      {/* Header Ad */}
      <div className="header-ad-container w-full flex justify-center py-4 bg-background/90 backdrop-blur-sm">
        <Ad slot="header" format="leaderboard" className="hidden md:block" />
        <Ad slot="header-mobile" format="banner" className="md:hidden" />
      </div>
      
      {/* Main Content */}
      <div className="main-content">
        {children}
      </div>
      
      {/* Between Sections Ad */}
      <div className="between-sections-ad-container w-full flex justify-center py-8">
        <Ad slot="between-sections" format="large-rectangle" className="hidden md:block" />
        <Ad slot="between-sections-mobile" format="banner" className="md:hidden" />
      </div>
      
      {/* Footer Ad */}
      <div className="footer-ad-container w-full flex justify-center py-4 bg-background/90 backdrop-blur-sm">
        <Ad slot="footer" format="leaderboard" className="hidden md:block" />
        <Ad slot="footer-mobile" format="banner" className="md:hidden" />
      </div>
    </div>
  );
};

export default AdLayout;
