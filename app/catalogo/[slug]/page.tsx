import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_PUBLIC_TOKEN =
  process.env.SHOPIFY_STOREFRONT_PUBLIC_TOKEN;

const BASE_URL = "https://www.estanteriasmsc.com";

type Product = {
  id: string;
  title: string;
  handle: string;
  description: string;
  featuredImage: {
    url: string;
    altText: string | null;
  } | null;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
};

type Collection = {
  id: string;
  title: string;
  handle: string;
  description: string;
  seo: {
    title: string | null;
    description: string | null;
  };
  products: {
    nodes: Product[];
  };
};

type ShopifyResponse = {
  data?: {
    collection: Collection | null;
  };
  errors?: Array<{
    message: string;
  }>;
};

async function getCollection(slug: string): Promise<Collection | null> {
  if (
    !SHOPIFY_STORE_DOMAIN ||
    !SHOPIFY_STOREFRONT_PUBLIC_TOKEN
  ) {
    console.error("Faltan las variables de Shopify.");
    return null;
  }

  const query = `
    query GetCollection($handle: String!) {
      collection(handle: $handle) {
        id
        title
        handle
        description
        seo {
          title
          description
        }
        products(first: 100) {
          nodes {
            id
            title
            handle
            description
            featuredImage {
              url
              altText
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(
      `https://${SHOPIFY_STORE_DOMAIN}/api/2026-07/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token":
            SHOPIFY_STOREFRONT_PUBLIC_TOKEN,
        },
        body: JSON.stringify({
          query,
          variables: {
            handle: slug,
          },
        }),
        next: {
          revalidate: 3600,
        },
      }
    );

    if (!response.ok) {
      console.error(
        "Error HTTP Shopify:",
        response.status,
        response.statusText
      );

      return null;
    }

    const result: ShopifyResponse = await response.json();

    if (result.errors?.length) {
      console.error("Error GraphQL Shopify:", result.errors);
      return null;
    }

    return result.data?.collection ?? null;
  } catch (error) {
    console.error("Error obteniendo colección:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const collection = await getCollection(slug);

  if (!collection) {
    return {
      title: "Catálogo | Estanterías MSC",
      description:
        "Productos y mobiliario para comercios, tiendas y espacios profesionales.",
    };
  }

  const title =
    collection.seo?.title ||
    `${collection.title} | Estanterías MSC`;

  const description =
    collection.seo?.description ||
    collection.description ||
    `Compra ${collection.title} en Estanterías MSC. Consulta nuestro catálogo de productos y mobiliario.`;

  const canonicalUrl = `${BASE_URL}/catalogo/${collection.handle}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Estanterías MSC",
      type: "website",
    },
  };
}

export default async function CatalogCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const collection = await getCollection(slug);

  if (!collection) {
    notFound();
  }

  const products = collection.products.nodes;

  return (
    <main className="min-h-screen bg-[#FCFAF7]">
      {/* CABECERA */}
      <section className="border-b border-[#E9E2D9] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <nav className="mb-5 text-sm text-[#8B5E34]">
            <Link
              href="/"
              className="transition hover:text-[#A36A33]"
            >
              Inicio
            </Link>

            <span className="mx-2">/</span>

            <Link
              href="/catalogo"
              className="transition hover:text-[#A36A33]"
            >
              Catálogo
            </Link>

            <span className="mx-2">/</span>

            <span className="text-[#2C241C]">
              {collection.title}
            </span>
          </nav>

          <h1 className="text-4xl font-bold tracking-tight text-[#2C241C] md:text-5xl">
            {collection.title}
          </h1>

          {collection.description && (
            <div
              className="mt-5 max-w-3xl text-base leading-7 text-[#6B6259]"
              dangerouslySetInnerHTML={{
                __html: collection.description,
              }}
            />
          )}
        </div>
      </section>

      {/* PRODUCTOS */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {products.length === 0 ? (
          <div className="rounded-2xl border border-[#E9E2D9] bg-white p-10 text-center">
            <h2 className="text-2xl font-semibold text-[#2C241C]">
              No hay productos disponibles
            </h2>

            <p className="mt-3 text-[#6B6259]">
              Actualmente no hay productos publicados en esta categoría.
            </p>

            <Link
              href="/catalogo"
              className="mt-6 inline-flex rounded-lg bg-[#A36A33] px-6 py-3 font-medium text-white transition hover:bg-[#7A4E24]"
            >
              Volver al catálogo
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8 flex items-center justify-between">
              <p className="text-sm text-[#6B6259]">
                {products.length}{" "}
                {products.length === 1
                  ? "producto"
                  : "productos"}
              </p>

              <Link
                href="/catalogo"
                className="text-sm font-medium text-[#A36A33] transition hover:text-[#7A4E24]"
              >
                Ver todo el catálogo →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/producto/${product.handle}`}
                  className="group overflow-hidden rounded-2xl border border-[#E9E2D9] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* IMAGEN */}
                  <div className="relative aspect-square overflow-hidden bg-[#F6F1EA]">
                    {product.featuredImage ? (
                      <Image
                        src={product.featuredImage.url}
                        alt={
                          product.featuredImage.altText ||
                          product.title
                        }
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-contain p-5 transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-[#8B5E34]">
                        Sin imagen
                      </div>
                    )}
                  </div>

                  {/* INFORMACIÓN */}
                  <div className="p-5">
                    <h2 className="line-clamp-2 text-lg font-semibold text-[#2C241C] transition group-hover:text-[#A36A33]">
                      {product.title}
                    </h2>

                    {product.description && (
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#6B6259]">
                        {product.description.replace(
                          /<[^>]*>/g,
                          ""
                        )}
                      </p>
                    )}

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-bold text-[#A36A33]">
                        {Number(
                          product.priceRange.minVariantPrice.amount
                        ).toLocaleString("es-ES", {
                          style: "currency",
                          currency:
                            product.priceRange.minVariantPrice
                              .currencyCode,
                        })}
                      </span>

                      <span className="text-sm font-medium text-[#2C241C]">
                        Ver producto →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}