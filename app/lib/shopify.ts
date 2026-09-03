const getEnv = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `Falta la variable de entorno: ${name}`
    );
  }

  return value;
};

const domain = getEnv(
  "SHOPIFY_STORE_DOMAIN"
);

const token = getEnv(
  "SHOPIFY_STOREFRONT_PUBLIC_TOKEN"
);

const endpoint =
  `https://${domain}/api/2026-07/graphql.json`;

interface ShopifyError {
  message: string;
}

interface ShopifyResponse<T> {
  data?: T;
  errors?: ShopifyError[];
}

export async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {

  const headers = new Headers();

  headers.set(
    "Content-Type",
    "application/json"
  );

  headers.set(
    "X-Shopify-Storefront-Access-Token",
    token
  );

  const response = await fetch(
    endpoint,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Shopify respondió HTTP ${response.status}`
    );
  }

  const json =
    (await response.json()) as ShopifyResponse<T>;

  if (
    json.errors &&
    json.errors.length > 0
  ) {
    console.error(
      "Errores GraphQL de Shopify:",
      json.errors
    );

    throw new Error(
      json.errors[0]?.message ||
        "Error al consultar Shopify"
    );
  }

  if (json.data === undefined) {
    throw new Error(
      "Shopify no devolvió datos"
    );
  }

  return json.data;
}