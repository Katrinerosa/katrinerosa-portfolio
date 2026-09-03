"use client";

import Script from "next/script";
import { useCallback, useEffect, useState } from "react";

const MEASUREMENT_ID = "G-CPFJE2YFGE";
const CONSENT_KEY = "katrine-rosa-analytics-consent";
const OPEN_CONSENT_EVENT = "open-cookie-settings";

type Consent = "granted" | "denied" | null;

export default function GoogleAnalytics() {
  const [consent, setConsent] = useState<Consent>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const initializeConsent = window.requestAnimationFrame(() => {
      const savedConsent = window.localStorage.getItem(CONSENT_KEY);

      if (savedConsent === "granted" || savedConsent === "denied") {
        setConsent(savedConsent);
      } else {
        setIsOpen(true);
      }
    });

    const openSettings = () => setIsOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, openSettings);

    return () => {
      window.cancelAnimationFrame(initializeConsent);
      window.removeEventListener(OPEN_CONSENT_EVENT, openSettings);
    };
  }, []);

  const saveConsent = useCallback((nextConsent: Exclude<Consent, null>) => {
    const isRevokingConsent = consent === "granted" && nextConsent === "denied";
    window.localStorage.setItem(CONSENT_KEY, nextConsent);
    setConsent(nextConsent);
    setIsOpen(false);

    if (isRevokingConsent) {
      window.location.reload();
    }
  }, [consent]);

  return (
    <>
      {consent === "granted" ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${MEASUREMENT_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      ) : null}

      {isOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-consent-title"
          className="fixed inset-x-4 bottom-4 z-[200] mx-auto max-w-xl rounded-2xl border border-navy/15 bg-cream p-5 text-navy shadow-2xl sm:p-6"
        >
          <h2 id="cookie-consent-title" className="text-lg font-semibold">
            Må jeg måle besøget?
          </h2>
          <p className="mt-2 text-sm leading-6 text-navy/70">
            Jeg bruger Google Analytics til at forstå, hvordan portfolioen bliver
            brugt. Statistik aktiveres kun, hvis du accepterer.
          </p>
          <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => saveConsent("denied")}
              className="rounded-full border border-navy/25 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-navy/5"
            >
              Afvis statistik
            </button>
            <button
              type="button"
              onClick={() => saveConsent("granted")}
              className="rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-coral"
            >
              Acceptér statistik
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}
