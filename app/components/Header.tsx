"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [scroll, setScroll] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScroll(window.scrollY > 40);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const enlaces = [
    ["Servicios", "/#services"],
    ["Catálogo", "/catalogo"],
    ["Proyectos", "/proyectos"],
    ["Contacto", "/#contact"],
  ];

  return (
    <>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.7,
          ease: "easeOut",
        }}
        className={`
          fixed
          left-0
          top-0
          z-50
          w-full
          transition-all
          duration-500
          ${
            scroll
              ? "border-b border-[#E9E2D9] bg-white/95 shadow-md backdrop-blur-xl"
              : "border-b border-white/10 bg-transparent"
          }
        `}
      >

        {/* =================================================
            CONTENEDOR PRINCIPAL
        ================================================= */}

        <div
          className="
            mx-auto
            flex
            h-[72px]
            max-w-[1500px]
            items-center
            px-4
            sm:h-[80px]
            sm:px-6
            lg:h-[94px]
            lg:px-10
          "
        >

          {/* =================================================
              LOGO
          ================================================= */}

          <Link
            href="/"
            className="
              relative
              flex
              h-[58px]
              w-[150px]
              shrink-0
              items-center
              justify-center
              sm:h-[64px]
              sm:w-[170px]
              lg:ml-10
              lg:h-[82px]
              lg:w-[200px]
            "
            aria-label="Estanterías MSC del Sur - Inicio"
          >

            <Image
              src="/images/logo2026.png"
              alt="Estanterías MSC del Sur"
              fill
              priority
              sizes="(max-width: 640px) 150px, (max-width: 1024px) 170px, 200px"
              className="
                object-contain
                object-center
                transition-transform
                duration-300
                hover:scale-[1.03]
              "
            />

          </Link>


          {/* =================================================
              MENÚ ESCRITORIO
          ================================================= */}

          <nav
            className="
              hidden
              items-center
              gap-7
              lg:ml-8
              lg:flex
              xl:ml-10
              xl:gap-10
            "
          >

            {enlaces.map(([titulo, ruta]) => (

              <Link
                key={titulo}
                href={ruta}
                className={`
                  group
                  relative
                  px-1
                  py-3
                  text-[15px]
                  font-bold
                  tracking-[-0.01em]
                  transition-colors
                  duration-300

                  ${
                    scroll
                      ? "text-[#2C241C] hover:text-[#A36A33]"
                      : "text-white hover:text-[#D49A32]"
                  }
                `}
              >

                {titulo}

                <span
                  className={`
                    absolute
                    bottom-1
                    left-0
                    h-[2px]
                    w-0
                    rounded-full
                    transition-all
                    duration-300
                    group-hover:w-full

                    ${
                      scroll
                        ? "bg-[#A36A33]"
                        : "bg-[#D49A32]"
                    }
                  `}
                />

              </Link>

            ))}

          </nav>


          {/* =================================================
              BOTÓN PRESUPUESTO DESKTOP
          ================================================= */}

          <Link
            href="/#contact"
            className="
              ml-auto
              hidden
              rounded-full
              bg-[#A36A33]
              px-7
              py-3.5
              text-[14px]
              font-bold
              tracking-[-0.01em]
              text-white
              shadow-lg
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-[#8B5A2B]
              hover:shadow-xl
              lg:inline-flex
              lg:items-center
              lg:justify-center
              xl:px-8
            "
          >
            Solicitar presupuesto
          </Link>


          {/* =================================================
              BOTÓN MENÚ MÓVIL
          ================================================= */}

          <button
            type="button"
            onClick={() =>
              setMenuAbierto((prev) => !prev)
            }
            className={`
              ml-auto
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              transition-all
              duration-300
              lg:hidden

              ${
                scroll
                  ? "border-[#E4DED7] bg-white shadow-sm"
                  : "border-white/40 bg-black/20 backdrop-blur-sm"
              }
            `}
            aria-label={
              menuAbierto
                ? "Cerrar menú"
                : "Abrir menú"
            }
            aria-expanded={menuAbierto}
          >

            <div className="relative h-5 w-6">

              {/* Línea superior */}

              <span
                className={`
                  absolute
                  left-0
                  top-0
                  block
                  h-[2px]
                  w-6
                  rounded-full
                  transition-all
                  duration-300

                  ${
                    scroll
                      ? "bg-[#2C241C]"
                      : "bg-white"
                  }

                  ${
                    menuAbierto
                      ? "top-2 rotate-45"
                      : ""
                  }
                `}
              />


              {/* Línea central */}

              <span
                className={`
                  absolute
                  left-0
                  top-2
                  block
                  h-[2px]
                  w-6
                  rounded-full
                  transition-all
                  duration-300

                  ${
                    scroll
                      ? "bg-[#2C241C]"
                      : "bg-white"
                  }

                  ${
                    menuAbierto
                      ? "opacity-0"
                      : ""
                  }
                `}
              />


              {/* Línea inferior */}

              <span
                className={`
                  absolute
                  left-0
                  top-4
                  block
                  h-[2px]
                  w-6
                  rounded-full
                  transition-all
                  duration-300

                  ${
                    scroll
                      ? "bg-[#2C241C]"
                      : "bg-white"
                  }

                  ${
                    menuAbierto
                      ? "top-2 -rotate-45"
                      : ""
                  }
                `}
              />

            </div>

          </button>

        </div>

      </motion.header>


      {/* =====================================================
          MENÚ MÓVIL
      ===================================================== */}

      <AnimatePresence>

        {menuAbierto && (

          <motion.div
            initial={{
              opacity: 0,
              y: -15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -15,
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            className="
              fixed
              left-0
              top-[72px]
              z-40
              w-full
              border-b
              border-[#E9E2D9]
              bg-white
              shadow-xl
              sm:top-[80px]
              lg:hidden
            "
          >

            <div
              className="
                mx-auto
                w-full
                max-w-7xl
                px-5
                py-4
                sm:px-6
                sm:py-5
              "
            >

              <nav className="flex flex-col">

                {enlaces.map(([titulo, ruta]) => (

                  <Link
                    key={titulo}
                    href={ruta}
                    onClick={() =>
                      setMenuAbierto(false)
                    }
                    className="
                      border-b
                      border-[#EEE9E3]
                      py-4
                      text-[16px]
                      font-bold
                      tracking-[-0.01em]
                      text-[#2C241C]
                      transition-colors
                      duration-200
                      hover:text-[#A36A33]
                      sm:py-5
                      sm:text-[17px]
                    "
                  >
                    {titulo}
                  </Link>

                ))}


                {/* =================================================
                    BOTÓN PRESUPUESTO MÓVIL
                ================================================= */}

                <Link
                  href="/#contact"
                  onClick={() =>
                    setMenuAbierto(false)
                  }
                  className="
                    mt-5
                    flex
                    min-h-[52px]
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#A36A33]
                    px-6
                    py-3
                    text-center
                    text-[15px]
                    font-bold
                    tracking-wide
                    text-white
                    shadow-md
                    transition-all
                    duration-300
                    hover:bg-[#8B5A2B]
                    sm:text-[16px]
                  "
                >
                  Solicitar presupuesto
                </Link>

              </nav>

            </div>

          </motion.div>

        )}

      </AnimatePresence>
    </>
  );
}