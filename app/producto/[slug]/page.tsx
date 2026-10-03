import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Header from "../../components/Header";
import ProductGallery from "../../components/ProductGallery";
import ProductPurchase from "../../components/ProductPurchase";

import {
  getShopifyProducts,
  type ShopifyProduct,
} from "../../lib/shopify-products";

const BASE_URL =
  "https://www.estanteriasmsc.com";


/* =========================================================
   OBTENER PRODUCTO
========================================================= */

async function getProduct(
  slug: string
): Promise<ShopifyProduct | null> {
  try {
    const products =
      await getShopifyProducts();

    const product =
      products.find(
        (item: ShopifyProduct) =>
          item.handle === slug
      );

    return product ?? null;
  } catch (error) {
    console.error(
      "Error obteniendo producto:",
      error
    );

    return null;
  }
}


/* =========================================================
   METADATA SEO
========================================================= */

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const product =
    await getProduct(slug);

  if (!product) {
    return {
      title:
        "Producto no encontrado | Estanterías MSC",

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
    title:
      `${product.title} | Estanterías MSC`,

    description,

    alternates: {
      canonical: canonicalUrl,
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title:
        `${product.title} | Estanterías MSC`,

      description,

      url: canonicalUrl,

      siteName:
        "Estanterías MSC",

      type: "website",

      images:
        product.featuredImage
          ? [
              {
                url:
                  product.featuredImage.url,

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
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  const product =
    await getProduct(slug);

  if (!product) {
    notFound();
  }


  /* =======================================================
     IMÁGENES
  ======================================================= */

  const images =
    product.images?.length > 0
      ? product.images
      : product.featuredImage
      ? [product.featuredImage]
      : [];


  /* =======================================================
     VARIANTES
  ======================================================= */

  const variants =
    product.variants ?? [];


  /* =======================================================
     PRECIO
  ======================================================= */

  const price =
    product.priceRange
      ?.minVariantPrice;


  /* =======================================================
     COLECCIONES
  ======================================================= */

  const collections =
    product.collections ?? [];


  /* =======================================================
     DESCRIPCIÓN LIMPIA
  ======================================================= */

  const cleanDescription =
    product.description
      ?.replace(/<[^>]*>/g, "")
      .trim() || "";


  /* =======================================================
     CATEGORÍA PRINCIPAL
  ======================================================= */

  const categoriaPrincipal =
    collections.length > 0
      ? collections[0]
      : null;


  return (
    <>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <Header />


      {/* =====================================================
          CONTENIDO
      ===================================================== */}

      <main
        className="
          min-h-screen
          bg-[#FCFAF7]
          pt-[72px]
          sm:pt-[80px]
          lg:pt-[94px]
        "
      >

        {/* =================================================
            BREADCRUMB
        ================================================= */}

        <section
          className="
            border-b
            border-[#E9E2D9]
            bg-white
          "
        >
          <div
            className="
              mx-auto
              max-w-7xl
              px-6
              py-5
              lg:px-8
            "
          >

            <nav
              className="
                flex
                flex-wrap
                items-center
                gap-2
                text-sm
              "
            >

              <Link
                href="/"
                className="
                  text-[#8B5E34]
                  transition
                  hover:text-[#A36A33]
                "
              >
                Inicio
              </Link>

              <span className="text-[#B8AEA4]">
                /
              </span>

              <Link
                href="/catalogo"
                className="
                  text-[#8B5E34]
                  transition
                  hover:text-[#A36A33]
                "
              >
                Catálogo
              </Link>

              {categoriaPrincipal && (
                <>
                  <span className="text-[#B8AEA4]">
                    /
                  </span>

                  <Link
                    href={`/catalogo/${categoriaPrincipal.handle}`}
                    className="
                      text-[#8B5E34]
                      transition
                      hover:text-[#A36A33]
                    "
                  >
                    {categoriaPrincipal.title}
                  </Link>
                </>
              )}

              <span className="text-[#B8AEA4]">
                /
              </span>

              <span
                className="
                  max-w-[250px]
                  truncate
                  text-[#2C241C]
                "
              >
                {product.title}
              </span>

            </nav>

          </div>
        </section>


        {/* =================================================
            PRODUCTO
        ================================================= */}

        <section
          className="
            mx-auto
            max-w-7xl
            px-6
            py-10
            lg:px-8
            lg:py-16
          "
        >

          <div
            className="
              grid
              grid-cols-1
              gap-10
              lg:grid-cols-2
              lg:gap-16
            "
          >

            {/* =============================================
                GALERÍA
            ============================================= */}

            <div>
              <ProductGallery
                images={images}
                productTitle={
                  product.title
                }
              />
            </div>


            {/* =============================================
                INFORMACIÓN
            ============================================= */}

            <div className="flex flex-col">

              {/* CATEGORÍAS */}

              {collections.length > 0 && (
                <div
                  className="
                    mb-4
                    flex
                    flex-wrap
                    gap-2
                  "
                >

                  {collections.map(
                    (collection) => (
                      <Link
                        key={collection.id}
                        href={`/catalogo/${collection.handle}`}
                        className="
                          rounded-full
                          bg-[#F6F1EA]
                          px-4
                          py-1.5
                          text-xs
                          font-medium
                          text-[#8B5E34]
                          transition
                          hover:bg-[#E9E2D9]
                        "
                      >
                        {collection.title}
                      </Link>
                    )
                  )}

                </div>
              )}


              {/* TÍTULO */}

              <h1
                className="
                  text-3xl
                  font-bold
                  tracking-tight
                  text-[#2C241C]
                  md:text-4xl
                  lg:text-5xl
                "
              >
                {product.title}
              </h1>


              {/* PRECIO */}

              {price && (
                <div className="mt-6">

                  <span
                    className="
                      text-3xl
                      font-bold
                      text-[#A36A33]
                    "
                  >
                    {Number(
                      price.amount
                    ).toLocaleString(
                      "es-ES",
                      {
                        style:
                          "currency",

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
                  <div
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      bg-green-50
                      px-4
                      py-2
                      text-sm
                      font-medium
                      text-green-700
                    "
                  >

                    <span
                      className="
                        h-2
                        w-2
                        rounded-full
                        bg-green-500
                      "
                    />

                    Disponible

                  </div>
                ) : (
                  <div
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      bg-red-50
                      px-4
                      py-2
                      text-sm
                      font-medium
                      text-red-700
                    "
                  >

                    <span
                      className="
                        h-2
                        w-2
                        rounded-full
                        bg-red-500
                      "
                    />

                    Agotado

                  </div>
                )}

              </div>


              {/* SEPARADOR */}

              <div
                className="
                  my-7
                  border-t
                  border-[#E9E2D9]
                "
              />


              {/* DESCRIPCIÓN */}

              <div>

                <h2
                  className="
                    text-lg
                    font-semibold
                    text-[#2C241C]
                  "
                >
                  Descripción
                </h2>

                {cleanDescription ? (
                  <p
                    className="
                      mt-4
                      text-base
                      leading-7
                      text-[#6B6259]
                    "
                  >
                    {cleanDescription}
                  </p>
                ) : (
                  <p
                    className="
                      mt-4
                      text-base
                      leading-7
                      text-[#6B6259]
                    "
                  >
                    Consulta las características
                    de este producto.
                  </p>
                )}

              </div>


              {/* =================================================
                  COMPRA
              ================================================= */}

              <ProductPurchase
                productTitle={
                  product.title
                }
                variants={variants}
                availableForSale={
                  product.availableForSale
                }
              />


              {/* =================================================
                  VOLVER A CATEGORÍA
              ================================================= */}

              {categoriaPrincipal ? (
                <div className="mt-8">

                  <Link
                    href={`/catalogo/${categoriaPrincipal.handle}`}
                    className="
                      inline-flex
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-[#E9E2D9]
                      bg-white
                      px-6
                      py-3
                      text-sm
                      font-semibold
                      text-[#2C241C]
                      transition
                      hover:border-[#A36A33]
                      hover:bg-[#F6F1EA]
                    "
                  >
                    ← Volver a categoría
                  </Link>

                </div>
              ) : (
                <div className="mt-8">

                  <Link
                    href="/catalogo"
                    className="
                      inline-flex
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-[#E9E2D9]
                      bg-white
                      px-6
                      py-3
                      text-sm
                      font-semibold
                      text-[#2C241C]
                      transition
                      hover:border-[#A36A33]
                      hover:bg-[#F6F1EA]
                    "
                  >
                    ← Volver al catálogo
                  </Link>

                </div>
              )}

            </div>

          </div>

        </section>


        {/* =================================================
            DATOS ESTRUCTURADOS SEO
        ================================================= */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context":
                "https://schema.org",

              "@type": "Product",

              name:
                product.title,

              description:
                cleanDescription ||
                `Producto de Estanterías MSC: ${product.title}`,

              url:
                `${BASE_URL}/producto/${product.handle}`,

              image:
                product.images?.map(
                  (image) =>
                    image.url
                ) || [],

              brand: {
                "@type": "Brand",
                name:
                  "Estanterías MSC",
              },

              offers: {
                "@type": "Offer",

                url:
                  `${BASE_URL}/producto/${product.handle}`,

                priceCurrency:
                  price?.currencyCode ||
                  "EUR",

                price:
                  price?.amount ||
                  "0",

                availability:
                  product.availableForSale
                    ? "https://schema.org/InStock"
                    : "https://schema.org/OutOfStock",
              },
            }),
          }}
        />

      </main>
    </>
  );
}