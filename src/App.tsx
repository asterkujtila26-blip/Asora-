import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { BagDrawer } from './components/cart/BagDrawer';
import { AddToBagSuccessModal } from './components/cart/AddToBagSuccessModal';
import { SizeFinderModal } from './components/product/SizeFinderModal';
import { SearchModal } from './components/layout/SearchModal';

// Views
import { HomePage } from './views/HomePage';
import { ShopPage } from './views/ShopPage';
import { ProductDetailPage } from './views/ProductDetailPage';
import { TheSymbolPage } from './views/TheSymbolPage';
import { AboutManifestoPage } from './views/AboutManifestoPage';
import { CampaignPage } from './views/CampaignPage';
import { JournalPage } from './views/JournalPage';
import { JournalArticlePage } from './views/JournalArticlePage';
import { WishlistPage } from './views/WishlistPage';
import { AccountPage } from './views/AccountPage';
import { BagPage } from './views/BagPage';
import { CheckoutPage } from './views/CheckoutPage';
import { OrderConfirmationPage } from './views/OrderConfirmationPage';
import { OrderTrackingPage } from './views/OrderTrackingPage';
import { SizeGuidePage } from './views/SizeGuidePage';
import { ShippingReturnsPage } from './views/ShippingReturnsPage';
import { FaqPage } from './views/FaqPage';
import { ContactPage } from './views/ContactPage';
import { PrivacyTermsPage } from './views/PrivacyTermsPage';
import { AdminDashboardPage } from './views/AdminDashboardPage';

const AppContent: React.FC = () => {
  const { currentPage } = useStore();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'the-symbol':
        return <TheSymbolPage />;
      case 'about':
        return <AboutManifestoPage />;
      case 'campaign':
        return <CampaignPage />;
      case 'journal':
        return <JournalPage />;
      case 'journal-article':
        return <JournalArticlePage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'account':
        return <AccountPage />;
      case 'bag':
        return <BagPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order-confirmation':
        return <OrderConfirmationPage />;
      case 'order-tracking':
        return <OrderTrackingPage />;
      case 'size-guide':
        return <SizeGuidePage />;
      case 'shipping-returns':
        return <ShippingReturnsPage />;
      case 'faq':
        return <FaqPage />;
      case 'contact':
        return <ContactPage />;
      case 'privacy':
        return <PrivacyTermsPage type="privacy" />;
      case 'terms':
        return <PrivacyTermsPage type="terms" />;
      case 'admin':
        return <AdminDashboardPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F1EBDD] text-[#0A0A0B] selection:bg-[#0A0A0B] selection:text-[#F1EBDD]">
      {/* Sticky Top Header */}
      <Header />

      {/* Main View Router */}
      <main className="flex-1 w-full">
        {renderCurrentPage()}
      </main>

      {/* Global Modals & Drawers */}
      <BagDrawer />
      <AddToBagSuccessModal />
      <SizeFinderModal />
      <SearchModal />

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
