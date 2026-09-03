"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Categoria {
  title: string;
  handle: string;
}

interface CategorySelectorProps {
  categorias: Categoria[];
  categoriaActual: string;
}

export default function CategorySelector({
  categorias,
  categoriaActual,
}: CategorySelectorProps) {
  const [abierto, setAbierto] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cerrar = (event: MouseEvent) => {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(
          event.target as Node
        )
      ) {
        setAbierto(false);
      }
    };

    document.addEventListener("mousedown", cerrar);

    return () => {
      document.removeEventListener(
        "mousedown",
        cerrar
      );
    };
  }, []);

  const seleccionarCategoria = (
    handle: string
  ) => {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (handle) {
      params.set("categoria", handle);
    } else {
      params.delete("categoria");
    }

    const query = params.toString();

    router.push(
      query
        ? `${pathname}?${query}`
        : pathname,
      {
        scroll: false,
      }
    );

    setAbierto(false);
  };

  return (
    <div
      ref={selectorRef}
      className="relative w-full"
    >
      {/* =====================================================
          BOTÓN DE CATEGORÍA
      ===================================================== */}

      <button
        type="button"
        onClick={() =>
          setAbierto((valor) => !valor)
        }
        className="
          flex
          h-[76px]
          w-full
          items-center
          justify-between
          rounded-[20px]
          border
          border-[#DDD7D0]
          bg-white
          px-6
          text-left
          shadow-[0_2px_5px_rgba(0,0,0,0.10)]
          transition-all
          duration-200
          hover:border-[#B98245]
        "
      >
        <span
          className="
            truncate
            text-[19px]
            font-semibold
            text-[#111111]
            sm:text-[20px]
          "
        >
          {categoriaActual}
        </span>

        <span
          className={`
            ml-4
            flex
            shrink-0
            items-center
            justify-center
            text-[#B87924]
            transition-transform
            duration-200
            ${
              abierto
                ? "rotate-180"
                : ""
            }
          `}
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
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      {/* =====================================================
          LISTA DE CATEGORÍAS
      ===================================================== */}

      {abierto && (
        <div
          className="
            absolute
            left-0
            right-0
            top-[84px]
            z-[999]
            rounded-[18px]
            border
            border-[#E0DAD3]
            bg-white
            p-3
            shadow-[0_12px_30px_rgba(0,0,0,0.15)]
          "
        >
          <div
            className="
              max-h-[390px]
              overflow-y-auto
              overscroll-contain
              pr-1

              [&::-webkit-scrollbar]:w-[9px]
              [&::-webkit-scrollbar-track]:rounded-full
              [&::-webkit-scrollbar-track]:bg-[#F1EFEC]
              [&::-webkit-scrollbar-thumb]:rounded-full
              [&::-webkit-scrollbar-thumb]:bg-[#999999]
              [&::-webkit-scrollbar-thumb:hover]:bg-[#777777]
            "
          >
            {/* TODOS LOS PRODUCTOS */}

            <button
              type="button"
              onClick={() =>
                seleccionarCategoria("")
              }
              className={`
                flex
                min-h-[56px]
                w-full
                items-center
                rounded-[14px]
                px-5
                text-left
                text-[17px]
                transition-colors
                ${
                  categoriaActual ===
                  "Todos los productos"
                    ? "bg-[#F6F0E7] font-semibold text-[#B87924]"
                    : "font-medium text-[#222222] hover:bg-[#F8F6F3]"
                }
              `}
            >
              Todos los productos

              {categoriaActual ===
                "Todos los productos" && (
                <span
                  className="
                    ml-auto
                    text-[20px]
                    text-[#B87924]
                  "
                >
                  ✓
                </span>
              )}
            </button>

            {/* CATEGORÍAS */}

            {categorias.map(
              (categoria) => {
                const seleccionada =
                  categoriaActual ===
                  categoria.title;

                return (
                  <button
                    key={categoria.handle}
                    type="button"
                    onClick={() =>
                      seleccionarCategoria(
                        categoria.handle
                      )
                    }
                    className={`
                      flex
                      min-h-[58px]
                      w-full
                      items-center
                      rounded-[14px]
                      px-5
                      text-left
                      text-[16px]
                      font-bold
                      uppercase
                      tracking-[0.01em]
                      transition-all
                      duration-150
                      ${
                        seleccionada
                          ? "bg-[#F6F0E7] text-[#B87924]"
                          : "text-[#111111] hover:bg-[#F8F6F3] hover:text-[#B87924]"
                      }
                    `}
                  >
                    <span className="truncate">
                      {categoria.title}
                    </span>

                    {seleccionada && (
                      <span
                        className="
                          ml-auto
                          shrink-0
                          text-[20px]
                          text-[#B87924]
                        "
                      >
                        ✓
                      </span>
                    )}
                  </button>
                );
              }
            )}
          </div>
        </div>
      )}
    </div>
  );
}