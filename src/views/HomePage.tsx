import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { AsoraEmblem } from '../components/brand/AsoraEmblem';
import { AsoraWordmark } from '../components/brand/AsoraWordmark';
import { Heart, ArrowRight, Eye, Check } from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    products,
    articles,
    setCurrentPage,
    openProductDetail,
    openJournalArticle,
    formatPrice,
    toggleWishlist,
    isInWishlist,
    addToCart,
    subscribeNewsletter,
  } = useStore();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<{ success: boolean; message: string } | null>(null);

  // 4 lead essentials
  const leadProducts = products.slice(0, 4);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    const res = subscribeNewsletter(newsletterEmail);
    setNewsletterStatus(res);
    if (res.success) {
      setNewsletterEmail('');
    }
  };

  return (
    <div className="w-full bg-[#F1EBDD] text-[#0A0A0B]">
      {/* SECTION A — HERO: THE NEW COLLECTION / THRESHOLD */}
      <section className="relative w-full min-h-[85vh] sm:min-h-[92vh] flex items-end justify-start overflow-hidden bg-[#0A0A0B]">
        {/* Campaign Visual Asset */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_campaign_volume01_1791743171245.jpg"
            alt="ASORA PARIS Volume 01 Campaign in architectural brutalist concrete space"
            className="w-full h-full object-cover object-center filter brightness-[0.92]"
            referrerPolicy="no-referrer"
          />
          {/* Measured contrast scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/85 via-[#0A0A0B]/30 to-black/20" />
        </div>

        {/* Minimal Hero Copy Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-12 pb-14 sm:pb-20 text-[#F1EBDD]">
          <div className="max-w-2xl">
            {/* Secondary label */}
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="text-[10px] sm:text-xs tracking-[0.35em] uppercase font-mono text-[#F1EBDD]/90">
                VOLUME 01 — PARIS
              </span>
              <span className="w-8 h-px bg-[#F1EBDD]/40" />
              <span className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#B9B6AE]">
                EST. 2026
              </span>
            </div>

            {/* Wordmark & Statement */}
            <div className="mb-4 text-left">
              <AsoraWordmark size="hero" color="#F1EBDD" showDescriptor={true} className="items-start text-left mb-3" />
            </div>

            <p className="font-editorial text-2xl sm:text-4xl text-[#F1EBDD] font-light leading-snug tracking-tight mb-8">
              MORE THAN CLOTHING. A MINDSET.
            </p>

            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => setCurrentPage('shop')}
                className="px-8 py-4 bg-[#F1EBDD] text-[#0A0A0B] text-xs tracking-[0.25em] uppercase font-semibold hover:bg-white transition-colors flex items-center justify-center gap-2"
              >
                <span>SHOP THE COLLECTION</span>
                <ArrowRight size={14} />
              </button>

              <button
                onClick={() => setCurrentPage('the-symbol')}
                className="px-8 py-4 border border-[#F1EBDD]/40 text-[#F1EBDD] text-xs tracking-[0.25em] uppercase font-medium hover:bg-white/10 transition-colors"
              >
                THE SYMBOL
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION B — EDITORIAL STATEMENT */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 border-b border-[#0A0A0B]/10 max-w-5xl mx-auto text-center">
        <span className="text-xs tracking-[0.4em] uppercase text-neutral-500 font-mono block mb-4">
          QUIET CONFIDENCE.
        </span>
        <blockquote className="font-editorial text-3xl sm:text-5xl font-light leading-tight text-[#0A0A0B] max-w-3xl mx-auto">
          “Premium essentials, considered in every detail, designed in Paris and made to be worn for years.”
        </blockquote>
        <div className="mt-8 flex justify-center">
          <div className="w-12 h-px bg-[#0A0A0B]/20" />
        </div>
      </section>

      {/* SECTION C — THE ESSENTIALS (4 LEAD PRODUCTS) */}
      <section className="py-20 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4 pb-4 border-b border-[#0A0A0B]/10">
          <div>
            <span className="text-[10px] tracking-[0.35em] uppercase font-mono text-neutral-500">
              VOLUME 01 — CORE PIECES
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#0A0A0B] mt-1 font-light">
              The Essentials
            </h2>
          </div>
          <button
            onClick={() => setCurrentPage('shop')}
            className="text-xs tracking-[0.25em] uppercase text-[#0A0A0B] hover:opacity-60 transition-opacity flex items-center gap-1.5 self-start sm:self-auto font-medium"
          >
            <span>VIEW ALL 6 PIECES</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* 4-Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {leadProducts.map((product) => {
            const inWishlist = isInWishlist(product.id);
            return (
              <div
                key={product.id}
                className="group flex flex-col bg-[#F1EBDD] border border-[#0A0A0B]/10 transition-all hover:border-[#0A0A0B]/40 relative"
              >
                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id, product.primaryColor)}
                  className="absolute top-3 right-3 z-10 p-2 bg-[#F1EBDD]/90 backdrop-blur-sm rounded-full text-[#0A0A0B] hover:scale-110 transition-all"
                  aria-label={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
                >
                  <Heart
                    size={16}
                    className={inWishlist ? 'fill-[#4A0E17] text-[#4A0E17]' : 'text-[#0A0A0B]'}
                  />
                </button>

                {/* Product Image & Secondary Hover Reveal */}
                <div
                  className="relative aspect-[3/4] bg-[#0A0A0B]/5 overflow-hidden cursor-pointer"
                  onClick={() => openProductDetail(product.id)}
                >
                  <img
                    src={product.heroImage}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Quick View Button on Desktop Hover */}
                  <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openProductDetail(product.id);
                      }}
                      className="flex-1 py-2.5 bg-[#0A0A0B] text-[#F1EBDD] text-[10px] tracking-[0.2em] uppercase font-medium hover:bg-[#2A2B2E] transition-colors flex items-center justify-center gap-1"
                    >
                      <Eye size={12} />
                      <span>DETAILS</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, product.primaryColor, product.availableSizes[1] || 'M');
                      }}
                      className="py-2.5 px-3 bg-[#F1EBDD] text-[#0A0A0B] border border-[#0A0A0B] text-[10px] tracking-widest uppercase font-medium hover:bg-white transition-colors"
                      title="Quick Add Size M"
                    >
                      + QUICK ADD
                    </button>
                  </div>
                </div>

                {/* Product Information */}
                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 font-mono block">
                      {product.primaryColor}
                    </span>
                    <h3
                      onClick={() => openProductDetail(product.id)}
                      className="text-sm font-semibold tracking-wide text-[#0A0A0B] mt-1 cursor-pointer hover:underline"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-neutral-600 mt-1 line-clamp-1">
                      {product.shortDescription}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#0A0A0B]/10 flex items-center justify-between">
                    <span className="text-sm font-mono font-medium text-[#0A0A0B]">
                      {formatPrice(product.priceEur)}
                    </span>
                    <button
                      onClick={() => openProductDetail(product.id)}
                      className="text-[11px] tracking-wider uppercase text-neutral-600 hover:text-black flex items-center gap-1"
                    >
                      <span>VIEW</span>
                      <ArrowRight size={11} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION D — THE SYMBOL: PIERCED HORIZON */}
      <section className="bg-[#0A0A0B] text-[#F1EBDD] py-24 sm:py-32 px-6 sm:px-12 border-t border-b border-[#2A2B2E]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          {/* Left: The Exact Emblem Artwork at High Impact */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-12 bg-[#0E1626]/40 border border-[#2A2B2E] relative group">
            <div className="absolute top-4 left-4 text-[9px] font-mono tracking-widest text-[#B9B6AE]/60 uppercase">
              SPECIFICATION // 55MM
            </div>
            <AsoraEmblem
              size={140}
              color="#F1EBDD"
              variant="satin-stitch"
              className="my-4 transition-transform duration-500 group-hover:scale-105"
            />
            <span className="text-[10px] tracking-[0.35em] text-[#B9B6AE] font-mono mt-4 uppercase">
              THE PIERCED HORIZON
            </span>
            <span className="text-[9px] tracking-widest text-[#B9B6AE]/60 mt-1">
              EST. PARIS 2026
            </span>
          </div>

          {/* Right: Editorial Narrative */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <span className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-[#B9B6AE] font-mono mb-3">
              IDENTITY ARCHITECTURE
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-light text-[#F1EBDD] leading-tight mb-6">
              A horizon, pierced. A threshold between where you are and where you are going.
            </h2>
            <p className="text-sm sm:text-base text-[#B9B6AE] leading-relaxed mb-6 font-sans">
              An open circular horizon ring with a gap at the top, pierced by a central pointed monolithic blade,
              resting above a clean horizontal gap and lower pedestal. The blade rises through the opening in the ring.
              The symbol suggests a threshold and an abstract A without literally spelling out the letter.
            </p>
            <p className="text-xs sm:text-sm text-[#F1EBDD]/80 leading-relaxed mb-8 font-sans border-l border-[#F1EBDD]/30 pl-4 italic">
              “Small on the chest. Never loud. ASORA is recognised through intention, not excess.”
            </p>

            <button
              onClick={() => setCurrentPage('the-symbol')}
              className="px-8 py-3.5 bg-[#F1EBDD] text-[#0A0A0B] text-xs tracking-[0.25em] uppercase font-semibold hover:bg-[#B9B6AE] transition-colors flex items-center gap-2"
            >
              <span>DISCOVER THE SYMBOL</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION E — CAMPAIGN / MATERIAL FILM & TACTILITY */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] tracking-[0.35em] uppercase text-neutral-500 font-mono block mb-2">
            MATERIAL STUDY
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#0A0A0B] font-light">
            Form, Weight & Natural Light
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-3 leading-relaxed">
            Every garment in Volume 01 is balanced for physical posture: dense 500+ GSM French cotton fleece,
            satin-stitch embroidery, and dropped shoulder seam geometry.
          </p>
        </div>

        {/* 3-Column Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0A0A0B]/5 border border-[#0A0A0B]/10 overflow-hidden flex flex-col">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/src/assets/images/product_heavyweight_crewneck_1791743182571.jpg"
                alt="500 GSM loopback cotton fleece texture and collar rib"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-5">
              <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500">
                01. DENSITY
              </span>
              <h3 className="text-sm font-semibold mt-1">500 GSM Loopback Terry</h3>
              <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                Dense ring-spun yarns that provide structural drape without synthetic blends.
              </p>
            </div>
          </div>

          <div className="bg-[#0A0A0B]/5 border border-[#0A0A0B]/10 overflow-hidden flex flex-col">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/src/assets/images/product_oversized_hoodie_1791743193131.jpg"
                alt="Architectural crossover hood silhouette"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-5">
              <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500">
                02. SILHOUETTE
              </span>
              <h3 className="text-sm font-semibold mt-1">Architectural Hood Construction</h3>
              <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                Engineered crossover self-lined hood that maintains its shape without drawcords.
              </p>
            </div>
          </div>

          <div className="bg-[#0A0A0B]/5 border border-[#0A0A0B]/10 overflow-hidden flex flex-col">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/src/assets/images/product_zip_jacket_1791743214316.jpg"
                alt="Bonded double face wool and matte black metal hardware"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-5">
              <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500">
                03. HARDWARE
              </span>
              <h3 className="text-sm font-semibold mt-1">Matte Black Fasteners</h3>
              <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                Two-way geometric front zip pulls and aglets treated in low-sheen matte gunmetal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION F — THE PRIVATE LIST */}
      <section className="bg-[#0E1626] text-[#F1EBDD] py-20 px-6 sm:px-12 border-t border-[#2A2B2E]">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#B9B6AE] font-mono block mb-3">
            MEMBERSHIP & ACCESS
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl font-light mb-4 text-[#F1EBDD]">
            THE PRIVATE LIST
          </h2>
          <p className="text-xs sm:text-sm text-[#B9B6AE] leading-relaxed mb-8 max-w-lg mx-auto">
            First access to new volumes, selected releases, and notes from ASORA.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 bg-[#0A0A0B] text-xs tracking-wider text-[#F1EBDD] placeholder-[#B9B6AE]/60 border border-[#2A2B2E] focus:outline-none focus:border-[#F1EBDD]"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#F1EBDD] text-[#0A0A0B] text-xs tracking-[0.2em] uppercase font-semibold hover:bg-white transition-colors"
            >
              JOIN
            </button>
          </form>

          {newsletterStatus && (
            <div
              className={`mt-4 text-xs flex items-center justify-center gap-1.5 ${
                newsletterStatus.success ? 'text-emerald-300' : 'text-amber-300'
              }`}
            >
              {newsletterStatus.success && <Check size={14} />}
              <span>{newsletterStatus.message}</span>
            </div>
          )}
        </div>
      </section>

      {/* SECTION G — JOURNAL / EDITORIAL TILES */}
      <section className="py-20 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10 pb-4 border-b border-[#0A0A0B]/10">
          <div>
            <span className="text-[10px] tracking-[0.35em] uppercase font-mono text-neutral-500">
              EDITORIAL ESSAYS
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#0A0A0B] mt-1 font-light">
              The ASORA Journal
            </h2>
          </div>
          <button
            onClick={() => setCurrentPage('journal')}
            className="text-xs tracking-[0.25em] uppercase text-[#0A0A0B] hover:opacity-60 transition-opacity flex items-center gap-1.5 font-medium"
          >
            <span>ALL ARTICLES</span>
            <ArrowRight size={13} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
              onClick={() => openJournalArticle(article.id)}
              className="cursor-pointer group flex flex-col bg-transparent"
            >
              <div className="aspect-[16/10] bg-[#0A0A0B]/5 overflow-hidden border border-[#0A0A0B]/10 mb-4">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500 uppercase">
                <span>{article.category}</span>
                <span>·</span>
                <span>{article.readTime}</span>
              </div>
              <h3 className="font-editorial text-xl sm:text-2xl text-[#0A0A0B] mt-2 group-hover:underline">
                {article.title}
              </h3>
              <p className="text-xs text-neutral-600 mt-2 line-clamp-2 leading-relaxed">
                {article.excerpt}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
