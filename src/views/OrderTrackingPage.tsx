import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { AsoraEmblem } from '../components/brand/AsoraEmblem';
import { Truck, Search, CheckCircle2, Package, Clock, AlertCircle } from 'lucide-react';

export const OrderTrackingPage: React.FC = () => {
  const { orders, formatPrice } = useStore();

  const [orderQuery, setOrderQuery] = useState('ASR-2026-8841');
  const [emailQuery, setEmailQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [foundOrder, setFoundOrder] = useState<any>(orders[0] || null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const match = orders.find(
      (o) =>
        o.orderNumber.toLowerCase() === orderQuery.trim().toLowerCase() ||
        o.trackingNumber.toLowerCase() === orderQuery.trim().toLowerCase()
    );
    setFoundOrder(match || null);
  };

  return (
    <div className="w-full bg-[#F1EBDD] text-[#0A0A0B] py-12 sm:py-20 px-4 sm:px-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <AsoraEmblem size={38} color="#0A0A0B" className="mx-auto mb-3" />
        <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-neutral-500 block mb-1">
          COURIER DISPATCH MONITOR
        </span>
        <h1 className="font-editorial text-3xl sm:text-5xl font-light text-[#0A0A0B]">
          Order Tracking
        </h1>
        <p className="text-xs text-neutral-600 mt-2">
          Verify live fulfillment status, courier dispatch codes, and Paris atelier departure times.
        </p>
      </div>

      {/* Lookup Form */}
      <div className="bg-white/80 border border-[#0A0A0B]/10 p-6 sm:p-8 mb-10 shadow-sm">
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
          <div className="sm:col-span-5">
            <label className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block mb-1">
              ORDER OR TRACKING NUMBER
            </label>
            <input
              type="text"
              required
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              placeholder="e.g. ASR-2026-8841"
              className="w-full bg-white border border-[#0A0A0B]/20 p-2.5 text-xs font-mono uppercase focus:outline-none focus:border-[#0A0A0B]"
            />
          </div>

          <div className="sm:col-span-5">
            <label className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block mb-1">
              ORDER EMAIL (OPTIONAL)
            </label>
            <input
              type="email"
              value={emailQuery}
              onChange={(e) => setEmailQuery(e.target.value)}
              placeholder="client@asora-paris.com"
              className="w-full bg-white border border-[#0A0A0B]/20 p-2.5 text-xs focus:outline-none focus:border-[#0A0A0B]"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full py-2.5 bg-[#0A0A0B] text-[#F1EBDD] text-xs font-semibold uppercase tracking-wider hover:bg-[#2A2B2E] transition-colors flex items-center justify-center gap-1.5"
            >
              <Search size={14} />
              <span>SEARCH</span>
            </button>
          </div>
        </form>
      </div>

      {/* Found Order Card */}
      {foundOrder ? (
        <div className="bg-white/90 border border-[#0A0A0B]/15 p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#0A0A0B]/10 pb-4 gap-2">
            <div>
              <span className="text-xs font-mono font-bold text-base block">
                {foundOrder.orderNumber}
              </span>
              <span className="text-[11px] text-neutral-500">
                Tracking Code: {foundOrder.trackingNumber}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-[#0E1626] text-[#F1EBDD] text-xs font-mono uppercase">
                STATUS: {foundOrder.status}
              </span>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="py-4">
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[#0A0A0B] text-[#F1EBDD] flex items-center justify-center font-bold">
                  ✓
                </div>
                <span className="mt-2 text-[11px] font-medium">Order Confirmed</span>
                <span className="text-[10px] text-neutral-400 font-mono">Paris Atelier</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[#0A0A0B] text-[#F1EBDD] flex items-center justify-center font-bold">
                  ✓
                </div>
                <span className="mt-2 text-[11px] font-medium">Inspected & Boxed</span>
                <span className="text-[10px] text-neutral-400 font-mono">Quality Control</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[#0E1626] text-white flex items-center justify-center font-bold ring-2 ring-neutral-400">
                  <Truck size={14} />
                </div>
                <span className="mt-2 text-[11px] font-medium text-emerald-900 font-bold">In Transit</span>
                <span className="text-[10px] text-neutral-400 font-mono">Express Courier</span>
              </div>

              <div className="flex flex-col items-center opacity-40">
                <div className="w-8 h-8 rounded-full bg-neutral-200 text-neutral-600 flex items-center justify-center">
                  4
                </div>
                <span className="mt-2 text-[11px] font-medium">Delivered</span>
                <span className="text-[10px] text-neutral-400 font-mono">Signature</span>
              </div>
            </div>
          </div>

          {/* Estimated Arrival Details */}
          <div className="p-4 bg-[#0A0A0B]/5 border border-[#0A0A0B]/10 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="font-mono text-[10px] text-neutral-500 uppercase block">
                PROJECTED ARRIVAL
              </span>
              <p className="font-semibold text-sm">{foundOrder.estimatedDelivery}</p>
            </div>
            <div className="text-neutral-600">
              <span>Carrier: <strong>DHL Express Worldwide / Paris Hub</strong></span>
            </div>
          </div>

          {/* Items */}
          <div className="border-t border-[#0A0A0B]/10 pt-4">
            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block mb-3">
              PARCEL CONTENTS
            </span>
            <div className="space-y-2">
              {foundOrder.items.map((item: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1">
                  <span>{item.product.name} ({item.color}, Size {item.size}) × {item.quantity}</span>
                  <span className="font-mono font-medium">{formatPrice(item.priceEur * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : searched ? (
        <div className="p-8 text-center bg-white/60 border border-[#0A0A0B]/10 text-xs">
          <AlertCircle size={28} className="mx-auto text-amber-800 mb-2" />
          <p className="font-semibold text-neutral-800">
            No order found matching "{orderQuery}".
          </p>
          <p className="text-neutral-500 mt-1">
            Please verify the order number on your confirmation email or contact our Paris concierge.
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default OrderTrackingPage;
