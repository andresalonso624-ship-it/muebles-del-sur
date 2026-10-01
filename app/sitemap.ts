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
      "❌ Faltan las variables de Shopify:"
    );

    console.error(
      "SHOPIFY_STORE_DOMAIN:",
      !!SHOPIFY_STORE_DOMAIN
    );

    console.error(
      "SHOPIFY_STOREFRONT_PUBLIC_TOKEN:",
      !!SHOPIFY_STOREFRONT_PUBLIC_TOKEN
    );

    return [];
  }

  const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

  const query = `
    query ShopifySitemap(
      $type: SitemapType!
      $page: Int!
    ) {
      sitemap(type: $type) {
        resources(page: $page) {
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
    try {
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
            page,
          },
        }),
        next: {
          revalidate: 3600,
        },
      });

      if (!response.ok) {
        console.error(
          `❌ Shopify sitemap ${type}: HTTP ${response.status}`
        );

        break;
      }

      const json =
        (await response.json()) as ShopifySitemapResponse;

      if (json.errors?.length) {
        console.error(
          `❌ Error de Shopify sitemap ${type}:`,
          JSON.stringify(json.errors, null, 2)
        );

        break;
      }

      const sitemap = json.data?.sitemap;

      if (!sitemap?.resources) {
        console.error(
          `❌ Shopify no devolvió recursos para ${type}`
        );

        break;
      }

      resources.push(
        ...sitemap.resources.items
      );

      hasNextPage =
        sitemap.resources.hasNextPage;

      page++;
    } catch (error) {
      console.error(
        `❌ Error obteniendo sitemap ${type}:`,
        error
      );

      break;
    }
  }

  console.log(
    `✅ Shopify ${type}: ${resources.length} recursos encontrados`
  );

  return resources;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  /*
   * ==========================================
   * PÁGINAS ESTÁTICAS
   * ==========================================
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
      url: `${BASE_URL}/proyectos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
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
   * ==========================================
   * SHOPIFY
   * ==========================================
   */

  const [collections, products] =
    await Promise.all([
      getShopifySitemapResources("COLLECTION"),
      getShopifySitemapResources("PRODUCT"),
    ]);

  /*
   * ==========================================
   * CATEGORÍAS / COLECCIONES
   *
   * Ejemplo:
   * /catalogo/perchas
   * /catalogo/etiquetas
   * ==========================================
   */

  const collectionPages: MetadataRoute.Sitemap =
    collections.map((collection) => ({
      url: `${BASE_URL}/catalogo/${collection.handle}`,
      lastModified: new Date(
        collection.updatedAt
      ),
      changeFrequency: "daily",
      priority: 0.8,
    }));

  /*
   * ==========================================
   * PRODUCTOS
   *
   * Actualmente:
   * /producto/nombre-del-producto
   * ==========================================
   */

  const productPages: MetadataRoute.Sitemap =
    products.map((product) => ({
      url: `${BASE_URL}/producto/${product.handle}`,
      lastModified: new Date(
        product.updatedAt
      ),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

  /*
   * ==========================================
   * UNIR TODO
   * ==========================================
   */

  const allPages: MetadataRoute.Sitemap = [
    ...staticPages,
    ...collectionPages,
    ...productPages,
  ];

  /*
   * Eliminar URLs duplicadas
   */

  const uniquePages = Array.from(
    new Map(
      allPages.map((page) => [
        page.url,
        page,
      ])
    ).values()
  );

  console.log(
    `🗺️ Sitemap final: ${uniquePages.length} URLs`
  );

  return uniquePages;
}