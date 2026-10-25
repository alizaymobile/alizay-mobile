import React, { useState } from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { INITIAL_REVIEWS } from '../data/initialProducts';
import { 
  ArrowLeft, Share2, Heart, Star, ShieldCheck, Check, 
  Truck, MessageSquare, ShoppingBag, Zap, CheckCircle2 
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart, setActiveTab, showToast } = useShop();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedModel, setSelectedModel] = useState<string>(
    product.compatibleModels?.[0] || 'Standard Version'
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colorVariants?.[0]?.name || 'Standard'
  );
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const images = product.galleryImages && product.galleryImages.length > 0 
    ? product.galleryImages 
    : [product.image];

  const currentDisplayImage = images[activeImageIndex] || product.image;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} at Alizeh Mobile Shop for PKR ${product.price.toLocaleString()}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      showToast('Link copied to clipboard!', 'Share with friends on WhatsApp');
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedModel, selectedColor);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedModel, selectedColor);
    onClose();
    setActiveTab('cart');
  };

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `As-salamu alaykum Alizeh Mobile Shop! I want to order/inquire about: ${product.name} (SKU: ${product.sku}) in ${selectedColor} for ${selectedModel}. Price: PKR ${product.price.toLocaleString()}. Please confirm availability.`
    );
    window.open(`https://wa.me/923001234567?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex justify-center animate-fadeIn">
      <div className="relative w-full max-w-lg min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col shadow-2xl pb-28">
        
        {/* Top Header Sticky Bar */}
        <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-[#e2e8f0] px-4 py-3 flex items-center justify-between pt-safe">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#f1f5f9] hover:bg-[#e2e8f0] flex items-center justify-center text-[#0b1c30] active:scale-95 transition-all"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">
                {product.categoryLabel}
              </span>
              <span className="text-sm font-bold text-[#0b1c30] truncate max-w-[190px]">
                {product.name}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleShare}
              className="w-9 h-9 rounded-full bg-[#f1f5f9] hover:bg-[#e2e8f0] flex items-center justify-center text-[#0b1c30] active:scale-95 transition-all"
              aria-label="Share product"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="w-9 h-9 rounded-full bg-[#f1f5f9] hover:bg-[#e2e8f0] flex items-center justify-center text-[#64748b] active:scale-95 transition-all"
              aria-label="Wishlist"
            >
              <Heart
                className={`w-4 h-4 ${
                  isWishlisted ? 'fill-[#e11d48] text-[#e11d48]' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-4">
          
          {/* Main Showcase Image Stage */}
          <div className="relative w-full aspect-square rounded-2xl bg-white border border-[#e2e8f0] overflow-hidden flex items-center justify-center p-4 shadow-xs">
            <img
              src={currentDisplayImage}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain mix-blend-multiply transition-all duration-300"
            />

            {/* Overlaid Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
              {product.isPtaApproved && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#006948] text-white text-[10px] font-bold tracking-wider uppercase shadow-xs flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  PTA Approved Store
                </span>
              )}
              {product.discountPercent && (
                <span className="px-2 py-0.5 rounded-full bg-[#fff1f2] border border-[#fecdd3] text-[#e11d48] text-[10px] font-bold">
                  ⚡ {product.discountPercent}% FLASH DEAL
                </span>
              )}
            </div>

            <div className="absolute bottom-3 right-3 text-[10px] font-mono text-[#94a3b8] flex items-center gap-1 bg-white/80 px-2 py-0.5 rounded-md backdrop-blur-xs">
              <span>SKU: {product.sku}</span>
            </div>
          </div>

          {/* Thumbnails row */}
          {images.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-16 h-16 rounded-xl overflow-hidden bg-white border-2 p-1 shrink-0 transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#006948] ring-2 ring-[#006948]/20'
                      : 'border-[#e2e8f0] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${product.name} view ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Title & Trust Header */}
          <div className="flex flex-col gap-1.5 bg-white p-4 rounded-2xl border border-[#e2e8f0]">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#006948]">
                {product.brand} • {product.categoryLabel}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#fef3c7] text-[#92400e] text-[10px] font-bold">
                🔥 #1 Top Seller
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0b1c30] tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* Rating & Verified Buyers */}
            <div className="flex items-center gap-2 pt-0.5 text-xs text-[#64748b] flex-wrap">
              <div className="flex items-center text-[#f59e0b]">
                <Star className="w-4 h-4 fill-[#f59e0b]" />
                <span className="ml-1 font-bold font-mono text-[#0b1c30] text-sm">
                  {product.rating}
                </span>
              </div>
              <span>({product.reviewCount} verified Pakistani buyers)</span>
              <span>·</span>
              <span className="text-[#006948] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#006948]" />
                100% Genuine
              </span>
            </div>

            {/* Warranty & Warehouse status */}
            <div className="mt-2 pt-2 border-t border-[#f1f5f9] grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-[#065f46] font-medium">
                <ShieldCheck className="w-4 h-4 text-[#006948] shrink-0" />
                <span className="truncate">{product.warrantyText}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#0369a1] font-medium">
                <span className="w-2 h-2 rounded-full bg-[#0284c7] animate-pulse" />
                <span>Lahore Hub: Ready to ship</span>
              </div>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="p-4 rounded-2xl bg-white border border-[#e2e8f0] flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black font-mono text-[#006948]">
                  Rs. {product.price.toLocaleString()}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm font-mono text-[#94a3b8] line-through">
                    Rs. {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {product.originalPrice > product.price && (
                <span className="text-xs font-bold text-[#e11d48]">
                  Save Rs. {(product.originalPrice - product.price).toLocaleString()} today
                </span>
              )}
            </div>

            <div className="flex flex-col items-end text-right">
              <span className="px-2.5 py-1 rounded-full bg-[#ecfdf5] text-[#006948] text-xs font-bold uppercase tracking-wider">
                In Stock
              </span>
              <span className="text-[11px] text-[#64748b] mt-1">Dispatches in 2 hrs</span>
            </div>
          </div>

          {/* Free Shipping Callout */}
          <div className="p-3.5 rounded-xl bg-[#ecfdf5] border border-[#a7f3d0] flex items-start gap-2.5 text-xs text-[#065f46]">
            <Truck className="w-5 h-5 text-[#006948] shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <span className="font-bold text-sm text-[#006948]">
                Standard TCS Express Delivery
              </span>
              <span className="text-[#065f46] mt-0.5">
                Cart subtotal qualifies for <span className="font-bold">Free Shipping</span> on orders over Rs. 3,500. Standard rate Rs. 250 waived.
              </span>
            </div>
          </div>

          {/* Phone Model Compatibility Selector */}
          {product.compatibleModels && product.compatibleModels.length > 0 && (
            <div className="bg-white p-4 rounded-2xl border border-[#e2e8f0] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#0b1c30] uppercase tracking-wider">
                  Select Model / Variant:
                </span>
                <span className="text-[#006948] font-semibold">{selectedModel}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {product.compatibleModels.map((model) => (
                  <button
                    key={model}
                    onClick={() => setSelectedModel(model)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-medium text-center border transition-all truncate ${
                      selectedModel === model
                        ? 'bg-[#006948] text-white border-[#006948] shadow-xs'
                        : 'bg-[#f8fafc] text-[#0b1c30] border-[#cbd5e1] hover:border-[#94a3b8]'
                    }`}
                  >
                    {model}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color / Finish Selector */}
          {product.colorVariants && product.colorVariants.length > 0 && (
            <div className="bg-white p-4 rounded-2xl border border-[#e2e8f0] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#0b1c30] uppercase tracking-wider">
                  Select Finish / Color:
                </span>
                <span className="text-[#006948] font-semibold">{selectedColor}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {product.colorVariants.map((variant) => (
                  <button
                    key={variant.name}
                    onClick={() => setSelectedColor(variant.name)}
                    className={`p-2 rounded-xl flex items-center gap-2 border transition-all ${
                      selectedColor === variant.name
                        ? 'border-[#006948] bg-[#ecfdf5] shadow-xs'
                        : 'border-[#e2e8f0] bg-[#f8fafc] hover:bg-white'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full border border-black/10 shrink-0 shadow-inner flex items-center justify-center"
                      style={{ backgroundColor: variant.hex }}
                    >
                      {selectedColor === variant.name && (
                        <Check className="w-3 h-3 text-white filter drop-shadow" />
                      )}
                    </span>
                    <span className="text-xs font-medium text-[#0b1c30] truncate">
                      {variant.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tactical Specifications */}
          {product.specs && product.specs.length > 0 && (
            <div className="bg-white p-4 rounded-2xl border border-[#e2e8f0] space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0b1c30]">
                Tactical Specifications
              </h3>
              <p className="text-xs text-[#64748b]">
                {product.description}
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2">
                {product.specs.map((spec, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] flex flex-col">
                    <span className="text-[10px] font-semibold text-[#64748b] uppercase">
                      {spec.label}
                    </span>
                    <span className="text-xs font-bold text-[#0b1c30] mt-0.5 leading-snug">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Alizeh Buyer Protection Guarantee Checklist */}
          <div className="bg-white p-4 rounded-2xl border border-[#e2e8f0] space-y-3">
            <div className="flex items-center gap-2 text-[#006948] font-bold text-sm">
              <ShieldCheck className="w-5 h-5" />
              <span>Alizeh Buyer Protection Guarantee</span>
            </div>

            <div className="space-y-2 text-xs text-[#475569]">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#006948] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#0b1c30]">Cash on Delivery (COD) Nationwide:</span> Pay safely at your doorstep across 150+ cities in Pakistan.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#006948] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#0b1c30]">Open Parcel Before Payment Optional:</span> Inspect the packaging and seal before handing cash to the courier.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#006948] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#0b1c30]">Swift 24-48 Hours Express Dispatch:</span> Dispatched via TCS / Leopard Courier directly from Hafeez Centre, Lahore.
                </div>
              </div>
            </div>

            {/* WhatsApp Support CTA */}
            <button
              onClick={handleWhatsAppInquiry}
              className="w-full py-2.5 px-3 rounded-xl bg-[#25d366]/10 hover:bg-[#25d366]/20 border border-[#25d366]/30 text-[#128c7e] text-xs font-bold flex items-center justify-center gap-2 transition-colors mt-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Questions? Chat with our Lahore Tech Rep on WhatsApp</span>
            </button>
          </div>

          {/* Customer Reviews Spotlight */}
          <div className="bg-white p-4 rounded-2xl border border-[#e2e8f0] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-sm text-[#0b1c30]">Verified Customer Review</span>
              <span className="text-[#006948] font-semibold">View all {product.reviewCount}</span>
            </div>

            <div className="p-3 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#006948] text-white text-[10px] font-bold flex items-center justify-center">
                    MZ
                  </div>
                  <span className="font-bold text-[#0b1c30]">{INITIAL_REVIEWS[0].author}</span>
                  <span className="text-[10px] text-[#64748b]">({INITIAL_REVIEWS[0].city})</span>
                </div>
                <div className="flex text-[#f59e0b]">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-3 h-3 fill-[#f59e0b]" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-[#475569] italic">
                "{INITIAL_REVIEWS[0].text}"
              </p>
            </div>
          </div>

        </div>

        {/* Sticky Bottom Action Hardware Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#e2e8f0] p-3 pb-safe shadow-[0_-8px_24px_rgba(0,0,0,0.06)]">
          <div className="max-w-lg mx-auto flex items-center gap-2">
            {/* Quantity Stepper */}
            <div className="flex items-center bg-[#f1f5f9] rounded-xl p-1 h-12 shrink-0">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-full flex items-center justify-center text-[#64748b] hover:text-[#0b1c30] active:scale-90 text-sm font-bold"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="w-6 text-center font-mono font-bold text-sm text-[#0b1c30]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                className="w-8 h-full flex items-center justify-center text-[#64748b] hover:text-[#0b1c30] active:scale-90 text-sm font-bold"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            {/* Quick Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="h-12 px-3.5 rounded-xl bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#006948] flex items-center justify-center gap-1.5 font-bold text-xs shrink-0 active:scale-95 transition-all"
              aria-label="Add to cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden xs:inline">Add to Cart</span>
            </button>

            {/* Instant Buy (COD) Action */}
            <button
              onClick={handleBuyNow}
              className="h-12 flex-1 rounded-xl bg-[#006948] hover:bg-[#00855d] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md shadow-[#006948]/20 active:scale-95 transition-all truncate"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Buy Now (COD) • Rs. {(product.price * quantity).toLocaleString()}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
