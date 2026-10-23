import React from 'react';
import { ShieldCheck, Lock, Eye } from 'lucide-react';

export const PrivacyPolicyView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-[#102A24]">
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/95 text-center space-y-2 bg-gradient-to-r from-white via-[#F8FFFC] to-[#A7F3D0]/20">
        <div className="w-10 h-10 rounded-2xl bg-[#064E3B] flex items-center justify-center text-white mx-auto shadow-md">
          <Lock className="w-5 h-5 text-[#A7F3D0]" />
        </div>
        <h1 className="font-display font-extrabold text-3xl text-[#102A24]">
          Privacy Policy
        </h1>
        <p className="text-xs text-[#064E3B] font-medium">
          Last Updated: October 2026
        </p>
      </div>

      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-[#DDEBE5] space-y-4 text-xs sm:text-sm text-[#102A24]/85 leading-relaxed">
        <h2 className="font-display font-bold text-base text-[#064E3B]">
          1. Information We Collect
        </h2>
        <p>
          Shop Limit respects your privacy. When you interact with our website, we collect minimal data:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Direct Submissions:</strong> If you use our contact form or newsletter form, we collect the name and email address you provide solely to reply to your inquiry or send the requested newsletter.</li>
          <li><strong>Aggregated Analytics:</strong> We may measure page view counts and anonymous browser types to improve page performance and optimize mobile responsiveness.</li>
        </ul>

        <h2 className="font-display font-bold text-base text-[#064E3B] pt-3 border-t border-[#DDEBE5]">
          2. Amazon Affiliate Cookies & External Tracking
        </h2>
        <p>
          When you click a link pointing to Amazon.com from our website, Amazon uses cookies and tracking technologies to attribute your session and calculate qualifying purchases.
        </p>
        <p>
          Shop Limit does not have access to, nor control over, the personal financial information or checkout credentials you enter on Amazon.com. Please review Amazon&apos;s Privacy Notice for details on their data handling.
        </p>

        <h2 className="font-display font-bold text-base text-[#064E3B] pt-3 border-t border-[#DDEBE5]">
          3. We Never Sell Your Data
        </h2>
        <p>
          We do not sell, rent, or trade your email address or personal details to third-party data brokers or marketing agencies. Period.
        </p>

        <h2 className="font-display font-bold text-base text-[#064E3B] pt-3 border-t border-[#DDEBE5]">
          4. Contact Us
        </h2>
        <p>
          If you have questions regarding this privacy policy, please reach out via our Contact form.
        </p>
      </div>
    </div>
  );
};
