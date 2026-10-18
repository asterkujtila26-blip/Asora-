import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductColor, ProductSize } from '../types/store';
import { Heart, Sliders, Check } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const {
    products,
    openProductDetail,
    formatPrice,
    toggleWishlist,
    isInWishlist,
    addToCart,
  } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedColor, setSelectedColor] = useState<ProductColor | 'All'>('All');
  const [selectedSize, setSelectedSize] = useState<ProductSize | 'All'>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [showFilters, setShowFilters] = useState(false);

  // Available categories
  const categories = ['All', 'Hoodies & Sweatshirts', 'T-Shirts & Tops', 'Jackets & Outerwear', 'Pants & Bottoms'];
  const colors: (ProductColor | 'All')[] = ['All', 'Obsidian Black', 'Deep Navy', 'Charcoal', 'Stone Grey', 'Warm Ivory'];
  const sizes: (ProductSize | 'All')[] = ['All', 'XS', 'S', 'M', 'L', 'XL'];

  // Filtering
  const filteredProducts = products.filter((product) => {
    if (selectedCategory !== 'All' && product.category !== selectedCategory) return false;
    if (selectedColor !== 'All' && !product.availableColors.includes(selectedColor as ProductColor)) return false;
    if (selectedSize !== 'All' && !product.availableSizes.includes(selectedSize as ProductSize)) return false;
    return true;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.priceEur - b.priceEur;
    if (sortBy === 'price-desc') return b.priceEur - a.priceEur;
    return a.featured ? -1 : 1;
  });

  return (
    <div className="w-full bg-[#F1EBDD] text-[#0A0A0B] py-10 sm:py-16 px-4 sm:px-10 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="border-b border-[#0A0A0B]/10 pb-8 mb-10 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-500 mb-2">
          <span>VOLUME 01</span>
          <span>·</span>
          <span>PARIS</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-6xl font-light text-[#0A0A0B]">
          The Essentials
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl mt-3 leading-relaxed">
          Unisex street-luxury garments engineered with architectural silhouettes, heavyweight French loopback terry,
          and discrete satin-stitch branding.
        </p>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#0A0A0B]/10 mb-8">
        {/* Category Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#0A0A0B] text-[#F1EBDD] font-medium'
                  : 'bg-white/60 text-[#0A0A0B] border border-[#0A0A0B]/10 hover:border-[#0A0A0B]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filter Toggle & Sort */}
        <div className="flex items-center gap-4 self-end sm:self-auto text-xs">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-[#0A0A0B]/20 hover:border-[#0A0A0B] transition-colors"
          >
            <Sliders size={13} />
            <span className="text-[11px] tracking-wider uppercase">
              {showFilters ? 'HIDE FILTERS' : 'REFINE'}
            </span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase text-neutral-500">SORT</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white/80 border border-[#0A0A0B]/20 px-2.5 py-1 text-xs focus:outline-none"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Expanded Filter Panel */}
      {showFilters && (
        <div className="bg-white/70 border border-[#0A0A0B]/10 p-6 mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
          {/* Color Filter */}
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block mb-2">
              COLOUR
            </span>
            <div className="flex flex-wrap gap-2">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={`px-2.5 py-1 text-[11px] border transition-colors ${
                    selectedColor === c
                      ? 'border-[#0A0A0B] bg-[#0A0A0B] text-[#F1EBDD]'
                      : 'border-[#0A0A0B]/20 bg-white/50 text-[#0A0A0B]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block mb-2">
              SIZE
            </span>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`px-3 py-1 text-[11px] font-mono border transition-colors ${
                    selectedSize === s
                      ? 'border-[#0A0A0B] bg-[#0A0A0B] text-[#F1EBDD]'
                      : 'border-[#0A0A0B]/20 bg-white/50 text-[#0A0A0B]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filter Count & Reset */}
          <div className="flex flex-col justify-end">
            <div className="text-xs text-neutral-600 mb-2 font-mono">
              Showing {sortedProducts.length} of {products.length} garments
            </div>
            {(selectedCategory !== 'All' || selectedColor !== 'All' || selectedSize !== 'All') && (
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedColor('All');
                  setSelectedSize('All');
                }}
                className="text-[11px] text-[#0A0A0B] underline text-left hover:opacity-70 uppercase tracking-wider"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>
      )}

      {/* Product Grid: 2 columns on mobile, 3 columns on tablet/desktop */}
      {sortedProducts.length === 0 ? (
        <div className="text-center py-20 bg-white/40 border border-[#0A0A0B]/10">
          <p className="text-sm font-medium text-neutral-600 mb-3">
            No garments match your selected filter criteria.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedColor('All');
              setSelectedSize('All');
            }}
            className="px-6 py-2.5 bg-[#0A0A0B] text-[#F1EBDD] text-xs tracking-widest uppercase"
          >
            RESET FILTERS
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
          {sortedProducts.map((product) => {
            const inWishlist = isInWishlist(product.id);
            return (
              <div
                key={product.id}
                className="group flex flex-col bg-[#F1EBDD] border border-[#0A0A0B]/10 hover:border-[#0A0A0B]/40 transition-colors relative"
              >
                {/* Wishlist toggle */}
                <button
                  onClick={() => toggleWishlist(product.id, product.primaryColor)}
                  className="absolute top-2.5 right-2.5 z-10 p-1.5 sm:p-2 bg-[#F1EBDD]/90 backdrop-blur-sm rounded-full text-[#0A0A0B] hover:scale-110 transition-all"
                  aria-label={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
                >
                  <Heart
                    size={14}
                    className={inWishlist ? 'fill-[#4A0E17] text-[#4A0E17]' : 'text-[#0A0A0B]'}
                  />
                </button>

                {/* Draft Marker badge if draft */}
                {product.isDraft && (
                  <span className="absolute top-2.5 left-2.5 z-10 text-[9px] font-mono tracking-widest uppercase bg-[#0A0A0B] text-[#F1EBDD] px-2 py-0.5">
                    SAMPLE PREVIEW
                  </span>
                )}

                {/* Image */}
                <div
                  className="relative aspect-[3/4] bg-[#0A0A0B]/5 overflow-hidden cursor-pointer"
                  onClick={() => openProductDetail(product.id)}
                >
                  <img
                    src={product.heroImage}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Desktop Quick-Add strip */}
                  <div className="absolute inset-x-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, product.primaryColor, product.availableSizes[1] || 'M');
                      }}
                      className="w-full py-2 bg-[#0A0A0B] text-[#F1EBDD] text-[10px] tracking-[0.2em] uppercase font-medium hover:bg-[#2A2B2E] transition-colors"
                    >
                      + ADD (SIZE {product.availableSizes[1] || 'M'})
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-[9px] sm:text-[10px] tracking-wider uppercase text-neutral-500 font-mono block">
                      {product.primaryColor}
                    </span>
                    <h2
                      onClick={() => openProductDetail(product.id)}
                      className="text-xs sm:text-sm font-semibold tracking-wide text-[#0A0A0B] mt-0.5 cursor-pointer hover:underline line-clamp-1"
                    >
                      {product.name}
                    </h2>
                    <p className="text-[11px] text-neutral-600 mt-1 line-clamp-1 hidden sm:block">
                      {product.shortDescription}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#0A0A0B]/10 flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-mono font-medium text-[#0A0A0B]">
                      {formatPrice(product.priceEur)}
                    </span>
                    <button
                      onClick={() => openProductDetail(product.id)}
                      className="text-[10px] sm:text-[11px] tracking-wider uppercase text-neutral-600 hover:text-black font-medium"
                    >
                      VIEW
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ShopPage;
