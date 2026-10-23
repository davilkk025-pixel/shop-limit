import React from 'react';
import { Info, Facebook, Instagram, Twitter } from 'lucide-react';
import { CategoryType } from '../data/products';
import { AMAZON_ASSOCIATE_DISCLOSURE } from '../utils/affiliate';
import { ShopLimitLogo } from './ShopLimitLogo';

interface FooterProps {
  onNavigate: (view: string, params?: { category?: CategoryType; slug?: string }) => void;
  onOpenAffiliateGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAffiliateGuide }) => {
  return (
    <footer className="mt-20 bg-[#052920] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start pb-12 border-b border-white/10">
          
          {/* Brand Col: ShopLimitLogo */}
          <div className="lg:col-span-4 space-y-3">
            <button
              onClick={() => onNavigate('home')}
              className="text-left cursor-pointer group focus:outline-none"
              aria-label="Shop Limit Home"
            >
              <ShopLimitLogo variant="dark" size="md" showTagline={true} />
            </button>
            <p className="text-xs text-[#A7F3D0]/70 max-w-sm leading-relaxed pt-1">
              Independent, anti-hype product evaluations and smart shopping benchmarks helping you buy the right gear without overspending.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenAffiliateGuide}
                className="text-xs text-[#00C896] hover:text-[#A7F3D0] underline cursor-pointer transition-colors"
              >
                Affiliate Setup & Product Link Guide →
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs text-[#A7F3D0]/80">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('category', { category: 'Tech & Gadgets' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('home');
                    setTimeout(() => {
                      document.getElementById('featured-reviews-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('guides')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Buying Guides
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white tracking-wider">Support</h4>
            <ul className="space-y-2 text-xs text-[#A7F3D0]/80">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('terms')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('disclosure')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Affiliate Disclosure
                </button>
              </li>
            </ul>
          </div>

          {/* Follow Us & Social Icons */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white tracking-wider">Follow Us</h4>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#00C896] hover:text-[#052920] flex items-center justify-center transition-colors cursor-pointer text-white">
                <Facebook className="w-4 h-4" />
              </span>
              <span className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#00C896] hover:text-[#052920] flex items-center justify-center transition-colors cursor-pointer text-white">
                <Instagram className="w-4 h-4" />
              </span>
              {/* Pinterest Icon (SVG) */}
              <span className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#00C896] hover:text-[#052920] flex items-center justify-center transition-colors cursor-pointer text-white">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.373-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z"/>
                </svg>
              </span>
              <span className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#00C896] hover:text-[#052920] flex items-center justify-center transition-colors cursor-pointer text-white">
                <Twitter className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Compliant Amazon Associate Statement Card from Mockup */}
          <div className="lg:col-span-2">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/15 flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-[#00C896]/20 text-[#00C896] flex items-center justify-center shrink-0 mt-0.5">
                <Info className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-white leading-tight">
                  {AMAZON_ASSOCIATE_DISCLOSURE}
                </p>
                <p className="text-[10px] text-[#A7F3D0]/60 mt-1">
                  Amazon & the Amazon logo are trademarks of Amazon.com, Inc.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A7F3D0]/70 gap-3">
          <p>© 2025 Shop Limit. All rights reserved.</p>
          <p className="font-serif italic text-white/80">Better Products. Smarter Choices.</p>
        </div>
      </div>
    </footer>
  );
};
