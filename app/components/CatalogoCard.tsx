"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import type { ShopifyVariant } from "@/app/lib/shopify-products";

interface CatalogoCardProps {
  nombre: string;
  referencia: string;
  descripcion?: string;
  imagen: string | null;
  precio: string;
  moneda?: string;
  disponible: boolean;
  handle: string;
  variants: ShopifyVariant[];
}

export default function CatalogoCard({
  nombre,
  referencia,
  descripcion,
  imagen,
  precio,
  moneda = "EUR",
  disponible,
  handle,
  variants,
}: CatalogoCardProps) {
  // =========================================================
  // VARIANTES
  // =========================================================

  const variantesReales = useMemo<ShopifyVariant[]>(() => {
    if (!Array.isArray(variants)) {
      return [];
    }

    return variants.filter(
      (variant) =>
        variant &&
        variant.title &&
        variant.title !== "Default Title"
    );
  }, [variants]);

  // =========================================================
  // VARIANTE SELECCIONADA
  // =========================================================

  const [varianteSeleccionada, setVarianteSeleccionada] =
    useState<ShopifyVariant | null>(null);

  // =========================================================
  // CANTIDAD
  // =========================================================

  const [cantidad, setCantidad] = useState<number>(1);

  // =========================================================
  // PRECIO
  // =========================================================

  const precioActual =
    varianteSeleccionada?.price?.amount ?? precio;

  const monedaActual =
    varianteSeleccionada?.price?.currencyCode ?? moneda;

  const precioFormateado = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: monedaActual,
  }).format(Number(precioActual));

  // =========================================================
  // DISPONIBILIDAD
  // =========================================================

  const disponibleActual =
    varianteSeleccionada?.availableForSale ?? disponible;

  // =========================================================
  // WHATSAPP
  // =========================================================

  const telefono = "34641176821";

  const mensaje =
    `Hola, estoy interesado en el producto "${nombre}" ` +
    `(${referencia})` +
    (varianteSeleccionada
      ? `, variante: ${varianteSeleccionada.title}`
      : "") +
    `. Cantidad: ${cantidad}.`;

  const whatsappUrl =
    `https://wa.me/${telefono}?text=${encodeURIComponent(
      mensaje
    )}`;

  // =========================================================
  // CANTIDAD
  // =========================================================

  const disminuirCantidad = () => {
    setCantidad((actual) => Math.max(1, actual - 1));
  };

  const aumentarCantidad = () => {
    setCantidad((actual) => actual + 1);
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-[#E9E2D9] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* IMAGEN */}

      <Link
        href={`/catalogo/${handle}`}
        className="relative block aspect-square w-full overflow-hidden bg-[#F7F2EC]"
      >
        {imagen ? (
          <Image
            src={imagen}
            alt={nombre}
            fill
            sizes="(max-width: 639px) 50vw, (max-width: 1023px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            Sin imagen
          </div>
        )}
      </Link>

      {/* INFORMACIÓN */}

      <div className="flex flex-1 flex-col p-4 sm:p-5">

        {/* NOMBRE */}

        <Link href={`/catalogo/${handle}`}>
          <h2 className="line-clamp-2 text-base font-bold leading-tight text-[#2C241C] transition-colors hover:text-[#A36A33] sm:text-lg">
            {nombre}
          </h2>
        </Link>

        {/* REFERENCIA */}

        <p className="mt-2 line-clamp-1 text-xs text-gray-500 sm:text-sm">
          Ref. {referencia}
        </p>

        {/* PRECIO */}

        <div className="mt-4 rounded-2xl bg-[#F7F2EC] px-4 py-3">
          <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500 sm:text-xs">
            Desde
          </p>

          <p className="mt-0.5 text-2xl font-bold text-[#2C241C] sm:text-3xl">
            {precioFormateado}
          </p>
        </div>

        {/* DESCRIPCIÓN */}

        {descripcion && (
          <p className="mt-4 line-clamp-2 text-xs leading-5 text-gray-600 sm:text-sm">
            {descripcion}
          </p>
        )}

        {/* VARIANTES */}

        {variantesReales.length > 0 && (
          <div className="mt-4">
            <label
              htmlFor={`variante-${handle}`}
              className="mb-2 block text-sm font-semibold text-[#2C241C]"
            >
              Opciones
            </label>

            <select
              id={`variante-${handle}`}
              value={varianteSeleccionada?.id ?? ""}
              onChange={(event) => {
                const nuevaVariante =
                  variantesReales.find(
                    (variant) =>
                      variant.id === event.target.value
                  ) ?? null;

                setVarianteSeleccionada(nuevaVariante);
              }}
              className="w-full rounded-xl border border-[#E4DDD5] bg-white px-3 py-3 text-xs text-[#2C241C] outline-none transition focus:border-[#A36A33] focus:ring-2 focus:ring-[#A36A33]/20 sm:text-sm"
            >
              <option value="">
                Seleccionar opción
              </option>

              {variantesReales.map((variant) => (
                <option
                  key={variant.id}
                  value={variant.id}
                  disabled={!variant.availableForSale}
                >
                  {variant.title}
                  {!variant.availableForSale
                    ? " — No disponible"
                    : ""}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* CANTIDAD */}

        <div className="mt-4">
          <p className="mb-2 text-sm font-semibold text-[#2C241C]">
            Cantidad
          </p>

          <div className="flex h-11 w-full max-w-[170px] items-center justify-between rounded-xl border border-[#E4DDD5] bg-white">
            <button
              type="button"
              onClick={disminuirCantidad}
              className="flex h-full w-12 items-center justify-center text-lg font-medium text-gray-600 transition hover:text-[#A36A33]"
              aria-label="Disminuir cantidad"
            >
              −
            </button>

            <span className="text-sm font-semibold text-[#2C241C]">
              {cantidad}
            </span>

            <button
              type="button"
              onClick={aumentarCantidad}
              className="flex h-full w-12 items-center justify-center text-lg font-medium text-gray-600 transition hover:text-[#A36A33]"
              aria-label="Aumentar cantidad"
            >
              +
            </button>
          </div>
        </div>

        {/* ESTADO */}

        <div className="mt-4 flex items-center justify-between border-t border-[#EEE8E1] pt-4">
          <span className="text-xs font-medium text-gray-500 sm:text-sm">
            Estado
          </span>

          {disponibleActual ? (
            <span className="rounded-full bg-[#DCF7E8] px-3 py-1 text-xs font-semibold text-[#16834A]">
              Disponible
            </span>
          ) : (
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
              Consultar
            </span>
          )}
        </div>

        {/* COMPRAR */}

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#211E1B] px-4 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-[#A36A33]"
        >
          🛒 Comprar
        </a>
      </div>
    </article>
  );
}