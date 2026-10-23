import React, { useState } from 'react';
import { Mail, Check, ArrowRight, ShieldCheck } from 'lucide-react';

interface NewsletterSignupProps {
  className?: string;
  compact?: boolean;
}

export const NewsletterSignup: React.FC<NewsletterSignupProps> = ({
  className = '',
  compact = false,
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('success');
    setErrorMessage('');
    setTimeout(() => {
      setEmail('');
    }, 4000);
  };

  return (
    <div
      className={`glass-panel rounded-3xl border border-white/90 bg-gradient-to-br from-white/95 via-[#F8FFFC] to-[#A7F3D0]/20 shadow-md ${
        compact ? 'p-5 sm:p-6' : 'p-6 sm:p-8'
      } ${className}`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left: Copy & Value Proposition */}
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-[#064E3B] uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5 text-[#00C896]" />
            <span>Shop Limit Dispatch</span>
          </div>

          <h3 className="font-display font-bold text-xl sm:text-2xl text-[#102A24] tracking-tight">
            Stay Within Your Limit — Get Curated Reviews
          </h3>

          <p className="text-xs sm:text-sm text-[#102A24]/75 leading-relaxed">
            Bi-weekly sweet-spot recommendations, genuine budget thresholds, and unbiased gear tear-downs. Zero spam, ever.
          </p>
        </div>

        {/* Right: Form & Feedback */}
        <div className="w-full lg:max-w-md">
          {status === 'success' ? (
            <div className="p-3.5 rounded-2xl bg-[#00C896]/15 border border-[#00C896]/30 text-xs font-semibold text-[#064E3B] flex items-center justify-between gap-3 animate-in fade-in">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#00C896] text-white flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Welcome aboard! You&apos;ll receive our next sweet-spot guide.</span>
              </div>
              <button
                onClick={() => setStatus('idle')}
                className="text-[11px] underline hover:text-[#00C896] cursor-pointer shrink-0"
              >
                Reset
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    placeholder="Enter your email address..."
                    className={`w-full px-4 py-2.5 rounded-xl text-xs bg-white/90 border text-[#102A24] placeholder:text-[#102A24]/40 focus:outline-none transition-colors ${
                      status === 'error'
                        ? 'border-red-400 focus:border-red-500'
                        : 'border-[#DDEBE5] focus:border-[#00C896]'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className="emerald-gradient-btn px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap shadow-sm hover:opacity-95"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {status === 'error' && (
                <p className="text-[11px] text-red-600 font-medium pl-1">
                  {errorMessage}
                </p>
              )}

              <div className="flex items-center gap-1.5 text-[11px] text-[#102A24]/55 pl-1">
                <ShieldCheck className="w-3 h-3 text-[#00C896] shrink-0" />
                <span>We respect your privacy. Unsubscribe anytime with 1 click.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
