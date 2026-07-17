"use client";

import { useState } from "react";
import QRModal from "./QRModal";

interface Props {
  glb: string;
  usdz: string;
}

export default function ARButton({
  glb,
  usdz,
}: Props) {
  const [mostrarQR, setMostrarQR] = useState(false);

  const abrirAR = () => {
    const ua = navigator.userAgent;

    // Android
    if (/Android/i.test(ua)) {
      const fileUrl = `${window.location.origin}${glb}`;

      window.location.href =
        `intent://arvr.google.com/scene-viewer/1.0?file=${fileUrl}&mode=ar_preferred` +
        "#Intent;scheme=https;package=com.google.ar.core;end;";

      return;
    }

    // iPhone / iPad
    if (/iPhone|iPad|iPod/i.test(ua)) {
      window.location.href = `${window.location.origin}${usdz}`;
      return;
    }

    // Ordenador
    setMostrarQR(true);
  };

  return (
    <>
      <button
        onClick={abrirAR}
        className="mt-12 w-full rounded-2xl bg-[#A36A33] py-5 text-lg font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-[#8B5A2B]"
      >
        📱 Ver en mi espacio
      </button>

      <QRModal
        open={mostrarQR}
        onClose={() => setMostrarQR(false)}
        url={typeof window !== "undefined" ? window.location.href : ""}
      />
    </>
  );
}