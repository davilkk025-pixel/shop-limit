import React, { useState } from 'react';
import { BookOpen, ArrowLeft, ArrowRight, CheckCircle2, Clock, Calendar } from 'lucide-react';
import { BuyingGuide, BUYING_GUIDES } from '../data/guides';
import { ReadingProgressBar } from '../components/ReadingProgressBar';
import { SocialShareBar } from '../components/SocialShareBar';
import { calculateReadingTime } from '../utils/readingTime';

interface GuidesViewProps {
  initialSlug?: string;
  onNavigateHome: () => void;
}

export const GuidesView: React.FC<GuidesViewProps> = ({ initialSlug, onNavigateHome }) => {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(initialSlug || null);

  const activeGuide = selectedSlug
    ? BUYING_GUIDES.find((g) => g.slug === selectedSlug)
    : null;

  const activeReadingTime = activeGuide
    ? calculateReadingTime([
        activeGuide.title,
        activeGuide.summary,
        ...activeGuide.sections.map((s) => `${s.heading} ${s.body} ${s.keyTakeaway || ''}`),
        ...activeGuide.limitChecklist,
      ])
    : '';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative">
      {/* Scroll reading progress bar */}
      <ReadingProgressBar />
      {/* Back button */}
      <div>
        {activeGuide ? (
          <button
            onClick={() => setSelectedSlug(null)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#064E3B] hover:text-[#00C896] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Buying Guides</span>
          </button>
        ) : (
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#064E3B] hover:text-[#00C896] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </button>
        )}
      </div>

      {activeGuide ? (
        /* Single Guide Reader Mode */
        <article className="space-y-8 animate-in fade-in">
          <header className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/95 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#064E3B] flex-wrap">
              <span>{activeGuide.category}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#00C896]" />
                <span>{activeReadingTime}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{activeGuide.publishedDate}</span>
              </span>
            </div>

            <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-[#102A24] leading-tight">
              {activeGuide.title}
            </h1>

            <p className="text-sm sm:text-base text-[#102A24]/80 leading-relaxed font-normal">
              {activeGuide.summary}
            </p>
          </header>

          {/* Guide Sections */}
          <div className="space-y-6">
            {activeGuide.sections.map((sec, idx) => (
              <div key={idx} className="glass-card p-6 sm:p-8 rounded-2xl border border-[#DDEBE5] space-y-3">
                <h2 className="font-display font-bold text-lg text-[#064E3B]">
                  {sec.heading}
                </h2>
                <p className="text-xs sm:text-sm text-[#102A24]/85 leading-relaxed">
                  {sec.body}
                </p>
                {sec.keyTakeaway && (
                  <div className="mt-4 p-3 rounded-xl bg-[#00C896]/10 border border-[#00C896]/20 text-xs font-medium text-[#064E3B]">
                    <span className="font-bold">Key Takeaway:</span> {sec.keyTakeaway}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Limit Checklist Box */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/95 bg-gradient-to-br from-[#F8FFFC] via-white to-[#A7F3D0]/20 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#064E3B] uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-[#00C896]" />
              <span>Shop Limit Checklist Before Buying</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {activeGuide.limitChecklist.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-[#102A24]/90 p-2.5 rounded-xl bg-white/70 border border-[#DDEBE5]">
                  <span className="w-4 h-4 rounded-full bg-[#00C896]/20 text-[#064E3B] flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Sharing */}
          <div className="pt-2">
            <SocialShareBar
              title={activeGuide.title}
              summary={activeGuide.summary}
            />
          </div>
        </article>
      ) : (
        /* Guides Catalog View */
        <div className="space-y-8">
          <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/95 space-y-3 bg-gradient-to-r from-white via-[#F8FFFC] to-[#A7F3D0]/20">
            <div className="flex items-center gap-2 text-xs font-bold text-[#064E3B] uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-[#00C896]" />
              <span>Consumer Strategy & Education</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#102A24]">
              Shop Limit Buying Guides
            </h1>
            <p className="text-xs sm:text-sm text-[#102A24]/75 max-w-xl leading-relaxed">
              We deconstruct marketing buzzwords and help you identify the sweet spot in consumer products so you never buy features you don&apos;t need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BUYING_GUIDES.map((guide) => {
              const guideReadingTime = calculateReadingTime([
                guide.title,
                guide.summary,
                ...guide.sections.map((s) => `${s.heading} ${s.body} ${s.keyTakeaway || ''}`),
                ...guide.limitChecklist,
              ]);

              return (
                <div
                  key={guide.id}
                  onClick={() => setSelectedSlug(guide.slug)}
                  className="glass-card p-6 sm:p-8 rounded-2xl border border-[#DDEBE5] cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#064E3B] font-medium mb-2 flex-wrap">
                      <span>{guide.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#00C896]" />
                        <span>{guideReadingTime}</span>
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-[#102A24] group-hover:text-[#064E3B] transition-colors leading-snug">
                      {guide.title}
                    </h3>
                    <p className="text-xs text-[#102A24]/75 mt-2 line-clamp-3 leading-relaxed">
                      {guide.summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#DDEBE5] flex items-center justify-between text-xs font-semibold text-[#064E3B]">
                    <span>Read Full Article</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Social Media Sharing */}
          <div className="pt-2">
            <SocialShareBar
              title="Shop Limit Buying Guides — Anti-Hype Gear Strategy"
              summary="Practical consumer buying guides on finding the product sweet spot and staying within your budget limit."
            />
          </div>
        </div>
      )}
    </div>
  );
};
