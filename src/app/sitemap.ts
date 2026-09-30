import type { MetadataRoute } from 'next';

import { site } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-09-15T00:00:00.000Z');

  return [
    {
      url: site.url,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
      images: [
        site.images.hero,
        site.images.relaxation,
        site.images.deepTissue,
        site.images.specialty,
        site.images.about,
      ],
    },
  ];
}
