import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { AsoraWordmark } from '../brand/AsoraWordmark';
import { AsoraEmblem } from '../brand/AsoraEmblem';
import { Search, ShoppingBag, User, Menu, X, Heart, SlidersHorizontal } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    cartCount,
    setIsBagDrawerOpen,
    setIsSearchOpen,
    wishlist,
    settings,
    currency,
    setCurrency,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'shop', label: 'SHOP', page: 'shop' as const },
    { id: 'collection', label: 'COLLECTION', page: 'campaign' as const },
    { id: 'symbol', label: 'THE SYMBOL', page: 'the-symbol' as const },
    { id: 'journal', label: 'JOURNAL', page: 'journal' as const },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-colors duration-200">
      {/* Announcement Bar */}
      <div className="bg-[#0A0A0B] text-[#F1EBDD] py-2 px-4 text-center text-[10px] sm:text-xs tracking-[0.25em] uppercase font-sans border-b border-[#2A2B2E]/40 flex items-center justify-between">
        <div className="hidden md:flex items-center gap-3 text-[11px] opacity-75">
          <span>PARIS EST. 2026</span>
          <span>·</span>
          <span>VOLUME 01</span>
        </div>

        <div className="mx-auto flex items-center gap-2">
          <span>{settings.announcementText}</span>
        </div>

        {/* Currency Switcher & Admin trigger */}
        <div className="flex items-center gap-3">
          <div className="flex items-center text-[10px] tracking-wider gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
            <button
              onClick={() => setCurrency('EUR')}
              className={`hover:text-white transition-colors ${currency === 'EUR' ? 'font-bold text-white underline underline-offset-4' : 'text-[#B9B6AE]'}`}
            >
              EUR
            </button>
            <span>/</span>
            <button
              onClick={() => setCurrency('USD')}
              className={`hover:text-white transition-colors ${currency === 'USD' ? 'font-bold text-white underline underline-offset-4' : 'text-[#B9B6AE]'}`}
            >
              USD
            </button>
            <span>/</span>
            <button
              onClick={() => setCurrency('GBP')}
              className={`hover:text-white transition-colors ${currency === 'GBP' ? 'font-bold text-white underline underline-offset-4' : 'text-[#B9B6AE]'}`}
            >
              GBP
            </button>
          </div>

          <button
            onClick={() => setCurrentPage('admin')}
            title="Store Operations & Launch Checklist"
            className="p-1 text-[#B9B6AE] hover:text-[#F1EBDD] transition-colors"
            aria-label="Open Store Management & Launch Checklist"
          >
            <SlidersHorizontal size={13} />
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-[#F1EBDD]/90 backdrop-blur-md border-b border-[#0A0A0B]/10 px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Mobile Left: Menu Toggle */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-[#0A0A0B] hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0A0A0B]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Desktop Left: Navigation links */}
          <div className="hidden md:flex items-center gap-8 flex-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setCurrentPage(link.page)}
                className={`text-xs tracking-[0.25em] font-medium transition-all hover:text-[#0A0A0B] relative py-1 ${
                  currentPage === link.page
                    ? 'text-[#0A0A0B] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-[#0A0A0B]'
                    : 'text-[#0A0A0B]/70'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Centre: Authentic ASORA Wordmark */}
          <div className="flex justify-center items-center cursor-pointer py-1" onClick={() => setCurrentPage('home')}>
            <AsoraWordmark size="md" color="#0A0A0B" showDescriptor={true} />
          </div>

          {/* Right: Search, Wishlist, Account, Bag */}
          <div className="flex items-center justify-end gap-3 sm:gap-6 flex-1 text-[#0A0A0B]">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hover:opacity-65 transition-opacity flex items-center gap-1.5 text-xs tracking-wider"
              aria-label="Search collection"
            >
              <Search size={17} />
              <span className="hidden lg:inline text-[11px] tracking-[0.2em]">SEARCH</span>
            </button>

            <button
              onClick={() => setCurrentPage('wishlist')}
              className="p-2 hover:opacity-65 transition-opacity relative"
              aria-label="View Wishlist"
            >
              <Heart size={17} className={wishlist.length > 0 ? 'fill-[#4A0E17] text-[#4A0E17]' : ''} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 text-[9px] font-mono leading-none bg-[#0A0A0B] text-[#F1EBDD] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setCurrentPage('account')}
              className="hidden sm:flex items-center gap-1.5 p-2 hover:opacity-65 transition-opacity text-xs tracking-wider"
              aria-label="Your ASORA Account"
            >
              <User size={17} />
              <span className="hidden lg:inline text-[11px] tracking-[0.2em]">ACCOUNT</span>
            </button>

            <button
              onClick={() => setIsBagDrawerOpen(true)}
              className="p-2 hover:opacity-65 transition-opacity flex items-center gap-2"
              aria-label={`Open ASORA bag, ${cartCount} items`}
            >
              <div className="relative">
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 text-[9px] font-mono font-medium leading-none bg-[#0A0A0B] text-[#F1EBDD] w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-[11px] tracking-[0.2em] hidden sm:inline font-medium">
                BAG ({cartCount})
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-4 border-t border-[#0A0A0B]/10 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-4 px-2 pb-4">
              <button
                onClick={() => {
                  setCurrentPage('shop');
                  setMobileMenuOpen(false);
                }}
                className="text-left text-sm tracking-[0.2em] font-medium py-1.5 border-b border-[#0A0A0B]/5"
              >
                SHOP VOLUME 01
              </button>
              <button
                onClick={() => {
                  setCurrentPage('campaign');
                  setMobileMenuOpen(false);
                }}
                className="text-left text-sm tracking-[0.2em] font-medium py-1.5 border-b border-[#0A0A0B]/5"
              >
                CAMPAIGN
              </button>
              <button
                onClick={() => {
                  setCurrentPage('the-symbol');
                  setMobileMenuOpen(false);
                }}
                className="text-left text-sm tracking-[0.2em] font-medium py-1.5 border-b border-[#0A0A0B]/5"
              >
                THE SYMBOL
              </button>
              <button
                onClick={() => {
                  setCurrentPage('about');
                  setMobileMenuOpen(false);
                }}
                className="text-left text-sm tracking-[0.2em] font-medium py-1.5 border-b border-[#0A0A0B]/5"
              >
                MANIFESTO
              </button>
              <button
                onClick={() => {
                  setCurrentPage('journal');
                  setMobileMenuOpen(false);
                }}
                className="text-left text-sm tracking-[0.2em] font-medium py-1.5 border-b border-[#0A0A0B]/5"
              >
                JOURNAL
              </button>
              <button
                onClick={() => {
                  setCurrentPage('account');
                  setMobileMenuOpen(false);
                }}
                className="text-left text-sm tracking-[0.2em] font-medium py-1.5 border-b border-[#0A0A0B]/5"
              >
                YOUR ASORA ACCOUNT
              </button>
              <button
                onClick={() => {
                  setCurrentPage('size-guide');
                  setMobileMenuOpen(false);
                }}
                className="text-left text-sm tracking-[0.2em] font-medium py-1.5 text-neutral-600"
              >
                SIZE GUIDE
              </button>

              <div className="pt-2 flex items-center justify-between text-xs text-neutral-500">
                <span className="tracking-widest">CURRENCY</span>
                <div className="flex gap-2 font-mono">
                  {(['EUR', 'USD', 'GBP'] as const).map((curr) => (
                    <button
                      key={curr}
                      onClick={() => setCurrency(curr)}
                      className={`px-2 py-0.5 ${currency === curr ? 'bg-[#0A0A0B] text-[#F1EBDD]' : 'bg-[#0A0A0B]/5 text-[#0A0A0B]'}`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
