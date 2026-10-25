import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { 
  Truck, ArrowRight, ShieldCheck, RefreshCw, MessageSquare, 
  Search, SlidersHorizontal, Check, Zap, Sparkles 
} from 'lucide-react';

export const StorefrontView: React.FC = () => {
  const { 
    products, 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory,
    setActiveTab,
    showToast
  } = useShop();

  const [onlyInStock, setOnlyInStock] = useState(false);
  const [expressOnly, setExpressOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'chargers', label: 'Fast Chargers' },
    { id: 'cases', label: 'Shockproof Cases' },
    { id: 'glass', label: '9H Glass Protectors' },
    { id: 'audio', label: 'Earbuds & Audio' },
    { id: 'powerbanks', label: 'Power Banks' },
    { id: 'phones', label: 'Mobile Phones' },
    { id: 'cables', label: 'Heavy-Duty Cables' },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchBrand = p.brand.toLowerCase().includes(q);
        const matchSku = p.sku.toLowerCase().includes(q);
        const matchDesc = p.shortDesc.toLowerCase().includes(q);
        const matchCat = p.categoryLabel.toLowerCase().includes(q);
        if (!matchName && !matchBrand && !matchSku && !matchDesc && !matchCat) {
          return false;
        }
      }

      // Stock filter
      if (onlyInStock && p.stockUnits <= 0) {
        return false;
      }

      // Max price filter
      if (maxPrice !== null && p.price > maxPrice) {
        return false;
      }

      return true;
    });
  }, [products, selectedCategory, searchQuery, onlyInStock, maxPrice]);

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      'As-salamu alaykum Alizeh Mobile Shop! I would like to place an order or ask about current stock in Karachi & Lahore hubs.'
    );
    window.open(`https://wa.me/923001234567?text=${text}`, '_blank');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4 space-y-4">
      
      {/* Search & Filter Bar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search covers, 65W GaN chargers, AirPods, iPhones..."
            className="w-full h-11 pl-9 pr-9 bg-white border border-[#cbd5e1] rounded-xl text-sm text-[#0b1c30] placeholder-[#64748b] focus:outline-none focus:border-[#006948] focus:ring-1 focus:ring-[#006948] shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#94a3b8] hover:text-[#0b1c30] p-1"
            >
              ✕
            </button>
          )}
        </div>

        {/* Express shipping quick switch */}
        <button
          onClick={() => setExpressOnly(!expressOnly)}
          className={`h-11 px-3 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all shrink-0 active:scale-95 ${
            expressOnly 
              ? 'bg-[#006948] text-white border-[#006948]' 
              : 'bg-white text-[#475569] border-[#cbd5e1] hover:border-[#94a3b8]'
          }`}
          title="Express 24h shipping filter"
        >
          <Zap className="w-3.5 h-3.5 text-[#f59e0b]" />
          <span className="hidden sm:inline">24h Express</span>
        </button>
      </div>

      {/* Free Delivery Announcement Strip */}
      <div className="w-full py-2 px-3 rounded-xl bg-[#006948] text-white text-xs font-semibold flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-[#68dba9]" />
          <span>Free Delivery over Rs. 3,500 across Pakistan</span>
        </div>
        <span className="text-[11px] font-mono text-[#68dba9] hidden xs:inline">
          TCS & Trax 24-48h
        </span>
      </div>

      {/* Promotional Campaign Hero: Super Ramadan & Tech Deals */}
      <div className="relative w-full rounded-2xl bg-gradient-to-br from-[#0b1c30] via-[#112338] to-[#043324] text-white p-5 sm:p-7 shadow-lg overflow-hidden border border-[#1e293b]">
        {/* Glow decoration */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#006948]/30 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-[#0d9488]/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#006948]/40 border border-[#006948]/60 text-[#68dba9] text-[11px] font-bold tracking-wider uppercase">
            <Sparkles className="w-3 h-3" />
            <span>Super Ramadan & Tech Deals</span>
          </div>

          <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            Up to <span className="text-[#68dba9]">35% OFF</span> on 100% Original Anker, Remax & Samsung
          </h2>

          <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">
            Genuine pin-packed boxes with brand seals, PTA Approved warranty, and Cash on Delivery nationwide.
          </p>

          <div className="flex items-center gap-3 pt-1 flex-wrap">
            <button
              onClick={() => setSelectedCategory('all')}
              className="px-4 py-2.5 rounded-xl bg-[#006948] hover:bg-[#00855d] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md active:scale-95 transition-all"
            >
              <span>Explore Deals</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5 text-xs text-[#a7f3d0]">
              <ShieldCheck className="w-4 h-4 text-[#68dba9]" />
              <span>PTA Approved & 7 Days Replacement</span>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Category Filter Pills */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 px-3.5 py-2 rounded-full text-xs font-bold transition-all active:scale-95 ${
                selectedCategory === cat.id
                  ? 'bg-[#006948] text-white shadow-xs'
                  : 'bg-white text-[#475569] border border-[#e2e8f0] hover:bg-[#f8fafc]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Catalog Status & Quick Filters Strip */}
      <div className="flex items-center justify-between text-xs text-[#64748b] px-1 pt-1">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#006948]" />
          <span className="font-bold text-[#0b1c30]">
            Verified Stock ({filteredProducts.length} items)
          </span>
          {selectedCategory !== 'all' && (
            <span className="text-[#006948]">
              · {categories.find((c) => c.id === selectedCategory)?.label}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {searchQuery || selectedCategory !== 'all' || maxPrice !== null ? (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setMaxPrice(null);
                setOnlyInStock(false);
              }}
              className="text-[#006948] hover:underline text-xs font-semibold"
            >
              Reset Filters
            </button>
          ) : (
            <span className="text-[11px] text-[#94a3b8] font-mono">
              Lahore & Karachi Depots
            </span>
          )}
        </div>
      </div>

      {/* Product Catalog Grid (2 columns mobile, 3-4 columns desktop) */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 px-4 bg-white rounded-2xl border border-[#e2e8f0] space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#f1f5f9] flex items-center justify-center text-[#64748b] mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#0b1c30]">No Products Found</h3>
          <p className="text-xs text-[#64748b] max-w-sm mx-auto">
            We couldn't find items matching "{searchQuery}". Try searching for "charger", "case", "glass", or "phone".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 rounded-xl bg-[#006948] text-white text-xs font-bold hover:bg-[#00855d] transition-all"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* WhatsApp Quick Ordering Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#25d366]/10 via-[#25d366]/5 to-transparent border border-[#25d366]/30 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-[#25d366] text-white flex items-center justify-center shrink-0 shadow-sm">
            <MessageSquare className="w-5 h-5 fill-white" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-[#0b1c30] leading-tight">
              Order Instantly via WhatsApp
            </span>
            <span className="text-xs text-[#475569] truncate">
              Send a screenshot or product title for instant booking
            </span>
          </div>
        </div>

        <button
          onClick={handleWhatsAppOrder}
          className="px-3.5 py-2 rounded-xl bg-[#25d366] hover:bg-[#20bd5a] text-white text-xs font-bold shrink-0 flex items-center gap-1 shadow-xs active:scale-95 transition-all"
        >
          <span>Chat</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Nationwide COD Assurance Banner */}
      <div className="p-5 rounded-2xl bg-white border border-[#e2e8f0] space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#ecfdf5] flex items-center justify-center text-[#006948]">
            <Truck className="w-4 h-4 text-[#006948]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[#0b1c30]">
              Cash on Delivery (COD) Available All Over Pakistan
            </span>
            <span className="text-[11px] text-[#64748b]">
              Reliable door-to-door delivery powered by TCS & Trax Logistics
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#f1f5f9] text-center text-xs text-[#475569]">
          <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-[#f8fafc]">
            <RefreshCw className="w-4 h-4 text-[#006948]" />
            <span className="text-[11px] font-semibold">Open Parcel Checking</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-[#f8fafc]">
            <ShieldCheck className="w-4 h-4 text-[#006948]" />
            <span className="text-[11px] font-semibold">100% Original Seal</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-[#f8fafc]">
            <Check className="w-4 h-4 text-[#006948]" />
            <span className="text-[11px] font-semibold">7 Days Easy Return</span>
          </div>
        </div>
      </div>

    </div>
  );
};
