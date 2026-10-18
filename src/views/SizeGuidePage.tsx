import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { AsoraEmblem } from '../components/brand/AsoraEmblem';
import { Ruler, Check } from 'lucide-react';

export const SizeGuidePage: React.FC = () => {
  const { setCurrentPage } = useStore();
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');

  const tops = unit === 'cm'
    ? [
        { size: 'XS', chest: '106 cm', length: '68 cm', shoulder: '52 cm', sleeve: '62 cm' },
        { size: 'S', chest: '112 cm', length: '70 cm', shoulder: '54 cm', sleeve: '63 cm' },
        { size: 'M', chest: '118 cm', length: '72 cm', shoulder: '56 cm', sleeve: '64 cm' },
        { size: 'L', chest: '124 cm', length: '74 cm', shoulder: '58 cm', sleeve: '65 cm' },
        { size: 'XL', chest: '130 cm', length: '76 cm', shoulder: '60 cm', sleeve: '66 cm' },
        { size: 'XXL', chest: '136 cm', length: '78 cm', shoulder: '62 cm', sleeve: '67 cm' },
      ]
    : [
        { size: 'XS', chest: '41.7 in', length: '26.8 in', shoulder: '20.5 in', sleeve: '24.4 in' },
        { size: 'S', chest: '44.1 in', length: '27.6 in', shoulder: '21.3 in', sleeve: '24.8 in' },
        { size: 'M', chest: '46.5 in', length: '28.3 in', shoulder: '22.0 in', sleeve: '25.2 in' },
        { size: 'L', chest: '48.8 in', length: '29.1 in', shoulder: '22.8 in', sleeve: '25.6 in' },
        { size: 'XL', chest: '51.2 in', length: '29.9 in', shoulder: '23.6 in', sleeve: '26.0 in' },
        { size: 'XXL', chest: '53.5 in', length: '30.7 in', shoulder: '24.4 in', sleeve: '26.4 in' },
      ];

  const bottoms = unit === 'cm'
    ? [
        { size: 'S', waist: '76 - 82 cm', hip: '106 cm', outseam: '102 cm', legOpening: '28 cm' },
        { size: 'M', waist: '82 - 88 cm', hip: '112 cm', outseam: '104 cm', legOpening: '30 cm' },
        { size: 'L', waist: '88 - 94 cm', hip: '118 cm', outseam: '106 cm', legOpening: '32 cm' },
        { size: 'XL', waist: '94 - 100 cm', hip: '124 cm', outseam: '108 cm', legOpening: '34 cm' },
      ]
    : [
        { size: 'S', waist: '29.9 - 32.3 in', hip: '41.7 in', outseam: '40.2 in', legOpening: '11.0 in' },
        { size: 'M', waist: '32.3 - 34.6 in', hip: '44.1 in', outseam: '40.9 in', legOpening: '11.8 in' },
        { size: 'L', waist: '34.6 - 37.0 in', hip: '46.5 in', outseam: '41.7 in', legOpening: '12.6 in' },
        { size: 'XL', waist: '37.0 - 39.4 in', hip: '48.8 in', outseam: '42.5 in', legOpening: '13.4 in' },
      ];

  return (
    <div className="w-full bg-[#F1EBDD] text-[#0A0A0B] py-12 sm:py-20 px-4 sm:px-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#0A0A0B]/10 pb-8 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-neutral-500 block mb-1">
            CLIENT ASSISTANCE
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl font-light text-[#0A0A0B]">
            Size & Silhouette Guide
          </h1>
          <p className="text-xs text-neutral-600 mt-2 max-w-xl">
            ASORA garments follow unisex street-luxury proportions with architectural dropped shoulders.
            All measurements reflect the physical flat dimensions of the garment.
          </p>
        </div>

        {/* Unit Toggle */}
        <div className="flex items-center gap-1 border border-[#0A0A0B]/20 p-1 bg-white/70 self-start sm:self-auto font-mono text-xs">
          <button
            onClick={() => setUnit('cm')}
            className={`px-3 py-1 transition-colors ${unit === 'cm' ? 'bg-[#0A0A0B] text-[#F1EBDD] font-bold' : 'text-neutral-600'}`}
          >
            CENTIMETRES (CM)
          </button>
          <button
            onClick={() => setUnit('in')}
            className={`px-3 py-1 transition-colors ${unit === 'in' ? 'bg-[#0A0A0B] text-[#F1EBDD] font-bold' : 'text-neutral-600'}`}
          >
            INCHES (IN)
          </button>
        </div>
      </div>

      {/* Silhouette Philosophies */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 bg-white/60 border border-[#0A0A0B]/10">
          <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block mb-1">
            FIT POSTURE A
          </span>
          <h3 className="font-editorial text-2xl mb-2">Clean Tailored</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Closer to the torso, structured shoulder seam. Recommended for our Zip Jacket or layering beneath outerwear.
          </p>
        </div>

        <div className="p-6 bg-white/60 border border-[#0A0A0B]/10">
          <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block mb-1">
            FIT POSTURE B
          </span>
          <h3 className="font-editorial text-2xl mb-2">Relaxed Contemporary</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            The foundational ASORA silhouette. Dropped shoulders, ample chest ease, and clean drape that stays poised.
          </p>
        </div>

        <div className="p-6 bg-white/60 border border-[#0A0A0B]/10">
          <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block mb-1">
            FIT POSTURE C
          </span>
          <h3 className="font-editorial text-2xl mb-2">Architectural Oversized</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Substantial volume across the yoke and chest with sculptural hood crossover. Featured in our Oversized Hoodie.
          </p>
        </div>
      </div>

      {/* Tops Table */}
      <div className="bg-white/80 border border-[#0A0A0B]/10 p-6 sm:p-8 mb-10">
        <h3 className="text-xs font-mono font-bold tracking-widest uppercase text-neutral-600 mb-4 pb-2 border-b border-[#0A0A0B]/10">
          TOPS, HOODIES & CREWNECKS (FLAT GARMENT DIMENSIONS)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-[#0A0A0B]/15 text-neutral-500 uppercase text-[10px]">
                <th className="py-2.5">Size</th>
                <th className="py-2.5">Chest Width</th>
                <th className="py-2.5">Total Length</th>
                <th className="py-2.5">Shoulder Drop</th>
                <th className="py-2.5">Sleeve Length</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0A0A0B]/10">
              {tops.map((r) => (
                <tr key={r.size} className="hover:bg-[#0A0A0B]/5">
                  <td className="py-3 font-bold font-sans">{r.size}</td>
                  <td className="py-3">{r.chest}</td>
                  <td className="py-3">{r.length}</td>
                  <td className="py-3">{r.shoulder}</td>
                  <td className="py-3">{r.sleeve}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottoms Table */}
      <div className="bg-white/80 border border-[#0A0A0B]/10 p-6 sm:p-8 mb-10">
        <h3 className="text-xs font-mono font-bold tracking-widest uppercase text-neutral-600 mb-4 pb-2 border-b border-[#0A0A0B]/10">
          SWEATPANTS & TROUSERS
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-[#0A0A0B]/15 text-neutral-500 uppercase text-[10px]">
                <th className="py-2.5">Size</th>
                <th className="py-2.5">Elastic Waist</th>
                <th className="py-2.5">Hip Width</th>
                <th className="py-2.5">Outseam Length</th>
                <th className="py-2.5">Leg Opening</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0A0A0B]/10">
              {bottoms.map((r) => (
                <tr key={r.size} className="hover:bg-[#0A0A0B]/5">
                  <td className="py-3 font-bold font-sans">{r.size}</td>
                  <td className="py-3">{r.waist}</td>
                  <td className="py-3">{r.hip}</td>
                  <td className="py-3">{r.outseam}</td>
                  <td className="py-3">{r.legOpening}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SizeGuidePage;
