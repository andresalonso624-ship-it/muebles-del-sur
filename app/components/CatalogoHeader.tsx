"use client";

import Image from "next/image";
import Link from "next/link";

interface CatalogoHeaderProps {
  buscar: string;
  categoriaActual: string;
  categorias: {
    title: string;
    handle: string;
  }[];
}

export default function CatalogoHeader({
  buscar,
  categoriaActual,
  categorias,
}: CatalogoHeaderProps) {
  return (
    <>
      {/* =====================================================
          ENCABEZADO DEL CATÁLOGO
      ===================================================== */}

      <section className="relative overflow-hidden">

        {/* IMAGEN DE FONDO */}

        <div className="relative h-[300px] sm:h-[340px] lg:h-[390px]">

          <Image
            src="/images/banner/catalogo.jpg"
            alt="Catálogo de productos"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          {/* OSCURECIMIENTO */}

          <div className="absolute inset-0 bg-black/45" />

          {/* DEGRADADO INFERIOR */}

          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />

          {/* CONTENIDO */}

          <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-5 sm:px-6 lg:px-8">

            <div className="max-w-3xl">

              {/* VOLVER */}

              <Link
                href="/"
                className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#2C241C] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A36A33] hover:text-white sm:px-6 sm:py-3"
              >
                ← Volver al inicio
              </Link>

              {/* TITULO */}

              <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:mt-7 lg:text-6xl">
                Catálogo
              </h1>

              {/* LINEA DECORATIVA */}

              <div className="mt-4 h-1 w-12 rounded-full bg-[#C58A4A]" />

              {/* DESCRIPCIÓN */}

              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/90 sm:text-base lg:text-lg">
                Explora nuestra colección de productos y encuentra el diseño
                ideal para tu espacio.
              </p>

              {/* CARACTERÍSTICAS */}

              <div className="mt-5 hidden items-center gap-6 text-xs text-white/90 sm:flex">

                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#C58A4A]/60 text-[#C58A4A]">
                    ✓
                  </span>

                  <div>
                    <p className="font-semibold text-white">
                      Materiales de calidad
                    </p>

                    <p className="text-white/70">
                      Duraderos y resistentes
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#C58A4A]/60 text-[#C58A4A]">
                    ◇
                  </span>

                  <div>
                    <p className="font-semibold text-white">
                      Diseño a medida
                    </p>

                    <p className="text-white/70">
                      Adaptado a tu espacio
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#C58A4A]/60 text-[#C58A4A]">
                    →
                  </span>

                  <div>
                    <p className="font-semibold text-white">
                      Envíos rápidos
                    </p>

                    <p className="text-white/70">
                      A toda España
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

      </section>

      {/* =====================================================
          CATEGORÍAS + BUSCADOR
      ===================================================== */}

      <section className="bg-[#F7F2EC]">

        <div className="mx-auto max-w-7xl px-5 py-7 sm:px-6 lg:px-8 lg:py-9">

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

            {/* =================================================
                CATEGORÍAS
            ================================================= */}

            <div>

              <p className="mb-2 text-sm font-semibold text-[#2C241C]">
                Categorías
              </p>

              <div className="relative">

                <select
                  value={categoriaActual}
                  onChange={(e) => {
                    const handle = e.target.value;

                    if (handle) {
                      window.location.href = `/catalogo/${handle}`;
                    } else {
                      window.location.href = "/catalogo";
                    }
                  }}
                  className="h-[70px] w-full appearance-none rounded-2xl border border-[#E4DDD5] bg-white px-6 pr-14 text-base font-semibold text-[#2C241C] shadow-sm outline-none transition-all focus:border-[#A36A33] focus:ring-2 focus:ring-[#A36A33]/20"
                >

                  <option value="">
                    Todos los productos
                  </option>

                  {categorias.map((categoria) => (
                    <option
                      key={categoria.handle}
                      value={categoria.handle}
                    >
                      {categoria.title}
                    </option>
                  ))}

                </select>

                {/* FLECHA */}

                <div className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-xl text-[#2C241C]">
                 ⌄
                </div>

                {/* ETIQUETA */}

                <div className="pointer-events-none absolute left-6 top-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#A36A33]">
                  Categorías
                </div>

              </div>

            </div>

            {/* =================================================
                BUSCADOR
            ================================================= */}

            <div>

              <p className="mb-2 text-sm font-semibold text-[#2C241C]">
                Buscar producto
              </p>

              <form
                method="GET"
                action="/catalogo"
                className="relative"
              >

                {/* ICONO */}

                <div className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 text-[#98A0AC]">

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-4-4" />
                  </svg>

                </div>

                <input
                  type="text"
                  name="buscar"
                  defaultValue={buscar}
                  placeholder="Nombre, SKU o descripción..."
                  className="h-[70px] w-full rounded-2xl border border-[#E4DDD5] bg-white pl-14 pr-20 text-base text-[#2C241C] shadow-sm outline-none placeholder:text-[#9AA1AD] transition-all focus:border-[#A36A33] focus:ring-2 focus:ring-[#A36A33]/20"
                />

                {/* BOTÓN */}

                <button
                  type="submit"
                  aria-label="Buscar"
                  className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-xl bg-[#A36A33] text-white transition-all hover:bg-[#7A4E24]"
                >

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-4-4" />
                  </svg>

                </button>

              </form>

            </div>

          </div>

        </div>

      </section>
    </>
  );
}