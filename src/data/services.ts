import { site } from "@/data/site";

export type ServicePrice = {
  label: string;
  price: string;
  amount: number;
};

export type Service = {
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  description: string[];
  bestFor: string;
  prices: ServicePrice[];
  image: string;
  imageAlt: string;
  layout: "feature" | "standard" | "slim" | "wide";
};

export type AddOn = {
  name: string;
  price: string;
  amount: number;
  description: string;
};

export const services: Service[] = [
  {
    slug: "relaxation-massage",
    name: "Relaxation Massage",
    category: "Full-body calm",
    shortDescription:
      "A gentle and soothing massage designed to reduce stress, calm the nervous system, and promote deep relaxation.",
    description: [
      "A gentle and soothing massage designed to reduce stress, calm the nervous system, and promote deep relaxation.",
      "Using long, flowing strokes and light to medium pressure, this treatment helps release everyday tension and brings your body and mind into a peaceful state of balance.",
    ],
    bestFor: "Perfect for stress relief, mental reset, and overall relaxation.",
    prices: [
      { label: "60 minutes", price: "$100", amount: 100 },
      { label: "90 minutes", price: "$140", amount: 140 },
    ],
    image: site.images.relaxation,
    imageAlt: "Sandy providing a relaxation massage in a softly lit room.",
    layout: "feature",
  },
  {
    slug: "swedish-massage",
    name: "Swedish Massage",
    category: "Classic restorative care",
    shortDescription:
      "A classic full-body massage that combines relaxation techniques with medium pressure to improve circulation and ease tension.",
    description: [
      "A classic full-body massage that combines relaxation techniques with medium pressure to improve circulation, reduce tension, and promote overall well-being.",
      "It uses rhythmic, flowing movements to help the body fully relax while improving energy flow and reducing stress.",
    ],
    bestFor: "Perfect balance between relaxation and therapeutic care.",
    prices: [
      { label: "60 minutes", price: "$100", amount: 100 },
      { label: "90 minutes", price: "$140", amount: 140 },
    ],
    image: site.images.relaxation,
    imageAlt: "Sandy providing an in-home massage treatment.",
    layout: "standard",
  },
  {
    slug: "deep-tissue-massage",
    name: "Deep Tissue Massage",
    category: "Focused muscle release",
    shortDescription:
      "A more focused and therapeutic massage designed to target deeper layers of muscle and tension.",
    description: [
      "A more focused and therapeutic massage designed to target deeper layers of muscle and tension.",
      "This treatment helps release chronic tightness, muscle knots, and areas of stiffness caused by stress, posture, or physical activity.",
      "Pressure is adjusted based on your comfort and needs to ensure effective but safe muscle release.",
    ],
    bestFor: "Ideal for chronic pain, tension, and muscle recovery.",
    prices: [
      { label: "60 minutes", price: "$130", amount: 130 },
      { label: "90 minutes", price: "$160", amount: 160 },
    ],
    image: site.images.deepTissue,
    imageAlt:
      "Sandy providing an in-home massage with hot stones placed on a client's back.",
    layout: "slim",
  },
  {
    slug: "neck-shoulder-massage",
    name: "Neck & Shoulder Massage",
    category: "Targeted tension relief",
    shortDescription:
      "A targeted treatment focused on relieving tension in the neck, shoulders, and upper back.",
    description: [
      "A targeted treatment focused on relieving tension in the neck, shoulders, and upper back.",
      "This area often holds stress from posture, work, and daily activity, and this massage helps release tight muscles, improve mobility, and reduce headaches caused by tension.",
    ],
    bestFor: "Great for quick relief and desk-related tension.",
    prices: [{ label: "30 minutes", price: "$70", amount: 70 }],
    image: site.images.deepTissue,
    imageAlt: "Sandy providing an upper-body massage in a home setting.",
    layout: "wide",
  },
  {
    slug: "foot-reflexology",
    name: "Foot Reflexology",
    category: "Grounding reset",
    shortDescription:
      "A relaxing and restorative treatment focused on pressure points in the feet that connect to different areas of the body.",
    description: [
      "A relaxing and restorative treatment focused on pressure points in the feet that connect to different areas of the body.",
      "This technique helps improve circulation, reduce stress, and support overall balance and relaxation throughout the body.",
    ],
    bestFor: "Perfect for grounding, relaxation, and full-body wellness.",
    prices: [{ label: "30 minutes", price: "$70", amount: 70 }],
    image: site.images.specialty,
    imageAlt: "Sandy holding a client's foot during a reflexology treatment.",
    layout: "wide",
  },
];

export const addOns: AddOn[] = [
  {
    name: "Hot Stones",
    price: "$25",
    amount: 25,
    description:
      "Smooth heated stones can be added to deepen relaxation and help muscles soften into the session.",
  },
  {
    name: "Aromatherapy",
    price: "$15",
    amount: 15,
    description:
      "Aromatherapy adds calming scent to support a more restorative at-home spa experience.",
  },
];

export const serviceNote = "Travel fee may apply depending on distance.";
