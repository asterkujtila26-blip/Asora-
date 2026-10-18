import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { AsoraEmblem } from '../components/brand/AsoraEmblem';
import { AsoraWordmark } from '../components/brand/AsoraWordmark';
import {
  User,
  Package,
  MapPin,
  Heart,
  Sliders,
  Check,
  ArrowRight,
  LogOut,
  Mail,
} from 'lucide-react';

export const AccountPage: React.FC = () => {
  const {
    userAccount,
    updateUserAccount,
    orders,
    wishlist,
    products,
    setCurrentPage,
    formatPrice,
    openProductDetail,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses' | 'preferences'>('orders');

  const [profileForm, setProfileForm] = useState({
    name: userAccount.name || 'Aster Kujtila',
    email: userAccount.email || 'client@asora-paris.com',
    phone: userAccount.phone || '+33 6 42 18 90 22',
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserAccount(profileForm);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const wishlistProducts = products.filter((p) =>
    wishlist.some((w) => w.productId === p.id)
  );

  return (
    <div className="w-full bg-[#F1EBDD] text-[#0A0A0B] py-10 sm:py-16 px-4 sm:px-10 max-w-7xl mx-auto">
      {/* Account Header */}
      <div className="border-b border-[#0A0A0B]/10 pb-8 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-neutral-500 block mb-1">
            CLIENT PORTAL
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl font-light text-[#0A0A0B]">
            YOUR ASORA
          </h1>
          <p className="text-xs text-neutral-600 mt-1">
            Managing client identity, order tracking archives, and Paris deliveries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentPage('order-tracking')}
            className="px-4 py-2 border border-[#0A0A0B]/20 text-xs font-mono uppercase hover:border-[#0A0A0B] transition-colors"
          >
            LIVE TRACKING LOOKUP
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 bg-white/60 border border-[#0A0A0B]/10 p-4 space-y-1 text-xs">
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full py-2.5 px-3 text-left font-medium flex items-center justify-between transition-colors ${
              activeTab === 'orders'
                ? 'bg-[#0A0A0B] text-[#F1EBDD]'
                : 'text-[#0A0A0B] hover:bg-[#0A0A0B]/5'
            }`}
          >
            <span className="flex items-center gap-2">
              <Package size={14} />
              <span>Order Archives</span>
            </span>
            <span className="font-mono text-[10px] opacity-75">{orders.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full py-2.5 px-3 text-left font-medium flex items-center gap-2 transition-colors ${
              activeTab === 'profile'
                ? 'bg-[#0A0A0B] text-[#F1EBDD]'
                : 'text-[#0A0A0B] hover:bg-[#0A0A0B]/5'
            }`}
          >
            <User size={14} />
            <span>Client Identity</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`w-full py-2.5 px-3 text-left font-medium flex items-center gap-2 transition-colors ${
              activeTab === 'addresses'
                ? 'bg-[#0A0A0B] text-[#F1EBDD]'
                : 'text-[#0A0A0B] hover:bg-[#0A0A0B]/5'
            }`}
          >
            <MapPin size={14} />
            <span>Saved Addresses</span>
          </button>

          <button
            onClick={() => setActiveTab('preferences')}
            className={`w-full py-2.5 px-3 text-left font-medium flex items-center gap-2 transition-colors ${
              activeTab === 'preferences'
                ? 'bg-[#0A0A0B] text-[#F1EBDD]'
                : 'text-[#0A0A0B] hover:bg-[#0A0A0B]/5'
            }`}
          >
            <Mail size={14} />
            <span>Private Communications</span>
          </button>

          <div className="pt-4 border-t border-[#0A0A0B]/10">
            <button
              onClick={() => setCurrentPage('wishlist')}
              className="w-full py-2.5 px-3 text-left font-medium flex items-center justify-between text-[#0A0A0B] hover:bg-[#0A0A0B]/5"
            >
              <span className="flex items-center gap-2">
                <Heart size={14} />
                <span>Saved Pieces</span>
              </span>
              <span className="font-mono text-[10px] opacity-75">{wishlist.length}</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9 bg-white/70 border border-[#0A0A0B]/10 p-6 sm:p-8">
          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h2 className="text-sm font-semibold font-mono tracking-[0.25em] uppercase text-neutral-600 border-b border-[#0A0A0B]/10 pb-3">
                ORDER ARCHIVE ({orders.length})
              </h2>

              {orders.length === 0 ? (
                <div className="py-12 text-center text-xs text-neutral-500">
                  <p>You have no prior orders recorded in this session.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="border border-[#0A0A0B]/15 bg-white p-5 space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#0A0A0B]/10 pb-3 text-xs">
                        <div>
                          <span className="font-mono font-bold text-sm block">
                            {ord.orderNumber}
                          </span>
                          <span className="text-[11px] text-neutral-500">
                            Placed on {new Date(ord.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-1 bg-[#0A0A0B] text-[#F1EBDD] text-[10px] font-mono uppercase">
                            {ord.status}
                          </span>
                          <span className="font-mono font-semibold text-sm">
                            {formatPrice(ord.totalEur)}
                          </span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="divide-y divide-[#0A0A0B]/5">
                        {ord.items.map((item, idx) => (
                          <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.product.heroImage}
                                alt={item.product.name}
                                className="w-10 h-12 object-cover bg-neutral-200"
                                referrerPolicy="no-referrer"
                              />
                              <div>
                                <h4 className="font-medium">{item.product.name}</h4>
                                <p className="text-[11px] text-neutral-500">
                                  {item.color} · Size {item.size} · Qty {item.quantity}
                                </p>
                              </div>
                            </div>
                            <span className="font-mono">{formatPrice(item.priceEur * item.quantity)}</span>
                          </div>
                        ))}
                      </div>

                      {/* Courier Tracking Status */}
                      <div className="bg-[#0A0A0B]/5 p-3 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] font-mono gap-2">
                        <span>TRACKING: {ord.trackingNumber}</span>
                        <span>EST. DELIVERY: {ord.estimatedDelivery}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-sm font-semibold font-mono tracking-[0.25em] uppercase text-neutral-600 border-b border-[#0A0A0B]/10 pb-3">
                CLIENT IDENTITY
              </h2>

              <form onSubmit={handleProfileSubmit} className="space-y-4 max-w-md">
                <div>
                  <label className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block mb-1">
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full bg-white border border-[#0A0A0B]/20 p-2.5 text-xs focus:outline-none focus:border-[#0A0A0B]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block mb-1">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full bg-white border border-[#0A0A0B]/20 p-2.5 text-xs focus:outline-none focus:border-[#0A0A0B]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block mb-1">
                    PHONE
                  </label>
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full bg-white border border-[#0A0A0B]/20 p-2.5 text-xs focus:outline-none focus:border-[#0A0A0B]"
                  />
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#0A0A0B] text-[#F1EBDD] text-xs uppercase tracking-widest font-semibold hover:bg-[#2A2B2E]"
                  >
                    SAVE CHANGES
                  </button>
                  {savedSuccess && (
                    <span className="text-xs text-emerald-800 flex items-center gap-1">
                      <Check size={14} />
                      <span>Updated</span>
                    </span>
                  )}
                </div>
              </form>
            </div>
          )}

          {/* ADDRESSES TAB */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <h2 className="text-sm font-semibold font-mono tracking-[0.25em] uppercase text-neutral-600 border-b border-[#0A0A0B]/10 pb-3">
                DEFAULT DELIVERY DESTINATION
              </h2>

              <div className="border border-[#0A0A0B]/20 p-5 bg-white max-w-md text-xs space-y-1">
                <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block mb-2">
                  PRIMARY RESIDENCE
                </span>
                <p className="font-semibold">{profileForm.name}</p>
                <p>8 Rue de la Paix, Apt 4B</p>
                <p>75002 Paris, France</p>
                <p className="text-neutral-500 pt-2 font-mono">Courier phone: {profileForm.phone}</p>
              </div>
            </div>
          )}

          {/* PREFERENCES TAB */}
          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <h2 className="text-sm font-semibold font-mono tracking-[0.25em] uppercase text-neutral-600 border-b border-[#0A0A0B]/10 pb-3">
                COMMUNICATION DISPATCH
              </h2>

              <div className="space-y-3 text-xs max-w-lg">
                <label className="flex items-center gap-3 cursor-pointer p-3 border border-[#0A0A0B]/10 bg-white">
                  <input type="checkbox" defaultChecked className="accent-[#0A0A0B]" />
                  <span>The Private List: Invitations to future releases & studio volumes</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer p-3 border border-[#0A0A0B]/10 bg-white">
                  <input type="checkbox" defaultChecked className="accent-[#0A0A0B]" />
                  <span>Fulfillment SMS & Courier Dispatch Notifications</span>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
