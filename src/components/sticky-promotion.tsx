"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { site } from "@/data/site";

type AnalyticsValue = string | number | boolean | null | undefined;
type AnalyticsPayload = Record<string, AnalyticsValue>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (
      command: "event",
      eventName: string,
      params: Record<string, unknown>,
    ) => void;
    fbq?: (
      command: "trackCustom",
      eventName: string,
      params: Record<string, unknown>,
    ) => void;
  }
}

const dismissalKey = "atfStickyTravelAdDismissed";
const minimumScrollDistance = 180;

function trackTravelAdEvent(eventName: string, additionalData: AnalyticsPayload = {}) {
  const eventData: Record<string, AnalyticsValue> = {
    event_category: "Ali Travel Frames Sticky Ad",
    event_label: "serenity_touch_sticky_ad",
    source_site: window.location.hostname,
    destination_url: site.aliTravelFrames.url,
    ...additionalData,
  };
  const eventPayload = { event: eventName, ...eventData };

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(eventPayload);
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, eventData);
  }

  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", eventName, eventData);
  }
}

export function StickyPromotion() {
  const [visible, setVisible] = useState(false);
  const impressionTracked = useRef(false);
  const reduceMotion = Boolean(useReducedMotion());

  const dismiss = useCallback((method: "button" | "escape") => {
    setVisible(false);

    try {
      window.sessionStorage.setItem(dismissalKey, "true");
    } catch {
      return;
    }

    trackTravelAdEvent("atf_sticky_ad_close", {
      close_method: method,
      scroll_position: Math.round(window.scrollY),
    });
  }, []);

  useEffect(() => {
    let dismissed = false;

    try {
      dismissed = window.sessionStorage.getItem(dismissalKey) === "true";
    } catch {
      dismissed = false;
    }

    if (dismissed) {
      return;
    }

    let frame = 0;
    const updateVisibility = () => {
      frame = 0;

      if (window.scrollY >= minimumScrollDistance) {
        setVisible(true);
      }
    };
    const requestUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(updateVisibility);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", requestUpdate);
    };
  }, []);

  useEffect(() => {
    if (!visible || impressionTracked.current) {
      return;
    }

    impressionTracked.current = true;
    trackTravelAdEvent("atf_sticky_ad_view", {
      scroll_position: Math.round(window.scrollY),
    });
  }, [visible]);

  useEffect(() => {
    if (!visible) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dismiss("escape");
      }
    };

    document.addEventListener("keydown", closeOnEscape);

    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [dismiss, visible]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.aside
          aria-labelledby="atf-sticky-travel-ad-title"
          className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom))] left-3 right-3 z-[70] max-h-[calc(100svh-1.5rem-env(safe-area-inset-bottom))] overflow-y-auto overflow-x-hidden rounded-lg border border-sage-700/24 bg-cream-300 text-sage-950 shadow-[0_28px_70px_rgba(73,85,63,0.22)] sm:left-auto sm:right-5 sm:w-[390px]"
          initial={reduceMotion ? false : { opacity: 0, x: 34 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 34 }}
          transition={{ duration: reduceMotion ? 0 : 0.34, ease: "easeOut" }}
        >
          <button
            type="button"
            aria-label="Close Ali Travel Frames advertisement"
            className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream-100/42 bg-sage-950/72 text-cream-100 shadow-[0_12px_24px_rgba(29,36,27,0.22)] transition hover:bg-sage-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream-100"
            onClick={() => dismiss("button")}
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>

          <a
            href={site.aliTravelFrames.imageHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Explore personalized trips with Ali Travel Frames"
            className="relative block aspect-[16/9] overflow-hidden bg-sage-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage-700"
            onClick={() =>
              trackTravelAdEvent("atf_sticky_ad_click", {
                link_url: site.aliTravelFrames.imageHref,
                click_location: "beach_image",
              })
            }
          >
            <Image
              src={site.images.travel}
              alt="Tropical beach destination featured by Ali Travel Frames."
              fill
              sizes="(max-width: 480px) calc(100vw - 24px), 390px"
              className="object-cover object-center transition duration-500 hover:scale-[1.035]"
            />
            <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,31,20,0)_35%,rgba(37,47,31,0.62))]" />
            <span className="absolute bottom-4 left-4 rounded-full border border-cream-100/36 bg-sage-950/50 px-3 py-2 text-xs font-semibold text-cream-100 backdrop-blur-md">
              Personalized Travel
            </span>
          </a>

          <div className="p-5">
            <p className="text-xs font-semibold uppercase text-sage-900/72">
              Travel with Ali Travel Frames
            </p>
            <h2
              id="atf-sticky-travel-ad-title"
              className="mt-2 max-w-xs font-display text-3xl font-semibold leading-none"
            >
              Your next escape, thoughtfully planned.
            </h2>
            <p className="mt-3 text-sm leading-7 text-sage-900/80">
              Discover personalized itineraries, curated travel packages,
              hotels, activities, and private experiences designed around you.
            </p>
            <div className="mt-4 hidden flex-wrap gap-2 sm:flex" aria-label="Ali Travel Frames services">
              <span className="rounded-full border border-sage-700/14 bg-white/34 px-3 py-2 text-xs font-semibold">
                Custom Itineraries
              </span>
              <span className="rounded-full border border-sage-700/14 bg-white/34 px-3 py-2 text-xs font-semibold">
                Travel Packages
              </span>
              <span className="rounded-full border border-sage-700/14 bg-white/34 px-3 py-2 text-xs font-semibold">
                Private Experiences
              </span>
            </div>
            <a
              href={site.aliTravelFrames.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-12 w-full items-center justify-between gap-3 rounded-full bg-sage-800 px-5 py-3 text-sm font-semibold text-cream-100 shadow-[0_14px_30px_rgba(73,85,63,0.22)] transition hover:bg-sage-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage-700"
              onClick={() =>
                trackTravelAdEvent("atf_sticky_ad_click", {
                  link_url: site.aliTravelFrames.ctaHref,
                  click_location: "main_button",
                })
              }
            >
              Explore Your Next Trip
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
            <p className="mt-3 text-center text-xs text-sage-900/64">
              Colombia, Egypt, personalized journeys
            </p>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
