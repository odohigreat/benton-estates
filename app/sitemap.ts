import type { MetadataRoute } from 'next';
import { dbRepo } from '@/lib/db';

export const revalidate = 3600;

const baseUrl = 'https://bentonhomes.com';

const staticRoutes = [
  '', '/properties', '/locations', '/services', '/agents', '/about', '/contact',
  '/become-a-realtor', '/properties/elevation-estate/subscribe', '/privacy', '/terms'
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const properties = await dbRepo.listProperties() as { slug: string; updated_at: string }[];

  return [
    ...staticRoutes.map(route => ({ url: `${baseUrl}${route}` })),
    ...properties.map(property => ({
      url: `${baseUrl}/properties/${property.slug}`,
      lastModified: property.updated_at
    }))
  ];
}
