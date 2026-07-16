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

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const enlaces = [
    ["Servicios", "/#services"],
    ["Cómo trabajamos", "/#how"],
    ["¿Por qué elegirnos?", "/#why"],
    ["Catálogo", "/catalogo"],
    ["Contacto", "/#contact"],
  ];

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
          scroll
            ? "border-b border-[#E9E2D9] bg-white/95 shadow-lg backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-24 lg:px-8">

          {/* Logo */}
          <Link href="/">
            <Image
              src="/images/logo2026.png"
              alt="Muebles del Sur"
              width={180}
              height={60}
              priority
              className="h-14 w-auto object-contain transition-transform duration-300 hover:scale-105 lg:h-20"
            />
          </Link>

          {/* Menú escritorio */}
          <nav className="hidden items-center gap-10 lg:flex">
            {enlaces.map(([titulo, ruta]) => (
              <Link
                key={titulo}
                href={ruta}
                className="relative font-medium text-[#2C241C] transition-colors duration-300 hover:text-[#A36A33] after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-[#A36A33] after:transition-all after:duration-300 hover:after:w-full"
              >
                {titulo}
              </Link>
            ))}
          </nav>

          {/* Botón escritorio */}
          <Link
            href="/#contact"
            className="hidden rounded-full bg-[#A36A33] px-7 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#8B5A2B] hover:shadow-xl lg:block"
          >
            Solicitar presupuesto
          </Link>

          {/* Botón menú móvil */}
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#DDD] bg-white shadow lg:hidden"
            aria-label="Abrir menú"
          >
            <div className="space-y-1.5">
              <span
                className={`block h-0.5 w-6 bg-[#2C241C] transition ${
                  menuAbierto ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-[#2C241C] transition ${
                  menuAbierto ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-[#2C241C] transition ${
                  menuAbierto ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>

        </div>
      </motion.header>
            {/* Menú móvil */}
      <AnimatePresence>
        {menuAbierto && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="fixed left-0 top-20 z-40 w-full border-t border-[#E9E2D9] bg-white shadow-xl lg:hidden"
          >
            <div className="mx-auto max-w-7xl px-6 py-6">

              <nav className="flex flex-col gap-5">

                {enlaces.map(([titulo, ruta]) => (

                  <Link
                    key={titulo}
                    href={ruta}
                    onClick={() => setMenuAbierto(false)}
                    className="border-b border-gray-100 pb-3 text-lg font-medium text-[#2C241C] transition hover:text-[#A36A33]"
                  >
                    {titulo}
                  </Link>

                ))}

                <Link
                  href="/#contact"
                  onClick={() => setMenuAbierto(false)}
                  className="mt-3 rounded-xl bg-[#A36A33] px-6 py-4 text-center font-semibold text-white transition hover:bg-[#8B5A2B]"
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