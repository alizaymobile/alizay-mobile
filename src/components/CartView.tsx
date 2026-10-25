import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  ShoppingBag, Trash2, Tag, Check, Truck, 
  MapPin, Phone, User, ShieldCheck, Lock, CreditCard, Banknote 
} from 'lucide-react';

const PAKISTANI_CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Gujranwala',
  'Sialkot',
  'Hyderabad',
  'Abbottabad',
  'Bahawalpur',
  'Sargodha',
  'Sukkur',
];

export const CartView: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    placeOrder,
    setActiveTab,
    showToast,
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [customerName, setCustomerName] = useState('Alexander Vance');
  const [phone, setPhone] = useState('+92 300 7829014');
  const [address, setAddress] = useState('House 42, Street 7, Sector F-8/2');
  const [city, setCity] = useState('Islamabad');
  const [postalCode, setPostalCode] = useState('44000');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod');
  const [deliveryInstructions, setDeliveryInstructions] = useState('Inspect parcel before payment, call on arrival');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const freeDeliveryThreshold = 3500;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeDeliveryThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeDeliveryThreshold - cartSubtotal);
  const shippingFee = cartSubtotal >= freeDeliveryThreshold ? 0 : 250;
  const discountAmount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const totalPayable = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    applyCoupon(couponInput);
    setCouponInput('');
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast('Your cart is empty', 'Add items from storefront', 'error');
      return;
    }
    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      showToast('Please fill all address fields', 'Name, phone, and address are required', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      placeOrder({
        customerName,
        phone,
        address,
        city,
        postalCode,
        deliveryInstructions,
        paymentMethod,
      });
      setIsSubmitting(false);
    }, 600);
  };

  if (cart.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 py-12 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-white border border-[#e2e8f0] flex items-center justify-center text-[#64748b] mx-auto shadow-sm">
          <ShoppingBag className="w-8 h-8 text-[#006948]" />
        </div>
        <h2 className="text-xl font-bold text-[#0b1c30]">Your Cart is Empty</h2>
        <p className="text-sm text-[#64748b] max-w-sm mx-auto">
          Explore genuine GaN fast chargers, shockproof titanium armor cases, and official PTA phones.
        </p>
        <button
          onClick={() => setActiveTab('shop')}
          className="px-6 py-3 rounded-xl bg-[#006948] hover:bg-[#00855d] text-white font-bold text-sm shadow-md active:scale-95 transition-all"
        >
          Browse Product Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-4 space-y-4 pb-20">
      
      {/* Free Delivery Gamified Progress Bar */}
      <div className="p-4 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-bold text-[#0b1c30]">
            <ShoppingBag className="w-4 h-4 text-[#006948]" />
            <span>Your Bag</span>
            <span className="px-2 py-0.5 rounded-full bg-[#f1f5f9] text-[#006948] font-mono text-[11px]">
              {cart.reduce((sum, item) => sum + item.quantity, 0)} ITEMS
            </span>
          </div>
          <span className="font-mono font-bold text-[#006948]">{progressPercent}% Goal</span>
        </div>

        <div className="w-full bg-[#f1f5f9] h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#006948] to-[#0d9488] h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="text-xs text-[#64748b] flex items-center gap-1.5 pt-0.5">
          <Truck className="w-3.5 h-3.5 text-[#006948] shrink-0" />
          {remainingForFreeShipping > 0 ? (
            <span>
              Add <span className="font-mono font-bold text-[#006948]">Rs. {remainingForFreeShipping.toLocaleString()}</span> more for <span className="font-bold text-[#0b1c30]">Free Express Shipping</span>!
            </span>
          ) : (
            <span className="font-bold text-[#006948]">
              🎉 You have unlocked Free Express Delivery across Pakistan!
            </span>
          )}
        </div>
      </div>

      {/* Cart Items List */}
      <div className="space-y-2.5">
        {cart.map((item) => (
          <div
            key={item.id}
            className="p-3.5 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs flex items-start gap-3 transition-all hover:border-[#cbd5e1]"
          >
            <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-xl bg-[#f8fafc] border border-[#f1f5f9] p-1.5 overflow-hidden shrink-0 flex items-center justify-center">
              <img
                src={item.product.image}
                alt={item.product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain mix-blend-multiply"
              />
              <span className="absolute bottom-1 right-1 px-1 py-0.2 rounded bg-black/70 text-white font-mono text-[8px]">
                {item.product.sku.split('-')[0]}
              </span>
            </div>

            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div className="flex items-start justify-between gap-1">
                <h4 className="text-xs sm:text-sm font-bold text-[#0b1c30] truncate">
                  {item.product.name}
                </h4>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-[#94a3b8] hover:text-[#e11d48] p-1 -mr-1 transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="text-[11px] text-[#64748b] truncate mt-0.5">
                {item.selectedModel && <span>{item.selectedModel} • </span>}
                {item.selectedColor && <span>{item.selectedColor}</span>}
              </div>

              <div className="flex items-center justify-between mt-2 pt-1">
                <span className="font-mono font-bold text-sm text-[#006948]">
                  Rs. {(item.product.price * item.quantity).toLocaleString()}
                </span>

                {/* Quantity Stepper */}
                <div className="flex items-center rounded-lg bg-[#f1f5f9] border border-[#e2e8f0] p-0.5">
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                    className="w-6 h-6 flex items-center justify-center rounded text-xs font-bold text-[#64748b] hover:text-[#0b1c30] active:bg-white"
                  >
                    -
                  </button>
                  <span className="font-mono text-xs font-bold text-[#0b1c30] w-6 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                    className="w-6 h-6 flex items-center justify-center rounded text-xs font-bold text-[#64748b] hover:text-[#0b1c30] active:bg-white"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Promo Code & Applied Voucher */}
      <div className="p-4 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs space-y-2.5">
        <form onSubmit={handleApplyCoupon} className="flex items-center gap-2">
          <div className="relative flex-1">
            <Tag className="w-4 h-4 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              placeholder="VOUCHER (e.g. RAMADAN35, ALIZEH10)"
              className="w-full h-11 pl-9 pr-3 text-xs uppercase font-mono bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-[#0b1c30] placeholder-[#94a3b8] focus:outline-none focus:border-[#006948]"
            />
          </div>
          <button
            type="submit"
            className="h-11 px-4 rounded-xl bg-[#006948] text-white text-xs font-bold hover:bg-[#00855d] active:scale-95 transition-all"
          >
            Apply
          </button>
        </form>

        {appliedCoupon && (
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#ecfdf5] border border-[#a7f3d0] text-xs">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#006948]" />
              <span className="font-mono font-bold text-[#006948]">
                CODE: {appliedCoupon.code}
              </span>
              <span className="text-[#065f46]">(-{appliedCoupon.discountPercent}% Gear Bonus)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-[#006948]">
                -Rs. {appliedCoupon.discountAmount.toLocaleString()}
              </span>
              <button
                onClick={removeCoupon}
                className="text-[#e11d48] text-[11px] hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Cost Breakdown Card */}
      <div className="p-4 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs space-y-2 text-xs">
        <div className="flex justify-between items-center text-[#64748b]">
          <span>Subtotal ({cart.length} items)</span>
          <span className="font-mono font-medium text-[#0b1c30]">
            Rs. {cartSubtotal.toLocaleString()}
          </span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between items-center text-[#006948] font-medium">
            <span>Coupon Discount</span>
            <span className="font-mono">-Rs. {discountAmount.toLocaleString()}</span>
          </div>
        )}

        <div className="flex justify-between items-center text-[#64748b]">
          <span className="flex items-center gap-1.5">
            Shipping
            {shippingFee === 0 && (
              <span className="px-1.5 py-0.2 rounded text-[9px] bg-[#ecfdf5] text-[#006948] font-bold">
                FREE PROMO
              </span>
            )}
          </span>
          <span className="font-mono font-bold text-[#006948]">
            {shippingFee === 0 ? 'FREE (Rs. 0)' : `Rs. ${shippingFee}`}
          </span>
        </div>

        <div className="flex justify-between items-center text-[#64748b]">
          <span>Estimated Sales Tax</span>
          <span className="font-mono text-[#0b1c30]">Rs. 0 (Inclusive)</span>
        </div>

        <div className="h-px bg-[#f1f5f9] my-2" />

        <div className="flex justify-between items-baseline pt-1">
          <div>
            <span className="text-sm font-bold text-[#0b1c30]">Total Payable</span>
            <p className="text-[10px] text-[#64748b]">Includes all local import taxes & duties</p>
          </div>
          <span className="text-xl sm:text-2xl font-black font-mono text-[#006948]">
            Rs. {totalPayable.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Shipping Address Form */}
      <form onSubmit={handleCheckout} className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#f1f5f9]">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#006948] text-white text-xs font-bold flex items-center justify-center font-mono">
              1
            </span>
            <h3 className="font-bold text-sm text-[#0b1c30]">Shipping Address</h3>
          </div>
          <span className="text-[11px] text-[#006948] font-semibold flex items-center gap-1">
            ⚡ Quick Autofill
          </span>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block text-[11px] font-bold text-[#475569] uppercase mb-1">
              Full Legal Name
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Muhammad Zubair"
                className="w-full h-11 px-3 pl-9 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-xs text-[#0b1c30] focus:outline-none focus:border-[#006948]"
              />
              <User className="w-4 h-4 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-bold text-[#475569] uppercase">
                Phone Number
              </label>
              <span className="text-[10px] text-[#006948] font-semibold">Live SMS Updates</span>
            </div>
            <div className="relative">
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+92 300 1234567"
                className="w-full h-11 px-3 pl-9 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-xs font-mono text-[#0b1c30] focus:outline-none focus:border-[#006948]"
              />
              <Phone className="w-4 h-4 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#475569] uppercase mb-1">
              Street Address & House / Plaza #
            </label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. House 24-B, Sector G-11/3, Street 18"
              className="w-full h-11 px-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-xs text-[#0b1c30] focus:outline-none focus:border-[#006948]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-bold text-[#475569] uppercase mb-1">
                City (Pakistan)
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full h-11 px-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-xs text-[#0b1c30] focus:outline-none focus:border-[#006948]"
              >
                {PAKISTANI_CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#475569] uppercase mb-1">
                Postal Code
              </label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="44000"
                className="w-full h-11 px-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-xs font-mono text-[#0b1c30] focus:outline-none focus:border-[#006948]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#475569] uppercase mb-1">
              Delivery Instructions
            </label>
            <input
              type="text"
              value={deliveryInstructions}
              onChange={(e) => setDeliveryInstructions(e.target.value)}
              placeholder="e.g. Call rider upon arrival, inspect before payment"
              className="w-full h-11 px-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-xs text-[#0b1c30] focus:outline-none focus:border-[#006948]"
            />
          </div>
        </div>

        {/* Payment Method Selector */}
        <div className="space-y-2 pt-2 border-t border-[#f1f5f9]">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-full bg-[#006948] text-white text-xs font-bold flex items-center justify-center font-mono">
              2
            </span>
            <h3 className="font-bold text-sm text-[#0b1c30]">Payment Method</h3>
          </div>

          {/* Option 1: COD */}
          <div
            onClick={() => setPaymentMethod('cod')}
            className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
              paymentMethod === 'cod'
                ? 'bg-[#ecfdf5] border-[#006948] ring-1 ring-[#006948]'
                : 'bg-white border-[#cbd5e1] hover:bg-[#f8fafc]'
            }`}
          >
            <div className="mt-0.5 w-4 h-4 rounded-full border-2 border-[#006948] flex items-center justify-center shrink-0">
              {paymentMethod === 'cod' && (
                <div className="w-2 h-2 rounded-full bg-[#006948]" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0b1c30]">
                  Cash on Delivery (COD)
                </span>
                <Banknote className="w-4 h-4 text-[#006948]" />
              </div>
              <p className="text-[11px] text-[#64748b] mt-0.5">
                Pay with cash or scan delivery agent UPI/JazzCash QR at doorstep. No surcharge.
              </p>
              <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white border border-[#a7f3d0] text-[#065f46] text-[10px] font-bold">
                <ShieldCheck className="w-3 h-3 text-[#006948]" />
                <span>Instant 1-Tap Confirmation</span>
              </div>
            </div>
          </div>

          {/* Option 2: Digital Payment */}
          <div
            onClick={() => setPaymentMethod('online')}
            className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
              paymentMethod === 'online'
                ? 'bg-[#ecfdf5] border-[#006948] ring-1 ring-[#006948]'
                : 'bg-white border-[#cbd5e1] hover:bg-[#f8fafc]'
            }`}
          >
            <div className="mt-0.5 w-4 h-4 rounded-full border-2 border-[#006948] flex items-center justify-center shrink-0">
              {paymentMethod === 'online' && (
                <div className="w-2 h-2 rounded-full bg-[#006948]" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0b1c30]">
                  Card / JazzCash / EasyPaisa
                </span>
                <CreditCard className="w-4 h-4 text-[#64748b]" />
              </div>
              <p className="text-[11px] text-[#64748b] mt-0.5">
                Direct online transfer with 256-bit buyer hardware warranty.
              </p>
            </div>
          </div>
        </div>

        {/* Master Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 rounded-xl bg-[#006948] hover:bg-[#00855d] active:scale-[0.98] text-white font-bold text-sm sm:text-base flex items-center justify-between px-5 shadow-lg shadow-[#006948]/20 transition-all disabled:opacity-50"
          >
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#68dba9]" />
              <span>
                {isSubmitting ? 'Confirming Order...' : 'Place Order (COD)'}
              </span>
            </div>
            <span className="font-mono text-base tracking-wide">
              Rs. {totalPayable.toLocaleString()}
            </span>
          </button>

          <p className="text-[11px] text-center text-[#64748b] mt-2 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#006948]" />
            <span>30-Day Guarantee • Direct Hafeez Centre Dispatch in 24h</span>
          </p>
        </div>
      </form>

    </div>
  );
};
