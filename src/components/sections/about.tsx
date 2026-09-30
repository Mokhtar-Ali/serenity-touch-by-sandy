import Image from 'next/image';
import { HandHeart, Leaf, Sparkles } from 'lucide-react';

import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { site } from '@/data/site';

const highlights = [
  {
    title: 'Mobile Massage Care',
    text: 'Professional massage services brought to the comfort of your home.',
    icon: HandHeart,
  },
  {
    title: 'Personalized Experience',
    text: 'Each session is tailored to help you relax, recharge, and feel renewed.',
    icon: Sparkles,
  },
  {
    title: 'Natural Wellness Focus',
    text: 'A calm, restorative approach centered on comfort, balance, and care.',
    icon: Leaf,
  },
] as const;

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative overflow-hidden bg-cream-300 py-20 sm:py-24"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
        <Reveal className="relative order-2 mx-auto w-full max-w-[560px] lg:order-1">
          <div className="absolute -left-3 top-5 h-full w-full rounded-lg border border-sage-700/24 sm:-left-5" />
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-cream-400 shadow-[0_30px_70px_rgba(73,85,63,0.16)]">
            <Image
              src={site.images.about}
              alt="Sandy wearing green scrubs beside a prepared massage table."
              fill
              sizes="(max-width: 1024px) 92vw, 520px"
              className="object-cover object-center"
            />
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading
            align="left"
            eyebrow="About Sandy"
            title="Meet Sandy, the Heart Behind Serenity Touch"
            titleId="about-title"
          >
            <p>
              Sandy created Serenity Touch by Sandy to bring relaxation, care,
              and professional massage therapy directly to your home. Her goal
              is to make every session feel calm, personalized, and restorative.
            </p>
            <p className="mt-4">
              With a natural and client-focused approach, she offers mobile
              massage services that help relieve stress, reduce tension, and
              support wellness in your own space.
            </p>
          </SectionHeading>

          <div className="mt-9 grid gap-3">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;

              return (
                <Reveal delay={0.08 * index} key={highlight.title}>
                  <div className="grid gap-4 rounded-lg border border-sage-700/14 bg-white/46 p-5 shadow-[0_16px_34px_rgba(73,85,63,0.07)] sm:grid-cols-[auto_1fr]">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-sage-800 text-cream-100 shadow-[0_12px_28px_rgba(73,85,63,0.18)]">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span>
                      <h3 className="font-display text-2xl font-semibold leading-none text-sage-950">
                        {highlight.title}
                      </h3>
                      <p className="mt-2 leading-7 text-sage-900/76">
                        {highlight.text}
                      </p>
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
