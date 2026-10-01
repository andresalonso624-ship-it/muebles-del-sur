import type { MetadataRoute } from "next";

const BASE_URL = "https://www.estanteriasmsc.com";

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_PUBLIC_TOKEN =
  process.env.SHOPIFY_STOREFRONT_PUBLIC_TOKEN;

const SHOPIFY_API_VERSION = "2026-07";

type ShopifySitemapResource = {
  handle: string;
  updatedAt: string;
};

type ShopifySitemapResponse = {
  data?: {
    sitemap?: {
      pagesCount?: {
        count: number;
      };
      resources?: {
        hasNextPage: boolean;
        items: ShopifySitemapResource[];
      };
    };
  };
  errors?: Array<{
    message: string;
  }>;
};

async function getShopifySitemapResources(
  type: "PRODUCT" | "COLLECTION"
): Promise<ShopifySitemapResource[]> {
  if (
    !SHOPIFY_STORE_DOMAIN ||
    !SHOPIFY_STOREFRONT_PUBLIC_TOKEN
  ) {
    console.error(
      "Faltan SHOPIFY_STORE_DOMAIN o SHOPIFY_STOREFRONT_PUBLIC_TOKEN"
    );

    return [];
  }

  const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

  const query = `
    query ShopifySitemap($type: SitemapType!) {
      sitemap(type: $type) {
        pagesCount {
          count
        }
        resources {
          hasNextPage
          items {
            handle
            updatedAt
          }
        }
      }
    }
  `;

  const resources: ShopifySitemapResource[] = [];

  let page = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token":
          SHOPIFY_STOREFRONT_PUBLIC_TOKEN,
      },
      body: JSON.stringify({
        query,
        variables: {
          type,
        },
        page,
      }),
      next: {
        revalidate: 3600,
      },
    });

    if (!response.ok) {
      console.error(
        `Shopify sitemap ${type}: HTTP ${response.status}`
      );
      break;
    }

    const json =
      (await response.json()) as ShopifySitemapResponse;

    if (json.errors?.length) {
      console.error(
        `Shopify sitemap ${type}:`,
        json.errors
      );
      break;
    }

    const sitemap = json.data?.sitemap;

    if (!sitemap?.resources) {
      break;
    }

    resources.push(...sitemap.resources.items);

    hasNextPage = sitemap.resources.hasNextPage;
    page++;
  }

  return resources;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  /*
   * Páginas estáticas de tu web
   */
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/catalogo`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/presupuesto`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/aviso-legal`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/politica-privacidad`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/politica-cookies`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/condiciones-compra`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  /*
   * Obtener categorías de Shopify
   */
  const collections = await getShopifySitemapResources(
    "COLLECTION"
  );

  /*
   * Obtener productos de Shopify
   */
  const products = await getShopifySitemapResources(
    "PRODUCT"
  );

  /*
   * Categorías
   *
   * Ejemplo:
   * /catalogo/perchas
   * /catalogo/etiquetas
   */
  const collectionPages: MetadataRoute.Sitemap =
    collections.map((collection) => ({
      url: `${BASE_URL}/catalogo/${collection.handle}`,
      lastModified: new Date(collection.updatedAt),
      changeFrequency: "daily",
      priority: 0.8,
    }));

  /*
   * Productos
   *
   * IMPORTANTE:
   * Esta ruta corresponde a la estructura:
   *
   * /producto/[handle]
   */
  const productPages: MetadataRoute.Sitemap =
    products.map((product) => ({
      url: `${BASE_URL}/producto/${product.handle}`,
      lastModified: new Date(product.updatedAt),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

  /*
   * Eliminar posibles URLs duplicadas
   */
  const allUrls = [
    ...staticPages,
    ...collectionPages,
    ...productPages,
  ];

  const uniqueUrls = Array.from(
    new Map(
      allUrls.map((item) => [item.url, item])
    ).values()
  );

  return uniqueUrls;
}