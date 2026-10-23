import React from 'react';

interface ShopLimitLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export const ShopLimitLogo: React.FC<ShopLimitLogoProps> = ({
  variant = 'light',
  size = 'md',
  showTagline = true,
  className = '',
}) => {
  const isDark = variant === 'dark';

  const cartColor = '#00C896';
  const shopTextColor = isDark ? '#FFFFFF' : '#102A24';
  const limitTextColor = '#00C896';
  const tagColor = isDark ? 'text-[#A7F3D0]/80' : 'text-[#64748B]';

  const iconSizes = {
    sm: { w: 32, h: 28, text: 'text-lg', sub: 'text-[9px]' },
    md: { w: 42, h: 36, text: 'text-2xl', sub: 'text-[11px]' },
    lg: { w: 54, h: 46, text: 'text-3xl', sub: 'text-xs' },
  }[size];

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Precision Vector Shopping Cart with dynamic speed lines matching the brand identity */}
      <svg
        width={iconSizes.w}
        height={iconSizes.h}
        viewBox="0 0 54 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform group-hover:scale-105"
        aria-hidden="true"
      >
        {/* Speed / Shelf Lines of the Cart Basket */}
        {/* Top Handle and Rim */}
        <path
          d="M4 8H12L17.5 27H41L47 11H17"
          stroke={cartColor}
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Horizontal Speed Lines in Basket */}
        <path
          d="M6 14H24"
          stroke={cartColor}
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path
          d="M2 20H21"
          stroke={cartColor}
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path
          d="M8 26H18"
          stroke={cartColor}
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* Wheels */}
        <circle cx="21" cy="36" r="4.2" fill={cartColor} />
        <circle cx="37" cy="36" r="4.2" fill={cartColor} />
        {/* Inner Hub Accent for Depth */}
        <circle cx="21" cy="36" r="1.5" fill={isDark ? '#052920' : '#FFFFFF'} />
        <circle cx="37" cy="36" r="1.5" fill={isDark ? '#052920' : '#FFFFFF'} />
      </svg>

      {/* Brand Typographic Lockup */}
      <div className="flex flex-col leading-tight">
        <span className={`font-display font-extrabold tracking-tight ${iconSizes.text}`}>
          <span style={{ color: shopTextColor }}>Shop </span>
          <span style={{ color: limitTextColor }}>Limit</span>
        </span>
        {showTagline && (
          <span className={`font-medium tracking-tight ${iconSizes.sub} ${tagColor}`}>
            Shop Smart. Stay Within Your Limit.
          </span>
        )}
      </div>
    </div>
  );
};
