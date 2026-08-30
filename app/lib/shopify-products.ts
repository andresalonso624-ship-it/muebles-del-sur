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

  featuredImage: {
    url: string;
    altText: string | null;
  } | null;

  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };

  variants: ShopifyVariant[];

  collections: ShopifyCollection[];
}

interface ProductsResponse {
  products: {
    nodes: ShopifyProduct[];

    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
  };
}

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

export async function getShopifyProducts(): Promise<
  ShopifyProduct[]
> {

  const todosLosProductos: ShopifyProduct[] = [];

  let after: string | null = null;

  let continuar = true;

  while (continuar) {

    const variables: {
      after: string | null;
    } = {
      after,
    };

    const data =
      await shopifyFetch<ProductsResponse>(
        PRODUCTS_QUERY,
        variables
      );

    const productos =
      data.products.nodes;

    todosLosProductos.push(
      ...productos
    );

    continuar =
      data.products.pageInfo.hasNextPage;

    after =
      data.products.pageInfo.endCursor;
  }

  return todosLosProductos;
}