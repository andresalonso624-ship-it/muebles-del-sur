// app/lib/shopify.ts

const SHOPIFY_STORE_DOMAIN =
  process.env.SHOPIFY_STORE_DOMAIN;

const SHOPIFY_STOREFRONT_PUBLIC_TOKEN =
  process.env.SHOPIFY_STOREFRONT_PUBLIC_TOKEN;

// =========================================================
// VALIDAR VARIABLES DE ENTORNO
// =========================================================

if (!SHOPIFY_STORE_DOMAIN) {
  throw new Error(
    "Falta SHOPIFY_STORE_DOMAIN en las variables de entorno."
  );
}

if (!SHOPIFY_STOREFRONT_PUBLIC_TOKEN) {
  throw new Error(
    "Falta SHOPIFY_STOREFRONT_PUBLIC_TOKEN en las variables de entorno."
  );
}

// =========================================================
// CONFIGURACIÓN SHOPIFY
// =========================================================

const SHOPIFY_API_VERSION = "2026-07";

const SHOPIFY_ENDPOINT =
  `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

// =========================================================
// SHOPIFY FETCH
// =========================================================

export async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  // Creamos los headers explícitamente.
  // El ! indica a TypeScript que ya hemos comprobado
  // anteriormente que el token existe.
  const headers = new Headers();

  headers.set(
    "Content-Type",
    "application/json"
  );

  headers.set(
    "X-Shopify-Storefront-Access-Token",
    SHOPIFY_STOREFRONT_PUBLIC_TOKEN!
  );

  // =======================================================
  // PETICIÓN
  // =======================================================

  const response = await fetch(
    SHOPIFY_ENDPOINT,
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

  // =======================================================
  // ERROR HTTP
  // =======================================================

  if (!response.ok) {
    const errorText =
      await response.text();

    throw new Error(
      `Shopify API error ${response.status}: ${errorText}`
    );
  }

  // =======================================================
  // RESPUESTA
  // =======================================================

  const json = (await response.json()) as {
    data?: T;
    errors?: {
      message: string;
    }[];
  };

  // =======================================================
  // ERROR GRAPHQL
  // =======================================================

  if (json.errors && json.errors.length > 0) {
    throw new Error(
      json.errors
        .map((error) => error.message)
        .join(", ")
    );
  }

  // =======================================================
  // SIN DATOS
  // =======================================================

  if (!json.data) {
    throw new Error(
      "Shopify no devolvió datos."
    );
  }

  return json.data;
}