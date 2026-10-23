import React, { useEffect, useState } from 'react';

export const ReadingProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            const currentScroll = window.scrollY;
            const progress = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100));
            setScrollProgress(progress);
          } else {
            setScrollProgress(0);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full h-[3px] z-50 pointer-events-none bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-[#00C896] via-[#A7F3D0] to-[#00C896] transition-[width] duration-75 ease-out shadow-[0_0_8px_rgba(0,200,150,0.6)]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};
