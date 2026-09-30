'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Menu, MessageCircle, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { ButtonLink } from '@/components/ui/button';
import { site } from '@/data/site';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = Boolean(useReducedMotion());

  useEffect(() => {
    const updateScrollState = () => {
      setScrolled(window.scrollY > 40);
    };

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });

    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const menuButton = menuButtonRef.current;
    const focusTimer = window.setTimeout(() => {
      const firstFocusable = mobilePanelRef.current?.querySelector<HTMLElement>(
        'a[href], button:not([disabled])'
      );

      firstFocusable?.focus();
    }, 0);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', closeOnEscape);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', closeOnEscape);
      if (previouslyFocused && previouslyFocused !== document.body) {
        previouslyFocused.focus();
      } else {
        menuButton?.focus();
      }
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed left-1/2 top-0 z-50 w-full -translate-x-1/2 transition-[width,max-width,padding,border-radius,background-color,box-shadow,border-color] duration-[350ms] ease-out',
        scrolled
          ? 'border-b border-sage-700/12 bg-cream-100/92 shadow-[0_14px_34px_rgba(73,85,63,0.1)] backdrop-blur-xl xl:w-[max(60%,48rem)] xl:rounded-b-2xl'
          : 'bg-cream-100/70 backdrop-blur-md'
      )}
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-20 max-w-7xl items-center gap-5 px-4 sm:px-6 lg:px-8"
      >
        <a
          href="#home"
          aria-label="Serenity Touch by Sandy home"
          className="relative inline-flex h-16 w-36 items-center overflow-hidden rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage-700"
          onClick={() => setOpen(false)}
        >
          <Image
            src={site.images.logo}
            alt="Serenity Touch by Sandy logo"
            fill
            loading="eager"
            fetchPriority="high"
            sizes="144px"
            className="object-cover"
          />
        </a>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          {site.navigation.map((item) => (
            <a
              className="rounded-full px-4 py-3 text-sm font-semibold text-sage-900 transition duration-300 hover:bg-white/55 hover:text-sage-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage-700"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </div>

        <ButtonLink className="ml-2 hidden md:inline-flex" href={site.smsHref}>
          <MessageCircle aria-hidden="true" className="h-4 w-4" />
          Make an Appointment
        </ButtonLink>

        <button
          ref={menuButtonRef}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          className="ml-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-sage-700/20 bg-white/52 text-sage-900 shadow-[0_12px_24px_rgba(73,85,63,0.08)] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage-700 md:hidden"
          onClick={() => setOpen((current) => !current)}
        >
          {open ? (
            <X aria-hidden="true" className="h-5 w-5" />
          ) : (
            <Menu aria-hidden="true" className="h-5 w-5" />
          )}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            ref={mobilePanelRef}
            id="mobile-navigation"
            className="border-t border-sage-700/12 bg-cream-100/96 px-4 pb-6 pt-3 shadow-[0_22px_40px_rgba(73,85,63,0.12)] backdrop-blur-xl md:hidden"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: 'easeOut' }}
          >
            <div className="mx-auto grid max-w-7xl gap-2">
              {site.navigation.map((item) => (
                <a
                  className="min-h-12 rounded-lg px-4 py-3 text-base font-semibold text-sage-950 transition hover:bg-white/66 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage-700"
                  href={item.href}
                  key={item.href}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}

              <ButtonLink
                className="mt-2 w-full"
                href={site.smsHref}
                onClick={() => setOpen(false)}
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4" />
                Make an Appointment
              </ButtonLink>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
