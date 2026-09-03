"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface ProductModalProps {
  open: boolean;
  images: string[];
  title: string;
  onClose: () => void;
}

export default function ProductModal({
  open,
  images,
  title,
  onClose,
}: ProductModalProps) {
  const gallery = images.filter(Boolean);

  const [currentIndex, setCurrentIndex] =
    useState<number>(0);

  const [touchStartX, setTouchStartX] =
    useState<number | null>(null);

  const [touchEndX, setTouchEndX] =
    useState<number | null>(null);

  useEffect(() => {
    if (!open) {
      setCurrentIndex(0);
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        setCurrentIndex((prev) =>
          prev === 0
            ? gallery.length - 1
            : prev - 1
        );
      }

      if (event.key === "ArrowRight") {
        setCurrentIndex((prev) =>
          gallery.length === 0
            ? 0
            : (prev + 1) % gallery.length
        );
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose, gallery.length]);

  if (!open || gallery.length === 0) {
    return null;
  }

  const previousImage = () => {
    setCurrentIndex((prev) =>
      prev === 0
        ? gallery.length - 1
        : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex(
      (prev) => (prev + 1) % gallery.length
    );
  };

  const handleTouchStart = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    setTouchStartX(
      event.touches[0]?.clientX ?? null
    );
    setTouchEndX(null);
  };

  const handleTouchMove = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    setTouchEndX(
      event.touches[0]?.clientX ?? null
    );
  };

  const handleTouchEnd = () => {
    if (
      touchStartX === null ||
      touchEndX === null
    ) {
      return;
    }

    const distance =
      touchStartX - touchEndX;

    if (Math.abs(distance) >= 45) {
      if (distance > 0) {
        nextImage();
      } else {
        previousImage();
      }
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        h-[100dvh]
        w-[100vw]
        items-center
        justify-center
        bg-black/90
        p-3
        sm:p-6
      "
      role="dialog"
      aria-modal="true"
      aria-label={`Galería de ${title}`}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar galería"
        className="
          fixed
          right-3
          top-3
          z-[10002]
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          bg-white
          text-2xl
          leading-none
          text-[#2C241C]
          shadow-xl
          touch-manipulation
          sm:right-6
          sm:top-6
        "
      >
        ×
      </button>

      <div
        className="
          relative
          flex
          h-full
          w-full
          max-w-[1500px]
          flex-col
          items-center
          justify-center
        "
        onClick={(event) => event.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative h-[78dvh] w-full sm:h-[82vh]">
          <Image
            src={gallery[currentIndex]}
            alt={`${title} - foto ${currentIndex + 1}`}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>

        {gallery.length > 1 && (
          <>
            <button
              type="button"
              onClick={previousImage}
              aria-label="Foto anterior"
              className="
                absolute
                left-1
                top-1/2
                flex
                h-11
                w-11
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                bg-white/95
                text-2xl
                text-[#2C241C]
                shadow-lg
                touch-manipulation
                sm:left-3
                sm:h-12
                sm:w-12
              "
            >
              ‹
            </button>

            <button
              type="button"
              onClick={nextImage}
              aria-label="Foto siguiente"
              className="
                absolute
                right-1
                top-1/2
                flex
                h-11
                w-11
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                bg-white/95
                text-2xl
                text-[#2C241C]
                shadow-lg
                touch-manipulation
                sm:right-3
                sm:h-12
                sm:w-12
              "
            >
              ›
            </button>

            <div
              className="
                absolute
                bottom-[88px]
                rounded-full
                bg-black/60
                px-3
                py-1.5
                text-xs
                font-semibold
                text-white
                backdrop-blur-sm
              "
            >
              {currentIndex + 1} / {gallery.length}
            </div>

            <div
              className="
                absolute
                bottom-3
                left-1/2
                flex
                w-[calc(100%-60px)]
                -translate-x-1/2
                gap-2
                overflow-x-auto
                px-1
                pb-1
                sm:bottom-5
                sm:w-auto
                sm:max-w-[90vw]
              "
            >
              {gallery.map((src, index) => (
                <button
                  key={`${src}-${index}`}
                  type="button"
                  onClick={() =>
                    setCurrentIndex(index)
                  }
                  aria-label={`Ver foto ${index + 1}`}
                  className={`
                    relative
                    h-14
                    w-14
                    shrink-0
                    overflow-hidden
                    rounded-lg
                    border-2
                    bg-white
                    sm:h-16
                    sm:w-16
                    ${
                      currentIndex === index
                        ? "border-[#C6922F]"
                        : "border-white/40"
                    }
                  `}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-contain p-1"
                  />
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
