import { shopifyFetch } from "./shopify";

/* =========================================================
   TIPOS
========================================================= */

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

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
}

export interface ShopifyImage {
  url: string;
  altText: string | null;
}

export interface ShopifyProduct {
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

  variants: ShopifyVariant[];

  collections: ShopifyCollection[];

  seo?: {
    title: string | null;
    description: string | null;
  };
}

/* =========================================================
   RESPUESTA DE PRODUCTOS
========================================================= */

interface ProductsResponse {
  products: {
    nodes: ShopifyProduct[];

    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
  };
}

/* =========================================================
   RESPUESTA DE PRODUCTO INDIVIDUAL
========================================================= */

interface ProductResponse {
  product: ShopifyProduct | null;
}

/* =========================================================
   QUERY PRODUCTOS
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

        seo {
          title
          description
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

  let continuar = true;

  while (continuar) {
    const data: ProductsResponse =
      await shopifyFetch<ProductsResponse>(
        PRODUCTS_QUERY,
        {
          after,
        }
      );

    todosLosProductos.push(
      ...data.products.nodes
    );

    continuar =
      data.products.pageInfo.hasNextPage;

    after =
      data.products.pageInfo.endCursor;
  }

  return todosLosProductos;
}

/* =========================================================
   QUERY PRODUCTO INDIVIDUAL
========================================================= */

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
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

      seo {
        title
        description
      }
    }
  }
`;

/* =========================================================
   OBTENER PRODUCTO POR HANDLE
========================================================= */

export async function getProductByHandle(
  handle: string
): Promise<ShopifyProduct | null> {
  const data: ProductResponse =
    await shopifyFetch<ProductResponse>(
      PRODUCT_BY_HANDLE_QUERY,
      {
        handle,
      }
    );

  return data.product;
}