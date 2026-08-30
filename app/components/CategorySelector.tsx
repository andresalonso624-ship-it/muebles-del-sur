"use client";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import type { ChangeEvent } from "react";

/* ============================================================
   TIPO CATEGORÍA
   ============================================================ */

interface Category {
  handle: string;
  title: string;
}

/* ============================================================
   PROPS
   ============================================================ */

interface CategorySelectorProps {
  categorias: Category[];
  categoriaActual: string;
}

/* ============================================================
   COMPONENTE
   ============================================================ */

export default function CategorySelector({
  categorias,
  categoriaActual,
}: CategorySelectorProps) {

  const router = useRouter();

  const searchParams =
    useSearchParams();

  /* ==========================================================
     CAMBIAR CATEGORÍA
     ========================================================== */

  function cambiarCategoria(
    event: ChangeEvent<HTMLSelectElement>
  ) {

    const nuevaCategoria =
      event.target.value;

    const params =
      new URLSearchParams(
        searchParams.toString()
      );

    /* ------------------------------------------
       CATEGORÍA
       ------------------------------------------ */

    if (nuevaCategoria) {

      params.set(
        "categoria",
        nuevaCategoria
      );

    } else {

      params.delete(
        "categoria"
      );

    }

    /* ------------------------------------------
       QUITAR PAGINACIÓN
       ------------------------------------------ */

    params.delete("pagina");

    /* ------------------------------------------
       IR A LA NUEVA URL
       ------------------------------------------ */

    const query =
      params.toString();

    router.push(
      query
        ? `/catalogo?${query}`
        : "/catalogo"
    );
  }

  /* ==========================================================
     RENDER
     ========================================================== */

  return (

    <div
      className="
        relative
        overflow-hidden
        rounded-2xl
        border
        border-[#E2DDD7]
        bg-white
        shadow-sm
        transition
        hover:shadow-md
      "
    >

      {/* ================================================ */}
      {/* TEXTO SUPERIOR */}
      {/* ================================================ */}

      <div
        className="
          pointer-events-none
          absolute
          left-6
          top-3
          text-xs
          font-medium
          uppercase
          tracking-[0.18em]
          text-[#A36A33]
        "
      >
        Categorías
      </div>

      {/* ================================================ */}
      {/* SELECT */}
      {/* ================================================ */}

      <select
        value={categoriaActual}
        onChange={cambiarCategoria}
        className="
          h-[68px]
          w-full
          cursor-pointer
          appearance-none
          bg-transparent
          px-6
          pb-2
          pt-7
          pr-14
          text-lg
          font-bold
          text-[#171411]
          outline-none
        "
      >

        {/* TODOS */}

        <option value="">
          Todos los productos
        </option>

        {/* CATEGORÍAS SHOPIFY */}

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

      {/* ================================================ */}
      {/* FLECHA */}
      {/* ================================================ */}

      <div
        className="
          pointer-events-none
          absolute
          right-6
          top-1/2
          -translate-y-1/2
          text-[#171411]
        "
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

          <path d="m6 9 6 6 6-6" />

        </svg>

      </div>

    </div>
  );
}