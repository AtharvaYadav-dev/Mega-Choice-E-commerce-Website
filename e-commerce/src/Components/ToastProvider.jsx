import React, { useCallback, useMemo, useState } from "react";
import { ToastContext } from "../contexts/ToastContext.js";

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info", duration) => {
    let d = duration;
    if (d == null) {
      const stored = parseInt(localStorage.getItem("toast_duration") || "", 10);
      d = Number.isFinite(stored) && stored > 500 ? stored : 3000;
    }
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, d);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const value = useMemo(() => ({ addToast }), [addToast]);

  const getToastStyles = (type) => {
    const baseStyles =
      "min-w-80 max-w-md bg-white rounded-lg shadow-lg border p-4 flex items-center space-x-3 animate-slide-in-right";

    switch (type) {
      case "success":
        return `${baseStyles} border-l-4 border-green-500`;
      case "error":
        return `${baseStyles} border-l-4 border-red-500`;
      case "warning":
        return `${baseStyles} border-l-4 border-yellow-500`;
      default:
        return `${baseStyles} border-l-4 border-blue-500`;
    }
  };

  const getToastIcon = (type) => {
    switch (type) {
      case "success":
        return (
          <div className="shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-green-600 text-sm">✓</span>
          </div>
        );
      case "error":
        return (
          <div className="shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-red-600 text-sm">✕</span>
          </div>
        );
      case "warning":
        return (
          <div className="shrink-0 w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
            <span className="text-yellow-600 text-sm">!</span>
          </div>
        );
      default:
        return (
          <div className="shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 text-sm">i</span>
          </div>
        );
    }
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div key={toast.id} className={getToastStyles(toast.type)}>
            {getToastIcon(toast.type)}
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <span className="text-sm">✕</span>
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
