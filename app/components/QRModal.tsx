"use client";

import QRCode from "react-qr-code";

interface QRModalProps {
  open: boolean;
  onClose: () => void;
  url: string;
}

export default function QRModal({
  open,
  onClose,
  url,
}: QRModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70">

      <div className="w-[90%] max-w-md rounded-3xl bg-white p-8 shadow-2xl">

        <h2 className="text-3xl font-bold text-[#2C241C] text-center">
          Ver en tu móvil
        </h2>

        <p className="mt-4 text-center text-gray-600 leading-7">
          Escanea este código QR con tu teléfono para abrir este modelo y visualizarlo en Realidad Aumentada.
        </p>

        <div className="mt-8 flex justify-center rounded-2xl bg-white p-4">
          <QRCode value={url} size={220} />
        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full rounded-2xl bg-[#A36A33] py-4 text-lg font-bold text-white hover:bg-[#8B5A2B] transition"
        >
          Cerrar
        </button>

      </div>

    </div>
  );
}