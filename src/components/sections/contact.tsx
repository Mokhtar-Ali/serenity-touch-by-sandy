import { ArrowRight, MapPin, MessageCircle, Phone, Sparkles } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { Reveal } from "@/components/ui/reveal";
import { StaggerItem, StaggerReveal } from "@/components/ui/stagger-reveal";
import { site } from "@/data/site";

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative overflow-hidden bg-sage-900 py-20 text-cream-100 sm:py-24"
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(73,85,63,0.98),rgba(54,65,48,0.96)_52%,rgba(86,98,74,0.92))]" />
      <div className="absolute inset-x-0 top-0 h-px bg-cream-100/18" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
        <StaggerReveal>
          <StaggerItem y={16}>
          <p className="font-display text-2xl italic text-cream-200/86">
            Contact & Appointment
          </p>
          </StaggerItem>
          <StaggerItem y={24}>
          <AnimatedHeading
            as="h2"
            id="contact-title"
            title="Book Your At-Home Massage Experience"
            className="mt-3 max-w-3xl font-display text-5xl font-semibold leading-none text-cream-100 sm:text-6xl"
          />
          </StaggerItem>
          <StaggerItem y={20}>
          <div className="mt-6 max-w-2xl space-y-4 text-base leading-8 text-cream-100/82 sm:text-lg">
            <p>
              Whether you are ready to relax, relieve tension, or schedule a
              personalized massage session, Serenity Touch by Sandy is here to
              bring a calm spa experience directly to your home.
            </p>
            <p>
              Send a text message to book your appointment, ask questions, or
              check availability. You can also call directly for more
              information.
            </p>
          </div>
          </StaggerItem>

          <StaggerItem y={18}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={site.smsHref} variant="light" className="w-full sm:w-auto">
              <MessageCircle aria-hidden="true" className="h-4 w-4" />
              Text to Book
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink href={site.phone.href} variant="outlineLight" className="w-full sm:w-auto">
              <Phone aria-hidden="true" className="h-4 w-4" />
              Call {site.phone.display}
            </ButtonLink>
          </div>
          </StaggerItem>
        </StaggerReveal>

        <Reveal delay={0.1}>
          <div className="rounded-lg border border-cream-100/22 bg-cream-100/10 p-5 shadow-[0_28px_64px_rgba(23,29,21,0.22)] backdrop-blur-md sm:p-7">
            <h3 className="font-display text-3xl font-semibold leading-none">
              Contact
            </h3>
            <address className="mt-6 grid gap-4 not-italic">
              <a
                href={site.phone.href}
                className="grid min-h-16 grid-cols-[auto_1fr] items-center gap-4 rounded-lg border border-cream-100/14 bg-cream-100/8 p-4 transition hover:bg-cream-100/12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream-100"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream-100 text-sage-950">
                  <Phone aria-hidden="true" className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm text-cream-100/62">Text / Call</span>
                  <span className="block font-semibold">{site.phone.display}</span>
                </span>
              </a>

              <div className="grid min-h-16 grid-cols-[auto_1fr] items-center gap-4 rounded-lg border border-cream-100/14 bg-cream-100/8 p-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream-100 text-sage-950">
                  <MapPin aria-hidden="true" className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm text-cream-100/62">Location</span>
                  <span className="block font-semibold">{site.location}</span>
                </span>
              </div>

              <div className="grid min-h-16 grid-cols-[auto_1fr] items-center gap-4 rounded-lg border border-cream-100/14 bg-cream-100/8 p-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream-100 text-sage-950">
                  <Sparkles aria-hidden="true" className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm text-cream-100/62">Services</span>
                  <span className="block font-semibold leading-7">
                    Relaxation, Deep Tissue, Swedish, Neck & Shoulders, Foot
                    Reflexology, and add-ons.
                  </span>
                </span>
              </div>
            </address>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
