import { NextResponse } from "next/server";

const SHOPIFY_STORE_DOMAIN =
  process.env.SHOPIFY_STORE_DOMAIN;

const SHOPIFY_STOREFRONT_PUBLIC_TOKEN =
  process.env.SHOPIFY_STOREFRONT_PUBLIC_TOKEN;

const SHOPIFY_API_VERSION = "2026-07";

const CART_CREATE_MUTATION = `
  mutation CartCreate($input: CartInput) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        totalQuantity
      }

      userErrors {
        field
        message
      }

      warnings {
        code
        message
      }
    }
  }
`;

interface CartResponse {
  data?: {
    cartCreate?: {
      cart?: {
        id: string;
        checkoutUrl: string;
        totalQuantity: number;
      } | null;

      userErrors: {
        field: string[] | null;
        message: string;
      }[];

      warnings: {
        code: string;
        message: string;
      }[];
    };
  };

  errors?: {
    message: string;
  }[];
}

export async function POST(
  request: Request
) {
  try {
    if (
      !SHOPIFY_STORE_DOMAIN ||
      !SHOPIFY_STOREFRONT_PUBLIC_TOKEN
    ) {
      return NextResponse.json(
        {
          error:
            "Faltan las credenciales de Shopify en .env.local",
        },
        {
          status: 500,
        }
      );
    }

    const body = await request.json();

    const variantId =
      typeof body?.variantId === "string"
        ? body.variantId
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

    const endpoint =
      `https://${SHOPIFY_STORE_DOMAIN}` +
      `/api/${SHOPIFY_API_VERSION}` +
      `/graphql.json`;

    const response = await fetch(
      endpoint,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          "X-Shopify-Storefront-Access-Token":
            SHOPIFY_STOREFRONT_PUBLIC_TOKEN,
        },

        body: JSON.stringify({
          query:
            CART_CREATE_MUTATION,

          variables: {
            input: {
              lines: [
                {
                  merchandiseId:
                    variantId,

                  quantity,
                },
              ],
            },
          },
        }),
      }
    );

    const data =
      (await response.json()) as CartResponse;

    if (!response.ok) {
      console.error(
        "Shopify HTTP error:",
        data
      );

      return NextResponse.json(
        {
          error:
            "Shopify rechazó la solicitud.",
        },
        {
          status: response.status,
        }
      );
    }

    if (data.errors?.length) {
      console.error(
        "Shopify GraphQL errors:",
        data.errors
      );

      return NextResponse.json(
        {
          error:
            data.errors[0]?.message ||
            "Error de Shopify.",
        },
        {
          status: 500,
        }
      );
    }

    const cartCreate =
      data.data?.cartCreate;

    if (!cartCreate) {
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

    if (
      cartCreate.userErrors?.length
    ) {
      return NextResponse.json(
        {
          error:
            cartCreate.userErrors[0]
              ?.message ||
            "No se pudo crear el carrito.",
        },
        {
          status: 400,
        }
      );
    }

    const checkoutUrl =
      cartCreate.cart?.checkoutUrl;

    if (!checkoutUrl) {
      return NextResponse.json(
        {
          error:
            "Shopify no devolvió el checkout.",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
      checkoutUrl,
      cartId:
        cartCreate.cart?.id || null,
      totalQuantity:
        cartCreate.cart
          ?.totalQuantity || quantity,
    });
  } catch (error) {
    console.error(
      "Error creando carrito:",
      error
    );

    return NextResponse.json(
      {
        error:
          "No se pudo conectar con Shopify.",
      },
      {
        status: 500,
      }
    );
  }
}