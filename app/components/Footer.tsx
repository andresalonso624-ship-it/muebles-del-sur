"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, Clock, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#3A2E24] text-[#E8E2DA]">

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-14">

        {/* CONTENIDO PRINCIPAL */}
        <div
          className="
            grid
            grid-cols-1
            gap-10
            text-center
            md:grid-cols-3
            md:gap-12
            md:text-left
          "
        >

          {/* =========================
              LOGO + DESCRIPCIÓN
          ========================== */}

          <div className="flex flex-col items-center md:items-start">

            <Image
              src="/images/logo2026.png"
              alt="Estanterías MSC"
              width={220}
              height={80}
              className="
                h-auto
                w-52
                object-contain
                sm:w-56
                md:w-56
                lg:w-64
              "
            />

            <p
              className="
                mt-5
                max-w-[360px]
                text-[14px]
                leading-6
                text-[#D7CEC5]
                sm:text-sm
                sm:leading-7
              "
            >
              Diseñamos, fabricamos e instalamos muebles a medida para
              viviendas, oficinas y comercios con acabados de alta calidad.
            </p>

            {/* Solo móvil */}
            <div
              className="
                mt-6
                flex
                items-center
                gap-3
                md:hidden
              "
            >
              <span className="h-[1px] w-8 bg-[#C48A4A]" />

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

              <span className="h-[1px] w-8 bg-[#C48A4A]" />
            </div>

          </div>


          {/* =========================
              NAVEGACIÓN
          ========================== */}

          <div>

            <div
              className="
                mb-5
                flex
                items-center
                justify-center
                gap-3
                md:justify-start
              "
            >

              <span className="h-[2px] w-8 bg-[#C48A4A]" />

              <h3 className="text-xl font-semibold text-white">
                Navegación
              </h3>

            </div>

            <ul
              className="
                grid
                grid-cols-2
                gap-y-3
                text-[15px]
                sm:gap-y-4
                sm:text-base
                md:grid-cols-1
                md:gap-y-4
              "
            >

              <li>
                <Link
                  href="/"
                  className="
                    transition
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
                    transition
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
                    transition
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
                    transition
                    hover:text-[#C48A4A]
                  "
                >
                  Contacto
                </Link>
              </li>

            </ul>

          </div>


          {/* =========================
              CONTACTO
          ========================== */}

          <div>

            <div
              className="
                mb-6
                flex
                items-center
                justify-center
                gap-3
                md:justify-start
              "
            >

              <span className="h-[2px] w-8 bg-[#C48A4A]" />

              <h3 className="text-xl font-semibold text-white">
                Contacto
              </h3>

            </div>


            {/* DESKTOP
                Se mantiene igual:
                una columna
            */}

            <div className="hidden space-y-5 md:block">

              {/* TELÉFONO */}

              <a
                href="tel:+34641176821"
                className="
                  flex
                  items-center
                  gap-3
                  transition
                  hover:text-[#C48A4A]
                "
              >

                <Phone
                  size={20}
                  className="shrink-0 text-[#C48A4A]"
                />

                <span>
                  +34 641 17 68 21
                </span>

              </a>


              {/* CORREO */}

              <a
                href="mailto:mueblesdelsur.es@gmail.com"
                className="
                  flex
                  items-center
                  gap-3
                  transition
                  hover:text-[#C48A4A]
                "
              >

                <Mail
                  size={20}
                  className="shrink-0 text-[#C48A4A]"
                />

                <span>
                  mueblesdelsur.es@gmail.com
                </span>

              </a>


              {/* HORARIO */}

              <div className="flex items-center gap-3">

                <Clock
                  size={20}
                  className="shrink-0 text-[#C48A4A]"
                />

                <span>
                  Lunes a sábado · 9:00 - 18:00
                </span>

              </div>

            </div>


            {/* =========================
                MÓVIL
                2 COLUMNAS
            ========================== */}

            <div
              className="
                grid
                grid-cols-2
                gap-x-5
                gap-y-6
                md:hidden
              "
            >

              {/* TELÉFONO */}

              <a
                href="tel:+34641176821"
                className="
                  flex
                  flex-col
                  items-center
                  gap-2
                  text-center
                "
              >

                <span
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#765A3E]
                  "
                >

                  <Phone
                    size={18}
                    className="text-[#C48A4A]"
                  />

                </span>

                <span>

                  <span
                    className="
                      block
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-[#C48A4A]
                    "
                  >
                    Teléfono
                  </span>

                  <span
                    className="
                      mt-1
                      block
                      text-[13px]
                      text-[#E8E2DA]
                    "
                  >
                    +34 641 17 68 21
                  </span>

                </span>

              </a>


              {/* CORREO */}

              <a
                href="mailto:mueblesdelsur.es@gmail.com"
                className="
                  flex
                  flex-col
                  items-center
                  gap-2
                  text-center
                "
              >

                <span
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#765A3E]
                  "
                >

                  <Mail
                    size={18}
                    className="text-[#C48A4A]"
                  />

                </span>

                <span>

                  <span
                    className="
                      block
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-[#C48A4A]
                    "
                  >
                    Correo
                  </span>

                  <span
                    className="
                      mt-1
                      block
                      break-all
                      text-[12px]
                      text-[#E8E2DA]
                    "
                  >
                    mueblesdelsur.es@gmail.com
                  </span>

                </span>

              </a>


              {/* HORARIO */}

              <div
                className="
                  flex
                  flex-col
                  items-center
                  gap-2
                  text-center
                "
              >

                <span
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#765A3E]
                  "
                >

                  <Clock
                    size={18}
                    className="text-[#C48A4A]"
                  />

                </span>

                <span>

                  <span
                    className="
                      block
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-[#C48A4A]
                    "
                  >
                    Horario
                  </span>

                  <span
                    className="
                      mt-1
                      block
                      text-[12px]
                      leading-5
                      text-[#E8E2DA]
                    "
                  >
                    Lunes a sábado
                    <br />
                    9:00 - 18:00
                  </span>

                </span>

              </div>


              {/* UBICACIÓN */}

              <div
                className="
                  flex
                  flex-col
                  items-center
                  gap-2
                  text-center
                "
              >

                <span
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#765A3E]
                  "
                >

                  <MapPin
                    size={18}
                    className="text-[#C48A4A]"
                  />

                </span>

                <span>

                  <span
                    className="
                      block
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-[#C48A4A]
                    "
                  >
                    Ubicación
                  </span>

                  <span
                    className="
                      mt-1
                      block
                      text-[12px]
                      text-[#E8E2DA]
                    "
                  >
                    Sevilla, España
                  </span>

                </span>

              </div>

            </div>

          </div>

        </div>


        {/* =========================
            LÍNEA INFERIOR
        ========================== */}

        <div
          className="
            mt-9
            border-t
            border-[#5A4635]
            pt-5
            md:mt-12
            md:pt-6
          "
        >

          <div
            className="
              flex
              flex-col
              items-center
              gap-4
              text-center
              md:flex-row
              md:justify-between
            "
          >

            <p
              className="
                text-[12px]
                text-[#BFAF9F]
                sm:text-sm
              "
            >
              © {new Date().getFullYear()} Estanterías MSC ·
              Todos los derechos reservados.
            </p>


            <div
              className="
                flex
                items-center
                gap-5
                text-[12px]
                text-[#BFAF9F]
                sm:text-sm
              "
            >

              <Link
                href="/aviso-legal"
                className="transition hover:text-[#C48A4A]"
              >
                Aviso legal
              </Link>

              <Link
                href="/politica-privacidad"
                className="transition hover:text-[#C48A4A]"
              >
                Privacidad
              </Link>

              <Link
                href="/politica-cookies"
                className="transition hover:text-[#C48A4A]"
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