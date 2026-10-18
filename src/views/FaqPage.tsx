import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FaqPage: React.FC = () => {
  const { setCurrentPage } = useStore();

  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What distinguishes ASORA from conventional luxury streetwear?',
      a: 'ASORA is grounded in quiet confidence and architectural weight. We avoid oversized slogans and ephemeral logos in favor of custom-milled 500+ GSM French cotton fleece, precision-placed 55mm satin-stitch embroidery, and dropped shoulder cuts engineered for repeat wear over decades.',
    },
    {
      q: 'Where are Volume 01 garments engineered and developed?',
      a: 'All designs, pattern grading, and tailoring specifications originate at our atelier in Paris, France. Our loopback fabrics and dense French fleece are custom-knitted to our exact GSM metrics and finished with twin-needle topstitching.',
    },
    {
      q: 'How does the "Find My Size" sizing work for unisex silhouettes?',
      a: 'Our garments are proportioned with intentional drape. If you prefer a traditional street-luxury relaxed posture, take your true size. For a tailored or closer fit, select one size down. You can also view exact flat garment measurements in both CM and Inches in our Size Guide.',
    },
    {
      q: 'What is the significance of the Pierced Horizon emblem?',
      a: 'The signature symbol features an open circular horizon ring with a gap at the top, pierced by a central pointed monolithic blade above a clean horizontal gap and lower pedestal. It represents a threshold—the quiet transition between where you are and where you are going.',
    },
    {
      q: 'What is included in the ASORA packaging experience?',
      a: 'Outerwear and suiting pieces arrive in our custom rigid soft-touch black presentation box featuring the blind-embossed symbol on the lid and a discreet burgundy line join. T-shirts and accessories arrive in heavy warm-ivory paper carriers with black braided cotton rope.',
    },
    {
      q: 'How do I join The Private List?',
      a: 'You can register your email directly via our footer or private list forms. Members receive confidential release dates, preview access to future volumes, and studio notes prior to public availability.',
    },
  ];

  return (
    <div className="w-full bg-[#F1EBDD] text-[#0A0A0B] py-12 sm:py-20 px-4 sm:px-10 max-w-4xl mx-auto">
      <div className="border-b border-[#0A0A0B]/10 pb-8 mb-10 text-center sm:text-left">
        <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-neutral-500 block mb-1">
          CLIENT INQUIRIES
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-light text-[#0A0A0B]">
          Frequently Asked Questions
        </h1>
        <p className="text-xs text-neutral-600 mt-2">
          Details on garment construction, shipping parameters, and the house philosophy.
        </p>
      </div>

      <div className="divide-y divide-[#0A0A0B]/10 border-t border-b border-[#0A0A0B]/10 bg-white/40">
        {faqs.map((faq, idx) => (
          <div key={idx} className="py-5 px-4 sm:px-6">
            <button
              onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
              className="w-full flex items-center justify-between text-left gap-4 hover:opacity-75 transition-opacity"
            >
              <span className="font-editorial text-xl sm:text-2xl text-[#0A0A0B] font-light">
                {faq.q}
              </span>
              <span className="p-1 text-[#0A0A0B]/60 shrink-0">
                {expandedIndex === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </span>
            </button>

            {expandedIndex === idx && (
              <p className="mt-3 text-xs sm:text-sm text-neutral-700 leading-relaxed max-w-2xl animate-in fade-in duration-200">
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 text-center p-8 bg-white/60 border border-[#0A0A0B]/10 text-xs">
        <p className="text-neutral-700 font-medium mb-2">Have a specific enquiry regarding your order or fit?</p>
        <button
          onClick={() => setCurrentPage('contact')}
          className="text-xs uppercase tracking-widest font-bold underline hover:opacity-70 text-[#0A0A0B]"
        >
          Contact our Paris Concierge
        </button>
      </div>
    </div>
  );
};

export default FaqPage;
