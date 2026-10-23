import React from 'react';
import { ShieldCheck, ExternalLink, Check, AlertCircle } from 'lucide-react';
import { AMAZON_ASSOCIATE_DISCLOSURE, FTC_PRODUCT_DISCLOSURE } from '../utils/affiliate';

export const AffiliateDisclosureView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/95 text-center space-y-3 bg-gradient-to-r from-white via-[#F8FFFC] to-[#A7F3D0]/20">
        <div className="w-12 h-12 rounded-2xl bg-[#064E3B] flex items-center justify-center text-[#A7F3D0] mx-auto shadow-md">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#102A24]">
          Affiliate Disclosure & Transparency Policy
        </h1>
        <p className="text-xs sm:text-sm text-[#064E3B] font-semibold tracking-wide uppercase">
          FTC Compliance & Amazon Associates Operating Agreement Notice
        </p>
      </div>

      {/* Mandatory Operating Agreement Disclosure Box */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#00C896]/40 bg-[#A7F3D0]/15 space-y-3">
        <h2 className="font-display font-bold text-lg text-[#064E3B]">
          Mandatory Amazon Associate Statement
        </h2>
        <blockquote className="p-4 rounded-xl bg-white/80 border border-[#00C896]/30 text-sm font-semibold text-[#064E3B] italic">
          &quot;{AMAZON_ASSOCIATE_DISCLOSURE}&quot;
        </blockquote>
        <p className="text-xs text-[#102A24]/80 leading-relaxed">
          Shop Limit is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for websites to earn advertising fees by advertising and linking to Amazon.com.
        </p>
      </div>

      {/* FTC 16 CFR Part 255 Compliance */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-[#DDEBE5] space-y-4">
        <h2 className="font-display font-bold text-lg text-[#102A24]">
          1. FTC Endorsement Guidelines Compliance
        </h2>
        <p className="text-xs sm:text-sm text-[#102A24]/80 leading-relaxed">
          In compliance with the Federal Trade Commission (FTC) guidelines (16 CFR Part 255), please assume that any outbound link pointing to Amazon.com on Shop Limit may be an affiliate link. When you click through one of these links and complete a purchase, Shop Limit may earn a small referral commission at absolutely no additional cost to you.
        </p>
        <p className="text-xs sm:text-sm text-[#102A24]/80 leading-relaxed">
          {FTC_PRODUCT_DISCLOSURE}
        </p>
      </div>

      {/* Strict Link Rel & Window Rules */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-[#DDEBE5] space-y-4">
        <h2 className="font-display font-bold text-lg text-[#102A24]">
          2. Outbound Link Security & Attribute Standards
        </h2>
        <p className="text-xs sm:text-sm text-[#102A24]/80 leading-relaxed">
          All external commercial links leading to Amazon on this site strictly enforce the following web standards:
        </p>
        <ul className="space-y-2 text-xs text-[#102A24]/85 pl-4 list-disc">
          <li>
            <strong>rel=&quot;sponsored nofollow noopener noreferrer&quot;:</strong> Correctly signals search engines and browser security models that the link is commercial and secure.
          </li>
          <li>
            <strong>target=&quot;_blank&quot;:</strong> Safely opens the product listing in a fresh browser tab so your current reading progress on Shop Limit is never lost.
          </li>
          <li>
            <strong>No Cloaked or Deceptive Redirects:</strong> We do not mask or disguise affiliate destination links behind misleading internal redirects.
          </li>
        </ul>
      </div>

      {/* Real-time Pricing & Availability Disclaimer */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-[#DDEBE5] space-y-4">
        <h2 className="font-display font-bold text-lg text-[#102A24]">
          3. Real-Time Price, Inventory & Rating Disclaimer
        </h2>
        <p className="text-xs sm:text-sm text-[#102A24]/80 leading-relaxed">
          Prices, coupons, discounts, and inventory on Amazon.com change rapidly throughout the day based on seller inventory algorithms.
        </p>
        <div className="p-4 rounded-xl bg-white/70 border border-[#DDEBE5] text-xs text-[#102A24]/80 space-y-2">
          <p>
            • We do not scrape Amazon or claim to display real-time live prices.
          </p>
          <p>
            • We do not claim Amazon endorsements, star ratings, or customer quotes as our own.
          </p>
          <p>
            • To check the current price, shipping estimate, or Prime availability for any reviewed item, click &quot;Check Price on Amazon&quot; to inspect the official Amazon listing.
          </p>
        </div>
      </div>

      {/* Editorial Independence */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-[#DDEBE5] space-y-4">
        <h2 className="font-display font-bold text-lg text-[#102A24]">
          4. Absolute Editorial Independence
        </h2>
        <p className="text-xs sm:text-sm text-[#102A24]/80 leading-relaxed">
          Our reviews and limit determinations are 100% independent. Brands cannot purchase higher scores, top spots in comparison matrices, or editorial exemptions. If a product fails to justify its cost or suffers from known hardware defects, we state so openly in our cons and trade-offs breakdown.
        </p>
      </div>
    </div>
  );
};
