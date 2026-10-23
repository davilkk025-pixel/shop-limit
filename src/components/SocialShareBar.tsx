import React, { useState } from 'react';
import { Share2, Link2, Check } from 'lucide-react';

interface SocialShareBarProps {
  title: string;
  summary?: string;
  url?: string;
}

export const SocialShareBar: React.FC<SocialShareBarProps> = ({ title, summary, url }) => {
  const [copied, setCopied] = useState(false);

  // Fallback to window location if available
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://shoplimit.reviews');
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(`${title} — Shop Limit`);
  const encodedSummary = encodeURIComponent(summary ? `${summary} via @ShopLimit` : `${title} — Shop Smart. Stay Within Your Limit.`);

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = shareUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/95 shadow-sm space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#064E3B] uppercase tracking-wider">
          <Share2 className="w-4 h-4 text-[#00C896]" />
          <span>Circulate & Share This Review</span>
        </div>
        <span className="text-[11px] text-[#102A24]/60">
          Help others avoid overpriced hype and stay within their limit.
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 pt-1">
        {/* Twitter / X */}
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X (Twitter)"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-[#DDEBE5] hover:border-[#00C896] hover:bg-[#A7F3D0]/20 text-[#102A24] hover:text-[#064E3B] transition-all cursor-pointer shadow-xs"
        >
          {/* X icon SVG */}
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span>Share on X</span>
        </a>

        {/* LinkedIn */}
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-[#DDEBE5] hover:border-[#00C896] hover:bg-[#A7F3D0]/20 text-[#102A24] hover:text-[#064E3B] transition-all cursor-pointer shadow-xs"
        >
          {/* LinkedIn icon SVG */}
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
          </svg>
          <span>LinkedIn</span>
        </a>

        {/* Facebook */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-[#DDEBE5] hover:border-[#00C896] hover:bg-[#A7F3D0]/20 text-[#102A24] hover:text-[#064E3B] transition-all cursor-pointer shadow-xs"
        >
          {/* Facebook icon SVG */}
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
          </svg>
          <span>Facebook</span>
        </a>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          aria-label="Copy direct review link"
          className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-xs ${
            copied
              ? 'bg-[#00C896] text-white border border-[#00C896]'
              : 'bg-white border border-[#DDEBE5] hover:border-[#00C896] hover:bg-[#A7F3D0]/20 text-[#102A24] hover:text-[#064E3B]'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-white" />
              <span>Link Copied!</span>
            </>
          ) : (
            <>
              <Link2 className="w-3.5 h-3.5 text-[#00C896]" />
              <span>Copy Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
