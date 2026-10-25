import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useShop();

  if (!toast) return null;

  const isError = toast.type === 'error';
  const isInfo = toast.type === 'info';

  return (
    <aside
      aria-live="polite"
      className="fixed bottom-20 left-4 right-4 z-50 max-w-md mx-auto animate-slideUp flex items-center justify-between p-3.5 rounded-2xl bg-[#0b1c30]/95 backdrop-blur-md shadow-2xl text-white border border-[#1e293b]"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
            isError
              ? 'bg-[#e11d48]/20 text-[#fb7185]'
              : isInfo
              ? 'bg-[#0284c7]/20 text-[#38bdf8]'
              : 'bg-[#006948]/30 text-[#68dba9]'
          }`}
        >
          {isError ? (
            <AlertCircle className="w-5 h-5" />
          ) : isInfo ? (
            <Info className="w-5 h-5" />
          ) : (
            <CheckCircle2 className="w-5 h-5" />
          )}
        </div>

        <div className="flex flex-col min-w-0">
          <span className="text-xs sm:text-sm font-bold truncate text-white">
            {toast.message}
          </span>
          {toast.submessage && (
            <span className="text-[11px] text-[#cbd5e1] truncate font-mono">
              {toast.submessage}
            </span>
          )}
        </div>
      </div>
    </aside>
  );
};
