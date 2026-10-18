import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { AsoraLockup } from '../brand/AsoraLockup';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage, subscribeNewsletter, settings, currency, setCurrency } = useStore();
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState<{ message: string; success: boolean } | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const res = subscribeNewsletter(email);
    setFeedback(res);
    if (res.success) {
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#0A0A0B] text-[#F1EBDD] pt-16 sm:pt-20 pb-12 px-6 sm:px-10 border-t border-[#2A2B2E]">
      <div className="max-w-7xl mx-auto">
        {/* Top Row: Brand Statement & Private List Signup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#2A2B2E]">
          {/* Brand Intro */}
          <div className="lg:col-span-5 flex flex-col items-start gap-4">
            <AsoraLockup size="md" color="#F1EBDD" orientation="horizontal" emblemSize={28} />
            <p className="text-xs tracking-[0.3em] uppercase text-[#B9B6AE] font-mono mt-1">
              MORE THAN CLOTHING. A MINDSET.
            </p>
            <p className="text-sm text-[#B9B6AE] leading-relaxed max-w-md font-sans">
              Contemporary unisex street-luxury established in Paris, 2026. Built around quiet confidence,
              considered heavyweight forms, and a signature mark placed with intention.
            </p>
          </div>

          {/* Private List Signup */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            <div className="max-w-md lg:ml-auto w-full">
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#B9B6AE] font-mono block mb-2">
                THE PRIVATE LIST
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-light text-[#F1EBDD] mb-3">
                First access to new volumes & studio notes.
              </h3>
              <p className="text-xs text-[#B9B6AE] mb-5 leading-relaxed">
                Receive private release notifications, editorial essays, and preview access. Unsubscribe at any time.
              </p>

              <form onSubmit={handleSubscribe} className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-[#0E1626]/80 text-[#F1EBDD] placeholder-[#B9B6AE]/60 text-xs tracking-wider px-4 py-3.5 border border-[#2A2B2E] focus:border-[#F1EBDD] focus:outline-none transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1 px-4 py-2 bg-[#F1EBDD] text-[#0A0A0B] text-xs tracking-[0.2em] font-medium hover:bg-[#B9B6AE] transition-colors flex items-center gap-1.5"
                  aria-label="Join Private List"
                >
                  <span>JOIN</span>
                  <ArrowRight size={13} />
                </button>
              </form>

              {feedback && (
                <div
                  className={`mt-2.5 text-xs flex items-center gap-1.5 ${
                    feedback.success ? 'text-stone-300' : 'text-amber-300'
                  }`}
                >
                  {feedback.success && <Check size={13} />}
                  <span>{feedback.message}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Middle Navigation Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 py-14 border-b border-[#2A2B2E] text-xs">
          {/* Column 1: Collection */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#B9B6AE] font-mono mb-1">
              COLLECTION
            </span>
            <button
              onClick={() => setCurrentPage('shop')}
              className="text-left text-[#F1EBDD]/80 hover:text-white transition-colors"
            >
              Volume 01 — Paris
            </button>
            <button
              onClick={() => setCurrentPage('shop')}
              className="text-left text-[#F1EBDD]/80 hover:text-white transition-colors"
            >
              The Essentials
            </button>
            <button
              onClick={() => setCurrentPage('campaign')}
              className="text-left text-[#F1EBDD]/80 hover:text-white transition-colors"
            >
              Campaign Film & Lookbook
            </button>
            <button
              onClick={() => setCurrentPage('the-symbol')}
              className="text-left text-[#F1EBDD]/80 hover:text-white transition-colors"
            >
              The Pierced Horizon
            </button>
          </div>

          {/* Column 2: Client Care */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#B9B6AE] font-mono mb-1">
              CLIENT CARE
            </span>
            <button
              onClick={() => setCurrentPage('shipping-returns')}
              className="text-left text-[#F1EBDD]/80 hover:text-white transition-colors"
            >
              Shipping & Returns
            </button>
            <button
              onClick={() => setCurrentPage('size-guide')}
              className="text-left text-[#F1EBDD]/80 hover:text-white transition-colors"
            >
              Size Guide & Fit
            </button>
            <button
              onClick={() => setCurrentPage('order-tracking')}
              className="text-left text-[#F1EBDD]/80 hover:text-white transition-colors"
            >
              Order Tracking
            </button>
            <button
              onClick={() => setCurrentPage('faq')}
              className="text-left text-[#F1EBDD]/80 hover:text-white transition-colors"
            >
              Frequently Asked Questions
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className="text-left text-[#F1EBDD]/80 hover:text-white transition-colors"
            >
              Concierge Contact
            </button>
          </div>

          {/* Column 3: World of ASORA */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#B9B6AE] font-mono mb-1">
              THE HOUSE
            </span>
            <button
              onClick={() => setCurrentPage('about')}
              className="text-left text-[#F1EBDD]/80 hover:text-white transition-colors"
            >
              Manifesto & Principles
            </button>
            <button
              onClick={() => setCurrentPage('the-symbol')}
              className="text-left text-[#F1EBDD]/80 hover:text-white transition-colors"
            >
              Symbol Anatomy
            </button>
            <button
              onClick={() => setCurrentPage('journal')}
              className="text-left text-[#F1EBDD]/80 hover:text-white transition-colors"
            >
              Journal & Studio Notes
            </button>
            <button
              onClick={() => setCurrentPage('account')}
              className="text-left text-[#F1EBDD]/80 hover:text-white transition-colors"
            >
              Your ASORA Account
            </button>
          </div>

          {/* Column 4: Channels & Currency */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#B9B6AE] font-mono mb-1">
              DIGITAL IDENTITY
            </span>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#F1EBDD]/80 hover:text-white transition-colors"
            >
              Instagram · {settings.instagramHandle}
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#F1EBDD]/80 hover:text-white transition-colors"
            >
              TikTok · {settings.tiktokHandle}
            </a>
            <div className="pt-2">
              <span className="text-[10px] tracking-[0.2em] text-[#B9B6AE] block mb-1 font-mono">
                CURRENCY
              </span>
              <div className="flex items-center gap-2 font-mono text-xs">
                {(['EUR', 'USD', 'GBP'] as const).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setCurrency(curr)}
                    className={`px-2 py-1 border transition-colors ${
                      currency === curr
                        ? 'border-[#F1EBDD] bg-[#F1EBDD] text-[#0A0A0B] font-semibold'
                        : 'border-[#2A2B2E] text-[#B9B6AE] hover:border-[#F1EBDD]/50'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#B9B6AE]">
          <p className="tracking-widest">
            © 2026 ASORA — MORE THAN CLOTHING. A MINDSET.
          </p>

          <div className="flex items-center gap-6 text-[11px]">
            <button
              onClick={() => setCurrentPage('privacy')}
              className="hover:text-[#F1EBDD] transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setCurrentPage('terms')}
              className="hover:text-[#F1EBDD] transition-colors"
            >
              Terms of Service
            </button>
            <button
              onClick={() => setCurrentPage('admin')}
              className="hover:text-[#F1EBDD] transition-colors text-amber-200/70"
            >
              Store Management
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
