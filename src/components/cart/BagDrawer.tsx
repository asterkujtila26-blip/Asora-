import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { AsoraEmblem } from '../brand/AsoraEmblem';
import { X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';

export const BagDrawer: React.FC = () => {
  const {
    isBagDrawerOpen,
    setIsBagDrawerOpen,
    cart,
    cartCount,
    cartSubtotalEur,
    cartTotalEur,
    discountEur,
    shippingEur,
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

  if (!isBagDrawerOpen) return null;

  const thresholdRemainingEur = Math.max(0, settings.freeShippingThresholdEur - cartSubtotalEur);
  const thresholdProgress = Math.min(100, (cartSubtotalEur / settings.freeShippingThresholdEur) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput) return;
    const res = applyDiscountCode(promoInput);
    setPromoFeedback(res);
    if (res.success) {
      setPromoInput('');
    }
  };

  const handleProceedCheckout = () => {
    setIsBagDrawerOpen(false);
    setCurrentPage('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="The ASORA Bag">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0A0A0B]/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsBagDrawerOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#F1EBDD] text-[#0A0A0B] h-full shadow-2xl flex flex-col z-10 border-l border-[#0A0A0B]/10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#0A0A0B]/10 flex items-center justify-between bg-[#F1EBDD]">
          <div className="flex items-center gap-3">
            <AsoraEmblem size={22} color="#0A0A0B" />
            <div>
              <h2 className="text-sm font-semibold tracking-[0.25em] uppercase font-sans">
                THE ASORA BAG
              </h2>
              <span className="text-[11px] text-neutral-500 font-mono">
                {cartCount} {cartCount === 1 ? 'PIECE' : 'PIECES'}
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsBagDrawerOpen(false)}
            className="p-2 -mr-2 text-[#0A0A0B] hover:opacity-70 transition-opacity"
            aria-label="Close bag drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        {cart.length > 0 && (
          <div className="px-6 py-3 bg-[#0A0A0B]/5 border-b border-[#0A0A0B]/10 text-xs">
            {thresholdRemainingEur === 0 ? (
              <p className="text-emerald-900 font-medium tracking-wide">
                ✓ Complimentary European courier shipping unlocked.
              </p>
            ) : (
              <div>
                <p className="text-[#0A0A0B]/80 mb-1.5 text-[11px] tracking-wide">
                  Add <span className="font-semibold">{formatPrice(thresholdRemainingEur)}</span> more for complimentary shipping.
                </p>
                <div className="w-full bg-[#0A0A0B]/10 h-1 rounded-full overflow-hidden">
                  <div
                    className="bg-[#0A0A0B] h-full transition-all duration-500"
                    style={{ width: `${thresholdProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#0A0A0B]/10">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4">
              <AsoraEmblem size={48} color="#0A0A0B" className="opacity-30 mb-6" />
              <h3 className="font-editorial text-2xl font-light mb-2">
                YOUR ASORA BAG IS WAITING.
              </h3>
              <p className="text-xs text-neutral-600 max-w-xs mb-8 leading-relaxed">
                Discover the pieces from Volume 01. Heavyweight knits, dropped silhouettes, and considered details.
              </p>
              <button
                onClick={() => {
                  setIsBagDrawerOpen(false);
                  setCurrentPage('shop');
                }}
                className="px-6 py-3 bg-[#0A0A0B] text-[#F1EBDD] text-xs tracking-[0.25em] font-medium hover:bg-[#2A2B2E] transition-colors"
              >
                SHOP THE COLLECTION
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="py-4 flex gap-4 items-start">
                {/* Product Thumbnail */}
                <div className="w-20 h-24 bg-[#0A0A0B]/5 shrink-0 overflow-hidden border border-[#0A0A0B]/10">
                  <img
                    src={item.product.heroImage}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold tracking-wide truncate">
                    {item.product.name}
                  </h4>
                  <div className="text-[11px] text-neutral-600 mt-1 space-y-0.5">
                    <p>Color: <span className="font-medium text-[#0A0A0B]">{item.color}</span></p>
                    <p>Size: <span className="font-medium text-[#0A0A0B]">{item.size}</span></p>
                  </div>
                  <div className="mt-2 text-xs font-mono font-medium">
                    {formatPrice(item.priceEur * item.quantity)}
                  </div>

                  {/* Quantity Stepper & Remove */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-[#0A0A0B]/20 bg-white/60">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-[#0A0A0B]/10 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-2.5 text-xs font-mono select-none">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-[#0A0A0B]/10 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-neutral-500 hover:text-red-700 transition-colors p-1"
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Summary */}
        {cart.length > 0 && (
          <div className="p-6 bg-[#F1EBDD] border-t border-[#0A0A0B]/15 space-y-3">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder="PROMO OR INVITATION CODE"
                className="flex-1 bg-white/80 border border-[#0A0A0B]/20 px-3 py-2 text-[11px] tracking-wider uppercase focus:outline-none focus:border-[#0A0A0B]"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-[#0A0A0B] text-[#F1EBDD] text-[10px] tracking-widest uppercase hover:bg-[#2A2B2E] transition-colors"
              >
                APPLY
              </button>
            </form>

            {promoFeedback && (
              <p
                className={`text-[11px] ${
                  promoFeedback.success ? 'text-emerald-800' : 'text-rose-800'
                }`}
              >
                {promoFeedback.message}
              </p>
            )}

            {appliedDiscountCode && (
              <div className="flex items-center justify-between text-xs bg-[#0E1626]/5 px-2.5 py-1.5 border border-[#0E1626]/10">
                <span className="font-mono text-[11px]">CODE: {appliedDiscountCode}</span>
                <button
                  onClick={removeDiscountCode}
                  className="text-[10px] text-neutral-500 hover:text-black uppercase underline"
                >
                  Remove
                </button>
              </div>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs pt-2 border-t border-[#0A0A0B]/10">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span className="font-mono">{formatPrice(cartSubtotalEur)}</span>
              </div>
              {discountEur > 0 && (
                <div className="flex justify-between text-emerald-800">
                  <span>Privilege Discount</span>
                  <span className="font-mono">-{formatPrice(discountEur)}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-600">
                <span>Estimated Courier Shipping</span>
                <span className="font-mono">
                  {shippingEur === 0 ? 'Complimentary' : formatPrice(shippingEur)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-semibold pt-2 border-t border-[#0A0A0B]/15 text-[#0A0A0B]">
                <span>Total</span>
                <span className="font-mono">{formatPrice(cartTotalEur)}</span>
              </div>
              <p className="text-[10px] text-neutral-500 text-right">
                Includes all applicable European duties and taxes
              </p>
            </div>

            {/* Actions */}
            <div className="pt-2 space-y-2">
              <button
                onClick={handleProceedCheckout}
                className="w-full py-3.5 bg-[#0A0A0B] text-[#F1EBDD] text-xs tracking-[0.25em] font-medium hover:bg-[#2A2B2E] transition-colors flex items-center justify-center gap-2"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight size={14} />
              </button>
              <button
                onClick={() => setIsBagDrawerOpen(false)}
                className="w-full py-2 text-center text-[11px] tracking-[0.2em] uppercase text-neutral-600 hover:text-[#0A0A0B] transition-colors"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BagDrawer;
