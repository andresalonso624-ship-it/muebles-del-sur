import Image from "next/image";
import Link from "next/link";

import CatalogoCard from "../components/CatalogoCard";
import { getShopifyProducts } from "../lib/shopify-products";

interface CatalogoPageProps {
  searchParams: Promise<{
    buscar?: string;
    categoria?: string;
  }>;
}

export default async function CatalogoPage({
  searchParams,
}: CatalogoPageProps) {
  const params = await searchParams;

  const buscar = params.buscar || "";
  const categoria = params.categoria || "";

  // =========================================================
  // PRODUCTOS
  // =========================================================

  const productosShopify = await getShopifyProducts();

  // =========================================================
  // CATEGORÍAS
  // =========================================================

  const categoriasMap = new Map<
    string,
    {
      title: string;
      handle: string;
    }
  >();

  productosShopify.forEach((producto) => {
    if (!Array.isArray(producto.collections)) {
      return;
    }

    producto.collections.forEach((collection) => {
      if (!categoriasMap.has(collection.handle)) {
        categoriasMap.set(collection.handle, {
          title: collection.title,
          handle: collection.handle,
        });
      }
    });
  });

  const categorias = Array.from(
    categoriasMap.values()
  ).sort((a, b) =>
    a.title.localeCompare(b.title, "es")
  );

  // =========================================================
  // BUSCADOR
  // =========================================================

  const textoBusqueda = buscar
    .toLowerCase()
    .trim();

  let productosFiltrados =
    productosShopify.filter((producto) => {
      if (!textoBusqueda) {
        return true;
      }

      return (
        producto.title
          .toLowerCase()
          .includes(textoBusqueda) ||
        producto.handle
          .toLowerCase()
          .includes(textoBusqueda) ||
        producto.description
          .toLowerCase()
          .includes(textoBusqueda)
      );
    });

  // =========================================================
  // FILTRO CATEGORÍA
  // =========================================================

  if (categoria) {
    productosFiltrados =
      productosFiltrados.filter((producto) => {
        if (!Array.isArray(producto.collections)) {
          return false;
        }

        return producto.collections.some(
          (collection) =>
            collection.handle === categoria
        );
      });
  }

  // =========================================================
  // CATEGORÍA ACTUAL
  // =========================================================

  const categoriaActual =
    categorias.find(
      (item) => item.handle === categoria
    )?.title || "Todos los productos";

  return (
    <main className="min-h-screen bg-[#F7F2EC]">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative h-[260px] w-full overflow-hidden sm:h-[300px] lg:h-[340px]">

        <Image
          src="/images/banner/catalogo.jpg"
          alt="Catálogo de productos"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* OSCURECER IMAGEN */}

        <div className="absolute inset-0 bg-black/50" />

        {/* DEGRADADO */}

        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />

        {/* CONTENIDO */}

        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-5 sm:px-6 lg:px-8">

          <div className="max-w-3xl text-white">

            {/* VOLVER */}

            <Link
              href="/"
              className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#2C241C] shadow-md transition hover:bg-[#A36A33] hover:text-white"
            >
              ← Volver al inicio
            </Link>

            {/* TÍTULO */}

            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Catálogo
            </h1>

            {/* LÍNEA */}

            <div className="mt-3 h-1 w-14 rounded-full bg-[#A36A33]" />

            {/* DESCRIPCIÓN */}

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
              Explora nuestra colección de productos y
              encuentra el diseño ideal para tu espacio.
            </p>

            {/* BENEFICIOS */}

            <div className="mt-5 hidden flex-wrap gap-6 sm:flex">

              <div className="flex items-center gap-2.5">

                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#A36A33] text-[#D9A066]">
                  ✓
                </div>

                <div>
                  <p className="text-xs font-semibold">
                    Materiales de calidad
                  </p>

                  <p className="text-[11px] text-white/70">
                    Duraderos y resistentes
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-2.5">

                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#A36A33] text-[#D9A066]">
                  ◇
                </div>

                <div>
                  <p className="text-xs font-semibold">
                    Diseño a medida
                  </p>

                  <p className="text-[11px] text-white/70">
                    Adaptado a tu espacio
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-2.5">

                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#A36A33] text-[#D9A066]">
                  →
                </div>

                <div>
                  <p className="text-xs font-semibold">
                    Envíos rápidos
                  </p>

                  <p className="text-[11px] text-white/70">
                    A toda España
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          FILTROS
      ===================================================== */}

      <section className="bg-[#F7F2EC]">

        <div className="mx-auto max-w-7xl px-5 py-7 sm:px-6 lg:px-8 lg:py-9">

          <form
            method="GET"
            action="/catalogo"
            className="grid grid-cols-1 gap-5 lg:grid-cols-[0.85fr_1.5fr]"
          >

            {/* =================================================
                CATEGORÍAS
            ================================================= */}

            <div>

              <label
                htmlFor="categoria"
                className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#A36A33]"
              >
                Categorías
              </label>

              <div className="relative">

                <select
                  id="categoria"
                  name="categoria"
                  defaultValue={categoria}
                  className="h-[68px] w-full appearance-none rounded-2xl border border-[#E4DDD5] bg-white px-5 pr-12 text-base font-semibold text-[#2C241C] shadow-sm outline-none transition hover:border-[#CDBAA6] focus:border-[#A36A33] focus:ring-2 focus:ring-[#A36A33]/20"
                >

                  <option value="">
                    Todos los productos
                  </option>

                  {categorias.map((item) => (
                    <option
                      key={item.handle}
                      value={item.handle}
                    >
                      {item.title}
                    </option>
                  ))}

                </select>

                <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-xl text-[#2C241C]">
                  ⌄
                </span>

              </div>

            </div>

            {/* =================================================
                BUSCADOR
            ================================================= */}

            <div>

              <label
                htmlFor="buscar"
                className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#2C241C]"
              >
                Buscar producto
              </label>

              <div className="relative">

                {/* ICONO */}

                <div className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#9AA1AC]">

                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle
                      cx="11"
                      cy="11"
                      r="7"
                    />

                    <path d="m20 20-4-4" />
                  </svg>

                </div>

                <input
                  id="buscar"
                  type="text"
                  name="buscar"
                  defaultValue={buscar}
                  placeholder="Nombre, SKU o descripción..."
                  className="h-[68px] w-full rounded-2xl border border-[#E4DDD5] bg-white pl-14 pr-20 text-base text-[#2C241C] shadow-sm outline-none transition placeholder:text-[#A0A6B0] hover:border-[#CDBAA6] focus:border-[#A36A33] focus:ring-2 focus:ring-[#A36A33]/20"
                />

                {/* BOTÓN */}

                <button
                  type="submit"
                  aria-label="Buscar producto"
                  className="absolute right-2 top-2 flex h-14 w-14 items-center justify-center rounded-xl bg-[#A36A33] text-white shadow-sm transition hover:bg-[#7A4E24]"
                >

                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle
                      cx="11"
                      cy="11"
                      r="7"
                    />

                    <path d="m20 20-4-4" />
                  </svg>

                </button>

              </div>

            </div>

          </form>

          {/* INFORMACIÓN */}

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">

            <p className="text-sm text-gray-600">

              <span className="font-semibold text-[#2C241C]">
                {categoriaActual}
              </span>

              <span className="mx-2 text-gray-400">
                •
              </span>

              {productosFiltrados.length} productos encontrados

            </p>

            {(buscar || categoria) && (
              <Link
                href="/catalogo"
                className="text-sm font-semibold text-[#A36A33] hover:text-[#7A4E24] hover:underline"
              >
                Limpiar filtros
              </Link>
            )}

          </div>

        </div>

      </section>

      {/* =====================================================
          PRODUCTOS
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-6 lg:px-8">

        {/* TÍTULO */}

        <div className="mb-7 border-t border-[#E9E2D9] pt-8">

          <h2 className="text-3xl font-bold tracking-tight text-[#2C241C] sm:text-4xl">
            {categoriaActual}
          </h2>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            {productosFiltrados.length} productos encontrados
          </p>

        </div>

        {/* =================================================
            GRID PRODUCTOS
        ================================================= */}

        {productosFiltrados.length > 0 ? (

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">

            {productosFiltrados.map((producto) => (

              <CatalogoCard
                key={producto.id}
                nombre={producto.title}
                referencia={producto.handle}
                descripcion={producto.description}
                imagen={
                  producto.featuredImage?.url || null
                }
                precio={
                  producto.priceRange
                    .minVariantPrice.amount
                }
                moneda={
                  producto.priceRange
                    .minVariantPrice.currencyCode
                }
                disponible={
                  producto.availableForSale
                }
                handle={producto.handle}
                variants={
                  producto.variants
                }
              />

            ))}

          </div>

        ) : (

          <div className="rounded-3xl border border-[#E9E2D9] bg-white px-6 py-16 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F7F2EC] text-2xl">
              🔍
            </div>

            <h3 className="mt-5 text-2xl font-bold text-[#2C241C]">
              No encontramos productos
            </h3>

            <p className="mx-auto mt-2 max-w-md text-gray-500">
              Prueba con otro término de búsqueda o
              selecciona otra categoría.
            </p>

            <Link
              href="/catalogo"
              className="mt-6 inline-flex rounded-xl bg-[#A36A33] px-6 py-3 font-semibold text-white transition hover:bg-[#7A4E24]"
            >
              Ver todos los productos
            </Link>

          </div>

        )}

      </section>

    </main>
  );
}