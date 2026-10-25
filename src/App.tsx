/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { StorefrontView } from './components/StorefrontView';
import { CartView } from './components/CartView';
import { OrdersView } from './components/OrdersView';
import { AdminPortalView } from './components/AdminPortalView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SplashScreen } from './components/SplashScreen';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';

const MainApp: React.FC = () => {
  const { activeTab, selectedProduct, setSelectedProduct, showSplash } = useShop();

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans selection:bg-[#006948] selection:text-white">
      {/* Top Navigation Bar */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-16 pb-24">
        {activeTab === 'shop' && <StorefrontView />}
        {activeTab === 'cart' && <CartView />}
        {activeTab === 'orders' && <OrdersView />}
        {activeTab === 'admin' && <AdminPortalView />}
      </main>

      {/* Floating Bottom Navigation */}
      <BottomNav />

      {/* Product Details Full Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Welcome & Store Intro Splash Screen */}
      {showSplash && <SplashScreen />}

      {/* Floating Notification Toast */}
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainApp />
    </ShopProvider>
  );
}
