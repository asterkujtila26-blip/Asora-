import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductSize } from '../../types/store';
import { AsoraEmblem } from '../brand/AsoraEmblem';
import { X, Check, Ruler } from 'lucide-react';

export const SizeFinderModal: React.FC = () => {
  const { sizeFinder, setSizeFinder } = useStore();
  const [usualSize, setUsualSize] = useState<ProductSize | null>(null);
  const [preferredFit, setPreferredFit] = useState<'clean' | 'relaxed' | 'oversized' | null>(null);
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');

  if (!sizeFinder.isOpen) return null;

  const product = sizeFinder.product;

  const handleClose = () => {
    setSizeFinder({ isOpen: false });
    setUsualSize(null);
    setPreferredFit(null);
  };

  // Honest fit calculation based on garment cut
  let recommendedSize: ProductSize | null = null;
  let recommendationNote = '';

  if (usualSize && preferredFit && product) {
    const sizeOrder: ProductSize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const currentIndex = sizeOrder.indexOf(usualSize);

    if (product.fitType === 'oversized') {
      if (preferredFit === 'clean') {
        recommendedSize = currentIndex > 0 ? sizeOrder[currentIndex - 1] : usualSize;
        recommendationNote =
          'This piece is designed with an intentional oversized silhouette. To achieve a cleaner, closer fit, take one size down.';
      } else if (preferredFit === 'relaxed') {
        recommendedSize = usualSize;
        recommendationNote =
          'Taking your standard size will deliver the intended architectural relaxed silhouette with dropped shoulders.';
      } else {
        recommendedSize = currentIndex < sizeOrder.length - 1 ? sizeOrder[currentIndex + 1] : usualSize;
        recommendationNote =
          'For an exaggerated street-luxury drape, size up one step while maintaining shoulder alignment.';
      }
    } else {
      // standard relaxed or clean
      if (preferredFit === 'clean') {
        recommendedSize = usualSize;
        recommendationNote = 'Your normal size provides a clean, tailored drape in this silhouette.';
      } else if (preferredFit === 'oversized') {
        recommendedSize = currentIndex < sizeOrder.length - 1 ? sizeOrder[currentIndex + 1] : usualSize;
        recommendationNote = 'Size up one size for a relaxed, slouchier drape.';
      } else {
        recommendedSize = usualSize;
        recommendationNote = 'Your usual size corresponds with our unisex tailoring.';
      }
    }
  }

  const measurements = unit === 'cm'
    ? [
        { size: 'XS', chest: '106 cm', length: '68 cm', shoulder: '52 cm' },
        { size: 'S', chest: '112 cm', length: '70 cm', shoulder: '54 cm' },
        { size: 'M', chest: '118 cm', length: '72 cm', shoulder: '56 cm' },
        { size: 'L', chest: '124 cm', length: '74 cm', shoulder: '58 cm' },
        { size: 'XL', chest: '130 cm', length: '76 cm', shoulder: '60 cm' },
        { size: 'XXL', chest: '136 cm', length: '78 cm', shoulder: '62 cm' },
      ]
    : [
        { size: 'XS', chest: '41.7 in', length: '26.8 in', shoulder: '20.5 in' },
        { size: 'S', chest: '44.1 in', length: '27.6 in', shoulder: '21.3 in' },
        { size: 'M', chest: '46.5 in', length: '28.3 in', shoulder: '22.0 in' },
        { size: 'L', chest: '48.8 in', length: '29.1 in', shoulder: '22.8 in' },
        { size: 'XL', chest: '51.2 in', length: '29.9 in', shoulder: '23.6 in' },
        { size: 'XXL', chest: '53.5 in', length: '30.7 in', shoulder: '24.4 in' },
      ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="size-finder-title"
    >
      <div
        className="fixed inset-0 bg-[#0A0A0B]/75 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      <div className="relative bg-[#F1EBDD] text-[#0A0A0B] max-w-xl w-full border border-[#0A0A0B]/20 shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-[#0A0A0B] hover:opacity-70 transition-opacity"
          aria-label="Close size finder"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 pb-4 border-b border-[#0A0A0B]/10">
          <AsoraEmblem size={28} color="#0A0A0B" />
          <div>
            <h3 id="size-finder-title" className="text-sm font-semibold tracking-[0.25em] uppercase font-sans">
              FIND MY SIZE
            </h3>
            {product && (
              <p className="text-xs text-neutral-600 font-sans mt-0.5">
                {product.name} · Silhouette: {product.fitType.toUpperCase()}
              </p>
            )}
          </div>
        </div>

        {/* Step 1: Usual Size */}
        <div className="pt-6 space-y-3">
          <label className="block text-xs font-semibold tracking-wider uppercase text-neutral-700">
            1. Which size do you usually wear?
          </label>
          <div className="grid grid-cols-6 gap-2">
            {(['XS', 'S', 'M', 'L', 'XL', 'XXL'] as ProductSize[]).map((sz) => (
              <button
                key={sz}
                onClick={() => setUsualSize(sz)}
                className={`py-2.5 text-xs font-mono font-medium border transition-colors ${
                  usualSize === sz
                    ? 'border-[#0A0A0B] bg-[#0A0A0B] text-[#F1EBDD]'
                    : 'border-[#0A0A0B]/20 bg-white/40 hover:border-[#0A0A0B]'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Fit Preference */}
        <div className="pt-6 space-y-3">
          <label className="block text-xs font-semibold tracking-wider uppercase text-neutral-700">
            2. How do you prefer your fit?
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'clean', label: 'CLEAN', desc: 'Closer to body, tailored' },
              { id: 'relaxed', label: 'RELAXED', desc: 'Classic ASORA posture' },
              { id: 'oversized', label: 'OVERSIZED', desc: 'Voluminous street drape' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setPreferredFit(f.id as any)}
                className={`p-3 text-left border transition-colors ${
                  preferredFit === f.id
                    ? 'border-[#0A0A0B] bg-[#0A0A0B] text-[#F1EBDD]'
                    : 'border-[#0A0A0B]/20 bg-white/40 hover:border-[#0A0A0B]'
                }`}
              >
                <span className="block text-xs font-bold tracking-wider">{f.label}</span>
                <span className={`block text-[10px] mt-1 leading-tight ${preferredFit === f.id ? 'text-[#B9B6AE]' : 'text-neutral-500'}`}>
                  {f.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Recommendation output */}
        {recommendedSize && (
          <div className="mt-6 p-4 bg-[#0E1626] text-[#F1EBDD] border border-[#0E1626]">
            <div className="flex items-center gap-2 mb-1">
              <Check size={16} className="text-emerald-400" />
              <span className="text-xs font-mono tracking-widest text-[#B9B6AE]">
                RECOMMENDED SIZE:
              </span>
              <span className="text-base font-bold text-white font-mono">
                {recommendedSize}
              </span>
            </div>
            <p className="text-xs text-[#B9B6AE] leading-relaxed">
              {recommendationNote}
            </p>
          </div>
        )}

        {/* Physical Garment Dimensions Table */}
        <div className="mt-8 pt-6 border-t border-[#0A0A0B]/10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-neutral-700">
              <Ruler size={14} />
              <span>Garment Measurements</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-mono">
              <button
                onClick={() => setUnit('cm')}
                className={`px-2 py-0.5 border ${unit === 'cm' ? 'bg-[#0A0A0B] text-white border-[#0A0A0B]' : 'border-neutral-300'}`}
              >
                CM
              </button>
              <button
                onClick={() => setUnit('in')}
                className={`px-2 py-0.5 border ${unit === 'in' ? 'bg-[#0A0A0B] text-white border-[#0A0A0B]' : 'border-neutral-300'}`}
              >
                IN
              </button>
            </div>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#0A0A0B]/20 text-[10px] font-mono uppercase text-neutral-500">
                  <th className="py-2 pr-3">Size</th>
                  <th className="py-2 px-3">Chest Width</th>
                  <th className="py-2 px-3">Body Length</th>
                  <th className="py-2 pl-3">Shoulder Drop</th>
                </tr>
              </thead>
              <tbody className="font-mono divide-y divide-[#0A0A0B]/10">
                {measurements.map((m) => (
                  <tr
                    key={m.size}
                    className={recommendedSize === m.size ? 'bg-[#0A0A0B]/10 font-bold' : ''}
                  >
                    <td className="py-2 pr-3 font-sans font-medium">{m.size}</td>
                    <td className="py-2 px-3 text-neutral-700">{m.chest}</td>
                    <td className="py-2 px-3 text-neutral-700">{m.length}</td>
                    <td className="py-2 pl-3 text-neutral-700">{m.shoulder}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[10px] text-neutral-500 mt-3 leading-relaxed">
            Note: All garments are measured flat. Because items are crafted from heavyweight natural cotton,
            slight tolerance variations (+/- 1 cm) may occur naturally.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SizeFinderModal;
