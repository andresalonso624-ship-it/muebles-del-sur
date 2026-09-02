"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
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
  const [imagenAbierta, setImagenAbierta] = useState<string | null>(null);

  // =========================================================
  // CERRAR CON ESC
  // =========================================================

  useEffect(() => {
    const manejarEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setImagenAbierta(null);
      }
    };

    window.addEventListener("keydown", manejarEscape);

    return () => {
      window.removeEventListener("keydown", manejarEscape);
    };
  }, []);

  // =========================================================
  // BLOQUEAR SCROLL CUANDO LA IMAGEN ESTÁ ABIERTA
  // =========================================================

  useEffect(() => {
    if (imagenAbierta) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [imagenAbierta]);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F8F5F1]">

      {/* =====================================================
          HERO / CABECERA DE PROYECTOS
      ===================================================== */}

      <section className="relative min-h-[330px] overflow-hidden sm:min-h-[400px] lg:min-h-[300px]">

        {/* IMAGEN DE FONDO */}

        <Image
          src="/images/proyectos-hero.jpg"
          alt="Nuestros proyectos"
          fill
          priority
          sizes="100vw"
          className="
            object-cover
            object-[85%_center]
            sm:object-center
          "
        />

        {/* OSCURECIMIENTO */}

        <div className="absolute inset-0 bg-black/45" />

        {/* DEGRADADO INFERIOR */}

        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/40 to-transparent" />

        {/* CONTENIDO */}

        <div
          className="
            relative
            mx-auto
            flex
            min-h-[100px]
            max-w-[1500px]
            flex-col
            justify-end
            px-4
            pb-10
            pt-[90px]
            sm:min-h-[400px]
            sm:px-10
            sm:pb-16
            sm:pt-[112px]
            lg:px-16
            lg:pb-20
            lg:pt-0
          "
        >

          {/* ETIQUETA */}

          <div className="mt-2 flex items-center gap-3 sm:mt-10 sm:gap-4">

            <span className="h-[2px] w-12 bg-[#D49A32]" />

            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.28em]
                text-white
                sm:text-sm
              "
            >
              
              
            </p>

          </div>

          {/* TÍTULO */}

          <h1
            className="
              mt-3
              max-w-[330px]
              text-[42px]
              font-extrabold
              leading-[0.95]
              sm:mt-5
              sm:max-w-4xl
              sm:text-5xl
              tracking-[-0.035em]
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

          {/* LÍNEA */}

          <div className="mt-7 h-1 w-20 rounded-full bg-[#D49A32]" />

          {/* DESCRIPCIÓN */}

          <p
            className="
              mt-4
              max-w-[320px]
              text-sm
              leading-6
              text-white/90
              sm:mt-5
              sm:max-w-2xl
              sm:text-lg
              sm:leading-8
            "
          >
            Una selección de algunos de nuestros trabajos realizados.
          </p>

        </div>
      </section>


      {/* =====================================================
          GALERÍA
      ===================================================== */}

      <section
        className="
          mx-auto
          max-w-[1500px]
          px-4
          py-6
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
            sm:gap-5
            lg:grid-cols-3
          "
        >

          {proyectos.map((imagen, index) => (

            <button
              key={imagen}
              type="button"
              onClick={() => setImagenAbierta(imagen)}
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

              <div className="relative aspect-[16/10] w-full overflow-hidden">

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

      {imagenAbierta && (

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
        >

          {/* BOTÓN CERRAR */}

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

          {/* IMAGEN AMPLIADA */}

          <div
            className="
              relative
              h-[85vh]
              w-[95vw]
              max-w-[1600px]
            "
            onClick={(event) => event.stopPropagation()}
          >

            <Image
              src={imagenAbierta}
              alt="Proyecto ampliado"
              fill
              sizes="95vw"
              className="object-contain"
              priority
            />

          </div>

        </div>

      )}

      </main>
    </>
  );
}