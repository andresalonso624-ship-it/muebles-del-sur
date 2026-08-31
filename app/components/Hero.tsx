"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const heroImages = [
  "/images/hero1.jpg",
  "/images/hero2.jpg",
  "/images/hero3.jpg",
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="inicio"
      className="
        relative
        h-[100svh]
        min-h-[680px]
        w-full
        overflow-hidden
        bg-black
      "
    >
      {/* =====================================================
          IMAGEN DE FONDO
      ===================================================== */}

      <AnimatePresence mode="sync">
        <motion.div
          key={heroImages[currentImage]}
          className="absolute inset-0"
          initial={{
            opacity: 0,
            scale: 1.04,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            opacity: {
              duration: 1.2,
            },
            scale: {
              duration: 1,
            },
          }}
        >
          <Image
            src={heroImages[currentImage]}
            alt={`Proyecto de Estanterías MSC del Sur ${
              currentImage + 1
            }`}
            fill
            priority={currentImage === 0}
            sizes="100vw"
            className="
              object-cover
              object-center
            "
          />
        </motion.div>
      </AnimatePresence>

      {/* =====================================================
          CAPAS OSCURAS
      ===================================================== */}

      <div className="absolute inset-0 bg-black/25" />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-black/75
          via-black/35
          to-black/10
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/75
          via-black/15
          to-black/10
        "
      />

      {/* =====================================================
          CONTENIDO PRINCIPAL
      ===================================================== */}

      <div className="relative z-10 h-full">
        <div
          className="
            mx-auto
            flex
            h-full
            w-full
            max-w-[1500px]
            items-center
            px-6
            sm:px-10
            lg:px-16
            xl:px-20
          "
        >

          {/* =================================================
              TEXTO
          ================================================= */}

          <motion.div
            key={`texto-${currentImage}`}
            initial={{
              opacity: 0,
              x: -25,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
            className="
              w-full
              max-w-[760px]

              translate-y-0

              sm:translate-y-4

              lg:translate-y-6

              pt-[95px]
              sm:pt-[110px]
              lg:pt-0
            "
          >

            {/* =================================================
                MARCA
            ================================================= */}

            <div
              className="
                mb-5
                flex
                items-center
                gap-3

                sm:mb-6
                sm:gap-4
              "
            >
              <span
                className="
                  h-[2px]
                  w-9
                  bg-[#D6A13A]

                  sm:w-14
                "
              />

              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.25em]
                  text-white

                  sm:text-xs

                  lg:text-sm
                "
              >
                
              </p>
            </div>

            {/* =================================================
                TÍTULO
            ================================================= */}

            <h1
              className="
                max-w-[700px]

                text-[52px]
                font-extrabold
                leading-[0.92]
                tracking-[-0.045em]
                text-white

                sm:text-[64px]

                md:text-[72px]

                lg:text-[clamp(4rem,6.2vw,6.7rem)]
              "
            >
              Espacios
              <br />

              que hablan
              <br />

              <span className="text-[#D6A13A]">
                de tu negocio.
              </span>
            </h1>

            {/* =================================================
                LÍNEA
            ================================================= */}

            <div
              className="
                mt-6
                h-[3px]
                w-14
                rounded-full
                bg-[#D6A13A]

                sm:mt-7
                sm:w-20
              "
            />

            {/* =================================================
                DESCRIPCIÓN
            ================================================= */}

            <p
              className="
                mt-5
                max-w-[620px]

                text-[18px]
                font-medium
                leading-[1.5]
                text-white/95

                sm:mt-6
                sm:text-[19px]
                sm:leading-7

                lg:text-xl
                lg:leading-8
              "
            >
              Diseñamos, fabricamos e instalamos
              estanterías, mobiliario y soluciones
              comerciales adaptadas a cada espacio.
            </p>

            {/* =================================================
                BOTÓN
            ================================================= */}

            <div
              className="
                mt-6

                sm:mt-8
              "
            >
              <Link
                href="/proyectos"
                className="
                  inline-flex
                  h-[52px]
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#A36A33]
                  px-7
                  text-[15px]
                  font-bold
                  text-white
                  shadow-xl
                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:bg-[#8E5C2C]
                  hover:shadow-2xl

                  sm:h-[54px]
                  sm:px-9
                  sm:text-base
                "
              >
                Ver proyectos
              </Link>
            </div>

          </motion.div>
        </div>
      </div>

      {/* =====================================================
          INFORMACIÓN DERECHA
          SOLO PC
      ===================================================== */}

      <div
        className="
          absolute
          bottom-24
          right-8
          z-20
          hidden
          lg:block
          xl:right-16
        "
      >
        <div
          className="
            border-l
            border-white/40
            pl-6
          "
        >
          <p
            className="
              text-xs
              uppercase
              tracking-[0.3em]
              text-white/60
            "
          >
            Diseño
          </p>

          <p className="mt-2 text-sm font-semibold text-white">
            Fabricación a medida
          </p>

          <p className="mt-1 text-sm font-semibold text-white">
            Instalación profesional
          </p>
        </div>
      </div>

      {/* =====================================================
          INDICADORES
      ===================================================== */}

      <div
        className="
          absolute
          bottom-7
          left-0
          right-0
          z-30
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-[1500px]
            items-center
            justify-between
            px-6

            sm:px-10

            lg:px-16
            xl:px-20
          "
        >

          {/* PUNTOS */}

          <div className="flex items-center gap-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentImage(index)}
                aria-label={`Mostrar imagen ${index + 1}`}
                className={`
                  h-1.5
                  rounded-full
                  transition-all
                  duration-500

                  ${
                    currentImage === index
                      ? "w-12 bg-[#D6A13A]"
                      : "w-2.5 bg-white/60 hover:bg-white"
                  }
                `}
              />
            ))}
          </div>

          {/* CONTADOR */}

          <div
            className="
              flex
              items-center
              gap-3
              text-sm
              text-white
            "
          >
            <span className="font-bold">
              {String(currentImage + 1).padStart(2, "0")}
            </span>

            <span className="h-px w-8 bg-white/50" />

            <span className="text-white/60">
              {String(heroImages.length).padStart(2, "0")}
            </span>
          </div>

        </div>
      </div>

      {/* =====================================================
          INFORMACIÓN MÓVIL
          ELIMINADA PARA QUE NO SE MONTE CON EL TEXTO
      ===================================================== */}

    </section>
  );
}