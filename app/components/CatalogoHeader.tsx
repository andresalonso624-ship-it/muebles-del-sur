"use client";

import Image from "next/image";

export default function CatalogoHeader() {
  return (
    <section className="relative h-[420px] overflow-hidden">

      <Image
        src="/images/catalogo/banner.jpg"
        alt="Catálogo Muebles del Sur"
        fill
        priority
        className="object-cover"
      />

      {/* Oscurecer imagen */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Contenido */}
      <div className="absolute inset-0 flex items-center justify-center">

        <div className="text-center text-white px-6">

          <p className="uppercase tracking-[8px] text-[#D9B07B] font-semibold">
            Muebles del Sur
          </p>

          <h1 className="mt-6 text-5xl lg:text-7xl font-extrabold">
            Catálogo
          </h1>

          <div className="w-24 h-1 bg-[#D9B07B] rounded-full mx-auto mt-8 mb-8" />

          <p className="max-w-3xl mx-auto text-lg lg:text-xl leading-9 text-gray-200">
            Descubre una selección de nuestros trabajos realizados.
            Diseños únicos fabricados completamente a medida para cada cliente.
          </p>

        </div>

      </div>

    </section>
  );
}