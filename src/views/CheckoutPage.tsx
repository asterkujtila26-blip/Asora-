import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { AsoraEmblem } from '../components/brand/AsoraEmblem';
import { AsoraWordmark } from '../components/brand/AsoraWordmark';
import { ShieldCheck, Lock, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotalEur,
    cartTotalEur,
    discountEur,
    shippingEur,
    taxEur,
    formatPrice,
    createOrder,
    setCurrentPage,
    currency,
  } = useStore();

  const [step, setStep] = useState<'details' | 'shipping' | 'payment'>('details');

  const [formData, setFormData] = useState({
    firstName: 'Aster',
    lastName: 'Kujtila',
    email: 'client@asora-paris.com',
    phone: '+33 6 42 18 90 22',
    addressLine1: '8 Rue de la Paix',
    addressLine2: 'Apt 4B',
    city: 'Paris',
    postalCode: '75002',
    country: 'France',
    shippingMethod: 'standard-express',
    paymentMethod: 'card',
    cardHolder: 'ASTER KUJTILA',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '•••',
  });

  const [isProcessing, setIsProcessing] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="py-24 text-center max-w-md mx-auto px-6">
        <AsoraEmblem size={40} color="#0A0A0B" className="mb-4" />
        <h2 className="font-editorial text-2xl font-light mb-2">Your Bag is Empty</h2>
        <p className="text-xs text-neutral-600 mb-6">Please add items to your ASORA Bag before checkout.</p>
        <button
          onClick={() => setCurrentPage('shop')}
          className="px-6 py-3 bg-[#0A0A0B] text-[#F1EBDD] text-xs uppercase tracking-widest"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate secure platform payment processing (e.g. Stripe PaymentIntent)
    setTimeout(() => {
      setIsProcessing(false);
      const newOrder = createOrder({
        items: cart,
        subtotalEur: cartSubtotalEur,
        shippingEur,
        discountEur,
        taxEur,
        totalEur: cartTotalEur,
        currency,
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        paymentMethod:
          formData.paymentMethod === 'card'
            ? 'Stripe Verified Card (•••• 4242)'
            : 'Apple Pay / Digital Wallet',
      });
      setCurrentPage('order-confirmation');
    }, 1200);
  };

  return (
    <div className="w-full bg-[#F1EBDD] text-[#0A0A0B] py-10 sm:py-16 px-4 sm:px-10 max-w-7xl mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-8 mb-8 border-b border-[#0A0A0B]/10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentPage('bag')}
            className="text-xs font-mono uppercase tracking-wider text-neutral-600 hover:text-black flex items-center gap-1.5"
          >
            <ArrowLeft size={13} />
            <span>RETURN TO BAG</span>
          </button>
        </div>

        <AsoraWordmark size="sm" color="#0A0A0B" />

        <div className="flex items-center gap-1.5 text-xs text-neutral-600 font-mono">
          <Lock size={13} />
          <span>256-BIT SSL</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Form Steps */}
        <div className="lg:col-span-7 bg-white/70 border border-[#0A0A0B]/10 p-6 sm:p-8">
          {/* Progress Indicators */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#0A0A0B]/10 text-xs font-mono uppercase">
            <button
              onClick={() => setStep('details')}
              className={`flex items-center gap-2 ${step === 'details' ? 'font-bold text-[#0A0A0B]' : 'text-neutral-500'}`}
            >
              <span>1. Contact & Address</span>
            </button>
            <span>/</span>
            <button
              onClick={() => setStep('shipping')}
              className={`flex items-center gap-2 ${step === 'shipping' ? 'font-bold text-[#0A0A0B]' : 'text-neutral-500'}`}
            >
              <span>2. Delivery</span>
            </button>
            <span>/</span>
            <button
              onClick={() => setStep('payment')}
              className={`flex items-center gap-2 ${step === 'payment' ? 'font-bold text-[#0A0A0B]' : 'text-neutral-500'}`}
            >
              <span>3. Payment</span>
            </button>
          </div>

          <form onSubmit={handleCompleteOrder}>
            {/* Step 1: Details */}
            {step === 'details' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="font-editorial text-2xl text-[#0A0A0B] mb-4">
                  Client & Delivery Details
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block mb-1">
                      FIRST NAME *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-[#0A0A0B]/20 p-2.5 text-xs focus:outline-none focus:border-[#0A0A0B]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block mb-1">
                      LAST NAME *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-[#0A0A0B]/20 p-2.5 text-xs focus:outline-none focus:border-[#0A0A0B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block mb-1">
                      EMAIL FOR ORDER CONFIRMATION *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-[#0A0A0B]/20 p-2.5 text-xs focus:outline-none focus:border-[#0A0A0B]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block mb-1">
                      PHONE (FOR COURIER DISPATCH) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-[#0A0A0B]/20 p-2.5 text-xs focus:outline-none focus:border-[#0A0A0B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block mb-1">
                    STREET ADDRESS *
                  </label>
                  <input
                    type="text"
                    name="addressLine1"
                    required
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-[#0A0A0B]/20 p-2.5 text-xs focus:outline-none focus:border-[#0A0A0B]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block mb-1">
                      CITY *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-[#0A0A0B]/20 p-2.5 text-xs focus:outline-none focus:border-[#0A0A0B]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block mb-1">
                      POSTAL CODE *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-[#0A0A0B]/20 p-2.5 text-xs focus:outline-none focus:border-[#0A0A0B]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block mb-1">
                      COUNTRY *
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-[#0A0A0B]/20 p-2.5 text-xs focus:outline-none focus:border-[#0A0A0B]"
                    >
                      <option value="France">France</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Germany">Germany</option>
                      <option value="Italy">Italy</option>
                      <option value="Spain">Spain</option>
                      <option value="Switzerland">Switzerland</option>
                      <option value="United States">United States</option>
                      <option value="Albania">Albania</option>
                    </select>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="button"
                    onClick={() => setStep('shipping')}
                    className="w-full py-3.5 bg-[#0A0A0B] text-[#F1EBDD] text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[#2A2B2E] transition-colors flex items-center justify-center gap-2"
                  >
                    <span>CONTINUE TO DELIVERY</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Shipping */}
            {step === 'shipping' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="font-editorial text-2xl text-[#0A0A0B] mb-4">
                  Select Delivery Speed
                </h3>

                <div className="border border-[#0A0A0B]/20 p-4 bg-white flex items-center justify-between">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="shippingMethod"
                      checked={formData.shippingMethod === 'standard-express'}
                      onChange={() => setFormData({ ...formData, shippingMethod: 'standard-express' })}
                      className="accent-[#0A0A0B]"
                    />
                    <div>
                      <span className="text-xs font-semibold block">
                        Paris Atelier Direct Courier (2-4 Business Days)
                      </span>
                      <span className="text-[11px] text-neutral-500">
                        Tracked signature delivery in protective ASORA packaging
                      </span>
                    </div>
                  </label>
                  <span className="text-xs font-mono font-medium">
                    {shippingEur === 0 ? 'Complimentary' : formatPrice(shippingEur)}
                  </span>
                </div>

                <div className="pt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep('details')}
                    className="px-6 py-3 border border-[#0A0A0B]/30 text-xs uppercase"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep('payment')}
                    className="flex-1 py-3.5 bg-[#0A0A0B] text-[#F1EBDD] text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[#2A2B2E] transition-colors flex items-center justify-center gap-2"
                  >
                    <span>CONTINUE TO PAYMENT</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 'payment' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="font-editorial text-2xl text-[#0A0A0B] mb-4">
                  Payment Method
                </h3>

                <div className="space-y-3">
                  <div className="border border-[#0A0A0B]/30 p-4 bg-white">
                    <label className="flex items-center gap-3 cursor-pointer mb-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                        className="accent-[#0A0A0B]"
                      />
                      <span className="text-xs font-semibold">Credit / Debit Card (Stripe Encrypted)</span>
                    </label>

                    {formData.paymentMethod === 'card' && (
                      <div className="space-y-3 pt-2">
                        <div>
                          <label className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block mb-1">
                            CARDHOLDER NAME
                          </label>
                          <input
                            type="text"
                            name="cardHolder"
                            value={formData.cardHolder}
                            onChange={handleInputChange}
                            className="w-full bg-[#F1EBDD]/40 border border-[#0A0A0B]/20 p-2 text-xs font-mono"
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="col-span-2">
                            <label className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block mb-1">
                              CARD NUMBER
                            </label>
                            <input
                              type="text"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              className="w-full bg-[#F1EBDD]/40 border border-[#0A0A0B]/20 p-2 text-xs font-mono"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block mb-1">
                              EXP / CVC
                            </label>
                            <input
                              type="text"
                              value="12/28 · •••"
                              readOnly
                              className="w-full bg-[#F1EBDD]/40 border border-[#0A0A0B]/20 p-2 text-xs font-mono text-neutral-600"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep('shipping')}
                    className="px-6 py-3 border border-[#0A0A0B]/30 text-xs uppercase"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="flex-1 py-4 bg-[#0A0A0B] text-[#F1EBDD] text-xs tracking-[0.25em] uppercase font-semibold hover:bg-[#2A2B2E] transition-colors flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <span>TRANSMITTING ENCRYPTED ORDER...</span>
                    ) : (
                      <>
                        <span>AUTHORISE PAYMENT & CONFIRM ORDER</span>
                        <span>({formatPrice(cartTotalEur)})</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Right Summary */}
        <div className="lg:col-span-5 bg-white/70 border border-[#0A0A0B]/10 p-6 sm:p-8 space-y-4">
          <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block border-b border-[#0A0A0B]/10 pb-2">
            IN YOUR BAG ({cart.length} ITEMS)
          </span>

          <div className="divide-y divide-[#0A0A0B]/10 max-h-60 overflow-y-auto">
            {cart.map((item) => (
              <div key={item.id} className="py-2.5 flex items-center gap-3">
                <img
                  src={item.product.heroImage}
                  alt={item.product.name}
                  className="w-12 h-14 object-cover bg-neutral-200 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0 text-xs">
                  <h4 className="font-semibold truncate">{item.product.name}</h4>
                  <p className="text-[11px] text-neutral-500">
                    {item.color} · Size {item.size} · Qty {item.quantity}
                  </p>
                </div>
                <span className="text-xs font-mono font-medium">
                  {formatPrice(item.priceEur * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-[#0A0A0B]/10 pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-neutral-600">
              <span>Subtotal</span>
              <span className="font-mono">{formatPrice(cartSubtotalEur)}</span>
            </div>
            {discountEur > 0 && (
              <div className="flex justify-between text-emerald-800">
                <span>Discount</span>
                <span className="font-mono">-{formatPrice(discountEur)}</span>
              </div>
            )}
            <div className="flex justify-between text-neutral-600">
              <span>Courier Delivery</span>
              <span className="font-mono">{shippingEur === 0 ? 'Complimentary' : formatPrice(shippingEur)}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Included VAT</span>
              <span className="font-mono">{formatPrice(taxEur)}</span>
            </div>
            <div className="flex justify-between text-base font-semibold text-[#0A0A0B] pt-3 border-t border-[#0A0A0B]/15">
              <span>Total Payable</span>
              <span className="font-mono">{formatPrice(cartTotalEur)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
