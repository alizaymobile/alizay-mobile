import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Search, ShoppingBag, ShieldCheck, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const { cartTotalCount, activeTab, setActiveTab, searchQuery, setSearchQuery, setShowSplash } = useShop();
  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#e2e8f0] shadow-sm pt-safe">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              setActiveTab('shop');
            }}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
            aria-label="Alizeh Mobile Shop Home"
          >
            <div className="w-9 h-9 rounded-xl bg-[#006948] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-base tracking-tighter flex items-center">
                A<span className="text-[#68dba9] text-xs -ml-0.5">⚡</span>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold text-[#0b1c30] leading-tight tracking-tight">
                Alizeh Mobile Shop
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase text-[#006948]">
                {activeTab === 'admin' ? 'Admin Control Terminal' : 'Official Tech Store PK'}
              </span>
            </div>
          </button>
        </div>

        {/* Search & Actions Zone */}
        <div className="flex items-center gap-2">
          {/* Quick Search Toggle or Input on desktop */}
          <div className="hidden sm:flex items-center relative w-56 lg:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search covers, chargers, phones..."
              className="w-full h-9 pl-8 pr-3 text-xs bg-[#f8f9ff] border border-[#e2e8f0] rounded-lg text-[#0b1c30] placeholder-[#64748b] focus:outline-none focus:border-[#006948] focus:ring-1 focus:ring-[#006948]"
            />
            <Search className="w-3.5 h-3.5 text-[#64748b] absolute left-2.5 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 text-xs text-[#94a3b8] hover:text-[#0b1c30]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Mobile search toggle */}
          <button
            onClick={() => setShowSearchInput(!showSearchInput)}
            className="sm:hidden w-9 h-9 flex items-center justify-center rounded-lg text-[#0b1c30] hover:bg-[#f1f5f9] active:scale-95 transition-all"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Quick Intro / Splash button */}
          <button
            onClick={() => setShowSplash(true)}
            title="View Store Welcome Screen"
            className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#006948] bg-[#006948]/10 hover:bg-[#006948]/20 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Store Info</span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => setActiveTab('cart')}
            className={`relative w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
              activeTab === 'cart' ? 'bg-[#006948] text-white' : 'text-[#0b1c30] hover:bg-[#f1f5f9]'
            }`}
            aria-label={`Shopping Cart with ${cartTotalCount} items`}
          >
            <ShoppingBag className="w-5 h-5" />
            {cartTotalCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#e11d48] text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                {cartTotalCount}
              </span>
            )}
          </button>

          {/* Admin shortcut button */}
          <button
            onClick={() => setActiveTab('admin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'admin'
                ? 'bg-[#006948] text-white shadow-sm'
                : 'bg-[#f1f5f9] text-[#0b1c30] hover:bg-[#e2e8f0]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#006948]" />
            <span className="hidden xs:inline">Admin</span>
          </button>
        </div>
      </div>

      {/* Mobile search bar dropdown */}
      {showSearchInput && (
        <div className="sm:hidden px-4 pb-3 pt-1 border-t border-[#f1f5f9] bg-white">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-[#64748b] absolute left-3 pointer-events-none" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search covers, 65W GaN chargers, AirPods, iPhones..."
              className="w-full h-10 pl-9 pr-9 text-sm bg-[#f8f9ff] border border-[#cbd5e1] rounded-lg text-[#0b1c30] placeholder-[#64748b] focus:outline-none focus:border-[#006948]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-xs text-[#94a3b8] hover:text-[#0b1c30]"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
