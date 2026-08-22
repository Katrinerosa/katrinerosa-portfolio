"use client";

export type ToastVariant = "success" | "error" | "info";

type ToastProps = {
  message: string;
  variant: ToastVariant;
  onClose: () => void;
};

const variantStyles: Record<ToastVariant, string> = {
  success: "bg-turquoise text-navy",
  error: "bg-coral text-navy",
  info: "bg-surface text-foreground border border-border",
};

export default function Toast({ message, variant, onClose }: ToastProps) {
  const isError = variant === "error";

  return (
    <div
      role={isError ? "alert" : "status"}
      aria-live={isError ? "assertive" : "polite"}
      aria-atomic="true"
      className={`fixed right-5 bottom-5 z-[200] flex max-w-[min(24rem,calc(100vw-2.5rem))] items-center gap-4 rounded-2xl px-5 py-4 font-medium shadow-2xl ${variantStyles[variant]}`}
    >
      <span className="flex-1">{message}</span>
      <button
        type="button"
        onClick={onClose}
        className="rounded-md underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
        aria-label="Luk besked"
      >
        Luk
      </button>
    </div>
  );
}
