import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ExternalLink, 
  Check, 
  X, 
  Scale, 
  ShieldCheck, 
  Share2, 
  Info,
  Calendar,
  User,
  HelpCircle,
  Clock
} from 'lucide-react';
import { Product, CategoryType } from '../data/products';
import { 
  isValidAmazonAffiliateUrl, 
  AMAZON_AFFILIATE_LINK_REL, 
  FTC_PRODUCT_DISCLOSURE,
  AMAZON_ASSOCIATE_DISCLOSURE
} from '../utils/affiliate';
import { calculateReadingTime } from '../utils/readingTime';
import { ReadingProgressBar } from '../components/ReadingProgressBar';
import { SocialShareBar } from '../components/SocialShareBar';

interface ProductDetailViewProps {
  product: Product;
  onBack: () => void;
  onNavigate: (view: string, params?: { category?: CategoryType; slug?: string }) => void;
  isComparing: boolean;
  onToggleCompare: (product: Product) => void;
  onOpenAffiliateGuide: () => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onBack,
  onNavigate,
  isComparing,
  onToggleCompare,
  onOpenAffiliateGuide,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const hasValidAffiliate = isValidAmazonAffiliateUrl(product.affiliateUrl);

  const readingTime = calculateReadingTime([
    product.title,
    product.tagline,
    product.description,
    ...product.pros,
    ...product.cons,
    product.editorialVerdict,
    product.targetAudience,
    product.avoidIf,
    ...product.reviewSections.map((s) => `${s.title} ${s.content}`),
    ...Object.entries(product.specs).map(([k, v]) => `${k} ${v}`),
    product.comparisonNotes,
  ]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 relative">
      {/* Scroll reading progress bar */}
      <ReadingProgressBar />
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#064E3B] hover:text-[#00C896] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Reviews</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleCompare(product)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-colors ${
              isComparing
                ? 'bg-[#00C896] text-white'
                : 'bg-white/80 border border-[#DDEBE5] text-[#102A24] hover:bg-[#A7F3D0]/30'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>{isComparing ? 'Shortlisted for Compare' : 'Add to Compare'}</span>
          </button>

          <button
            onClick={handleShare}
            className="p-1.5 rounded-xl bg-white/80 border border-[#DDEBE5] text-[#102A24]/70 hover:text-[#064E3B] transition-colors cursor-pointer"
            title="Copy review link"
            aria-label="Share review"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {copiedLink && (
        <div className="p-2.5 rounded-xl bg-[#00C896]/15 border border-[#00C896]/30 text-xs text-[#064E3B] text-center font-medium animate-in fade-in">
          Review link copied to clipboard!
        </div>
      )}

      {/* Sample Product Compliance Banner */}
      {product.isSampleProduct && (
        <div className="p-4 rounded-2xl bg-[#A7F3D0]/30 border border-[#00C896]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#064E3B]">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#00C896] shrink-0" />
            <div>
              <span className="font-semibold">Sample Review Layout Preview:</span>{' '}
              {product.sampleNotice || 'This is layout preview data. Genuine Amazon affiliate button will show once configured.'}
            </div>
          </div>
          <button
            onClick={onOpenAffiliateGuide}
            className="px-3 py-1 rounded-lg bg-white/80 border border-[#00C896]/40 font-semibold hover:bg-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            How to configure link →
          </button>
        </div>
      )}

      {/* Main Review Header Split: Image & Contiguous Purchase Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: High-Res Image Showcase */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-panel p-3 rounded-3xl border border-white/90 overflow-hidden shadow-lg">
            <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-[#F8FFFC]">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#F8FFFC] to-[#DDEBE5]/50 animate-pulse" />
              )}
              <img
                src={product.imageUrl}
                alt={product.imageAlt || product.title}
                referrerPolicy="no-referrer"
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
              {product.editorChoice && (
                <div className="absolute top-4 left-4 bg-[#064E3B]/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-xl shadow-md">
                  Shop Limit Champion
                </div>
              )}
            </div>
          </div>

          {/* Unboxed Metadata Line (Zero-Pill discipline) */}
          <div className="flex items-center gap-3 text-xs text-[#102A24]/70 px-1 flex-wrap">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#00C896]" />
              <span>Reviewed {product.publishedDate}</span>
            </span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-[#00C896]" />
              <span>{product.author}</span>
            </span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span className="text-[#064E3B] font-semibold">{product.category}</span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span className="flex items-center gap-1 text-[#064E3B] font-medium">
              <Clock className="w-3.5 h-3.5 text-[#00C896]" />
              <span>{readingTime}</span>
            </span>
          </div>
        </div>

        {/* Right Col: Contiguous Purchase & Value Module */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/95 shadow-xl space-y-5">
            <div>
              {/* Category & Tier kicker */}
              <div className="flex items-center gap-2 text-xs font-semibold text-[#064E3B] mb-2 flex-wrap">
                <span>{product.category}</span>
                <span aria-hidden="true">/</span>
                <span>{product.subcategory}</span>
                <span aria-hidden="true">/</span>
                <span className="text-[#102A24]/60">{product.budgetTier}</span>
                <span aria-hidden="true">/</span>
                <span className="text-[#064E3B] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#00C896]" />
                  <span>{readingTime}</span>
                </span>
              </div>

              <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#102A24] leading-tight">
                {product.title}
              </h1>

              <p className="text-xs sm:text-sm text-[#102A24]/80 mt-3 leading-relaxed">
                {product.tagline}
              </p>
            </div>

            {/* Amazon Purchase Button Logic: STRICT COMPLIANCE */}
            <div className="pt-2 border-t border-[#DDEBE5] space-y-3">
              {hasValidAffiliate ? (
                <>
                  <a
                    href={product.affiliateUrl}
                    target="_blank"
                    rel={AMAZON_AFFILIATE_LINK_REL}
                    className="w-full emerald-gradient-btn py-3.5 px-6 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg text-center"
                  >
                    <span>Check Price on Amazon</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <p className="text-[11px] text-[#102A24]/60 text-center">
                    Opens Amazon.com in a new tab with official affiliate tag.
                  </p>
                </>
              ) : (
                /* Button is hidden if affiliateUrl is missing or invalid! */
                <div className="p-4 rounded-2xl bg-white/70 border border-[#DDEBE5] text-center space-y-2">
                  <div className="text-xs font-semibold text-[#064E3B]">
                    Amazon Purchase Link Not Yet Configured
                  </div>
                  <p className="text-[11px] text-[#102A24]/70 leading-relaxed">
                    Per our compliance standards, we do not show dummy or invented links. Enter your genuine Amazon Special Link in <code className="bg-[#F8FFFC] px-1 py-0.5 rounded text-[#064E3B]">src/data/products.ts</code> to enable live checkout.
                  </p>
                  <button
                    onClick={onOpenAffiliateGuide}
                    className="text-xs text-[#00C896] hover:text-[#064E3B] font-semibold underline cursor-pointer"
                  >
                    View Setup Instructions
                  </button>
                </div>
              )}

              {/* Affiliate Disclosure directly near purchase module */}
              <div className="p-3 rounded-xl bg-[#F8FFFC] border border-[#DDEBE5] text-[11px] text-[#102A24]/70 leading-snug">
                <span className="font-semibold text-[#064E3B]">Affiliate Notice:</span> As an Amazon Associate, Shop Limit earns from qualifying purchases. Pricing and availability are live on Amazon.com.
              </div>
            </div>

            {/* Quick Summary Highlights */}
            <div className="pt-4 border-t border-[#DDEBE5] space-y-2">
              <span className="text-xs font-bold text-[#064E3B] uppercase tracking-wider block">
                The Limit Verdict
              </span>
              <p className="text-xs text-[#102A24]/85 leading-relaxed italic">
                &quot;{product.editorialVerdict}&quot;
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pros & Cons Grid */}
      <section className="space-y-4">
        <h2 className="font-display font-bold text-xl text-[#102A24]">
          Honest Pros & Considerations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pros */}
          <div className="glass-panel p-6 rounded-2xl border border-white/90 bg-[#F8FFFC]/90 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#064E3B] uppercase tracking-wider">
              <Check className="w-4 h-4 text-[#00C896]" />
              <span>What Justifies The Purchase</span>
            </div>
            <ul className="space-y-2.5">
              {product.pros.map((pro, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-[#102A24]/85 leading-relaxed">
                  <span className="w-4 h-4 rounded-full bg-[#00C896]/20 text-[#064E3B] flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                    ✓
                  </span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="glass-panel p-6 rounded-2xl border border-white/90 bg-[#F8FFFC]/90 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
              <X className="w-4 h-4 text-amber-600" />
              <span>Trade-offs & Considerations</span>
            </div>
            <ul className="space-y-2.5">
              {product.cons.map((con, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-[#102A24]/85 leading-relaxed">
                  <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                    –
                  </span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Detailed Review Sections */}
      <section className="space-y-6">
        <h2 className="font-display font-bold text-xl text-[#102A24]">
          In-Depth Editorial Analysis
        </h2>

        <div className="space-y-4">
          {product.reviewSections.map((sec, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl border border-[#DDEBE5]/80 space-y-2">
              <h3 className="font-display font-semibold text-base text-[#064E3B]">
                {sec.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#102A24]/80 leading-relaxed">
                {sec.content}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Specifications Table */}
      <section className="space-y-4">
        <h2 className="font-display font-bold text-xl text-[#102A24]">
          Key Technical Specifications
        </h2>

        <div className="glass-panel rounded-2xl overflow-hidden border border-white/95">
          <table className="w-full text-left border-collapse text-xs">
            <tbody className="divide-y divide-[#DDEBE5]/70">
              {Object.entries(product.specs).map(([label, val], idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white/40' : 'bg-transparent'}>
                  <td className="py-3 px-5 font-semibold text-[#064E3B] w-1/3 sm:w-1/4">
                    {label}
                  </td>
                  <td className="py-3 px-5 text-[#102A24]/85 tabular-nums">
                    {val}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Who is this for & Who should avoid it */}
      <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/95 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#064E3B] uppercase tracking-wider">
            Who This Is For
          </span>
          <p className="text-xs sm:text-sm text-[#102A24]/85 leading-relaxed">
            {product.targetAudience}
          </p>
        </div>

        <div className="space-y-2 border-t md:border-t-0 md:border-l border-[#DDEBE5] pt-4 md:pt-0 md:pl-6">
          <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
            When You Should Skip It
          </span>
          <p className="text-xs sm:text-sm text-[#102A24]/85 leading-relaxed">
            {product.avoidIf}
          </p>
        </div>
      </section>

      {/* Comparison Context Note */}
      <section className="glass-card p-6 rounded-2xl border border-[#DDEBE5] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="font-display font-semibold text-sm text-[#064E3B]">
            How this compares to alternatives
          </h4>
          <p className="text-xs text-[#102A24]/75">
            {product.comparisonNotes}
          </p>
        </div>
        <button
          onClick={() => onNavigate('compare')}
          className="emerald-outline-btn px-4 py-2 rounded-xl text-xs font-medium cursor-pointer whitespace-nowrap shrink-0"
        >
          Compare with other products →
        </button>
      </section>

      {/* Social Media Sharing Component */}
      <section className="pt-2">
        <SocialShareBar
          title={product.title}
          summary={product.tagline || product.description}
        />
      </section>

      {/* Bottom CTA & Affiliate Reminder */}
      <div className="text-center py-6 border-t border-[#DDEBE5] space-y-3">
        <p className="text-xs text-[#102A24]/60 max-w-xl mx-auto">
          {AMAZON_ASSOCIATE_DISCLOSURE} Shop Limit uses verified Amazon Special Links. Price and availability are determined by Amazon.com.
        </p>
        <button
          onClick={onBack}
          className="text-xs font-semibold text-[#00C896] hover:text-[#064E3B] underline cursor-pointer"
        >
          ← Return to all product reviews
        </button>
      </div>
    </div>
  );
};
