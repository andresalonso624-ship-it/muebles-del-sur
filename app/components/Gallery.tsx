"use client";

import { useState } from "react";
import Image from "next/image";

const proyectos = [
  { id: 1, imagen: "/images/proyectos/proyecto1.png", grande: true },
  { id: 2, imagen: "/images/proyectos/proyecto2.png", grande: false },
  { id: 3, imagen: "/images/proyectos/proyecto3.png", grande: false },
  { id: 4, imagen: "/images/proyectos/proyecto4.png", grande: true },
  { id: 5, imagen: "/images/proyectos/proyecto5.png", grande: false },
  { id: 6, imagen: "/images/proyectos/proyecto6.png", grande: false },
  { id: 7, imagen: "/images/proyectos/proyecto7.png", grande: true },
  { id: 8, imagen: "/images/proyectos/proyecto8.png", grande: false },
  { id: 9, imagen: "/images/proyectos/proyecto9.png", grande: false },
  { id: 10, imagen: "/images/proyectos/proyecto10.png", grande: true },
  { id: 11, imagen: "/images/proyectos/proyecto11.png", grande: false },
  { id: 12, imagen: "/images/proyectos/proyecto12.png", grande: false },
];

export default function Gallery() {
  const [indice, setIndice] = useState<number | null>(null);

  const siguiente = () => {
    if (indice === null) return;
    setIndice((indice + 1) % proyectos.length);
  };

  const anterior = () => {
    if (indice === null) return;
    setIndice((indice - 1 + proyectos.length) % proyectos.length);
  };

  return (
    <>
      <section
        id="gallery"
        className="py-28 bg-gradient-to-b from-[#F7F2EC] to-white"
      >
        <div className="max-w-7xl mx-auto px-8">

          <p className="text-center uppercase tracking-[7px] text-[#A36A33] font-semibold">
            — NUESTROS PROYECTOS —
          </p>

          <h2 className="mt-4 text-5xl lg:text-6xl font-bold text-center text-[#2C241C]">
            Algunos de nuestros trabajos
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-center text-lg text-gray-600 leading-8">
            Descubre algunos de los proyectos realizados por Estanterias MSC.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">

            {proyectos.map((proyecto, i) => (

              <div
                key={proyecto.id}
                onClick={() => setIndice(i)}
                className={`group relative overflow-hidden rounded-3xl cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                  proyecto.grande
                    ? "lg:col-span-2 lg:row-span-2"
                    : ""
                }`}
              >

                <Image
                  src={proyecto.imagen}
                  alt={`Proyecto ${proyecto.id}`}
                  width={1000}
                  height={800}
                  unoptimized
                  className={`w-full object-cover transition duration-700 group-hover:scale-110 ${
                    proyecto.grande
                      ? "h-[620px]"
                      : "h-[300px]"
                  }`}
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition duration-500 flex items-center justify-center">

                  <div className="opacity-0 group-hover:opacity-100 transition duration-500">

                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-3xl shadow-xl">

                      👁

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>
      </section>

      {/* LIGHTBOX */}
      {indice !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIndice(null)}
        >
          {/* Botón cerrar */}
          <button
            onClick={() => setIndice(null)}
            className="absolute top-6 right-8 text-white text-5xl hover:scale-110 transition"
          >
            ✕
          </button>

          {/* Flecha izquierda */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              anterior();
            }}
            className="absolute left-4 md:left-8 text-white text-6xl hover:scale-125 transition"
          >
            ‹
          </button>

          {/* Imagen */}
          <div
            className="max-w-7xl w-full flex justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={proyectos[indice].imagen}
              alt={`Proyecto ${proyectos[indice].id}`}
              className="max-w-full max-h-[90vh] rounded-3xl shadow-2xl object-contain"
            />
          </div>

          {/* Flecha derecha */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              siguiente();
            }}
            className="absolute right-4 md:right-8 text-white text-6xl hover:scale-125 transition"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
} 