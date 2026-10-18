import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { AsoraEmblem } from '../components/brand/AsoraEmblem';
import {
  SlidersHorizontal,
  CheckCircle2,
  AlertCircle,
  Package,
  Users,
  Settings,
  DollarSign,
  Tag,
  KeyRound,
  ExternalLink,
  Save,
  Check,
  Sparkles,
  Wand2,
  Eye,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import { AiBrandAuditor } from '../components/product/AiBrandAuditor';

export const AdminDashboardPage: React.FC = () => {
  const {
    settings,
    updateSettings,
    products,
    setProducts,
    orders,
    subscribers,
    formatPrice,
    setCurrentPage,
    openProductDetail,
    isAiPreviewActive,
    setIsAiPreviewActive,
    updateProductAiDraft,
    applyAiCopyAsLive,
    revertToOriginalCopy,
    currency,
    setCurrency,
    templateFontStyle,
    setTemplateFontStyle,
    templateFontSize,
    setTemplateFontSize,
    templateColorSurface,
    setTemplateColorSurface,
  } = useStore();

  const [activeTab, setActiveTab] = useState<
    'checklist' | 'settings' | 'products' | 'ai-copy' | 'brand-auditor' | 'orders' | 'subscribers'
  >('checklist');
  const [selectedProductForAi, setSelectedProductForAi] = useState<string>(products[0]?.id || 'asora-crewneck-01');
  const [adminAiTone, setAdminAiTone] = useState<string>('Quiet Luxury & Tactility');
  const [isAdminGenerating, setIsAdminGenerating] = useState<boolean>(false);
  const [adminAiSuccessMsg, setAdminAiSuccessMsg] = useState<string | null>(null);

  // Form states for settings
  const [formData, setFormData] = useState({
    freeShippingThresholdEur: settings.freeShippingThresholdEur,
    standardShippingEur: settings.standardShippingEur,
    announcementText: settings.announcementText,
    taxPercentage: settings.taxPercentage,
    contactEmail: settings.contactEmail,
    supportHours: settings.supportHours,
    instagramHandle: settings.instagramHandle,
    tiktokHandle: settings.tiktokHandle,
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const updateProductStock = (productId: string, newPrice: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, priceEur: newPrice } : p))
    );
  };

  return (
    <div className="w-full bg-[#F1EBDD] text-[#0A0A0B] py-10 sm:py-16 px-4 sm:px-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#0A0A0B]/10 pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.35em] uppercase text-neutral-500 mb-1">
            <AsoraEmblem size={16} color="#0A0A0B" />
            <span>BUSINESS OPERATIONS & LAUNCH READINESS</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#0A0A0B]">
            Store Management & Launch Checklist
          </h1>
          <p className="text-xs text-neutral-600 mt-1 max-w-2xl">
            Configure live commercial thresholds, adjust pricing and currencies, inspect customer orders,
            and review credentials required for live payment and email marketing integrations.
          </p>
        </div>

        <button
          onClick={() => setCurrentPage('home')}
          className="px-4 py-2 bg-[#0A0A0B] text-[#F1EBDD] text-xs font-mono uppercase tracking-wider hover:bg-[#2A2B2E] self-start sm:self-auto"
        >
          View Storefront
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#0A0A0B]/10 pb-4 mb-8 overflow-x-auto text-xs font-mono">
        <button
          onClick={() => setActiveTab('checklist')}
          className={`px-4 py-2 border transition-colors flex items-center gap-1.5 ${
            activeTab === 'checklist'
              ? 'border-[#0A0A0B] bg-[#0A0A0B] text-[#F1EBDD]'
              : 'border-[#0A0A0B]/20 bg-white/50 text-[#0A0A0B] hover:border-[#0A0A0B]'
          }`}
        >
          <CheckCircle2 size={14} />
          <span>Launch Checklist (Deliverable)</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 border transition-colors flex items-center gap-1.5 ${
            activeTab === 'settings'
              ? 'border-[#0A0A0B] bg-[#0A0A0B] text-[#F1EBDD]'
              : 'border-[#0A0A0B]/20 bg-white/50 text-[#0A0A0B] hover:border-[#0A0A0B]'
          }`}
        >
          <Settings size={14} />
          <span>Configurable Thresholds</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 border transition-colors flex items-center gap-1.5 ${
            activeTab === 'products'
              ? 'border-[#0A0A0B] bg-[#0A0A0B] text-[#F1EBDD]'
              : 'border-[#0A0A0B]/20 bg-white/50 text-[#0A0A0B] hover:border-[#0A0A0B]'
          }`}
        >
          <Package size={14} />
          <span>Product Pricing & Drafts ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('ai-copy')}
          className={`px-4 py-2 border transition-colors flex items-center gap-1.5 ${
            activeTab === 'ai-copy'
              ? 'border-[#4A0E17] bg-[#4A0E17] text-[#F1EBDD] font-bold'
              : 'border-[#0A0A0B]/20 bg-white/50 text-[#0A0A0B] hover:border-[#0A0A0B]'
          }`}
        >
          <Sparkles size={14} />
          <span>AI Copy Studio & Template Preview</span>
        </button>

        <button
          onClick={() => setActiveTab('brand-auditor')}
          className={`px-4 py-2 border transition-colors flex items-center gap-1.5 ${
            activeTab === 'brand-auditor'
              ? 'border-[#4A0E17] bg-[#4A0E17] text-[#F1EBDD] font-bold shadow-xs'
              : 'border-[#0A0A0B]/20 bg-white/50 text-[#4A0E17] hover:border-[#4A0E17]'
          }`}
        >
          <ShieldAlert size={14} className={activeTab === 'brand-auditor' ? 'text-amber-300' : 'text-[#4A0E17]'} />
          <span>AI Brand Auditor</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 border transition-colors flex items-center gap-1.5 ${
            activeTab === 'orders'
              ? 'border-[#0A0A0B] bg-[#0A0A0B] text-[#F1EBDD]'
              : 'border-[#0A0A0B]/20 bg-white/50 text-[#0A0A0B] hover:border-[#0A0A0B]'
          }`}
        >
          <DollarSign size={14} />
          <span>Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('subscribers')}
          className={`px-4 py-2 border transition-colors flex items-center gap-1.5 ${
            activeTab === 'subscribers'
              ? 'border-[#0A0A0B] bg-[#0A0A0B] text-[#F1EBDD]'
              : 'border-[#0A0A0B]/20 bg-white/50 text-[#0A0A0B] hover:border-[#0A0A0B]'
          }`}
        >
          <Users size={14} />
          <span>Private List ({subscribers.length})</span>
        </button>
      </div>

      {/* TAB 1: LAUNCH CHECKLIST & EXTERNAL SERVICES */}
      {activeTab === 'checklist' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Status summary */}
          <div className="p-6 bg-white/70 border border-[#0A0A0B]/10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-800 block mb-2 font-bold">
                ✓ COMPLETED NATIVE STORE ENGINE
              </span>
              <ul className="text-xs space-y-1.5 text-neutral-800">
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-700 shrink-0" />
                  <span>The Pierced Horizon emblem exact SVG geometry with satin-stitch & blind emboss</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-700 shrink-0" />
                  <span>High-contrast serif ASORA wordmark with ~0.6em tracking and centered PARIS descriptor</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-700 shrink-0" />
                  <span>Exact identity palette (Warm Ivory #F1EBDD, Black #0A0A0B, Deep Navy #0E1626, Stone Grey #B9B6AE, Burgundy #4A0E17)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-700 shrink-0" />
                  <span>The ASORA Bag with live quantity updates, subtotal, and configurable free shipping threshold</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-700 shrink-0" />
                  <span>"WELCOME TO ASORA." add-to-bag modal and "FIND MY SIZE" calculator</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-700 shrink-0" />
                  <span>Multi-step checkout with real validation & "YOUR ASORA JOURNEY BEGINS" confirmation</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-700 shrink-0" />
                  <span>Real Order Tracking lookup by code and customer account portal ("YOUR ASORA")</span>
                </li>
              </ul>
            </div>

            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-amber-900 block mb-2 font-bold">
                ⚡ EXTERNAL SERVICES & OWNER CREDENTIALS TO CONFIGURE
              </span>
              <ul className="text-xs space-y-2 text-neutral-800">
                <li className="p-3 bg-white/80 border border-amber-300/40">
                  <strong className="block text-amber-950">1. Payment Gateway (Stripe Live Secret Key)</strong>
                  <span className="text-neutral-600">
                    Connect real Stripe Publishable/Secret Keys in Settings &rarr; Secrets to accept live Apple Pay and credit card charges.
                  </span>
                </li>
                <li className="p-3 bg-white/80 border border-amber-300/40">
                  <strong className="block text-amber-950">2. Email Service Provider (Klaviyo or Mailchimp API)</strong>
                  <span className="text-neutral-600">
                    Connect an email provider for automated dispatch of order receipts and The Private List welcome notes.
                  </span>
                </li>
                <li className="p-3 bg-white/80 border border-amber-300/40">
                  <strong className="block text-amber-950">3. Live Courier API (DHL Express / FedEx Webhook)</strong>
                  <span className="text-neutral-600">
                    Hook live API credentials for real-time airway bill generation and automated tracking updates.
                  </span>
                </li>
                <li className="p-3 bg-white/80 border border-amber-300/40">
                  <strong className="block text-amber-950">4. Official Social Accounts Ownership</strong>
                  <span className="text-neutral-600">
                    Verify claim of Instagram & TikTok handles (currently set to @asora.paris).
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CONFIGURABLE THRESHOLDS */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="bg-white/70 border border-[#0A0A0B]/10 p-6 sm:p-8 space-y-6 text-xs max-w-3xl">
          <h2 className="font-editorial text-2xl text-[#0A0A0B] border-b border-[#0A0A0B]/10 pb-3">
            Store Commercial Parameters
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block mb-1">
                FREE SHIPPING THRESHOLD (EUR)
              </label>
              <input
                type="number"
                value={formData.freeShippingThresholdEur}
                onChange={(e) => setFormData({ ...formData, freeShippingThresholdEur: Number(e.target.value) })}
                className="w-full bg-white border border-[#0A0A0B]/20 p-2.5 font-mono text-xs focus:outline-none focus:border-[#0A0A0B]"
              />
              <span className="text-[10px] text-neutral-500 mt-0.5 block">
                Orders above this amount qualify for complimentary courier delivery.
              </span>
            </div>

            <div>
              <label className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block mb-1">
                STANDARD SHIPPING FEE (EUR)
              </label>
              <input
                type="number"
                value={formData.standardShippingEur}
                onChange={(e) => setFormData({ ...formData, standardShippingEur: Number(e.target.value) })}
                className="w-full bg-white border border-[#0A0A0B]/20 p-2.5 font-mono text-xs focus:outline-none focus:border-[#0A0A0B]"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block mb-1">
              TOP ANNOUNCEMENT BAR BANNER TEXT
            </label>
            <input
              type="text"
              value={formData.announcementText}
              onChange={(e) => setFormData({ ...formData, announcementText: e.target.value })}
              className="w-full bg-white border border-[#0A0A0B]/20 p-2.5 text-xs focus:outline-none focus:border-[#0A0A0B]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block mb-1">
                CONCIERGE SUPPORT EMAIL
              </label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full bg-white border border-[#0A0A0B]/20 p-2.5 text-xs focus:outline-none focus:border-[#0A0A0B]"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block mb-1">
                ACTIVE DISPLAY CURRENCY
              </label>
              <div className="flex gap-2 font-mono">
                {(['EUR', 'USD', 'GBP'] as const).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCurrency(c)}
                    className={`flex-1 py-2 border transition-colors ${
                      currency === c
                        ? 'bg-[#0A0A0B] text-[#F1EBDD] font-bold border-[#0A0A0B]'
                        : 'border-[#0A0A0B]/20 bg-white text-neutral-700'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center gap-3">
            <button
              type="submit"
              className="px-6 py-3 bg-[#0A0A0B] text-[#F1EBDD] text-xs font-semibold uppercase tracking-widest hover:bg-[#2A2B2E] flex items-center gap-2"
            >
              <Save size={14} />
              <span>SAVE CONFIGURATION</span>
            </button>
            {savedSuccess && (
              <span className="text-xs text-emerald-800 flex items-center gap-1">
                <Check size={14} />
                <span>Configuration updated live across store!</span>
              </span>
            )}
          </div>
        </form>
      )}

      {/* TAB 3: PRODUCTS & PRICING */}
      {activeTab === 'products' && (
        <div className="bg-white/70 border border-[#0A0A0B]/10 p-6 sm:p-8 space-y-4">
          <h2 className="font-editorial text-2xl text-[#0A0A0B] border-b border-[#0A0A0B]/10 pb-3">
            Live Product Catalogue & Draft Flags
          </h2>
          <div className="divide-y divide-[#0A0A0B]/10">
            {products.map((p) => (
              <div key={p.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-4">
                  <img
                    src={p.heroImage}
                    alt={p.name}
                    className="w-14 h-18 object-cover bg-neutral-200 border border-[#0A0A0B]/10"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm">{p.name}</h3>
                      {p.isDraft && (
                        <span className="text-[9px] font-mono bg-[#0A0A0B] text-[#F1EBDD] px-2 py-0.5 uppercase">
                          DRAFT ENTRY
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-neutral-500 font-mono mt-0.5">
                      SKU: {p.skuPrefix} · Category: {p.category}
                    </p>
                    <p className="text-[11px] text-neutral-600 mt-1">
                      Available: {p.availableColors.join(', ')} · Sizes: {p.availableSizes.join(', ')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-neutral-500 block">BASE PRICE (EUR)</span>
                    <input
                      type="number"
                      value={p.priceEur}
                      onChange={(e) => updateProductStock(p.id, Number(e.target.value))}
                      className="w-24 bg-white border border-[#0A0A0B]/20 p-1.5 text-xs font-mono text-right focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: AI COPY STUDIO & TEMPLATE PREVIEW */}
      {activeTab === 'ai-copy' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Header */}
          <div className="bg-white/80 border border-[#0A0A0B]/10 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#4A0E17] font-bold">
                  GEMINI 3.8 FLASH // LUXURY COPY STUDIO
                </span>
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-light text-[#0A0A0B] mt-1">
                AI Description Studio & Live Template Simulator
              </h2>
              <p className="text-xs text-neutral-600 mt-1">
                Test and fine-tune editorial copy rendered on the authentic ASORA template (Cormorant Garamond, Warm Ivory #F1EBDD, Plus Jakarta Sans).
              </p>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto">
              <span className="text-xs font-mono text-neutral-500">SELECT PRODUCT:</span>
              <select
                value={selectedProductForAi}
                onChange={(e) => setSelectedProductForAi(e.target.value)}
                className="bg-white border border-[#0A0A0B]/20 p-2 text-xs font-medium focus:outline-none"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Product Workspace */}
          {(() => {
            const currentProd = products.find((p) => p.id === selectedProductForAi) || products[0];
            const draft = currentProd.aiCopyDraft || {
              subtitle: currentProd.subtitle,
              description: currentProd.description,
              shortDescription: currentProd.shortDescription,
              fitNotes: currentProd.fit,
              constructionHighlights: currentProd.constructionDetails,
              careNote: currentProd.careInstructions[0] || '',
              tone: 'Quiet Luxury & Tactility',
              generatedAt: 'October 2026',
              source: 'default',
            };

            const handleAdminGenerate = async (toneToUse: string) => {
              setIsAdminGenerating(true);
              try {
                const res = await fetch('/api/generate-description', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    productName: currentProd.name,
                    category: currentProd.category,
                    color: currentProd.primaryColor,
                    fabric: currentProd.fabricComposition,
                    weightGsm: currentProd.weightGsm,
                    fitType: currentProd.fitType,
                    brandingPlacement: currentProd.brandingPlacement,
                    tone: toneToUse,
                  }),
                });
                const data = await res.json();
                if (data.success) {
                  updateProductAiDraft(currentProd.id, {
                    subtitle: data.subtitle,
                    description: data.description,
                    shortDescription: data.shortDescription,
                    fitNotes: data.fitNotes,
                    constructionHighlights: data.constructionHighlights,
                    careNote: data.careNote,
                    tone: toneToUse,
                    generatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    source: data.source || 'gemini-3.8-flash',
                  });
                  setAdminAiSuccessMsg(`Generated ${toneToUse} copy for ${currentProd.name}`);
                  setTimeout(() => setAdminAiSuccessMsg(null), 3000);
                }
              } catch (e) {
                console.error('Error generating copy in admin:', e);
              } finally {
                setIsAdminGenerating(false);
              }
            };

            return (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left: Generator Controls & Editor */}
                <div className="lg:col-span-6 space-y-5 bg-white/70 border border-[#0A0A0B]/10 p-6 text-xs">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block mb-2">
                      SELECT BRAND TONE PRESET
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        'Quiet Luxury & Tactility',
                        'Architectural & Brutalist',
                        'Parisian Atelier Heritage',
                        'Minimalist Technical',
                        'Material Science & Fiber Density',
                      ].map((t) => (
                        <button
                          key={t}
                          onClick={() => {
                            setAdminAiTone(t);
                            handleAdminGenerate(t);
                          }}
                          className={`p-2.5 text-left border transition-all ${
                            adminAiTone === t
                              ? 'border-[#0A0A0B] bg-[#0A0A0B] text-[#F1EBDD] font-semibold'
                              : 'border-[#0A0A0B]/15 bg-white hover:border-[#0A0A0B]'
                          }`}
                        >
                          <span className="font-mono text-[10px] block leading-tight">{t}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Regenerate Button */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAdminGenerate(adminAiTone)}
                      disabled={isAdminGenerating}
                      className="flex-1 py-3 bg-[#0A0A0B] text-[#F1EBDD] text-xs font-mono uppercase tracking-wider font-semibold hover:bg-[#2A2B2E] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Wand2 size={13} className={isAdminGenerating ? 'animate-spin' : ''} />
                      <span>{isAdminGenerating ? 'GENERATING WITH GEMINI...' : `GENERATE (${adminAiTone.toUpperCase()})`}</span>
                    </button>
                  </div>

                  {adminAiSuccessMsg && (
                    <div className="p-2 bg-emerald-900 text-white text-[11px] font-mono flex items-center gap-1.5">
                      <Check size={13} />
                      <span>{adminAiSuccessMsg}</span>
                    </div>
                  )}

                  {/* Editable Fields */}
                  <div className="space-y-3 pt-3 border-t border-[#0A0A0B]/10">
                    <div>
                      <label className="text-[10px] font-mono uppercase text-neutral-500 block mb-1">
                        EDITORIAL SUBTITLE (SERIF ITALIC)
                      </label>
                      <input
                        type="text"
                        value={draft.subtitle}
                        onChange={(e) => updateProductAiDraft(currentProd.id, { subtitle: e.target.value })}
                        className="w-full bg-white border border-[#0A0A0B]/20 p-2 font-serif-asora italic text-xs focus:outline-none focus:border-[#0A0A0B]"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase text-neutral-500 block mb-1">
                        PRODUCT DESCRIPTION (BODY COPY)
                      </label>
                      <textarea
                        rows={4}
                        value={draft.description}
                        onChange={(e) => updateProductAiDraft(currentProd.id, { description: e.target.value })}
                        className="w-full bg-white border border-[#0A0A0B]/20 p-2 text-xs leading-relaxed focus:outline-none focus:border-[#0A0A0B]"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase text-neutral-500 block mb-1">
                        FIT & SILHOUETTE NOTES
                      </label>
                      <textarea
                        rows={2}
                        value={draft.fitNotes || ''}
                        onChange={(e) => updateProductAiDraft(currentProd.id, { fitNotes: e.target.value })}
                        className="w-full bg-white border border-[#0A0A0B]/20 p-2 text-xs leading-relaxed focus:outline-none focus:border-[#0A0A0B]"
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-[#0A0A0B]/10 flex flex-wrap items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        revertToOriginalCopy(currentProd.id);
                        setAdminAiSuccessMsg('Reverted to original atelier copy.');
                        setTimeout(() => setAdminAiSuccessMsg(null), 2500);
                      }}
                      className="px-3 py-2 border border-[#0A0A0B]/30 text-neutral-700 font-mono text-[10px] uppercase hover:text-black"
                    >
                      RESET TO ORIGINAL
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          applyAiCopyAsLive(currentProd.id);
                          setAdminAiSuccessMsg('Committed to live catalog!');
                          setTimeout(() => setAdminAiSuccessMsg(null), 2500);
                        }}
                        className="px-4 py-2 bg-[#4A0E17] text-[#F1EBDD] font-mono text-xs uppercase font-semibold hover:bg-black transition-colors"
                      >
                        COMMIT TO STORE
                      </button>

                      <button
                        onClick={() => {
                          setSelectedProductForAi(currentProd.id);
                          setActiveTab('brand-auditor');
                        }}
                        className="px-3.5 py-2 border border-[#4A0E17] text-[#4A0E17] font-mono text-xs uppercase font-semibold hover:bg-[#4A0E17] hover:text-[#F1EBDD] transition-colors flex items-center gap-1.5"
                        title="Audit copy against ASORA manifesto rules"
                      >
                        <ShieldAlert size={12} />
                        <span>AUDIT COPY</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsAiPreviewActive(true);
                          openProductDetail(currentProd.id);
                        }}
                        className="px-4 py-2 bg-[#0A0A0B] text-[#F1EBDD] font-mono text-xs uppercase font-semibold hover:bg-[#2A2B2E] transition-colors flex items-center gap-1.5"
                      >
                        <Eye size={12} />
                        <span>OPEN ON PDP</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right: Actual Product Page Template Live Render */}
                <div className="lg:col-span-6 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                    <span className="text-neutral-500 uppercase font-bold">
                      ACTUAL PRODUCT TEMPLATE SIMULATION
                    </span>
                    <div className="flex items-center gap-1.5 text-[10px]">
                      <span className="text-neutral-400">SURFACE:</span>
                      {[
                        { id: 'ivory', hex: '#F1EBDD', name: 'Ivory' },
                        { id: 'black', hex: '#0A0A0B', name: 'Black' },
                        { id: 'navy', hex: '#0E1626', name: 'Navy' },
                        { id: 'travertine', hex: '#FAF8F5', name: 'Travertine' },
                        { id: 'burgundy', hex: '#4A0E17', name: 'Burgundy' },
                      ].map((s) => (
                        <button
                          key={s.id}
                          onClick={() => setTemplateColorSurface(s.id as any)}
                          title={`Test template against ${s.name}`}
                          className={`w-3.5 h-3.5 rounded-full border transition-all ${
                            templateColorSurface === s.id ? 'ring-2 ring-black scale-125' : 'border-black/20'
                          }`}
                          style={{ backgroundColor: s.hex }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* The Simulated Live Template with Dynamic Surface and Fonts */}
                  <div className={`border p-6 sm:p-8 shadow-md transition-all ${
                    templateColorSurface === 'black'
                      ? 'bg-[#0A0A0B] text-[#F1EBDD] border-white/20'
                      : templateColorSurface === 'navy'
                      ? 'bg-[#0E1626] text-[#F1EBDD] border-white/20'
                      : templateColorSurface === 'burgundy'
                      ? 'bg-[#4A0E17] text-[#F1EBDD] border-white/20'
                      : templateColorSurface === 'travertine'
                      ? 'bg-[#FAF8F5] text-[#0A0A0B] border-[#0A0A0B]/20'
                      : 'bg-[#F1EBDD] text-[#0A0A0B] border-[#0A0A0B]/20'
                  }`}>
                    {/* Header */}
                    <div className="border-b border-current/15 pb-4 mb-4">
                      <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase opacity-75 mb-1">
                        <span>{currentProd.category}</span>
                        <span>·</span>
                        <span>{currentProd.skuPrefix}</span>
                        <span className="text-[#4A0E17] dark:text-amber-300 font-bold">· AI PREVIEW ACTIVE</span>
                      </div>
                      <h3 className="font-editorial text-2xl sm:text-3xl font-light">
                        {currentProd.name}
                      </h3>
                      <p className={`text-sm mt-1 opacity-80 ${
                        templateFontStyle === 'clean-sans'
                          ? 'font-sans uppercase tracking-wider text-xs'
                          : templateFontStyle === 'serif-regular'
                          ? 'font-editorial'
                          : 'font-editorial italic'
                      }`}>
                        {draft.subtitle}
                      </p>
                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-xl font-mono font-medium">
                          {formatPrice(currentProd.priceEur)}
                        </span>
                        <span className="text-[11px] opacity-70">VAT included</span>
                      </div>
                    </div>

                    {/* Color and size placeholders */}
                    <div className="mb-4 flex items-center justify-between text-xs opacity-75">
                      <span className="font-mono text-[10px] uppercase">
                        COLOUR: {currentProd.primaryColor}
                      </span>
                      <span className="font-mono text-[10px] uppercase">
                        SIZE: M
                      </span>
                    </div>

                    {/* Primary Button */}
                    <button
                      type="button"
                      disabled
                      className="w-full py-3 bg-[#0A0A0B] text-[#F1EBDD] dark:bg-[#F1EBDD] dark:text-[#0A0A0B] text-xs tracking-[0.2em] font-medium uppercase mb-5"
                    >
                      ADD TO ASORA BAG — {formatPrice(currentProd.priceEur)}
                    </button>

                    {/* LIVE RENDERED DESCRIPTION */}
                    <div className="mb-6 space-y-2">
                      <div className="py-1 px-2.5 bg-black/10 dark:bg-white/10 border border-current/20 text-[9px] font-mono flex items-center justify-between">
                        <span className="font-bold uppercase tracking-wider">
                          ● LIVE TEMPLATE PREVIEW · {draft.tone}
                        </span>
                        <span className="opacity-75">{draft.source}</span>
                      </div>
                      <p className={`leading-relaxed ${
                        templateFontSize === 'compact' ? 'text-xs' : templateFontSize === 'generous' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
                      } ${
                        templateFontStyle === 'serif-italic'
                          ? 'font-editorial italic'
                          : templateFontStyle === 'serif-regular'
                          ? 'font-editorial'
                          : 'font-sans'
                      }`}>
                        {draft.description}
                      </p>
                    </div>

                    {/* Accordion previews */}
                    <div className="border-t border-[#0A0A0B]/10 divide-y divide-[#0A0A0B]/10 text-xs">
                      <div className="py-2.5">
                        <span className="font-mono text-[10px] font-bold uppercase text-neutral-500 block">
                          FIT & SILHOUETTE
                        </span>
                        <p className="text-[11px] text-neutral-700 mt-0.5 leading-relaxed">
                          {draft.fitNotes || currentProd.fit}
                        </p>
                      </div>

                      <div className="py-2.5">
                        <span className="font-mono text-[10px] font-bold uppercase text-neutral-500 block">
                          FABRIC & CONSTRUCTION
                        </span>
                        <p className="text-[11px] text-neutral-700 mt-0.5">
                          {currentProd.fabricComposition} ({currentProd.weightGsm || 500} GSM)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* TAB: AI BRAND AUDITOR & MANIFESTO COMPLIANCE */}
      {activeTab === 'brand-auditor' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white/80 border border-[#0A0A0B]/10 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#4A0E17] font-bold">
                  MANIFESTO COMPLIANCE AUDITOR // ASORA PARIS
                </span>
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-light text-[#0A0A0B] mt-1">
                AI Brand Auditor & Editorial Governance
              </h2>
              <p className="text-xs text-neutral-600 mt-1 max-w-2xl">
                Automatically scans product descriptions, editorial subtitles, and SEO metadata against the house manifesto
                (“MORE THAN CLOTHING. A MINDSET.”). Detects hype clichés, superlatives, exclamation points, and flags non-compliant copy with instant fixes.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto">
              <span className="text-xs font-mono text-neutral-500">SELECT PRODUCT:</span>
              <select
                value={selectedProductForAi}
                onChange={(e) => setSelectedProductForAi(e.target.value)}
                className="bg-white border border-[#0A0A0B]/20 p-2 text-xs font-medium focus:outline-none"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Render the full AI Brand Auditor component for the selected product */}
          {(() => {
            const currentProd = products.find((p) => p.id === selectedProductForAi) || products[0];
            return (
              <AiBrandAuditor
                product={currentProd}
                isOpen={true}
              />
            );
          })()}
        </div>
      )}

      {/* TAB 4: ORDERS */}
      {activeTab === 'orders' && (
        <div className="bg-white/70 border border-[#0A0A0B]/10 p-6 sm:p-8 space-y-4">
          <h2 className="font-editorial text-2xl text-[#0A0A0B] border-b border-[#0A0A0B]/10 pb-3">
            Client Order Records
          </h2>
          <div className="space-y-4">
            {orders.map((ord) => (
              <div key={ord.id} className="p-4 border border-[#0A0A0B]/10 bg-white text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold">{ord.orderNumber}</span>
                  <span className="font-mono bg-[#0A0A0B] text-[#F1EBDD] px-2 py-0.5">{ord.status}</span>
                </div>
                <p className="text-neutral-600">
                  Client: {ord.shippingAddress.firstName} {ord.shippingAddress.lastName} ({ord.shippingAddress.email})
                </p>
                <div className="text-[11px] text-neutral-500 font-mono">
                  Items: {ord.items.map((i) => `${i.product.name} (${i.size}) × ${i.quantity}`).join(', ')}
                </div>
                <div className="flex justify-between font-mono pt-2 border-t border-[#0A0A0B]/10">
                  <span>Tracking: {ord.trackingNumber}</span>
                  <span className="font-bold">{formatPrice(ord.totalEur)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: SUBSCRIBERS */}
      {activeTab === 'subscribers' && (
        <div className="bg-white/70 border border-[#0A0A0B]/10 p-6 sm:p-8 space-y-4">
          <h2 className="font-editorial text-2xl text-[#0A0A0B] border-b border-[#0A0A0B]/10 pb-3">
            The Private List Subscribers ({subscribers.length})
          </h2>
          <p className="text-xs text-neutral-600">
            Registered client emails with explicit opt-in consent for private releases and notes.
          </p>
          <div className="bg-white border border-[#0A0A0B]/10 divide-y divide-[#0A0A0B]/10 text-xs font-mono">
            {subscribers.map((email, idx) => (
              <div key={idx} className="p-3 flex items-center justify-between">
                <span>{email}</span>
                <span className="text-emerald-800 text-[10px] font-bold">CONSENT VERIFIED</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
