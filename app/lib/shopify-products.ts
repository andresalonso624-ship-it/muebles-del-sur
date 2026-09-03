import { shopifyFetch } from "./shopify";

export interface ShopifyVariant {
  id: string;
  title: string;
  availableForSale: boolean;

  price: {
    amount: string;
    currencyCode: string;
  };

  compareAtPrice: {
    amount: string;
    currencyCode: string;
  } | null;

  selectedOptions: {
    name: string;
    value: string;
  }[];
}

export interface ShopifyImage {
  url: string;
  altText: string | null;
}

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  availableForSale: boolean;

  featuredImage: ShopifyImage | null;

  images: ShopifyImage[];

  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };

  variants: ShopifyVariant[];

  collections: ShopifyCollection[];
}

/* =========================================================
   RESPUESTA DE PRODUCTOS
========================================================= */

interface ProductsResponse {
  products: {
    nodes: {
      id: string;
      title: string;
      handle: string;
      description: string;
      availableForSale: boolean;

      featuredImage: ShopifyImage | null;

      images: {
        nodes: ShopifyImage[];
      };

      priceRange: {
        minVariantPrice: {
          amount: string;
          currencyCode: string;
        };
      };

      variants: {
        nodes: ShopifyVariant[];
      };

      collections: {
        nodes: ShopifyCollection[];
      };
    }[];

    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
  };
}

/* =========================================================
   CONSULTA PRODUCTOS
========================================================= */

const PRODUCTS_QUERY = `
  query GetProducts($after: String) {
    products(
      first: 250
      after: $after
    ) {
      nodes {
        id
        title
        handle
        description
        availableForSale

        featuredImage {
          url
          altText
        }

        images(first: 20) {
          nodes {
            url
            altText
          }
        }

        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }

        variants(first: 100) {
          nodes {
            id
            title
            availableForSale

            price {
              amount
              currencyCode
            }

            compareAtPrice {
              amount
              currencyCode
            }

            selectedOptions {
              name
              value
            }
          }
        }

        collections(first: 20) {
          nodes {
            id
            title
            handle
          }
        }
      }

      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

/* =========================================================
   OBTENER TODOS LOS PRODUCTOS
========================================================= */

export async function getShopifyProducts(): Promise<
  ShopifyProduct[]
> {
  const todosLosProductos: ShopifyProduct[] = [];

  let after: string | null = null;

  while (true) {
    const data: ProductsResponse =
      await shopifyFetch<ProductsResponse>(
        PRODUCTS_QUERY,
        { after }
      );

    const productos =
      data.products.nodes.map(
        (producto): ShopifyProduct => ({
          id: producto.id,

          title: producto.title,

          handle: producto.handle,

          description:
            producto.description ?? "",

          availableForSale:
            producto.availableForSale,

          featuredImage:
            producto.featuredImage,

          images:
            producto.images?.nodes ?? [],

          priceRange:
            producto.priceRange,

          variants:
            producto.variants?.nodes ?? [],

          collections:
            producto.collections?.nodes ?? [],
        })
      );

    todosLosProductos.push(...productos);

    if (
      !data.products.pageInfo.hasNextPage
    ) {
      break;
    }

    after =
      data.products.pageInfo.endCursor;

    if (!after) {
      break;
    }
  }

  return todosLosProductos;
}

/* =========================================================
   RESPUESTA DE CATEGORÍAS
========================================================= */

interface CollectionsResponse {
  collections: {
    nodes: ShopifyCollection[];

    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
  };
}

/* =========================================================
   CONSULTA CATEGORÍAS SHOPIFY
========================================================= */

const COLLECTIONS_QUERY = `
  query GetCollections($after: String) {
    collections(
      first: 250
      after: $after
    ) {
      nodes {
        id
        title
        handle
      }

      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

/* =========================================================
   OBTENER TODAS LAS CATEGORÍAS
========================================================= */

export async function getShopifyCollections(): Promise<
  ShopifyCollection[]
> {
  const todasLasColecciones: ShopifyCollection[] =
    [];

  let after: string | null = null;

  while (true) {
    const data: CollectionsResponse =
      await shopifyFetch<CollectionsResponse>(
        COLLECTIONS_QUERY,
        { after }
      );

    todasLasColecciones.push(
      ...data.collections.nodes
    );

    if (
      !data.collections.pageInfo.hasNextPage
    ) {
      break;
    }

    after =
      data.collections.pageInfo.endCursor;

    if (!after) {
      break;
    }
  }

  return todasLasColecciones;
}