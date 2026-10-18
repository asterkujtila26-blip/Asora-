export type CurrencyCode = 'EUR' | 'USD' | 'GBP';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rateAgainstEur: number;
}

export type ProductColor = 'Obsidian Black' | 'Deep Navy' | 'Charcoal' | 'Stone Grey' | 'Warm Ivory';

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface ProductVariant {
  id: string;
  color: ProductColor;
  size: ProductSize;
  sku: string;
  stock: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  priceEur: number;
  category: 'Hoodies & Sweatshirts' | 'T-Shirts & Tops' | 'Jackets & Outerwear' | 'Pants & Bottoms';
  primaryColor: ProductColor;
  availableColors: ProductColor[];
  availableSizes: ProductSize[];
  heroImage: string;
  galleryImages: {
    url: string;
    caption: string;
    viewType: 'front' | 'back' | 'embroidery' | 'fabric' | 'model';
  }[];
  description: string;
  shortDescription: string;
  fit: string;
  fitType: 'clean' | 'relaxed' | 'oversized';
  fabricComposition: string;
  weightGsm?: number;
  constructionDetails: string[];
  brandingPlacement: string;
  careInstructions: string[];
  shippingNotes: string;
  skuPrefix: string;
  isDraft: boolean;
  featured: boolean;
  aiCopyDraft?: AiProductCopy;
  originalDescription?: string;
}

export interface AiProductCopy {
  subtitle: string;
  description: string;
  shortDescription?: string;
  fitNotes?: string;
  constructionHighlights?: string[];
  careNote?: string;
  tone: string;
  generatedAt: string;
  source: string;
}

export type TemplateFontStyle = 'hybrid' | 'serif-italic' | 'serif-regular' | 'clean-sans';
export type TemplateFontSize = 'compact' | 'standard' | 'generous';
export type TemplateColorSurface = 'ivory' | 'black' | 'navy' | 'travertine' | 'burgundy';
export type TemplateLineHeight = 'compact' | 'balanced' | 'relaxed';

export interface BrandAuditIssue {
  id: string;
  type:
    | 'prohibited_cliche'
    | 'aggressive_urgency'
    | 'exclamation_mark'
    | 'emblem_misnomer'
    | 'missing_substance'
    | 'formatting_issue';
  severity: 'high' | 'medium' | 'low';
  flaggedText: string;
  ruleTitle: string;
  explanation: string;
  suggestedReplacement?: string;
}

export interface BrandAuditResult {
  score: number;
  verdict: 'Atelier Compliant' | 'Needs Revision' | 'Non-Compliant';
  summary: string;
  issues: BrandAuditIssue[];
  metrics: {
    quietConfidenceScore: number;
    textilePrecisionScore: number;
    architecturalRestraintScore: number;
    brandIntegrityScore: number;
    formattingScore: number;
    exclamationCount: number;
    prohibitedWordCount: number;
    wordCount: number;
    readingTimeSec: number;
  };
  revisedCopy?: {
    subtitle?: string;
    description: string;
    shortDescription?: string;
    metaDescription?: string;
  };
  auditedAt: string;
  source?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  color: ProductColor;
  size: ProductSize;
  quantity: number;
  priceEur: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
  preferredColor?: ProductColor;
  preferredSize?: ProductSize;
}

export interface OrderAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  subtotalEur: number;
  shippingEur: number;
  discountEur: number;
  taxEur: number;
  totalEur: number;
  currency: CurrencyCode;
  shippingAddress: OrderAddress;
  status: 'Confirmed' | 'Preparing' | 'In Transit' | 'Delivered';
  trackingNumber: string;
  estimatedDelivery: string;
  paymentMethod: string;
}

export interface UserAccount {
  name: string;
  email: string;
  phone: string;
  addressLine1: string;
  city: string;
  postalCode: string;
  country: string;
  isLoggedIn: boolean;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  category: 'Campaign' | 'The Symbol' | 'Materials & Construction' | 'Volume 01' | 'Studio Notes';
  excerpt: string;
  publishedDate: string;
  readTime: string;
  coverImage: string;
  content: string[];
}

export interface StoreSettings {
  freeShippingThresholdEur: number;
  activeCurrency: CurrencyCode;
  standardShippingEur: number;
  taxPercentage: number;
  storeStatus: 'Open for Orders' | 'Private Preview';
  announcementText: string;
  contactEmail: string;
  supportHours: string;
  instagramHandle: string;
  tiktokHandle: string;
}
