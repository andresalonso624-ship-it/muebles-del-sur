"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-gradient-to-b from-[#FCFAF7] to-[#F5EFE7]"
    >
      {/* Fondo decorativo */}
      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-[#A36A33]/10 blur-3xl lg:h-96 lg:w-96"></div>

      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#D6B48A]/20 blur-3xl lg:h-[450px] lg:w-[450px]"></div>

      <div className="relative mx-auto max-w-7xl px-5 pt-24 pb-16 sm:px-6 lg:px-8 lg:pt-32 lg:pb-24">

        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">

          {/* Texto */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
          >

            <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.30em] text-[#A36A33] sm:text-sm lg:text-left">
              Diseño • Fabricación • Instalación
            </p>

            <h1 className="text-center text-4xl font-extrabold leading-[1.05] text-[#2C241C] sm:text-5xl lg:text-left lg:text-7xl">
              Diseñamos,
              <br />
              fabricamos e
              <br />
              instalamos
              <br />
              muebles a medida.
            </h1>

            <div className="mx-auto mt-8 mb-8 h-1 w-24 rounded-full bg-[#A36A33] lg:mx-0"></div>

            <p className="mx-auto max-w-xl text-center text-base leading-8 text-gray-600 sm:text-lg lg:mx-0 lg:text-left lg:text-xl lg:leading-9">

              Diseñamos, fabricamos e instalamos cocinas, armarios,
              dormitorios, oficinas, tiendas y muebles completamente
              personalizados.

              <br />
              <br />

              Visualiza tu proyecto en 3D antes de fabricarlo y podrás
              verlo en tu hogar mediante Realidad Aumentada desde tu móvil.

            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">

              <Link
                href="/catalogo"
                className="w-full rounded-xl bg-[#A36A33] px-8 py-4 text-center font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-[#8E5C2C] sm:w-auto"
              >
                Ver Catálogo
              </Link>

              <Link
                href="/modelos"
                className="w-full rounded-xl border-2 border-[#A36A33] px-8 py-4 text-center font-semibold text-[#A36A33] transition-all duration-300 hover:bg-[#A36A33] hover:text-white sm:w-auto"
              >
                Explorar Modelos 3D
              </Link>

            </div>

          </motion.div>
                    {/* Imagen */}

          <motion.div
            className="relative order-first flex justify-center lg:order-last"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: "easeOut",
            }}
          >

            {/* Halo superior */}

            <div className="absolute -left-8 -top-8 h-48 w-48 rounded-full bg-[#A36A33]/20 blur-3xl lg:-left-12 lg:-top-12 lg:h-72 lg:w-72"></div>

            {/* Halo inferior */}

            <div className="absolute -bottom-8 -right-8 h-48 w-48 rounded-full bg-[#D6B48A]/25 blur-3xl lg:-bottom-12 lg:-right-12 lg:h-72 lg:w-72"></div>

            <Image
              src="/images/hero.jpg"
              alt="Muebles del Sur"
              width={1200}
              height={900}
              priority
              className="relative z-10 w-full max-w-[650px] rounded-3xl shadow-[0_35px_80px_rgba(0,0,0,.18)] transition duration-700 hover:scale-[1.02]"
            />
                        {/* Tarjeta flotante */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.7,
                duration: 0.6,
              }}
              className="absolute bottom-4 left-4 right-4 z-20 rounded-3xl border border-white bg-white/95 p-5 shadow-2xl backdrop-blur-xl lg:bottom-8 lg:left-8 lg:right-auto lg:max-w-sm lg:p-8"
            >

              <p className="text-xs font-bold uppercase tracking-[0.30em] text-[#A36A33] lg:text-sm">
                TECNOLOGÍA 3D
              </p>

              <h3 className="mt-3 text-xl font-bold leading-tight text-[#2C241C] lg:mt-4 lg:text-3xl">
                Visualiza tu proyecto antes de fabricarlo
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600 lg:mt-4 lg:text-base lg:leading-8">
                Muy pronto podrás colocar tus muebles en tu hogar mediante
                Realidad Aumentada utilizando únicamente tu móvil.
              </p>

            </motion.div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}