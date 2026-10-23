import React, { useState } from 'react';
import { 
  ArrowLeft, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Star, 
  Calendar, 
  TrendingUp,
  Tag
} from 'lucide-react';
import { Product, CATEGORIES, CategoryType } from '../data/products';
import { ProductCard } from '../components/ProductCard';

type SortOption = 
  | 'featured'
  | 'price-asc'
  | 'price-desc'
  | 'rating-desc'
  | 'date-desc'
  | 'date-asc'
  | 'name';

interface CategoryViewProps {
  category: CategoryType;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onNavigate: (view: string, params?: { category?: CategoryType; slug?: string }) => void;
  compareList: Product[];
  onToggleCompare: (product: Product) => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({
  category,
  products,
  onSelectProduct,
  onNavigate,
  compareList,
  onToggleCompare,
}) => {
  const [tierFilter, setTierFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const currentCategoryMeta = CATEGORIES.find((c) => c.name === category) || CATEGORIES[0];
  const categoryProducts = products.filter((p) => p.category === category);

  // Filter by budget tier
  const filtered = categoryProducts.filter((p) => {
    if (tierFilter === 'all') return true;
    return p.budgetTier === tierFilter;
  });

  // Numeric helpers for sorting
  const getPriceValue = (p: Product): number => {
    if (p.priceBenchmark !== undefined) return p.priceBenchmark;
    if (p.budgetTier === 'Budget-Conscious') return 30;
    if (p.budgetTier === 'Balanced Sweet-Spot') return 100;
    return 250;
  };

  const getRatingValue = (p: Product): number => {
    if (p.rating !== undefined) return p.rating;
    return p.editorChoice ? 4.9 : 4.6;
  };

  const getDateValue = (p: Product): number => {
    if (p.releaseDate) {
      const parsed = new Date(p.releaseDate).getTime();
      if (!isNaN(parsed)) return parsed;
    }
    return 0;
  };

  // Dynamic sorting engine
  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return getPriceValue(a) - getPriceValue(b);
      case 'price-desc':
        return getPriceValue(b) - getPriceValue(a);
      case 'rating-desc':
        return getRatingValue(b) - getRatingValue(a);
      case 'date-desc':
        return getDateValue(b) - getDateValue(a);
      case 'date-asc':
        return getDateValue(a) - getDateValue(b);
      case 'name':
        return a.title.localeCompare(b.title);
      case 'featured':
      default:
        if (a.editorChoice && !b.editorChoice) return -1;
        if (!a.editorChoice && b.editorChoice) return 1;
        return 0;
    }
  });

  const getSortLabel = (sort: SortOption): string => {
    switch (sort) {
      case 'price-asc': return 'Price: Low to High';
      case 'price-desc': return 'Price: High to Low';
      case 'rating-desc': return 'Highest Rated';
      case 'date-desc': return 'Newest Release';
      case 'date-asc': return 'Oldest Release';
      case 'name': return 'Alphabetical (A-Z)';
      case 'featured':
      default:
        return 'Featured & Limit Champions';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Back button */}
      <button
        onClick={() => onNavigate('home')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#064E3B] hover:text-[#00C896] transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Home</span>
      </button>

      {/* Category Hero Banner */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/95 relative overflow-hidden bg-gradient-to-r from-white/95 via-[#F8FFFC] to-[#A7F3D0]/20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#064E3B] uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5 text-[#00C896]" />
              <span>Department Spotlight</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#102A24]">
              {currentCategoryMeta.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#102A24]/80 max-w-xl leading-relaxed">
              {currentCategoryMeta.description}
            </p>
          </div>

          <div className="md:col-span-4">
            <div className="rounded-2xl overflow-hidden aspect-16/9 md:aspect-4/3 shadow-md border border-white/80">
              <img
                src={currentCategoryMeta.imageUrl}
                alt={currentCategoryMeta.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Controls Bar: Budget Tier & Dynamic Sorting */}
      <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/90 space-y-4 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Left: Tier Filter Segmented Control */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
            <span className="text-xs font-semibold text-[#064E3B] flex items-center gap-1.5 whitespace-nowrap shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#00C896]" />
              <span>Filter Tier:</span>
            </span>
            <div className="flex items-center gap-1.5 bg-white/70 p-1 rounded-xl border border-[#DDEBE5]">
              {['all', 'Budget-Conscious', 'Balanced Sweet-Spot', 'Premium Benchmark'].map((tier) => (
                <button
                  key={tier}
                  onClick={() => setTierFilter(tier)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    tierFilter === tier
                      ? 'bg-[#00C896] text-white shadow-sm'
                      : 'text-[#102A24]/70 hover:text-[#064E3B] hover:bg-[#A7F3D0]/20'
                  }`}
                >
                  {tier === 'all' ? 'All Tiers' : tier}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Dynamic Sorting Control */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-semibold text-[#064E3B] flex items-center gap-1.5 whitespace-nowrap">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#00C896]" />
              <span>Sort by:</span>
            </span>

            {/* Quick Sort Shortcut Chips */}
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                onClick={() => setSortBy('rating-desc')}
                title="Sort by highest editorial rating"
                className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
                  sortBy === 'rating-desc'
                    ? 'bg-[#064E3B] text-white border-[#064E3B]'
                    : 'bg-white border-[#DDEBE5] text-[#102A24]/75 hover:border-[#00C896] hover:text-[#064E3B]'
                }`}
              >
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span>Highest Rated</span>
              </button>

              <button
                onClick={() => setSortBy('price-asc')}
                title="Sort by price: lowest to highest"
                className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
                  sortBy === 'price-asc'
                    ? 'bg-[#064E3B] text-white border-[#064E3B]'
                    : 'bg-white border-[#DDEBE5] text-[#102A24]/75 hover:border-[#00C896] hover:text-[#064E3B]'
                }`}
              >
                <span>Price: Low → High</span>
              </button>

              <button
                onClick={() => setSortBy('date-desc')}
                title="Sort by newest release date"
                className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
                  sortBy === 'date-desc'
                    ? 'bg-[#064E3B] text-white border-[#064E3B]'
                    : 'bg-white border-[#DDEBE5] text-[#102A24]/75 hover:border-[#00C896] hover:text-[#064E3B]'
                }`}
              >
                <Calendar className="w-3 h-3" />
                <span>Newest</span>
              </button>
            </div>

            {/* Comprehensive Dropdown Selector */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="text-xs font-semibold text-[#064E3B] bg-white border border-[#DDEBE5] rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#00C896] cursor-pointer shadow-xs"
              aria-label="Sort products"
            >
              <option value="featured">Featured / Limit Champions</option>
              <option value="rating-desc">Rating: Highest Rated First</option>
              <option value="price-asc">Price: Lowest to Highest</option>
              <option value="price-desc">Price: Highest to Lowest</option>
              <option value="date-desc">Release Date: Newest First</option>
              <option value="date-asc">Release Date: Oldest First</option>
              <option value="name">Product Name (A–Z)</option>
            </select>
          </div>
        </div>

        {/* Dynamic Context Status Bar */}
        <div className="pt-2 border-t border-[#DDEBE5]/60 flex items-center justify-between text-[11px] text-[#102A24]/70">
          <div>
            Showing <strong className="text-[#064E3B]">{sorted.length}</strong> {sorted.length === 1 ? 'review' : 'reviews'} in <span className="font-semibold text-[#102A24]">{category}</span>
            {tierFilter !== 'all' && <span> · Filtered by <span className="font-medium text-[#064E3B]">{tierFilter}</span></span>}
          </div>
          <div className="font-medium text-[#064E3B]">
            Sorted by: <span className="underline underline-offset-2">{getSortLabel(sortBy)}</span>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {sorted.length === 0 ? (
        <div className="p-12 text-center glass-panel rounded-3xl border border-[#DDEBE5] space-y-3">
          <p className="text-sm text-[#102A24]/70">No reviews found matching the selected budget tier.</p>
          <button
            onClick={() => setTierFilter('all')}
            className="text-xs font-semibold text-[#00C896] underline cursor-pointer"
          >
            Reset filters to show all reviews in {category}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              isComparing={compareList.some((p) => p.id === product.id)}
              onToggleCompare={onToggleCompare}
            />
          ))}
        </div>
      )}

      {/* Switch to Other Departments */}
      <div className="pt-8 border-t border-[#DDEBE5]">
        <span className="text-xs font-bold text-[#064E3B] uppercase tracking-wider block mb-3">
          Explore Other Departments
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {CATEGORIES.filter((c) => c.name !== category).map((cat) => (
            <button
              key={cat.slug}
              onClick={() => onNavigate('category', { category: cat.name })}
              className="p-4 rounded-2xl glass-card text-left border border-[#DDEBE5] hover:border-[#00C896] transition-all cursor-pointer group"
            >
              <h4 className="font-display font-semibold text-sm text-[#102A24] group-hover:text-[#064E3B]">
                {cat.name}
              </h4>
              <p className="text-xs text-[#102A24]/60 mt-1 line-clamp-1">{cat.highlightText}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
