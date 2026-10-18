import React from 'react';
import { useStore } from '../context/StoreContext';
import { Truck, RotateCcw, ShieldCheck, Globe, Check } from 'lucide-react';

export const ShippingReturnsPage: React.FC = () => {
  const { settings, formatPrice } = useStore();

  return (
    <div className="w-full bg-[#F1EBDD] text-[#0A0A0B] py-12 sm:py-20 px-4 sm:px-10 max-w-4xl mx-auto">
      <div className="border-b border-[#0A0A0B]/10 pb-8 mb-10 text-center sm:text-left">
        <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-neutral-500 block mb-1">
          POLICIES & DISPATCH
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-light text-[#0A0A0B]">
          Shipping & Returns
        </h1>
        <p className="text-xs text-neutral-600 mt-2">
          Transparent delivery parameters, Paris atelier logistics, and simple returns.
        </p>
      </div>

      <div className="space-y-12 text-xs sm:text-sm text-neutral-800 leading-relaxed font-sans">
        {/* Shipping Overview */}
        <div className="bg-white/70 border border-[#0A0A0B]/10 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3 text-neutral-700">
            <Truck size={20} />
            <h2 className="font-editorial text-2xl text-[#0A0A0B]">
              Worldwide Express Shipping
            </h2>
          </div>
          <p>
            All ASORA orders are packed by hand in Paris using our signature soft-touch presentation packaging.
            We partner with premier express carriers (DHL Express, FedEx Priority, and Colissimo Expert) with mandatory signature delivery.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#0A0A0B]/10 text-xs font-mono">
            <div className="p-3 bg-[#0A0A0B]/5">
              <span className="text-neutral-500 uppercase block text-[10px]">FRANCE & EUROPEAN UNION</span>
              <p className="font-semibold text-sm mt-1">2 – 4 Business Days</p>
              <p className="text-[11px] text-neutral-600 mt-0.5">
                Complimentary for orders over {formatPrice(settings.freeShippingThresholdEur)} (otherwise €15 standard)
              </p>
            </div>
            <div className="p-3 bg-[#0A0A0B]/5">
              <span className="text-neutral-500 uppercase block text-[10px]">INTERNATIONAL (UK, US, ASIA)</span>
              <p className="font-semibold text-sm mt-1">3 – 5 Business Days</p>
              <p className="text-[11px] text-neutral-600 mt-0.5">
                All duties & taxes pre-cleared via DDP (Delivered Duty Paid)
              </p>
            </div>
          </div>
        </div>

        {/* 14-Day Returns */}
        <div className="bg-white/70 border border-[#0A0A0B]/10 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3 text-neutral-700">
            <RotateCcw size={20} />
            <h2 className="font-editorial text-2xl text-[#0A0A0B]">
              14-Day Return Policy
            </h2>
          </div>
          <p>
            We accept returns within 14 calendar days of delivery. Because our pieces are cut from dense natural materials,
            we ask that items remain unworn, unwashed, unaltered, and enclosed in their original protective ASORA presentation boxes
            with all security tags attached.
          </p>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <Check size={14} className="text-emerald-700" />
              <span>Step 1: Contact our concierge team at {settings.contactEmail} to request a return label.</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={14} className="text-emerald-700" />
              <span>Step 2: Pack garments securely in the original rigid black box with protective tissue.</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={14} className="text-emerald-700" />
              <span>Step 3: Drop off at any authorized DHL Express station or schedule home collection.</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={14} className="text-emerald-700" />
              <span>Step 4: Inspection & reimbursement processed to your original payment method within 3 business days.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingReturnsPage;
