import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { AsoraEmblem } from '../brand/AsoraEmblem';
import { Search, X, ArrowRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    products,
    articles,
    openProductDetail,
    openJournalArticle,
    formatPrice,
  } = useStore();

  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const handleClose = () => {
    setIsSearchOpen(false);
    setQuery('');
  };

  const normalizedQuery = query.toLowerCase().trim();

  const matchingProducts = query
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(normalizedQuery) ||
          p.category.toLowerCase().includes(normalizedQuery) ||
          p.description.toLowerCase().includes(normalizedQuery) ||
          p.primaryColor.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const matchingArticles = query
    ? articles.filter(
        (a) =>
          a.title.toLowerCase().includes(normalizedQuery) ||
          a.category.toLowerCase().includes(normalizedQuery) ||
          a.excerpt.toLowerCase().includes(normalizedQuery)
      )
    : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Search ASORA PARIS"
    >
      <div
        className="fixed inset-0 bg-[#0A0A0B]/75 backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />

      <div className="relative bg-[#F1EBDD] text-[#0A0A0B] max-w-2xl w-full border border-[#0A0A0B]/20 shadow-2xl z-10 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-[#0A0A0B]/10 flex items-center gap-3">
          <Search size={20} className="text-[#0A0A0B]/50 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, silhouettes, fabrics, articles..."
            className="w-full bg-transparent text-base sm:text-lg text-[#0A0A0B] placeholder-[#0A0A0B]/40 focus:outline-none"
          />
          <button
            onClick={handleClose}
            className="p-2 text-[#0A0A0B] hover:opacity-70 transition-opacity"
            aria-label="Close search"
          >
            <X size={20} />
          </button>
        </div>

        {/* Quick Suggestions when empty */}
        {!query && (
          <div className="p-6">
            <span className="text-[10px] tracking-[0.25em] font-mono text-neutral-500 uppercase block mb-3">
              SUGGESTED SEARCHES
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                'Heavyweight Crewneck',
                'Oversized Hoodie',
                'Deep Navy',
                'Stone Grey',
                'The Pierced Horizon',
                'Volume 01',
                '500 GSM',
              ].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3 py-1.5 bg-white/70 border border-[#0A0A0B]/10 text-xs text-[#0A0A0B] hover:border-[#0A0A0B] transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Container */}
        {query && (
          <div className="max-h-[60vh] overflow-y-auto p-6 space-y-6 divide-y divide-[#0A0A0B]/10">
            {/* Products Results */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] tracking-[0.25em] font-mono text-neutral-500 uppercase">
                  PRODUCTS ({matchingProducts.length})
                </span>
              </div>

              {matchingProducts.length === 0 ? (
                <p className="text-xs text-neutral-500 py-2">No products match "{query}".</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {matchingProducts.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        handleClose();
                        openProductDetail(p.id);
                      }}
                      className="p-2.5 flex items-center gap-3 bg-white/40 border border-[#0A0A0B]/10 hover:border-[#0A0A0B] text-left transition-colors"
                    >
                      <img
                        src={p.heroImage}
                        alt={p.name}
                        className="w-12 h-14 object-cover bg-neutral-200 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-semibold truncate text-[#0A0A0B]">{p.name}</h4>
                        <p className="text-[10px] text-neutral-500">{p.primaryColor}</p>
                        <p className="text-xs font-mono font-medium mt-0.5">{formatPrice(p.priceEur)}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Editorial Articles Results */}
            <div className="pt-4">
              <span className="text-[10px] tracking-[0.25em] font-mono text-neutral-500 uppercase block mb-3">
                EDITORIAL & JOURNAL ({matchingArticles.length})
              </span>

              {matchingArticles.length === 0 ? (
                <p className="text-xs text-neutral-500 py-2">No articles match "{query}".</p>
              ) : (
                <div className="space-y-2">
                  {matchingArticles.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => {
                        handleClose();
                        openJournalArticle(a.id);
                      }}
                      className="w-full p-3 bg-white/40 border border-[#0A0A0B]/10 hover:border-[#0A0A0B] text-left transition-colors flex items-center justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-mono text-neutral-500 uppercase">
                          {a.category} · {a.readTime}
                        </span>
                        <h4 className="text-xs font-semibold text-[#0A0A0B] mt-0.5">{a.title}</h4>
                      </div>
                      <ArrowRight size={14} className="text-[#0A0A0B]/40 shrink-0" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer info */}
        <div className="px-6 py-3 bg-[#0A0A0B]/5 border-t border-[#0A0A0B]/10 flex items-center justify-between text-[11px] text-neutral-500">
          <div className="flex items-center gap-2">
            <AsoraEmblem size={14} color="#0A0A0B" />
            <span>ASORA PARIS Search</span>
          </div>
          <span>Press ESC or click outside to dismiss</span>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
