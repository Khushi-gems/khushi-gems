import { MetadataRoute } from 'next';
import { getAllProductsForSEO } from '@/lib/seo-data';
import { silverCategories } from '@/lib/data';

const baseUrl = 'https://www.khushigemsjaipur.com';

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1️⃣ Static pages
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/collections',
    '/blog',
    '/location',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.7,
  }));

  // 2️⃣ Category pages
  const categoryRoutes = silverCategories.map((cat) => ({
    url: `${baseUrl}/category/${slugify(cat.name)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // 3️⃣ Product pages (FIXED)
  const products = await getAllProductsForSEO();
  
  // Create a Set to track URLs we've already added (prevents duplicates)
  const addedUrls = new Set<string>();
  const productRoutes: MetadataRoute.Sitemap = [];

  products.forEach((product) => {
    // Priority: 1. DB Slug, 2. Slugified Name, 3. ID (last resort)
    const finalSlug = product.slug || slugify(product.name) || product.id;
    const url = `${baseUrl}/products/${finalSlug}`;

    // Only add if we haven't seen this URL yet
    if (!addedUrls.has(url)) {
      addedUrls.add(url);
      productRoutes.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      });
    }
  });

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
