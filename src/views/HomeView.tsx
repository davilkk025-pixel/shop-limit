import React, { useState } from 'react';
import { 
  ArrowRight, 
  Search, 
  ShieldCheck, 
  LayoutGrid, 
  Star, 
  Leaf, 
  Mail, 
  CheckCircle2, 
  BookOpen, 
  Scale 
} from 'lucide-react';
import { Product, CATEGORIES, CategoryType } from '../data/products';
import { BUYING_GUIDES } from '../data/guides';
import { FTC_PRODUCT_DISCLOSURE } from '../utils/affiliate';

interface HomeViewProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onNavigate: (view: string, params?: { category?: CategoryType; slug?: string }) => void;
  compareList: Product[];
  onToggleCompare: (product: Product) => void;
  onOpenSearch: () => void;
  onOpenAffiliateGuide: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  products,
  onSelectProduct,
  onNavigate,
  compareList,
  onToggleCompare,
  onOpenSearch,
  onOpenAffiliateGuide,
}) => {
  // Newsletter state for sidebar
  const [sidebarEmail, setSidebarEmail] = useState('');
  const [sidebarSubscribed, setSidebarSubscribed] = useState(false);

  const handleSidebarSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (sidebarEmail.trim() && sidebarEmail.includes('@')) {
      setSidebarSubscribed(true);
      setSidebarEmail('');
      setTimeout(() => setSidebarSubscribed(false), 5000);
    }
  };

  // 4 Featured Products matching the mockup
  const featuredReviews = [
    products.find(p => p.slug === 'macbook-air-m2') || products[0],
    products.find(p => p.slug === 'sony-wh-1000xm5') || products[1],
    products.find(p => p.slug === 'ninja-air-fryer') || products[2],
    products.find(p => p.slug === 'nike-running-shoes') || products[3],
  ].filter(Boolean) as Product[];

  // Top Picks this month matching the mockup sidebar
  const topPicks = [
    {
      title: 'Wireless Headphones',
      category: 'Tech & Gadgets',
      product: products.find(p => p.slug === 'sony-wh-1000xm5') || products[1],
      thumbnail: '/src/assets/images/sony_headphones_review_1792734129845.jpg',
    },
    {
      title: 'Air Fryer',
      category: 'Home & Kitchen',
      product: products.find(p => p.slug === 'ninja-air-fryer') || products[2],
      thumbnail: '/src/assets/images/ninja_air_fryer_1792734158549.jpg',
    },
    {
      title: 'Running Shoes',
      category: 'Fashion & Accessories',
      product: products.find(p => p.slug === 'nike-running-shoes') || products[3],
      thumbnail: '/src/assets/images/nike_running_shoes_1792734173928.jpg',
    },
    {
      title: 'Smart Watch',
      category: 'Fitness & Lifestyle',
      product: products.find(p => p.slug === 'pureform-biometric-recovery-band') || products[0],
      thumbnail: '/src/assets/images/category_fitness_gear_1792734218664.jpg',
    },
  ];

  return (
    <div className="space-y-10 md:space-y-12 pb-16">
      
      {/* ======================================================== */}
      {/* HERO SECTION — Luxurious Emerald Crystal Facet Texture  */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-[#02241b] border border-[#00C896]/40 crystal-border">
          
          {/* Layer 1: High-Definition Emerald Crystal Faceted Texture */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img
              src="/src/assets/images/emerald_faceted_crystal_1792734764572.jpg"
              alt="Emerald crystal faceted texture"
              className="w-full h-full object-cover object-right opacity-65 scale-105 filter brightness-110 contrast-125"
            />
            {/* Layer 2: Dual Gradient Readability & Deep Gemstone Shield */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#021f17] via-[#033226]/95 via-45% to-[#054a39]/40" />
            
            {/* Layer 3: Crystal Prismatic Refraction Highlights */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[radial-gradient(circle,_rgba(0,200,150,0.35)_0%,_rgba(167,243,208,0.15)_35%,_transparent_70%)] blur-2xl" />
            <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-[radial-gradient(circle,_rgba(0,200,150,0.2)_0%,_transparent_70%)] blur-3xl" />
          </div>

          {/* Layer 4: Geometric Crystal Facet Line Accents (SVG 3D Wireframe) */}
          <svg 
            className="absolute right-0 top-0 h-full w-full max-w-2xl pointer-events-none opacity-25 z-0" 
            viewBox="0 0 600 400" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points="450,20 580,120 510,250 380,180" stroke="#A7F3D0" strokeWidth="1.2" fill="url(#crystalGrad1)" />
            <polygon points="580,120 590,320 510,250" stroke="#00C896" strokeWidth="1" fill="url(#crystalGrad2)" />
            <polygon points="380,180 510,250 420,380 320,300" stroke="#A7F3D0" strokeWidth="1" fill="url(#crystalGrad1)" />
            <polygon points="450,20 380,180 290,100" stroke="#00C896" strokeWidth="0.8" />
            <line x1="290" y1="100" x2="380" y2="180" stroke="#A7F3D0" strokeWidth="1" strokeDasharray="3 3" />
            <defs>
              <linearGradient id="crystalGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00C896" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#064E3B" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="crystalGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#A7F3D0" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#00C896" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>

          {/* Main Hero Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12 relative z-10">
            
            {/* Left Col: Badges, Headline, Copy & Large Search Bar */}
            <div className="lg:col-span-7 space-y-5 text-white">
              
              {/* Trust Badge with Crystal Glass Reflection */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#00C896]/40 text-xs font-medium text-white shadow-[0_2px_12px_rgba(0,200,150,0.15)]">
                <ShieldCheck className="w-4 h-4 text-[#00C896]" />
                <span className="tracking-wide">Trusted Amazon Affiliate Reviews</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.12] drop-shadow-sm">
                  Find the Best Products<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F8FFFC] to-[#A7F3D0]">
                    Within Your Budget
                  </span>
                </h1>
                <p className="text-xs sm:text-sm text-white/90 max-w-lg leading-relaxed pt-1 font-normal drop-shadow-xs">
                  Real reviews. Honest comparisons. Smarter choices.<br />
                  We help you find the best products on Amazon —<br className="hidden sm:inline" />
                  so you can shop smart and stay within your limit.
                </p>
              </div>

              {/* Big Integrated Hero Search Bar with Crystal Border */}
              <div className="pt-2 max-w-xl">
                <div 
                  onClick={onOpenSearch}
                  className="bg-white/98 backdrop-blur-md rounded-full p-1.5 pl-4 sm:pl-5 pr-2 flex items-center justify-between shadow-[0_12px_30px_rgba(0,0,0,0.25)] border border-white hover:border-[#00C896] cursor-pointer group transition-all"
                >
                  <div className="flex items-center gap-3 overflow-hidden text-[#64748B]">
                    <Search className="w-4 h-4 text-[#94A3B8] shrink-0 group-hover:text-[#00C896] transition-colors" />
                    <span className="text-xs sm:text-sm truncate select-none">
                      Search for products, categories or guides...
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenSearch();
                    }}
                    className="bg-[#007052] hover:bg-[#005a42] text-white px-5 sm:px-7 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-colors shrink-0 shadow-md"
                  >
                    Search
                  </button>
                </div>
              </div>

            </div>

            {/* Right Col: Showcase Collage with Crystal Reflections from Mockup */}
            <div className="lg:col-span-5 relative">
              
              {/* Floating "Better Products Better Choices" Callout with Emerald Glow */}
              <div className="absolute -top-5 -right-2 sm:-top-3 sm:right-0 z-20 pointer-events-none text-right">
                <div className="px-4 py-1.5 rounded-2xl bg-[#02241b]/80 backdrop-blur-md border border-[#00C896]/40 shadow-lg">
                  <p className="font-serif italic text-white/95 text-xs sm:text-sm font-light tracking-wide leading-tight">
                    Better Products<br />
                    <span className="text-[#A7F3D0] font-medium not-italic font-display text-[11px] sm:text-xs">
                      Better Choices
                    </span>
                  </p>
                </div>
              </div>

              {/* Composition Image inside Emerald Crystal Glass Frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.4)] border border-[#00C896]/50 group">
                <img
                  src="/src/assets/images/hero_gadgets_showcase_1792734189605.jpg"
                  alt="Curated headphones, laptop, smartphone, smartwatch and earbuds showcase"
                  className="w-full h-64 sm:h-72 lg:h-84 object-cover object-center group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#021f17]/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-[#02241b]/80 backdrop-blur-md border border-[#00C896]/30 text-[10px] text-[#A7F3D0] font-medium">
                  Shop Limit Curated Studio Selection
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* TWO-COLUMN LAYOUT: MAIN CONTENT (LEFT) + SIDEBAR (RIGHT) */}
      {/* ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ========================================== */}
          {/* LEFT MAIN COLUMN (~72% / col-span-8 or 9) */}
          {/* ========================================== */}
          <main className="lg:col-span-8 xl:col-span-9 space-y-12">
            
            {/* ------------------------------------------ */}
            {/* 1. Shop by Category Section                */}
            {/* ------------------------------------------ */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#00C896]/15 flex items-center justify-center text-[#00C896]">
                    <LayoutGrid className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-lg sm:text-xl text-[#102A24] leading-tight">
                      Shop by Category
                    </h2>
                    <p className="text-xs text-[#64748B]">
                      Explore top categories and find exactly what you need.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('category', { category: 'Tech & Gadgets' })}
                  className="text-xs font-semibold text-[#007052] hover:text-[#00C896] inline-flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>View All Categories</span>
                  <span>→</span>
                </button>
              </div>

              {/* 4 Category Cards in Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {CATEGORIES.map((cat) => (
                  <div
                    key={cat.slug}
                    onClick={() => onNavigate('category', { category: cat.name })}
                    className="bg-white rounded-2xl p-3 border border-[#E2E8F0] hover:border-[#00C896] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      {/* Thumbnail Container */}
                      <div className="aspect-4/3 w-full rounded-xl overflow-hidden bg-[#F0FAF6] mb-3 relative">
                        <img
                          src={cat.imageUrl}
                          alt={cat.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <h3 className="font-display font-bold text-sm text-[#102A24] group-hover:text-[#007052] transition-colors leading-snug">
                        {cat.name}
                      </h3>
                      <p className="text-[11px] text-[#64748B] mt-1 line-clamp-2 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-[#F1F5F9] flex items-center gap-1 text-xs font-semibold text-[#007052] group-hover:text-[#00C896] transition-colors">
                      <span>View Products</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ------------------------------------------ */}
            {/* 2. Featured Reviews Section                */}
            {/* ------------------------------------------ */}
            <section id="featured-reviews-section">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-[#00C896] fill-[#00C896]" />
                  <h2 className="font-display font-bold text-lg sm:text-xl text-[#102A24]">
                    Featured Reviews
                  </h2>
                </div>
                <button
                  onClick={() => onNavigate('category', { category: 'Tech & Gadgets' })}
                  className="text-xs font-semibold text-[#007052] hover:text-[#00C896] inline-flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>View All Reviews</span>
                  <span>→</span>
                </button>
              </div>

              {/* 4 Product Cards Grid matching Mockup */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {featuredReviews.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => onSelectProduct(product)}
                    className="bg-white rounded-2xl p-3 border border-[#E2E8F0] hover:border-[#00C896] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      {/* Product Image */}
                      <div className="aspect-4/3 w-full rounded-xl overflow-hidden bg-white mb-3 p-1 flex items-center justify-center">
                        <img
                          src={product.imageUrl}
                          alt={product.title}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <h3 className="font-display font-bold text-sm text-[#102A24] group-hover:text-[#007052] transition-colors line-clamp-1">
                        {product.title}
                      </h3>
                      <p className="text-[11px] text-[#64748B] mt-1 line-clamp-2 leading-relaxed">
                        {product.tagline}
                      </p>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProduct(product);
                        }}
                        className="w-full py-2 px-3 rounded-full bg-[#007052] hover:bg-[#005a42] text-white text-xs font-semibold flex items-center justify-center gap-1 shadow-xs transition-colors cursor-pointer"
                      >
                        <span>Read Review</span>
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ------------------------------------------ */}
            {/* 3. Buying Guides Snapshot                  */}
            {/* ------------------------------------------ */}
            <section className="p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#00C896]/15 flex items-center justify-center text-[#00C896]">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-[#102A24]">
                      Anti-Hype Buying Guides & Checklists
                    </h3>
                    <p className="text-xs text-[#64748B]">
                      Avoid marketing traps with transparent threshold checklists before spending.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('guides')}
                  className="text-xs font-semibold text-[#007052] hover:text-[#00C896] shrink-0 underline cursor-pointer"
                >
                  View All Guides →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {BUYING_GUIDES.map((guide) => (
                  <div
                    key={guide.slug}
                    onClick={() => onNavigate('guides', { slug: guide.slug })}
                    className="p-3.5 rounded-2xl bg-[#F8FFFC] border border-[#DDEBE5] hover:border-[#00C896] cursor-pointer transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-semibold text-[#007052] uppercase tracking-wider">
                        {guide.category}
                      </span>
                      <h4 className="font-display font-bold text-xs sm:text-sm text-[#102A24] mt-1 leading-snug">
                        {guide.title}
                      </h4>
                      <p className="text-[11px] text-[#64748B] mt-1 line-clamp-2">
                        {guide.summary}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-[#007052]">
                      <span>{guide.readTime}</span>
                      <span>Read Guide →</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FTC Product Disclosure */}
            <div className="p-3.5 rounded-2xl bg-white/70 border border-[#E2E8F0] text-[11px] text-[#64748B] leading-relaxed">
              {FTC_PRODUCT_DISCLOSURE}
            </div>

          </main>

          {/* ========================================== */}
          {/* RIGHT SIDEBAR COLUMN (~28% / col-span-4/3) */}
          {/* ========================================== */}
          <aside className="lg:col-span-4 xl:col-span-3 space-y-6">
            
            {/* Sidebar Card 1: Top Picks This Month */}
            <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#F1F5F9]">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#00C896] fill-[#00C896]" />
                  <h3 className="font-display font-bold text-sm text-[#102A24]">
                    Top Picks This Month
                  </h3>
                </div>
                <button
                  onClick={() => onNavigate('category', { category: 'Tech & Gadgets' })}
                  className="text-xs text-[#64748B] hover:text-[#007052] cursor-pointer"
                  aria-label="View all top picks"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* 4 List Items matching mockup */}
              <div className="space-y-3">
                {topPicks.map((pick, idx) => (
                  <div
                    key={idx}
                    onClick={() => onSelectProduct(pick.product)}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#F0FAF6] transition-colors cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-[#F8FFFC] border border-[#E2E8F0] overflow-hidden shrink-0 p-1 flex items-center justify-center">
                      <img
                        src={pick.thumbnail}
                        alt={pick.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-[#102A24] group-hover:text-[#007052] transition-colors truncate">
                        {pick.title}
                      </h4>
                      <p className="text-[11px] text-[#64748B] truncate">
                        {pick.category}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Card 2: Smart Shopping Starts Here (Lush Emerald Card) */}
            <div className="rounded-2xl p-6 bg-gradient-to-br from-[#064E3B] to-[#032a20] text-white border border-[#00C896]/30 shadow-md relative overflow-hidden space-y-3">
              {/* Subtle Refraction Orb */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#00C896]/20 rounded-full blur-xl pointer-events-none" />

              <div className="w-9 h-9 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-[#A7F3D0]">
                <Leaf className="w-5 h-5" />
              </div>

              <h3 className="font-display font-bold text-base text-white leading-tight">
                Smart Shopping Starts Here
              </h3>

              <p className="text-xs text-white/80 leading-relaxed">
                Get the best deals, honest reviews, and helpful buying guides — all in one place.
              </p>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => onNavigate('guides')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#064E3B] hover:bg-[#A7F3D0] text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Sidebar Card 3: Join Our Newsletter */}
            <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#00C896]/15 flex items-center justify-center text-[#007052]">
                  <Mail className="w-4 h-4" />
                </div>
                <h3 className="font-display font-bold text-sm text-[#102A24]">
                  Join Our Newsletter
                </h3>
              </div>

              <p className="text-xs text-[#64748B] leading-relaxed">
                Get the latest reviews, deals and buying guides straight to your inbox.
              </p>

              {sidebarSubscribed ? (
                <div className="p-3 rounded-xl bg-[#F0FAF6] border border-[#00C896]/30 flex items-center gap-2 text-xs text-[#064E3B]">
                  <CheckCircle2 className="w-4 h-4 text-[#00C896] shrink-0" />
                  <span>Thanks for subscribing! Check your inbox soon.</span>
                </div>
              ) : (
                <form onSubmit={handleSidebarSubscribe} className="space-y-2.5">
                  <input
                    type="email"
                    value={sidebarEmail}
                    onChange={(e) => setSidebarEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDEBE5] bg-[#F8FFFC] text-xs text-[#102A24] placeholder-[#94A3B8] focus:outline-none focus:border-[#00C896] transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-full bg-[#007052] hover:bg-[#005a42] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer text-center"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

            {/* Matrix Comparison Widget in Sidebar */}
            <div className="p-4 rounded-2xl bg-[#F0FAF6] border border-[#DDEBE5] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-[#00C896]" />
                <span className="text-xs font-semibold text-[#102A24]">
                  Compare Tray ({compareList.length})
                </span>
              </div>
              <button
                onClick={() => onNavigate('compare')}
                className="text-xs font-semibold text-[#007052] hover:underline cursor-pointer"
              >
                Open Matrix →
              </button>
            </div>

          </aside>

        </div>
      </div>

    </div>
  );
};
