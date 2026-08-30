const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_PUBLIC_TOKEN;

if (!domain) {
  throw new Error("Falta SHOPIFY_STORE_DOMAIN en .env.local");
}

if (!token) {
  throw new Error(
    "Falta SHOPIFY_STOREFRONT_PUBLIC_TOKEN en .env.local"
  );
}

const shopifyDomain: string = domain;
const shopifyToken: string = token;

const endpoint = `https://${shopifyDomain}/api/2026-07/graphql.json`;

export async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const response = await fetch(endpoint, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": shopifyToken,
    },

    body: JSON.stringify({
      query,
      variables,
    }),

    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Shopify API error: ${response.status} ${response.statusText}`
    );
  }

  const json = await response.json();

  if (json.errors) {
    console.error("Shopify GraphQL errors:", json.errors);
    throw new Error("Error en Shopify Storefront API");
  }

  return json.data;
}