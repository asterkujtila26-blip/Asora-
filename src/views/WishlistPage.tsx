import React from 'react';
import { useStore } from '../context/StoreContext';
import { AsoraEmblem } from '../components/brand/AsoraEmblem';
import { Heart, Trash2, ArrowRight } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const {
    wishlist,
    products,
    toggleWishlist,
    openProductDetail,
    addToCart,
    formatPrice,
    setCurrentPage,
  } = useStore();

  const savedProducts = products.filter((p) =>
    wishlist.some((w) => w.productId === p.id)
  );

  return (
    <div className="w-full bg-[#F1EBDD] text-[#0A0A0B] py-12 sm:py-20 px-4 sm:px-10 max-w-7xl mx-auto">
      <div className="border-b border-[#0A0A0B]/10 pb-6 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-neutral-500 block mb-1">
            CLIENT CURATION
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl font-light text-[#0A0A0B]">
            Saved Pieces ({savedProducts.length})
          </h1>
        </div>
        <button
          onClick={() => setCurrentPage('shop')}
          className="text-xs font-mono uppercase tracking-wider text-neutral-600 hover:text-black flex items-center gap-1.5"
        >
          <span>CONTINUE BROWSING</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {savedProducts.length === 0 ? (
        <div className="py-20 text-center max-w-md mx-auto bg-white/40 border border-[#0A0A0B]/10 p-10">
          <Heart size={36} className="mx-auto text-neutral-400 mb-4 stroke-1" />
          <h3 className="font-editorial text-2xl text-[#0A0A0B] mb-2 font-light">
            YOUR WISHLIST IS EMPTY.
          </h3>
          <p className="text-xs text-neutral-600 mb-6 leading-relaxed">
            Keep track of considered pieces from Volume 01 as you explore the collection.
          </p>
          <button
            onClick={() => setCurrentPage('shop')}
            className="px-6 py-3 bg-[#0A0A0B] text-[#F1EBDD] text-xs uppercase tracking-widest font-semibold hover:bg-[#2A2B2E]"
          >
            DISCOVER THE COLLECTION
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white/60 border border-[#0A0A0B]/10 p-4 flex flex-col justify-between"
            >
              <div>
                <div
                  className="aspect-[3/4] bg-[#0A0A0B]/5 overflow-hidden cursor-pointer mb-4"
                  onClick={() => openProductDetail(product.id)}
                >
                  <img
                    src={product.heroImage}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                  {product.primaryColor}
                </span>
                <h3
                  onClick={() => openProductDetail(product.id)}
                  className="text-sm font-semibold tracking-wide text-[#0A0A0B] mt-1 hover:underline cursor-pointer"
                >
                  {product.name}
                </h3>
                <p className="text-xs font-mono font-medium mt-1">
                  {formatPrice(product.priceEur)}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#0A0A0B]/10 flex items-center justify-between gap-2">
                <button
                  onClick={() => addToCart(product, product.primaryColor, product.availableSizes[1] || 'M')}
                  className="flex-1 py-2 bg-[#0A0A0B] text-[#F1EBDD] text-[11px] uppercase tracking-wider font-medium hover:bg-[#2A2B2E]"
                >
                  + ADD TO BAG (M)
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="p-2 text-neutral-400 hover:text-red-700 transition-colors"
                  title="Remove from saved"
                  aria-label="Remove from saved pieces"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
