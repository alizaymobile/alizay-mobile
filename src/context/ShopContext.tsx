import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, OrderStatus } from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS } from '../data/initialProducts';

interface ShopContextType {
  products: Product[];
  addProduct: (productData: Omit<Product, 'id' | 'createdAt'>) => Product;
  deleteProduct: (productId: string) => void;
  updateProduct: (product: Product) => void;
  resetProductsToDefault: () => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedModel?: string, selectedColor?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartSubtotal: number;
  appliedCoupon: { code: string; discountPercent: number; discountAmount: number } | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  orders: Order[];
  placeOrder: (orderData: {
    customerName: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    deliveryInstructions?: string;
    paymentMethod: 'cod' | 'online';
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingNumber?: string) => void;
  activeTab: 'shop' | 'cart' | 'orders' | 'admin';
  setActiveTab: (tab: 'shop' | 'cart' | 'orders' | 'admin') => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  showSplash: boolean;
  setShowSplash: (show: boolean) => void;
  toast: { message: string; submessage?: string; type?: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, submessage?: string, type?: 'success' | 'info' | 'error') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'alizeh_products_v1',
  CART: 'alizeh_cart_v1',
  ORDERS: 'alizeh_orders_v1',
  SPLASH_SEEN: 'alizeh_splash_seen_v1',
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products state with localStorage
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading products from localStorage:', e);
    }
    return INITIAL_PRODUCTS;
  });

  // Cart state with localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading cart from localStorage:', e);
    }
    return [
      {
        id: 'prod-anker-65w-default',
        product: INITIAL_PRODUCTS[0],
        quantity: 1,
        selectedColor: 'Matte Obsidian',
      },
      {
        id: 'prod-cybershield-case-default',
        product: INITIAL_PRODUCTS[1],
        quantity: 1,
        selectedModel: 'iPhone 15 Pro Max',
        selectedColor: 'Matte Black',
      },
    ];
  });

  // Orders state with localStorage
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading orders from localStorage:', e);
    }
    return INITIAL_ORDERS;
  });

  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discountPercent: number;
    discountAmount: number;
  } | null>({
    code: 'RAMADAN35',
    discountPercent: 10,
    discountAmount: 1365,
  });

  const [activeTab, setActiveTab] = useState<'shop' | 'cart' | 'orders' | 'admin'>('shop');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showSplash, setShowSplash] = useState<boolean>(() => {
    // Only show splash if not explicitly dismissed before, or allow user to toggle anytime
    return false;
  });

  const [toast, setToast] = useState<{
    message: string;
    submessage?: string;
    type?: 'success' | 'info' | 'error';
  } | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Sync products to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error('Error saving products:', e);
    }
  }, [products]);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  }, [cart]);

  // Sync orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error('Error saving orders:', e);
    }
  }, [orders]);

  const showToast = (message: string, submessage?: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, submessage, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  // Add Product (Admin Control)
  const addProduct = (productData: Omit<Product, 'id' | 'createdAt'>): Product => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`"${newProduct.name}" uploaded to store!`, `SKU: ${newProduct.sku} • PKR ${newProduct.price.toLocaleString()}`);
    return newProduct;
  };

  // Delete Product (Admin Control)
  const deleteProduct = (productId: string) => {
    const target = products.find((p) => p.id === productId);
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    // Remove from cart if present
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    if (selectedProduct?.id === productId) {
      setSelectedProduct(null);
    }
    showToast(
      target ? `Deleted "${target.name}"` : 'Product removed',
      'Catalog synchronized across all devices',
      'info'
    );
  };

  // Update Product (Admin Control)
  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    if (selectedProduct?.id === updated.id) {
      setSelectedProduct(updated);
    }
    showToast(`Updated "${updated.name}"`, `Stock: ${updated.stockUnits} • Price: PKR ${updated.price.toLocaleString()}`);
  };

  const resetProductsToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    showToast('Catalog restored to default items', 'Original Alizeh catalog refreshed', 'info');
  };

  // Cart operations
  const addToCart = (
    product: Product,
    quantity = 1,
    selectedModel?: string,
    selectedColor?: string
  ) => {
    const modelKey = selectedModel || product.compatibleModels?.[0] || 'Standard';
    const colorKey = selectedColor || product.colorVariants?.[0]?.name || 'Default';
    const cartItemId = `${product.id}-${modelKey}-${colorKey}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          product,
          quantity,
          selectedModel: modelKey,
          selectedColor: colorKey,
        },
      ];
    });

    showToast(
      `${product.name} added to cart`,
      `Qty: ${quantity} • PKR ${(product.price * quantity).toLocaleString()}`
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from cart', undefined, 'info');
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
  };

  const cartTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Recalculate coupon discount when subtotal changes
  useEffect(() => {
    if (appliedCoupon && cartSubtotal > 0) {
      const discountAmount = Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100);
      setAppliedCoupon((prev) => (prev ? { ...prev, discountAmount } : null));
    } else if (cartSubtotal === 0) {
      // keep coupon info but 0 amount
      setAppliedCoupon((prev) => (prev ? { ...prev, discountAmount: 0 } : null));
    }
  }, [cartSubtotal]);

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'RAMADAN35' || cleanCode === 'RAMADAN') {
      const discountPercent = 15;
      const discountAmount = Math.round((cartSubtotal * discountPercent) / 100);
      setAppliedCoupon({ code: cleanCode, discountPercent, discountAmount });
      showToast('Promo Code Applied!', `${discountPercent}% Ramadan discount applied`);
      return { success: true, message: `Applied ${discountPercent}% discount` };
    }
    if (cleanCode === 'ALIZEH10' || cleanCode === 'VOLT10') {
      const discountPercent = 10;
      const discountAmount = Math.round((cartSubtotal * discountPercent) / 100);
      setAppliedCoupon({ code: cleanCode, discountPercent, discountAmount });
      showToast('Promo Code Applied!', `10% welcome discount applied`);
      return { success: true, message: `Applied 10% discount` };
    }
    showToast('Invalid Coupon Code', 'Try RAMADAN35 or ALIZEH10', 'error');
    return { success: false, message: 'Invalid code. Try RAMADAN35 or ALIZEH10' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', undefined, 'info');
  };

  // Place Order
  const placeOrder = (orderData: {
    customerName: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    deliveryInstructions?: string;
    paymentMethod: 'cod' | 'online';
  }): Order => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `#PK-${randomNum}`;
    const shippingFee = cartSubtotal >= 3500 ? 0 : 250;
    const discount = appliedCoupon ? appliedCoupon.discountAmount : 0;
    const total = Math.max(0, cartSubtotal - discount + shippingFee);

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      customerName: orderData.customerName,
      phone: orderData.phone,
      address: orderData.address,
      city: orderData.city,
      postalCode: orderData.postalCode,
      deliveryInstructions: orderData.deliveryInstructions,
      paymentMethod: orderData.paymentMethod,
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        sku: item.product.sku,
        quantity: item.quantity,
        price: item.product.price,
        model: item.selectedModel,
        color: item.selectedColor,
        image: item.product.image,
      })),
      subtotal: cartSubtotal,
      discount,
      couponCode: appliedCoupon?.code,
      shippingFee,
      total,
      status: 'cod_pending',
      courier: 'TCS',
      trackingNumber: `TCS-${Math.floor(10000000 + Math.random() * 90000000)}`,
      createdAt: 'Just now',
      deliveryDateEst: 'Expected Delivery in 24-48 hrs via TCS Express',
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setActiveTab('orders');
    showToast(
      `Order ${orderNumber} Confirmed!`,
      `Cash on Delivery booked for ${orderData.city}. Total: PKR ${total.toLocaleString()}`
    );
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, trackingNumber?: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status,
            trackingNumber: trackingNumber || ord.trackingNumber,
          };
        }
        return ord;
      })
    );
    showToast(`Order status updated to ${status.replace('_', ' ').toUpperCase()}`);
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
        updateProduct,
        resetProductsToDefault,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotalCount,
        cartSubtotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        orders,
        placeOrder,
        updateOrderStatus,
        activeTab,
        setActiveTab,
        selectedProduct,
        setSelectedProduct,
        showSplash,
        setShowSplash,
        toast,
        showToast,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
