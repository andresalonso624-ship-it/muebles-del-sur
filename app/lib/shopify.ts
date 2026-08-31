const domain = process.env.DOMINIO_DE_TIENDA_DE_SHOPIFY;
const token = process.env.FICHA_PÚBLICA_DE_SHOPIFY_STOREFRONT;

if (!domain) {
  throw new Error(
    "Falta DOMINIO_DE_TIENDA_DE_SHOPIFY en las variables de entorno."
  );
}

if (!token) {
  throw new Error(
    "Falta FICHA_PÚBLICA_DE_SHOPIFY_STOREFRONT en las variables de entorno."
  );
}

const shopifyDomain = domain;
const shopifyToken = token;

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