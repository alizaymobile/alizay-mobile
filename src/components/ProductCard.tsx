import React, { useState } from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Star, ShoppingCart, Heart, ShieldCheck, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setSelectedProduct } = useShop();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddedRecently, setIsAddedRecently] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 900);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <article
      onClick={() => setSelectedProduct(product)}
      className="group relative flex flex-col justify-between rounded-2xl bg-white border border-[#e2e8f0] p-3 shadow-xs hover:shadow-md hover:border-[#cbd5e1] transition-all duration-200 cursor-pointer text-left"
    >
      <div>
        {/* Visual Box Stage */}
        <div className="relative w-full aspect-square rounded-xl bg-[#f8fafc] overflow-hidden flex items-center justify-center p-2">
          {!imgError ? (
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-[#ecfdf5] to-[#f8fafc] text-[#006948] p-3 text-center">
              <span className="font-extrabold text-2xl mb-1">A⚡</span>
              <span className="text-[11px] font-semibold text-[#64748b] leading-tight line-clamp-2">
                {product.name}
              </span>
            </div>
          )}

          {/* Top-Left Trust Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 items-start max-w-[80%]">
            {product.isPtaApproved ? (
              <span className="px-2 py-0.5 rounded-full bg-[#006948] text-white text-[9px] font-bold tracking-wider uppercase shadow-xs">
                PTA Approved
              </span>
            ) : product.isOfficialWarranty ? (
              <span className="px-2 py-0.5 rounded-full bg-[#ecfdf5] border border-[#a7f3d0] text-[#065f46] text-[9px] font-bold tracking-wider uppercase">
                Official Seal
              </span>
            ) : product.isTopSeller ? (
              <span className="px-2 py-0.5 rounded-full bg-[#fef3c7] border border-[#fde68a] text-[#92400e] text-[9px] font-bold tracking-wider uppercase">
                Top Seller
              </span>
            ) : null}

            {product.discountPercent && product.discountPercent > 0 && (
              <span className="px-1.5 py-0.2 rounded-md bg-[#fff1f2] text-[#e11d48] text-[9px] font-bold">
                -{product.discountPercent}%
              </span>
            )}
          </div>

          {/* Top-Right Wishlist Trigger */}
          <button
            onClick={handleToggleWishlist}
            aria-label="Save to Wishlist"
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#64748b] hover:text-[#e11d48] shadow-xs active:scale-90 transition-all"
          >
            <Heart
              className={`w-3.5 h-3.5 transition-colors ${
                isWishlisted ? 'fill-[#e11d48] text-[#e11d48]' : ''
              }`}
            />
          </button>

          {/* Low stock tag */}
          {product.stockStatus === 'low_stock' && (
            <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-[#fff7ed] text-[#c2410c] text-[9px] font-bold border border-[#ffedd5]">
              Only {product.stockUnits} left
            </span>
          )}
        </div>

        {/* Info cluster */}
        <div className="mt-2.5 flex flex-col gap-1">
          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs">
            <div className="flex items-center text-[#f59e0b]">
              <Star className="w-3.5 h-3.5 fill-[#f59e0b]" />
              <span className="ml-1 font-bold font-mono text-[#0b1c30] text-[11px]">
                {product.rating}
              </span>
            </div>
            <span className="text-[#94a3b8] text-[11px]">({product.reviewCount})</span>
            <span className="text-[#cbd5e1]">·</span>
            <span className="text-[#64748b] text-[11px] truncate">{product.brand}</span>
          </div>

          {/* Product Name */}
          <h3 className="text-xs sm:text-sm font-bold text-[#0b1c30] line-clamp-2 leading-snug group-hover:text-[#006948] transition-colors">
            {product.name}
          </h3>

          <p className="text-[11px] text-[#64748b] line-clamp-1">
            {product.shortDesc}
          </p>
        </div>
      </div>

      {/* Pricing & Add to Cart row */}
      <div className="mt-3 pt-2 border-t border-[#f1f5f9] flex items-end justify-between gap-1">
        <div className="flex flex-col">
          {product.originalPrice > product.price && (
            <span className="text-[11px] text-[#94a3b8] line-through font-mono leading-none">
              Rs. {product.originalPrice.toLocaleString()}
            </span>
          )}
          <div className="flex items-baseline gap-0.5">
            <span className="text-[11px] font-bold text-[#006948]">PKR</span>
            <span className="text-sm sm:text-base font-extrabold text-[#0b1c30] font-mono leading-tight">
              {product.price.toLocaleString()}
            </span>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className={`h-9 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold transition-all active:scale-95 shadow-xs ${
            isAddedRecently
              ? 'bg-[#10b981] text-white'
              : 'bg-[#006948] hover:bg-[#00855d] text-white'
          }`}
          aria-label={`Add ${product.name} to cart`}
        >
          {isAddedRecently ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Added</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Add</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
};
