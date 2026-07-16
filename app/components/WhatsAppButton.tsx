"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/34641176821?text=Hola,%20me%20gustaría%20solicitar%20información%20sobre%20un%20mueble%20a%20medida."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-green-500/40"
      aria-label="Contactar por WhatsApp"
    >
      <FaWhatsapp size={36} />
    </a>
  );
}