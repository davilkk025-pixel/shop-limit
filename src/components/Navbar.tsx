import React, { useState } from 'react';
import { Search, User, Menu, X, HelpCircle, Scale } from 'lucide-react';
import { CategoryType, CATEGORIES } from '../data/products';
import { ShopLimitLogo } from './ShopLimitLogo';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, params?: { category?: CategoryType; slug?: string }) => void;
  compareCount: number;
  onOpenSearch: () => void;
  onOpenAffiliateGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  compareCount,
  onOpenSearch,
  onOpenAffiliateGuide,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const navItemClass = (isActive: boolean) =>
    isActive
      ? 'bg-[#064E3B] text-white px-4 py-1.5 rounded-full font-medium text-xs sm:text-sm shadow-sm transition-all cursor-pointer'
      : 'text-[#102A24] hover:text-[#00C896] px-3 py-1.5 font-medium text-xs sm:text-sm transition-colors cursor-pointer';

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] transition-all">
      {/* Top Banner: FTC & Amazon Associate Transparency */}
      <div className="bg-[#064E3B] text-[#A7F3D0] text-[11px] py-1 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <span className="opacity-95">Shop Smart. Stay Within Your Limit.</span>
        <span className="hidden md:inline opacity-60">·</span>
        <span className="hidden md:inline opacity-90">
          Independent Amazon.com evaluations & smart shopping guides
        </span>
        <button
          onClick={onOpenAffiliateGuide}
          className="ml-2 underline text-white hover:text-[#A7F3D0] transition-colors cursor-pointer inline-flex items-center gap-1"
        >
          <HelpCircle className="w-3 h-3" />
          <span>Affiliate Setup</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          
          {/* Left: Brand Logo from Mockup */}
          <div className="flex items-center shrink-0">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className="group text-left cursor-pointer focus:outline-none"
              aria-label="Shop Limit Home"
            >
              <ShopLimitLogo variant="light" size="md" showTagline={true} />
            </button>
          </div>

          {/* Center: Clean Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
            <button
              onClick={() => onNavigate('home')}
              className={navItemClass(currentView === 'home')}
            >
              Home
            </button>

            {/* Categories Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCategoryDropdownOpen(true)}
              onMouseLeave={() => setCategoryDropdownOpen(false)}
            >
              <button
                onClick={() => onNavigate('category', { category: 'Tech & Gadgets' })}
                className={navItemClass(currentView === 'category')}
              >
                Categories
              </button>

              {categoryDropdownOpen && (
                <div className="absolute top-full left-0 w-64 pt-2 z-50">
                  <div className="bg-white p-2 rounded-2xl shadow-xl border border-[#DDEBE5] backdrop-blur-xl">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.slug}
                        onClick={() => {
                          onNavigate('category', { category: cat.name });
                          setCategoryDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#A7F3D0]/20 transition-colors flex flex-col group cursor-pointer"
                      >
                        <span className="text-sm font-medium text-[#102A24] group-hover:text-[#064E3B]">
                          {cat.name}
                        </span>
                        <span className="text-[11px] text-[#64748B] truncate">
                          {cat.description}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                onNavigate('home');
                setTimeout(() => {
                  const el = document.getElementById('featured-reviews-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }, 50);
              }}
              className={navItemClass(false)}
            >
              Reviews
            </button>

            <button
              onClick={() => onNavigate('guides')}
              className={navItemClass(currentView === 'guides')}
            >
              Buying Guides
            </button>

            <button
              onClick={() => onNavigate('about')}
              className={navItemClass(currentView === 'about')}
            >
              About
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className={navItemClass(currentView === 'contact')}
            >
              Contact
            </button>
          </nav>

          {/* Right: Integrated Search Pill & Profile / Menu */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search Pill from Mockup */}
            <div
              onClick={onOpenSearch}
              className="hidden sm:flex items-center justify-between pl-4 pr-1.5 py-1.5 rounded-full border border-[#DDEBE5] bg-white hover:border-[#00C896] shadow-xs cursor-pointer w-64 lg:w-72 transition-all group"
            >
              <span className="text-xs text-[#64748B] truncate select-none">
                Search for products, categories or guides...
              </span>
              <div className="w-7 h-7 rounded-full bg-[#007052] group-hover:bg-[#005a42] text-white flex items-center justify-center transition-colors shrink-0">
                <Search className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Compare Badge Shortcut */}
            {compareCount > 0 && (
              <button
                onClick={() => onNavigate('compare')}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#A7F3D0]/40 text-[#064E3B] rounded-full border border-[#00C896]/30 cursor-pointer"
                title="View compare matrix"
              >
                <Scale className="w-3.5 h-3.5 text-[#00C896]" />
                <span>Compare ({compareCount})</span>
              </button>
            )}

            {/* User Profile Icon */}
            <button
              onClick={() => onNavigate('about')}
              aria-label="User Profile"
              className="p-2 text-[#102A24] hover:text-[#00C896] hover:bg-[#F8FFFC] rounded-full transition-colors cursor-pointer"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Mobile / Compact Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#102A24] hover:bg-[#F8FFFC] rounded-full transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E2E8F0] px-4 pt-3 pb-6 space-y-3 shadow-lg">
          {/* Mobile search bar */}
          <div
            onClick={() => {
              onOpenSearch();
              setMobileMenuOpen(false);
            }}
            className="flex items-center justify-between p-3 rounded-full border border-[#DDEBE5] bg-[#F8FFFC] text-xs text-[#64748B] cursor-pointer"
          >
            <span>Search for products, categories or guides...</span>
            <div className="w-6 h-6 rounded-full bg-[#007052] text-white flex items-center justify-center">
              <Search className="w-3 h-3" />
            </div>
          </div>

          <div className="space-y-1 pt-2">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-[#102A24] hover:bg-[#A7F3D0]/20 cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => {
                onNavigate('category', { category: 'Tech & Gadgets' });
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-[#102A24] hover:bg-[#A7F3D0]/20 cursor-pointer"
            >
              Categories
            </button>
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
                setTimeout(() => {
                  document.getElementById('featured-reviews-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 50);
              }}
              className="w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-[#102A24] hover:bg-[#A7F3D0]/20 cursor-pointer"
            >
              Reviews
            </button>
            <button
              onClick={() => {
                onNavigate('guides');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-[#102A24] hover:bg-[#A7F3D0]/20 cursor-pointer"
            >
              Buying Guides
            </button>
            <button
              onClick={() => {
                onNavigate('compare');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-[#102A24] hover:bg-[#A7F3D0]/20 cursor-pointer flex items-center justify-between"
            >
              <span>Compare Products</span>
              {compareCount > 0 && (
                <span className="text-xs bg-[#00C896] text-white px-2 py-0.5 rounded-full font-bold">
                  {compareCount}
                </span>
              )}
            </button>
            <button
              onClick={() => {
                onNavigate('about');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-[#102A24] hover:bg-[#A7F3D0]/20 cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => {
                onNavigate('contact');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-[#102A24] hover:bg-[#A7F3D0]/20 cursor-pointer"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
