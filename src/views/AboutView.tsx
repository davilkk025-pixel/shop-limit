import React from 'react';
import { ShieldCheck, Heart, Scale, Target, CheckCircle2 } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/95 text-center space-y-4 bg-gradient-to-br from-white via-[#F8FFFC] to-[#A7F3D0]/20">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00C896] to-[#064E3B] flex items-center justify-center text-white mx-auto shadow-md">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="text-xs font-bold text-[#064E3B] uppercase tracking-wider">
          The Shop Limit Manifesto
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#102A24] tracking-tight">
          Shop Smart. Stay Within Your Limit.
        </h1>
        <p className="text-sm sm:text-base text-[#102A24]/80 max-w-2xl mx-auto leading-relaxed">
          We founded Shop Limit with a singular conviction: the modern consumer internet is engineered to induce buyer&apos;s remorse. We exist to restore sanity to everyday purchases.
        </p>
      </div>

      {/* The Core Problem We Solve */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-[#DDEBE5] space-y-4">
        <h2 className="font-display font-bold text-xl text-[#064E3B]">
          The Flaw in Traditional Review Sites
        </h2>
        <p className="text-xs sm:text-sm text-[#102A24]/80 leading-relaxed">
          Most tech and lifestyle review outlets are locked in an affiliate arms race: because commissions are percentage-based, they have a subtle, systemic incentive to crown the $800 flagship as &quot;Best Overall,&quot; while dismissing durable $150 options as &quot;budget compromises.&quot;
        </p>
        <p className="text-xs sm:text-sm text-[#102A24]/80 leading-relaxed">
          At <strong>Shop Limit</strong>, we calculate the <span className="font-semibold text-[#064E3B]">Utility Limit</span>: the exact dollar threshold beyond which each incremental dollar spent yields virtually zero tangible improvement in your daily life.
        </p>
      </div>

      {/* Our 4 Editorial Testing Pillars */}
      <div className="space-y-6">
        <h2 className="font-display font-bold text-2xl text-[#102A24]">
          Our 4 Editorial Testing Pillars
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-[#DDEBE5] space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#064E3B]">
              <Scale className="w-4 h-4 text-[#00C896]" />
              <span>1. The Sweet-Spot Curve</span>
            </div>
            <h3 className="font-display font-semibold text-base text-[#102A24]">
              Zero Vanity Tax
            </h3>
            <p className="text-xs text-[#102A24]/75 leading-relaxed">
              We penalize products that charge 300% premiums purely for brand badges, celebrity campaigns, or exotic packaging that goes straight into the recycling bin.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-[#DDEBE5] space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#064E3B]">
              <Target className="w-4 h-4 text-[#00C896]" />
              <span>2. Hardware Longevity</span>
            </div>
            <h3 className="font-display font-semibold text-base text-[#102A24]">
              Serviceability First
            </h3>
            <p className="text-xs text-[#102A24]/75 leading-relaxed">
              Can headphone cushions be swapped? Can coffee gaskets be descaled? We evaluate physical fasteners, modular parts, and chassis materials built for years of routine use.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-[#DDEBE5] space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#064E3B]">
              <ShieldCheck className="w-4 h-4 text-[#00C896]" />
              <span>3. Anti-Subscription Ethics</span>
            </div>
            <h3 className="font-display font-semibold text-base text-[#102A24]">
              No Rented Hardware
            </h3>
            <p className="text-xs text-[#102A24]/75 leading-relaxed">
              We fiercely oppose hardware companies that sell you a physical tracker or appliance, then demand monthly $15 recurring memberships just to unlock your own data.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-[#DDEBE5] space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#064E3B]">
              <CheckCircle2 className="w-4 h-4 text-[#00C896]" />
              <span>4. Amazon Associate Transparency</span>
            </div>
            <h3 className="font-display font-semibold text-base text-[#102A24]">
              Full Commercial Disclosure
            </h3>
            <p className="text-xs text-[#102A24]/75 leading-relaxed">
              We never conceal affiliate links or use deceptive redirect tricks. All Amazon outbound links are clearly marked with standard rel=&quot;sponsored nofollow&quot; tags.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
