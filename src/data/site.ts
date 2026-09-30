const imageBucket =
  'https://pub-ec6b76c0eef842d1bd7d65492c044988.r2.dev/Serenity%20Touch%20By%20Sandy';

export const site = {
  name: 'Serenity Touch by Sandy',
  displayName: 'Serenity Touch',
  url: 'https://serenitytouchbysandy.com',
  description:
    'Spa experience in the comfort of your home. Relax, recharge, and enjoy personalized massage care designed to help you feel your best.',
  footerDescription:
    'Relaxation, wellness, and personalized massage therapy brought directly to the comfort of your home.',
  location: 'Florence, Kentucky',
  locationShort: 'Florence, KY',
  phone: {
    display: '(859) 646-5079',
    e164: '+18596465079',
    href: 'tel:+18596465079',
  },
  smsHref:
    'sms:+18596465079?body=Hi%20Sandy%2C%20I%20would%20like%20to%20make%20an%20appointment%20for%20a%20massage.',
  instagram:
    'https://www.instagram.com/serenitytouchbysandy?igsh=Yzl3ZGlqaHlidmI5',
  cleopatra: {
    url: 'https://cleopatrasolutions.com/',
    auditCta:
      'https://cleopatrasolutions.com/?utm_source=serenity_touch&utm_medium=footer_cta&utm_campaign=website_design&utm_content=free_audit',
    websiteCta:
      'https://cleopatrasolutions.com/?utm_source=serenity_touch&utm_medium=footer_cta&utm_campaign=website_design&utm_content=create_website',
  },
  images: {
    logo: '/images/Logo-transparent.png',
    hero: `${imageBucket}/Hero.jpg`,
    relaxation: `${imageBucket}/Massage.jpg`,
    deepTissue: `${imageBucket}/Hot%20stones.jpg`,
    specialty: `${imageBucket}/Foot.jpg`,
    about: `${imageBucket}/About.jpg`,
  },
  navigation: [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ],
} as const;
