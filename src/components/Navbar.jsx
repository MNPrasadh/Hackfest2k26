import React, { useState, useEffect, useCallback } from 'react';
import MenuBar from './MenuBar';
import mkcelogo from '../image/mkcelogo.png';

export default function Navbar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    // Collapse on scroll down, expand on scroll up
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsCollapsed(true);
    } else if (currentScrollY < lastScrollY) {
      setIsCollapsed(false);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: isCollapsed ? '0 20px' : '0 40px',
      height: isCollapsed ? '60px' : '80px',
      position: 'fixed',
      width: '100%',
      top: 0,
      zIndex: 1000,
      background: 'transparent',
      borderBottom: 'none',
      transition: 'all 0.3s ease',
    }}>
      {/* Logo Area */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center',
        opacity: isCollapsed ? 0.7 : 1,
        transition: 'opacity 0.3s ease',
      }}>
        <img
          src={mkcelogo}
          alt="MKCE Logo"
          style={{
            height: isCollapsed ? '40px' : '60px',
            width: 'auto',
            objectFit: 'contain',
            filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))',
            transition: 'height 0.3s ease',
          }}
        />
      </div>

      {/* Menu Bar */}
      <MenuBar isCollapsed={isCollapsed} />
    </nav>
  );
}
