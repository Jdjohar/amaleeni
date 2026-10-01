import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X, Sparkles } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const [modalContent, setModalContent] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showThankYouModal = useCallback((title, message) => {
    setModalContent({ title, message });
  }, []);

  const closeThankYouModal = useCallback(() => {
    setModalContent(null);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, showThankYouModal }}>
      {children}

      {/* Floating Toast Container */}
      <div
        className="fixed top-24 right-4 sm:right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none"
        aria-live="polite"
        aria-atomic="true"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role={toast.type === 'error' ? 'alert' : 'status'}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl shadow-xl border text-sm font-serif transition-all duration-300 animate-slide-in ${
              toast.type === 'error'
                ? 'bg-[#FAF5EB] text-[#C83B46] border-[#C83B46]/30'
                : toast.type === 'info'
                ? 'bg-[#1B3629] text-white border-[#2A4E3B]'
                : 'bg-[#1B3629] text-[#FAF5EB] border-[#D49B4B]/40'
            }`}
          >
            {toast.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-[#C83B46] shrink-0 mt-0.5" aria-hidden="true" />
            ) : toast.type === 'info' ? (
              <Info className="w-5 h-5 text-[#D49B4B] shrink-0 mt-0.5" aria-hidden="true" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-[#D49B4B] shrink-0 mt-0.5" aria-hidden="true" />
            )}

            <div className="grow pr-2">
              <p className="font-semibold leading-snug">{toast.message}</p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-white p-1 rounded-lg transition-colors focus:outline-none"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>

      {/* Thank You Popup Modal */}
      {modalContent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="bg-[#FAF5EB] border-2 border-[#E5D7C3] text-[#1B3629] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative space-y-5 text-center">
            <button
              onClick={closeThankYouModal}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#1B3629]/10 text-[#1B3629] hover:bg-[#C83B46] hover:text-white transition-colors"
              aria-label="Close Thank You modal"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            <div className="w-16 h-16 rounded-full bg-[#1B3629] text-[#D49B4B] flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8 text-[#D49B4B]" aria-hidden="true" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C83B46]/10 text-[#C83B46] text-xs font-bold uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Confirmed</span>
              </div>
              <h3 id="modal-title" className="font-serif text-2xl font-bold text-[#1B3629]">
                {modalContent.title}
              </h3>
            </div>

            <p className="text-sm text-[#4E6B5A] font-serif leading-relaxed">
              {modalContent.message}
            </p>

            <button
              onClick={closeThankYouModal}
              className="w-full bg-[#1B3629] hover:bg-[#12251C] text-white py-3 rounded-full text-sm font-bold transition-all shadow-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
