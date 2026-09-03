import { shopifyFetch } from "./shopify";

// =========================================================
// VARIANTE
// =========================================================

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

// =========================================================
// IMAGEN
// =========================================================

export interface ShopifyImage {
  url: string;
  altText: string | null;
}

// =========================================================
// COLECCIÓN
// =========================================================

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
}

// =========================================================
// PRODUCTO
// =========================================================

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

// =========================================================
// PRODUCTO DEVUELTO POR SHOPIFY
// =========================================================

interface ShopifyProductNode {
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
}

// =========================================================
// RESPUESTA DE SHOPIFY
// =========================================================

interface ProductsResponse {
  products: {
    nodes: ShopifyProductNode[];

    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
  };
}

// =========================================================
// QUERY SHOPIFY
// =========================================================

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

// =========================================================
// OBTENER TODOS LOS PRODUCTOS
// =========================================================

export async function getShopifyProducts(): Promise<
  ShopifyProduct[]
> {
  const todosLosProductos: ShopifyProduct[] = [];

  let after: string | null = null;

  while (true) {
    // IMPORTANTE:
    // El tipo explícito de data evita el error TS7022.
    const data: ProductsResponse =
      await shopifyFetch<ProductsResponse>(
        PRODUCTS_QUERY,
        {
          after,
        }
      );

    const productos: ShopifyProduct[] =
      data.products.nodes.map(
        (
          producto: ShopifyProductNode
        ): ShopifyProduct => ({
          id: producto.id,

          title: producto.title,

          handle: producto.handle,

          description: producto.description,

          availableForSale:
            producto.availableForSale,

          featuredImage:
            producto.featuredImage,

          // Todas las fotos del producto
          images:
            producto.images?.nodes ?? [],

          priceRange:
            producto.priceRange,

          // Todas las variantes
          variants:
            producto.variants?.nodes ?? [],

          collections:
            producto.collections?.nodes ?? [],
        })
      );

    todosLosProductos.push(
      ...productos
    );

    // Si no hay más páginas, terminamos
    if (
      !data.products.pageInfo.hasNextPage
    ) {
      break;
    }

    after =
      data.products.pageInfo.endCursor;

    // Seguridad adicional
    if (!after) {
      break;
    }
  }

  return todosLosProductos;
}