"use client";

import Image from "next/image";
import Link from "next/link";

const modelos = [
  {
    id: 1,
    nombre: "Cocina Moderna",
    descripcion: "Visualiza esta cocina en 3D y colócala en tu espacio.",
    imagen: "/images/modelos/cocina.jpg",
  },
  {
    id: 2,
    nombre: "Armario Premium",
    descripcion: "Explora cada detalle antes de fabricar.",
    imagen: "/images/modelos/armario.jpg",
  },
  {
    id: 3,
    nombre: "Mueble TV",
    descripcion: "Comprueba cómo queda en tu salón.",
    imagen: "/images/modelos/tv.jpg",
  },
];

export default function ModelosPage() {
  return (
    <main className="min-h-screen bg-[#F7F2EC] pb-20">

      {/* Banner */}

      <section className="relative h-[280px] md:h-[340px] overflow-hidden">

        <Image
          src="/images/banner/modelos.jpg"
          alt="Modelos 3D"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex items-center">

          <div className="mx-auto w-full max-w-7xl px-6">

            <Link
              href="/"
              className="inline-flex items-center rounded-full bg-white px-6 py-3 font-semibold text-[#2C241C] shadow-lg transition hover:bg-[#A36A33] hover:text-white"
            >
              ← Volver al inicio
            </Link>

            <h1 className="mt-8 text-5xl font-bold text-white md:text-6xl">
              Modelos 3D
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-white/90">
              Explora nuestros muebles en tres dimensiones y muy pronto
              podrás visualizarlos directamente en tu hogar mediante
              Realidad Aumentada.
            </p>

          </div>

        </div>

      </section>

      {/* Tarjetas */}

      <section className="mx-auto mt-16 max-w-7xl px-6">

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {modelos.map((modelo) => (

            <div
              key={modelo.id}
              className="overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >

              <div className="relative h-72">

                <Image
                  src={modelo.imagen}
                  alt={modelo.nombre}
                  fill
                  className="object-cover"
                />

              </div>

              <div className="p-7">

                <h2 className="text-2xl font-bold text-[#2C241C]">
                  {modelo.nombre}
                </h2>

                <p className="mt-4 text-gray-600 leading-7">
                  {modelo.descripcion}
                </p>

                <Link
                  href={`/modelo/${modelo.id}`}
                  className="mt-8 block rounded-2xl bg-[#A36A33] py-4 text-center font-bold text-white transition hover:bg-[#8B5A2B]"
                >
                  Ver Modelo 3D
                </Link>

              </div>

            </div>

          ))}

        </div>

      </section>

    </main>
  );
}