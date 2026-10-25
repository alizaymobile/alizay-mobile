import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Product, ProductCategory, StockStatus } from '../types';
import { 
  PlusCircle, Trash2, Edit3, ShieldAlert, TrendingUp, 
  Package, CheckCircle2, Search, SlidersHorizontal, AlertTriangle, 
  Sparkles, RefreshCw, X, Image as ImageIcon, Check 
} from 'lucide-react';

// Curated high quality presets for quick image selection when uploading
const PRESET_IMAGES = [
  {
    name: 'GaN Wall Charger',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPYxqqeAzdpQp_CRBTKtTveFiXfHr4HZ6T0dvu-GDxhCown_tJ9e7wplAZikMej5oGw_qMCYgFKSDg893SdCrrQ4dDu6g3V5EQqwCKZeFAUVoCUDn_iHdoQ0MYURrGofnDln0jmzYC3nXOa3hkPfmcYxcZ-ZMrKd0Dxb8BADEh5iC93Pl-_OQ1Ubmvgche-z2CdvnfjfHwotWElLNEBoZripcCd5azDz9ivWSpM2MIbJ2Xf-D6s2z3',
  },
  {
    name: 'MagSafe Titanium Case',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjV4EsdhsALooC8vwCGWmE2w4APLiFa7bIX0WUZrtifGQw4UxWq7zYNL9l7giWFbLCTcdMxUeA1yYIur6OXev2PFgP1JJxpoNVO4HHFdJXxmLmVJJMTYR39yuAEIHeOieqbbCz4AbXXl9Mx9aeVidA47EQPG-19P_xuimb6mnn0yhG7qXy482pJXOIBuFxCumyzQ3bgZ5ycfPZVFa2yLTgc81kLISu0uVwMsjTe020BwkKdEahng-7',
  },
  {
    name: '9H Privacy Screen Glass',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANoSKzjYCH3UlTz4FnKjswIqqBbNPa4S7ZHfIohfXsjijdi6cC1TVgPSNcMf6c2B6MUtJSZIbXgtm0MfyloMIL4_sIPrGZEcWzrY-6zWMkDVJpThc3ceDpS5Z9-S1kw_ImuXirlEgRBn4eX-jpYfhBLt-m9pCQRBQn4MLPtVnDnnwrjWW8FWfEEZdotrovzjhoPOFUeMkDVZhV3VRk6wSpvfp9juaLCTTMkk9gen2V11uBx3fo0qFo',
  },
  {
    name: 'ANC Wireless Earbuds',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgmVO7ZzP1OVbg6mZmZL-oYoevZhMe8RBJQqIuDm5yG6m_5ru37K1OttttNfyPZIxi2hWbkl-JOagWEr_tS5HqDfW8SdAVoZ8gHzI-TpPzTxWTUhYScw10A-T4VJ-iBc2FAnlB1BlOPJNfbb1iXvGyPDY7xROnq4J3lL-ChUWJUJPrAEr6eB63r9LPBcXqouEUOg3GotpJfcJdruzhG5Efjiqp8m1Uc5N0QCPjR6_QCItfbCGpttqe',
  },
  {
    name: 'Magnetic Power Bank',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcAYr2UCFTudIPGyJVwh0dtc36O9hcdNHB7FNdGKj36xUNMdVDhJgCHlxazUUpZipvESKq8QLmOuaJcJ230ILkPBrArB3Pm7GlXAXSrAD0Erp6BTvlYdy4YB9cXSimp5myzTOUyGlEKvkJvuHqVBOYGle6d5cwL-rLAzMTKWBIlqcGaa7G1Rm4ddrxd5WJz_3eyg1lSDBzHkWIyAiz4SiWG79FIiJQGRX-B-wjw402S_pY9nwA19Nu',
  },
  {
    name: 'Kevlar Braided 100W Cable',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwdeDmgfm6BYQ5SBsjleLV9su8BHWrQdr668ttAr3GYOJUx8NBKhF5WBZJXlx3JWh1gv6llpgjAKjuS79r1sGgk7VQgaZf5Z6CzkiIVQdyYKGrOXsz2q2N5D-uv1FeaYrt-ReSCL_1ljxSW2y3FVjg0vgAQyIQ1iVGoxwcvLkZoccMjxhGdunxLoWxqWgbHG_M_fTmPzYZRIQ9CHKQu2A_iqYKqY4JNmUX9UQg0ZJgSMEITlCCzfgN',
  },
  {
    name: 'iPhone 16 Pro Max Titanium',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAL2PvvhND9jrOzaos_Jjcz2ZSZ1ceq6TqZjyKD0kBeVJEhfFhJv8ReppvcfaAJWl-8cl6RC_zyC1jwyzxOv25lFeNYhz32Q7yErXnOY-TgYqJbUpIR8EorUVzyETbHtYE8id_dm2RwsTpajFxkobwhTFMCtzIKfZoJz_iCE72hTVe46U5vX7E78DCpiGz-R2vwzoR-3vNja6tfPduxojtYy6j47NjMb0wsg5qTEobnX5-xV204jsoh',
  },
];

export const AdminPortalView: React.FC = () => {
  const { 
    products, 
    addProduct, 
    deleteProduct, 
    updateProduct, 
    resetProductsToDefault,
    orders, 
    updateOrderStatus,
    showToast 
  } = useShop();

  const [adminTab, setAdminTab] = useState<'catalog' | 'upload' | 'orders'>('catalog');
  const [adminSearch, setAdminSearch] = useState('');
  const [stockFilter, setStockFilter] = useState<'all' | 'low_stock' | 'in_stock'>('all');

  // Delete product confirmation state
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Edit product state
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  // Upload Form State
  const [newTitle, setNewTitle] = useState('');
  const [newBrand, setNewBrand] = useState('Anker');
  const [newCategory, setNewCategory] = useState<ProductCategory>('chargers');
  const [newPrice, setNewPrice] = useState('4500');
  const [newOriginalPrice, setNewOriginalPrice] = useState('5500');
  const [newStock, setNewStock] = useState('50');
  const [newSku, setNewSku] = useState(`ALZ-${Math.floor(100 + Math.random() * 900)}`);
  const [newImageUrl, setNewImageUrl] = useState(PRESET_IMAGES[0].url);
  const [newDesc, setNewDesc] = useState('');
  const [newWarranty, setNewWarranty] = useState('1 Year Official Brand Warranty');
  const [newIsPta, setNewIsPta] = useState(false);
  const [newModel, setNewModel] = useState('Universal Type-C / MagSafe');

  // Filtered catalog in admin view
  const displayedProducts = products.filter((p) => {
    if (stockFilter === 'low_stock' && p.stockStatus !== 'low_stock') return false;
    if (stockFilter === 'in_stock' && p.stockStatus !== 'in_stock') return false;
    if (adminSearch.trim()) {
      const q = adminSearch.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const lowStockCount = products.filter((p) => p.stockStatus === 'low_stock' || p.stockUnits < 10).length;

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      showToast('Product title is required', undefined, 'error');
      return;
    }

    const priceNum = parseFloat(newPrice) || 1000;
    const origPriceNum = parseFloat(newOriginalPrice) || priceNum;
    const stockNum = parseInt(newStock, 10) || 10;
    const discountPercent = origPriceNum > priceNum 
      ? Math.round(((origPriceNum - priceNum) / origPriceNum) * 100) 
      : 0;

    const categoryLabels: Record<ProductCategory, string> = {
      chargers: 'Fast Chargers',
      cases: 'Shockproof Cases',
      glass: '9H Glass Protectors',
      audio: 'Earbuds & Audio',
      powerbanks: 'Power Banks',
      phones: 'Mobile Phones',
      cables: 'Heavy-Duty Cables',
    };

    addProduct({
      sku: newSku.toUpperCase(),
      name: newTitle.trim(),
      brand: newBrand,
      category: newCategory,
      categoryLabel: categoryLabels[newCategory] || 'Accessories',
      price: priceNum,
      originalPrice: origPriceNum,
      discountPercent,
      rating: 4.9,
      reviewCount: 1,
      stockUnits: stockNum,
      stockStatus: stockNum < 10 ? 'low_stock' : 'in_stock',
      isOfficialWarranty: true,
      warrantyText: newWarranty,
      isPtaApproved: newIsPta,
      image: newImageUrl,
      galleryImages: [newImageUrl],
      shortDesc: newDesc || `${newBrand} premium accessories with authentic warranty`,
      description: newDesc || `Official ${newTitle} imported directly by Alizeh Mobile Shop. Tested for endurance and verified authentic.`,
      compatibleModels: [newModel],
      colorVariants: [
        { name: 'Matte Obsidian', hex: '#111827' },
        { name: 'Titanium Raw', hex: '#64748b' },
      ],
      specs: [
        { label: 'Condition', value: '100% Brand New Pin-Packed' },
        { label: 'Warranty', value: newWarranty },
        { label: 'Authenticity', value: 'Alizeh Mobile Shop Verified' },
      ],
    });

    // Reset fields
    setNewTitle('');
    setNewDesc('');
    setNewSku(`ALZ-${Math.floor(100 + Math.random() * 900)}`);
    setAdminTab('catalog');
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id);
      setProductToDelete(null);
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (productToEdit) {
      updateProduct(productToEdit);
      setProductToEdit(null);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 space-y-4 pb-20">
      
      {/* Live Order Pulse Alert */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#006948] to-[#0d9488] text-white p-3.5 shadow-sm">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
            </span>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-bold truncate">LIVE COD ORDER • 3m ago</span>
                <span className="px-1.5 py-0.2 rounded-md bg-white/20 text-[10px] font-mono">
                  #PK-8841 Rawalpindi
                </span>
              </div>
              <span className="text-[11px] text-white/80">Alex Morgan • Rs. 6,300 (2 items)</span>
            </div>
          </div>

          <button
            onClick={() => setAdminTab('orders')}
            className="px-3 py-1 rounded-xl bg-white text-[#006948] text-xs font-bold hover:bg-white/90 active:scale-95 transition-all shrink-0"
          >
            Review Orders
          </button>
        </div>
      </div>

      {/* Terminal Title & Hub Status */}
      <div className="flex items-center justify-between px-1">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b]">
            Admin Control Terminal
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0b1c30]">
            Lahore & Karachi Hubs
          </h1>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ecfdf5] border border-[#a7f3d0] text-[#006948] text-xs font-bold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Synced</span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Sales Today */}
        <div className="p-4 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-[#64748b]">
            <span>Today's Total Sales</span>
            <span className="px-1.5 py-0.5 rounded bg-[#ecfdf5] text-[#006948] font-bold text-[10px]">
              +14.2%
            </span>
          </div>
          <div className="text-2xl font-black font-mono text-[#0b1c30]">
            Rs. 485,200 <span className="text-xs text-[#64748b] font-normal">PKR</span>
          </div>
          <p className="text-[11px] text-[#64748b]">Vs. yesterday (Rs. 424,800)</p>
        </div>

        {/* Orders Today */}
        <div className="p-4 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-[#64748b]">
            <span>Orders Today</span>
            <Package className="w-4 h-4 text-[#006948]" />
          </div>
          <div className="text-2xl font-black font-mono text-[#0b1c30]">
            {orders.length + 71}
          </div>
          <p className="text-[11px] text-[#64748b]">52 COD Pending • 22 Dispatched</p>
        </div>

        {/* Active SKUs & Stock alert */}
        <div className="p-4 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-[#64748b]">
            <span>Active Catalog</span>
            {lowStockCount > 0 ? (
              <span className="px-1.5 py-0.5 rounded bg-[#fff1f2] text-[#e11d48] font-bold text-[10px] flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {lowStockCount} Low Stock
              </span>
            ) : (
              <Check className="w-4 h-4 text-[#006948]" />
            )}
          </div>
          <div className="text-2xl font-black font-mono text-[#0b1c30]">
            {products.length} SKUs
          </div>
          <p className="text-[11px] text-[#64748b]">Live in Alizeh Mobile Shop storefront</p>
        </div>
      </div>

      {/* Main Admin Navigation Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <button
          onClick={() => setAdminTab('upload')}
          className={`flex-1 min-w-[160px] h-12 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all ${
            adminTab === 'upload'
              ? 'bg-[#006948] text-white shadow-md'
              : 'bg-[#ecfdf5] border border-[#a7f3d0] text-[#006948] hover:bg-[#d1fae5]'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Upload New Product</span>
        </button>

        <button
          onClick={() => setAdminTab('catalog')}
          className={`flex-1 min-w-[140px] h-12 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border transition-all ${
            adminTab === 'catalog'
              ? 'bg-[#006948] text-white border-[#006948] shadow-md'
              : 'bg-white text-[#475569] border-[#cbd5e1] hover:bg-[#f8fafc]'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Manage Stock ({products.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('orders')}
          className={`flex-1 min-w-[130px] h-12 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border transition-all ${
            adminTab === 'orders'
              ? 'bg-[#006948] text-white border-[#006948] shadow-md'
              : 'bg-white text-[#475569] border-[#cbd5e1] hover:bg-[#f8fafc]'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Orders Feed ({orders.length})</span>
        </button>
      </div>

      {/* TAB 1: UPLOAD NEW PRODUCT FORM */}
      {adminTab === 'upload' && (
        <form
          onSubmit={handleUploadSubmit}
          className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm space-y-4"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#f1f5f9]">
            <div>
              <h2 className="text-base font-extrabold text-[#0b1c30]">
                New Hardware & Phone Listing
              </h2>
              <p className="text-xs text-[#64748b]">
                Add accessories or smartphones directly into Alizeh Mobile Shop catalog
              </p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#ecfdf5] text-[#006948] font-mono text-xs font-bold">
              LIVE PUSH
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Product Name */}
            <div>
              <label className="block text-[11px] font-bold text-[#475569] uppercase mb-1">
                Product Title *
              </label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Anker 100W 4-Port GaN Desktop Charger Hub"
                className="w-full h-11 px-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-xs text-[#0b1c30] focus:outline-none focus:border-[#006948]"
              />
            </div>

            {/* Category & Brand */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-[#475569] uppercase mb-1">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as ProductCategory)}
                  className="w-full h-11 px-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-xs text-[#0b1c30] focus:outline-none focus:border-[#006948]"
                >
                  <option value="chargers">Fast Chargers</option>
                  <option value="cases">Shockproof Cases</option>
                  <option value="glass">9H Glass Protectors</option>
                  <option value="audio">Earbuds & Audio</option>
                  <option value="powerbanks">Power Banks</option>
                  <option value="phones">Mobile Phones</option>
                  <option value="cables">Heavy-Duty Cables</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#475569] uppercase mb-1">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={newBrand}
                  onChange={(e) => setNewBrand(e.target.value)}
                  placeholder="e.g. Anker, Apple, Samsung, Remax"
                  className="w-full h-11 px-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-xs text-[#0b1c30] focus:outline-none focus:border-[#006948]"
                />
              </div>
            </div>

            {/* SKU and Stock */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-[#475569] uppercase mb-1">
                  SKU Code
                </label>
                <input
                  type="text"
                  value={newSku}
                  onChange={(e) => setNewSku(e.target.value)}
                  placeholder="ANK-65-GAN"
                  className="w-full h-11 px-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-xs font-mono uppercase text-[#0b1c30] focus:outline-none focus:border-[#006948]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#475569] uppercase mb-1">
                  Stock Units Available
                </label>
                <input
                  type="number"
                  min="1"
                  value={newStock}
                  onChange={(e) => setNewStock(e.target.value)}
                  placeholder="50"
                  className="w-full h-11 px-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-xs font-mono text-[#0b1c30] focus:outline-none focus:border-[#006948]"
                />
              </div>
            </div>

            {/* Pricing Dual Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-[#475569] uppercase mb-1">
                  Original Price (PKR Rs.)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b] font-mono">
                    Rs.
                  </span>
                  <input
                    type="number"
                    value={newOriginalPrice}
                    onChange={(e) => setNewOriginalPrice(e.target.value)}
                    placeholder="5500"
                    className="w-full h-11 pl-10 pr-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-xs font-mono text-[#0b1c30] focus:outline-none focus:border-[#006948]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#006948] uppercase mb-1">
                  Selling Price (PKR Rs.) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#006948] font-mono font-bold">
                    Rs.
                  </span>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="4200"
                    className="w-full h-11 pl-10 pr-3 bg-[#f8fafc] border border-[#006948] rounded-xl text-xs font-mono font-bold text-[#006948] focus:outline-none focus:ring-1 focus:ring-[#006948]"
                  />
                </div>
              </div>
            </div>

            {/* PTA and Warranty Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newIsPta}
                  onChange={(e) => setNewIsPta(e.target.checked)}
                  className="w-4 h-4 text-[#006948] rounded"
                />
                <span className="text-xs font-bold text-[#0b1c30]">
                  Official PTA Approved (Tax Paid)
                </span>
              </label>

              <div>
                <label className="block text-[10px] font-bold text-[#475569] uppercase mb-0.5">
                  Warranty Coverage
                </label>
                <input
                  type="text"
                  value={newWarranty}
                  onChange={(e) => setNewWarranty(e.target.value)}
                  placeholder="e.g. 1 Year Official Brand Warranty"
                  className="w-full h-8 px-2 bg-white border border-[#cbd5e1] rounded-lg text-xs text-[#0b1c30]"
                />
              </div>
            </div>

            {/* Product Visual Selection: Presets or Custom URL */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-[#475569] uppercase">
                Product Image (Select High-Res Preset or Custom URL)
              </label>
              
              <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
                {PRESET_IMAGES.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setNewImageUrl(preset.url)}
                    className={`relative p-1 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                      newImageUrl === preset.url
                        ? 'border-[#006948] bg-[#ecfdf5] ring-2 ring-[#006948]/20'
                        : 'border-[#e2e8f0] bg-white hover:bg-[#f8fafc]'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-lg bg-[#f8fafc] overflow-hidden flex items-center justify-center p-1">
                      <img
                        src={preset.url}
                        alt={preset.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>
                    <span className="text-[9px] font-medium text-[#475569] text-center line-clamp-1">
                      {preset.name}
                    </span>
                  </button>
                ))}
              </div>

              <div className="relative mt-2">
                <input
                  type="url"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="Or paste custom image URL: https://..."
                  className="w-full h-10 px-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-xs font-mono text-[#0b1c30] focus:outline-none focus:border-[#006948]"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-[11px] font-bold text-[#475569] uppercase mb-1">
                Description & Key Highlights
              </label>
              <textarea
                rows={3}
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Mention wattage, drop resistance, fast charging protocol, or PTA Dirbs status..."
                className="w-full p-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-xs text-[#0b1c30] focus:outline-none focus:border-[#006948] resize-none"
              />
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex items-center gap-2">
            <button
              type="submit"
              className="flex-1 h-13 py-3 rounded-xl bg-[#006948] hover:bg-[#00855d] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#006948]/20 active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Publish Product to Storefront</span>
            </button>
            <button
              type="button"
              onClick={() => setAdminTab('catalog')}
              className="h-13 px-4 rounded-xl bg-[#f1f5f9] text-[#64748b] font-bold text-xs hover:bg-[#e2e8f0]"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: ACTIVE CATALOG WITH DELETE & EDIT CONTROLS */}
      {adminTab === 'catalog' && (
        <div className="space-y-3">
          {/* Filter Bar */}
          <div className="p-3.5 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={adminSearch}
                onChange={(e) => setAdminSearch(e.target.value)}
                placeholder="Search catalog by title, SKU, or brand..."
                className="w-full h-9 pl-8 pr-3 text-xs bg-[#f8fafc] border border-[#cbd5e1] rounded-lg text-[#0b1c30] focus:outline-none focus:border-[#006948]"
              />
            </div>

            <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end">
              <button
                onClick={() => setStockFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  stockFilter === 'all'
                    ? 'bg-[#006948] text-white'
                    : 'bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]'
                }`}
              >
                All ({products.length})
              </button>
              <button
                onClick={() => setStockFilter('low_stock')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  stockFilter === 'low_stock'
                    ? 'bg-[#e11d48] text-white'
                    : 'bg-[#fff1f2] text-[#e11d48] hover:bg-[#ffe4e6]'
                }`}
              >
                Low Stock ({lowStockCount})
              </button>
              <button
                onClick={resetProductsToDefault}
                title="Reset to default items"
                className="px-2.5 py-1.5 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] text-[#64748b] hover:text-[#0b1c30] text-xs font-bold flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Reset Defaults</span>
              </button>
            </div>
          </div>

          {/* Product Cards in Admin */}
          <div className="space-y-2.5">
            {displayedProducts.map((product) => (
              <div
                key={product.id}
                className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-[#cbd5e1] transition-all"
              >
                {/* Left: Thumbnail & Info */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#f8fafc] border border-[#f1f5f9] p-1 shrink-0 overflow-hidden flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>

                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-[#64748b] bg-[#f1f5f9] px-2 py-0.5 rounded">
                        {product.sku}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          product.stockStatus === 'low_stock'
                            ? 'bg-[#fff1f2] text-[#e11d48]'
                            : 'bg-[#ecfdf5] text-[#006948]'
                        }`}
                      >
                        {product.stockStatus === 'low_stock' ? 'Low Stock' : 'In Stock'}
                      </span>
                    </div>

                    <h3 className="text-xs sm:text-sm font-bold text-[#0b1c30] truncate mt-1">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-2 text-xs text-[#64748b] mt-0.5">
                      <span>Stock: <strong className="text-[#0b1c30]">{product.stockUnits} units</strong></span>
                      <span>·</span>
                      <span className="text-[#006948] font-semibold">{product.brand}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Price & Explicit Action Controls */}
                <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#f1f5f9]">
                  <div className="flex flex-col sm:text-right">
                    <span className="font-mono font-bold text-sm sm:text-base text-[#006948]">
                      Rs. {product.price.toLocaleString()}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-[10px] font-mono text-[#94a3b8] line-through">
                        Rs. {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Edit button */}
                    <button
                      onClick={() => setProductToEdit({ ...product })}
                      className="px-3 py-1.5 rounded-xl bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#0b1c30] text-xs font-bold flex items-center gap-1 transition-colors"
                      title="Edit price and inventory"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    {/* Delete Product Button */}
                    <button
                      onClick={() => setProductToDelete(product)}
                      className="px-3 py-1.5 rounded-xl bg-[#fff1f2] hover:bg-[#ffe4e6] text-[#e11d48] text-xs font-bold flex items-center gap-1 transition-colors active:scale-95"
                      title="Delete product from catalog"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Product</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: DISPATCH ORDERS PIPELINE */}
      {adminTab === 'orders' && (
        <div className="space-y-3">
          <div className="p-3.5 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#0b1c30]">Recent Dispatch Orders</h2>
            <span className="text-xs text-[#006948] font-semibold">TCS & Leopard Courier Tracking</span>
          </div>

          <div className="space-y-2.5">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-4 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-[#006948]">
                      {order.orderNumber}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        order.status === 'cod_pending'
                          ? 'bg-[#fef3c7] text-[#92400e]'
                          : order.status === 'processing'
                          ? 'bg-[#e0f2fe] text-[#0369a1]'
                          : order.status === 'dispatched'
                          ? 'bg-[#ecfdf5] text-[#065f46]'
                          : 'bg-[#f1f5f9] text-[#475569]'
                      }`}
                    >
                      {order.status.replace('_', ' ')}
                    </span>
                  </div>
                  <span className="font-mono font-bold text-sm text-[#0b1c30]">
                    Rs. {order.total.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#0b1c30]">{order.customerName}</span>
                    <span className="text-[#64748b]"> • {order.city} ({order.phone})</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#94a3b8]">{order.createdAt}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#f8fafc] text-xs text-[#475569] space-y-1">
                  {order.items.map((it, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="truncate">{it.productName} ({it.model || 'Standard'}) x{it.quantity}</span>
                      <span className="font-mono text-[#006948]">Rs. {(it.price * it.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                {/* Status action buttons */}
                <div className="flex items-center gap-2 pt-1 flex-wrap">
                  {order.status === 'cod_pending' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'processing')}
                      className="px-3 py-1.5 rounded-xl bg-[#006948] hover:bg-[#00855d] text-white text-xs font-bold transition-all"
                    >
                      Verify & Mark Processing
                    </button>
                  )}
                  {order.status === 'processing' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'dispatched', `TCS-${Date.now().toString().slice(-6)}`)}
                      className="px-3 py-1.5 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold transition-all"
                    >
                      Dispatch via TCS
                    </button>
                  )}
                  {order.status === 'dispatched' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'delivered')}
                      className="px-3 py-1.5 rounded-xl bg-[#10b981] hover:bg-[#059669] text-white text-xs font-bold transition-all"
                    >
                      Confirm Doorstep Delivery
                    </button>
                  )}
                  {order.trackingNumber && (
                    <span className="text-xs font-mono text-[#64748b] bg-[#f1f5f9] px-2.5 py-1 rounded-lg">
                      Courier Tracking: {order.trackingNumber}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DELETE PRODUCT CONFIRMATION MODAL */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl border border-[#e2e8f0] p-5 shadow-2xl space-y-4 animate-scaleUp">
            <div className="w-12 h-12 rounded-full bg-[#fff1f2] text-[#e11d48] flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-base font-extrabold text-[#0b1c30]">
                Delete Product from Store?
              </h3>
              <p className="text-xs text-[#64748b]">
                Are you sure you want to remove <strong className="text-[#0b1c30]">"{productToDelete.name}"</strong> (SKU: {productToDelete.sku}) from Alizeh Mobile Shop catalog?
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#f8fafc] border border-[#f1f5f9] flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-white p-1 border border-[#e2e8f0] overflow-hidden shrink-0">
                <img
                  src={productToDelete.image}
                  alt={productToDelete.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-[#0b1c30] truncate">
                  {productToDelete.name}
                </span>
                <span className="font-mono text-xs font-bold text-[#006948]">
                  Rs. {productToDelete.price.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-[#e11d48] hover:bg-[#be123c] text-white font-bold text-xs shadow-md active:scale-95 transition-all"
              >
                Yes, Delete Product
              </button>
              <button
                onClick={() => setProductToDelete(null)}
                className="flex-1 py-2.5 rounded-xl bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#0b1c30] font-bold text-xs transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT PRODUCT MODAL */}
      {productToEdit && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveEdit}
            className="w-full max-w-md bg-white rounded-2xl border border-[#e2e8f0] p-5 shadow-2xl space-y-4 animate-scaleUp text-xs"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#f1f5f9]">
              <h3 className="text-sm font-extrabold text-[#0b1c30]">
                Quick Edit: {productToEdit.sku}
              </h3>
              <button
                type="button"
                onClick={() => setProductToEdit(null)}
                className="text-[#94a3b8] hover:text-[#0b1c30]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-[#475569] uppercase mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  value={productToEdit.name}
                  onChange={(e) => setProductToEdit({ ...productToEdit, name: e.target.value })}
                  className="w-full h-10 px-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-xs text-[#0b1c30]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-[#475569] uppercase mb-1">
                    Selling Price (PKR Rs.)
                  </label>
                  <input
                    type="number"
                    required
                    value={productToEdit.price}
                    onChange={(e) => setProductToEdit({ ...productToEdit, price: parseFloat(e.target.value) || 0 })}
                    className="w-full h-10 px-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-xs font-mono font-bold text-[#006948]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#475569] uppercase mb-1">
                    Stock Units
                  </label>
                  <input
                    type="number"
                    required
                    value={productToEdit.stockUnits}
                    onChange={(e) => {
                      const units = parseInt(e.target.value, 10) || 0;
                      setProductToEdit({ 
                        ...productToEdit, 
                        stockUnits: units,
                        stockStatus: units < 10 ? 'low_stock' : 'in_stock'
                      });
                    }}
                    className="w-full h-10 px-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-xs font-mono text-[#0b1c30]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#475569] uppercase mb-1">
                  Stock Status
                </label>
                <select
                  value={productToEdit.stockStatus}
                  onChange={(e) => setProductToEdit({ ...productToEdit, stockStatus: e.target.value as StockStatus })}
                  className="w-full h-10 px-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-xs text-[#0b1c30]"
                >
                  <option value="in_stock">In Stock</option>
                  <option value="low_stock">Low Stock (Threshold Alert)</option>
                  <option value="pre_order">Pre-Order</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-[#006948] hover:bg-[#00855d] text-white font-bold text-xs shadow-md active:scale-95 transition-all"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setProductToEdit(null)}
                className="py-2.5 px-4 rounded-xl bg-[#f1f5f9] text-[#64748b] font-bold text-xs"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
