"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#3A2E24] text-[#E8E2DA]">

      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-3 md:text-left">

          {/* Logo */}

          <div className="flex flex-col items-center md:items-start">

            <Image
              src="/images/logo2026.png"
              alt="Estanterías MSC"
              width={220}
              height={80}
              className="h-auto w-56 object-contain sm:w-64"
            />

            <p className="mt-6 max-w-sm text-sm leading-7 text-[#D7CEC5]">
              Diseñamos, fabricamos e instalamos muebles a medida para
              viviendas, oficinas y comercios con acabados de alta calidad.
            </p>

          </div>

          {/* Navegación */}

          <div>

            <h3 className="mb-6 text-xl font-semibold text-white">
              Navegación
            </h3>

            <ul className="space-y-4">

              <li>
                <Link
                  href="/"
                  className="transition hover:text-[#C48A4A]"
                >
                  Inicio
                </Link>
              </li>

              <li>
                <Link
                  href="/#services"
                  className="transition hover:text-[#C48A4A]"
                >
                  Servicios
                </Link>
              </li>

              <li>
                <Link
                  href="/catalogo"
                  className="transition hover:text-[#C48A4A]"
                >
                  Catálogo
                </Link>
              </li>

              <li>
                <Link
                  href="/#contact"
                  className="transition hover:text-[#C48A4A]"
                >
                  Contacto
                </Link>
              </li>

            </ul>

          </div>

          {/* Contacto */}

          <div>

            <h3 className="mb-6 text-xl font-semibold text-white">
              Contacto
            </h3>

            <div className="space-y-5">

              <a
                href="tel:+34641176821"
                className="flex items-center justify-center gap-3 transition hover:text-[#C48A4A] md:justify-start"
              >
                <Phone size={20} className="text-[#C48A4A]" />
                <span>+34 641 17 68 21</span>
              </a>

              <a
                href="mailto:mueblesdelsur.es@gmail.com"
                className="flex items-center justify-center gap-3 transition hover:text-[#C48A4A] md:justify-start"
              >
                <Mail size={20} className="text-[#C48A4A]" />
                <span>mueblesdelsur.es@gmail.com</span>
              </a>

              <div className="flex items-center justify-center gap-3 md:justify-start">
                <Clock size={20} className="text-[#C48A4A]" />
                <span>Lunes a sábado · 9:00 - 18:00</span>
              </div>

            </div>

          </div>

        </div>

        {/* Línea inferior */}

        <div className="mt-12 border-t border-[#5A4635] pt-6 text-center text-sm text-[#BFAF9F]">

          © {new Date().getFullYear()} Estanterías MSC · Todos los derechos reservados.

        </div>

      </div>

    </footer>
  );
}