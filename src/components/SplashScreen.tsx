import React from 'react';
import { useShop } from '../context/ShopContext';
import { Shield, Truck, CreditCard, ArrowRight, CheckCircle2 } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const { setShowSplash, setActiveTab } = useShop();

  const handleEnterStore = () => {
    setShowSplash(false);
    setActiveTab('shop');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gradient-to-b from-[#f0fdf4] via-[#f8f9ff] to-[#eff4ff] flex flex-col justify-between p-6 sm:p-8">
      {/* Top Header Indicators */}
      <div className="flex items-center justify-between w-full max-w-md mx-auto pt-safe">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#a7f3d0] text-[#006948] text-xs font-semibold shadow-xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#006948]" />
          <span>Verified Store PK</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#cbd5e1] text-[#006a61] text-xs font-semibold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#006948] animate-pulse" />
          <span>Online Hub</span>
        </div>
      </div>

      {/* Main Brand Hero */}
      <div className="flex flex-col items-center text-center max-w-md mx-auto my-auto py-8">
        {/* Emblem */}
        <div className="relative mb-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-[#0b1c30] flex items-center justify-center text-white shadow-2xl shadow-[#006948]/20 border border-[#1e293b] ring-8 ring-white/80">
            <div className="flex items-center justify-center">
              <span className="text-4xl sm:text-5xl font-black tracking-tighter text-white">
                A<span className="text-[#68dba9]">⚡</span>
              </span>
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-[#006948] text-white text-[10px] font-bold tracking-wider uppercase shadow-md">
            Direct Importer
          </div>
        </div>

        {/* Store Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0b1c30] tracking-tight leading-tight">
          Alizeh Mobile Shop
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#475569] max-w-xs sm:max-w-sm font-medium">
          Pakistan's Trusted Hub for Premium Smartphones & Authentic Accessories
        </p>

        {/* Value Prop Cards */}
        <div className="mt-8 space-y-3 w-full text-left">
          <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm hover:border-[#a7f3d0] transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#ecfdf5] flex items-center justify-center text-[#006948] shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-[#0b1c30]">100% Genuine Tech</span>
              <span className="text-xs text-[#64748b]">Pin-packed boxes with brand warranty</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm hover:border-[#a7f3d0] transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#ecfdf5] flex items-center justify-center text-[#006948] shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-[#0b1c30]">Cash on Delivery Nationwide</span>
              <span className="text-xs text-[#64748b]">Pay at doorstep across 150+ cities</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm hover:border-[#a7f3d0] transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#ecfdf5] flex items-center justify-center text-[#006948] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-[#0b1c30]">Fast Dispatch</span>
              <span className="text-xs text-[#64748b]">Express in Karachi, Lahore & Islamabad</span>
            </div>
          </div>
        </div>

        {/* PKR Price Guarantee Strip */}
        <div className="mt-5 w-full py-2 px-3 rounded-xl bg-[#e0f2fe] border border-[#bae6fd] text-[#0369a1] text-xs font-semibold flex items-center justify-center gap-1.5">
          <span>₨</span>
          <span>All Prices in PKR (Rs.) • Official Warranty Included</span>
        </div>
      </div>

      {/* Footer CTA & Progress */}
      <div className="w-full max-w-md mx-auto space-y-3 pb-safe">
        <div className="flex items-center justify-between text-xs font-semibold text-[#64748b] px-1">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006948]" />
            Storefront ready for browsing
          </span>
          <span className="font-mono text-[#006948]">100%</span>
        </div>

        <button
          onClick={handleEnterStore}
          className="w-full h-13 py-3.5 px-6 rounded-xl bg-[#006948] hover:bg-[#00855d] active:scale-[0.98] text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-[#006948]/25 transition-all"
        >
          <span>Explore Storefront</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
