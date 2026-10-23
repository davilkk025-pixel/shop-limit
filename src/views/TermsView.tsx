import React from 'react';
import { Scale, FileText } from 'lucide-react';

export const TermsView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-[#102A24]">
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/95 text-center space-y-2 bg-gradient-to-r from-white via-[#F8FFFC] to-[#A7F3D0]/20">
        <div className="w-10 h-10 rounded-2xl bg-[#064E3B] flex items-center justify-center text-white mx-auto shadow-md">
          <FileText className="w-5 h-5 text-[#A7F3D0]" />
        </div>
        <h1 className="font-display font-extrabold text-3xl text-[#102A24]">
          Terms of Service
        </h1>
        <p className="text-xs text-[#064E3B] font-medium">
          Last Updated: October 2026
        </p>
      </div>

      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-[#DDEBE5] space-y-4 text-xs sm:text-sm text-[#102A24]/85 leading-relaxed">
        <h2 className="font-display font-bold text-base text-[#064E3B]">
          1. Acceptance of Terms
        </h2>
        <p>
          By accessing and browsing Shop Limit, you agree to comply with and be bound by these Terms of Service. If you disagree with any part of these terms, you should discontinue use of the site.
        </p>

        <h2 className="font-display font-bold text-base text-[#064E3B] pt-3 border-t border-[#DDEBE5]">
          2. Informational & Editorial Purposes Only
        </h2>
        <p>
          All content, reviews, buying guides, and comparison tables provided on Shop Limit are for general informational, educational, and consumer awareness purposes only. While we test and research rigorously, individual product experiences, manufacturing batch variations, and seller practices may vary.
        </p>

        <h2 className="font-display font-bold text-base text-[#064E3B] pt-3 border-t border-[#DDEBE5]">
          3. Amazon Trademark & Intellectual Property
        </h2>
        <p>
          Amazon, the Amazon logo, and Amazon Prime are registered trademarks of Amazon.com, Inc. or its affiliates. Shop Limit is an independent publisher and is not owned or operated by Amazon.com.
        </p>

        <h2 className="font-display font-bold text-base text-[#064E3B] pt-3 border-t border-[#DDEBE5]">
          4. Disclaimer of Warranties
        </h2>
        <p>
          We do not warrant that product descriptions, pricing, or availability on third-party merchant sites (including Amazon.com) will be uninterrupted, error-free, or identical to our historical review date. All transactions are governed strictly by the merchant&apos;s return and warranty terms.
        </p>
      </div>
    </div>
  );
};
