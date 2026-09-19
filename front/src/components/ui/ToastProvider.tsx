import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { CircleAlert, CircleCheck, X } from 'lucide-react';

export type ToastTone = 'success' | 'error';

interface Toast {
  id: number;
  tone: ToastTone;
  message: string;
}

interface ToastContextValue {
  notify: (tone: ToastTone, message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const AUTO_DISMISS_MS = 7000;

/**
 * Retours d'information courts, affiches hors du flux de la page.
 * Le conteneur est une `aria-live` polie : le lecteur d'ecran annonce le
 * message sans interrompre la lecture en cours.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const notify = useCallback((tone: ToastTone, message: string) => {
    setToasts((current) => [...current, { id: Date.now() + current.length, tone, message }]);
  }, []);

  useEffect(() => {
    if (toasts.length === 0) return;
    const timers = toasts.map((toast) =>
      window.setTimeout(() => dismiss(toast.id), AUTO_DISMISS_MS),
    );
    return () => timers.forEach(window.clearTimeout);
  }, [toasts, dismiss]);

  const value = useMemo<ToastContextValue>(() => ({ notify }), [notify]);

  return (
    <ToastContext value={value}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex flex-col items-center gap-2 p-4 sm:items-end"
        aria-live="polite"
        aria-atomic="false"
      >
        {toasts.map((toast) => {
          const Icon = toast.tone === 'success' ? CircleCheck : CircleAlert;
          const tint =
            toast.tone === 'success'
              ? 'border-l-blue-600 text-navy-900'
              : 'border-l-red-600 text-navy-900';

          return (
            <div
              key={toast.id}
              role={toast.tone === 'error' ? 'alert' : 'status'}
              className={`pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-sm border border-navy-900/10 border-l-4 bg-white px-4 py-3 shadow-[0_18px_40px_-20px_rgb(11_31_58/0.45)] ${tint}`}
            >
              <Icon className="mt-0.5 size-5 shrink-0 text-blue-600" aria-hidden="true" />
              <p className="flex-1 text-sm leading-relaxed">{toast.message}</p>
              <button
                type="button"
                onClick={() => dismiss(toast.id)}
                className="-m-1 rounded-sm p-1 text-ink-500 transition hover:text-navy-900"
                aria-label="Fermer la notification"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext>
  );
}

/** Acces au systeme de notification depuis n'importe quel composant. */
export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast doit etre utilise a l’interieur de ToastProvider.');
  }
  return context;
}
