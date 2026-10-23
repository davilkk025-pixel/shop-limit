import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, BookOpen, Tag } from 'lucide-react';
import { Product, INITIAL_PRODUCTS, CategoryType } from '../data/products';
import { BuyingGuide, BUYING_GUIDES } from '../data/guides';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onSelectGuide: (guide: BuyingGuide) => void;
  onSelectCategory: (category: CategoryType) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onSelectGuide,
  onSelectCategory,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const normalized = query.toLowerCase().trim();

  const filteredProducts = normalized
    ? INITIAL_PRODUCTS.filter(
        (p) =>
          p.title.toLowerCase().includes(normalized) ||
          p.category.toLowerCase().includes(normalized) ||
          p.subcategory.toLowerCase().includes(normalized) ||
          p.description.toLowerCase().includes(normalized) ||
          p.pros.some((pro) => pro.toLowerCase().includes(normalized))
      )
    : INITIAL_PRODUCTS.slice(0, 3);

  const filteredGuides = normalized
    ? BUYING_GUIDES.filter(
        (g) =>
          g.title.toLowerCase().includes(normalized) ||
          g.category.toLowerCase().includes(normalized) ||
          g.summary.toLowerCase().includes(normalized)
      )
    : BUYING_GUIDES.slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-[#102A24]/60 backdrop-blur-md animate-in fade-in">
      <div className="glass-panel w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-white/90 bg-[#F8FFFC]/95 flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#DDEBE5] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#00C896] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search reviews, specs, buying guides, or categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-[#102A24] focus:outline-none placeholder:text-[#102A24]/40"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-lg text-[#102A24]/60 hover:text-[#102A24] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs text-[#064E3B] bg-[#A7F3D0]/30 hover:bg-[#A7F3D0]/50 rounded-lg cursor-pointer"
          >
            Esc
          </button>
        </div>

        {/* Results Area */}
        <div className="p-4 overflow-y-auto space-y-6 flex-1">
          {/* Quick Categories */}
          <div>
            <span className="text-[11px] font-bold text-[#064E3B] uppercase tracking-wider block mb-2">
              Browse Categories
            </span>
            <div className="flex flex-wrap gap-2">
              {(['Tech & Gadgets', 'Home & Kitchen', 'Fashion & Accessories', 'Fitness & Lifestyle'] as CategoryType[]).map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      onSelectCategory(cat);
                      onClose();
                    }}
                    className="px-3 py-1.5 text-xs rounded-xl bg-white border border-[#DDEBE5] hover:border-[#00C896] text-[#102A24] hover:text-[#064E3B] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Tag className="w-3 h-3 text-[#00C896]" />
                    <span>{cat}</span>
                  </button>
                )
              )}
            </div>
          </div>

          {/* Product Reviews */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#064E3B] uppercase tracking-wider">
                Product Reviews ({filteredProducts.length})
              </span>
            </div>

            {filteredProducts.length === 0 ? (
              <p className="text-xs text-[#102A24]/60 py-2">No product reviews matched &quot;{query}&quot;.</p>
            ) : (
              <div className="space-y-2">
                {filteredProducts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onSelectProduct(p);
                      onClose();
                    }}
                    className="w-full text-left p-3 rounded-2xl bg-white/70 hover:bg-[#A7F3D0]/20 border border-[#DDEBE5]/70 hover:border-[#00C896]/40 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={p.imageUrl}
                        alt={p.title}
                        className="w-10 h-10 object-cover rounded-xl border border-[#DDEBE5]"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="text-xs font-semibold text-[#102A24] group-hover:text-[#064E3B] line-clamp-1">
                          {p.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-[#102A24]/60 mt-0.5">
                          <span>{p.category}</span>
                          <span>·</span>
                          <span>{p.budgetTier}</span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#102A24]/40 group-hover:text-[#00C896] group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Buying Guides */}
          <div>
            <span className="text-[11px] font-bold text-[#064E3B] uppercase tracking-wider block mb-2">
              Buying Guides ({filteredGuides.length})
            </span>
            {filteredGuides.length === 0 ? (
              <p className="text-xs text-[#102A24]/60 py-2">No buying guides found.</p>
            ) : (
              <div className="space-y-2">
                {filteredGuides.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => {
                      onSelectGuide(g);
                      onClose();
                    }}
                    className="w-full text-left p-3 rounded-2xl bg-white/70 hover:bg-[#A7F3D0]/20 border border-[#DDEBE5]/70 hover:border-[#00C896]/40 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-start gap-2.5">
                      <BookOpen className="w-4 h-4 text-[#00C896] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-semibold text-[#102A24] group-hover:text-[#064E3B]">
                          {g.title}
                        </h4>
                        <p className="text-[11px] text-[#102A24]/60 line-clamp-1 mt-0.5">
                          {g.summary}
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] text-[#064E3B] font-medium whitespace-nowrap ml-2">
                      {g.readTime}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
