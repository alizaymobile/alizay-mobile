import React from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Package, Truck, CheckCircle2, Clock, 
  MapPin, Phone, MessageSquare, ArrowRight, ShoppingBag 
} from 'lucide-react';

export const OrdersView: React.FC = () => {
  const { orders, setActiveTab, showToast } = useShop();

  const handleTrackCourier = (trackingNo?: string) => {
    if (!trackingNo) return;
    showToast(`Tracking ${trackingNo}`, 'Status: In transit with TCS Courier Express');
  };

  const handleContactSupport = (orderNo: string) => {
    const text = encodeURIComponent(
      `As-salamu alaykum Alizeh Mobile Shop! I need an update regarding my order ${orderNo}.`
    );
    window.open(`https://wa.me/923001234567?text=${text}`, '_blank');
  };

  if (orders.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 py-12 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-white border border-[#e2e8f0] flex items-center justify-center text-[#64748b] mx-auto shadow-sm">
          <Package className="w-8 h-8 text-[#006948]" />
        </div>
        <h2 className="text-xl font-bold text-[#0b1c30]">No Orders Placed Yet</h2>
        <p className="text-sm text-[#64748b] max-w-sm mx-auto">
          Your confirmed orders and live parcel tracking from TCS and Leopard logistics will appear here.
        </p>
        <button
          onClick={() => setActiveTab('shop')}
          className="px-6 py-3 rounded-xl bg-[#006948] text-white font-bold text-sm shadow-md active:scale-95 transition-all"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-4 space-y-4 pb-20">
      
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-lg font-extrabold text-[#0b1c30]">Order Dispatch Tracking</h2>
          <p className="text-xs text-[#64748b]">TCS & Leopard Logistics Direct Integration</p>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-[#ecfdf5] border border-[#a7f3d0] text-[#006948] font-mono text-xs font-bold">
          {orders.length} Active Orders
        </span>
      </div>

      {/* Orders List */}
      <div className="space-y-3.5">
        {orders.map((order) => {
          const isCOD = order.paymentMethod === 'cod';
          const isDelivered = order.status === 'delivered';
          const isDispatched = order.status === 'dispatched';
          const isProcessing = order.status === 'processing';

          return (
            <div
              key={order.id}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs space-y-3.5"
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-2 border-b border-[#f1f5f9] pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-[#006948]">
                    {order.orderNumber}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      order.status === 'cod_pending'
                        ? 'bg-[#fef3c7] text-[#92400e] border border-[#fde68a]'
                        : order.status === 'processing'
                        ? 'bg-[#e0f2fe] text-[#0369a1] border border-[#bae6fd]'
                        : order.status === 'dispatched'
                        ? 'bg-[#ecfdf5] text-[#065f46] border border-[#a7f3d0]'
                        : 'bg-[#f1f5f9] text-[#475569]'
                    }`}
                  >
                    {order.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="text-right">
                  <span className="font-mono font-bold text-sm sm:text-base text-[#0b1c30]">
                    Rs. {order.total.toLocaleString()}
                  </span>
                  <div className="text-[10px] text-[#94a3b8] font-mono">{order.createdAt}</div>
                </div>
              </div>

              {/* Customer and Delivery Destination */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-[#0b1c30]">
                  <MapPin className="w-3.5 h-3.5 text-[#006948] shrink-0" />
                  <span className="truncate">{order.customerName} ({order.city})</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#64748b] justify-end">
                  <Phone className="w-3.5 h-3.5 text-[#64748b] shrink-0" />
                  <span className="font-mono truncate">{order.phone}</span>
                </div>
              </div>

              {/* Progress Stepper Bar */}
              <div className="p-3 rounded-xl bg-[#f8fafc] border border-[#f1f5f9] space-y-2">
                <div className="grid grid-cols-4 gap-1 text-[10px] font-bold text-center">
                  <span className="text-[#006948]">Confirmed</span>
                  <span className={isProcessing || isDispatched || isDelivered ? 'text-[#006948]' : 'text-[#94a3b8]'}>
                    Packed
                  </span>
                  <span className={isDispatched || isDelivered ? 'text-[#006948]' : 'text-[#94a3b8]'}>
                    Dispatched
                  </span>
                  <span className={isDelivered ? 'text-[#006948]' : 'text-[#94a3b8]'}>
                    Delivered
                  </span>
                </div>

                <div className="w-full bg-[#e2e8f0] h-1.5 rounded-full overflow-hidden flex">
                  <div className="h-full bg-[#006948] w-1/4" />
                  <div className={`h-full ${isProcessing || isDispatched || isDelivered ? 'bg-[#006948]' : 'bg-transparent'} w-1/4`} />
                  <div className={`h-full ${isDispatched || isDelivered ? 'bg-[#006948]' : 'bg-transparent'} w-1/4`} />
                  <div className={`h-full ${isDelivered ? 'bg-[#006948]' : 'bg-transparent'} w-1/4`} />
                </div>

                {order.trackingNumber && (
                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="text-[#64748b] flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-[#006948]" />
                      Courier: <strong className="text-[#0b1c30]">{order.courier || 'TCS'}</strong>
                    </span>
                    <button
                      onClick={() => handleTrackCourier(order.trackingNumber)}
                      className="text-[#006948] font-mono font-bold hover:underline"
                    >
                      {order.trackingNumber}
                    </button>
                  </div>
                )}
              </div>

              {/* Items List inside order */}
              <div className="space-y-1.5 pt-1">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-2 p-2 rounded-xl bg-[#f8fafc] text-xs"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-white border border-[#e2e8f0] p-1 shrink-0 overflow-hidden flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.productName}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain mix-blend-multiply"
                        />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-[#0b1c30] truncate">
                          {item.productName}
                        </span>
                        <span className="text-[10px] text-[#64748b]">
                          {item.model ? `${item.model} • ` : ''}Qty: {item.quantity}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-[#006948] shrink-0">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom Quick Help Action */}
              <div className="flex items-center justify-between pt-2 border-t border-[#f1f5f9] text-xs">
                <span className="text-[#64748b] text-[11px]">
                  {isCOD ? 'Cash on Delivery • Pay at doorstep' : 'Prepaid Order'}
                </span>
                <button
                  onClick={() => handleContactSupport(order.orderNumber)}
                  className="flex items-center gap-1 text-[#006948] font-bold hover:underline"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Updates</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
