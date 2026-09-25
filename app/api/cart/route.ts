import { NextResponse } from "next/server";

const SHOPIFY_STORE_DOMAIN =
  process.env.SHOPIFY_STORE_DOMAIN;

const SHOPIFY_STOREFRONT_PUBLIC_TOKEN =
  process.env.SHOPIFY_STOREFRONT_PUBLIC_TOKEN;

const SHOPIFY_API_VERSION = "2026-07";

interface CartLine {
  id: string;
  quantity: number;
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  merchandise: {
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    product: {
      title: string;
      handle: string;
      featuredImage: {
        url: string;
        altText: string | null;
      } | null;
    };
  };
}

interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  lines: {
    edges: {
      node: CartLine;
    }[];
  };
}

interface ShopifyResponse {
  data?: {
    cartCreate?: {
      cart: Cart | null;
      userErrors: {
        field: string[] | null;
        message: string;
      }[];
    };

    cartLinesAdd?: {
      cart: Cart | null;
      userErrors: {
        field: string[] | null;
        message: string;
      }[];
    };

    cartLinesUpdate?: {
      cart: Cart | null;
      userErrors: {
        field: string[] | null;
        message: string;
      }[];
    };

    cartLinesRemove?: {
      cart: Cart | null;
      userErrors: {
        field: string[] | null;
        message: string;
      }[];
    };

    cart?: Cart | null;
  };

  errors?: {
    message: string;
  }[];
}

const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity

  cost {
    subtotalAmount {
      amount
      currencyCode
    }

    totalAmount {
      amount
      currencyCode
    }
  }

  lines(first: 100) {
    edges {
      node {
        id
        quantity

        cost {
          totalAmount {
            amount
            currencyCode
          }
        }

        merchandise {
          ... on ProductVariant {
            id
            title

            price {
              amount
              currencyCode
            }

            product {
              title
              handle

              featuredImage {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;

const CART_CREATE_MUTATION = `
  mutation CartCreate($input: CartInput) {
    cartCreate(input: $input) {
      cart {
        ${CART_FIELDS}
      }

      userErrors {
        field
        message
      }
    }
  }
`;

const CART_LINES_ADD_MUTATION = `
  mutation CartLinesAdd(
    $cartId: ID!
    $lines: [CartLineInput!]!
  ) {
    cartLinesAdd(
      cartId: $cartId
      lines: $lines
    ) {
      cart {
        ${CART_FIELDS}
      }

      userErrors {
        field
        message
      }
    }
  }
`;

const CART_LINES_UPDATE_MUTATION = `
  mutation CartLinesUpdate(
    $cartId: ID!
    $lines: [CartLineUpdateInput!]!
  ) {
    cartLinesUpdate(
      cartId: $cartId
      lines: $lines
    ) {
      cart {
        ${CART_FIELDS}
      }

      userErrors {
        field
        message
      }
    }
  }
`;

const CART_LINES_REMOVE_MUTATION = `
  mutation CartLinesRemove(
    $cartId: ID!
    $lineIds: [ID!]!
  ) {
    cartLinesRemove(
      cartId: $cartId
      lineIds: $lineIds
    ) {
      cart {
        ${CART_FIELDS}
      }

      userErrors {
        field
        message
      }
    }
  }
`;

const CART_QUERY = `
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      ${CART_FIELDS}
    }
  }
`;

async function shopifyRequest(
  query: string,
  variables: Record<string, unknown>
): Promise<ShopifyResponse> {
  if (
    !SHOPIFY_STORE_DOMAIN ||
    !SHOPIFY_STOREFRONT_PUBLIC_TOKEN
  ) {
    throw new Error(
      "Faltan las credenciales de Shopify."
    );
  }

  const endpoint =
    `https://${SHOPIFY_STORE_DOMAIN}` +
    `/api/${SHOPIFY_API_VERSION}` +
    `/graphql.json`;

  const response = await fetch(endpoint, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",

      "X-Shopify-Storefront-Access-Token":
        SHOPIFY_STOREFRONT_PUBLIC_TOKEN,
    },

    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const data =
    (await response.json()) as ShopifyResponse;

  if (!response.ok) {
    console.error(
      "Shopify HTTP error:",
      data
    );

    throw new Error(
      "Shopify rechazó la solicitud."
    );
  }

  if (data.errors?.length) {
    console.error(
      "Shopify GraphQL errors:",
      data.errors
    );

    throw new Error(
      data.errors[0]?.message ||
        "Error de Shopify."
    );
  }

  return data;
}

function getUserError(
  errors:
    | {
        field: string[] | null;
        message: string;
      }[]
    | undefined
) {
  if (!errors?.length) {
    return null;
  }

  return errors[0]?.message ||
    "No se pudo actualizar el carrito.";
}

function getShopifyStoreHost(): string {
  const host = SHOPIFY_STORE_DOMAIN
    ?.trim()
    .replace(/^https?:\/\//, "")
    .replace(/\/+$/, "");

  if (!host) {
    throw new Error(
      "Falta el dominio de la tienda Shopify."
    );
  }

  return host;
}

function normalizeCheckoutUrl(
  checkoutUrl: string
): string {
  let url: URL;

  try {
    // El Storefront API puede devolver una URL absoluta o una ruta
    // relativa como /cart/c/.... En ambos casos la resolvemos contra
    // el dominio canónico de Shopify, nunca contra el dominio de Vercel.
    url = new URL(
      checkoutUrl,
      `https://${getShopifyStoreHost()}`
    );
  } catch {
    throw new Error(
      "Shopify devolvió una URL de checkout inválida."
    );
  }

  if (url.protocol !== "https:") {
    throw new Error(
      "Shopify devolvió una URL de checkout no segura."
    );
  }

  // Shopify puede devolver el checkout con el dominio público
  // configurado para la tienda. Si ese dominio apunta a Vercel,
  // /cart/c/... termina en el 404 de Next.js. El dominio usado para
  // la API Storefront siempre pertenece a Shopify y conserva el
  // mismo carrito al cambiar únicamente el host.
  url.protocol = "https:";
  url.hostname = getShopifyStoreHost();
  url.port = "";

  return url.toString();
}

function normalizeCart(
  cart: Cart | null | undefined
): Cart | null {
  if (!cart) {
    return null;
  }

  return {
    ...cart,
    checkoutUrl: normalizeCheckoutUrl(
      cart.checkoutUrl
    ),
  };
}

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const variantId =
      typeof body?.variantId === "string"
        ? body.variantId
        : "";

    const cartId =
      typeof body?.cartId === "string"
        ? body.cartId
        : "";

    const quantity =
      Number.isInteger(body?.quantity) &&
      body.quantity > 0
        ? body.quantity
        : 1;

    if (!variantId) {
      return NextResponse.json(
        {
          error:
            "No se recibió una variante válida.",
        },
        {
          status: 400,
        }
      );
    }

    let data: ShopifyResponse;

    /*
     * Si ya existe un carrito,
     * agregamos el producto a ese carrito.
     */

    if (cartId) {
      data = await shopifyRequest(
        CART_LINES_ADD_MUTATION,
        {
          cartId,
          lines: [
            {
              merchandiseId: variantId,
              quantity,
            },
          ],
        }
      );

      const result =
        data.data?.cartLinesAdd;

      const userError =
        getUserError(
          result?.userErrors
        );

      if (userError) {
        return NextResponse.json(
          {
            error: userError,
          },
          {
            status: 400,
          }
        );
      }

      if (!result?.cart) {
        return NextResponse.json(
          {
            error:
              "Shopify no devolvió el carrito.",
          },
          {
            status: 500,
          }
        );
      }

      const cart = normalizeCart(result.cart);

      return NextResponse.json({
        success: true,
        cart,
        cartId: cart?.id,
        checkoutUrl: cart?.checkoutUrl,
        totalQuantity:
          cart?.totalQuantity,
      });
    }

    /*
     * Si no existe carrito,
     * creamos uno nuevo.
     */

    data = await shopifyRequest(
      CART_CREATE_MUTATION,
      {
        input: {
          lines: [
            {
              merchandiseId: variantId,
              quantity,
            },
          ],
        },
      }
    );

    const result =
      data.data?.cartCreate;

    const userError =
      getUserError(
        result?.userErrors
      );

    if (userError) {
      return NextResponse.json(
        {
          error: userError,
        },
        {
          status: 400,
        }
      );
    }

    if (!result?.cart) {
      return NextResponse.json(
        {
          error:
            "Shopify no devolvió el carrito.",
        },
        {
          status: 500,
        }
      );
    }

    const cart = normalizeCart(result.cart);

    return NextResponse.json({
      success: true,
      cart,
      cartId: cart?.id,
      checkoutUrl: cart?.checkoutUrl,
      totalQuantity:
        cart?.totalQuantity,
    });
  } catch (error) {
    console.error(
      "Error agregando al carrito:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "No se pudo conectar con Shopify.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(
  request: Request
) {
  try {
    const { searchParams } =
      new URL(request.url);

    const cartId =
      searchParams.get("cartId");

    if (!cartId) {
      return NextResponse.json(
        {
          cart: null,
        }
      );
    }

    const data =
      await shopifyRequest(
        CART_QUERY,
        {
          cartId,
        }
      );

    return NextResponse.json({
      success: true,
      cart: normalizeCart(
        data.data?.cart
      ),
    });
  } catch (error) {
    console.error(
      "Error obteniendo carrito:",
      error
    );

    return NextResponse.json(
      {
        error:
          "No se pudo obtener el carrito.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(
  request: Request
) {
  try {
    const body = await request.json();

    const cartId =
      typeof body?.cartId === "string"
        ? body.cartId
        : "";

    const lineId =
      typeof body?.lineId === "string"
        ? body.lineId
        : "";

    const quantity =
      Number.isInteger(body?.quantity) &&
      body.quantity >= 0
        ? body.quantity
        : 1;

    if (!cartId || !lineId) {
      return NextResponse.json(
        {
          error:
            "Faltan datos del carrito.",
        },
        {
          status: 400,
        }
      );
    }

    const data =
      await shopifyRequest(
        CART_LINES_UPDATE_MUTATION,
        {
          cartId,

          lines: [
            {
              id: lineId,
              quantity,
            },
          ],
        }
      );

    const result =
      data.data?.cartLinesUpdate;

    const userError =
      getUserError(
        result?.userErrors
      );

    if (userError) {
      return NextResponse.json(
        {
          error: userError,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json({
      success: true,
      cart: normalizeCart(
        result?.cart
      ),
    });
  } catch (error) {
    console.error(
      "Error actualizando carrito:",
      error
    );

    return NextResponse.json(
      {
        error:
          "No se pudo actualizar el carrito.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: Request
) {
  try {
    const body = await request.json();

    const cartId =
      typeof body?.cartId === "string"
        ? body.cartId
        : "";

    const lineId =
      typeof body?.lineId === "string"
        ? body.lineId
        : "";

    if (!cartId || !lineId) {
      return NextResponse.json(
        {
          error:
            "Faltan datos del carrito.",
        },
        {
          status: 400,
        }
      );
    }

    const data =
      await shopifyRequest(
        CART_LINES_REMOVE_MUTATION,
        {
          cartId,

          lineIds: [
            lineId,
          ],
        }
      );

    const result =
      data.data?.cartLinesRemove;

    const userError =
      getUserError(
        result?.userErrors
      );

    if (userError) {
      return NextResponse.json(
        {
          error: userError,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json({
      success: true,
      cart: normalizeCart(
        result?.cart
      ),
    });
  } catch (error) {
    console.error(
      "Error eliminando producto:",
      error
    );

    return NextResponse.json(
      {
        error:
          "No se pudo eliminar el producto.",
      },
      {
        status: 500,
      }
    );
  }
}