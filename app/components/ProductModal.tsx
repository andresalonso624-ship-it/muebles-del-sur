"use client";

import Image from "next/image";
import {
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";

interface ProductModalProps {
  open: boolean;
  images: string[];
  title?: string;
  onClose: () => void;
}

export default function ProductModal({
  open,
  images,
  title = "Producto",
  onClose,
}: ProductModalProps) {
  const [indice, setIndice] = useState(0);
  const [zoom, setZoom] = useState(1);

  const touchStartX = useRef<number | null>(
    null
  );

  const touchStartY = useRef<number | null>(
    null
  );

  // =========================================================
  // REINICIAR AL ABRIR
  // =========================================================

  useEffect(() => {
    if (open) {
      setIndice(0);
      setZoom(1);
    }
  }, [open, images]);

  // =========================================================
  // SIGUIENTE
  // =========================================================

  const siguiente = useCallback(() => {
    if (images.length <= 1) return;

    setIndice((actual) =>
      actual === images.length - 1
        ? 0
        : actual + 1
    );

    setZoom(1);
  }, [images.length]);

  // =========================================================
  // ANTERIOR
  // =========================================================

  const anterior = useCallback(() => {
    if (images.length <= 1) return;

    setIndice((actual) =>
      actual === 0
        ? images.length - 1
        : actual - 1
    );

    setZoom(1);
  }, [images.length]);

  // =========================================================
  // ZOOM
  // =========================================================

  const aumentarZoom = useCallback(() => {
    setZoom((actual) =>
      Math.min(3, Number((actual + 0.5).toFixed(1)))
    );
  }, []);

  const disminuirZoom = useCallback(() => {
    setZoom((actual) =>
      Math.max(1, Number((actual - 0.5).toFixed(1)))
    );
  }, []);

  const resetZoom = useCallback(() => {
    setZoom(1);
  }, []);

  // =========================================================
  // TECLADO
  // =========================================================

  useEffect(() => {
    if (!open) return;

    const manejarTeclado = (
      event: KeyboardEvent
    ) => {
      switch (event.key) {
        case "Escape":
          onClose();
          break;

        case "ArrowRight":
          event.preventDefault();
          siguiente();
          break;

        case "ArrowLeft":
          event.preventDefault();
          anterior();
          break;

        case "+":
        case "=":
          event.preventDefault();
          aumentarZoom();
          break;

        case "-":
        case "_":
          event.preventDefault();
          disminuirZoom();
          break;

        case "0":
          event.preventDefault();
          resetZoom();
          break;
      }
    };

    window.addEventListener(
      "keydown",
      manejarTeclado
    );

    return () => {
      window.removeEventListener(
        "keydown",
        manejarTeclado
      );
    };
  }, [
    open,
    onClose,
    siguiente,
    anterior,
    aumentarZoom,
    disminuirZoom,
    resetZoom,
  ]);

  // =========================================================
  // BLOQUEAR SCROLL
  // =========================================================

  useEffect(() => {
    if (!open) return;

    const overflowAnterior =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        overflowAnterior;
    };
  }, [open]);

  // =========================================================
  // SWIPE EN MÓVIL
  // =========================================================

  const manejarTouchStart = (
    event: React.TouchEvent
  ) => {
    touchStartX.current =
      event.touches[0]?.clientX ?? null;

    touchStartY.current =
      event.touches[0]?.clientY ?? null;
  };

  const manejarTouchEnd = (
    event: React.TouchEvent
  ) => {
    if (
      touchStartX.current === null ||
      touchStartY.current === null
    ) {
      return;
    }

    const touchEndX =
      event.changedTouches[0]?.clientX ?? 0;

    const touchEndY =
      event.changedTouches[0]?.clientY ?? 0;

    const diferenciaX =
      touchEndX - touchStartX.current;

    const diferenciaY =
      touchEndY - touchStartY.current;

    touchStartX.current = null;
    touchStartY.current = null;

    // Solo interpretamos como swipe
    // si el movimiento horizontal es mayor.
    if (
      Math.abs(diferenciaX) <
      50
    ) {
      return;
    }

    if (
      Math.abs(diferenciaX) <
      Math.abs(diferenciaY)
    ) {
      return;
    }

    if (diferenciaX < 0) {
      siguiente();
    } else {
      anterior();
    }
  };

  // =========================================================
  // RUEDA DEL RATÓN PARA ZOOM
  // =========================================================

  const manejarWheel = (
    event: React.WheelEvent
  ) => {
    event.preventDefault();

    if (event.deltaY < 0) {
      aumentarZoom();
    } else {
      disminuirZoom();
    }
  };

  // =========================================================
  // CERRAR SI NO ESTÁ ABIERTO
  // =========================================================

  if (!open || images.length === 0) {
    return null;
  }

  const imagenActual =
    images[indice];

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Galería de ${title}`}
      onClick={onClose}
    >
      {/* =====================================================
          CONTENEDOR PRINCIPAL
      ===================================================== */}

      <div
        className="relative flex h-full w-full max-w-7xl flex-col overflow-hidden rounded-2xl bg-black sm:h-[94vh]"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        {/* ===================================================
            CABECERA
        =================================================== */}

        <div className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent px-4 py-4 sm:px-6 sm:py-5">
          <div className="min-w-0 pr-4">
            <h2 className="truncate text-sm font-semibold text-white sm:text-base">
              {title}
            </h2>

            {images.length > 1 && (
              <p className="mt-1 text-xs text-white/70">
                {indice + 1} / {images.length}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar galería"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/50 text-2xl text-white transition hover:bg-white/20"
          >
            ×
          </button>
        </div>

        {/* ===================================================
            IMAGEN
        =================================================== */}

        <div
          className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden"
          onTouchStart={
            manejarTouchStart
          }
          onTouchEnd={
            manejarTouchEnd
          }
          onWheel={manejarWheel}
        >
          <div
            className="relative h-full w-full transition-transform duration-200 ease-out"
            style={{
              transform: `scale(${zoom})`,
            }}
          >
            <Image
              src={imagenActual}
              alt={`${title} - foto ${
                indice + 1
              }`}
              fill
              priority
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {/* =================================================
              ANTERIOR
          ================================================= */}

          {images.length > 1 && (
            <button
              type="button"
              onClick={anterior}
              aria-label="Imagen anterior"
              className="absolute left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-3xl text-white backdrop-blur-sm transition hover:bg-black/80 sm:left-6 sm:h-14 sm:w-14"
            >
              ‹
            </button>
          )}

          {/* =================================================
              SIGUIENTE
          ================================================= */}

          {images.length > 1 && (
            <button
              type="button"
              onClick={siguiente}
              aria-label="Imagen siguiente"
              className="absolute right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-3xl text-white backdrop-blur-sm transition hover:bg-black/80 sm:right-6 sm:h-14 sm:w-14"
            >
              ›
            </button>
          )}
        </div>

        {/* ===================================================
            CONTROLES
        =================================================== */}

        <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/90 via-black/70 to-transparent px-3 pb-3 pt-10 sm:px-6 sm:pb-5">
          <div className="flex items-center justify-center gap-2 sm:gap-3">

            {/* ZOOM MENOS */}

            <button
              type="button"
              onClick={disminuirZoom}
              disabled={zoom <= 1}
              aria-label="Reducir zoom"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-xl text-white backdrop-blur-sm transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              −
            </button>

            {/* ZOOM */}

            <button
              type="button"
              onClick={resetZoom}
              aria-label="Restablecer zoom"
              className="min-w-[68px] rounded-full bg-white/10 px-3 py-2.5 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              {Math.round(zoom * 100)}%
            </button>

            {/* ZOOM MÁS */}

            <button
              type="button"
              onClick={aumentarZoom}
              disabled={zoom >= 3}
              aria-label="Ampliar imagen"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-xl text-white backdrop-blur-sm transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              +
            </button>
          </div>

          {/* =================================================
              MINIATURAS
          ================================================= */}

          {images.length > 1 && (
            <div className="mt-3 flex justify-center gap-2 overflow-x-auto px-2 pb-1">
              {images.map(
                (image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => {
                      setIndice(index);
                      setZoom(1);
                    }}
                    aria-label={`Ver foto ${
                      index + 1
                    }`}
                    className={`relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border-2 transition sm:h-14 sm:w-14 ${
                      indice === index
                        ? "border-white"
                        : "border-white/20 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={image}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </button>
                )
              )}
            </div>
          )}

          {/* AYUDA */}

          <p className="mt-2 text-center text-[10px] text-white/50 sm:text-xs">
            ← → cambiar · + − ampliar ·
            0 restablecer · ESC cerrar
          </p>
        </div>
      </div>
    </div>
  );
}