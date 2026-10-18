import React from 'react';

export const PrivacyTermsPage: React.FC<{ type: 'privacy' | 'terms' }> = ({ type }) => {
  return (
    <div className="w-full bg-[#F1EBDD] text-[#0A0A0B] py-12 sm:py-20 px-4 sm:px-10 max-w-4xl mx-auto">
      <div className="border-b border-[#0A0A0B]/10 pb-8 mb-10 text-center sm:text-left">
        <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-neutral-500 block mb-1">
          LEGAL TRANSPARENCY
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-light text-[#0A0A0B]">
          {type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
        </h1>
        <p className="text-xs text-neutral-600 mt-2 font-mono">
          Last revised: October 2026 · ASORA PARIS
        </p>
      </div>

      <div className="bg-white/70 border border-[#0A0A0B]/10 p-6 sm:p-10 space-y-6 text-xs sm:text-sm text-neutral-800 leading-relaxed font-sans">
        {type === 'privacy' ? (
          <>
            <section className="space-y-2">
              <h2 className="font-semibold text-base text-[#0A0A0B]">1. Overview & Data Ethics</h2>
              <p>
                ASORA values quiet confidence and digital discretion. We collect only the minimum client information
                necessary to fulfill your orders, provide dispatch tracking, and deliver Private List dispatches if opted in.
                We do not sell, license, or trade client records to third-party advertising networks.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-semibold text-base text-[#0A0A0B]">2. Information Collected</h2>
              <p>
                When placing an order or registering for The Private List, we record your name, delivery address,
                email, phone number, and encrypted payment tokens processed directly through certified payment gateways.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-semibold text-base text-[#0A0A0B]">3. Client Rights under GDPR</h2>
              <p>
                As a client based in Europe or globally, you maintain full rights to access, rectify, or request complete
                erasure of your personal identity records by emailing our data concierge at concierge@asora-paris.com.
              </p>
            </section>
          </>
        ) : (
          <>
            <section className="space-y-2">
              <h2 className="font-semibold text-base text-[#0A0A0B]">1. Governing Terms</h2>
              <p>
                These terms govern the acquisition and delivery of garments from ASORA PARIS. By placing an order for
                Volume 01 pieces, you enter into a purchase agreement governed by French and European Union commercial law.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-semibold text-base text-[#0A0A0B]">2. Product Availability & Craftsmanship</h2>
              <p>
                All pieces are produced in controlled volumes using 500+ GSM loopback terry and custom satin-stitch embroidery.
                Slight natural tactile variations in weave density reflect the organic character of combed natural cotton.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-semibold text-base text-[#0A0A0B]">3. Pricing & Duties</h2>
              <p>
                All published prices include standard value-added tax (VAT). For international shipments outside the EU,
                duties are estimated or handled via DDP courier routes where supported.
              </p>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default PrivacyTermsPage;
