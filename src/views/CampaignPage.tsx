import React from 'react';
import { useStore } from '../context/StoreContext';
import { AsoraWordmark } from '../components/brand/AsoraWordmark';
import { ArrowRight } from 'lucide-react';

export const CampaignPage: React.FC = () => {
  const { setCurrentPage, openProductDetail } = useStore();

  return (
    <div className="w-full bg-[#0A0A0B] text-[#F1EBDD]">
      {/* Campaign Lead Hero */}
      <section className="relative min-h-[90vh] flex items-end justify-start overflow-hidden">
        <img
          src="/src/assets/images/hero_campaign_volume01_1791743171245.jpg"
          alt="ASORA PARIS Volume 01 Campaign Photography"
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.85]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/30 to-black/20" />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-12 pb-16">
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.4em] uppercase text-[#B9B6AE] block mb-3">
            CAMPAIGN FILM & STILLS // AUTUMN 2026
          </span>
          <AsoraWordmark size="hero" color="#F1EBDD" showDescriptor={true} className="items-start text-left mb-4" />
          <p className="font-editorial text-2xl sm:text-4xl text-[#F1EBDD] font-light max-w-2xl leading-tight mb-8">
            VOLUME 01 — PARIS
          </p>
          <button
            onClick={() => setCurrentPage('shop')}
            className="px-8 py-3.5 bg-[#F1EBDD] text-[#0A0A0B] text-xs tracking-[0.25em] uppercase font-semibold hover:bg-white transition-colors inline-flex items-center gap-2"
          >
            <span>SHOP THE CAMPAIGN</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* Editorial Introduction */}
      <section className="py-20 px-6 sm:px-12 max-w-4xl mx-auto text-center border-b border-[#2A2B2E]">
        <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#B9B6AE] block mb-3">
          ART DIRECTION
        </span>
        <h2 className="font-editorial text-3xl sm:text-5xl font-light text-white mb-6">
          Light on Concrete, Drape in Motion
        </h2>
        <p className="text-sm sm:text-base text-[#B9B6AE] leading-relaxed max-w-2xl mx-auto">
          Captured within the raw brutalist geometry of a post-industrial Parisian studio.
          Volume 01 pairs monolithic architectural concrete with the soft, dense tactility of custom 500+ GSM cotton fleece.
        </p>
      </section>

      {/* Editorial Gallery Grid */}
      <section className="py-20 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
          <div className="aspect-[4/3] bg-[#0E1626] border border-[#2A2B2E] overflow-hidden">
            <img
              src="/src/assets/images/product_heavyweight_crewneck_1791743182571.jpg"
              alt="ASORA Heavyweight Crewneck Studio Portrait"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col items-start md:pl-8">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#B9B6AE] mb-2">
              LOOK 01
            </span>
            <h3 className="font-editorial text-3xl text-white mb-4">
              ASORA Heavyweight Crewneck
            </h3>
            <p className="text-xs sm:text-sm text-[#B9B6AE] leading-relaxed mb-6">
              Obsidian Black. 500 GSM loopback cotton terry with our 55mm satin-stitch Pierced Horizon emblem at the chest.
              Engineered with dropped shoulders and structural twin-needle seams.
            </p>
            <button
              onClick={() => openProductDetail('asora-crewneck-01')}
              className="text-xs font-medium tracking-[0.2em] uppercase text-white hover:text-[#B9B6AE] underline underline-offset-4 flex items-center gap-1.5"
            >
              <span>VIEW CREWNECK</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16 md:flex-row-reverse">
          <div className="flex flex-col items-start md:pr-8 order-2 md:order-1">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#B9B6AE] mb-2">
              LOOK 02
            </span>
            <h3 className="font-editorial text-3xl text-white mb-4">
              ASORA Oversized Hoodie
            </h3>
            <p className="text-xs sm:text-sm text-[#B9B6AE] leading-relaxed mb-6">
              Deep Navy. 520 GSM dense French fleece with an architectural crossover double-layered hood.
              Designed without drawcords to maintain sharp posture.
            </p>
            <button
              onClick={() => openProductDetail('asora-hoodie-02')}
              className="text-xs font-medium tracking-[0.2em] uppercase text-white hover:text-[#B9B6AE] underline underline-offset-4 flex items-center gap-1.5"
            >
              <span>VIEW HOODIE</span>
              <ArrowRight size={13} />
            </button>
          </div>
          <div className="aspect-[4/3] bg-[#0E1626] border border-[#2A2B2E] overflow-hidden order-1 md:order-2">
            <img
              src="/src/assets/images/product_oversized_hoodie_1791743193131.jpg"
              alt="ASORA Oversized Hoodie in Deep Navy"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="aspect-[4/3] bg-[#0E1626] border border-[#2A2B2E] overflow-hidden">
            <img
              src="/src/assets/images/product_zip_jacket_1791743214316.jpg"
              alt="ASORA Zip Jacket in Charcoal"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col items-start md:pl-8">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#B9B6AE] mb-2">
              LOOK 03
            </span>
            <h3 className="font-editorial text-3xl text-white mb-4">
              ASORA Zip Jacket
            </h3>
            <p className="text-xs sm:text-sm text-[#B9B6AE] leading-relaxed mb-6">
              Charcoal. Bonded double-face wool and cotton blend with 30mm sleeve symbol and matte two-way front metal fastener.
            </p>
            <button
              onClick={() => openProductDetail('asora-zip-jacket-04')}
              className="text-xs font-medium tracking-[0.2em] uppercase text-white hover:text-[#B9B6AE] underline underline-offset-4 flex items-center gap-1.5"
            >
              <span>VIEW JACKET</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </section>

      {/* Campaign Footer Banner */}
      <section className="py-20 text-center px-6 border-t border-[#2A2B2E]">
        <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#B9B6AE] block mb-2">
          READY FOR DISPATCH
        </span>
        <h2 className="font-editorial text-3xl sm:text-4xl text-white mb-6">
          Volume 01 is now available for ordering
        </h2>
        <button
          onClick={() => setCurrentPage('shop')}
          className="px-8 py-3.5 bg-[#F1EBDD] text-[#0A0A0B] text-xs tracking-[0.25em] uppercase font-semibold hover:bg-white transition-colors inline-flex items-center gap-2"
        >
          <span>ENTER THE SHOP</span>
          <ArrowRight size={14} />
        </button>
      </section>
    </div>
  );
};

export default CampaignPage;
