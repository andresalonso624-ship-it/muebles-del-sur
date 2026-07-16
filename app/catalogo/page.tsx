"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { muebles } from "../data/muebles";

import CatalogoCard from "../components/CatalogoCard";
import Pagination from "../components/Pagination";

export default function CatalogoPage() {
  const [buscar, setBuscar] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);

  const productosPorPagina = 12;

  const productos = useMemo(() => {
    const texto = buscar.toLowerCase();

    return muebles.filter(
      (mueble) =>
        mueble.nombre.toLowerCase().includes(texto) ||
        mueble.referencia.toLowerCase().includes(texto)
    );
  }, [buscar]);

  const totalPaginas = Math.ceil(
    productos.length / productosPorPagina
  );

  const indiceInicial =
    (paginaActual - 1) * productosPorPagina;

  const productosPagina = productos.slice(
    indiceInicial,
    indiceInicial + productosPorPagina
  );

  useEffect(() => {
    setPaginaActual(1);
  }, [buscar]);

  return (
    <main className="min-h-screen bg-[#F7F2EC] pb-16 lg:pb-24">

      {/* Banner */}

      <section className="relative h-[220px] overflow-hidden sm:h-[260px] lg:h-[320px]">

        <Image
          src="/images/banner/catalogo.jpg"
          alt="Catálogo"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute inset-0 flex items-center">

          <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">

            <Link
              href="/"
              className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#2C241C] shadow-lg transition hover:bg-[#A36A33] hover:text-white lg:px-6"
            >
              ← Volver al inicio
            </Link>

            <h1 className="mt-6 text-4xl font-bold text-white sm:text-5xl lg:mt-8 lg:text-6xl">
              Catálogo
            </h1>

            <p className="mt-3 max-w-2xl text-base text-white/90 sm:text-lg">
              Descubre todos nuestros muebles y encuentra el diseño ideal.
            </p>

          </div>

        </div>

      </section>

      {/* Contenido */}

      <div className="mx-auto max-w-7xl px-5 pt-10 sm:px-6 lg:px-8 lg:pt-14">

        {/* Buscador */}

        <input
          type="text"
          placeholder="Buscar por nombre o referencia..."
          value={buscar}
          onChange={(e) => setBuscar(e.target.value)}
          className="w-full rounded-2xl border border-gray-300 bg-white px-5 py-4 text-base outline-none transition focus:border-[#A36A33] focus:ring-2 focus:ring-[#A36A33]"
        />

        <p className="mt-6 text-sm text-gray-600 sm:text-base">
          {productos.length} productos encontrados
        </p>

        {/* Productos */}

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-8">

          {productosPagina.map((mueble) => (

            <CatalogoCard
              key={mueble.id}
              nombre={mueble.nombre}
              referencia={mueble.referencia}
              medida={mueble.medida}
              color={mueble.color}
              imagenes={mueble.imagenes}
            />

          ))}

        </div>

        {/* Paginación */}

        {totalPaginas > 1 && (
          <Pagination
            paginaActual={paginaActual}
            totalPaginas={totalPaginas}
            onChange={setPaginaActual}
          />
        )}

      </div>

    </main>
  );
}