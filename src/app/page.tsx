import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { AboutSection } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact";
import { HeroSection } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services";
import { addOns, services } from "@/data/services";
import { site } from "@/data/site";

const serviceOffers = [
  ...services.map((service) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: service.name,
      description: service.shortDescription,
      provider: { "@id": `${site.url}/#business` },
      areaServed: site.location,
    },
    priceSpecification: service.prices.map((price) => ({
      "@type": "UnitPriceSpecification",
      name: price.label,
      price: price.amount,
      priceCurrency: "USD",
    })),
  })),
  ...addOns.map((addOn) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: addOn.name,
      description: addOn.description,
      provider: { "@id": `${site.url}/#business` },
      areaServed: site.location,
    },
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: addOn.amount,
      priceCurrency: "USD",
    },
  })),
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MassageTherapist",
  "@id": `${site.url}/#business`,
  name: site.name,
  url: site.url,
  telephone: site.phone.e164,
  image: `${site.url}${site.images.sandy}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Florence",
    addressRegion: "KY",
    addressCountry: "US",
  },
  areaServed: {
    "@type": "City",
    name: "Florence",
    addressRegion: "KY",
    addressCountry: "US",
  },
  sameAs: [site.instagram],
  makesOffer: serviceOffers,
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
