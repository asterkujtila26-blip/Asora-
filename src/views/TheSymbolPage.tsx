import React from 'react';
import { useStore } from '../context/StoreContext';
import { AsoraEmblem } from '../components/brand/AsoraEmblem';
import { AsoraWordmark } from '../components/brand/AsoraWordmark';
import { ArrowRight, Check } from 'lucide-react';

export const TheSymbolPage: React.FC = () => {
  const { setCurrentPage } = useStore();

  return (
    <div className="w-full bg-[#F1EBDD] text-[#0A0A0B]">
      {/* Editorial Header */}
      <section className="bg-[#0A0A0B] text-[#F1EBDD] py-24 sm:py-32 px-6 sm:px-12 text-center border-b border-[#2A2B2E]">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.4em] uppercase text-[#B9B6AE] mb-4">
            THE SIGNATURE EMBLEM
          </span>
          <h1 className="font-editorial text-4xl sm:text-7xl font-light text-[#F1EBDD] leading-tight mb-6">
            The Pierced Horizon
          </h1>
          <p className="font-editorial italic text-xl sm:text-2xl text-[#B9B6AE] max-w-2xl mx-auto leading-relaxed">
            “A horizon, pierced. A threshold between where you are and where you are going.”
          </p>

          <div className="mt-12 p-10 bg-[#0E1626]/60 border border-[#2A2B2E] max-w-md w-full flex flex-col items-center">
            <AsoraEmblem size={130} color="#F1EBDD" variant="satin-stitch" />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#B9B6AE] mt-6">
              THE PIERCED HORIZON // EMBROIDERY SPECIFICATION
            </span>
          </div>
        </div>
      </section>

      {/* Symbol Anatomy & Geometry */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-neutral-500 block mb-2">
            GEOMETRIC ANATOMY
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl text-[#0A0A0B] font-light">
            Constructed with Intention
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-3 leading-relaxed">
            Not a generic letter A, star, flower, crown, or ordinary circle. The emblem is an architectural mark
            composed of four precise structural elements.
          </p>
        </div>

        {/* 4 Architectural Facets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-white/60 border border-[#0A0A0B]/10">
            <span className="text-xs font-mono tracking-widest uppercase text-neutral-500">
              01 // THE OPEN HORIZON RING
            </span>
            <h3 className="font-editorial text-2xl text-[#0A0A0B] mt-2 mb-3">
              The Circular Boundary
            </h3>
            <p className="text-xs text-neutral-700 leading-relaxed">
              An open circular horizon ring with a calibrated gap at the zenith. The ring defines the threshold of perception,
              holding the composition in balance while leaving a deliberate opening for upward ascension.
            </p>
          </div>

          <div className="p-8 bg-white/60 border border-[#0A0A0B]/10">
            <span className="text-xs font-mono tracking-widest uppercase text-neutral-500">
              02 // THE POINTED MONOLITHIC BLADE
            </span>
            <h3 className="font-editorial text-2xl text-[#0A0A0B] mt-2 mb-3">
              The Piercing Monolith
            </h3>
            <p className="text-xs text-neutral-700 leading-relaxed">
              A central pointed monolithic blade that rises upward through the top opening in the ring.
              Its sharp geometric vertex punctures the horizon line, symbolizing individual movement beyond boundaries.
            </p>
          </div>

          <div className="p-8 bg-white/60 border border-[#0A0A0B]/10">
            <span className="text-xs font-mono tracking-widest uppercase text-neutral-500">
              03 // THE CLEAN HORIZONTAL GAP
            </span>
            <h3 className="font-editorial text-2xl text-[#0A0A0B] mt-2 mb-3">
              The Negative Space
            </h3>
            <p className="text-xs text-neutral-700 leading-relaxed">
              A horizontal void separating the upper piercing blade from the foundation beneath.
              This negative space provides breathing room, preventing the mark from becoming a conventional solid shape.
            </p>
          </div>

          <div className="p-8 bg-white/60 border border-[#0A0A0B]/10">
            <span className="text-xs font-mono tracking-widest uppercase text-neutral-500">
              04 // THE LOWER TRAPEZOID PEDESTAL
            </span>
            <h3 className="font-editorial text-2xl text-[#0A0A0B] mt-2 mb-3">
              The Architectural Foundation
            </h3>
            <p className="text-xs text-neutral-700 leading-relaxed">
              A separate trapezoid-like form anchored beneath the clean horizontal gap. Together with the blade above,
              it subtly suggests the cadence of an abstract monolithic A without literally writing out the letter.
            </p>
          </div>
        </div>
      </section>

      {/* Garment Placement Rules — Brandbook Section 8 */}
      <section className="bg-[#0E1626] text-[#F1EBDD] py-20 px-6 sm:px-12 border-t border-[#2A2B2E]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#B9B6AE] block mb-2">
              APPAREL BRANDING RULES
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-light text-[#F1EBDD]">
              Physical Scale & Garment Placement
            </h2>
            <p className="text-xs sm:text-sm text-[#B9B6AE] mt-2 max-w-xl mx-auto">
              The emblem is applied consistently and with restraint. Never repeated as an all-over print or oversized badge.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#0A0A0B] border border-[#2A2B2E]">
              <span className="text-2xl font-mono font-bold text-white block mb-1">55 mm</span>
              <span className="text-[11px] font-mono text-[#B9B6AE] uppercase tracking-wider block mb-2">
                LEFT CHEST
              </span>
              <p className="text-xs text-[#B9B6AE] leading-relaxed">
                Tonal or subtle contrast satin-stitch embroidery placed on the left chest of crewnecks, hoodies, and t-shirts.
              </p>
            </div>

            <div className="p-6 bg-[#0A0A0B] border border-[#2A2B2E]">
              <span className="text-2xl font-mono font-bold text-white block mb-1">30 mm</span>
              <span className="text-[11px] font-mono text-[#B9B6AE] uppercase tracking-wider block mb-2">
                UPPER LEFT SLEEVE
              </span>
              <p className="text-xs text-[#B9B6AE] leading-relaxed">
                Positioned near the shoulder seam on the upper left sleeve of the Zip Jacket and long sleeve garments.
              </p>
            </div>

            <div className="p-6 bg-[#0A0A0B] border border-[#2A2B2E]">
              <span className="text-2xl font-mono font-bold text-white block mb-1">28 mm</span>
              <span className="text-[11px] font-mono text-[#B9B6AE] uppercase tracking-wider block mb-2">
                LEFT TROUSER THIGH
              </span>
              <p className="text-xs text-[#B9B6AE] leading-relaxed">
                Refined embroidery positioned on the upper left thigh of relaxed sweatpants and trousers.
              </p>
            </div>

            <div className="p-6 bg-[#0A0A0B] border border-[#2A2B2E]">
              <span className="text-2xl font-mono font-bold text-white block mb-1">280 mm</span>
              <span className="text-[11px] font-mono text-[#B9B6AE] uppercase tracking-wider block mb-2">
                BACK YOKE GRAPHIC
              </span>
              <p className="text-xs text-[#B9B6AE] leading-relaxed">
                Centred below the back collar yoke with the ASORA wordmark beneath for designated statement outer pieces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center px-6">
        <h2 className="font-editorial text-3xl text-[#0A0A0B] font-light mb-4">
          Experience the Pierced Horizon in Volume 01
        </h2>
        <button
          onClick={() => setCurrentPage('shop')}
          className="px-8 py-3.5 bg-[#0A0A0B] text-[#F1EBDD] text-xs tracking-[0.25em] uppercase font-semibold hover:bg-[#2A2B2E] transition-colors inline-flex items-center gap-2"
        >
          <span>EXPLORE THE COLLECTION</span>
          <ArrowRight size={14} />
        </button>
      </section>
    </div>
  );
};

export default TheSymbolPage;
