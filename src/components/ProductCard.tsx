import React, { useState } from 'react';
import { ExternalLink, Check, Plus, ArrowRight, ShieldCheck, ShoppingBag, Scale } from 'lucide-react';
import { Product } from '../data/products';
import { isValidAmazonAffiliateUrl, AMAZON_AFFILIATE_LINK_REL } from '../utils/affiliate';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  isComparing: boolean;
  onToggleCompare: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  isComparing,
  onToggleCompare,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const hasValidAffiliate = isValidAmazonAffiliateUrl(product.affiliateUrl);

  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col h-full group relative border border-[#DDEBE5]/80 hover:border-[#00C896]/40 transition-all duration-300">
      {/* Sample Layout Notice (Amazon compliance requirement) */}
      {product.isSampleProduct && (
        <div className="bg-[#A7F3D0]/30 border-b border-[#00C896]/20 px-3 py-1 text-[11px] text-[#064E3B] font-medium flex items-center justify-between">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00C896]" />
            Sample Review Layout
          </span>
          <span className="text-[10px] text-[#064E3B]/70">Affiliate Link Pending</span>
        </div>
      )}

      {/* Image Area */}
      <div 
        onClick={() => onSelect(product)} 
        className="relative aspect-4/3 w-full overflow-hidden bg-[#F8FFFC] cursor-pointer"
      >
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#F8FFFC] to-[#DDEBE5]/50 animate-pulse" />
        )}

        {imageError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#F8FFFC] to-[#A7F3D0]/20 text-center">
            <ShoppingBag className="w-8 h-8 text-[#00C896]/50 mb-2" />
            <span className="text-xs font-semibold text-[#064E3B]">{product.title}</span>
            <span className="text-[11px] text-[#102A24]/60 mt-1">{product.category}</span>
          </div>
        ) : (
          <img
            src={product.imageUrl}
            alt={product.imageAlt || product.title}
            referrerPolicy="no-referrer"
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Compare Quick Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleCompare(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all cursor-pointer shadow-sm ${
            isComparing
              ? 'bg-[#00C896] text-white'
              : 'bg-white/85 text-[#102A24] hover:bg-[#A7F3D0]/70'
          }`}
          title={isComparing ? 'Remove from comparison' : 'Add to comparison'}
          aria-label={isComparing ? 'Remove from comparison' : 'Add to comparison'}
        >
          {isComparing ? <Check className="w-4 h-4" /> : <Scale className="w-4 h-4" />}
        </button>

        {/* Editor Pick Subdued Stamp */}
        {product.editorChoice && (
          <div className="absolute top-3 left-3 bg-[#064E3B]/90 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg shadow-sm">
            Limit Champion
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Zero-Pill Metadata Discipline: Clean unboxed text with typographic separators */}
          <div className="flex items-center gap-2 text-xs text-[#064E3B] font-medium mb-1.5 flex-wrap">
            <span>{product.category}</span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span>{product.subcategory}</span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span className="text-[#102A24]/60">{product.budgetTier}</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelect(product)}
            className="font-display font-semibold text-lg text-[#102A24] group-hover:text-[#064E3B] transition-colors cursor-pointer line-clamp-2 leading-snug"
          >
            {product.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-[#102A24]/75 mt-2 line-clamp-2 leading-relaxed">
            {product.tagline || product.description}
          </p>

          {/* Pros Preview (Top 2 items) */}
          <div className="mt-3.5 space-y-1.5 pt-3 border-t border-[#DDEBE5]/70">
            {product.pros.slice(0, 2).map((pro, idx) => (
              <div key={idx} className="flex items-start gap-1.5 text-xs text-[#102A24]/85">
                <Check className="w-3.5 h-3.5 text-[#00C896] shrink-0 mt-0.5" />
                <span className="line-clamp-1">{pro}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions & Amazon Link Handling */}
        <div className="mt-5 pt-3 border-t border-[#DDEBE5]/70 space-y-2">
          {/* If valid Amazon affiliate URL is present, show "Check Price on Amazon" button */}
          {hasValidAffiliate ? (
            <a
              href={product.affiliateUrl}
              target="_blank"
              rel={AMAZON_AFFILIATE_LINK_REL}
              className="w-full emerald-gradient-btn px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-sm text-center"
            >
              <span>Check Price on Amazon</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            /* Strict Amazon Compliance: Hide button if missing or invalid; do NOT use fake link */
            <div className="text-[11px] text-center text-[#102A24]/60 bg-[#F8FFFC] py-1.5 px-2 rounded-lg border border-[#DDEBE5] italic">
              Affiliate link not yet configured
            </div>
          )}

          {/* Detailed Review Button */}
          <button
            onClick={() => onSelect(product)}
            className="w-full emerald-outline-btn px-4 py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Read In-Depth Review & Verdict</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
