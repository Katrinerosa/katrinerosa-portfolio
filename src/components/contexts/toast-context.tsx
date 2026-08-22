"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Toast, { type ToastVariant } from "@/components/ui/toast";

type ToastOptions = {
  message: string;
  variant?: ToastVariant;
  duration?: number;
};

type ActiveToast = Required<Pick<ToastOptions, "message" | "variant">> & {
  id: number;
};

type ToastContextValue = {
  showToast: (options: ToastOptions) => void;
  hideToast: () => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ActiveToast | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearToastTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const hideToast = useCallback(() => {
    clearToastTimeout();
    setToast(null);
  }, [clearToastTimeout]);

  const showToast = useCallback(
    ({ message, variant = "info", duration = 5000 }: ToastOptions) => {
      clearToastTimeout();
      setToast({ id: Date.now(), message, variant });

      if (duration > 0) {
        timeoutRef.current = setTimeout(() => {
          setToast(null);
          timeoutRef.current = null;
        }, duration);
      }
    },
    [clearToastTimeout],
  );

  useEffect(() => clearToastTimeout, [clearToastTimeout]);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toast ? (
        <Toast
          key={toast.id}
          message={toast.message}
          variant={toast.variant}
          onClose={hideToast}
        />
      ) : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
}
