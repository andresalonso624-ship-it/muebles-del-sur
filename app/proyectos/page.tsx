"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const proyectos = [
  "/images/proyectos/proyecto1.jpg",
  "/images/proyectos/proyecto2.jpg",
  "/images/proyectos/proyecto3.jpg",
  "/images/proyectos/proyecto4.jpg",
  "/images/proyectos/proyecto5.jpg",
  "/images/proyectos/proyecto6.jpg",
  "/images/proyectos/proyecto7.jpg",
  "/images/proyectos/proyecto8.jpg",
  "/images/proyectos/proyecto9.jpg",
  "/images/proyectos/proyecto10.jpg",
  "/images/proyectos/proyecto11.jpg",
  "/images/proyectos/proyecto12.jpg",
];

export default function ProyectosPage() {
  const [imagenAbierta, setImagenAbierta] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // =========================================================
  // NAVEGACIÓN CON TECLADO + CERRAR CON ESC
  // =========================================================

  useEffect(() => {
    const manejarTeclado = (event: KeyboardEvent) => {
      if (imagenAbierta === null) return;

      if (event.key === "Escape") {
        setImagenAbierta(null);
      }

      if (event.key === "ArrowLeft") {
        setImagenAbierta((actual) => {
          if (actual === null) return null;

          return actual === 0
            ? proyectos.length - 1
            : actual - 1;
        });
      }

      if (event.key === "ArrowRight") {
        setImagenAbierta((actual) => {
          if (actual === null) return null;

          return actual === proyectos.length - 1
            ? 0
            : actual + 1;
        });
      }
    };

    window.addEventListener("keydown", manejarTeclado);

    return () => {
      window.removeEventListener("keydown", manejarTeclado);
    };
  }, [imagenAbierta]);

  // =========================================================
  // BLOQUEAR SCROLL CUANDO LA IMAGEN ESTÁ ABIERTA
  // =========================================================

  useEffect(() => {
    if (imagenAbierta !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [imagenAbierta]);

  // =========================================================
  // IMAGEN ANTERIOR
  // =========================================================

  const imagenAnterior = () => {
    setImagenAbierta((actual) => {
      if (actual === null) return null;

      return actual === 0
        ? proyectos.length - 1
        : actual - 1;
    });
  };

  // =========================================================
  // IMAGEN SIGUIENTE
  // =========================================================

  const imagenSiguiente = () => {
    setImagenAbierta((actual) => {
      if (actual === null) return null;

      return actual === proyectos.length - 1
        ? 0
        : actual + 1;
    });
  };

  return (
    <main className="min-h-screen bg-[#F8F5F1]">

      {/* =====================================================
          HERO / CABECERA DE PROYECTOS
      ===================================================== */}

      <section
        className="
          relative
          h-[400px]
          overflow-hidden

          sm:h-[400px]

          lg:h-[350px]
        "
      >

        {/* =================================================
            IMAGEN DE FONDO
        ================================================= */}

        <Image
          src="/images/proyectos-hero.jpg"
          alt="Nuestros proyectos"
          fill
          priority
          sizes="100vw"
          className="
            object-cover
            object-center
          "
        />

        {/* =================================================
            OSCURECIMIENTO
        ================================================= */}

        <div className="absolute inset-0 bg-black/40" />

        {/* =================================================
            DEGRADADO INFERIOR
        ================================================= */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-40
            bg-gradient-to-t
            from-black/50
            to-transparent
          "
        />

        {/* =================================================
            CONTENIDO PRINCIPAL
        ================================================= */}

        <div
          className="
            relative
            mx-auto
            flex
            h-full
            max-w-[1500px]
            flex-col
            justify-center

            px-6
            pb-12
            pt-24

            sm:px-10
            sm:pb-16
            sm:pt-10

            lg:px-10
            lg:pb-20
            lg:pt-10
          "
        >

          {/* =================================================
              BOTÓN VOLVER
              AHORA SIEMPRE ARRIBA A LA DERECHA
          ================================================= */}

          <div
            className="
              absolute
              right-5
              top-5
              z-20

              sm:right-10
              sm:top-8
            "
          >
            <Link
              href="/"
              className="
                inline-flex
                items-center
                gap-2

                rounded-full

                border
                border-white/40

                bg-black/20

                px-4
                py-2.5

                text-xs
                font-semibold
                text-white

                backdrop-blur-md

                shadow-lg

                transition-all
                duration-300

                hover:bg-white
                hover:text-[#2C241C]

                sm:px-6
                sm:py-2.5
                sm:text-sm
              "
            >
              <span className="text-base sm:text-lg">
                ←
              </span>

              <span>
                Volver al inicio
              </span>
            </Link>
          </div>


          {/* =================================================
              ETIQUETA
          ================================================= */}

          <div
            className="
              mt-8
              flex
              items-center
              gap-4

              sm:mt-6

              lg:mt-4
            "
          >

            <span
              className="
                h-[2px]
                w-10
                shrink-0
                bg-[#D49A32]

                sm:w-12
              "
            />

            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.20em]
                text-white

                sm:text-xs
                sm:tracking-[0.28em]
              "
            >
              Estanterías MSC del Sur
            </p>

          </div>


          {/* =================================================
              TÍTULO
          ================================================= */}

          <h1
            className="
              mt-4

              max-w-[900px]

              text-[43px]
              font-extrabold
              leading-[0.94]
              tracking-[-0.04em]
              text-white

              sm:text-6xl

              lg:text-7xl
            "
          >
            Nuestros{" "}
            <span className="text-[#D49A32]">
              proyectos.
            </span>
          </h1>


          {/* =================================================
              LÍNEA DECORATIVA
          ================================================= */}

          <div
            className="
              mt-6
              h-1
              w-16
              rounded-full
              bg-[#D49A32]

              sm:w-20
            "
          />


          {/* =================================================
              DESCRIPCIÓN
          ================================================= */}

          <p
            className="
              mt-4

              max-w-[650px]

              text-sm
              leading-6
              text-white/90

              sm:text-lg
              sm:leading-8
            "
          >
            Una selección de algunos de nuestros trabajos realizados.
          </p>


          {/* =================================================
              INDICADORES MÓVIL
          ================================================= */}

          <div
            className="
              mt-6
              flex
              items-center
              gap-2

              sm:hidden
            "
          >
            <span className="h-[3px] w-10 rounded-full bg-[#D49A32]" />

            <span className="h-[3px] w-3 rounded-full bg-white/70" />

            <span className="h-[3px] w-3 rounded-full bg-white/70" />
          </div>

        </div>

      </section>


      {/* =====================================================
          GALERÍA
      ===================================================== */}

      <section
        className="
          mx-auto
          max-w-[1500px]

          px-5
          py-8

          sm:px-10
          sm:py-10

          lg:px-16
          lg:py-14
        "
      >

        <div
          className="
            grid
            grid-cols-1
            gap-4

            sm:grid-cols-2

            lg:grid-cols-3
            lg:gap-5
          "
        >

          {proyectos.map((imagen, index) => (

            <button
              key={imagen}
              type="button"
              onClick={() => setImagenAbierta(index)}
              aria-label={`Ampliar proyecto ${index + 1}`}

              className="
                group
                relative
                block
                w-full
                overflow-hidden
                rounded-2xl
                bg-white
                text-left

                shadow-sm

                outline-none

                transition-all
                duration-500

                hover:-translate-y-1
                hover:shadow-xl

                focus:ring-2
                focus:ring-[#A36A33]
                focus:ring-offset-2
              "
            >

              {/* IMAGEN */}

              <div
                className="
                  relative
                  aspect-[16/10]
                  w-full
                  overflow-hidden
                "
              >

                <Image
                  src={imagen}
                  alt={`Proyecto ${index + 1}`}
                  fill

                  sizes="
                    (max-width: 640px) 100vw,
                    (max-width: 1024px) 50vw,
                    33vw
                  "

                  className="
                    object-cover

                    transition-transform
                    duration-700

                    group-hover:scale-[1.04]
                  "
                />


                {/* EFECTO AL PASAR EL RATÓN */}

                <div
                  className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center

                    bg-black/0

                    transition-all
                    duration-500

                    group-hover:bg-black/20
                  "
                >

                  <span
                    className="
                      flex
                      h-12
                      w-12

                      scale-90

                      items-center
                      justify-center

                      rounded-full

                      bg-white/95

                      text-2xl
                      font-light
                      text-[#2C241C]

                      opacity-0

                      shadow-xl

                      transition-all
                      duration-500

                      group-hover:scale-100
                      group-hover:opacity-100
                    "
                  >
                    +
                  </span>

                </div>

              </div>

            </button>

          ))}

        </div>

      </section>


      {/* =====================================================
          VISOR DE IMAGEN
      ===================================================== */}

      {imagenAbierta !== null && (

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

          onClick={() => setImagenAbierta(null)}

          /* DESLIZAR EN MÓVIL */

          onTouchStart={(event) => {
            setTouchStartX(event.touches[0].clientX);
          }}

          onTouchEnd={(event) => {

            if (touchStartX === null) return;

            const touchEndX =
              event.changedTouches[0].clientX;

            const diferencia =
              touchStartX - touchEndX;

            if (Math.abs(diferencia) > 50) {

              if (diferencia > 0) {
                imagenSiguiente();
              } else {
                imagenAnterior();
              }

            }

            setTouchStartX(null);
          }}
        >

          {/* =================================================
              BOTÓN CERRAR
          ================================================= */}

          <button
            type="button"
            onClick={() => setImagenAbierta(null)}
            aria-label="Cerrar imagen"

            className="
              absolute
              right-4
              top-4
              z-[110]

              flex
              h-12
              w-12

              items-center
              justify-center

              rounded-full

              bg-white

              text-3xl
              font-light
              leading-none

              text-[#2C241C]

              shadow-xl

              transition-all
              duration-300

              hover:scale-105
              hover:bg-[#A36A33]
              hover:text-white

              sm:right-8
              sm:top-8
            "
          >
            ×
          </button>


          {/* =================================================
              FLECHA ANTERIOR
          ================================================= */}

          <button
            type="button"

            onClick={(event) => {
              event.stopPropagation();
              imagenAnterior();
            }}

            aria-label="Imagen anterior"

            className="
              absolute
              left-3
              top-1/2
              z-[110]

              flex
              h-11
              w-11

              -translate-y-1/2

              items-center
              justify-center

              rounded-full

              bg-white/90

              text-4xl
              font-light
              leading-none

              text-[#2C241C]

              shadow-xl

              transition-all
              duration-300

              hover:scale-105
              hover:bg-[#A36A33]
              hover:text-white

              sm:left-8
              sm:h-14
              sm:w-14
            "
          >
            ‹
          </button>


          {/* =================================================
              FLECHA SIGUIENTE
          ================================================= */}

          <button
            type="button"

            onClick={(event) => {
              event.stopPropagation();
              imagenSiguiente();
            }}

            aria-label="Imagen siguiente"

            className="
              absolute
              right-3
              top-1/2
              z-[110]

              flex
              h-11
              w-11

              -translate-y-1/2

              items-center
              justify-center

              rounded-full

              bg-white/90

              text-4xl
              font-light
              leading-none

              text-[#2C241C]

              shadow-xl

              transition-all
              duration-300

              hover:scale-105
              hover:bg-[#A36A33]
              hover:text-white

              sm:right-8
              sm:h-14
              sm:w-14
            "
          >
            ›
          </button>


          {/* =================================================
              IMAGEN AMPLIADA
          ================================================= */}

          <div
            className="
              relative

              h-[80vh]
              w-[90vw]

              max-w-[1600px]

              sm:h-[85vh]
              sm:w-[95vw]
            "

            onClick={(event) => {
              event.stopPropagation();
            }}
          >

            <Image
              src={proyectos[imagenAbierta]}
              alt={`Proyecto ${imagenAbierta + 1} ampliado`}
              fill
              sizes="95vw"
              className="object-contain"
              priority
            />

          </div>

        </div>

      )}

    </main>
  );
}