import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductColor, ProductSize } from '../types/store';
import { AsoraEmblem } from '../components/brand/AsoraEmblem';
import {
  Heart,
  ChevronDown,
  ChevronUp,
  Ruler,
  Truck,
  RotateCcw,
  Sparkles,
  Columns,
  Eye,
  Type,
  Palette,
  Check,
  Sliders,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import { AiDescriptionPreviewBar } from '../components/product/AiDescriptionPreviewBar';
import { AiBrandAuditor } from '../components/product/AiBrandAuditor';

export const ProductDetailPage: React.FC = () => {
  const {
    activeProduct,
    addToCart,
    formatPrice,
    toggleWishlist,
    isInWishlist,
    setSizeFinder,
    setCurrentPage,
    isAiPreviewActive,
    setIsAiPreviewActive,
    toggleAiPreview,
    previewMode,
    setPreviewMode,
    templateFontStyle,
    setTemplateFontStyle,
    templateFontSize,
    setTemplateFontSize,
    templateColorSurface,
    setTemplateColorSurface,
    templateLineHeight,
    setTemplateLineHeight,
  } = useStore();

  const product = activeProduct;

  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product?.primaryColor || 'Obsidian Black'
  );
  const [selectedSize, setSelectedSize] = useState<ProductSize>(
    product?.availableSizes[1] || 'M'
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAuditorOpen, setIsAuditorOpen] = useState(false);

  // Accordion state
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    fit: true,
    fabric: true,
    branding: false,
    care: false,
    shipping: false,
    returns: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  if (!product) {
    return (
      <div className="py-24 text-center max-w-lg mx-auto">
        <p className="text-sm">Product not found.</p>
        <button
          onClick={() => setCurrentPage('shop')}
          className="mt-4 px-6 py-2 bg-[#0A0A0B] text-[#F1EBDD] text-xs uppercase"
        >
          Return to Collection
        </button>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const currentImages = product.galleryImages || [{ url: product.heroImage, caption: 'Front view', viewType: 'front' }];

  const aiDraft = product.aiCopyDraft;
  const isPreviewingAi = isAiPreviewActive && !!aiDraft;

  const currentSubtitle = isPreviewingAi ? aiDraft.subtitle : product.subtitle;
  const currentDescription = isPreviewingAi ? aiDraft.description : (product.originalDescription || product.description);
  const currentFit = isPreviewingAi ? (aiDraft.fitNotes || product.fit) : product.fit;
  const currentConstruction = isPreviewingAi && aiDraft.constructionHighlights && aiDraft.constructionHighlights.length > 0
    ? aiDraft.constructionHighlights
    : product.constructionDetails;
  const currentCare = isPreviewingAi && aiDraft.careNote
    ? [aiDraft.careNote, ...product.careInstructions.slice(1)]
    : product.careInstructions;

  // Compute live typography styles based on template customizer selections
  const getSubtitleFontClass = () => {
    if (!isPreviewingAi) return 'font-editorial italic text-neutral-700';
    switch (templateFontStyle) {
      case 'serif-italic':
        return 'font-editorial italic font-medium';
      case 'serif-regular':
        return 'font-editorial uppercase tracking-wider text-xs font-semibold';
      case 'clean-sans':
        return 'font-sans uppercase tracking-[0.2em] text-xs font-medium';
      case 'hybrid':
      default:
        return 'font-editorial italic';
    }
  };

  const getDescriptionFontClass = () => {
    if (!isPreviewingAi) return 'font-sans text-neutral-800';
    switch (templateFontStyle) {
      case 'serif-italic':
        return 'font-editorial italic';
      case 'serif-regular':
        return 'font-editorial';
      case 'clean-sans':
        return 'font-sans';
      case 'hybrid':
      default:
        return 'font-sans';
    }
  };

  const getFontSizeClass = () => {
    if (!isPreviewingAi) return 'text-xs sm:text-sm';
    switch (templateFontSize) {
      case 'compact':
        return 'text-[13px]';
      case 'generous':
        return 'text-sm sm:text-base';
      case 'standard':
      default:
        return 'text-xs sm:text-sm';
    }
  };

  const getLineHeightClass = () => {
    if (!isPreviewingAi) return 'leading-relaxed';
    switch (templateLineHeight) {
      case 'compact':
        return 'leading-snug';
      case 'relaxed':
        return 'leading-[1.85]';
      case 'balanced':
      default:
        return 'leading-relaxed';
    }
  };

  const isDarkSurface = isPreviewingAi && (templateColorSurface === 'black' || templateColorSurface === 'navy' || templateColorSurface === 'burgundy');

  const getSurfaceStyles = () => {
    if (!isPreviewingAi || templateColorSurface === 'ivory') {
      return {
        containerClass: 'bg-transparent text-[#0A0A0B]',
        subtitleClass: 'text-neutral-700',
        textClass: 'text-neutral-800',
      };
    }
    if (templateColorSurface === 'black') {
      return {
        containerClass: 'bg-[#0A0A0B] text-[#F1EBDD] p-5 sm:p-6 border border-white/10 shadow-lg my-4',
        subtitleClass: 'text-[#B9B6AE]',
        textClass: 'text-[#F1EBDD]/90',
      };
    }
    if (templateColorSurface === 'navy') {
      return {
        containerClass: 'bg-[#0E1626] text-[#F1EBDD] p-5 sm:p-6 border border-white/10 shadow-lg my-4',
        subtitleClass: 'text-[#B9B6AE]',
        textClass: 'text-[#F1EBDD]/90',
      };
    }
    if (templateColorSurface === 'burgundy') {
      return {
        containerClass: 'bg-[#4A0E17] text-[#F1EBDD] p-5 sm:p-6 border border-white/10 shadow-lg my-4',
        subtitleClass: 'text-[#F1EBDD]/80',
        textClass: 'text-[#F1EBDD]/95',
      };
    }
    // Travertine
    return {
      containerClass: 'bg-[#FAF8F5] text-[#0A0A0B] p-5 sm:p-6 border border-[#0A0A0B]/15 shadow-sm my-4',
      subtitleClass: 'text-neutral-600',
      textClass: 'text-neutral-800',
    };
  };

  const surfaceStyle = getSurfaceStyles();

  const handleAddToBag = () => {
    addToCart(product, selectedColor, selectedSize, 1);
  };

  return (
    <div className="w-full bg-[#F1EBDD] text-[#0A0A0B] py-8 sm:py-14 px-4 sm:px-10 max-w-7xl mx-auto relative pb-28">
      {/* Breadcrumb Navigation & Top Live Preview Status */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-neutral-500">
          <button onClick={() => setCurrentPage('home')} className="hover:text-black">
            HOME
          </button>
          <span>/</span>
          <button onClick={() => setCurrentPage('shop')} className="hover:text-black">
            VOLUME 01
          </button>
          <span>/</span>
          <span className="text-[#0A0A0B] font-medium truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* Quick Top Live Preview Toggle & Brand Auditor Trigger */}
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 p-1 bg-white/80 border border-[#0A0A0B]/15 rounded shadow-2xs text-[10px] font-mono">
            <span className="text-neutral-500 px-1 font-semibold uppercase">TEMPLATE COPY:</span>
            <button
              onClick={() => setIsAiPreviewActive(false)}
              className={`px-2.5 py-1 transition-all ${
                !isAiPreviewActive
                  ? 'bg-[#0A0A0B] text-[#F1EBDD] font-bold shadow-2xs'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              ORIGINAL
            </button>
            <button
              onClick={() => setIsAiPreviewActive(true)}
              className={`px-2.5 py-1 transition-all flex items-center gap-1 ${
                isAiPreviewActive
                  ? 'bg-[#4A0E17] text-[#F1EBDD] font-bold shadow-2xs'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              <Sparkles size={11} className="text-amber-300" />
              <span>AI PREVIEW</span>
            </button>
          </div>

          <button
            onClick={() => setIsAuditorOpen(!isAuditorOpen)}
            className={`p-1.5 sm:px-3 sm:py-1 border text-[10px] font-mono uppercase transition-colors flex items-center gap-1.5 shadow-2xs ${
              isAuditorOpen
                ? 'bg-[#4A0E17] text-[#F1EBDD] border-[#4A0E17] font-bold'
                : 'bg-white/80 border-[#0A0A0B]/15 text-[#4A0E17] hover:border-[#4A0E17]'
            }`}
            title="Open AI Brand Auditor against ASORA Manifesto"
          >
            <ShieldAlert size={12} className={isAuditorOpen ? 'text-amber-300' : 'text-[#4A0E17]'} />
            <span className="hidden sm:inline">AI BRAND AUDITOR</span>
          </button>
        </div>
      </div>

      {/* Prominent Expandable AI Brand Auditor Banner if opened */}
      {isAuditorOpen && (
        <div className="mb-8 animate-in fade-in duration-200">
          <AiBrandAuditor
            product={product}
            isOpen={isAuditorOpen}
            onClose={() => setIsAuditorOpen(false)}
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
        {/* LEFT COLUMN: PRODUCT GALLERY */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Main Active Image Display */}
          <div className="relative aspect-[3/4] bg-[#0A0A0B]/5 border border-[#0A0A0B]/10 overflow-hidden">
            <img
              src={currentImages[activeImageIndex]?.url || product.heroImage}
              alt={`${product.name} - ${currentImages[activeImageIndex]?.caption || 'View'}`}
              className="w-full h-full object-cover transition-all duration-300"
              referrerPolicy="no-referrer"
            />

            {/* View Type Watermark */}
            <div className="absolute bottom-4 left-4 bg-[#0A0A0B]/70 backdrop-blur-sm text-[#F1EBDD] px-3 py-1 text-[10px] font-mono tracking-widest uppercase">
              {currentImages[activeImageIndex]?.viewType.toUpperCase()} VIEW · {activeImageIndex + 1}/{currentImages.length}
            </div>

            {/* Wishlist toggle */}
            <button
              onClick={() => toggleWishlist(product.id, selectedColor, selectedSize)}
              className="absolute top-4 right-4 p-2.5 bg-[#F1EBDD]/90 backdrop-blur-sm rounded-full text-[#0A0A0B] hover:scale-110 transition-all"
              aria-label={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
            >
              <Heart
                size={18}
                className={inWishlist ? 'fill-[#4A0E17] text-[#4A0E17]' : 'text-[#0A0A0B]'}
              />
            </button>
          </div>

          {/* Gallery Thumbnails */}
          {currentImages.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {currentImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-[3/4] bg-[#0A0A0B]/5 border overflow-hidden transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#0A0A0B] ring-1 ring-[#0A0A0B]'
                      : 'border-[#0A0A0B]/10 opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`View ${img.viewType} image`}
                >
                  <img
                    src={img.url}
                    alt={img.caption}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-1 right-1 text-[8px] font-mono bg-black/60 text-white px-1 py-0.2 uppercase">
                    {img.viewType}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Garment Placement Technical Callout */}
          <div className="p-4 bg-white/60 border border-[#0A0A0B]/10 text-xs flex items-start gap-3 mt-2">
            <AsoraEmblem size={24} color="#0A0A0B" className="mt-0.5" />
            <div>
              <span className="font-mono text-[10px] tracking-widest uppercase text-neutral-500 block font-semibold">
                AUTHENTIC BRANDING ARCHITECTURE
              </span>
              <p className="text-neutral-700 mt-0.5 leading-relaxed">
                {product.brandingPlacement}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CONTIGUOUS PURCHASE MODULE & DETAILS (ACTUAL PRODUCT TEMPLATE) */}
        <div className="lg:col-span-5 flex flex-col">
          {/* Header & Pricing */}
          <div className="border-b border-[#0A0A0B]/10 pb-6 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-500">
                <span>{product.category}</span>
                <span>·</span>
                <span>{product.skuPrefix}</span>
              </div>

              {/* In-Line Live Preview Indicator & Quick Flip */}
              <div className="flex items-center gap-1.5">
                {isPreviewingAi ? (
                  <span className="inline-flex items-center gap-1 text-[9px] font-mono uppercase bg-[#4A0E17] text-[#F1EBDD] px-2 py-0.5 font-bold tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
                    AI LIVE PREVIEW ({aiDraft?.tone.toUpperCase()})
                  </span>
                ) : (
                  <span className="text-[9px] font-mono uppercase text-neutral-500 bg-neutral-200/80 px-2 py-0.5">
                    ATELIER ORIGINAL
                  </span>
                )}
              </div>
            </div>

            <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#0A0A0B]">
              {product.name}
            </h1>

            {/* Subtitle rendered with selected font style */}
            <p className={`text-sm mt-1 transition-all ${getSubtitleFontClass()} ${surfaceStyle.subtitleClass}`}>
              {currentSubtitle}
            </p>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-2xl font-mono font-medium text-[#0A0A0B]">
                {formatPrice(product.priceEur)}
              </span>
              <span className="text-xs text-neutral-500">VAT & duties included</span>
            </div>
          </div>

          {/* Color Selector */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2 text-xs">
              <span className="font-mono tracking-widest uppercase text-neutral-600">
                COLOUR: <span className="font-sans font-semibold text-[#0A0A0B]">{selectedColor}</span>
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.availableColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 py-1.5 text-xs border transition-colors ${
                    selectedColor === color
                      ? 'border-[#0A0A0B] bg-[#0A0A0B] text-[#F1EBDD] font-medium'
                      : 'border-[#0A0A0B]/20 bg-white/50 text-[#0A0A0B] hover:border-[#0A0A0B]'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector & "FIND MY SIZE" trigger */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono tracking-widest uppercase text-neutral-600">
                SIZE: <span className="font-sans font-semibold text-[#0A0A0B]">{selectedSize}</span>
              </span>
              <button
                onClick={() => setSizeFinder({ isOpen: true, product })}
                className="text-xs text-[#0A0A0B] hover:underline flex items-center gap-1 font-medium"
              >
                <Ruler size={13} />
                <span>FIND MY SIZE</span>
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 text-xs font-mono font-medium border transition-colors ${
                    selectedSize === size
                      ? 'border-[#0A0A0B] bg-[#0A0A0B] text-[#F1EBDD]'
                      : 'border-[#0A0A0B]/20 bg-white/50 text-[#0A0A0B] hover:border-[#0A0A0B]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-2 text-[11px] text-neutral-500 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>In stock at Paris atelier · Dispatches within 24 hours</span>
            </div>
          </div>

          {/* Primary CTA: ADD TO ASORA BAG */}
          <div className="space-y-3 mb-6">
            <button
              onClick={handleAddToBag}
              className="w-full py-4 bg-[#0A0A0B] text-[#F1EBDD] text-xs tracking-[0.25em] font-medium hover:bg-[#2A2B2E] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>ADD TO ASORA BAG</span>
              <span>—</span>
              <span className="font-mono">{formatPrice(product.priceEur)}</span>
            </button>

            <div className="flex items-center justify-center gap-6 text-[11px] text-neutral-600 pt-1">
              <span className="flex items-center gap-1">
                <Truck size={13} />
                <span>Complimentary over €250</span>
              </span>
              <span className="flex items-center gap-1">
                <RotateCcw size={13} />
                <span>14-Day Returns</span>
              </span>
            </div>
          </div>

          {/* AI Description Studio & Live Preview Toggle Bar Component */}
          <AiDescriptionPreviewBar product={product} />

          {/* PRODUCT DESCRIPTION SECTION RENDERED AGAINST LIVE TEMPLATE */}
          {previewMode === 'split' && isPreviewingAi ? (
            /* Split Comparison Mode: Side-by-side rendering with exact style metrics */
            <div className="mb-8 border border-[#0A0A0B]/20 bg-white/60 p-4 sm:p-5 space-y-4 shadow-xs">
              <div className="flex items-center justify-between pb-2.5 border-b border-[#0A0A0B]/10 text-[10px] font-mono uppercase text-neutral-600">
                <span className="font-bold flex items-center gap-1.5">
                  <Columns size={12} />
                  SIDE-BY-SIDE TEMPLATE RENDER COMPARISON
                </span>
                <button
                  onClick={() => setIsAiPreviewActive(false)}
                  className="hover:text-black underline font-sans"
                >
                  EXIT PREVIEW
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Baseline Atelier Original */}
                <div className="p-3.5 bg-white border border-[#0A0A0B]/15 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-500 font-bold block">
                      HANDCRAFTED ATELIER COPY
                    </span>
                    <span className="text-[8px] font-mono text-neutral-400">BASELINE</span>
                  </div>
                  <p className="font-editorial text-xs italic text-neutral-700">
                    {product.subtitle}
                  </p>
                  <p className="text-xs text-neutral-800 leading-relaxed font-sans">
                    {product.originalDescription || product.description}
                  </p>
                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[9px] font-mono text-neutral-400">
                    <span>{(product.originalDescription || product.description).split(' ').length} words</span>
                    <span>100% human atelier</span>
                  </div>
                </div>

                {/* 2. AI-Generated Live Preview on exact styles */}
                <div className={`p-3.5 border transition-all space-y-2 relative ${
                  isDarkSurface
                    ? 'bg-[#0A0A0B] text-[#F1EBDD] border-white/20'
                    : 'bg-[#4A0E17]/5 border-[#4A0E17]/30 text-[#0A0A0B]'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#4A0E17] dark:text-amber-300 font-bold flex items-center gap-1">
                      <Sparkles size={10} />
                      AI PREVIEW · {aiDraft.tone.toUpperCase()}
                    </span>
                    <span className="text-[8px] font-mono bg-[#4A0E17] text-[#F1EBDD] px-1.5 py-0.5 uppercase">
                      {aiDraft.source}
                    </span>
                  </div>
                  <p className={`text-xs ${getSubtitleFontClass()}`}>
                    {aiDraft.subtitle}
                  </p>
                  <p className={`${getFontSizeClass()} ${getLineHeightClass()} ${getDescriptionFontClass()} ${
                    isDarkSurface ? 'text-[#F1EBDD]/90' : 'text-[#0A0A0B]'
                  }`}>
                    {aiDraft.description}
                  </p>
                  <div className="pt-2 border-t border-[#4A0E17]/15 flex items-center justify-between text-[9px] font-mono opacity-70">
                    <span>{aiDraft.description.split(' ').length} words</span>
                    <span>Tone: {aiDraft.tone}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* In-Situ Mode: Renders directly into the actual product page template */
            <div className={`mb-8 transition-all ${surfaceStyle.containerClass}`}>
              {isPreviewingAi && (
                <div className="mb-3 flex flex-wrap items-center justify-between py-1.5 px-3 bg-[#4A0E17]/10 border border-[#4A0E17]/25 text-[10px] font-mono text-[#4A0E17]">
                  <span className="flex items-center gap-1.5 font-bold uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4A0E17] animate-pulse" />
                    AI TEXT RENDERED ON LIVE TEMPLATE · {aiDraft?.tone.toUpperCase()}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] opacity-75">
                      Font: {templateFontStyle} · Surface: {templateColorSurface}
                    </span>
                    <button
                      onClick={() => setIsAiPreviewActive(false)}
                      className="underline hover:text-black uppercase text-[9px] font-sans font-medium"
                    >
                      Original
                    </button>
                  </div>
                </div>
              )}

              {/* The Live Rendered Product Description Body */}
              <p
                className={`${getFontSizeClass()} ${getLineHeightClass()} ${getDescriptionFontClass()} ${
                  surfaceStyle.textClass
                } transition-all`}
              >
                {currentDescription}
              </p>
            </div>
          )}

          {/* Accessible Expandable Specification Accordions */}
          <div className="border-t border-[#0A0A0B]/10 divide-y divide-[#0A0A0B]/10 text-xs">
            {/* Fit & Silhouette */}
            <div>
              <button
                onClick={() => toggleSection('fit')}
                className="w-full py-4 flex items-center justify-between text-left font-medium hover:opacity-75 transition-opacity"
              >
                <span className="tracking-widest uppercase font-mono text-[11px] flex items-center gap-2">
                  <span>FIT & SILHOUETTE</span>
                  {isPreviewingAi && (
                    <span className="text-[9px] font-mono text-[#4A0E17] font-bold">
                      · AI CALIBRATED
                    </span>
                  )}
                </span>
                {openSections.fit ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              </button>
              {openSections.fit && (
                <div className="pb-4 text-neutral-600 space-y-2 leading-relaxed animate-in fade-in duration-150">
                  <p>{currentFit}</p>
                  <p className="text-[11px] text-neutral-500 font-mono">
                    Model is 185 cm / 6'1" and wears size L in Volume 01 campaign.
                  </p>
                </div>
              )}
            </div>

            {/* Fabric & Construction */}
            <div>
              <button
                onClick={() => toggleSection('fabric')}
                className="w-full py-4 flex items-center justify-between text-left font-medium hover:opacity-75 transition-opacity"
              >
                <span className="tracking-widest uppercase font-mono text-[11px] flex items-center gap-2">
                  <span>FABRIC & CONSTRUCTION</span>
                  {isPreviewingAi && (
                    <span className="text-[9px] font-mono text-[#4A0E17] font-bold">
                      · AI VERIFIED
                    </span>
                  )}
                </span>
                {openSections.fabric ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              </button>
              {openSections.fabric && (
                <div className="pb-4 text-neutral-600 space-y-2.5 leading-relaxed animate-in fade-in duration-150">
                  <p className="font-medium text-[#0A0A0B]">{product.fabricComposition}</p>
                  {product.weightGsm && (
                    <p className="font-mono text-[11px] text-neutral-700">
                      Density: {product.weightGsm} GSM ({product.weightGsm > 450 ? 'Heavyweight Loopback' : 'Standard Weight'})
                    </p>
                  )}
                  <ul className="list-disc pl-4 space-y-1">
                    {currentConstruction.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Care Instructions */}
            <div>
              <button
                onClick={() => toggleSection('care')}
                className="w-full py-4 flex items-center justify-between text-left font-medium hover:opacity-75 transition-opacity"
              >
                <span className="tracking-widest uppercase font-mono text-[11px]">
                  CARE INSTRUCTIONS
                </span>
                {openSections.care ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              </button>
              {openSections.care && (
                <div className="pb-4 text-neutral-600 space-y-1 animate-in fade-in duration-150">
                  {currentCare.map((care, idx) => (
                    <p key={idx}>• {care}</p>
                  ))}
                </div>
              )}
            </div>

            {/* Shipping & Delivery */}
            <div>
              <button
                onClick={() => toggleSection('shipping')}
                className="w-full py-4 flex items-center justify-between text-left font-medium hover:opacity-75 transition-opacity"
              >
                <span className="tracking-widest uppercase font-mono text-[11px]">
                  COMPLIMENTARY SHIPPING
                </span>
                {openSections.shipping ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              </button>
              {openSections.shipping && (
                <div className="pb-4 text-neutral-600 space-y-2 leading-relaxed animate-in fade-in duration-150">
                  <p>{product.shippingNotes}</p>
                  <p>Complimentary tracked express courier across France and EU for orders exceeding €250.</p>
                </div>
              )}
            </div>

            {/* Returns */}
            <div>
              <button
                onClick={() => toggleSection('returns')}
                className="w-full py-4 flex items-center justify-between text-left font-medium hover:opacity-75 transition-opacity"
              >
                <span className="tracking-widest uppercase font-mono text-[11px]">
                  RETURNS & EXCHANGES
                </span>
                {openSections.returns ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              </button>
              {openSections.returns && (
                <div className="pb-4 text-neutral-600 space-y-2 leading-relaxed animate-in fade-in duration-150">
                  <p>
                    We offer a 14-day return window from receipt of your shipment. Items must remain in unworn,
                    unwashed condition with all original tags and presentation packaging intact.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* DOCKED FLOATING LIVE PREVIEW CONTROLLER AT BOTTOM */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 max-w-4xl w-[94%] sm:w-auto bg-[#0A0A0B]/95 backdrop-blur-md text-[#F1EBDD] px-4 py-2.5 rounded-full border border-white/20 shadow-2xl flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-bold tracking-wider uppercase text-white hidden sm:inline">
            TEMPLATE PREVIEW CONTROLLER:
          </span>
          <span className="text-[11px] font-bold tracking-wider uppercase text-white sm:hidden">
            PREVIEW:
          </span>
        </div>

        {/* Quick Toggle Button */}
        <div className="inline-flex p-0.5 bg-white/10 rounded-full border border-white/15 text-[10px]">
          <button
            onClick={() => setIsAiPreviewActive(false)}
            className={`px-3 py-1 rounded-full transition-all ${
              !isAiPreviewActive
                ? 'bg-[#F1EBDD] text-[#0A0A0B] font-bold shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            ORIGINAL
          </button>
          <button
            onClick={() => setIsAiPreviewActive(true)}
            className={`px-3 py-1 rounded-full transition-all flex items-center gap-1 ${
              isAiPreviewActive
                ? 'bg-[#4A0E17] text-[#F1EBDD] font-bold shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Sparkles size={10} className="text-amber-300" />
            <span>AI PREVIEW</span>
          </button>
        </div>

        {/* View Mode Toggle */}
        {isAiPreviewActive && (
          <div className="hidden md:flex items-center gap-1 text-[10px]">
            <button
              onClick={() => setPreviewMode(previewMode === 'in-situ' ? 'split' : 'in-situ')}
              className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded text-[#F1EBDD] transition-colors flex items-center gap-1"
              title="Switch between in-situ template and split side-by-side view"
            >
              <Columns size={11} />
              <span>{previewMode === 'in-situ' ? 'VIEW SPLIT' : 'VIEW IN-SITU'}</span>
            </button>
          </div>
        )}

        {/* Surface Palette Quick Toggle */}
        {isAiPreviewActive && (
          <div className="hidden lg:flex items-center gap-1.5 text-[10px]">
            <span className="text-neutral-400">SURFACE:</span>
            {[
              { id: 'ivory', hex: '#F1EBDD', title: 'Ivory' },
              { id: 'black', hex: '#0A0A0B', title: 'Black' },
              { id: 'navy', hex: '#0E1626', title: 'Navy' },
              { id: 'travertine', hex: '#FAF8F5', title: 'Travertine' },
              { id: 'burgundy', hex: '#4A0E17', title: 'Burgundy' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setTemplateColorSurface(s.id as any)}
                title={s.title}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  templateColorSurface === s.id ? 'ring-2 ring-white scale-125' : 'border-white/30 opacity-70 hover:opacity-100'
                }`}
                style={{ backgroundColor: s.hex }}
              />
            ))}
          </div>
        )}

        {/* Font Style Quick Cycle */}
        {isAiPreviewActive && (
          <button
            onClick={() => {
              const styles: any = ['hybrid', 'serif-italic', 'serif-regular', 'clean-sans'];
              const nextIdx = (styles.indexOf(templateFontStyle) + 1) % styles.length;
              setTemplateFontStyle(styles[nextIdx]);
            }}
            className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded text-[10px] text-[#F1EBDD] transition-colors flex items-center gap-1"
            title="Cycle template font family hierarchy"
          >
            <Type size={11} />
            <span className="hidden sm:inline">FONT:</span>
            <span className="uppercase font-bold">{templateFontStyle}</span>
          </button>
        )}

        {/* AI Brand Auditor Dock Trigger */}
        <button
          onClick={() => setIsAuditorOpen(!isAuditorOpen)}
          className={`px-3 py-1 rounded-full text-[10px] transition-colors flex items-center gap-1.5 font-bold ${
            isAuditorOpen
              ? 'bg-[#4A0E17] text-[#F1EBDD]'
              : 'bg-white/10 hover:bg-white/20 text-[#F1EBDD]'
          }`}
          title="Toggle AI Brand Auditor"
        >
          <ShieldAlert size={11} className={isAuditorOpen ? 'text-amber-300' : 'text-amber-400'} />
          <span>AUDITOR</span>
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
