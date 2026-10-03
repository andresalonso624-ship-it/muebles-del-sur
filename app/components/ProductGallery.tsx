"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface ProductImage {
  url: string;
  altText: string | null;
}

interface ProductGalleryProps {
  images: ProductImage[];
  productTitle: string;
}

export default function ProductGallery({
  images,
  productTitle,
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] =
    useState(0);

  const [lightboxOpen, setLightboxOpen] =
    useState(false);

  const imagenSeleccionada =
    images[selectedIndex] || null;

  useEffect(() => {
    if (!lightboxOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const cerrarConEscape = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setLightboxOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      cerrarConEscape
    );

    return () => {
      document.body.style.overflow = "";

      window.removeEventListener(
        "keydown",
        cerrarConEscape
      );
    };
  }, [lightboxOpen]);

  if (images.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-3xl border border-[#E9E2D9] bg-white text-[#8B5E34]">
        Sin imagen disponible
      </div>
    );
  }

  return (
    <>
      {/* =====================================================
          IMAGEN PRINCIPAL
      ===================================================== */}

      <div
        className="
          relative
          aspect-square
          overflow-hidden
          rounded-3xl
          border
          border-[#E9E2D9]
          bg-white
        "
      >

        <button
          type="button"
          onClick={() =>
            setLightboxOpen(true)
          }
          className="
            absolute
            inset-0
            z-10
            cursor-zoom-in
          "
          aria-label={`Ampliar imagen de ${productTitle}`}
        />

        <Image
          src={imagenSeleccionada.url}
          alt={
            imagenSeleccionada.altText ||
            productTitle
          }
          fill
          priority
          sizes="
            (max-width: 640px) 100vw,
            (max-width: 1024px) 100vw,
            50vw
          "
          className="
            object-contain
            p-5
            transition
            duration-300
            sm:p-8
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            bottom-4
            right-4
            z-20
            rounded-full
            bg-black/60
            px-3
            py-2
            text-xs
            font-medium
            text-white
            backdrop-blur-sm
          "
        >
          🔍 Ampliar
        </div>

      </div>


      {/* =====================================================
          MINIATURAS
      ===================================================== */}

      {images.length > 1 && (
        <div
          className="
            mt-4
            grid
            grid-cols-4
            gap-3
            sm:grid-cols-5
          "
        >

          {images.map(
            (
              image,
              index
            ) => (
              <button
                key={`${image.url}-${index}`}
                type="button"
                onClick={() =>
                  setSelectedIndex(index)
                }
                className={`
                  relative
                  aspect-square
                  overflow-hidden
                  rounded-xl
                  border
                  bg-white
                  transition
                  ${
                    selectedIndex === index
                      ? "border-[#A36A33] ring-2 ring-[#A36A33]/20"
                      : "border-[#E9E2D9] hover:border-[#A36A33]"
                  }
                `}
                aria-label={`Ver imagen ${
                  index + 1
                }`}
              >

                <Image
                  src={image.url}
                  alt={
                    image.altText ||
                    `${productTitle} - imagen ${
                      index + 1
                    }`
                  }
                  fill
                  sizes="120px"
                  className="object-contain p-2"
                />

              </button>
            )
          )}

        </div>
      )}


      {/* =====================================================
          LIGHTBOX
      ===================================================== */}

      {lightboxOpen && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/90
            p-4
            sm:p-8
          "
          role="dialog"
          aria-modal="true"
          aria-label={`Imagen ampliada de ${productTitle}`}
          onClick={() =>
            setLightboxOpen(false)
          }
        >

          {/* CERRAR */}

          <button
            type="button"
            onClick={() =>
              setLightboxOpen(false)
            }
            className="
              absolute
              right-4
              top-4
              z-30
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-white/90
              text-2xl
              text-[#2C241C]
              shadow-lg
              transition
              hover:bg-white
              sm:right-8
              sm:top-8
            "
            aria-label="Cerrar imagen"
          >
            ×
          </button>


          {/* IMAGEN GRANDE */}

          <div
            className="
              relative
              h-[80vh]
              w-full
              max-w-6xl
            "
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <Image
              src={imagenSeleccionada.url}
              alt={
                imagenSeleccionada.altText ||
                productTitle
              }
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />

          </div>


          {/* CONTROLES */}

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();

                  setSelectedIndex(
                    (current) =>
                      current === 0
                        ? images.length - 1
                        : current - 1
                  );
                }}
                className="
                  absolute
                  left-3
                  top-1/2
                  z-30
                  flex
                  h-12
                  w-12
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  bg-white/90
                  text-2xl
                  text-[#2C241C]
                  shadow-lg
                  transition
                  hover:bg-white
                  sm:left-8
                "
                aria-label="Imagen anterior"
              >
                ←
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();

                  setSelectedIndex(
                    (current) =>
                      current ===
                      images.length - 1
                        ? 0
                        : current + 1
                  );
                }}
                className="
                  absolute
                  right-3
                  top-1/2
                  z-30
                  flex
                  h-12
                  w-12
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  bg-white/90
                  text-2xl
                  text-[#2C241C]
                  shadow-lg
                  transition
                  hover:bg-white
                  sm:right-8
                "
                aria-label="Imagen siguiente"
              >
                →
              </button>
            </>
          )}

        </div>
      )}
    </>
  );
}