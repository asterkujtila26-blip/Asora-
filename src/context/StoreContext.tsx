import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  WishlistItem,
  Order,
  StoreSettings,
  CurrencyCode,
  ProductColor,
  ProductSize,
  JournalArticle,
  UserAccount,
  AiProductCopy,
  TemplateFontStyle,
  TemplateFontSize,
  TemplateColorSurface,
  TemplateLineHeight,
} from '../types/store';
import {
  INITIAL_PRODUCTS,
  INITIAL_ARTICLES,
  INITIAL_STORE_SETTINGS,
  CURRENCY_CONFIGS,
} from '../data/initialData';

export type PageView =
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'the-symbol'
  | 'about'
  | 'campaign'
  | 'journal'
  | 'journal-article'
  | 'wishlist'
  | 'account'
  | 'bag'
  | 'checkout'
  | 'order-confirmation'
  | 'order-tracking'
  | 'size-guide'
  | 'shipping-returns'
  | 'faq'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'admin';

interface AddToBagConfirmation {
  isOpen: boolean;
  product?: Product;
  color?: ProductColor;
  size?: ProductSize;
  quantity?: number;
}

interface SizeFinderState {
  isOpen: boolean;
  product?: Product;
}

interface StoreContextType {
  // Navigation
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedArticleId: string | null;
  setSelectedArticleId: (id: string | null) => void;
  openProductDetail: (productId: string) => void;
  openJournalArticle: (articleId: string) => void;

  // Products
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  activeProduct: Product | undefined;

  // Cart / The ASORA Bag
  cart: CartItem[];
  addToCart: (product: Product, color: ProductColor, size: ProductSize, quantity?: number) => boolean;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotalEur: number;
  cartTotalEur: number;
  discountEur: number;
  shippingEur: number;
  taxEur: number;
  appliedDiscountCode: string | null;
  applyDiscountCode: (code: string) => { success: boolean; message: string };
  removeDiscountCode: () => void;
  isBagDrawerOpen: boolean;
  setIsBagDrawerOpen: (open: boolean) => void;

  // Modals
  addToBagConfirmation: AddToBagConfirmation;
  setAddToBagConfirmation: React.Dispatch<React.SetStateAction<AddToBagConfirmation>>;
  sizeFinder: SizeFinderState;
  setSizeFinder: React.Dispatch<React.SetStateAction<SizeFinderState>>;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isNewsletterModalOpen: boolean;
  setIsNewsletterModalOpen: (open: boolean) => void;

  // Wishlist
  wishlist: WishlistItem[];
  toggleWishlist: (productId: string, color?: ProductColor, size?: ProductSize) => void;
  isInWishlist: (productId: string) => boolean;

  // Currency & Formatting
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (amountEur: number) => string;

  // Customer Orders & Account ("YOUR ASORA")
  orders: Order[];
  currentOrder: Order | null;
  setCurrentOrder: (order: Order | null) => void;
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status' | 'trackingNumber' | 'estimatedDelivery'>) => Order;
  userAccount: UserAccount;
  updateUserAccount: (data: Partial<UserAccount>) => void;

  // Newsletter Subscribers
  subscribers: string[];
  subscribeNewsletter: (email: string) => { success: boolean; message: string };

  // Settings & Launch Management
  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;
  articles: JournalArticle[];

  // Live AI Preview Controls
  isAiPreviewActive: boolean;
  setIsAiPreviewActive: (active: boolean) => void;
  toggleAiPreview: () => void;
  previewMode: 'in-situ' | 'split';
  setPreviewMode: (mode: 'in-situ' | 'split') => void;
  updateProductAiDraft: (productId: string, draft: Partial<AiProductCopy>) => void;
  applyAiCopyAsLive: (productId: string) => void;
  revertToOriginalCopy: (productId: string) => void;

  // Template Font & Color Style Controls
  templateFontStyle: TemplateFontStyle;
  setTemplateFontStyle: (style: TemplateFontStyle) => void;
  templateFontSize: TemplateFontSize;
  setTemplateFontSize: (size: TemplateFontSize) => void;
  templateColorSurface: TemplateColorSurface;
  setTemplateColorSurface: (color: TemplateColorSurface) => void;
  templateLineHeight: TemplateLineHeight;
  setTemplateLineHeight: (lh: TemplateLineHeight) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPageState] = useState<PageView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>('asora-crewneck-01');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [articles] = useState<JournalArticle[]>(INITIAL_ARTICLES);
  const [settings, setSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem('asora_store_settings');
      return saved ? JSON.parse(saved) : INITIAL_STORE_SETTINGS;
    } catch {
      return INITIAL_STORE_SETTINGS;
    }
  });

  const [currency, setCurrency] = useState<CurrencyCode>(settings.activeCurrency);
  const [isBagDrawerOpen, setIsBagDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('asora_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    try {
      const saved = localStorage.getItem('asora_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('asora_orders');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'ord-init-01',
        orderNumber: 'ASR-2026-8841',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        items: [
          {
            id: 'sample-item-1',
            productId: 'asora-crewneck-01',
            product: INITIAL_PRODUCTS[0],
            color: 'Obsidian Black',
            size: 'L',
            quantity: 1,
            priceEur: 240,
          },
        ],
        subtotalEur: 240,
        shippingEur: 0,
        discountEur: 0,
        taxEur: 48,
        totalEur: 240,
        currency: 'EUR',
        shippingAddress: {
          firstName: 'Julian',
          lastName: 'Vane',
          email: 'julian.vane@example.com',
          phone: '+33 6 12 34 56 78',
          addressLine1: '14 Rue de Turenne',
          city: 'Paris',
          postalCode: '75004',
          country: 'France',
        },
        status: 'In Transit',
        trackingNumber: 'ASR-FR-78904321',
        estimatedDelivery: 'Wednesday, October 14, 2026',
        paymentMethod: 'Credit Card (Stripe Verified)',
      },
    ];
  });

  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  // Account
  const [userAccount, setUserAccount] = useState<UserAccount>(() => {
    try {
      const saved = localStorage.getItem('asora_account');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      name: 'Guest Client',
      email: '',
      phone: '',
      addressLine1: '',
      city: '',
      postalCode: '',
      country: 'France',
      isLoggedIn: false,
    };
  });

  // Newsletter subscribers
  const [subscribers, setSubscribers] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('asora_subscribers');
      return saved ? JSON.parse(saved) : ['client.preview@asora-paris.com'];
    } catch {
      return ['client.preview@asora-paris.com'];
    }
  });

  // Discount code
  const [appliedDiscountCode, setAppliedDiscountCode] = useState<string | null>(null);

  // Modals state
  const [addToBagConfirmation, setAddToBagConfirmation] = useState<AddToBagConfirmation>({
    isOpen: false,
  });
  const [sizeFinder, setSizeFinder] = useState<SizeFinderState>({
    isOpen: false,
  });

  // Persist state
  useEffect(() => {
    try {
      localStorage.setItem('asora_cart', JSON.stringify(cart));
    } catch {
      /* ignore */
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('asora_wishlist', JSON.stringify(wishlist));
    } catch {
      /* ignore */
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('asora_orders', JSON.stringify(orders));
    } catch {
      /* ignore */
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('asora_account', JSON.stringify(userAccount));
    } catch {
      /* ignore */
    }
  }, [userAccount]);

  useEffect(() => {
    try {
      localStorage.setItem('asora_subscribers', JSON.stringify(subscribers));
    } catch {
      /* ignore */
    }
  }, [subscribers]);

  useEffect(() => {
    try {
      localStorage.setItem('asora_store_settings', JSON.stringify(settings));
    } catch {
      /* ignore */
    }
  }, [settings]);

  // Smooth scroll to top on page change
  const setCurrentPage = (page: PageView) => {
    setCurrentPageState(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProductDetail = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage('product-detail');
  };

  const openJournalArticle = (articleId: string) => {
    setSelectedArticleId(articleId);
    setCurrentPage('journal-article');
  };

  const activeProduct = products.find((p) => p.id === selectedProductId) || products[0];

  // Cart operations
  const addToCart = (
    product: Product,
    color: ProductColor,
    size: ProductSize,
    quantity = 1
  ): boolean => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.color === color && item.size === size
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }

      const newItem: CartItem = {
        id: `${product.id}-${color}-${size}-${Date.now()}`,
        productId: product.id,
        product,
        color,
        size,
        quantity,
        priceEur: product.priceEur,
      };
      return [...prev, newItem];
    });

    // Trigger refined "WELCOME TO ASORA" confirmation modal
    setAddToBagConfirmation({
      isOpen: true,
      product,
      color,
      size,
      quantity,
    });

    return true;
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedDiscountCode(null);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotalEur = cart.reduce((acc, item) => acc + item.priceEur * item.quantity, 0);

  // Discount computation
  let discountEur = 0;
  if (appliedDiscountCode === 'ASORA2026') {
    discountEur = Math.round(cartSubtotalEur * 0.1);
  } else if (appliedDiscountCode === 'PRIVATELIST') {
    discountEur = Math.round(cartSubtotalEur * 0.15);
  }

  // Shipping threshold calculation
  const shippingEur =
    cartSubtotalEur >= settings.freeShippingThresholdEur || cartSubtotalEur === 0
      ? 0
      : settings.standardShippingEur;

  // Approximate included VAT (20%)
  const taxEur = Math.round((cartSubtotalEur - discountEur) * 0.2);
  const cartTotalEur = Math.max(0, cartSubtotalEur - discountEur + shippingEur);

  const applyDiscountCode = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'ASORA2026' || trimmed === 'PRIVATELIST') {
      setAppliedDiscountCode(trimmed);
      return { success: true, message: `Privilege code ${trimmed} applied successfully.` };
    }
    return { success: false, message: 'Invalid or expired invitation code.' };
  };

  const removeDiscountCode = () => {
    setAppliedDiscountCode(null);
  };

  // Wishlist
  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.productId === productId);
  };

  const toggleWishlist = (productId: string, color?: ProductColor, size?: ProductSize) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.productId === productId);
      if (exists) {
        return prev.filter((item) => item.productId !== productId);
      }
      return [
        ...prev,
        {
          productId,
          addedAt: new Date().toISOString(),
          preferredColor: color,
          preferredSize: size,
        },
      ];
    });
  };

  // Currency Formatter
  const formatPrice = (amountEur: number): string => {
    const config = CURRENCY_CONFIGS[currency] || CURRENCY_CONFIGS.EUR;
    const converted = amountEur * config.rateAgainstEur;
    return `${config.symbol}${Math.round(converted).toLocaleString()}`;
  };

  // Create Order
  const createOrder = (
    orderData: Omit<
      Order,
      'id' | 'orderNumber' | 'createdAt' | 'status' | 'trackingNumber' | 'estimatedDelivery'
    >
  ): Order => {
    const orderNumber = `ASR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const trackingNumber = `ASR-FR-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);

    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      status: 'Confirmed',
      trackingNumber,
      estimatedDelivery: deliveryDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    clearCart();
    return newOrder;
  };

  const updateUserAccount = (data: Partial<StoreContextType['userAccount']>) => {
    setUserAccount((prev) => ({ ...prev, ...data }));
  };

  const subscribeNewsletter = (email: string) => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !trimmed.includes('@')) {
      return { success: false, message: 'Please enter a valid email address.' };
    }
    if (subscribers.includes(trimmed)) {
      return { success: true, message: 'You are already on the Private List.' };
    }
    setSubscribers((prev) => [...prev, trimmed]);
    return { success: true, message: 'Welcome to the Private List.' };
  };

  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem('asora_store_settings', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save settings:', e);
      }
      return updated;
    });
  };

  // Live AI Preview Controls
  const [isAiPreviewActive, setIsAiPreviewActive] = useState<boolean>(true);
  const [previewMode, setPreviewMode] = useState<'in-situ' | 'split'>('in-situ');
  const [templateFontStyle, setTemplateFontStyle] = useState<TemplateFontStyle>('hybrid');
  const [templateFontSize, setTemplateFontSize] = useState<TemplateFontSize>('standard');
  const [templateColorSurface, setTemplateColorSurface] = useState<TemplateColorSurface>('ivory');
  const [templateLineHeight, setTemplateLineHeight] = useState<TemplateLineHeight>('balanced');

  const toggleAiPreview = () => {
    setIsAiPreviewActive((prev) => !prev);
  };

  const updateProductAiDraft = (productId: string, draft: Partial<AiProductCopy>) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== productId) return p;
        const currentDraft: AiProductCopy = p.aiCopyDraft || {
          subtitle: p.subtitle,
          description: p.description,
          shortDescription: p.shortDescription,
          fitNotes: p.fit,
          constructionHighlights: p.constructionDetails,
          careNote: p.careInstructions[0] || '',
          tone: 'Quiet Luxury & Tactility',
          generatedAt: new Date().toLocaleDateString(),
          source: 'manual-draft',
        };
        return {
          ...p,
          aiCopyDraft: {
            ...currentDraft,
            ...draft,
          },
        };
      })
    );
  };

  const applyAiCopyAsLive = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== productId || !p.aiCopyDraft) return p;
        return {
          ...p,
          originalDescription: p.originalDescription || p.description,
          subtitle: p.aiCopyDraft.subtitle || p.subtitle,
          description: p.aiCopyDraft.description || p.description,
          shortDescription: p.aiCopyDraft.shortDescription || p.shortDescription,
          fit: p.aiCopyDraft.fitNotes || p.fit,
          constructionDetails: p.aiCopyDraft.constructionHighlights || p.constructionDetails,
        };
      })
    );
  };

  const revertToOriginalCopy = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== productId || !p.originalDescription) return p;
        return {
          ...p,
          description: p.originalDescription,
        };
      })
    );
  };

  return (
    <StoreContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedProductId,
        setSelectedProductId,
        selectedArticleId,
        setSelectedArticleId,
        openProductDetail,
        openJournalArticle,
        products,
        setProducts,
        activeProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotalEur,
        cartTotalEur,
        discountEur,
        shippingEur,
        taxEur,
        appliedDiscountCode,
        applyDiscountCode,
        removeDiscountCode,
        isBagDrawerOpen,
        setIsBagDrawerOpen,
        addToBagConfirmation,
        setAddToBagConfirmation,
        sizeFinder,
        setSizeFinder,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        isNewsletterModalOpen,
        setIsNewsletterModalOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        currency,
        setCurrency,
        formatPrice,
        orders,
        currentOrder,
        setCurrentOrder,
        createOrder,
        userAccount,
        updateUserAccount,
        subscribers,
        subscribeNewsletter,
        settings,
        updateSettings,
        articles,
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
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
