import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";

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
  // PRODUCTOS SHOPIFY
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

  // =========================================================
  // PÁGINA
  // =========================================================

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F7F2EC]">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="
          catalog-hero
          relative
          h-[385px]
          w-full
          overflow-hidden
          sm:h-[480px]
          lg:h-[420px]
        "
      >

        {/* =================================================
            IMAGEN
        ================================================= */}

        <Image
          src="/images/banner/catalogo.jpg"
          alt="Catálogo de muebles y productos"
          fill
          priority
          sizes="100vw"
          className="
            object-cover
            object-center
          "
        />

        {/* OSCURECER */}

        <div
          className="
            absolute
            inset-0
            bg-black/45
          "
        />

        {/* DEGRADADO INFERIOR */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-52
            bg-gradient-to-t
            from-black/75
            via-black/30
            to-transparent
          "
        />


        {/* =================================================
            BOTÓN VOLVER
            ALINEADO CON EL CONTENIDO
        ================================================= */}

        


        {/* =================================================
            CONTENIDO
        ================================================= */}

        <div
          className="
            relative
            z-10
            mx-auto
            flex
            h-full
            max-w-7xl
            items-start
            px-5
            pt-16
            pb-
            sm:items-end
            sm:px-6
            sm:pb-10
            sm:pt-0
            lg:px-8
            lg:pb-4
          "
        >

          <div
            className="
              w-full
              max-w-5xl
            "
          >

            {/* =================================================
                ETIQUETA
            ================================================= */}

            <div
              className="
                catalog-hero-label
                mb-3
                flex
                items-center
                gap-4
              "
            >

              <span
                className="
                  h-[3px]
                  w-0
                  rounded-full
                  bg-[#C6922F]
                "
              />

              <span
                className="
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.38em]
                  text-[#E1A65D]
                "
              >
                
              </span>

            </div>


            {/* =================================================
                TÍTULO
            ================================================= */}

            <h1
              className="
                catalog-hero-title
                max-w-4xl
                text-[38px]
                font-extrabold
                leading-[0.94]
                tracking-[-0.045em]
                text-white
                sm:text-[58px]
                lg:text-[70px]
                xl:text-[76px]
              "
            >

              Muebles que se adaptan

              <br />
              

              <span
                className="
                  catalog-hero-highlight
                  text-[#C6922F]
                "
              >
                a tu espacio.
              </span>

            </h1>


            {/* LÍNEA */}

            <div
              className="
                mt-4
                h-[3px]
                w-0
                rounded-full
                bg-[#C6922F]
              "
            />


            {/* =================================================
                DESCRIPCIÓN
            ================================================= */}

            <p
              className="
                catalog-hero-description
                mt-4
                max-w-[325px]
                text-[12.5px]
                leading-5
                text-white/90
                sm:max-w-2xl
                sm:text-[17px]
                sm:leading-7
              "
            >
              Descubre nuestra colección de productos
              diseñados para combinar funcionalidad,
              calidad y estilo en cada espacio.
            </p>


            {/* =================================================
                BENEFICIOS
            ================================================= */}

            <div
              className="
                catalog-benefits
                mt-6
                flex
                flex-wrap
                grid
                grid-cols-2
                gap-x-4
                gap-y-3
                sm:flex
                sm:flex-wrap
                sm:gap-x-8
                sm:gap-y-4
              "
            >

              {/* MATERIAL */}

              <div
                className="
                  catalog-benefit
                  flex
                  items-center
                  gap-2.5
                "
              >

                <div
                  className="
                    catalog-benefit-icon
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#C6922F]/70
                    bg-black/20
                    text-[#E1A65D]
                  "
                >

                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >

                    <path
                      d="
                        M12 3
                        l2.8 5.7
                        6.2.9
                        -4.5 4.4
                        1.1 6.2
                        L12 17.3
                        6.4 20.2
                        7.5 14
                        3 9.6
                        9.2 8.7
                        12 3
                      "
                    />

                  </svg>

                </div>

                <div>

                  <p
                    className="
                      catalog-benefit-title
                      text-xs
                      font-bold
                      text-white
                      sm:text-sm
                    "
                  >
                    Materiales de calidad
                  </p>

                  <p
                    className="
                      catalog-benefit-text
                      text-[11px]
                      text-white/65
                    "
                  >
                    Duraderos y resistentes
                  </p>

                </div>

              </div>


              {/* DISEÑO */}

              <div
                className="
                  catalog-benefit
                  flex
                  items-center
                  gap-2.5
                "
              >

                <div
                  className="
                    catalog-benefit-icon
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#C6922F]/70
                    bg-black/20
                    text-[#E1A65D]
                  "
                >

                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >

                    <path d="M4 20L16.5 7.5" />

                    <path d="M14 5l5 5" />

                    <path d="M6 18l2 2" />

                    <path d="M3 21l2-2" />

                  </svg>

                </div>

                <div>

                  <p
                    className="
                      catalog-benefit-title
                      text-xs
                      font-bold
                      text-white
                      sm:text-sm
                    "
                  >
                    Diseño a medida
                  </p>

                  <p
                    className="
                      catalog-benefit-text
                      text-[11px]
                      text-white/65
                    "
                  >
                    Adaptado a tu espacio
                  </p>

                </div>

              </div>


              {/* ENVÍOS */}

              

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FILTROS
      ===================================================== */}

      <section
        className="
          catalog-filters
          bg-[#F7F2EC]
        "
      >

        <div
          className="
            mx-auto
            max-w-7xl
            px-5
            py-7
            sm:px-6
            lg:px-8
            lg:py-8
          "
        >

          <form
            method="GET"
            action="/catalogo"
            className="
              grid
              grid-cols-1
              gap-4
              lg:grid-cols-[0.85fr_1.5fr]
            "
          >

            {/* =================================================
                CATEGORÍAS
            ================================================= */}

            <div>

              <label
                htmlFor="categoria"
                className="
                  mb-2
                  block
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-[#A36A33]
                "
              >
                Categorías
              </label>

              <div className="relative">

                <select
                  id="categoria"
                  name="categoria"
                  defaultValue={categoria}
                  className="
                    h-[62px]
                    w-full
                    appearance-none
                    rounded-2xl
                    border
                    border-[#E4DDD5]
                    bg-white
                    px-5
                    pr-12
                    text-base
                    font-semibold
                    text-[#2C241C]
                    shadow-sm
                    outline-none
                    transition
                    hover:border-[#CDBAA6]
                    focus:border-[#A36A33]
                    focus:ring-2
                    focus:ring-[#A36A33]/20
                  "
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

                <span
                  className="
                    pointer-events-none
                    absolute
                    right-5
                    top-1/2
                    -translate-y-1/2
                    text-xl
                    text-[#2C241C]
                  "
                >
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
                className="
                  mb-2
                  block
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-[#2C241C]
                "
              >
                Buscar producto
              </label>

              <div className="relative">

                <div
                  className="
                    pointer-events-none
                    absolute
                    left-5
                    top-1/2
                    -translate-y-1/2
                    text-[#9AA1AC]
                  "
                >

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
                  className="
                    h-[62px]
                    w-full
                    rounded-2xl
                    border
                    border-[#E4DDD5]
                    bg-white
                    pl-14
                    pr-20
                    text-base
                    text-[#2C241C]
                    shadow-sm
                    outline-none
                    transition
                    placeholder:text-[#A0A6B0]
                    hover:border-[#CDBAA6]
                    focus:border-[#A36A33]
                    focus:ring-2
                    focus:ring-[#A36A33]/20
                  "
                />


                {/* BOTÓN BUSCAR */}

                <button
                  type="submit"
                  aria-label="Buscar producto"
                  className="
                    absolute
                    right-2
                    top-2
                    flex
                    h-[46px]
                    w-[46px]
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#A36A33]
                    text-white
                    shadow-sm
                    transition
                    hover:bg-[#7A4E24]
                  "
                >

                  <svg
                    width="19"
                    height="19"
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


          {/* =================================================
              INFORMACIÓN
          ================================================= */}

          <div
            className="
              mt-4
              flex
              flex-wrap
              items-center
              justify-between
              gap-3
            "
          >

            <p
              className="
                text-sm
                text-gray-600
              "
            >

              <span
                className="
                  font-semibold
                  text-[#2C241C]
                "
              >
                {categoriaActual}
              </span>

              <span
                className="
                  mx-2
                  text-gray-400
                "
              >
                •
              </span>

              {productosFiltrados.length} productos encontrados

            </p>


            {(buscar || categoria) && (

              <Link
                href="/catalogo"
                className="
                  text-sm
                  font-semibold
                  text-[#A36A33]
                  hover:text-[#7A4E24]
                  hover:underline
                "
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

      <section
        className="
          catalog-products
          mx-auto
          max-w-7xl
          px-4
          pb-12
          sm:px-6
          lg:px-8
        "
      >

        {/* =================================================
            ENCABEZADO PRODUCTOS
        ================================================= */}

        <div
          className="
            catalog-products-header
            mb-6
            border-t
            border-[#E9E2D9]
            pt-7
          "
        >

          <h2
            className="
              text-3xl
              font-extrabold
              tracking-[-0.035em]
              text-[#2C241C]
              sm:text-4xl
            "
          >
            {categoriaActual}
          </h2>

          <p
            className="
              mt-1.5
              text-sm
              text-gray-500
              sm:text-base
            "
          >
            {productosFiltrados.length} productos encontrados
          </p>

        </div>


        {/* =================================================
            GRID PRODUCTOS
        ================================================= */}

        {productosFiltrados.length > 0 ? (

          <div
            className="
              catalog-products-grid
              grid
              grid-cols-2
              gap-3
              sm:grid-cols-2
              sm:gap-5
              lg:grid-cols-4
              lg:gap-6
            "
          >

            {productosFiltrados.map((producto) => (

              <CatalogoCard
                key={producto.id}

                nombre={
                  producto.title
                }

                referencia={
                  producto.handle
                }

                descripcion={
                  producto.description
                }

                imagen={
                  producto.featuredImage?.url ||
                  null
                }

                imagenes={
                  producto.images?.map(
                    (image) => image.url
                  ) ?? []
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

                handle={
                  producto.handle
                }

                variants={
                  producto.variants
                }
              />

            ))}

          </div>

        ) : (

          /* =================================================
             SIN PRODUCTOS
          ================================================= */

          <div
            className="
              rounded-3xl
              border
              border-[#E9E2D9]
              bg-white
              px-6
              py-16
              text-center
              shadow-sm
            "
          >

            <div
              className="
                mx-auto
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-full
                bg-[#F7F2EC]
                text-2xl
              "
            >
              🔍
            </div>


            <h3
              className="
                mt-5
                text-2xl
                font-bold
                text-[#2C241C]
              "
            >
              No encontramos productos
            </h3>


            <p
              className="
                mx-auto
                mt-2
                max-w-md
                text-gray-500
              "
            >
              Prueba con otro término de búsqueda
              o selecciona otra categoría.
            </p>


            <Link
              href="/catalogo"
              className="
                mt-6
                inline-flex
                rounded-xl
                bg-[#A36A33]
                px-6
                py-3
                font-semibold
                text-white
                transition
                hover:bg-[#7A4E24]
              "
            >
              Ver todos los productos
            </Link>

          </div>

        )}

      </section>

      </main>
    </>
  );
}