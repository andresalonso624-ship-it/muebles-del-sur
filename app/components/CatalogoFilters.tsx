"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";

interface Categoria {
  title: string;
  handle: string;
}

interface CatalogoFiltersProps {
  categoria: string;
  buscar: string;
  categorias: Categoria[];
}

export default function CatalogoFilters({
  categoria,
  buscar,
  categorias,
}: CatalogoFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [texto, setTexto] = useState(buscar);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setTexto(buscar);
  }, [buscar]);

  useEffect(() => {
    const temporizador = setTimeout(() => {
      const params = new URLSearchParams();

      if (categoria) {
        params.set("categoria", categoria);
      }

      if (texto.trim()) {
        params.set("buscar", texto.trim());
      }

      const queryString = params.toString();

      const nuevaUrl = queryString
        ? `${pathname}?${queryString}`
        : pathname;

      const urlActual =
        window.location.pathname +
        window.location.search;

      if (nuevaUrl !== urlActual) {
        startTransition(() => {
          router.replace(nuevaUrl, {
            scroll: false,
          });
        });
      }
    }, 250);

    return () => clearTimeout(temporizador);
  }, [texto, categoria, pathname, router]);

  const cambiarCategoria = (
    nuevaCategoria: string
  ) => {
    const params = new URLSearchParams();

    if (nuevaCategoria) {
      params.set("categoria", nuevaCategoria);
    }

    if (texto.trim()) {
      params.set("buscar", texto.trim());
    }

    const queryString = params.toString();

    const nuevaUrl = queryString
      ? `${pathname}?${queryString}`
      : pathname;

    startTransition(() => {
      router.replace(nuevaUrl, {
        scroll: false,
      });
    });
  };

  const limpiarBusqueda = () => {
    setTexto("");
  };

  return (
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
      <div
        className="
          grid
          grid-cols-1
          gap-4
          lg:grid-cols-[0.85fr_1.5fr]
        "
      >
        {/* =====================================================
            CATEGORÍAS
        ===================================================== */}

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
              value={categoria}
              onChange={(event) =>
                cambiarCategoria(event.target.value)
              }
              className="
                h-[62px]
                w-full
                appearance-none
                rounded-2xl
                border
                border-[#E4DDD5]
                bg-white
                px-5
                pr-14
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

        {/* =====================================================
            BUSCADOR
        ===================================================== */}

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
            {/* LUPA */}

            <div
              className="
                pointer-events-none
                absolute
                left-5
                top-1/2
                z-10
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

            {/* INPUT */}

            <input
              id="buscar"
              type="text"
              value={texto}
              onChange={(event) =>
                setTexto(event.target.value)
              }
              placeholder="Nombre, SKU o descripción..."
              autoComplete="off"
              className="
                h-[62px]
                w-full
                rounded-2xl
                border
                border-[#E4DDD5]
                bg-white
                pl-14
                pr-14
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

            {/* X */}

            {texto && (
              <button
                type="button"
                onClick={limpiarBusqueda}
                aria-label="Borrar búsqueda"
                className="
                  absolute
                  right-3
                  top-1/2
                  flex
                  h-10
                  w-10
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  text-[#6B625A]
                  transition
                  hover:bg-[#F1EBE4]
                  hover:text-[#2C241C]
                  active:scale-95
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
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </svg>
              </button>
            )}

            {/* CARGANDO */}

            {isPending && !texto && (
              <div
                className="
                  pointer-events-none
                  absolute
                  right-5
                  top-1/2
                  h-4
                  w-4
                  -translate-y-1/2
                  animate-spin
                  rounded-full
                  border-2
                  border-[#D8CFC5]
                  border-t-[#A36A33]
                "
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}