import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// API Endpoint for generating ASORA product descriptions
app.post('/api/generate-description', async (req, res) => {
  try {
    const {
      productName,
      category,
      color,
      fabric,
      weightGsm,
      fitType,
      brandingPlacement,
      tone = 'Quiet Luxury & Tactility',
      customPrompt,
    } = req.body;

    const toneInstructions: Record<string, string> = {
      'Quiet Luxury & Tactility':
        'Focus on the physical density of the fabric (e.g. 500+ GSM loopback terry), the tactile depth of satin-stitch embroidery, clean seams, and enduring longevity for daily wear without loud branding.',
      'Architectural & Brutalist':
        'Focus on monolithic silhouette geometry, dropped shoulder seams, structured collar posture, and dialogue with concrete Parisian architecture and muted studio shadows.',
      'Parisian Atelier Heritage':
        'Focus on Paris 2026 Volume 01 origins, considered European tailoring, French loopback cotton, and timeless essentials worn with quiet self-assurance.',
      'Minimalist Technical':
        'Focus on garment construction: twin-needle coverstitch, matte black two-way hardware, bonded clean edges, and functional ease of movement.',
      'Material Science & Fiber Density':
        'Focus on scientific textile physics: long-staple combed organic cotton polymer matrix, 500+ GSM areal weight distribution, dual-faced loopback sinker-loop geometry for thermal regulation, anisotropic tensile resilience, and yarn-dyed colorfastness.',
    };

    const selectedToneGuide =
      toneInstructions[tone] || toneInstructions['Quiet Luxury & Tactility'];

    const prompt = `
You are the senior editorial director and textile science curator for ASORA PARIS, the contemporary unisex street-luxury house established in 2026.
You are strictly guided by the authentic 11-page ASORA PARIS Brandbook and Garment Construction Guidelines:
- Official Brand Statement: "MORE THAN CLOTHING. A MINDSET."
- Guiding Philosophy: "QUIET CONFIDENCE."
- Sacred House Emblem: "THE PIERCED HORIZON" — an open geometric ring pierced cleanly by a vertical tapered blade, symbolizing an intentional threshold between presence and forward momentum.
- Collection: Volume 01 — Paris.
- Brand Color Architecture: Obsidian Black (#0A0A0B), Deep Navy (#0E1626), Charcoal (#2A2B2E), Stone Grey (#B9B6AE), Warm Ivory (#F1EBDD), and Burgundy (#4A0E17).
- Typography Discipline: Cormorant Garamond for editorial headings & titles; Plus Jakarta Sans for clean body copy.

Product Details:
- Name: ${productName}
- Category: ${category}
- Primary Color: ${color}
- Fabric: ${fabric} (${weightGsm ? weightGsm + ' GSM' : 'Heavyweight'})
- Fit: ${fitType}
- Branding Placement: ${brandingPlacement}
- Tone Direction: ${tone} (${selectedToneGuide})
${customPrompt ? `- Custom Directives: ${customPrompt}` : ''}

Strict Rules:
1. Embody quiet confidence, architectural restraint, and tactile substance.
2. Prohibit hype clichés, exclamation points, gold/flashy adjectives, or aggressive marketing jargon (NEVER use words like "ultimate", "revolution", "must-have", "perfection", "jaw-dropping").
3. Respect the official brand emblem: "The Pierced Horizon" satin-stitch mark placed with intention.
4. When describing textiles, integrate accurate textile science (sinker-loop structure, yarn twist, GSM mass calibration, breathability vs wind resistance).
5. Return ONLY a valid JSON object matching this schema:
   - "subtitle": A concise 4-7 word editorial subtitle (e.g. "Volume 01 — Architectural Silhouette")
   - "description": A cohesive 2-3 sentence luxury editorial product description (approx. 50-70 words) for the product detail page template.
   - "shortDescription": A single punchy summary line highlighting fabric weight and key cut.
   - "fitNotes": A 1-2 sentence description of how the piece drapes on the body.
   - "constructionHighlights": An array of 3-4 bullet strings describing construction details (e.g., "55mm satin-stitch Pierced Horizon on left chest", "Twin-needle topstitch seams", "Pre-washed loopback terry").
   - "careNote": A short sentence on how to preserve the piece.
`;

    const ai = getGeminiClient();

    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const text = response.text;
        if (text) {
          const parsed = JSON.parse(text);
          return res.json({
            success: true,
            source: 'gemini-3.8-flash',
            ...parsed,
          });
        }
      } catch (geminiError: any) {
        console.warn('Gemini API call encountered an error, falling back to brandbook engine:', geminiError?.message);
      }
    }

    // High-quality Brandbook Fallback generator if API key is not configured
    const fallbackCopy = generateBrandbookCopy(
      productName,
      category,
      color,
      fabric,
      weightGsm,
      fitType,
      brandingPlacement,
      tone
    );

    return res.json({
      success: true,
      source: 'brandbook-editorial-engine',
      ...fallbackCopy,
    });
  } catch (err: any) {
    console.error('Error generating description:', err);
    res.status(500).json({ error: 'Failed to generate product description' });
  }
});

// API Endpoint for AI Brand Auditor (compares copy against ASORA manifesto)
app.post('/api/audit-brand-copy', async (req, res) => {
  try {
    const {
      text = '',
      subtitle = '',
      metaDescription = '',
      productName = 'ASORA Product',
      category = 'Essentials',
      fabric = 'Combed Cotton Loopback Terry',
      weightGsm = 500,
    } = req.body;

    const fullContent = `${subtitle} ${text} ${metaDescription}`.trim();

    // Fast deterministic rule analysis
    const heuristicIssues: any[] = [];
    const lower = fullContent.toLowerCase();

    // 1. Exclamation points check
    const exclamationMatches = fullContent.match(/!/g);
    if (exclamationMatches) {
      heuristicIssues.push({
        id: `iss-excl-${Date.now()}`,
        type: 'exclamation_mark',
        severity: 'high',
        flaggedText: '!',
        ruleTitle: 'Zero-Exclamation Discipline',
        explanation:
          'ASORA Manifesto dictates quiet self-assurance. Exclamation points represent manufactured hype and are strictly prohibited across all house channels.',
        suggestedReplacement: '.',
      });
    }

    // 2. Prohibited Hype Clichés
    const hypeWords: { word: string; replace: string }[] = [
      { word: 'must-have', replace: 'foundational essential' },
      { word: 'must have', replace: 'foundational essential' },
      { word: 'ultimate', replace: 'considered' },
      { word: 'revolutionary', replace: 'architectural' },
      { word: 'revolution', replace: 'evolution' },
      { word: 'game-changer', replace: 'considered shift' },
      { word: 'game changer', replace: 'considered shift' },
      { word: 'perfection', replace: 'precision' },
      { word: 'jaw-dropping', replace: 'sculptural' },
      { word: 'jaw dropping', replace: 'sculptural' },
      { word: 'viral', replace: 'enduring' },
      { word: 'hottest', replace: 'signature' },
      { word: 'drip', replace: 'presence' },
      { word: 'cop', replace: 'acquire' },
      { word: 'flex', replace: 'wear with quiet confidence' },
    ];

    hypeWords.forEach(({ word, replace }) => {
      if (lower.includes(word)) {
        heuristicIssues.push({
          id: `iss-hype-${word}-${Date.now()}`,
          type: 'prohibited_cliche',
          severity: 'high',
          flaggedText: word,
          ruleTitle: 'Anti-Hype Manifesto Clause',
          explanation: `"${word}" breaches the ASORA principle: "Nothing needs to shout." Replace loud consumer hype with restrained substance.`,
          suggestedReplacement: replace,
        });
      }
    });

    // 3. Aggressive Urgency & Sales Vocabulary
    const urgencyWords: { word: string; replace: string }[] = [
      { word: 'buy now', replace: 'experience Volume 01' },
      { word: 'limited time', replace: 'edition run' },
      { word: 'act fast', replace: 'available at the atelier' },
      { word: "don't miss out", replace: 'crafted in limited numbers' },
      { word: 'hurry', replace: 'available now' },
      { word: 'sale', replace: 'private list' },
      { word: 'cheap', replace: 'accessible luxury' },
      { word: 'discount', replace: 'privilege allocation' },
      { word: 'steal', replace: 'considered investment' },
      { word: 'bargain', replace: 'lasting value' },
      { word: 'flash sale', replace: 'seasonal presentation' },
    ];

    urgencyWords.forEach(({ word, replace }) => {
      if (lower.includes(word)) {
        heuristicIssues.push({
          id: `iss-urg-${word}-${Date.now()}`,
          type: 'aggressive_urgency',
          severity: 'high',
          flaggedText: word,
          ruleTitle: 'Quiet Luxury Dignity Clause',
          explanation: `Aggressive urgency ("${word}") degrades house prestige. ASORA does not pressure clients with retail marketing tropes.`,
          suggestedReplacement: replace,
        });
      }
    });

    // 4. Emblem Misnomer Check
    const emblemMisnomers = ['sticker', 'decal', 'random logo', 'stamp', 'random print'];
    emblemMisnomers.forEach((misnomer) => {
      if (lower.includes(misnomer)) {
        heuristicIssues.push({
          id: `iss-emb-${misnomer}-${Date.now()}`,
          type: 'emblem_misnomer',
          severity: 'medium',
          flaggedText: misnomer,
          ruleTitle: 'The Pierced Horizon Integrity',
          explanation:
            'The ASORA signature mark is "The Pierced Horizon" satin-stitch emblem, representing a sacred geometric threshold between stillness and movement.',
          suggestedReplacement: 'signature Pierced Horizon satin-stitch mark',
        });
      }
    });

    // 5. Missing Textile Density / Substance
    if (!lower.includes('gsm') && !lower.includes('density') && !lower.includes('weight') && !lower.includes('terry') && !lower.includes('cotton')) {
      heuristicIssues.push({
        id: `iss-textile-${Date.now()}`,
        type: 'missing_substance',
        severity: 'low',
        flaggedText: 'General Copy',
        ruleTitle: 'Material Tactility Requirement',
        explanation:
          'ASORA descriptions must convey physical density (e.g., 500+ GSM loopback terry, custom ring-spun weave) rather than generic apparel descriptions.',
        suggestedReplacement: `dense ${weightGsm || 500} GSM loopback combed cotton structure`,
      });
    }

    // Baseline Metrics Calculation
    const words = fullContent.split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const readingTimeSec = Math.max(1, Math.ceil(wordCount / 3.5));
    const exclamationCount = exclamationMatches ? exclamationMatches.length : 0;
    const prohibitedWordCount = heuristicIssues.filter((i) => i.type === 'prohibited_cliche' || i.type === 'aggressive_urgency').length;

    // AI Semantic Evaluation using Gemini SDK if configured
    const ai = getGeminiClient();
    if (ai) {
      try {
        const auditPrompt = `
You are the Chief Brand Auditor for ASORA PARIS, contemporary unisex street-luxury house (Est. Paris 2026).
House Manifesto:
- Primary statement: "MORE THAN CLOTHING. A MINDSET."
- Supporting core value: "QUIET CONFIDENCE."
- Emblem: "The Pierced Horizon" (geometric circle pierced by vertical blade threshold).
- Rules: No hype, no exclamation points, zero flashy status-signalling, accurate textile science (GSM, knit structure, drape).

Audit this product copy:
- Product: ${productName} (${category})
- Subtitle: "${subtitle}"
- Description Body: "${text}"
- Meta Description: "${metaDescription}"

Return JSON matching this schema:
{
  "score": integer between 0 and 100,
  "verdict": "Atelier Compliant" (if score >= 90) or "Needs Revision" (if 70-89) or "Non-Compliant" (if < 70),
  "summary": "1-2 sentence executive assessment of compliance against ASORA manifesto",
  "issues": [
    {
      "id": "iss-ai-1",
      "type": "prohibited_cliche" or "aggressive_urgency" or "exclamation_mark" or "emblem_misnomer" or "missing_substance" or "formatting_issue",
      "severity": "high" or "medium" or "low",
      "flaggedText": "exact phrase from copy",
      "ruleTitle": "short name of violated guideline",
      "explanation": "why this violates quiet luxury and ASORA brand ethos",
      "suggestedReplacement": "brand-compliant alternative phrase"
    }
  ],
  "metrics": {
    "quietConfidenceScore": integer 0-100,
    "textilePrecisionScore": integer 0-100,
    "architecturalRestraintScore": integer 0-100,
    "brandIntegrityScore": integer 0-100,
    "formattingScore": integer 0-100
  },
  "revisedCopy": {
    "subtitle": "refined 4-7 word editorial subtitle",
    "description": "fully compliant 2-3 sentence luxury product description",
    "shortDescription": "punchy 1-line summary highlighting GSM density",
    "metaDescription": "SEO meta-description under 160 characters embodying ASORA mindset"
  }
}
`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: auditPrompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const raw = response.text;
        if (raw) {
          const parsed = JSON.parse(raw);
          // Merge heuristic issues with AI issues for complete precision
          const mergedIssuesMap = new Map();
          (parsed.issues || []).forEach((iss: any) => mergedIssuesMap.set(iss.flaggedText?.toLowerCase(), iss));
          heuristicIssues.forEach((iss) => {
            if (!mergedIssuesMap.has(iss.flaggedText?.toLowerCase())) {
              mergedIssuesMap.set(iss.flaggedText?.toLowerCase(), iss);
            }
          });

          return res.json({
            success: true,
            source: 'gemini-3.8-flash',
            score: parsed.score ?? 88,
            verdict: parsed.verdict || (parsed.score >= 90 ? 'Atelier Compliant' : parsed.score >= 70 ? 'Needs Revision' : 'Non-Compliant'),
            summary: parsed.summary || 'Copy audited against ASORA PARIS brand manifesto.',
            issues: Array.from(mergedIssuesMap.values()),
            metrics: {
              quietConfidenceScore: parsed.metrics?.quietConfidenceScore ?? 88,
              textilePrecisionScore: parsed.metrics?.textilePrecisionScore ?? 85,
              architecturalRestraintScore: parsed.metrics?.architecturalRestraintScore ?? 90,
              brandIntegrityScore: parsed.metrics?.brandIntegrityScore ?? 92,
              formattingScore: parsed.metrics?.formattingScore ?? 95,
              exclamationCount,
              prohibitedWordCount,
              wordCount,
              readingTimeSec,
            },
            revisedCopy: parsed.revisedCopy || generateCompliantRevision(productName, category, fabric, weightGsm),
            auditedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          });
        }
      } catch (geminiError: any) {
        console.warn('Gemini brand audit API error, using deterministic brand engine:', geminiError?.message);
      }
    }

    // Deterministic Fallback Brand Audit Engine
    const deductions = heuristicIssues.reduce((acc, iss) => {
      if (iss.severity === 'high') return acc + 18;
      if (iss.severity === 'medium') return acc + 10;
      return acc + 5;
    }, 0);

    const calculatedScore = Math.max(25, 100 - deductions);
    const verdict = calculatedScore >= 90 ? 'Atelier Compliant' : calculatedScore >= 70 ? 'Needs Revision' : 'Non-Compliant';

    const fallbackSummary =
      heuristicIssues.length === 0
        ? 'Fully aligned with the ASORA PARIS Brandbook: restrained architectural posture, zero exclamation points, and tactile substance.'
        : `Identified ${heuristicIssues.length} brand guideline deviation${heuristicIssues.length > 1 ? 's' : ''}: quiet confidence is compromised by overt marketing language or missing tactile precision.`;

    const revisedCopy = generateCompliantRevision(productName, category, fabric, weightGsm);

    return res.json({
      success: true,
      source: 'brandbook-auditor-engine',
      score: calculatedScore,
      verdict,
      summary: fallbackSummary,
      issues: heuristicIssues,
      metrics: {
        quietConfidenceScore: Math.max(30, 100 - (prohibitedWordCount * 25 + exclamationCount * 20)),
        textilePrecisionScore: lower.includes('gsm') ? 95 : 70,
        architecturalRestraintScore: Math.max(40, 100 - heuristicIssues.length * 15),
        brandIntegrityScore: lower.includes('horizon') || lower.includes('asora') ? 95 : 75,
        formattingScore: exclamationCount === 0 ? 100 : 60,
        exclamationCount,
        prohibitedWordCount,
        wordCount,
        readingTimeSec,
      },
      revisedCopy,
      auditedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
  } catch (err: any) {
    console.error('Brand audit server error:', err);
    res.status(500).json({ error: 'Failed to perform brand audit' });
  }
});

// Helper for generating compliant brandbook revisions
function generateCompliantRevision(
  productName: string,
  category: string,
  fabric: string,
  weightGsm: number | undefined
) {
  const gsm = weightGsm ? `${weightGsm} GSM` : '500 GSM';
  return {
    subtitle: 'Volume 01 — Architectural Form',
    description: `Conceived at our atelier in Paris with quiet confidence. Cut from dense ${gsm} loopback combed cotton, ${productName} balances sculptural dropped shoulder seams with enduring comfort. Anchored by the Pierced Horizon signature satin-stitch mark placed with intention.`,
    shortDescription: `${gsm} dense loopback combed cotton with dropped shoulders and discrete embroidery.`,
    metaDescription: `ASORA PARIS Volume 01. ${productName} in ${gsm} French loopback cotton. Quiet confidence, considered forms, and tactile substance.`,
  };
}

// Helper for authentic brandbook copy generation
function generateBrandbookCopy(
  productName: string,
  category: string,
  color: string,
  fabric: string,
  weightGsm: number | undefined,
  fitType: string,
  brandingPlacement: string,
  tone: string
) {
  const gsmStr = weightGsm ? `${weightGsm} GSM` : '500 GSM';

  if (tone === 'Material Science & Fiber Density') {
    return {
      subtitle: `Volume 01 — ${gsmStr} Kinetic Fiber Calibration`,
      description: `Synthesized through precise yarn spinning and tight-loop mechanical knitting, ${productName} leverages ${gsmStr} high-density combed organic cellulose. The back-facing sinker loops establish a microclimate chamber for thermal homeostasis, while the anisotropic weave preserves structural drape without synthetic rigidity. Finished with our Pierced Horizon mark at ${brandingPlacement.toLowerCase()}.`,
      shortDescription: `${gsmStr} dense organic loopback with microclimate thermal equilibrium and stable tensile memory.`,
      fitNotes: `Biomechanical ${fitType} drape calibrated for zero drag across the clavicle, dropping perpendicularly from the shoulder line.`,
      constructionHighlights: [
        `Precision ${brandingPlacement.toLowerCase()}`,
        `${gsmStr} high-twist ring-spun combed organic cotton`,
        'Hydrothermal pre-shrunk wash cycle for dimensional tolerance (<1%)',
        'Twin-needle 4-thread chainstitch seam reinforcement',
      ],
      careNote: 'Wash inside out at 30°C on low centrifuge (600 RPM). Dry horizontally away from direct UV radiation.',
    };
  }

  if (tone === 'Architectural & Brutalist') {
    return {
      subtitle: 'Volume 01 — Monolithic Form',
      description: `Engineered in Paris with an uncompromising architectural stance. Cut from dense ${gsmStr} loopback fabric, ${productName} holds its posture in daylight and concrete studio shadows. Finished with our signature Pierced Horizon emblem at ${brandingPlacement.toLowerCase()} to anchor the silhouette.`,
      shortDescription: `${gsmStr} dense weave with dropped shoulder geometry and architectural drape.`,
      fitNotes: `Sculptural ${fitType} drape designed to fall cleanly over the frame without slouching or excess waist tension.`,
      constructionHighlights: [
        `Precision ${brandingPlacement.toLowerCase()}`,
        'Reinforced shoulder yoke with interior tape support',
        'Twin-needle coverstitch along all structural seams',
        'Cold-tumbled to preserve rectangular architectural lines',
      ],
      careNote: 'Wash cold inside out. Dry flat away from direct heat to retain structural geometry.',
    };
  }

  if (tone === 'Parisian Atelier Heritage') {
    return {
      subtitle: 'Volume 01 — Paris Atelier Formulation',
      description: `Conceived at our atelier in Paris for Volume 01. ${productName} in ${color} embodies the house ethos of quiet confidence: heavyweight ${gsmStr} combed cotton, subtle satin-stitch thread work, and tailored proportions made to age gracefully across years of repeat wear.`,
      shortDescription: `Custom ${gsmStr} French combed cotton with discrete Parisian atelier embroidery.`,
      fitNotes: `Unisex ${fitType} tailoring calibrated for everyday urban movement with dropped shoulder posture.`,
      constructionHighlights: [
        `Discreet ${brandingPlacement.toLowerCase()}`,
        'High-gauge combed ring-spun cotton loopback structure',
        'Bound collar and rib finishes that retain elasticity',
        'Internal woven atelier label marked with edition run',
      ],
      careNote: 'Hand or gentle machine wash at 30°C. Steam lightly on reverse.',
    };
  }

  if (tone === 'Minimalist Technical') {
    return {
      subtitle: 'Volume 01 — Precision Utility',
      description: `A study in construction and restrained functionality. Crafted from ${gsmStr} bonded cotton-wool composite, featuring clean flat-felled seam engineering and low-sheen matte hardware. Finished with the Pierced Horizon threshold emblem positioned at ${brandingPlacement.toLowerCase()}.`,
      shortDescription: `Bonded ${gsmStr} structure with flat-felled seams and matte hardware.`,
      fitNotes: `Clean ${fitType} proportion with zero bulk, allowing unrestricted transition between layers.`,
      constructionHighlights: [
        `Engineered ${brandingPlacement.toLowerCase()}`,
        'Flat-felled internal seams for next-to-skin glide',
        'Matte finish hardware treated for anti-reflective longevity',
        'Ergonomic sleeve articulation',
      ],
      careNote: 'Specialist care or gentle cold wash. Do not wring.',
    };
  }

  // Default: Quiet Luxury & Tactility
  return {
    subtitle: 'Volume 01 — Tactile Substance',
    description: `Crafted from custom ${gsmStr} combed organic loopback terry that communicates physical density from the first touch. ${productName} pairs dropped shoulder seams with our signature Pierced Horizon emblem at ${brandingPlacement.toLowerCase()}, achieving effortless presence without ornamentation.`,
    shortDescription: `${gsmStr} loopback terry with discrete satin-stitch chest mark and dropped shoulders.`,
    fitNotes: `Relaxed unisex silhouette that falls naturally without cling, balancing comfort with structured drape.`,
    constructionHighlights: [
      `Authentic ${brandingPlacement.toLowerCase()}`,
      `Custom-milled ${gsmStr} organic cotton fleece`,
      'Dense 2x2 rib trims at collar, hem, and cuffs',
      'Pre-shrunk organic fibres for lifetime stability',
    ],
    careNote: 'Machine wash cold (30°C) with like colors. Lay flat in shade to dry.',
  };
}

// Dev server or static files setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ASORA PARIS full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
