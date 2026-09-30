import Image from 'next/image';
import { ArrowRight, Camera, MapPin, Phone } from 'lucide-react';

import { ButtonLink } from '@/components/ui/button';
import { site } from '@/data/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-cream-200 text-sage-900"
      aria-labelledby="footer-title"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 id="footer-title" className="sr-only">
          Serenity Touch by Sandy footer
        </h2>

        <div className="grid gap-10 border-b border-sage-700/14 pb-10 lg:grid-cols-[1.2fr_0.7fr_0.9fr]">
          <div>
            <div className="relative h-20 w-44 overflow-hidden">
              <Image
                src={site.images.logo}
                alt="Serenity Touch by Sandy logo"
                fill
                sizes="176px"
                className="object-cover"
              />
            </div>
            <p className="mt-5 max-w-md leading-8 text-sage-900/72">
              {site.footerDescription}
            </p>
          </div>

          <div>
            <h3 className="font-display text-2xl font-semibold text-sage-950">
              Quick Links
            </h3>
            <nav className="mt-5 grid gap-2" aria-label="Footer navigation">
              {site.navigation.map((item) => (
                <a
                  className="min-h-11 rounded-lg py-2 text-sage-900/74 transition hover:text-sage-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage-700"
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="font-display text-2xl font-semibold text-sage-950">
              Contact
            </h3>
            <address className="mt-5 grid gap-3 not-italic">
              <a
                className="inline-flex min-h-11 items-center gap-3 rounded-lg text-sage-900/74 transition hover:text-sage-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage-700"
                href={site.phone.href}
              >
                <Phone aria-hidden="true" className="h-4 w-4 text-clay" />
                {site.phone.display}
              </a>
              <span className="inline-flex min-h-11 items-center gap-3 text-sage-900/74">
                <MapPin aria-hidden="true" className="h-4 w-4 text-clay" />
                {site.location}
              </span>
              <a
                className="inline-flex min-h-11 items-center gap-3 rounded-lg text-sage-900/74 transition hover:text-sage-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage-700"
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Serenity Touch by Sandy on Instagram"
              >
                <Camera aria-hidden="true" className="h-4 w-4 text-clay" />
                Instagram
              </a>
            </address>
          </div>
        </div>

        <div className="grid gap-6 border-b border-sage-700/14 py-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-sage-700">
              WEBSITE BY CLEOPATRA SOLUTIONS
            </p>
            <h3 className="mt-2 max-w-xl font-display text-3xl font-semibold leading-tight text-sage-950">
              Want a website like this for your business?
            </h3>
            <p className="mt-3 max-w-2xl leading-7 text-sage-900/72">
              Whether you have a site or not, we help with bookings, payments,
              portals, CRM and automation.
            </p>
          </div>
          <div className="grid gap-4">
            <p className="text-sm font-medium leading-6 text-sage-900/72">
              Websites · Portals · Bookings · Payments · CRM · Audit
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <ButtonLink
                href={site.cleopatra.auditCta}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[linear-gradient(135deg,#d9bd72_0%,#bd9140_100%)] px-4 text-sage-950 shadow-[0_14px_28px_rgba(146,104,34,0.2)] hover:brightness-105 focus-visible:outline-[#8a6729]"
              >
                Get your free audit
                <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
              </ButtonLink>
              <ButtonLink
                href={site.cleopatra.websiteCta}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                className="w-full border border-[#ae873d] px-4 text-sage-950 hover:bg-[#bd9140]/10 focus-visible:outline-[#8a6729]"
              >
                Create your website
                <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
              </ButtonLink>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-7 text-sm text-sage-900/62 sm:flex-row sm:items-center sm:justify-between">
          <p>{`(c) ${year} Serenity Touch by Sandy. All rights reserved.`}</p>
          <p>
            Built by{' '}
            <a
              className="font-semibold text-sage-800 transition hover:text-sage-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage-700"
              href={site.cleopatra.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              @Cleopatra Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
