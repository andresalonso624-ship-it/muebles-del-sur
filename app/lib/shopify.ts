const domain = process.env.SHOPIFY_STORE_DOMAIN!;
const token = process.env.SHOPIFY_STOREFRONT_PUBLIC_TOKEN!;

const endpoint = `https://${domain}/api/2026-07/graphql.json`;

export async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const response = await fetch(endpoint, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },

    body: JSON.stringify({
      query,
      variables,
    }),

    cache: "no-store",
  });

  const json = await response.json();

  if (!response.ok) {
    console.error("Shopify HTTP error:", response.status, json);
    throw new Error(`Error HTTP de Shopify: ${response.status}`);
  }

  if (json.errors) {
    console.error("Shopify GraphQL errors:", json.errors);
    throw new Error("Error al consultar Shopify");
  }

  return json.data as T;
}