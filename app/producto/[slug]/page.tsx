import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getShopifyProducts,
  type ShopifyProduct,
  type ShopifyVariant,
  type ShopifyImage,
  type ShopifyCollection,
} from "../../lib/shopify-products";

const BASE_URL = "https://www.estanteriasmsc.com";

/* =========================================================
   OBTENER PRODUCTO
========================================================= */

async function getProduct(
  slug: string
): Promise<ShopifyProduct | null> {
  try {
    const products = await getShopifyProducts();

    const product = products.find(
      (item: ShopifyProduct) => item.handle === slug
    );

    return product ?? null;
  } catch (error) {
    console.error("Error obteniendo producto:", error);
    return null;
  }
}

/* =========================================================
   METADATA SEO
========================================================= */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Producto no encontrado | Estanterías MSC",
      description:
        "Producto no disponible en Estanterías MSC.",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const description =
    product.description
      ?.replace(/<[^>]*>/g, "")
      .trim()
      .slice(0, 160) ||
    `${product.title} en Estanterías MSC. Consulta precio, características y disponibilidad.`;

  const canonicalUrl =
    `${BASE_URL}/producto/${product.handle}`;

  return {
    title: `${product.title} | Estanterías MSC`,
    description,

    alternates: {
      canonical: canonicalUrl,
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title: `${product.title} | Estanterías MSC`,
      description,
      url: canonicalUrl,
      siteName: "Estanterías MSC",
      type: "website",

      images: product.featuredImage
        ? [
            {
              url: product.featuredImage.url,
              alt:
                product.featuredImage.altText ||
                product.title,
            },
          ]
        : [],
    },
  };
}

/* =========================================================
   PÁGINA DEL PRODUCTO
========================================================= */

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const images: ShopifyImage[] =
    product.images?.length > 0
      ? product.images
      : product.featuredImage
        ? [product.featuredImage]
        : [];

  const variants: ShopifyVariant[] =
    product.variants ?? [];

  const mainImage =
    product.featuredImage ||
    images[0] ||
    null;

  const price =
    product.priceRange?.minVariantPrice;

  const collections =
    product.collections ?? [];

  const cleanDescription =
    product.description
      ?.replace(/<[^>]*>/g, "")
      .trim() || "";

  return (
    <main className="min-h-screen bg-[#FCFAF7]">

      {/* =====================================================
          BREADCRUMB
      ===================================================== */}

      <section className="border-b border-[#E9E2D9] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">

          <nav className="flex flex-wrap items-center gap-2 text-sm">

            <Link
              href="/"
              className="text-[#8B5E34] transition hover:text-[#A36A33]"
            >
              Inicio
            </Link>

            <span className="text-[#B8AEA4]">
              /
            </span>

            <Link
              href="/catalogo"
              className="text-[#8B5E34] transition hover:text-[#A36A33]"
            >
              Catálogo
            </Link>

            {collections.length > 0 && (
              <>
                <span className="text-[#B8AEA4]">
                  /
                </span>

                <Link
                  href={`/catalogo/${collections[0].handle}`}
                  className="text-[#8B5E34] transition hover:text-[#A36A33]"
                >
                  {collections[0].title}
                </Link>
              </>
            )}

            <span className="text-[#B8AEA4]">
              /
            </span>

            <span className="text-[#2C241C]">
              {product.title}
            </span>

          </nav>

        </div>
      </section>

      {/* =====================================================
          PRODUCTO
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-16">

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">

          {/* =================================================
              GALERÍA
          ================================================= */}

          <div>

            <div className="relative aspect-square overflow-hidden rounded-3xl border border-[#E9E2D9] bg-white">

              {mainImage ? (
                <Image
                  src={mainImage.url}
                  alt={
                    mainImage.altText ||
                    product.title
                  }
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-8"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-[#8B5E34]">
                  Sin imagen disponible
                </div>
              )}

            </div>

            {/* MINIATURAS */}

            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">

                {images.map(
                  (
                    image: ShopifyImage,
                    index: number
                  ) => (
                    <div
                      key={`${image.url}-${index}`}
                      className="relative aspect-square overflow-hidden rounded-xl border border-[#E9E2D9] bg-white"
                    >
                      <Image
                        src={image.url}
                        alt={
                          image.altText ||
                          `${product.title} - imagen ${
                            index + 1
                          }`
                        }
                        fill
                        sizes="120px"
                        className="object-contain p-2"
                      />
                    </div>
                  )
                )}

              </div>
            )}

          </div>

          {/* =================================================
              INFORMACIÓN
          ================================================= */}

          <div className="flex flex-col">

            {/* CATEGORÍAS */}

            {collections.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">

                {collections.map(
                  (
                    collection
                  ) => (
                    <Link
                      key={collection.id}
                      href={`/catalogo/${collection.handle}`}
                      className="rounded-full bg-[#F6F1EA] px-4 py-1.5 text-xs font-medium text-[#8B5E34] transition hover:bg-[#E9E2D9]"
                    >
                      {collection.title}
                    </Link>
                  )
                )}

              </div>
            )}

            {/* TÍTULO */}

            <h1 className="text-3xl font-bold tracking-tight text-[#2C241C] md:text-4xl lg:text-5xl">
              {product.title}
            </h1>

            {/* PRECIO */}

            {price && (
              <div className="mt-6">

                <span className="text-3xl font-bold text-[#A36A33]">
                  {Number(
                    price.amount
                  ).toLocaleString(
                    "es-ES",
                    {
                      style: "currency",
                      currency:
                        price.currencyCode,
                    }
                  )}
                </span>

              </div>
            )}

            {/* DISPONIBILIDAD */}

            <div className="mt-4">

              {product.availableForSale ? (
                <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  Disponible
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-700">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  No disponible
                </div>
              )}

            </div>

            {/* SEPARADOR */}

            <div className="my-8 h-px bg-[#E9E2D9]" />

            {/* DESCRIPCIÓN */}

            {cleanDescription && (
              <div>

                <h2 className="text-lg font-semibold text-[#2C241C]">
                  Descripción
                </h2>

                <p className="mt-3 whitespace-pre-line text-base leading-7 text-[#6B6259]">
                  {cleanDescription}
                </p>

              </div>
            )}

            {/* VARIANTES */}

            {variants.length > 0 && (
              <div className="mt-8">

                <h2 className="text-lg font-semibold text-[#2C241C]">
                  Opciones disponibles
                </h2>

                <div className="mt-4 space-y-3">

                  {variants.map(
                    (
                      variant: ShopifyVariant
                    ) => (
                      <div
                        key={variant.id}
                        className="rounded-xl border border-[#E9E2D9] bg-white p-4"
                      >

                        <div className="flex items-center justify-between gap-4">

                          <div>

                            <p className="font-medium text-[#2C241C]">
                              {variant.title}
                            </p>

                            {variant.selectedOptions?.length >
                              0 && (
                              <div className="mt-2 flex flex-wrap gap-2">

                                {variant.selectedOptions.map(
                                  (
                                    option
                                  ) => (
                                    <span
                                      key={`${variant.id}-${option.name}-${option.value}`}
                                      className="rounded-md bg-[#F6F1EA] px-2 py-1 text-xs text-[#6B6259]"
                                    >
                                      {option.name}:{" "}
                                      {option.value}
                                    </span>
                                  )
                                )}

                              </div>
                            )}

                          </div>

                          <div className="text-right">

                            <p className="font-semibold text-[#A36A33]">
                              {Number(
                                variant.price.amount
                              ).toLocaleString(
                                "es-ES",
                                {
                                  style:
                                    "currency",
                                  currency:
                                    variant
                                      .price
                                      .currencyCode,
                                }
                              )}
                            </p>

                            <p className="mt-1 text-xs text-[#6B6259]">
                              {variant.availableForSale
                                ? "Disponible"
                                : "Agotado"}
                            </p>

                          </div>

                        </div>

                      </div>
                    )
                  )}

                </div>

              </div>
            )}

            {/* =================================================
                CONTACTO / PRESUPUESTO
            ================================================= */}

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">

              <Link
                href={`/presupuesto?producto=${encodeURIComponent(
                  product.title
                )}`}
                className="inline-flex items-center justify-center rounded-xl bg-[#A36A33] px-7 py-4 text-center font-semibold text-white transition hover:bg-[#7A4E24]"
              >
                Solicitar presupuesto
              </Link>

              <Link
                href="/catalogo"
                className="inline-flex items-center justify-center rounded-xl border border-[#E9E2D9] bg-white px-7 py-4 text-center font-semibold text-[#2C241C] transition hover:border-[#A36A33] hover:text-[#A36A33]"
              >
                Volver al catálogo
              </Link>

            </div>

            {/* INFORMACIÓN ADICIONAL */}

            <div className="mt-8 rounded-2xl border border-[#E9E2D9] bg-white p-6">

              <h2 className="font-semibold text-[#2C241C]">
                ¿Necesitas más información?
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#6B6259]">
                Si necesitas medidas, acabados,
                cantidades o una solución personalizada,
                contacta con nosotros y te ayudaremos.
              </p>

              <div className="mt-4">

                <Link
                  href="/presupuesto"
                  className="text-sm font-semibold text-[#A36A33] transition hover:text-[#7A4E24]"
                >
                  Contactar con Estanterías MSC →
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          PRODUCTOS RELACIONADOS
      ===================================================== */}

      {collections.length > 0 && (
        <section className="border-t border-[#E9E2D9] bg-white">

          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

              <div>

                <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#A36A33]">
                  También puedes ver
                </p>

                <h2 className="mt-2 text-2xl font-bold text-[#2C241C]">
                  Más productos del catálogo
                </h2>

              </div>

              <Link
                href={`/catalogo/${collections[0].handle}`}
                className="text-sm font-semibold text-[#A36A33] transition hover:text-[#7A4E24]"
              >
                Ver categoría →
              </Link>

            </div>

          </div>

        </section>
      )}

    </main>
  );
}