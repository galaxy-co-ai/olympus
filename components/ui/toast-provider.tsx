'use client';

import * as React from 'react';
import { ToastContainer, type ToastData, type ToastType } from './toast';

/**
 * Toast Provider
 *
 * Provides toast functionality via React Context.
 * Manages toast queue and auto-dismissal.
 */

const DEFAULT_DURATION = 5000; // 5 seconds

interface ToastOptions {
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
}

interface ToastContextValue {
  toast: (options: ToastOptions) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  warning: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

let toastCounter = 0;

function generateId() {
  return `toast-${++toastCounter}-${Date.now()}`;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastData[]>([]);
  const timersRef = React.useRef<Map<string, NodeJS.Timeout>>(new Map());

  // Cleanup timers on unmount
  React.useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const dismissAll = React.useCallback(() => {
    setToasts([]);
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current.clear();
  }, []);

  const toast = React.useCallback(
    (options: ToastOptions) => {
      const id = generateId();
      const duration = options.duration ?? DEFAULT_DURATION;

      const newToast: ToastData = {
        id,
        title: options.title,
        description: options.description,
        type: options.type ?? 'info',
        duration,
      };

      setToasts((prev) => [...prev, newToast]);

      // Auto-dismiss after duration
      if (duration > 0) {
        const timer = setTimeout(() => {
          dismiss(id);
        }, duration);
        timersRef.current.set(id, timer);
      }
    },
    [dismiss]
  );

  const success = React.useCallback(
    (title: string, description?: string) => {
      toast({ title, description, type: 'success' });
    },
    [toast]
  );

  const error = React.useCallback(
    (title: string, description?: string) => {
      toast({ title, description, type: 'error' });
    },
    [toast]
  );

  const warning = React.useCallback(
    (title: string, description?: string) => {
      toast({ title, description, type: 'warning' });
    },
    [toast]
  );

  const info = React.useCallback(
    (title: string, description?: string) => {
      toast({ title, description, type: 'info' });
    },
    [toast]
  );

  const contextValue = React.useMemo<ToastContextValue>(
    () => ({
      toast,
      success,
      error,
      warning,
      info,
      dismiss,
      dismissAll,
    }),
    [toast, success, error, warning, info, dismiss, dismissAll]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
