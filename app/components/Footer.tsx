"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  Clock,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#3A2E24] text-[#E8E2DA]">

      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">

        {/* =========================================
            CONTENIDO PRINCIPAL
        ========================================= */}

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-14">


          {/* =========================================
              COLUMNA 1 — LOGO
          ========================================= */}

          <div className="flex flex-col items-center text-center md:items-start md:text-left">

            <Image
              src="/images/logo2026.png"
              alt="Estanterías MSC del Sur"
              width={260}
              height={95}
              priority
              className="
                h-auto
                w-[220px]
                object-contain
                sm:w-[240px]
                lg:w-[260px]
              "
            />

            <p
              className="
                mt-6
                max-w-[430px]
                text-[14px]
                leading-7
                text-[#D7CEC5]
                sm:text-[15px]
              "
            >
              Diseñamos, fabricamos e instalamos muebles a medida
              para viviendas, oficinas y comercios con acabados
              de alta calidad.
            </p>


            {/* Sevilla · España */}

            <div className="mt-7 flex items-center gap-3">

              <span className="h-[2px] w-8 bg-[#C48A4A]" />

              <span
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.22em]
                  text-[#C48A4A]
                "
              >
                Sevilla · España
              </span>

            </div>

          </div>



          {/* =========================================
              COLUMNA 2 — NAVEGACIÓN
          ========================================= */}

          <div className="text-center md:text-left">

            {/* Título */}

            <div className="mb-7 flex items-center justify-center gap-3 md:justify-start">

              <span className="h-[2px] w-8 bg-[#C48A4A]" />

              <h3 className="text-[18px] font-bold text-white">
                Navegación
              </h3>

            </div>


            {/* Enlaces */}

            <nav>

              <ul className="space-y-4">

                <li>
                  <Link
                    href="/"
                    className="
                      text-[15px]
                      text-[#E8E2DA]
                      transition-colors
                      duration-200
                      hover:text-[#C48A4A]
                    "
                  >
                    Inicio
                  </Link>
                </li>

                <li>
                  <Link
                    href="/#services"
                    className="
                      text-[15px]
                      text-[#E8E2DA]
                      transition-colors
                      duration-200
                      hover:text-[#C48A4A]
                    "
                  >
                    Servicios
                  </Link>
                </li>

                <li>
                  <Link
                    href="/catalogo"
                    className="
                      text-[15px]
                      text-[#E8E2DA]
                      transition-colors
                      duration-200
                      hover:text-[#C48A4A]
                    "
                  >
                    Catálogo
                  </Link>
                </li>

                <li>
                  <Link
                    href="/#contact"
                    className="
                      text-[15px]
                      text-[#E8E2DA]
                      transition-colors
                      duration-200
                      hover:text-[#C48A4A]
                    "
                  >
                    Contacto
                  </Link>
                </li>

              </ul>

            </nav>

          </div>



          {/* =========================================
              COLUMNA 3 — CONTACTO
              2 COLUMNAS × 2 FILAS
          ========================================= */}

          <div className="text-center md:text-left">

            {/* Título */}

            <div className="mb-7 flex items-center justify-center gap-3 md:justify-start">

              <span className="h-[2px] w-8 bg-[#C48A4A]" />

              <h3 className="text-[18px] font-bold text-white">
                Contacto
              </h3>

            </div>


            {/* =====================================
                CONTACTOS
            ===================================== */}

            <div
              className="
                grid
                grid-cols-1
                gap-5
                sm:grid-cols-2
                md:grid-cols-2
                md:gap-x-7
                md:gap-y-6
              "
            >


              {/* ================================
                  TELÉFONO
              ================================= */}

              <a
                href="tel:+34641176821"
                className="
                  group
                  flex
                  items-center
                  gap-3
                  justify-center
                  md:justify-start
                "
              >

                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#C48A4A]/40
                    bg-[#C48A4A]/10
                    text-[#C48A4A]
                    transition-all
                    duration-200
                    group-hover:bg-[#C48A4A]
                    group-hover:text-white
                  "
                >
                  <Phone
                    size={17}
                    strokeWidth={1.8}
                  />
                </div>


                <div className="text-left">

                  <p
                    className="
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-[#C48A4A]
                    "
                  >
                    Teléfono
                  </p>

                  <p
                    className="
                      mt-1
                      whitespace-nowrap
                      text-[14px]
                      text-[#E8E2DA]
                    "
                  >
                    +34 641 17 68 21
                  </p>

                </div>

              </a>



              {/* ================================
                  CORREO
              ================================= */}

              <a
                href="mailto:mueblesdelsur.es@gmail.com"
                className="
                  group
                  flex
                  items-center
                  gap-3
                  justify-center
                  md:justify-start
                "
              >

                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#C48A4A]/40
                    bg-[#C48A4A]/10
                    text-[#C48A4A]
                    transition-all
                    duration-200
                    group-hover:bg-[#C48A4A]
                    group-hover:text-white
                  "
                >
                  <Mail
                    size={17}
                    strokeWidth={1.8}
                  />
                </div>


                <div className="min-w-0 text-left">

                  <p
                    className="
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-[#C48A4A]
                    "
                  >
                    Correo
                  </p>

                  <p
                    className="
                      mt-1
                      text-[13px]
                      text-[#E8E2DA]
                      lg:text-[14px]
                    "
                  >
                    mueblesdelsur.es@gmail.com
                  </p>

                </div>

              </a>



              {/* ================================
                  HORARIO
              ================================= */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                  justify-center
                  md:justify-start
                "
              >

                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#C48A4A]/40
                    bg-[#C48A4A]/10
                    text-[#C48A4A]
                  "
                >
                  <Clock
                    size={17}
                    strokeWidth={1.8}
                  />
                </div>


                <div className="text-left">

                  <p
                    className="
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-[#C48A4A]
                    "
                  >
                    Horario
                  </p>

                  <p
                    className="
                      mt-1
                      text-[14px]
                      leading-5
                      text-[#E8E2DA]
                    "
                  >
                    Lunes a sábado
                    <br />
                    9:00 - 18:00
                  </p>

                </div>

              </div>



              {/* ================================
                  UBICACIÓN
              ================================= */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                  justify-center
                  md:justify-start
                "
              >

                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#C48A4A]/40
                    bg-[#C48A4A]/10
                    text-[#C48A4A]
                  "
                >
                  <MapPin
                    size={17}
                    strokeWidth={1.8}
                  />
                </div>


                <div className="text-left">

                  <p
                    className="
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-[#C48A4A]
                    "
                  >
                    Ubicación
                  </p>

                  <p
                    className="
                      mt-1
                      text-[14px]
                      text-[#E8E2DA]
                    "
                  >
                    Sevilla, España
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>



        {/* =========================================
            LÍNEA INFERIOR
        ========================================= */}

        <div
          className="
            mt-12
            border-t
            border-[#5A4635]
            pt-6
          "
        >

          <div
            className="
              flex
              flex-col
              items-center
              justify-between
              gap-4
              text-center
              md:flex-row
              md:text-left
            "
          >

            {/* Copyright */}

            <p className="text-[13px] text-[#BFAF9F] sm:text-[14px]">
              © {new Date().getFullYear()} Estanterías MSC ·
              Todos los derechos reservados.
            </p>


            {/* Enlaces legales */}

            <div className="flex items-center gap-5">

              <Link
                href="/aviso-legal"
                className="
                  text-[13px]
                  text-[#BFAF9F]
                  transition-colors
                  hover:text-[#C48A4A]
                "
              >
                Aviso legal
              </Link>

              <Link
                href="/politica-privacidad"
                className="
                  text-[13px]
                  text-[#BFAF9F]
                  transition-colors
                  hover:text-[#C48A4A]
                "
              >
                Privacidad
              </Link>

              <Link
                href="/politica-cookies"
                className="
                  text-[13px]
                  text-[#BFAF9F]
                  transition-colors
                  hover:text-[#C48A4A]
                "
              >
                Cookies
              </Link>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}