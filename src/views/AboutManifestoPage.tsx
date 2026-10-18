import React from 'react';
import { useStore } from '../context/StoreContext';
import { AsoraLockup } from '../components/brand/AsoraLockup';
import { AsoraEmblem } from '../components/brand/AsoraEmblem';
import { ArrowRight, Package, Box, Layers } from 'lucide-react';

export const AboutManifestoPage: React.FC = () => {
  const { setCurrentPage } = useStore();

  return (
    <div className="w-full bg-[#F1EBDD] text-[#0A0A0B]">
      {/* Manifesto Hero */}
      <section className="py-24 sm:py-32 px-6 sm:px-12 max-w-5xl mx-auto text-center border-b border-[#0A0A0B]/10">
        <AsoraLockup size="lg" color="#0A0A0B" className="mb-8" />
        <span className="text-xs font-mono tracking-[0.4em] uppercase text-neutral-500 block mb-4">
          BRAND MANIFESTO
        </span>
        <h1 className="font-editorial text-4xl sm:text-6xl font-light text-[#0A0A0B] leading-tight mb-8">
          MORE THAN CLOTHING. A MINDSET.
        </h1>
        <blockquote className="font-editorial text-2xl sm:text-3xl text-neutral-800 font-light leading-relaxed max-w-3xl mx-auto italic">
          “ASORA is built around quiet confidence: considered forms, tactile materials, and a signature mark
          placed with intention. Every detail has a purpose. Nothing needs to shout. Volume 01 — Paris begins with
          essentials designed to become part of the everyday, worn in your own way.”
        </blockquote>
      </section>

      {/* Four Core Values */}
      <section className="py-20 px-6 sm:px-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-8 bg-white/50 border border-[#0A0A0B]/10">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-500 block mb-2">
              PILLAR 01
            </span>
            <h3 className="font-editorial text-2xl text-[#0A0A0B] mb-3">
              Quiet Confidence
            </h3>
            <p className="text-xs text-neutral-700 leading-relaxed">
              True luxury does not require loud logos or status signalling. Confidence is carried in the cut,
              the density of the weave, and self-possession.
            </p>
          </div>

          <div className="p-8 bg-white/50 border border-[#0A0A0B]/10">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-500 block mb-2">
              PILLAR 02
            </span>
            <h3 className="font-editorial text-2xl text-[#0A0A0B] mb-3">
              Precision
            </h3>
            <p className="text-xs text-neutral-700 leading-relaxed">
              Every seam, drop of the shoulder, and rib cuff width is calculated. Dropped proportions drape naturally
              without losing tailored structure.
            </p>
          </div>

          <div className="p-8 bg-white/50 border border-[#0A0A0B]/10">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-500 block mb-2">
              PILLAR 03
            </span>
            <h3 className="font-editorial text-2xl text-[#0A0A0B] mb-3">
              Individuality
            </h3>
            <p className="text-xs text-neutral-700 leading-relaxed">
              Designed as unisex essentials that yield to the wearer's personal cadence. Subtle nuances emerge through
              repeated wear over years.
            </p>
          </div>

          <div className="p-8 bg-white/50 border border-[#0A0A0B]/10">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-500 block mb-2">
              PILLAR 04
            </span>
            <h3 className="font-editorial text-2xl text-[#0A0A0B] mb-3">
              Craft
            </h3>
            <p className="text-xs text-neutral-700 leading-relaxed">
              Dense loopback French terry at 500+ GSM, twin-needle coverstitching, matte metal hardware, and tactile
              satin-stitch embroidery that softens with age.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 11 — PACKAGING EXPERIENCE ARCHITECTURE */}
      <section className="bg-[#0A0A0B] text-[#F1EBDD] py-20 px-6 sm:px-12 border-t border-[#2A2B2E]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#B9B6AE] block mb-2">
              UNBOXING ARCHITECTURE
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-light text-[#F1EBDD]">
              The Packaging Experience
            </h2>
            <p className="text-xs sm:text-sm text-[#B9B6AE] mt-2 max-w-lg mx-auto">
              Every ASORA order is received in ritual packaging conceived with the same restraint as our garments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Rigid Soft-Touch Box */}
            <div className="p-8 bg-[#0E1626] border border-[#2A2B2E] relative flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-neutral-400 mb-4">
                  <Box size={22} />
                  <span className="text-[10px] font-mono tracking-widest uppercase">
                    THE RIGID PRESENTATION BOX
                  </span>
                </div>
                <h3 className="font-editorial text-2xl text-white mb-3">
                  Soft-Touch Black Board with Blind-Embossed Symbol
                </h3>
                <ul className="text-xs text-[#B9B6AE] space-y-2 leading-relaxed">
                  <li>• Custom rigid soft-touch black board with precision lift-off lid</li>
                  <li>• The Pierced Horizon emblem blind-embossed with zero metallic foil on the lid</li>
                  <li>• Discreet ASORA PARIS wordmark on the front edge</li>
                  <li>• One calibrated razor-thin burgundy line (#4A0E17) at the interior lid join</li>
                  <li>• Acid-free warm ivory tissue wrap sealed with blind tonal seal</li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-[#2A2B2E] flex items-center justify-between text-[11px] font-mono text-[#B9B6AE]">
                <span>INCLUDED WITH OUTERWEAR & SUITING</span>
                <span className="text-[#4A0E17] font-bold">BURGUNDY ACCENT</span>
              </div>
            </div>

            {/* Shopping Bag */}
            <div className="p-8 bg-[#F1EBDD] text-[#0A0A0B] border border-[#2A2B2E] relative flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-neutral-600 mb-4">
                  <Package size={22} />
                  <span className="text-[10px] font-mono tracking-widest uppercase">
                    THE CARRIER BAG
                  </span>
                </div>
                <h3 className="font-editorial text-2xl text-[#0A0A0B] mb-3">
                  Warm Ivory Heavyweight Paper
                </h3>
                <ul className="text-xs text-neutral-700 space-y-2 leading-relaxed">
                  <li>• 250 GSM heavy uncoated warm-ivory paper stock</li>
                  <li>• Single-colour matte black typography and centered lockup</li>
                  <li>• Braided soft cotton black rope handles</li>
                  <li>• Restrained burgundy folded top return edge</li>
                  <li>• Zero plastic laminates; 100% recyclable mono-material structure</li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-[#0A0A0B]/20 flex items-center justify-between text-[11px] font-mono text-neutral-600">
                <span>PARIS ATELIER PACKAGING</span>
                <span>MONO-MATERIAL</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center px-6">
        <h2 className="font-editorial text-3xl font-light text-[#0A0A0B] mb-4">
          Discover Volume 01 — Paris
        </h2>
        <button
          onClick={() => setCurrentPage('shop')}
          className="px-8 py-3.5 bg-[#0A0A0B] text-[#F1EBDD] text-xs tracking-[0.25em] uppercase font-semibold hover:bg-[#2A2B2E] transition-colors inline-flex items-center gap-2"
        >
          <span>SHOP ESSENTIALS</span>
          <ArrowRight size={14} />
        </button>
      </section>
    </div>
  );
};

export default AboutManifestoPage;
