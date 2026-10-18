import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { AsoraEmblem } from '../components/brand/AsoraEmblem';
import { Plus, Minus, Trash2, ArrowRight, ArrowLeft, ShieldCheck, Truck } from 'lucide-react';

export const BagPage: React.FC = () => {
  const {
    cart,
    cartCount,
    cartSubtotalEur,
    cartTotalEur,
    discountEur,
    shippingEur,
    taxEur,
    updateCartQuantity,
    removeFromCart,
    formatPrice,
    setCurrentPage,
    settings,
    appliedDiscountCode,
    applyDiscountCode,
    removeDiscountCode,
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ message: string; success: boolean } | null>(null);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput) return;
    const res = applyDiscountCode(promoInput);
    setPromoFeedback(res);
    if (res.success) setPromoInput('');
  };

  const thresholdRemainingEur = Math.max(0, settings.freeShippingThresholdEur - cartSubtotalEur);

  if (cart.length === 0) {
    return (
      <div className="w-full bg-[#F1EBDD] text-[#0A0A0B] py-24 px-6 text-center max-w-xl mx-auto">
        <AsoraEmblem size={56} color="#0A0A0B" className="opacity-40 mb-6" />
        <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-neutral-500 block mb-2">
          THE ASORA BAG
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#0A0A0B] mb-3">
          YOUR ASORA BAG IS WAITING.
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 mb-8 leading-relaxed max-w-sm mx-auto">
          Discover the pieces from Volume 01. Heavyweight knits, dropped silhouettes, and considered details.
        </p>
        <button
          onClick={() => setCurrentPage('shop')}
          className="px-8 py-3.5 bg-[#0A0A0B] text-[#F1EBDD] text-xs tracking-[0.25em] uppercase font-semibold hover:bg-[#2A2B2E] transition-colors inline-flex items-center gap-2"
        >
          <span>SHOP THE COLLECTION</span>
          <ArrowRight size={14} />
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F1EBDD] text-[#0A0A0B] py-10 sm:py-16 px-4 sm:px-10 max-w-7xl mx-auto">
      <div className="border-b border-[#0A0A0B]/10 pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-neutral-500 block mb-1">
            BAG REVIEW
          </span>
          <h1 className="font-editorial text-3xl sm:text-5xl font-light text-[#0A0A0B]">
            THE ASORA BAG
          </h1>
        </div>
        <button
          onClick={() => setCurrentPage('shop')}
          className="text-xs font-mono uppercase tracking-wider text-neutral-600 hover:text-black flex items-center gap-1.5"
        >
          <ArrowLeft size={13} />
          <span>CONTINUE SHOPPING</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Cart Item List */}
        <div className="lg:col-span-7 space-y-4">
          {/* Complimentary Shipping Banner */}
          <div className="p-4 bg-white/60 border border-[#0A0A0B]/10 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck size={15} />
              <span>
                {thresholdRemainingEur === 0
                  ? 'Your order qualifies for complimentary express courier shipping.'
                  : `Add ${formatPrice(thresholdRemainingEur)} more for complimentary express delivery.`}
              </span>
            </div>
            <span className="font-mono text-[11px] text-neutral-500">THRESHOLD €{settings.freeShippingThresholdEur}</span>
          </div>

          <div className="border border-[#0A0A0B]/10 divide-y divide-[#0A0A0B]/10 bg-white/40">
            {cart.map((item) => (
              <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                <img
                  src={item.product.heroImage}
                  alt={item.product.name}
                  className="w-20 h-24 sm:w-24 sm:h-30 object-cover bg-neutral-200 shrink-0 border border-[#0A0A0B]/10"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-semibold tracking-wide text-[#0A0A0B]">
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-neutral-500 mt-0.5">{item.product.subtitle}</p>
                    </div>
                    <span className="text-sm font-mono font-medium">
                      {formatPrice(item.priceEur * item.quantity)}
                    </span>
                  </div>

                  <div className="mt-2 text-xs text-neutral-600 flex items-center gap-4">
                    <span>Colour: <strong className="text-[#0A0A0B]">{item.color}</strong></span>
                    <span>Size: <strong className="text-[#0A0A0B]">{item.size}</strong></span>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center border border-[#0A0A0B]/20 bg-white">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 hover:bg-[#0A0A0B]/10 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-3 text-xs font-mono select-none">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 hover:bg-[#0A0A0B]/10 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs text-neutral-500 hover:text-red-700 flex items-center gap-1 transition-colors"
                    >
                      <Trash2 size={13} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary & Checkout Card */}
        <div className="lg:col-span-5 bg-white/70 border border-[#0A0A0B]/10 p-6 sm:p-8 space-y-6">
          <h2 className="text-sm font-semibold tracking-[0.25em] uppercase font-mono text-[#0A0A0B] border-b border-[#0A0A0B]/10 pb-3">
            ORDER SUMMARY
          </h2>

          {/* Promo code */}
          <form onSubmit={handleApplyPromo} className="space-y-2">
            <label className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block">
              INVITATION OR PRIVILEGE CODE
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder="e.g. ASORA2026"
                className="flex-1 bg-white border border-[#0A0A0B]/20 px-3 py-2.5 text-xs font-mono uppercase focus:outline-none focus:border-[#0A0A0B]"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#0A0A0B] text-[#F1EBDD] text-xs font-medium uppercase tracking-wider hover:bg-[#2A2B2E] transition-colors"
              >
                APPLY
              </button>
            </div>
            {promoFeedback && (
              <p className={`text-xs ${promoFeedback.success ? 'text-emerald-800' : 'text-rose-800'}`}>
                {promoFeedback.message}
              </p>
            )}
            {appliedDiscountCode && (
              <div className="flex items-center justify-between text-xs bg-[#0E1626]/5 px-3 py-2 border border-[#0E1626]/10 mt-2">
                <span>Code applied: <strong>{appliedDiscountCode}</strong></span>
                <button
                  type="button"
                  onClick={removeDiscountCode}
                  className="text-neutral-500 hover:text-black underline uppercase text-[10px]"
                >
                  Remove
                </button>
              </div>
            )}
          </form>

          {/* Itemized charges */}
          <div className="space-y-2.5 text-xs border-t border-[#0A0A0B]/10 pt-4">
            <div className="flex justify-between text-neutral-600">
              <span>Items Subtotal ({cartCount})</span>
              <span className="font-mono">{formatPrice(cartSubtotalEur)}</span>
            </div>

            {discountEur > 0 && (
              <div className="flex justify-between text-emerald-800">
                <span>Privilege Reduction</span>
                <span className="font-mono">-{formatPrice(discountEur)}</span>
              </div>
            )}

            <div className="flex justify-between text-neutral-600">
              <span>Express Tracked Courier</span>
              <span className="font-mono">
                {shippingEur === 0 ? 'Complimentary' : formatPrice(shippingEur)}
              </span>
            </div>

            <div className="flex justify-between text-neutral-600">
              <span>Estimated Included Tax ({settings.taxPercentage}%)</span>
              <span className="font-mono">{formatPrice(taxEur)}</span>
            </div>

            <div className="flex justify-between text-base font-semibold text-[#0A0A0B] pt-4 border-t border-[#0A0A0B]/15">
              <span>Total</span>
              <span className="font-mono">{formatPrice(cartTotalEur)}</span>
            </div>
          </div>

          <button
            onClick={() => setCurrentPage('checkout')}
            className="w-full py-4 bg-[#0A0A0B] text-[#F1EBDD] text-xs tracking-[0.25em] font-medium hover:bg-[#2A2B2E] transition-colors flex items-center justify-center gap-2"
          >
            <span>PROCEED TO CHECKOUT</span>
            <ArrowRight size={14} />
          </button>

          <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-neutral-500">
            <ShieldCheck size={14} />
            <span>Encrypted SSL checkout & Paris atelier fulfillment</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BagPage;
