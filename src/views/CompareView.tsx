import React from 'react';
import { Scale, Plus, X, ExternalLink, Check, ArrowRight } from 'lucide-react';
import { Product } from '../data/products';
import { isValidAmazonAffiliateUrl, AMAZON_AFFILIATE_LINK_REL } from '../utils/affiliate';

interface CompareViewProps {
  compareList: Product[];
  allProducts: Product[];
  onRemoveFromCompare: (product: Product) => void;
  onAddToCompare: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onClearCompare: () => void;
}

export const CompareView: React.FC<CompareViewProps> = ({
  compareList,
  allProducts,
  onRemoveFromCompare,
  onAddToCompare,
  onSelectProduct,
  onClearCompare,
}) => {
  const unselectedProducts = allProducts.filter(
    (p) => !compareList.some((cp) => cp.id === p.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#064E3B] uppercase tracking-wider">
            <Scale className="w-4 h-4 text-[#00C896]" />
            <span>Interactive Comparison Matrix</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#102A24] mt-1">
            Product Reality Check
          </h1>
          <p className="text-xs sm:text-sm text-[#102A24]/75 mt-1">
            Compare features, materials, trade-offs, and limit verdicts side-by-side.
          </p>
        </div>

        {compareList.length > 0 && (
          <button
            onClick={onClearCompare}
            className="text-xs text-[#064E3B] hover:text-amber-800 underline cursor-pointer self-start sm:self-auto"
          >
            Clear Comparison ({compareList.length})
          </button>
        )}
      </div>

      {compareList.length === 0 ? (
        <div className="glass-panel p-10 rounded-3xl border border-white/95 text-center space-y-4 max-w-2xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-[#00C896]/20 text-[#064E3B] flex items-center justify-center mx-auto">
            <Scale className="w-6 h-6 text-[#00C896]" />
          </div>
          <h3 className="font-display font-bold text-lg text-[#102A24]">
            Your Comparison Matrix is Empty
          </h3>
          <p className="text-xs text-[#102A24]/70 max-w-md mx-auto">
            Select 2 or more products from our curated reviews to compare build quality, pros, cons, and limit verdicts side-by-side.
          </p>
          <div className="pt-2">
            <span className="text-xs font-semibold text-[#064E3B] block mb-3">
              Quickly Add Featured Products:
            </span>
            <div className="flex flex-wrap justify-center gap-2">
              {allProducts.slice(0, 3).map((p) => (
                <button
                  key={p.id}
                  onClick={() => onAddToCompare(p)}
                  className="px-3 py-1.5 rounded-xl bg-white border border-[#DDEBE5] hover:border-[#00C896] text-xs font-medium text-[#102A24] cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5 text-[#00C896]" />
                  <span>{p.title.split(' ')[0]} {p.title.split(' ')[1]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Active Matrix Table */}
          <div className="glass-panel rounded-3xl border border-white/95 overflow-x-auto shadow-xl">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-[#DDEBE5]">
                  <th className="p-4 sm:p-5 w-44 bg-white/40 text-xs font-bold text-[#064E3B] uppercase tracking-wider">
                    Criteria
                  </th>
                  {compareList.map((product) => (
                    <th key={product.id} className="p-4 sm:p-5 w-72 align-top">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-semibold text-[#064E3B]">
                            {product.category}
                          </span>
                          <button
                            onClick={() => onRemoveFromCompare(product)}
                            className="p-1 rounded-lg text-[#102A24]/60 hover:text-amber-800 hover:bg-amber-100/50 cursor-pointer"
                            title="Remove from comparison"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="aspect-4/3 rounded-xl overflow-hidden bg-[#F8FFFC] border border-[#DDEBE5]">
                          <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <h3 className="font-display font-bold text-sm text-[#102A24] line-clamp-2">
                          {product.title}
                        </h3>

                        <div className="pt-2">
                          {isValidAmazonAffiliateUrl(product.affiliateUrl) ? (
                            <a
                              href={product.affiliateUrl}
                              target="_blank"
                              rel={AMAZON_AFFILIATE_LINK_REL}
                              className="w-full emerald-gradient-btn py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm text-center"
                            >
                              <span>Check on Amazon</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          ) : (
                            <button
                              onClick={() => onSelectProduct(product)}
                              className="w-full emerald-outline-btn py-2 px-3 rounded-xl text-xs font-medium cursor-pointer"
                            >
                              View Full Review
                            </button>
                          )}
                        </div>
                      </div>
                    </th>
                  ))}

                  {/* Add more column if fewer than 4 */}
                  {compareList.length < 4 && (
                    <th className="p-4 sm:p-5 w-48 align-middle text-center bg-white/20">
                      <div className="border-2 border-dashed border-[#DDEBE5] rounded-2xl p-6 flex flex-col items-center justify-center gap-2">
                        <Plus className="w-6 h-6 text-[#00C896]" />
                        <span className="text-xs font-semibold text-[#064E3B]">Add Another</span>
                        <select
                          onChange={(e) => {
                            const p = unselectedProducts.find((item) => item.id === e.target.value);
                            if (p) onAddToCompare(p);
                            e.target.value = '';
                          }}
                          defaultValue=""
                          className="mt-2 text-xs text-[#102A24] bg-white border border-[#DDEBE5] rounded-lg px-2 py-1 max-w-full focus:outline-none"
                        >
                          <option value="" disabled>
                            Select product...
                          </option>
                          {unselectedProducts.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    </th>
                  )}
                </tr>
              </thead>

              <tbody className="divide-y divide-[#DDEBE5]/70 text-xs text-[#102A24]">
                {/* Budget Tier */}
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-[#064E3B] bg-white/30">
                    Budget Tier
                  </td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4 sm:p-5 font-medium">
                      {p.budgetTier}
                    </td>
                  ))}
                  {compareList.length < 4 && <td />}
                </tr>

                {/* Primary Strength */}
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-[#064E3B] bg-white/30">
                    Primary Advantage
                  </td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4 sm:p-5 text-[#102A24]/90">
                      <div className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#00C896] shrink-0 mt-0.5" />
                        <span>{p.pros[0]}</span>
                      </div>
                    </td>
                  ))}
                  {compareList.length < 4 && <td />}
                </tr>

                {/* Main Trade-off */}
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-[#064E3B] bg-white/30">
                    Main Trade-off
                  </td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4 sm:p-5 text-amber-900">
                      <div className="flex items-start gap-1.5">
                        <span className="text-amber-600 font-bold">✕</span>
                        <span>{p.cons[0]}</span>
                      </div>
                    </td>
                  ))}
                  {compareList.length < 4 && <td />}
                </tr>

                {/* Editorial Verdict */}
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-[#064E3B] bg-white/30">
                    Shop Limit Verdict
                  </td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4 sm:p-5 italic text-[#102A24]/80 leading-relaxed">
                      &quot;{p.editorialVerdict}&quot;
                    </td>
                  ))}
                  {compareList.length < 4 && <td />}
                </tr>

                {/* Best For */}
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-[#064E3B] bg-white/30">
                    Ideal Audience
                  </td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4 sm:p-5 text-[#102A24]/85 leading-relaxed">
                      {p.targetAudience}
                    </td>
                  ))}
                  {compareList.length < 4 && <td />}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
