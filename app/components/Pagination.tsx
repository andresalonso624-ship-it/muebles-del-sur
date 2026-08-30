"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  paginaActual: number;
  totalPaginas: number;
}

export default function Pagination({
  paginaActual,
  totalPaginas,
}: PaginationProps) {

  const router = useRouter();

  const searchParams =
    useSearchParams();

  const cambiarPagina = (
    pagina: number
  ) => {

    if (
      pagina < 1 ||
      pagina > totalPaginas
    ) {
      return;
    }

    const params =
      new URLSearchParams(
        searchParams.toString()
      );

    params.set(
      "pagina",
      String(pagina)
    );

    router.push(
      `/catalogo?${params.toString()}`
    );
  };

  const paginas: number[] = [];

  for (
    let i = 1;
    i <= totalPaginas;
    i++
  ) {

    if (
      i === 1 ||
      i === totalPaginas ||
      (
        i >= paginaActual - 1 &&
        i <= paginaActual + 1
      )
    ) {
      paginas.push(i);
    }
  }

  return (
    <div
      className="
        mt-10
        flex
        flex-wrap
        items-center
        justify-center
        gap-2
        lg:mt-14
      "
    >

      {/* ================================================== */}
      {/* ANTERIOR */}
      {/* ================================================== */}

      <button
        type="button"
        onClick={() =>
          cambiarPagina(
            paginaActual - 1
          )
        }
        disabled={
          paginaActual === 1
        }
        className={`
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          text-sm
          font-bold
          transition
          ${
            paginaActual === 1
              ? `
                cursor-not-allowed
                bg-gray-200
                text-gray-400
              `
              : `
                bg-white
                shadow-sm
                hover:bg-[#A36A33]
                hover:text-white
              `
          }
        `}
      >
        ←
      </button>

      {/* ================================================== */}
      {/* NÚMEROS */}
      {/* ================================================== */}

      {paginas.map(
        (pagina, index) => {

          const anterior =
            paginas[index - 1];

          return (
            <div
              key={pagina}
              className="
                flex
                items-center
                gap-2
              "
            >

              {anterior &&
                pagina - anterior > 1 && (
                  <span
                    className="
                      px-1
                      text-gray-400
                    "
                  >
                    …
                  </span>
                )}

              <button
                type="button"
                onClick={() =>
                  cambiarPagina(
                    pagina
                  )
                }
                className={`
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  text-sm
                  font-bold
                  transition
                  ${
                    paginaActual ===
                    pagina
                      ? `
                        bg-[#A36A33]
                        text-white
                        shadow-lg
                      `
                      : `
                        bg-white
                        shadow-sm
                        hover:bg-[#EFE6DD]
                      `
                  }
                `}
              >
                {pagina}
              </button>

            </div>
          );
        }
      )}

      {/* ================================================== */}
      {/* SIGUIENTE */}
      {/* ================================================== */}

      <button
        type="button"
        onClick={() =>
          cambiarPagina(
            paginaActual + 1
          )
        }
        disabled={
          paginaActual ===
          totalPaginas
        }
        className={`
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          text-sm
          font-bold
          transition
          ${
            paginaActual ===
            totalPaginas
              ? `
                cursor-not-allowed
                bg-gray-200
                text-gray-400
              `
              : `
                bg-white
                shadow-sm
                hover:bg-[#A36A33]
                hover:text-white
              `
          }
        `}
      >
        →
      </button>

    </div>
  );
}