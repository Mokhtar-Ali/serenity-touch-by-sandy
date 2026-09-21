import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceExplorer } from "@/components/ui/service-dialog";
import { addOns, services } from "@/data/services";

export function ServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="relative overflow-hidden bg-cream-100 py-20 sm:py-24"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-sage-700/12" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Service Menu"
          title="Massage Services & Pricing"
          titleId="services-title"
        >
          <p>
            Choose from personalized massage services designed to help you
            relax, recharge, and feel your best. Every session is brought
            directly to you for a peaceful spa experience at home.
          </p>
        </SectionHeading>

        <div className="mt-12">
          <ServiceExplorer services={services} addOns={addOns} />
        </div>
      </div>
    </section>
  );
}
