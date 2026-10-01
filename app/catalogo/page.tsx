import Link from "next/link";

const categorias = [
  {
    nombre: "Percheros",
    slug: "percheros",
  },
  {
    nombre: "Lamas",
    slug: "lamas",
  },
  {
    nombre: "Ganchos cremallera",
    slug: "ganchos-cremallera",
  },
  {
    nombre: "Mesas de centro",
    slug: "mesas-de-centro",
  },
  {
    nombre: "Mostradores",
    slug: "mostradores",
  },
];

export default function CatalogoPage() {
  return (
    <main className="min-h-screen bg-[#FCFAF7]">
      {/* CABECERA */}
      <section className="border-b border-[#E9E2D9] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#A36A33]">
            Estanterías MSC
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-[#2C241C] md:text-5xl">
            Catálogo
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#6B6259]">
            Descubre nuestros productos para tiendas, comercios,
            oficinas y espacios profesionales.
          </p>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#2C241C]">
            Categorías
          </h2>

          <p className="mt-2 text-[#6B6259]">
            Explora nuestros productos por categoría.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categorias.map((categoria) => (
            <Link
              key={categoria.slug}
              href={`/catalogo/${categoria.slug}`}
              className="group rounded-2xl border border-[#E9E2D9] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#A36A33] hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-[#2C241C] transition group-hover:text-[#A36A33]">
                  {categoria.nombre}
                </h3>

                <span className="text-xl text-[#A36A33] transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 text-[#6B6259]">
                Ver productos de {categoria.nombre.toLowerCase()}.
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}