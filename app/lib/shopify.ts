const domain: string = process.env.SHOPIFY_STORE_DOMAIN ?? "";
const token: string = process.env.SHOPIFY_STOREFRONT_PUBLIC_TOKEN ?? "";

if (!domain) {
  throw new Error("Falta SHOPIFY_STORE_DOMAIN");
}

if (!token) {
  throw new Error("Falta SHOPIFY_STOREFRONT_PUBLIC_TOKEN");
}

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

  if (!response.ok) {
    throw new Error(
      `Shopify API error: ${response.status} ${response.statusText}`
    );
  }

  const json = await response.json();

  if (json.errors) {
    console.error("Shopify GraphQL errors:", json.errors);
    throw new Error("Error al consultar Shopify");
  }

  return json.data;
}