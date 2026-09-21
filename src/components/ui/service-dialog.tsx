"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Clock, DollarSign, MapPin, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import type { AddOn, Service } from "@/data/services";
import { serviceNote } from "@/data/services";

type ServiceExplorerProps = {
  services: Service[];
  addOns: AddOn[];
};

type ServiceCard = {
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  image: string;
  imageAlt: string;
  services: Service[];
};

const focusableSelector =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function priceSummary(service: Service) {
  return service.prices.map((price) => `${price.label} ${price.price}`).join(" / ");
}

function buildServiceCards(services: Service[]): ServiceCard[] {
  const bySlug = new Map(services.map((service) => [service.slug, service]));
  const relaxation = bySlug.get("relaxation-massage");
  const swedish = bySlug.get("swedish-massage");
  const deepTissue = bySlug.get("deep-tissue-massage");
  const neckShoulder = bySlug.get("neck-shoulder-massage");
  const footReflexology = bySlug.get("foot-reflexology");

  return [
    relaxation && swedish
      ? {
          slug: "relaxation-swedish",
          name: "Relaxation / Swedish Massage",
          category: "Full-body restorative care",
          shortDescription:
            "Gentle, flowing massage options for stress relief, circulation, and whole-body relaxation.",
          image: relaxation.image,
          imageAlt: relaxation.imageAlt,
          services: [relaxation, swedish],
        }
      : null,
    deepTissue
      ? {
          slug: deepTissue.slug,
          name: deepTissue.name,
          category: deepTissue.category,
          shortDescription: deepTissue.shortDescription,
          image: deepTissue.image,
          imageAlt: deepTissue.imageAlt,
          services: [deepTissue],
        }
      : null,
    neckShoulder && footReflexology
      ? {
          slug: "specialty-services",
          name: "Specialty Services",
          category: "Targeted 30-minute care",
          shortDescription:
            "Focused neck, shoulder, and foot reflexology treatments for a quick restorative reset.",
          image: footReflexology.image,
          imageAlt: footReflexology.imageAlt,
          services: [neckShoulder, footReflexology],
        }
      : null,
  ].filter((card): card is ServiceCard => Boolean(card));
}

export function ServiceExplorer({ services, addOns }: ServiceExplorerProps) {
  const [activeCardSlug, setActiveCardSlug] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const reduceMotion = Boolean(useReducedMotion());

  const serviceCards = useMemo(() => buildServiceCards(services), [services]);
  const activeCard = useMemo(
    () => serviceCards.find((card) => card.slug === activeCardSlug) ?? null,
    [activeCardSlug, serviceCards],
  );

  const closeDialog = useCallback(() => {
    setActiveCardSlug(null);
  }, []);

  const trapFocus = useCallback((event: KeyboardEvent) => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    const focusableElements = Array.from(
      dialog.querySelectorAll<HTMLElement>(focusableSelector),
    ).filter((element) => !element.hasAttribute("disabled"));

    if (focusableElements.length === 0) {
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }, []);

  useEffect(() => {
    if (!activeCard) {
      return;
    }

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const previousOverflow = document.body.style.overflow;
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDialog();
        return;
      }

      if (event.key === "Tab") {
        trapFocus(event);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [activeCard, closeDialog, trapFocus]);

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {serviceCards.map((card, index) => (
          <motion.button
            type="button"
            key={card.slug}
            aria-haspopup="dialog"
            aria-label={`View details for ${card.name}`}
            className="group flex h-full flex-col overflow-hidden rounded-lg border border-sage-700/14 bg-white/58 text-left shadow-[0_18px_42px_rgba(73,85,63,0.08)] transition duration-300 hover:-translate-y-1.5 hover:border-sage-700/28 hover:bg-white/74 hover:shadow-[0_28px_58px_rgba(73,85,63,0.13)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage-700"
            onClick={() => setActiveCardSlug(card.slug)}
            initial={reduceMotion ? false : { opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.24 }}
            transition={{
              duration: reduceMotion ? 0 : 0.62,
              delay: index * 0.09,
              ease: "easeOut",
            }}
          >
            <span className="relative block aspect-[5/4] overflow-hidden bg-cream-300">
              <Image
                src={card.image}
                alt={card.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center transition duration-500 group-hover:scale-[1.035]"
              />
              <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(34,40,31,0)_34%,rgba(34,40,31,0.52))]" />
              <span className="absolute bottom-4 right-4 inline-flex min-h-10 items-center gap-2 rounded-full bg-cream-100 px-4 py-2 text-sm font-semibold text-sage-950 shadow-[0_12px_30px_rgba(29,36,27,0.18)]">
                Details
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition group-hover:translate-x-0.5"
                />
              </span>
            </span>

            <span className="flex flex-1 flex-col p-5">
              <span className="mb-3 block font-display text-lg italic text-sage-600">
                {card.category}
              </span>
              <span className="block font-display text-3xl font-semibold leading-none text-sage-950">
                {card.name}
              </span>
              <span className="mt-4 block text-sm leading-7 text-sage-900/72">
                {card.shortDescription}
              </span>
              <span className="mt-auto grid gap-2 pt-5">
                {card.services.map((service) => (
                  <span
                    className="flex items-start justify-between gap-4 border-t border-sage-700/12 pt-3 text-sm"
                    key={`${card.slug}-${service.slug}`}
                  >
                    <span className="inline-flex items-center gap-2 font-semibold text-sage-900/76">
                      <Clock aria-hidden="true" className="h-4 w-4 text-clay" />
                      {service.name}
                    </span>
                    <strong className="max-w-[9rem] text-right text-sm font-semibold leading-6 text-sage-700">
                      {priceSummary(service)}
                    </strong>
                  </span>
                ))}
              </span>
            </span>
          </motion.button>
        ))}
      </div>

      <motion.div
        className="mt-12 rounded-lg border border-sage-700/14 bg-cream-300/48 p-5 shadow-[0_18px_42px_rgba(73,85,63,0.07)] sm:p-8"
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.24 }}
        transition={{ duration: reduceMotion ? 0 : 0.66, ease: "easeOut" }}
      >
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-xl italic text-sage-600">
            Enhance Your Session
          </p>
          <h3 className="mt-2 font-display text-4xl font-semibold leading-none text-sage-950">
            Add-Ons
          </h3>
          <p className="mt-4 text-base leading-7 text-sage-900/72">
            Choose a calming enhancement to personalize your in-home massage.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {addOns.map((addOn, index) => (
            <motion.div
              className="rounded-lg border border-sage-700/14 bg-cream-100/72 p-5 shadow-[0_14px_30px_rgba(73,85,63,0.06)]"
              key={addOn.name}
              initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: reduceMotion ? 0 : 0.52,
                delay: index * 0.08,
                ease: "easeOut",
              }}
            >
              <div className="flex items-center justify-between gap-4">
                <h4 className="font-display text-2xl font-semibold text-sage-950">
                  {addOn.name}
                </h4>
                <span className="inline-flex items-center gap-1 font-display text-2xl font-semibold text-sage-700">
                  <DollarSign aria-hidden="true" className="h-4 w-4" />
                  {addOn.amount}
                </span>
              </div>
              <p className="mt-3 text-sm leading-7 text-sage-900/72">
                {addOn.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="mx-auto mt-5 max-w-3xl rounded-lg border border-sage-700/14 bg-white/54 px-5 py-4 text-center shadow-[0_14px_30px_rgba(73,85,63,0.06)]"
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: reduceMotion ? 0 : 0.56, ease: "easeOut", delay: 0.08 }}
      >
        <p className="inline-flex items-center justify-center gap-2 text-sm font-semibold uppercase text-sage-700">
          <MapPin aria-hidden="true" className="h-4 w-4 text-clay" />
          Mobile Service Note
        </p>
        <p className="mt-2 text-sm leading-7 text-sage-900/74">{serviceNote}</p>
      </motion.div>

      <AnimatePresence>
        {activeCard ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
          >
            <button
              type="button"
              tabIndex={-1}
              aria-label="Close service details"
              className="absolute inset-0 cursor-default bg-sage-950/56 backdrop-blur-sm"
              onClick={closeDialog}
            />

            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="service-dialog-title"
              aria-describedby="service-dialog-description"
              className="relative flex max-h-[88svh] w-full max-w-3xl flex-col overflow-hidden rounded-lg border border-sage-700/22 bg-cream-100 shadow-[0_34px_80px_rgba(23,29,21,0.32)]"
              initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.98 }}
              transition={{ duration: reduceMotion ? 0 : 0.28, ease: "easeOut" }}
            >
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close service details"
                className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-sage-700/18 bg-cream-100/86 text-sage-950 shadow-[0_12px_24px_rgba(73,85,63,0.14)] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage-700"
                onClick={closeDialog}
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>

              <div className="overflow-y-auto">
                <div className="relative aspect-[16/9] min-h-[220px] overflow-hidden bg-cream-300">
                  <Image
                    src={activeCard.image}
                    alt={activeCard.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(34,40,31,0)_30%,rgba(34,40,31,0.68))]" />
                  <div className="absolute bottom-5 left-5 right-16 text-cream-100">
                    <p className="font-display text-xl italic">{activeCard.category}</p>
                    <h3
                      id="service-dialog-title"
                      className="mt-2 font-display text-4xl font-semibold leading-none sm:text-5xl"
                    >
                      {activeCard.name}
                    </h3>
                  </div>
                </div>

                <div className="p-5 sm:p-8">
                  <p
                    id="service-dialog-description"
                    className="text-lg leading-8 text-sage-900/84"
                  >
                    {activeCard.shortDescription}
                  </p>
                  <div className="mt-6 grid gap-5">
                    {activeCard.services.map((service) => (
                      <div
                        className="rounded-lg border border-sage-700/14 bg-white/54 p-5"
                        key={`${activeCard.slug}-modal-${service.slug}`}
                      >
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                          <div>
                            <p className="font-display text-lg italic text-sage-600">
                              {service.category}
                            </p>
                            <h4 className="mt-1 font-display text-3xl font-semibold leading-none text-sage-950">
                              {service.name}
                            </h4>
                          </div>
                          <p className="text-sm font-semibold text-sage-700">
                            {service.bestFor}
                          </p>
                        </div>
                        <div className="mt-4 grid gap-3">
                          {service.description.map((paragraph) => (
                            <p className="leading-8 text-sage-900/80" key={paragraph}>
                              {paragraph}
                            </p>
                          ))}
                        </div>
                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                          {service.prices.map((price) => (
                            <div
                              className="flex min-h-16 items-center justify-between gap-4 rounded-lg border border-sage-700/14 bg-cream-100/80 px-5 py-4"
                              key={`${service.slug}-modal-${price.label}`}
                            >
                              <span className="font-semibold text-sage-900/80">
                                {price.label}
                              </span>
                              <strong className="font-display text-2xl text-sage-700">
                                {price.price}
                              </strong>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
