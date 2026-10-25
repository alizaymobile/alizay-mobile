import React from 'react';
import { useShop } from '../context/ShopContext';
import { Store, ShoppingBag, Truck, LayoutDashboard } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, cartTotalCount } = useShop();

  interface NavItem {
    id: 'shop' | 'cart' | 'orders' | 'admin';
    label: string;
    icon: typeof Store;
    badge?: number;
  }

  const navItems: NavItem[] = [
    {
      id: 'shop',
      label: 'Shop',
      icon: Store,
    },
    {
      id: 'cart',
      label: 'Cart',
      icon: ShoppingBag,
      badge: cartTotalCount > 0 ? cartTotalCount : undefined,
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: Truck,
    },
    {
      id: 'admin',
      label: 'Admin',
      icon: LayoutDashboard,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/92 backdrop-blur-lg border-t border-[#e2e8f0] pb-safe shadow-[0_-2px_10px_rgba(0,0,0,0.03)]">
      <div className="max-w-md mx-auto flex items-center justify-around h-16 px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center justify-center w-16 h-12 transition-all active:scale-95 ${
                isActive ? 'text-[#006948]' : 'text-[#64748b] hover:text-[#0b1c30]'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                {item.badge !== undefined && (
                  <span className="absolute -top-1 -right-2 flex items-center justify-center min-w-[17px] h-[17px] px-1 rounded-full bg-[#006948] text-white font-mono text-[9px] font-bold leading-none shadow-xs">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 font-bold uppercase tracking-wider ${isActive ? 'text-[#006948]' : 'text-[#64748b]'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
