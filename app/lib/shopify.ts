const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_PUBLIC_TOKEN;

export async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  if (!domain) {
    throw new Error(
      "Falta la variable SHOPIFY_STORE_DOMAIN en las variables de entorno."
    );
  }

  if (!token) {
    throw new Error(
      "Falta la variable SHOPIFY_STOREFRONT_PUBLIC_TOKEN en las variables de entorno."
    );
  }

  const shopifyDomain = domain
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");

  const endpoint = `https://${shopifyDomain}/api/2026-07/graphql.json`;

  try {
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
      console.error("Shopify HTTP error:", {
        status: response.status,
        statusText: response.statusText,
        response: json,
      });

      throw new Error(
        `Shopify API error: ${response.status} ${response.statusText}`
      );
    }

    if (json.errors) {
      console.error(
        "Shopify GraphQL errors:",
        JSON.stringify(json.errors, null, 2)
      );

      throw new Error(
        json.errors?.[0]?.message ||
          "Error en Shopify Storefront API"
      );
    }

    if (!json.data) {
      throw new Error(
        "Shopify no devolvió información en data."
      );
    }

    return json.data as T;
  } catch (error) {
    console.error("Error conectando con Shopify:", error);

    throw error;
  }
}