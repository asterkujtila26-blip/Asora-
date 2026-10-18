import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Product,
  AiProductCopy,
  TemplateFontStyle,
  TemplateFontSize,
  TemplateColorSurface,
  TemplateLineHeight,
} from '../../types/store';
import {
  Sparkles,
  Eye,
  Columns,
  RotateCcw,
  Check,
  Edit3,
  ChevronDown,
  ChevronUp,
  Wand2,
  Type,
  Palette,
  Sliders,
  FileText,
  Info,
  Maximize2,
  Minimize2,
  Atom,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import { AiBrandAuditor } from './AiBrandAuditor';

interface AiDescriptionPreviewBarProps {
  product: Product;
}

export const AiDescriptionPreviewBar: React.FC<AiDescriptionPreviewBarProps> = ({ product }) => {
  const {
    isAiPreviewActive,
    setIsAiPreviewActive,
    toggleAiPreview,
    previewMode,
    setPreviewMode,
    updateProductAiDraft,
    applyAiCopyAsLive,
    revertToOriginalCopy,
    templateFontStyle,
    setTemplateFontStyle,
    templateFontSize,
    setTemplateFontSize,
    templateColorSurface,
    setTemplateColorSurface,
    templateLineHeight,
    setTemplateLineHeight,
  } = useStore();

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isStyleCustomizerOpen, setIsStyleCustomizerOpen] = useState(false);
  const [isAuditorOpen, setIsAuditorOpen] = useState(false);
  const [selectedTone, setSelectedTone] = useState<string>(
    product.aiCopyDraft?.tone || 'Quiet Luxury & Tactility'
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [applyNotification, setApplyNotification] = useState<string | null>(null);

  const currentDraft: AiProductCopy = product.aiCopyDraft || {
    subtitle: product.subtitle,
    description: product.description,
    shortDescription: product.shortDescription,
    fitNotes: product.fit,
    constructionHighlights: product.constructionDetails,
    careNote: product.careInstructions[0] || '',
    tone: 'Quiet Luxury & Tactility',
    generatedAt: 'October 2026',
    source: 'brandbook-default',
  };

  const tones = [
    {
      id: 'Quiet Luxury & Tactility',
      label: 'Quiet Luxury & Tactile',
      badge: 'ATELIER',
      desc: '500+ GSM loopback terry, subtle satin-stitch, understated presence',
    },
    {
      id: 'Architectural & Brutalist',
      label: 'Architectural & Brutalist',
      badge: 'FORM',
      desc: 'Monolithic drape, dropped shoulders, raw Parisian concrete shadows',
    },
    {
      id: 'Parisian Atelier Heritage',
      label: 'Parisian Atelier',
      badge: 'HERITAGE',
      desc: 'Paris 2026 Volume 01 roots, considered European tailoring, longevity',
    },
    {
      id: 'Minimalist Technical',
      label: 'Minimalist Technical',
      badge: 'UTILITY',
      desc: 'Twin-needle coverstitch, flat-felled seams, matte black hardware',
    },
    {
      id: 'Material Science & Fiber Density',
      label: 'Textile Science & Fiber Density',
      badge: 'SCIENCE',
      desc: 'Long-staple organic cotton polymer matrix, thermal sinker-loop geometry, GSM physics',
    },
  ];

  const surfaceColors: {
    id: TemplateColorSurface;
    label: string;
    bgHex: string;
    textHex: string;
    borderHex: string;
  }[] = [
    { id: 'ivory', label: 'Warm Ivory (Atelier Canvas)', bgHex: '#F1EBDD', textHex: '#0A0A0B', borderHex: '#0A0A0B/15' },
    { id: 'black', label: 'Obsidian Black (Nocturnal)', bgHex: '#0A0A0B', textHex: '#F1EBDD', borderHex: '#F1EBDD/20' },
    { id: 'navy', label: 'Deep Navy (Volume 01)', bgHex: '#0E1626', textHex: '#F1EBDD', borderHex: '#F1EBDD/20' },
    { id: 'travertine', label: 'Pure Travertine (Gallery)', bgHex: '#FAF8F5', textHex: '#0A0A0B', borderHex: '#0A0A0B/10' },
    { id: 'burgundy', label: 'Burgundy Velvet (Accent)', bgHex: '#4A0E17', textHex: '#F1EBDD', borderHex: '#F1EBDD/20' },
  ];

  const fontStyles: {
    id: TemplateFontStyle;
    name: string;
    desc: string;
    subtitleClass: string;
    bodyClass: string;
  }[] = [
    {
      id: 'hybrid',
      name: 'Atelier Hybrid (Brandbook Spec)',
      desc: 'Cormorant Garamond italic serif heading + Plus Jakarta Sans clean body',
      subtitleClass: 'font-editorial italic',
      bodyClass: 'font-sans',
    },
    {
      id: 'serif-italic',
      name: 'High-Contrast Editorial Serif',
      desc: 'Full Cormorant Garamond literary elegance with italic subtitle',
      subtitleClass: 'font-editorial italic',
      bodyClass: 'font-editorial font-light',
    },
    {
      id: 'serif-regular',
      name: 'Architectural Serif Roman',
      desc: 'Cormorant Garamond regular roman serif across headline & text',
      subtitleClass: 'font-editorial uppercase tracking-wider',
      bodyClass: 'font-editorial',
    },
    {
      id: 'clean-sans',
      name: 'Contemporary Clean Sans',
      desc: 'Modern Plus Jakarta Sans throughout for clean brutalist reading',
      subtitleClass: 'font-sans uppercase tracking-[0.2em] font-medium',
      bodyClass: 'font-sans',
    },
  ];

  const handleGenerate = async (toneToUse = selectedTone) => {
    setIsGenerating(true);
    setIsAiPreviewActive(true);

    try {
      const res = await fetch('/api/generate-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: product.name,
          category: product.category,
          color: product.primaryColor,
          fabric: product.fabricComposition,
          weightGsm: product.weightGsm,
          fitType: product.fitType,
          brandingPlacement: product.brandingPlacement,
          tone: toneToUse,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const data = await res.json();
      if (data.success) {
        updateProductAiDraft(product.id, {
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
        setApplyNotification(`Generated ${toneToUse} copy on live template.`);
        setTimeout(() => setApplyNotification(null), 3000);
      }
    } catch (err) {
      console.error('Failed to generate description via API:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApplyLive = () => {
    applyAiCopyAsLive(product.id);
    setApplyNotification('AI copy committed to official store catalog!');
    setTimeout(() => setApplyNotification(null), 3000);
  };

  const handleRevert = () => {
    revertToOriginalCopy(product.id);
    setIsAiPreviewActive(false);
    setApplyNotification('Reverted to original hand-crafted atelier copy.');
    setTimeout(() => setApplyNotification(null), 3000);
  };

  return (
    <div className="my-6 bg-white/85 border border-[#0A0A0B]/20 p-4 sm:p-5 shadow-sm transition-all">
      {/* 1. Header with Live Preview Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#0A0A0B]/10">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-[#0A0A0B] text-[#F1EBDD] flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 shadow-xs">
            <Sparkles size={14} className={isAiPreviewActive ? 'text-amber-300' : ''} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono tracking-widest uppercase font-bold text-[#0A0A0B]">
                PRODUCT DESCRIPTION STUDIO
              </span>
              <span
                className={`text-[9px] font-mono uppercase px-2 py-0.5 tracking-wider transition-colors ${
                  isAiPreviewActive
                    ? 'bg-[#4A0E17] text-[#F1EBDD] font-bold ring-1 ring-[#4A0E17]'
                    : 'bg-neutral-200 text-neutral-700'
                }`}
              >
                {isAiPreviewActive ? '● AI LIVE PREVIEW' : 'ORIGINAL COPY'}
              </span>
            </div>
            <p className="text-[11px] text-neutral-600 mt-0.5">
              Instant template renderer: preview how AI text formats against authentic fonts & palette.
            </p>
          </div>
        </div>

        {/* The Live Preview Toggle Switch */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="inline-flex p-1 bg-[#0A0A0B]/5 border border-[#0A0A0B]/15 rounded text-xs font-mono">
            <button
              onClick={() => setIsAiPreviewActive(false)}
              className={`px-3 py-1.5 transition-all flex items-center gap-1.5 ${
                !isAiPreviewActive
                  ? 'bg-[#0A0A0B] text-[#F1EBDD] font-bold shadow-xs'
                  : 'text-neutral-600 hover:text-black'
              }`}
              title="Show Original Atelier Handcrafted Copy"
            >
              <span>ORIGINAL</span>
            </button>
            <button
              onClick={() => setIsAiPreviewActive(true)}
              className={`px-3 py-1.5 transition-all flex items-center gap-1.5 ${
                isAiPreviewActive
                  ? 'bg-[#4A0E17] text-[#F1EBDD] font-bold shadow-xs'
                  : 'text-neutral-600 hover:text-black'
              }`}
              title="Preview AI-Generated Copy Rendered Against Live Template"
            >
              <Sparkles size={12} className="text-amber-300" />
              <span>AI PREVIEW</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Controls Toolbar: Presentation Mode, Tone, Styles & Generation */}
      <div className="pt-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left side: View Mode & Tone Selector */}
        <div className="flex flex-wrap items-center gap-2">
          {isAiPreviewActive && (
            <div className="flex items-center border border-[#0A0A0B]/20 bg-white">
              <button
                onClick={() => setPreviewMode('in-situ')}
                className={`px-2.5 py-1 text-[11px] font-mono flex items-center gap-1 transition-colors ${
                  previewMode === 'in-situ'
                    ? 'bg-[#0A0A0B] text-[#F1EBDD] font-medium'
                    : 'text-neutral-600 hover:text-black'
                }`}
                title="Render In-Situ directly on the live product module template"
              >
                <Eye size={12} />
                <span>IN-SITU</span>
              </button>
              <button
                onClick={() => setPreviewMode('split')}
                className={`px-2.5 py-1 text-[11px] font-mono flex items-center gap-1 transition-colors ${
                  previewMode === 'split'
                    ? 'bg-[#0A0A0B] text-[#F1EBDD] font-medium'
                    : 'text-neutral-600 hover:text-black'
                }`}
                title="Side-by-side comparison on identical typography styles"
              >
                <Columns size={12} />
                <span>SPLIT VIEW</span>
              </button>
            </div>
          )}

          {/* Tone Selector */}
          <div className="flex items-center gap-1.5 text-[11px] font-mono">
            <span className="text-neutral-500 uppercase">TONE:</span>
            <select
              value={selectedTone}
              onChange={(e) => {
                const newTone = e.target.value;
                setSelectedTone(newTone);
                handleGenerate(newTone);
              }}
              className="bg-white border border-[#0A0A0B]/20 px-2 py-1 text-[11px] focus:outline-none cursor-pointer font-sans"
            >
              {tones.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label} ({t.badge})
                </option>
              ))}
            </select>
          </div>

          {/* Style Customizer Toggle Button */}
          <button
            onClick={() => setIsStyleCustomizerOpen(!isStyleCustomizerOpen)}
            className={`px-2.5 py-1 text-[11px] font-mono uppercase flex items-center gap-1 border transition-colors ${
              isStyleCustomizerOpen
                ? 'bg-[#0A0A0B] text-[#F1EBDD] border-[#0A0A0B]'
                : 'bg-white border-[#0A0A0B]/20 text-neutral-700 hover:border-[#0A0A0B]'
            }`}
            title="Adjust template typography fonts and color palette"
          >
            <Palette size={12} />
            <span>FONTS & COLORS</span>
            {isStyleCustomizerOpen ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
          </button>

          {/* AI Brand Auditor Toggle Button */}
          <button
            onClick={() => setIsAuditorOpen(!isAuditorOpen)}
            className={`px-2.5 py-1 text-[11px] font-mono uppercase flex items-center gap-1.5 border transition-colors ${
              isAuditorOpen
                ? 'bg-[#4A0E17] text-[#F1EBDD] border-[#4A0E17] font-bold shadow-xs'
                : 'bg-white border-[#0A0A0B]/20 text-[#4A0E17] hover:border-[#4A0E17]'
            }`}
            title="Audit description & meta-copy against ASORA brand manifesto rules"
          >
            <ShieldAlert size={12} className={isAuditorOpen ? 'text-amber-300' : 'text-[#4A0E17]'} />
            <span>BRAND AUDITOR</span>
            {isAuditorOpen ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
          </button>
        </div>

        {/* Right side: Regenerate & Text Editor triggers */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleGenerate(selectedTone)}
            disabled={isGenerating}
            className="px-3 py-1.5 bg-[#0A0A0B] text-[#F1EBDD] text-[11px] font-mono uppercase tracking-wider font-semibold hover:bg-[#2A2B2E] transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            <Wand2 size={12} className={isGenerating ? 'animate-spin' : ''} />
            <span>{isGenerating ? 'GENERATING...' : 'REGENERATE'}</span>
          </button>

          <button
            onClick={() => setIsEditorOpen(!isEditorOpen)}
            className="px-2.5 py-1.5 border border-[#0A0A0B]/20 bg-white text-[11px] font-mono uppercase text-neutral-700 hover:border-[#0A0A0B] transition-colors flex items-center gap-1"
            title="Inspect / Edit text live"
          >
            <Edit3 size={12} />
            <span>{isEditorOpen ? 'CLOSE' : 'EDIT'}</span>
            {isEditorOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
        </div>
      </div>

      {/* 3. Notification Toast */}
      {applyNotification && (
        <div className="mt-2.5 p-2 bg-emerald-900 text-[#F1EBDD] text-xs flex items-center gap-2 font-mono">
          <Check size={14} className="text-emerald-400" />
          <span>{applyNotification}</span>
        </div>
      )}

      {/* 4. Font & Color Style Controls Drawer */}
      {isStyleCustomizerOpen && (
        <div className="mt-4 pt-4 border-t border-[#0A0A0B]/10 bg-[#FAF8F5] p-4 border border-[#0A0A0B]/15 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#0A0A0B]/10">
            <span className="font-mono text-[10px] tracking-widest uppercase font-bold text-[#0A0A0B] flex items-center gap-1.5">
              <Type size={12} />
              TEMPLATE TYPOGRAPHY & COLOR STYLE CONTROLS
            </span>
            <span className="text-[10px] text-neutral-500 font-mono">
              Live CSS rendering on actual template
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {/* Font Hierarchy Preset */}
            <div>
              <label className="text-[10px] font-mono uppercase text-neutral-600 block mb-1.5 font-semibold">
                FONT FAMILY HIERARCHY
              </label>
              <div className="space-y-1.5">
                {fontStyles.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setTemplateFontStyle(f.id)}
                    className={`w-full text-left p-2 border transition-all text-xs ${
                      templateFontStyle === f.id
                        ? 'border-[#0A0A0B] bg-[#0A0A0B] text-[#F1EBDD] font-medium shadow-xs'
                        : 'border-[#0A0A0B]/15 bg-white text-neutral-700 hover:border-[#0A0A0B]'
                    }`}
                  >
                    <div className="font-mono text-[10px] uppercase font-bold">{f.name}</div>
                    <div className="text-[9px] opacity-75 mt-0.5">{f.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Template Surface Palette */}
            <div>
              <label className="text-[10px] font-mono uppercase text-neutral-600 block mb-1.5 font-semibold">
                TEMPLATE COLOR PALETTE
              </label>
              <div className="space-y-1.5">
                {surfaceColors.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setTemplateColorSurface(c.id)}
                    className={`w-full text-left p-2 border transition-all flex items-center justify-between ${
                      templateColorSurface === c.id
                        ? 'border-[#0A0A0B] ring-1 ring-[#0A0A0B] font-bold'
                        : 'border-[#0A0A0B]/15 bg-white text-neutral-700 hover:border-[#0A0A0B]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0"
                        style={{ backgroundColor: c.bgHex }}
                      />
                      <span className="font-mono text-[10px]">{c.label}</span>
                    </div>
                    {templateColorSurface === c.id && <Check size={12} className="text-[#4A0E17]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Font Sizing */}
            <div>
              <label className="text-[10px] font-mono uppercase text-neutral-600 block mb-1.5 font-semibold">
                BODY FONT SIZING
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'compact' as TemplateFontSize, label: 'COMPACT', size: '13px' },
                  { id: 'standard' as TemplateFontSize, label: 'STANDARD', size: '14px' },
                  { id: 'generous' as TemplateFontSize, label: 'EDITORIAL', size: '15px' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setTemplateFontSize(s.id)}
                    className={`p-2 text-center border font-mono transition-all ${
                      templateFontSize === s.id
                        ? 'border-[#0A0A0B] bg-[#0A0A0B] text-[#F1EBDD] font-bold'
                        : 'border-[#0A0A0B]/15 bg-white text-neutral-700 hover:border-[#0A0A0B]'
                    }`}
                  >
                    <div className="text-[10px]">{s.label}</div>
                    <div className="text-[9px] opacity-70 mt-0.5">{s.size}</div>
                  </button>
                ))}
              </div>

              {/* Line Height */}
              <label className="text-[10px] font-mono uppercase text-neutral-600 block mt-4 mb-1.5 font-semibold">
                LINE LEADING (SPACING)
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'compact' as TemplateLineHeight, label: 'TIGHT', height: '1.45' },
                  { id: 'balanced' as TemplateLineHeight, label: 'BALANCED', height: '1.6' },
                  { id: 'relaxed' as TemplateLineHeight, label: 'RELAXED', height: '1.8' },
                ].map((lh) => (
                  <button
                    key={lh.id}
                    onClick={() => setTemplateLineHeight(lh.id)}
                    className={`p-2 text-center border font-mono transition-all ${
                      templateLineHeight === lh.id
                        ? 'border-[#0A0A0B] bg-[#0A0A0B] text-[#F1EBDD] font-bold'
                        : 'border-[#0A0A0B]/15 bg-white text-neutral-700 hover:border-[#0A0A0B]'
                    }`}
                  >
                    <div className="text-[10px]">{lh.label}</div>
                    <div className="text-[9px] opacity-70 mt-0.5">{lh.height}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Preview Sample & Reset */}
            <div className="flex flex-col justify-between p-3 bg-white border border-[#0A0A0B]/15 text-[11px]">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-500 block mb-1">
                  RENDER SAMPLE
                </span>
                <p className="font-editorial italic text-neutral-800 text-xs mb-1">
                  Volume 01 — Architectural Form
                </p>
                <p className="font-sans text-[11px] text-neutral-600 leading-relaxed line-clamp-3">
                  Cut from dense 500+ GSM loopback combed cotton with tactile presence.
                </p>
              </div>

              <div className="pt-2 border-t border-[#0A0A0B]/10 flex items-center justify-between text-[10px] font-mono">
                <button
                  onClick={() => {
                    setTemplateFontStyle('hybrid');
                    setTemplateFontSize('standard');
                    setTemplateColorSurface('ivory');
                    setTemplateLineHeight('balanced');
                  }}
                  className="text-neutral-500 hover:text-black underline"
                >
                  Reset Styles
                </button>
                <span className="text-emerald-700 font-medium">Applied Live</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Live Text Customizer / Editor Drawer */}
      {isEditorOpen && (
        <div className="mt-4 pt-4 border-t border-[#0A0A0B]/10 space-y-3 bg-[#F1EBDD]/40 p-4 border border-[#0A0A0B]/10 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold uppercase text-[#0A0A0B] flex items-center gap-1.5">
              <Edit3 size={13} />
              LIVE COPY CUSTOMIZER (UPDATES TEMPLATE INSTANTLY AS YOU TYPE)
            </span>
            <span className="text-neutral-500 text-[10px]">
              Model: {currentDraft.source} · Generated: {currentDraft.generatedAt}
            </span>
          </div>

          <div>
            <label className="text-[10px] font-mono uppercase text-neutral-600 block mb-1 font-semibold">
              EDITORIAL SUBTITLE (Cormorant Garamond italic)
            </label>
            <input
              type="text"
              value={currentDraft.subtitle}
              onChange={(e) => updateProductAiDraft(product.id, { subtitle: e.target.value })}
              className="w-full bg-white border border-[#0A0A0B]/20 p-2 text-xs font-editorial italic text-neutral-800 focus:outline-none focus:border-[#0A0A0B]"
            />
          </div>

          <div>
            <label className="text-[10px] font-mono uppercase text-neutral-600 block mb-1 font-semibold">
              PRIMARY PRODUCT DESCRIPTION (Body Copy on Actual Template)
            </label>
            <textarea
              rows={3}
              value={currentDraft.description}
              onChange={(e) => updateProductAiDraft(product.id, { description: e.target.value })}
              className="w-full bg-white border border-[#0A0A0B]/20 p-2.5 text-xs text-neutral-800 leading-relaxed font-sans focus:outline-none focus:border-[#0A0A0B]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-mono uppercase text-neutral-600 block mb-1 font-semibold">
                FIT & SILHOUETTE NOTES
              </label>
              <textarea
                rows={2}
                value={currentDraft.fitNotes || ''}
                onChange={(e) => updateProductAiDraft(product.id, { fitNotes: e.target.value })}
                className="w-full bg-white border border-[#0A0A0B]/20 p-2 text-xs text-neutral-800 focus:outline-none focus:border-[#0A0A0B]"
              />
            </div>
            <div>
              <label className="text-[10px] font-mono uppercase text-neutral-600 block mb-1 font-semibold">
                SUMMARY KICKER
              </label>
              <textarea
                rows={2}
                value={currentDraft.shortDescription || ''}
                onChange={(e) => updateProductAiDraft(product.id, { shortDescription: e.target.value })}
                className="w-full bg-white border border-[#0A0A0B]/20 p-2 text-xs text-neutral-800 focus:outline-none focus:border-[#0A0A0B]"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-[#0A0A0B]/10">
            <button
              onClick={handleRevert}
              className="px-3 py-1.5 border border-[#0A0A0B]/30 bg-white text-[10px] font-mono uppercase text-neutral-600 hover:text-black flex items-center gap-1"
            >
              <RotateCcw size={12} />
              <span>RESET TO ATELIER ORIGINAL</span>
            </button>

            <button
              onClick={handleApplyLive}
              className="px-4 py-1.5 bg-[#4A0E17] text-[#F1EBDD] text-[11px] font-mono uppercase tracking-wider font-semibold hover:bg-[#0A0A0B] transition-colors flex items-center gap-1.5"
            >
              <Check size={13} />
              <span>COMMIT TO LIVE STORE CATALOG</span>
            </button>
          </div>
        </div>
      )}

      {/* 6. AI Brand Auditor Drawer / Modal */}
      {isAuditorOpen && (
        <AiBrandAuditor
          product={product}
          isOpen={isAuditorOpen}
          onClose={() => setIsAuditorOpen(false)}
        />
      )}
    </div>
  );
};

export default AiDescriptionPreviewBar;
