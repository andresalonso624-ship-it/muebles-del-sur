import Link from "next/link";
import Image from "next/image";
import { getShopifyCollections } from "../lib/shopify-products";

export const revalidate = 3600;

export default async function CatalogoPage() {
  const colecciones = await getShopifyCollections();

  return (
    <main className="min-h-screen bg-[#FCFAF7]">

      {/* =====================================================
          HERO DEL CATÁLOGO
      ===================================================== */}
      <section className="relative h-[430px] w-full overflow-hidden md:h-[350px]">

        {/* IMAGEN DE FONDO */}
        <Image
          src="/images/catalogo.jpg"
          alt="Catálogo de productos Estanterías MSC"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* OSCURECIMIENTO */}
        <div className="absolute inset-0 bg-black/50" />

        {/* DEGRADADO LATERAL */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-black/10" />

        {/* CONTENIDO */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 lg:px-8">

          <div className="max-w-4xl">

            {/* LÍNEA DORADA */}
            <div className="mb-8 h-[4px] w-14 bg-[#D89A24] md:w-20" />

            {/* TÍTULO */}
            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
              Nuestro{" "}
              <span className="text-[#D89A24]">
                catálogo.
              </span>
            </h1>

            {/* SEGUNDA LÍNEA */}
            <div className="mt-8 h-[4px] w-20 bg-[#D89A24] md:w-24" />

            {/* DESCRIPCIÓN */}
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/90 md:text-xl">
              Descubre nuestra selección de productos para tiendas,
              comercios, oficinas y espacios profesionales.
            </p>

          </div>

        </div>
      </section>


      {/* =====================================================
          CATEGORÍAS
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 md:py-20">

        {/* CABECERA */}
        <div className="mb-8">

          <p className="mb-0 text-sm font-medium uppercase tracking-[0.2em] text-[#A36A33]">
            
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-[#2C241C] md:text-4xl">
            Categorías
          </h2>

          <p className="mt-3 max-w-2xl text-lg leading-7 text-[#6B6259]">
            
          </p>

        </div>


        {/* =====================================================
            CATEGORÍAS SHOPIFY
        ===================================================== */}
        {colecciones.length === 0 ? (

          <div className="rounded-2xl border border-[#E9E2D9] bg-white p-10 text-center">

            <h3 className="text-xl font-semibold text-[#2C241C]">
              No hay categorías disponibles
            </h3>

            <p className="mt-3 text-[#6B6259]">
              No se encontraron colecciones disponibles en Shopify.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {colecciones.map((coleccion) => (

              <Link
                key={coleccion.id}
                href={`/catalogo/${coleccion.handle}`}
                className="group relative overflow-hidden rounded-2xl border border-[#E9E2D9] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#A36A33] hover:shadow-xl"
              >

                {/* LÍNEA SUPERIOR */}
                <div className="mb-6 h-[3px] w-10 bg-[#D89A24] transition-all duration-300 group-hover:w-16" />

                {/* NOMBRE */}
                <div className="flex items-start justify-between gap-5">

                  <h3 className="text-xl font-semibold leading-tight text-[#2C241C] transition-colors duration-300 group-hover:text-[#A36A33] md:text-2xl">
                    {coleccion.title}
                  </h3>

                  <span className="mt-1 shrink-0 text-2xl text-[#A36A33] transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>

                </div>

                {/* DESCRIPCIÓN */}
                <p className="mt-4 text-sm leading-6 text-[#6B6259]">
                  Ver productos de{" "}
                  {coleccion.title.toLowerCase()}.
                </p>

              </Link>

            ))}

          </div>

        )}

      </section>

    </main>
  );
}