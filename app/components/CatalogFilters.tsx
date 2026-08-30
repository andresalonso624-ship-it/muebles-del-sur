"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface Categoria {
  title: string;
  handle: string;
}

interface CatalogFiltersProps {
  categorias: Categoria[];
}

export default function CatalogFilters({
  categorias,
}: CatalogFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoriaActual =
    searchParams.get("categoria") || "";

  const buscarActual =
    searchParams.get("buscar") || "";

  const ordenActual =
    searchParams.get("orden") || "";

  const [buscar, setBuscar] =
    useState(buscarActual);

  const cambiarCategoria = (
    categoria: string
  ) => {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (categoria) {
      params.set("categoria", categoria);
    } else {
      params.delete("categoria");
    }

    params.delete("pagina");

    router.push(
      `/catalogo?${params.toString()}`
    );
  };

  const realizarBusqueda = (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (buscar.trim()) {
      params.set(
        "buscar",
        buscar.trim()
      );
    } else {
      params.delete("buscar");
    }

    params.delete("pagina");

    router.push(
      `/catalogo?${params.toString()}`
    );
  };

  const cambiarOrden = (
    orden: string
  ) => {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (orden) {
      params.set("orden", orden);
    } else {
      params.delete("orden");
    }

    params.delete("pagina");

    router.push(
      `/catalogo?${params.toString()}`
    );
  };

  return (
    <section className="border-b border-[#E9E2D9] bg-[#F7F2EC]">
      <div className="mx-auto max-w-[900px] px-4 py-5 sm:px-5 lg:py-6">

        {/* FILA PRINCIPAL */}

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[240px_1fr]">

          {/* CATEGORÍAS */}

          <div>
            <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A36A33]">
              Categorías
            </p>

            <div className="relative">

              <select
                value={categoriaActual}
                onChange={(event) =>
                  cambiarCategoria(
                    event.target.value
                  )
                }
                className="h-[58px] w-full appearance-none rounded-xl border border-[#E4DED6] bg-white px-4 pr-10 text-sm font-semibold text-[#2C241C] shadow-sm outline-none transition focus:border-[#A36A33] focus:ring-2 focus:ring-[#A36A33]/20"
              >

                <option value="">
                  Todos los productos
                </option>

                {categorias.map(
                  (categoria) => (
                    <option
                      key={categoria.handle}
                      value={categoria.handle}
                    >
                      {categoria.title}
                    </option>
                  )
                )}

              </select>

              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-lg text-[#2C241C]">
               ⌄
              </span>

            </div>

          </div>

          {/* BUSCADOR */}

          <form
            onSubmit={realizarBusqueda}
          >
            <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2C241C]">
              Buscar producto
            </p>

            <div className="relative">

              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl text-[#9AA1AE]">
                ⌕
              </span>

              <input
                type="text"
                value={buscar}
                onChange={(event) =>
                  setBuscar(
                    event.target.value
                  )
                }
                placeholder="Nombre, SKU o descripción..."
                className="h-[58px] w-full rounded-xl border border-[#E4DED6] bg-white px-12 pr-16 text-sm text-[#2C241C] shadow-sm outline-none transition placeholder:text-[#9AA1AE] focus:border-[#A36A33] focus:ring-2 focus:ring-[#A36A33]/20"
              />

              <button
                type="submit"
                aria-label="Buscar"
                className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg bg-[#A36A33] text-white transition hover:bg-[#7A4E24]"
              >
                ⌕
              </button>

            </div>
          </form>

        </div>

        {/* FILTROS */}

        <div className="mt-3 flex flex-wrap gap-2">

          <button
            type="button"
            onClick={() =>
              cambiarOrden("ventas")
            }
            className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
              ordenActual === "ventas"
                ? "border-[#A36A33] bg-[#FDF3E8] text-[#A36A33]"
                : "border-[#E4DED6] bg-white text-[#514A43] hover:border-[#A36A33]"
            }`}
          >
            ↗ Más vendidos
          </button>

          <button
            type="button"
            onClick={() =>
              cambiarOrden("precio-asc")
            }
            className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
              ordenActual === "precio-asc"
                ? "border-[#A36A33] bg-[#FDF3E8] text-[#A36A33]"
                : "border-[#E4DED6] bg-white text-[#514A43] hover:border-[#A36A33]"
            }`}
          >
            ↕ Precio: menor a mayor
          </button>

          <button
            type="button"
            onClick={() =>
              cambiarOrden("precio-desc")
            }
            className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
              ordenActual === "precio-desc"
                ? "border-[#A36A33] bg-[#FDF3E8] text-[#A36A33]"
                : "border-[#E4DED6] bg-white text-[#514A43] hover:border-[#A36A33]"
            }`}
          >
            ↕ Precio: mayor a menor
          </button>

          <button
            type="button"
            className="rounded-full border border-[#E4DED6] bg-white px-4 py-2 text-xs font-semibold text-[#514A43] transition hover:border-[#A36A33]"
          >
            ⚱ Filtros
          </button>

        </div>

        {/* CATEGORÍA ACTUAL */}

        {categoriaActual && (
          <div className="mt-3 rounded-xl border border-[#E9D5BC] bg-[#FFF6EA] px-4 py-3 text-xs text-[#76512E]">

            Mostrando productos de la categoría{" "}

            <strong>
              {categorias.find(
                (categoria) =>
                  categoria.handle ===
                  categoriaActual
              )?.title ||
                categoriaActual}
            </strong>

          </div>
        )}

      </div>
    </section>
  );
}