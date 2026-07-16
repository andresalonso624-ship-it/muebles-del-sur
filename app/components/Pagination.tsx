"use client";

interface PaginationProps {
  paginaActual: number;
  totalPaginas: number;
  onChange: (pagina: number) => void;
}

export default function Pagination({
  paginaActual,
  totalPaginas,
  onChange,
}: PaginationProps) {
  const paginas: number[] = [];

  for (let i = 1; i <= totalPaginas; i++) {
    if (
      i === 1 ||
      i === totalPaginas ||
      (i >= paginaActual - 1 && i <= paginaActual + 1)
    ) {
      paginas.push(i);
    }
  }

  return (
    <div className="mt-12 flex flex-wrap items-center justify-center gap-2 lg:mt-20">

      {/* Anterior */}

      <button
        onClick={() => onChange(paginaActual - 1)}
        disabled={paginaActual === 1}
        className={`flex h-11 w-11 items-center justify-center rounded-xl font-bold transition lg:h-12 lg:w-12 ${
          paginaActual === 1
            ? "cursor-not-allowed bg-gray-200 text-gray-400"
            : "bg-white shadow hover:bg-[#A36A33] hover:text-white"
        }`}
      >
        ←
      </button>

      {/* Números */}

      {paginas.map((pagina, index) => {
        const anterior = paginas[index - 1];

        return (
          <div key={pagina} className="flex items-center gap-2">

            {anterior && pagina - anterior > 1 && (
              <span className="px-1 text-gray-400">…</span>
            )}

            <button
              onClick={() => onChange(pagina)}
              className={`flex h-11 w-11 items-center justify-center rounded-xl font-bold transition lg:h-12 lg:w-12 ${
                paginaActual === pagina
                  ? "bg-[#A36A33] text-white shadow-lg"
                  : "bg-white shadow hover:bg-[#EFE6DD]"
              }`}
            >
              {pagina}
            </button>

          </div>
        );
      })}

      {/* Siguiente */}

      <button
        onClick={() => onChange(paginaActual + 1)}
        disabled={paginaActual === totalPaginas}
        className={`flex h-11 w-11 items-center justify-center rounded-xl font-bold transition lg:h-12 lg:w-12 ${
          paginaActual === totalPaginas
            ? "cursor-not-allowed bg-gray-200 text-gray-400"
            : "bg-white shadow hover:bg-[#A36A33] hover:text-white"
        }`}
      >
        →
      </button>

    </div>
  );
}