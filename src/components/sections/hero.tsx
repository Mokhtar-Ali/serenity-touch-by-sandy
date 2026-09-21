import Image from "next/image";
import { ArrowDown, MapPin, MessageCircle, Sparkles } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { Reveal } from "@/components/ui/reveal";
import { StaggerItem, StaggerReveal } from "@/components/ui/stagger-reveal";
import { site } from "@/data/site";

export function HeroSection() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-cream-200 pt-28"
    >
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(248,245,238,1),rgba(239,232,218,0.92)_48%,rgba(246,242,234,0.98))]" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 sm:px-6 sm:pb-20 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 lg:px-8 lg:pb-24 xl:grid-cols-[1.12fr_0.88fr]">
        <StaggerReveal
          className="max-w-2xl lg:max-w-3xl"
          delay={0.02}
          stagger={0.055}
          trigger="mount"
        >
          <StaggerItem y={14}>
            <p className="mb-4 font-display text-2xl italic text-sage-600">
              Welcome to
            </p>
          </StaggerItem>
          <StaggerItem y={32} duration={0.68}>
            <AnimatedHeading
              as="h1"
              id="hero-title"
              title="Serenity Touch"
              delay={0}
              stagger={0.055}
              trigger="mount"
              className="max-w-[8.8ch] font-display text-[clamp(4.15rem,18vw,5.6rem)] font-semibold leading-[0.88] text-sage-950 sm:max-w-none sm:text-7xl lg:text-[6.4rem] xl:text-[7rem]"
            />
          </StaggerItem>
          <StaggerItem y={18}>
            <p className="mt-3 font-display text-4xl italic leading-none text-sage-600 sm:text-5xl">
              by Sandy
            </p>
          </StaggerItem>

          <StaggerItem y={20}>
            <p className="mt-7 max-w-xl text-lg leading-8 text-sage-900/82 sm:text-xl sm:leading-9">
              {site.description}
            </p>
          </StaggerItem>

          <StaggerItem className="mt-8 flex flex-col gap-3 sm:flex-row" y={18}>
            <ButtonLink href={site.smsHref} className="w-full sm:w-auto">
              <MessageCircle aria-hidden="true" className="h-4 w-4" />
              Make an Appointment
            </ButtonLink>
            <ButtonLink href="#services" variant="secondary" className="w-full sm:w-auto">
              <ArrowDown aria-hidden="true" className="h-4 w-4" />
              View Services
            </ButtonLink>
          </StaggerItem>

          <StaggerItem className="mt-8 grid max-w-xl gap-3 text-sm text-sage-900/76 sm:grid-cols-3" y={16}>
            <div className="flex min-h-12 items-center gap-3 border-t border-sage-700/16 pt-3">
              <Sparkles aria-hidden="true" className="h-4 w-4 text-clay" />
              Mobile Massage
            </div>
            <div className="flex min-h-12 items-center gap-3 border-t border-sage-700/16 pt-3">
              <MapPin aria-hidden="true" className="h-4 w-4 text-clay" />
              {site.locationShort}
            </div>
            <div className="flex min-h-12 items-center gap-3 border-t border-sage-700/16 pt-3">
              <MessageCircle aria-hidden="true" className="h-4 w-4 text-clay" />
              Text to Book
            </div>
          </StaggerItem>
        </StaggerReveal>

        <Reveal
          delay={0.12}
          duration={0.58}
          scale={0.96}
          trigger="mount"
          y={26}
          className="relative mx-auto w-full max-w-[430px] sm:max-w-[500px] lg:max-w-[470px] lg:justify-self-end xl:max-w-[510px]"
        >
          <div className="absolute -right-2 top-8 h-[94%] w-[94%] rounded-t-full rounded-b-lg border border-sage-700/22 sm:-right-5" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-lg bg-cream-300 shadow-[0_34px_76px_rgba(73,85,63,0.2)]">
            <Image
              src={site.images.hero}
              alt="Massage table prepared with stones, towels, and massage oil for a mobile massage session."
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 768px) 88vw, (max-width: 1280px) 470px, 510px"
              className="object-cover object-center transition duration-700 motion-safe:hover:scale-[1.025]"
            />
          </div>
          <div className="absolute bottom-4 left-4 max-w-[210px] rounded-lg border border-cream-100/45 bg-sage-950/78 p-4 text-cream-100 shadow-[0_18px_42px_rgba(35,42,31,0.24)] backdrop-blur-md sm:bottom-5 sm:left-7 sm:max-w-[230px]">
            <p className="font-display text-xl italic leading-none">At-home spa care</p>
            <p className="mt-2 text-sm leading-6 text-cream-100/82">
              Personalized massage in the comfort of your space.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
