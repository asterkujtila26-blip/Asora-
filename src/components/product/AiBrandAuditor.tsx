import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product, BrandAuditResult, BrandAuditIssue } from '../../types/store';
import { AsoraEmblem } from '../brand/AsoraEmblem';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  Check,
  RefreshCw,
  ArrowRight,
  BookOpen,
  X,
  Wand2,
  Sliders,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  FileCheck,
} from 'lucide-react';

interface AiBrandAuditorProps {
  product: Product;
  isOpen?: boolean;
  onClose?: () => void;
  onApplyRevision?: (revised: { subtitle?: string; description: string; shortDescription?: string }) => void;
}

export const AiBrandAuditor: React.FC<AiBrandAuditorProps> = ({
  product,
  isOpen = true,
  onClose,
  onApplyRevision,
}) => {
  const { updateProductAiDraft, isAiPreviewActive, setIsAiPreviewActive } = useStore();

  const currentSubtitle = (isAiPreviewActive && product.aiCopyDraft?.subtitle) || product.subtitle;
  const currentDescription =
    (isAiPreviewActive && product.aiCopyDraft?.description) || product.originalDescription || product.description;

  const [textToAudit, setTextToAudit] = useState(currentDescription);
  const [subtitleToAudit, setSubtitleToAudit] = useState(currentSubtitle);
  const [metaDescriptionToAudit, setMetaDescriptionToAudit] = useState(
    `${currentSubtitle}. ${product.fabricComposition}. ${product.shortDescription}`
  );

  const [auditResult, setAuditResult] = useState<BrandAuditResult | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'audit' | 'guidelines' | 'editor'>('audit');
  const [appliedNotification, setAppliedNotification] = useState<string | null>(null);
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);

  // Sync with product when active draft changes
  useEffect(() => {
    setTextToAudit(currentDescription);
    setSubtitleToAudit(currentSubtitle);
  }, [currentDescription, currentSubtitle]);

  // Run audit against server endpoint
  const runAudit = async (
    text = textToAudit,
    subtitle = subtitleToAudit,
    metaDesc = metaDescriptionToAudit
  ) => {
    setIsAuditing(true);
    try {
      const res = await fetch('/api/audit-brand-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          subtitle,
          metaDescription: metaDesc,
          productName: product.name,
          category: product.category,
          fabric: product.fabricComposition,
          weightGsm: product.weightGsm,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.success) {
        setAuditResult(data);
      }
    } catch (err) {
      console.error('Failed to run brand audit:', err);
    } finally {
      setIsAuditing(false);
    }
  };

  // Run initial audit on mount
  useEffect(() => {
    runAudit(currentDescription, currentSubtitle);
  }, [product.id]);

  // One-click replace a single flagged phrase
  const handleReplaceIssue = (issue: BrandAuditIssue) => {
    if (!issue.suggestedReplacement) return;
    const regex = new RegExp(issue.flaggedText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    const newText = textToAudit.replace(regex, issue.suggestedReplacement);
    setTextToAudit(newText);

    // Update in store draft immediately
    updateProductAiDraft(product.id, { description: newText });

    setAppliedNotification(`Replaced "${issue.flaggedText}" with "${issue.suggestedReplacement}"`);
    setTimeout(() => setAppliedNotification(null), 3000);

    // Re-run audit with new text
    runAudit(newText, subtitleToAudit, metaDescriptionToAudit);
  };

  // Apply complete AI-generated atelier revision
  const handleApplyFullRevision = () => {
    if (!auditResult?.revisedCopy) return;
    const rev = auditResult.revisedCopy;

    setTextToAudit(rev.description);
    if (rev.subtitle) setSubtitleToAudit(rev.subtitle);

    updateProductAiDraft(product.id, {
      description: rev.description,
      subtitle: rev.subtitle || currentSubtitle,
      shortDescription: rev.shortDescription,
    });

    setIsAiPreviewActive(true);

    if (onApplyRevision) {
      onApplyRevision({
        subtitle: rev.subtitle,
        description: rev.description,
        shortDescription: rev.shortDescription,
      });
    }

    setAppliedNotification('Applied 100% compliant atelier revision to product!');
    setTimeout(() => setAppliedNotification(null), 3500);

    runAudit(rev.description, rev.subtitle || currentSubtitle, rev.metaDescription);
  };

  if (!isOpen) return null;

  const score = auditResult?.score ?? 0;
  const isCompliant = score >= 90;
  const needsRevision = score >= 70 && score < 90;

  return (
    <div className="w-full bg-white/95 border border-[#0A0A0B]/20 p-5 sm:p-6 shadow-md transition-all my-6 text-[#0A0A0B]">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#0A0A0B]/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#0A0A0B] text-[#F1EBDD] flex items-center justify-center shrink-0">
            {isCompliant ? (
              <ShieldCheck size={18} className="text-emerald-400" />
            ) : (
              <ShieldAlert size={18} className="text-amber-400" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono tracking-widest uppercase font-bold text-[#0A0A0B]">
                AI BRAND AUDITOR
              </span>
              <span className="text-[9px] font-mono uppercase bg-[#0A0A0B] text-[#F1EBDD] px-2 py-0.5 font-bold tracking-wider">
                MANIFESTO COMPLIANCE ENGINE
              </span>
            </div>
            <p className="text-[11px] text-neutral-600 mt-0.5">
              Audits copy against ASORA Manifesto: “More Than Clothing. A Mindset.” & “Quiet Confidence.”
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => runAudit()}
            disabled={isAuditing}
            className="px-3 py-1.5 bg-[#0A0A0B] text-[#F1EBDD] text-[11px] font-mono uppercase tracking-wider font-semibold hover:bg-[#2A2B2E] transition-colors flex items-center gap-1.5 disabled:opacity-50"
            title="Re-run compliance audit on current copy"
          >
            <RefreshCw size={11} className={isAuditing ? 'animate-spin' : ''} />
            <span>{isAuditing ? 'AUDITING...' : 'RE-AUDIT'}</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 border border-[#0A0A0B]/20 hover:border-[#0A0A0B] text-neutral-600 hover:text-black transition-colors"
              aria-label="Close Brand Auditor"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#0A0A0B]/10 pt-3 pb-2 text-xs font-mono">
        <button
          onClick={() => setActiveTab('audit')}
          className={`px-3 py-1 border transition-colors flex items-center gap-1.5 ${
            activeTab === 'audit'
              ? 'bg-[#0A0A0B] text-[#F1EBDD] border-[#0A0A0B] font-bold'
              : 'bg-white border-[#0A0A0B]/20 text-neutral-700 hover:border-[#0A0A0B]'
          }`}
        >
          <FileCheck size={12} />
          <span>AUDIT SCORE & ISSUES ({auditResult?.issues?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab('editor')}
          className={`px-3 py-1 border transition-colors flex items-center gap-1.5 ${
            activeTab === 'editor'
              ? 'bg-[#0A0A0B] text-[#F1EBDD] border-[#0A0A0B] font-bold'
              : 'bg-white border-[#0A0A0B]/20 text-neutral-700 hover:border-[#0A0A0B]'
          }`}
        >
          <Sliders size={12} />
          <span>LIVE AUDIT LAB</span>
        </button>

        <button
          onClick={() => setActiveTab('guidelines')}
          className={`px-3 py-1 border transition-colors flex items-center gap-1.5 ${
            activeTab === 'guidelines'
              ? 'bg-[#0A0A0B] text-[#F1EBDD] border-[#0A0A0B] font-bold'
              : 'bg-white border-[#0A0A0B]/20 text-neutral-700 hover:border-[#0A0A0B]'
          }`}
        >
          <BookOpen size={12} />
          <span>MANIFESTO RULES</span>
        </button>
      </div>

      {/* Notification Toast */}
      {appliedNotification && (
        <div className="my-3 p-2 bg-emerald-900 text-[#F1EBDD] text-xs flex items-center gap-2 font-mono animate-in fade-in">
          <Check size={14} className="text-emerald-400" />
          <span>{appliedNotification}</span>
        </div>
      )}

      {/* TAB 1: AUDIT SCORE & HIGHLIGHTED ISSUES */}
      {activeTab === 'audit' && (
        <div className="pt-4 space-y-6">
          {/* Executive Score Card */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-[#FAF8F5] border border-[#0A0A0B]/10 p-4 sm:p-5">
            {/* Score Ring / Pill */}
            <div className="md:col-span-4 flex items-center gap-4 border-r border-[#0A0A0B]/10 pr-4">
              <div
                className={`w-16 h-16 rounded-full flex flex-col items-center justify-center shrink-0 border-2 font-mono font-bold shadow-sm ${
                  isCompliant
                    ? 'border-emerald-700 bg-emerald-50 text-emerald-900'
                    : needsRevision
                    ? 'border-amber-600 bg-amber-50 text-amber-900'
                    : 'border-[#4A0E17] bg-[#4A0E17]/10 text-[#4A0E17]'
                }`}
              >
                <span className="text-xl leading-none">{score}%</span>
                <span className="text-[8px] uppercase tracking-wider opacity-75 mt-0.5">COMPLIANCE</span>
              </div>

              <div>
                <span
                  className={`text-[10px] font-mono uppercase px-2 py-0.5 font-bold tracking-widest inline-block ${
                    isCompliant
                      ? 'bg-emerald-900 text-white'
                      : needsRevision
                      ? 'bg-amber-800 text-white'
                      : 'bg-[#4A0E17] text-white'
                  }`}
                >
                  {auditResult?.verdict || 'CALCULATING...'}
                </span>
                <p className="text-[11px] text-neutral-600 mt-1 font-sans leading-tight">
                  {auditResult?.issues?.length === 0
                    ? 'Zero manifesto deviations detected.'
                    : `${auditResult?.issues?.length} issue${(auditResult?.issues?.length || 0) > 1 ? 's' : ''} require editorial adjustment.`}
                </p>
              </div>
            </div>

            {/* Executive Assessment Summary */}
            <div className="md:col-span-8 space-y-1.5 pl-0 md:pl-2">
              <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-500 font-bold block">
                AUDITOR ASSESSMENT
              </span>
              <p className="text-xs text-neutral-800 leading-relaxed font-sans">
                {auditResult?.summary || 'Evaluating copy structure against ASORA manifesto principles...'}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1 text-[10px] font-mono text-neutral-500">
                <span>Words: {auditResult?.metrics?.wordCount || textToAudit.split(' ').length}</span>
                <span>·</span>
                <span>Exclamations: {auditResult?.metrics?.exclamationCount || 0} (Strict Limit: 0)</span>
                <span>·</span>
                <span>Hype Clichés: {auditResult?.metrics?.prohibitedWordCount || 0}</span>
                <span>·</span>
                <span>Engine: {auditResult?.source || 'deterministic-rules'}</span>
              </div>
            </div>
          </div>

          {/* 5-Pillar Compliance Metrics */}
          {auditResult?.metrics && (
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block mb-2 font-bold">
                BRAND PILLAR BREAKDOWN
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
                {[
                  { label: 'QUIET CONFIDENCE', score: auditResult.metrics.quietConfidenceScore },
                  { label: 'TEXTILE PRECISION', score: auditResult.metrics.textilePrecisionScore },
                  { label: 'ARCHITECTURAL RESTRAINT', score: auditResult.metrics.architecturalRestraintScore },
                  { label: 'EMBLEM INTEGRITY', score: auditResult.metrics.brandIntegrityScore },
                  { label: 'FORMAT DISCIPLINE', score: auditResult.metrics.formattingScore },
                ].map((pillar) => (
                  <div key={pillar.label} className="p-2.5 bg-white border border-[#0A0A0B]/10 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-neutral-500 uppercase">{pillar.label}</span>
                      <span className="text-[10px] font-bold">{pillar.score}%</span>
                    </div>
                    <div className="w-full bg-neutral-200 h-1.5 overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          pillar.score >= 90 ? 'bg-emerald-600' : pillar.score >= 70 ? 'bg-amber-600' : 'bg-[#4A0E17]'
                        }`}
                        style={{ width: `${pillar.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Highlighted Non-Compliant Copy View */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 font-bold">
                INLINE HIGHLIGHTER (PROHIBITED & FLAGGED TERMS)
              </span>
              <span className="text-[10px] text-neutral-500 font-mono">
                Click any highlighted badge to inspect or replace
              </span>
            </div>

            {/* The Text Box with Highlighted Terms */}
            <div className="p-4 bg-white border border-[#0A0A0B]/15 text-xs sm:text-sm leading-relaxed font-sans text-neutral-900 rounded-xs">
              <p className="font-editorial italic text-xs text-neutral-600 mb-2 pb-2 border-b border-[#0A0A0B]/10">
                Subtitle: {subtitleToAudit}
              </p>
              <div>
                {(() => {
                  if (!auditResult?.issues || auditResult.issues.length === 0) {
                    return <span>{textToAudit}</span>;
                  }

                  // Build highlighted fragments
                  const flags = auditResult.issues.map((i) => i.flaggedText).filter(Boolean);
                  if (flags.length === 0) return <span>{textToAudit}</span>;

                  const regex = new RegExp(`(${flags.map((f) => f.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
                  const parts = textToAudit.split(regex);

                  return parts.map((part, index) => {
                    const matchedIssue = auditResult.issues.find(
                      (i) => i.flaggedText.toLowerCase() === part.toLowerCase()
                    );

                    if (matchedIssue) {
                      const isSelected = selectedIssueId === matchedIssue.id;
                      return (
                        <span
                          key={index}
                          onClick={() => setSelectedIssueId(matchedIssue.id)}
                          className={`cursor-pointer px-1 py-0.5 mx-0.5 rounded text-xs font-mono font-bold transition-all ${
                            matchedIssue.severity === 'high'
                              ? 'bg-rose-100 text-rose-900 border-b-2 border-rose-600 hover:bg-rose-200'
                              : matchedIssue.severity === 'medium'
                              ? 'bg-amber-100 text-amber-900 border-b-2 border-amber-600 hover:bg-amber-200'
                              : 'bg-blue-100 text-blue-900 border-b-2 border-blue-500 hover:bg-blue-200'
                          } ${isSelected ? 'ring-2 ring-black' : ''}`}
                          title={`Click to inspect: ${matchedIssue.ruleTitle}`}
                        >
                          {part}
                          <span className="ml-1 text-[9px] uppercase opacity-75">
                            [{matchedIssue.ruleTitle.split(' ')[0]}]
                          </span>
                        </span>
                      );
                    }
                    return <span key={index}>{part}</span>;
                  });
                })()}
              </div>
            </div>
          </div>

          {/* Issue Cards & Revision Actions */}
          {auditResult?.issues && auditResult.issues.length > 0 && (
            <div className="space-y-3">
              <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 font-bold block">
                FLAGGED DEVIATIONS & INSTANT REPLACEMENTS ({auditResult.issues.length})
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {auditResult.issues.map((issue) => (
                  <div
                    key={issue.id}
                    className={`p-3.5 border transition-all text-xs space-y-2 bg-white ${
                      issue.severity === 'high'
                        ? 'border-rose-300 shadow-2xs'
                        : issue.severity === 'medium'
                        ? 'border-amber-300 shadow-2xs'
                        : 'border-neutral-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <AlertTriangle
                          size={13}
                          className={
                            issue.severity === 'high'
                              ? 'text-rose-600'
                              : issue.severity === 'medium'
                              ? 'text-amber-600'
                              : 'text-neutral-500'
                          }
                        />
                        <span className="font-mono text-[10px] uppercase font-bold text-[#0A0A0B]">
                          {issue.ruleTitle}
                        </span>
                      </div>
                      <span
                        className={`text-[8px] font-mono uppercase px-1.5 py-0.2 font-bold ${
                          issue.severity === 'high'
                            ? 'bg-rose-900 text-white'
                            : issue.severity === 'medium'
                            ? 'bg-amber-800 text-white'
                            : 'bg-neutral-800 text-white'
                        }`}
                      >
                        {issue.severity} priority
                      </span>
                    </div>

                    <div className="font-mono text-[11px] bg-neutral-100 p-1.5 text-neutral-800">
                      Flagged: <span className="line-through text-rose-700 font-bold">"{issue.flaggedText}"</span>
                    </div>

                    <p className="text-[11px] text-neutral-600 leading-relaxed font-sans">
                      {issue.explanation}
                    </p>

                    {issue.suggestedReplacement && (
                      <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-2">
                        <div className="text-[10px] font-mono text-emerald-800">
                          Recommended: <span className="font-bold">"{issue.suggestedReplacement}"</span>
                        </div>
                        <button
                          onClick={() => handleReplaceIssue(issue)}
                          className="px-2.5 py-1 bg-[#0A0A0B] text-[#F1EBDD] text-[10px] font-mono uppercase hover:bg-[#2A2B2E] transition-colors flex items-center gap-1 shrink-0 font-bold"
                          title="Apply this recommendation into copy"
                        >
                          <Check size={11} />
                          <span>APPLY FIX</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended Compliant Atelier Revision */}
          {auditResult?.revisedCopy && (
            <div className="bg-[#FAF8F5] border border-[#0A0A0B]/20 p-4 sm:p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#0A0A0B]/10">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-[#4A0E17]" />
                  <span className="text-xs font-mono uppercase font-bold text-[#0A0A0B]">
                    CERTIFIED ATELIER COMPLIANT REVISION (100% BRANDBOOK ALIGNED)
                  </span>
                </div>
                <button
                  onClick={handleApplyFullRevision}
                  className="px-4 py-1.5 bg-[#4A0E17] text-[#F1EBDD] text-[11px] font-mono uppercase font-semibold hover:bg-black transition-colors flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
                >
                  <Wand2 size={12} />
                  <span>APPLY REVISION TO PRODUCT</span>
                </button>
              </div>

              <div className="space-y-2 text-xs">
                {auditResult.revisedCopy.subtitle && (
                  <div>
                    <span className="text-[9px] font-mono uppercase text-neutral-500 block">
                      REVISED SUBTITLE (Cormorant Garamond italic)
                    </span>
                    <p className="font-editorial italic text-sm text-[#0A0A0B]">
                      {auditResult.revisedCopy.subtitle}
                    </p>
                  </div>
                )}

                <div>
                  <span className="text-[9px] font-mono uppercase text-neutral-500 block">
                    REVISED DESCRIPTION (Plus Jakarta Sans body)
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-neutral-800 leading-relaxed">
                    {auditResult.revisedCopy.description}
                  </p>
                </div>

                {auditResult.revisedCopy.metaDescription && (
                  <div className="pt-2 border-t border-[#0A0A0B]/10">
                    <span className="text-[9px] font-mono uppercase text-neutral-500 block">
                      SEO META-COPY (Under 160 Characters)
                    </span>
                    <p className="font-mono text-[11px] text-neutral-600">
                      {auditResult.revisedCopy.metaDescription}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: LIVE AUDIT LAB (TYPE OR PASTE CUSTOM TEXT TO AUDIT) */}
      {activeTab === 'editor' && (
        <div className="pt-4 space-y-4">
          <div className="text-xs text-neutral-600">
            Edit text live below or paste custom copy (product description, social caption, or SEO meta) to test against ASORA manifesto rules in real-time.
          </div>

          <div>
            <label className="text-[10px] font-mono uppercase text-neutral-600 block mb-1 font-bold">
              EDITORIAL SUBTITLE (4-7 WORDS)
            </label>
            <input
              type="text"
              value={subtitleToAudit}
              onChange={(e) => setSubtitleToAudit(e.target.value)}
              className="w-full bg-white border border-[#0A0A0B]/20 p-2 text-xs font-editorial italic focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="text-[10px] font-mono uppercase text-neutral-600 block mb-1 font-bold">
              PRODUCT DESCRIPTION BODY (EVALUATES FOR HYPE, EXCLAMATION POINTS, & TACTILITY)
            </label>
            <textarea
              rows={5}
              value={textToAudit}
              onChange={(e) => setTextToAudit(e.target.value)}
              className="w-full bg-white border border-[#0A0A0B]/20 p-2.5 text-xs text-neutral-800 leading-relaxed font-sans focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="text-[10px] font-mono uppercase text-neutral-600 block mb-1 font-bold">
              SEO META-COPY
            </label>
            <input
              type="text"
              value={metaDescriptionToAudit}
              onChange={(e) => setMetaDescriptionToAudit(e.target.value)}
              className="w-full bg-white border border-[#0A0A0B]/20 p-2 text-xs font-mono text-neutral-700 focus:outline-none focus:border-black"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setTextToAudit(product.originalDescription || product.description);
                setSubtitleToAudit(product.subtitle);
                runAudit(product.originalDescription || product.description, product.subtitle);
              }}
              className="px-3 py-1.5 border border-[#0A0A0B]/20 text-[10px] font-mono uppercase text-neutral-600 hover:text-black flex items-center gap-1"
            >
              <RotateCcw size={11} />
              <span>RESET TO ATELIER BASELINE</span>
            </button>

            <button
              onClick={() => {
                runAudit(textToAudit, subtitleToAudit, metaDescriptionToAudit);
                setActiveTab('audit');
              }}
              className="px-4 py-2 bg-[#0A0A0B] text-[#F1EBDD] text-xs font-mono uppercase tracking-wider font-semibold hover:bg-[#2A2B2E] transition-colors flex items-center gap-1.5"
            >
              <RefreshCw size={12} />
              <span>RUN AUDIT ON CUSTOM TEXT</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: ASORA BRAND MANIFESTO GUIDELINES REFERENCE */}
      {activeTab === 'guidelines' && (
        <div className="pt-4 space-y-4 text-xs">
          <div className="p-4 bg-[#0A0A0B] text-[#F1EBDD] space-y-2">
            <div className="flex items-center gap-2">
              <AsoraEmblem size={20} color="#F1EBDD" />
              <span className="font-mono text-xs tracking-widest uppercase font-bold">
                THE ASORA CONSTITUTION // OFFICIAL COPYWRITING MANIFESTO
              </span>
            </div>
            <p className="font-editorial italic text-sm text-[#B9B6AE]">
              “MORE THAN CLOTHING. A MINDSET. Quiet confidence carried in the cut, the density of the weave, and self-possession.”
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white border border-[#0A0A0B]/10 space-y-2">
              <span className="font-mono text-[10px] uppercase font-bold text-rose-700 block">
                01. STRICT PROHIBITIONS (ANTI-HYPE)
              </span>
              <ul className="space-y-1.5 text-neutral-700 text-[11px] list-disc pl-4">
                <li><strong>Zero Exclamation Points:</strong> No "!" allowed anywhere. Calm conviction replaces forced excitement.</li>
                <li><strong>No Cheap Superlatives:</strong> Never use "must-have", "ultimate", "revolutionary", "game-changer", "jaw-dropping", "hottest", or "perfection".</li>
                <li><strong>No Urgency Triggers:</strong> Prohibited: "buy now", "limited time", "act fast", "don't miss out", "sale", "discount", "steal".</li>
                <li><strong>No Logo Degradation:</strong> The emblem is "The Pierced Horizon" satin-stitch threshold, never a "sticker" or "graphic".</li>
              </ul>
            </div>

            <div className="p-4 bg-white border border-[#0A0A0B]/10 space-y-2">
              <span className="font-mono text-[10px] uppercase font-bold text-emerald-800 block">
                02. MANDATORY ATELIER STANDARDS
              </span>
              <ul className="space-y-1.5 text-neutral-700 text-[11px] list-disc pl-4">
                <li><strong>Textile Density:</strong> Explicitly state fabric weight (e.g. "500+ GSM loopback combed cotton").</li>
                <li><strong>Architectural Stance:</strong> Emphasize sculptural drape, dropped shoulder seams, and raw studio daylight.</li>
                <li><strong>Unisex Discipline:</strong> Balanced tailored proportions crafted for personal cadence, not gendered tropes.</li>
                <li><strong>Subdued Pacing:</strong> 4-7 word editorial subtitles in Cormorant Garamond, paired with clean Plus Jakarta Sans.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiBrandAuditor;
