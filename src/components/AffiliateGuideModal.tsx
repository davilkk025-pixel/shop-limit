import React, { useState } from 'react';
import { X, Check, Copy, ExternalLink, ShieldCheck, FileCode, AlertCircle } from 'lucide-react';
import { isValidAmazonAffiliateUrl, AMAZON_AFFILIATE_LINK_REL } from '../utils/affiliate';

interface AffiliateGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AffiliateGuideModal: React.FC<AffiliateGuideModalProps> = ({ isOpen, onClose }) => {
  const [testUrl, setTestUrl] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<'instructions' | 'tester'>('instructions');

  if (!isOpen) return null;

  const isTestUrlValid = isValidAmazonAffiliateUrl(testUrl);

  const sampleSnippet = `// File: /src/data/products.ts
{
  id: 'prod-my-item-01',
  slug: 'my-chosen-product-title',
  title: 'My Curated Tech or Kitchen Item',
  category: 'Tech & Gadgets', // or 'Home & Kitchen', 'Fashion & Accessories', 'Fitness & Lifestyle'
  subcategory: 'Wireless Audio',
  tagline: 'High endurance and natural acoustic staging.',
  description: 'Detailed overview of why this product fits our budget limit...',
  imageUrl: '/src/assets/images/tech_smart_gadgets_1792730947203.jpg',
  imageAlt: 'High-res studio photography of the item',
  budgetTier: 'Balanced Sweet-Spot',
  featured: true,
  editorChoice: true,
  publishedDate: 'October 2026',
  author: 'Your Name or Shop Limit Desk',
  
  // 👉 PASTE YOUR GENUINE AMAZON SPECIAL LINK HERE:
  affiliateUrl: '${testUrl && isTestUrlValid ? testUrl : 'https://www.amazon.com/dp/B0XXXXXXXX?tag=yourtag-20'}',
  
  isSampleProduct: false, // Set to false when you enter your real review!
  specs: {
    'Weight': '250g',
    'Battery': '30 Hours'
  },
  pros: [
    'Outstanding value per dollar',
    'Durable physical construction'
  ],
  cons: [
    'Companion app is basic'
  ],
  editorialVerdict: 'A sensible purchase that avoids premium brand markup.',
  targetAudience: 'Budget-conscious professionals.',
  avoidIf: 'You require luxury-tier cosmetic finishes.',
  reviewSections: [
    {
      title: 'Build & Real-World Utility',
      content: 'Here write your genuine evaluation...'
    }
  ],
  comparisonNotes: 'Compares favorably against category leaders.'
}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sampleSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#102A24]/60 backdrop-blur-md animate-in fade-in">
      <div className="glass-panel w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-white/90 bg-[#F8FFFC]/95 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-[#DDEBE5] flex items-center justify-between bg-gradient-to-r from-[#A7F3D0]/20 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#00C896] to-[#064E3B] flex items-center justify-center text-white shadow-md">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl text-[#102A24]">
                How to Add Your Amazon Affiliate Links
              </h2>
              <p className="text-xs text-[#064E3B] font-medium">
                Step-by-step instructions for site owners and Amazon Associates
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#102A24]/70 hover:bg-[#A7F3D0]/30 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-[#DDEBE5]/70 bg-white/40">
          <button
            onClick={() => setActiveTab('instructions')}
            className={`pb-3 text-xs font-semibold cursor-pointer border-b-2 transition-all ${
              activeTab === 'instructions'
                ? 'border-[#00C896] text-[#064E3B]'
                : 'border-transparent text-[#102A24]/60 hover:text-[#102A24]'
            }`}
          >
            1. Setup Guide & Compliance
          </button>
          <button
            onClick={() => setActiveTab('tester')}
            className={`pb-3 text-xs font-semibold cursor-pointer border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'tester'
                ? 'border-[#00C896] text-[#064E3B]'
                : 'border-transparent text-[#102A24]/60 hover:text-[#102A24]'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            2. Live Link Tester & Code Generator
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-[#102A24]">
          {activeTab === 'instructions' ? (
            <div className="space-y-6">
              {/* Compliance Highlights */}
              <div className="p-4 rounded-2xl bg-[#064E3B]/5 border border-[#00C896]/30 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#064E3B] uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-[#00C896]" />
                  <span>Amazon Associates Compliance Engine</span>
                </div>
                <p className="text-xs text-[#102A24]/85 leading-relaxed">
                  Shop Limit is pre-built with Amazon Operating Agreement and FTC policies in mind:
                </p>
                <ul className="text-xs space-y-1.5 text-[#102A24]/80 pl-4 list-disc">
                  <li>
                    <strong>No Fake/Placeholder Links:</strong> If a product’s <code className="bg-white px-1.5 py-0.5 rounded text-[#064E3B]">affiliateUrl</code> is empty or invalid, the &quot;Check Price on Amazon&quot; button is automatically hidden.
                  </li>
                  <li>
                    <strong>Outbound Compliance:</strong> All valid affiliate links open in a new tab with <code className="bg-white px-1.5 py-0.5 rounded text-[#064E3B]">rel=&apos;sponsored nofollow noopener noreferrer&apos;</code>.
                  </li>
                  <li>
                    <strong>No Fabricated Prices:</strong> We do not claim static prices are live Amazon prices, avoiding misleading user claims.
                  </li>
                  <li>
                    <strong>Mandatory Associate Disclosure:</strong> Footer displays <em>&quot;As an Amazon Associate I earn from qualifying purchases.&quot;</em>
                  </li>
                </ul>
              </div>

              {/* 4 Steps */}
              <div className="space-y-4">
                <h3 className="font-display font-semibold text-base text-[#102A24]">
                  4 Simple Steps to Add Your Own Products
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/70 border border-[#DDEBE5] space-y-1.5">
                    <div className="w-6 h-6 rounded-lg bg-[#00C896]/20 text-[#064E3B] font-bold text-xs flex items-center justify-center">
                      1
                    </div>
                    <h4 className="font-semibold text-xs text-[#064E3B]">Open Data File</h4>
                    <p className="text-xs text-[#102A24]/70">
                      Navigate to <code className="bg-[#F8FFFC] px-1 py-0.5 rounded border border-[#DDEBE5]">src/data/products.ts</code> in your code editor.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/70 border border-[#DDEBE5] space-y-1.5">
                    <div className="w-6 h-6 rounded-lg bg-[#00C896]/20 text-[#064E3B] font-bold text-xs flex items-center justify-center">
                      2
                    </div>
                    <h4 className="font-semibold text-xs text-[#064E3B]">Get Your Amazon Special Link</h4>
                    <p className="text-xs text-[#102A24]/70">
                      Log in to Amazon Associates (SiteStripe) and copy your Text Special Link containing your Store Tag (e.g. <code className="bg-[#F8FFFC] px-1 py-0.5 rounded border border-[#DDEBE5]">tag=yourtag-20</code>).
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/70 border border-[#DDEBE5] space-y-1.5">
                    <div className="w-6 h-6 rounded-lg bg-[#00C896]/20 text-[#064E3B] font-bold text-xs flex items-center justify-center">
                      3
                    </div>
                    <h4 className="font-semibold text-xs text-[#064E3B]">Paste URL & Set isSampleProduct</h4>
                    <p className="text-xs text-[#102A24]/70">
                      Set <code className="bg-[#F8FFFC] px-1 py-0.5 rounded border border-[#DDEBE5]">affiliateUrl: &apos;YOUR_AMAZON_LINK&apos;</code> and set <code className="bg-[#F8FFFC] px-1 py-0.5 rounded border border-[#DDEBE5]">isSampleProduct: false</code>.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/70 border border-[#DDEBE5] space-y-1.5">
                    <div className="w-6 h-6 rounded-lg bg-[#00C896]/20 text-[#064E3B] font-bold text-xs flex items-center justify-center">
                      4
                    </div>
                    <h4 className="font-semibold text-xs text-[#064E3B]">Button Appears Instantly</h4>
                    <p className="text-xs text-[#102A24]/70">
                      As soon as a valid link is configured, the vibrant Crystal Emerald &quot;Check Price on Amazon&quot; button lights up on the product page and card!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-[#064E3B] mb-1">
                  Test Your Amazon Affiliate Link / Special Link:
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://www.amazon.com/dp/B0XXXXXXXX?tag=yourtag-20 or amzn.to/..."
                    value={testUrl}
                    onChange={(e) => setTestUrl(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-xl text-xs bg-white border border-[#DDEBE5] focus:outline-none focus:border-[#00C896] text-[#102A24]"
                  />
                  {testUrl && (
                    <button
                      onClick={() => setTestUrl('')}
                      className="px-3 py-2 text-xs bg-[#DDEBE5]/50 hover:bg-[#DDEBE5] rounded-xl text-[#102A24] cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Validation Status */}
                {testUrl && (
                  <div className="mt-2.5">
                    {isTestUrlValid ? (
                      <div className="p-3 rounded-xl bg-[#00C896]/15 border border-[#00C896]/40 text-xs text-[#064E3B] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-[#00C896]" />
                          <span>Valid Amazon domain detected! Button will safely render.</span>
                        </div>
                        <a
                          href={testUrl}
                          target="_blank"
                          rel={AMAZON_AFFILIATE_LINK_REL}
                          className="font-semibold underline inline-flex items-center gap-1 hover:text-[#00C896]"
                        >
                          <span>Test Outbound Link</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    ) : (
                      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>
                          Please provide a genuine Amazon.com or amzn.to URL. Non-Amazon links are rejected by compliance filters.
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Ready-to-paste Code Snippet */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-[#064E3B]">
                    Ready-to-Paste TypeScript Object (src/data/products.ts):
                  </span>
                  <button
                    onClick={copyToClipboard}
                    className="px-2.5 py-1 text-xs font-medium text-[#064E3B] bg-[#A7F3D0]/40 hover:bg-[#A7F3D0]/70 rounded-lg border border-[#00C896]/30 cursor-pointer inline-flex items-center gap-1.5"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#00C896]" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-2xl bg-[#102A24] text-[#A7F3D0] text-xs font-mono overflow-x-auto max-h-56 leading-relaxed">
                  {sampleSnippet}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#DDEBE5] bg-white/60 flex items-center justify-between">
          <span className="text-[11px] text-[#102A24]/60">
            Shop Limit compliance engine · Anti-deceptive link policy enforced
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium emerald-gradient-btn rounded-xl cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
