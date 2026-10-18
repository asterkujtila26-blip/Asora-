import React from 'react';
import { useStore } from '../context/StoreContext';
import { AsoraEmblem } from '../components/brand/AsoraEmblem';
import { Check, Package, Truck, ArrowRight, Printer } from 'lucide-react';

export const OrderConfirmationPage: React.FC = () => {
  const { currentOrder, orders, setCurrentPage, formatPrice } = useStore();

  const order = currentOrder || orders[0];

  if (!order) {
    return (
      <div className="py-24 text-center">
        <p>No active order found.</p>
        <button onClick={() => setCurrentPage('shop')} className="mt-4 px-6 py-2 bg-black text-white text-xs">
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F1EBDD] text-[#0A0A0B] py-14 sm:py-24 px-4 sm:px-10 max-w-4xl mx-auto">
      <div className="bg-white/80 border border-[#0A0A0B]/15 p-8 sm:p-14 shadow-lg text-center">
        {/* Emblem & Official Message */}
        <div className="flex flex-col items-center mb-8">
          <AsoraEmblem size={56} color="#0A0A0B" className="mb-5" />
          <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-neutral-500 mb-2">
            OFFICIAL ORDER CONFIRMATION
          </span>
          <h1 className="font-editorial text-3xl sm:text-5xl font-light text-[#0A0A0B] mb-3">
            YOUR ASORA JOURNEY BEGINS.
          </h1>
          <p className="font-editorial text-xl sm:text-2xl text-neutral-700 italic">
            THANK YOU FOR CHOOSING ASORA.
          </p>
        </div>

        {/* Order Meta Bar */}
        <div className="bg-[#0A0A0B] text-[#F1EBDD] p-4 sm:p-6 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="text-left">
            <span className="text-[10px] text-[#B9B6AE] block uppercase">ORDER NUMBER</span>
            <span className="text-base font-bold tracking-wider">{order.orderNumber}</span>
          </div>
          <div className="text-left sm:text-center">
            <span className="text-[10px] text-[#B9B6AE] block uppercase">TRACKING CODE</span>
            <span className="tracking-wider">{order.trackingNumber}</span>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-[10px] text-[#B9B6AE] block uppercase">ESTIMATED DISPATCH</span>
            <span className="tracking-wider">{order.estimatedDelivery}</span>
          </div>
        </div>

        {/* Order Summary Table */}
        <div className="text-left mb-10">
          <h3 className="text-xs font-mono tracking-[0.25em] uppercase text-neutral-500 mb-4 border-b border-[#0A0A0B]/10 pb-2">
            ACQUIRED PIECES
          </h3>
          <div className="divide-y divide-[#0A0A0B]/10">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-4 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={item.product.heroImage}
                    alt={item.product.name}
                    className="w-12 h-14 object-cover bg-neutral-200 border border-[#0A0A0B]/10"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-semibold text-sm">{item.product.name}</h4>
                    <p className="text-neutral-500 text-[11px]">
                      {item.color} · Size {item.size} · Qty {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="font-mono font-medium text-sm">
                  {formatPrice(item.priceEur * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#0A0A0B]/10 space-y-1.5 text-xs">
            <div className="flex justify-between text-neutral-600">
              <span>Subtotal</span>
              <span className="font-mono">{formatPrice(order.subtotalEur)}</span>
            </div>
            {order.discountEur > 0 && (
              <div className="flex justify-between text-emerald-800">
                <span>Privilege Reduction</span>
                <span className="font-mono">-{formatPrice(order.discountEur)}</span>
              </div>
            )}
            <div className="flex justify-between text-neutral-600">
              <span>Courier Delivery</span>
              <span className="font-mono">
                {order.shippingEur === 0 ? 'Complimentary' : formatPrice(order.shippingEur)}
              </span>
            </div>
            <div className="flex justify-between font-semibold text-base text-[#0A0A0B] pt-3 border-t border-[#0A0A0B]/15">
              <span>Total Paid</span>
              <span className="font-mono">{formatPrice(order.totalEur)}</span>
            </div>
          </div>
        </div>

        {/* Shipping Address Details */}
        <div className="text-left bg-[#0A0A0B]/5 p-5 border border-[#0A0A0B]/10 mb-10 text-xs">
          <span className="font-mono text-[10px] tracking-widest uppercase text-neutral-500 block mb-2">
            DESTINATION ADDRESS
          </span>
          <p className="font-semibold text-sm">
            {order.shippingAddress.firstName} {order.shippingAddress.lastName}
          </p>
          <p className="text-neutral-700 mt-0.5">{order.shippingAddress.addressLine1}</p>
          {order.shippingAddress.addressLine2 && <p className="text-neutral-700">{order.shippingAddress.addressLine2}</p>}
          <p className="text-neutral-700">
            {order.shippingAddress.postalCode} {order.shippingAddress.city}, {order.shippingAddress.country}
          </p>
          <p className="text-neutral-500 mt-2 font-mono">Contact: {order.shippingAddress.email} · {order.shippingAddress.phone}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setCurrentPage('order-tracking')}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#0A0A0B] text-[#F1EBDD] text-xs tracking-[0.25em] uppercase font-semibold hover:bg-[#2A2B2E] transition-colors flex items-center justify-center gap-2"
          >
            <Truck size={14} />
            <span>TRACK SHIPMENT</span>
          </button>
          <button
            onClick={() => setCurrentPage('shop')}
            className="w-full sm:w-auto px-8 py-3.5 border border-[#0A0A0B] text-[#0A0A0B] text-xs tracking-[0.25em] uppercase font-semibold hover:bg-white transition-colors"
          >
            CONTINUE SHOPPING
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
