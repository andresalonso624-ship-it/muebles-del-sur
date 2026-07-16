"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageModalProps {
  abierto: boolean;
  onClose: () => void;
  imagenes: string[];
  nombre: string;
}

export default function ImageModal({
  abierto,
  onClose,
  imagenes,
  nombre,
}: ImageModalProps) {
  const [indice, setIndice] = useState(0);

  if (!abierto) return null;

  const siguiente = () => {
    setIndice((prev) => (prev + 1) % imagenes.length);
  };

  const anterior = () => {
    setIndice((prev) => (prev - 1 + imagenes.length) % imagenes.length);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4">

      {/* Cerrar */}

      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-50 rounded-full bg-black/40 p-2 text-white transition hover:bg-black/70 lg:right-6 lg:top-6"
      >
        <X size={28} />
      </button>

      {/* Flecha izquierda */}

      {imagenes.length > 1 && (
        <button
          onClick={anterior}
          className="absolute left-2 z-50 rounded-full bg-black/40 p-2 text-white transition hover:bg-black/70 lg:left-6"
        >
          <ChevronLeft size={32} />
        </button>
      )}

      {/* Imagen */}

      <div className="flex h-[85vh] w-full max-w-6xl items-center justify-center">

        <Image
          src={imagenes[indice]}
          alt={nombre}
          width={1800}
          height={1400}
          priority
          className="max-h-[85vh] w-auto rounded-2xl object-contain"
        />

      </div>

      {/* Flecha derecha */}

      {imagenes.length > 1 && (
        <button
          onClick={siguiente}
          className="absolute right-2 z-50 rounded-full bg-black/40 p-2 text-white transition hover:bg-black/70 lg:right-6"
        >
          <ChevronRight size={32} />
        </button>
      )}

      {/* Contador */}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-5 py-2 text-sm text-white backdrop-blur">

        {indice + 1} / {imagenes.length}

      </div>

    </div>
  );
}