"use client";

import { useState } from "react";
import Image from "next/image";
import ImageModal from "./ImageModal";

interface CatalogoCardProps {
  nombre: string;
  referencia: string;
  medida: string | string[];
  color: string;
  imagenes: string[];
}

export default function CatalogoCard({
  nombre,
  referencia,
  medida,
  color,
  imagenes,
}: CatalogoCardProps) {
  const [modalAbierto, setModalAbierto] = useState(false);

  const telefono = "34641176821";

  const mensaje = `Hola, estoy interesado en el producto "${nombre}" (${referencia}).`;

  const obtenerColor = (nombreColor: string) => {
    const c = nombreColor.toLowerCase();

    if (c.includes("blanco")) return "#F5F5F5";
    if (c.includes("negro")) return "#1F1F1F";
    if (c.includes("madera")) return "#A67C52";
    if (c.includes("roble")) return "#B68952";
    if (c.includes("nogal")) return "#6F4E37";
    if (c.includes("gris")) return "#8A8A8A";
    if (c.includes("plata")) return "#C0C0C0";
    if (c.includes("oro")) return "#D4AF37";
    if (c.includes("beige")) return "#D9C7A2";

    return "#CCCCCC";
  };

  const colores = color.split("-").map((item) => item.trim());

  return (
    <>
      <div className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

        {/* Imagen */}

        <div
          className="relative h-64 cursor-pointer overflow-hidden sm:h-72"
          onClick={() => setModalAbierto(true)}
        >
          <Image
            src={imagenes[0]}
            alt={nombre}
            fill
            className="object-cover transition duration-500 hover:scale-105"
          />

          {imagenes.length > 1 && (
            <div className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur lg:text-sm">
              +{imagenes.length - 1} fotos
            </div>
          )}
        </div>

        {/* Información */}

        <div className="flex flex-1 flex-col p-5 lg:p-7">

          <h2 className="text-xl font-bold text-[#2C241C] lg:text-2xl">
            {nombre}
          </h2>

          <div className="mt-5 flex-1 space-y-4 text-gray-700">

            {/* Medidas */}

            <div>

              <p className="mb-2 font-semibold text-[#2C241C]">
                Medidas
              </p>

              <ul className="list-disc space-y-1 pl-5 text-sm lg:text-base">
                {(Array.isArray(medida) ? medida : [medida]).map(
                  (m, index) => (
                    <li key={index}>{m}</li>
                  )
                )}
              </ul>

            </div>

            {/* Referencia */}

            <p className="text-sm lg:text-base">
              <span className="font-semibold text-[#2C241C]">
                Referencia:
              </span>{" "}
              <span className="text-gray-600">
                {referencia}
              </span>
            </p>

            {/* Colores */}

            <div>

              <p className="mb-3 font-semibold text-[#2C241C]">
                Colores disponibles
              </p>

              <div className="flex flex-wrap gap-2">

                {colores.map((item, index) => (

                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-full bg-[#F7F7F7] px-3 py-2"
                  >

                    <div
                      className="h-5 w-5 rounded-full border border-gray-300"
                      style={{
                        backgroundColor: obtenerColor(item),
                      }}
                    />

                    <span className="text-xs lg:text-sm">
                      {item}
                    </span>

                  </div>

                ))}

              </div>

            </div>

          </div>

          {/* Botón */}

          <a
            href={`https://wa.me/${telefono}?text=${encodeURIComponent(
              mensaje
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 rounded-2xl bg-[#25D366] px-6 py-4 text-center text-base font-bold text-white transition hover:bg-[#1EBE5B] lg:text-lg"
          >
            Solicitar por WhatsApp
          </a>

        </div>

      </div>

      {/* Modal */}

      <ImageModal
        abierto={modalAbierto}
        onClose={() => setModalAbierto(false)}
        imagenes={imagenes}
        nombre={nombre}
      />
    </>
  );
}