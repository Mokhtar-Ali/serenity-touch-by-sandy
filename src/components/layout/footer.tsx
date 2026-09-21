import Image from "next/image";
import { ArrowUpRight, Camera, MapPin, Phone } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { site } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-cream-200 text-sage-900" aria-labelledby="footer-title">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 id="footer-title" className="sr-only">
          Serenity Touch by Sandy footer
        </h2>

        <div className="grid gap-10 border-b border-sage-700/14 pb-10 lg:grid-cols-[1.2fr_0.7fr_0.9fr]">
          <div>
            <Image
              src={site.images.logo}
              alt="Serenity Touch by Sandy logo"
              width={1536}
              height={1024}
              sizes="220px"
              className="h-20 w-auto object-contain"
            />
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

        <div className="grid gap-6 border-b border-sage-700/14 py-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="font-display text-xl italic text-sage-600">
              Website by Cleopatra Solutions
            </p>
            <h3 className="mt-2 font-display text-3xl font-semibold leading-none text-sage-950">
              Want a website that feels this calm and professional?
            </h3>
            <p className="mt-3 max-w-2xl leading-7 text-sage-900/72">
              We create elegant, mobile-friendly websites that help service
              businesses present their work, build trust, and attract more
              clients.
            </p>
          </div>
          <div className="grid gap-3">
            <ButtonLink
              href={site.cleopatra.footerCta}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
            >
              Build My Website
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </ButtonLink>
            <span className="text-center text-xs text-sage-900/54">
              Websites, automation, digital content
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-7 text-sm text-sage-900/62 sm:flex-row sm:items-center sm:justify-between">
          <p>{`(c) ${year} Serenity Touch by Sandy. All rights reserved.`}</p>
          <p>
            Built by{" "}
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
