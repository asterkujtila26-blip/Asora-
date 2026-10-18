import React from 'react';
import { useStore } from '../../context/StoreContext';
import { AsoraEmblem } from '../brand/AsoraEmblem';
import { X, ArrowRight } from 'lucide-react';

export const AddToBagSuccessModal: React.FC = () => {
  const {
    addToBagConfirmation,
    setAddToBagConfirmation,
    setIsBagDrawerOpen,
    formatPrice,
  } = useStore();

  if (!addToBagConfirmation.isOpen || !addToBagConfirmation.product) {
    return null;
  }

  const { product, color, size, quantity = 1 } = addToBagConfirmation;

  const handleClose = () => {
    setAddToBagConfirmation({ isOpen: false });
  };

  const handleViewBag = () => {
    handleClose();
    setIsBagDrawerOpen(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0A0A0B]/75 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#F1EBDD] text-[#0A0A0B] max-w-md w-full border border-[#0A0A0B]/20 shadow-2xl p-6 sm:p-8 z-10 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-[#0A0A0B] hover:opacity-70 transition-opacity"
          aria-label="Close confirmation"
        >
          <X size={18} />
        </button>

        {/* Emblem & Welcome */}
        <div className="flex flex-col items-center text-center pb-6 border-b border-[#0A0A0B]/10">
          <AsoraEmblem size={44} color="#0A0A0B" className="mb-4" />
          <span className="text-[10px] tracking-[0.35em] uppercase text-neutral-500 font-mono">
            VOLUME 01 — PARIS
          </span>
          <h3 id="modal-title" className="font-editorial text-2xl sm:text-3xl font-light text-[#0A0A0B] mt-1">
            WELCOME TO ASORA.
          </h3>
          <p className="text-xs text-neutral-600 mt-2 tracking-wide">
            Your piece has been placed in the ASORA Bag.
          </p>
        </div>

        {/* Added Item Preview */}
        <div className="py-5 flex gap-4 items-center">
          <div className="w-16 h-20 bg-[#0A0A0B]/5 shrink-0 overflow-hidden border border-[#0A0A0B]/10">
            <img
              src={product.heroImage}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1 min-w-0 text-left">
            <h4 className="text-xs font-semibold tracking-wide truncate text-[#0A0A0B]">
              {product.name}
            </h4>
            <div className="text-[11px] text-neutral-600 mt-1">
              <span>{color}</span> · <span>Size {size}</span> · <span>Qty {quantity}</span>
            </div>
            <p className="text-xs font-mono font-medium mt-1">
              {formatPrice(product.priceEur * quantity)}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleClose}
            className="flex-1 py-3 border border-[#0A0A0B] text-[#0A0A0B] text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#0A0A0B]/5 transition-colors"
          >
            CONTINUE SHOPPING
          </button>
          <button
            onClick={handleViewBag}
            className="flex-1 py-3 bg-[#0A0A0B] text-[#F1EBDD] text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#2A2B2E] transition-colors flex items-center justify-center gap-1.5"
          >
            <span>VIEW THE ASORA BAG</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToBagSuccessModal;
