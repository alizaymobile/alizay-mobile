export type ProductCategory = 
  | 'chargers' 
  | 'cases' 
  | 'glass' 
  | 'audio' 
  | 'powerbanks' 
  | 'phones' 
  | 'cables';

export type StockStatus = 'in_stock' | 'low_stock' | 'pre_order' | 'out_of_stock';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductSpec {
  label: string;
  value: string;
  icon?: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  brand: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number; // in PKR
  originalPrice: number; // in PKR
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  stockUnits: number;
  stockStatus: StockStatus;
  isOfficialWarranty: boolean;
  warrantyText: string;
  isPtaApproved?: boolean;
  isTopSeller?: boolean;
  image: string;
  galleryImages?: string[];
  shortDesc: string;
  description: string;
  compatibleModels?: string[];
  colorVariants?: ProductColor[];
  specs: ProductSpec[];
  createdAt: string;
}

export interface CartItem {
  id: string; // composite key of productId + model + color
  product: Product;
  quantity: number;
  selectedModel?: string;
  selectedColor?: string;
}

export type OrderStatus = 'cod_pending' | 'processing' | 'dispatched' | 'delivered' | 'cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  price: number;
  model?: string;
  color?: string;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. #PK-8841
  customerName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  deliveryInstructions?: string;
  paymentMethod: 'cod' | 'online';
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shippingFee: number;
  total: number;
  status: OrderStatus;
  courier?: 'TCS' | 'Leopard' | 'Trax';
  trackingNumber?: string;
  createdAt: string;
  deliveryDateEst?: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  city: string;
  rating: number;
  text: string;
  verified: boolean;
  date: string;
}
