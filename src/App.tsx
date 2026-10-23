/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { ProductDetailView } from './views/ProductDetailView';
import { CategoryView } from './views/CategoryView';
import { CompareView } from './views/CompareView';
import { GuidesView } from './views/GuidesView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { AffiliateDisclosureView } from './views/AffiliateDisclosureView';
import { PrivacyPolicyView } from './views/PrivacyPolicyView';
import { TermsView } from './views/TermsView';
import { SearchModal } from './components/SearchModal';
import { AffiliateGuideModal } from './components/AffiliateGuideModal';
import { Product, INITIAL_PRODUCTS, CategoryType } from './data/products';
import { BuyingGuide } from './data/guides';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('Tech & Gadgets');
  const [selectedGuideSlug, setSelectedGuideSlug] = useState<string | undefined>(undefined);
  
  // Interactive product comparison state with initial 2 items for immediate visual utility
  const [compareList, setCompareList] = useState<Product[]>(() => {
    return [INITIAL_PRODUCTS[0], INITIAL_PRODUCTS[1]];
  });

  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [affiliateGuideModalOpen, setAffiliateGuideModalOpen] = useState(false);

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedProduct]);

  const handleNavigate = (
    view: string,
    params?: { category?: CategoryType; slug?: string }
  ) => {
    if (params?.category) {
      setSelectedCategory(params.category);
    }
    if (params?.slug) {
      setSelectedGuideSlug(params.slug);
    }
    setCurrentView(view);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
  };

  const handleToggleCompare = (product: Product) => {
    setCompareList((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        if (prev.length >= 4) {
          return [...prev.slice(1), product];
        }
        return [...prev, product];
      }
    });
  };

  const handleAddToCompare = (product: Product) => {
    if (!compareList.some((p) => p.id === product.id)) {
      setCompareList((prev) => [...prev, product]);
    }
  };

  const handleRemoveFromCompare = (product: Product) => {
    setCompareList((prev) => prev.filter((p) => p.id !== product.id));
  };

  const handleClearCompare = () => {
    setCompareList([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FFFC] text-[#102A24] selection:bg-[#00C896]/20 selection:text-[#064E3B]">
      {/* Top Glass Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        compareCount={compareList.length}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenAffiliateGuide={() => setAffiliateGuideModalOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            products={INITIAL_PRODUCTS}
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
            compareList={compareList}
            onToggleCompare={handleToggleCompare}
            onOpenSearch={() => setSearchModalOpen(true)}
            onOpenAffiliateGuide={() => setAffiliateGuideModalOpen(true)}
          />
        )}

        {currentView === 'product-detail' && selectedProduct && (
          <ProductDetailView
            product={selectedProduct}
            onBack={() => setCurrentView('home')}
            onNavigate={handleNavigate}
            isComparing={compareList.some((p) => p.id === selectedProduct.id)}
            onToggleCompare={handleToggleCompare}
            onOpenAffiliateGuide={() => setAffiliateGuideModalOpen(true)}
          />
        )}

        {currentView === 'category' && (
          <CategoryView
            category={selectedCategory}
            products={INITIAL_PRODUCTS}
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
            compareList={compareList}
            onToggleCompare={handleToggleCompare}
          />
        )}

        {currentView === 'compare' && (
          <CompareView
            compareList={compareList}
            allProducts={INITIAL_PRODUCTS}
            onRemoveFromCompare={handleRemoveFromCompare}
            onAddToCompare={handleAddToCompare}
            onSelectProduct={handleSelectProduct}
            onClearCompare={handleClearCompare}
          />
        )}

        {currentView === 'guides' && (
          <GuidesView
            initialSlug={selectedGuideSlug}
            onNavigateHome={() => setCurrentView('home')}
          />
        )}

        {currentView === 'about' && <AboutView />}

        {currentView === 'contact' && <ContactView />}

        {currentView === 'disclosure' && <AffiliateDisclosureView />}

        {currentView === 'privacy' && <PrivacyPolicyView />}

        {currentView === 'terms' && <TermsView />}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAffiliateGuide={() => setAffiliateGuideModalOpen(true)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectProduct={(p) => {
          setSelectedProduct(p);
          setCurrentView('product-detail');
        }}
        onSelectGuide={(g) => {
          setSelectedGuideSlug(g.slug);
          setCurrentView('guides');
        }}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setCurrentView('category');
        }}
      />

      {/* Affiliate & Link Setup Guide Modal */}
      <AffiliateGuideModal
        isOpen={affiliateGuideModalOpen}
        onClose={() => setAffiliateGuideModalOpen(false)}
      />
    </div>
  );
}
