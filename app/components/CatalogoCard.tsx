"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import ProductModal from "./ProductModal";
import type { ShopifyVariant } from "@/app/lib/shopify-products";

interface CatalogoCardProps {
  nombre: string;
  referencia: string;
  descripcion?: string;
  imagen: string | null;
  imagenes?: string[];
  precio: string;
  moneda?: string;
  disponible: boolean;
  handle: string;
  variants: ShopifyVariant[];
}

type TipoOpcion = "color" | "medida";

export default function CatalogoCard({
  nombre,
  referencia,
  descripcion,
  imagen,
  imagenes = [],
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
  // NORMALIZAR NOMBRE DE OPCIÓN
  // =========================================================

  const normalizar = (valor: string) =>
    valor.toLowerCase().trim();

  // =========================================================
  // OBTENER COLOR / MEDIDA
  // =========================================================

  const obtenerValorOpcion = (
    variant: ShopifyVariant,
    tipo: TipoOpcion
  ): string => {
    if (!Array.isArray(variant.selectedOptions)) {
      return "";
    }

    const opcion = variant.selectedOptions.find((item) => {
      const nombreOpcion = normalizar(item.name);

      if (tipo === "color") {
        return (
          nombreOpcion === "color" ||
          nombreOpcion === "colour"
        );
      }

      return (
        nombreOpcion === "medida" ||
        nombreOpcion === "medidas" ||
        nombreOpcion === "tamaño" ||
        nombreOpcion === "tamano" ||
        nombreOpcion === "size"
      );
    });

    return opcion?.value || "";
  };

  // =========================================================
  // COLORES DISPONIBLES
  // =========================================================

  const colores = useMemo<string[]>(() => {
    const valores = variantesReales
      .map((variant) =>
        obtenerValorOpcion(variant, "color")
      )
      .filter(Boolean);

    return Array.from(new Set(valores));
  }, [variantesReales]);

  // =========================================================
  // MEDIDAS DISPONIBLES
  // =========================================================

  const medidas = useMemo<string[]>(() => {
    const valores = variantesReales
      .map((variant) =>
        obtenerValorOpcion(variant, "medida")
      )
      .filter(Boolean);

    return Array.from(new Set(valores));
  }, [variantesReales]);

  // =========================================================
  // PRIMERA VARIANTE VÁLIDA
  // =========================================================

  const primeraVariante =
    variantesReales[0] || null;

  const primerColor = primeraVariante
    ? obtenerValorOpcion(
        primeraVariante,
        "color"
      )
    : "";

  const primeraMedida = primeraVariante
    ? obtenerValorOpcion(
        primeraVariante,
        "medida"
      )
    : "";

  // =========================================================
  // OPCIONES SELECCIONADAS
  // =========================================================

  const [
    colorSeleccionado,
    setColorSeleccionado,
  ] = useState<string>(primerColor);

  const [
    medidaSeleccionada,
    setMedidaSeleccionada,
  ] = useState<string>(primeraMedida);

  // =========================================================
  // COLORES COMPATIBLES CON LA MEDIDA
  // =========================================================

  const coloresDisponibles =
    useMemo(() => {
      return colores.filter((color) => {
        return variantesReales.some((variant) => {
          const colorVariant =
            obtenerValorOpcion(
              variant,
              "color"
            );

          const medidaVariant =
            obtenerValorOpcion(
              variant,
              "medida"
            );

          return (
            colorVariant === color &&
            (
              !medidaSeleccionada ||
              !medidas.length ||
              medidaVariant ===
                medidaSeleccionada
            )
          );
        });
      });
    }, [
      colores,
      variantesReales,
      medidaSeleccionada,
      medidas.length,
    ]);

  // =========================================================
  // MEDIDAS COMPATIBLES CON EL COLOR
  // =========================================================

  const medidasDisponibles =
    useMemo(() => {
      return medidas.filter((medida) => {
        return variantesReales.some((variant) => {
          const colorVariant =
            obtenerValorOpcion(
              variant,
              "color"
            );

          const medidaVariant =
            obtenerValorOpcion(
              variant,
              "medida"
            );

          return (
            medidaVariant === medida &&
            (
              !colorSeleccionado ||
              !colores.length ||
              colorVariant ===
                colorSeleccionado
            )
          );
        });
      });
    }, [
      medidas,
      variantesReales,
      colorSeleccionado,
      colores.length,
    ]);

  // =========================================================
  // VARIANTE SELECCIONADA
  // =========================================================

  const varianteSeleccionada =
    useMemo<ShopifyVariant | null>(() => {
      if (!variantesReales.length) {
        return null;
      }

      if (
        colores.length > 0 &&
        medidas.length > 0
      ) {
        return (
          variantesReales.find((variant) => {
            const color =
              obtenerValorOpcion(
                variant,
                "color"
              );

            const medida =
              obtenerValorOpcion(
                variant,
                "medida"
              );

            return (
              color === colorSeleccionado &&
              medida === medidaSeleccionada
            );
          }) || null
        );
      }

      if (colores.length > 0) {
        return (
          variantesReales.find((variant) => {
            const color =
              obtenerValorOpcion(
                variant,
                "color"
              );

            return (
              color === colorSeleccionado
            );
          }) || null
        );
      }

      if (medidas.length > 0) {
        return (
          variantesReales.find((variant) => {
            const medida =
              obtenerValorOpcion(
                variant,
                "medida"
              );

            return (
              medida === medidaSeleccionada
            );
          }) || null
        );
      }

      return variantesReales[0] || null;
    }, [
      variantesReales,
      colores.length,
      medidas.length,
      colorSeleccionado,
      medidaSeleccionada,
    ]);

  // =========================================================
  // CANTIDAD
  // =========================================================

  const [cantidad, setCantidad] =
    useState<number>(1);

  // =========================================================
  // GALERÍA
  // =========================================================

  const gallery = useMemo<string[]>(() => {
    const urls = [
      ...(imagen ? [imagen] : []),
      ...(Array.isArray(imagenes)
        ? imagenes
        : []),
    ].filter(Boolean);

    return Array.from(new Set(urls));
  }, [imagen, imagenes]);

  const [modalOpen, setModalOpen] =
    useState<boolean>(false);

  // =========================================================
  // PRECIO
  // =========================================================

  const precioActual =
    varianteSeleccionada?.price?.amount ??
    precio;

  const monedaActual =
    varianteSeleccionada?.price
      ?.currencyCode ?? moneda;

  const precioFormateado =
    new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: monedaActual,
    }).format(Number(precioActual));

  // =========================================================
  // DISPONIBILIDAD
  // =========================================================

  const disponibleActual =
    varianteSeleccionada
      ?.availableForSale ??
    disponible;

  // =========================================================
  // CAMBIAR COLOR
  // =========================================================

  const cambiarColor = (
    nuevoColor: string
  ) => {
    setColorSeleccionado(nuevoColor);

    if (
      medidas.length > 0 &&
      medidaSeleccionada
    ) {
      const existeCombinacion =
        variantesReales.some((variant) => {
          const color =
            obtenerValorOpcion(
              variant,
              "color"
            );

          const medida =
            obtenerValorOpcion(
              variant,
              "medida"
            );

          return (
            color === nuevoColor &&
            medida ===
              medidaSeleccionada
          );
        });

      if (!existeCombinacion) {
        const primeraMedidaCompatible =
          variantesReales.find(
            (variant) => {
              const color =
                obtenerValorOpcion(
                  variant,
                  "color"
                );

              return (
                color === nuevoColor
              );
            }
          );

        if (primeraMedidaCompatible) {
          setMedidaSeleccionada(
            obtenerValorOpcion(
              primeraMedidaCompatible,
              "medida"
            )
          );
        }
      }
    }
  };

  // =========================================================
  // CAMBIAR MEDIDA
  // =========================================================

  const cambiarMedida = (
    nuevaMedida: string
  ) => {
    setMedidaSeleccionada(
      nuevaMedida
    );

    if (
      colores.length > 0 &&
      colorSeleccionado
    ) {
      const existeCombinacion =
        variantesReales.some((variant) => {
          const color =
            obtenerValorOpcion(
              variant,
              "color"
            );

          const medida =
            obtenerValorOpcion(
              variant,
              "medida"
            );

          return (
            medida === nuevaMedida &&
            color === colorSeleccionado
          );
        });

      if (!existeCombinacion) {
        const primerColorCompatible =
          variantesReales.find(
            (variant) => {
              const medida =
                obtenerValorOpcion(
                  variant,
                  "medida"
                );

              return (
                medida === nuevaMedida
              );
            }
          );

        if (primerColorCompatible) {
          setColorSeleccionado(
            obtenerValorOpcion(
              primerColorCompatible,
              "color"
            )
          );
        }
      }
    }
  };

  // =========================================================
  // WHATSAPP
  // =========================================================

  const telefono = "34641176821";

  const colorParaMensaje =
    varianteSeleccionada
      ? obtenerValorOpcion(
          varianteSeleccionada,
          "color"
        )
      : colorSeleccionado;

  const medidaParaMensaje =
    varianteSeleccionada
      ? obtenerValorOpcion(
          varianteSeleccionada,
          "medida"
        )
      : medidaSeleccionada;

  const detallesVariante = [
    colorParaMensaje
      ? `Color: ${colorParaMensaje}`
      : "",
    medidaParaMensaje
      ? `Medida: ${medidaParaMensaje}`
      : "",
  ]
    .filter(Boolean)
    .join(", ");

  const mensaje =
    `Hola, estoy interesado en el producto "${nombre}" ` +
    `(${referencia})` +
    (
      detallesVariante
        ? `, ${detallesVariante}`
        : varianteSeleccionada
          ? `, variante: ${varianteSeleccionada.title}`
          : ""
    ) +
    `. Cantidad: ${cantidad}.`;

  const whatsappUrl =
    `https://wa.me/${telefono}?text=${encodeURIComponent(
      mensaje
    )}`;

  // =========================================================
  // CANTIDAD
  // =========================================================

  const disminuirCantidad = () => {
    setCantidad((actual) =>
      Math.max(1, actual - 1)
    );
  };

  const aumentarCantidad = () => {
    setCantidad((actual) =>
      actual + 1
    );
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <>
      <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-[#E9E2D9] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

        {/* =====================================================
            IMAGEN
        ===================================================== */}

        <button
          type="button"
          onClick={() => {
            if (gallery.length > 0) {
              setModalOpen(true);
            }
          }}
          aria-label={`Abrir galería de ${nombre}`}
          className="relative block aspect-square w-full overflow-hidden bg-[#F7F2EC] touch-manipulation"
        >
          {gallery.length > 0 ? (
            <Image
              src={gallery[0]}
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

          {gallery.length > 1 && (
            <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-semibold text-[#4A4035] shadow-sm sm:left-5 sm:top-5 sm:text-xs">
              +{gallery.length - 1} fotos
            </span>
          )}
        </button>

        {/* =====================================================
            INFORMACIÓN
        ===================================================== */}

        <div className="flex flex-1 flex-col p-4 sm:p-5">

          {/* NOMBRE */}

          <h2 className="line-clamp-2 text-base font-bold leading-tight text-[#2C241C] sm:text-lg">
            {nombre}
          </h2>

          {/* PRECIO */}

          <div className="mt-4 rounded-2xl bg-[#F7F2EC] px-4 py-3">
            <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500 sm:text-xs">
              {varianteSeleccionada &&
              (
                colorSeleccionado ||
                medidaSeleccionada
              )
                ? "Precio"
                : "Desde"}
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

          {/* COLOR */}

          {colores.length > 0 && (
            <div className="mt-4">
              <label
                htmlFor={`color-${handle}`}
                className="mb-2 block text-sm font-semibold text-[#2C241C]"
              >
                Color
              </label>

              <select
                id={`color-${handle}`}
                value={colorSeleccionado}
                onChange={(event) =>
                  cambiarColor(
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-[#E4DDD5] bg-white px-3 py-3 text-xs text-[#2C241C] outline-none transition focus:border-[#A36A33] focus:ring-2 focus:ring-[#A36A33]/20 sm:text-sm"
              >
                {coloresDisponibles.map(
                  (color) => (
                    <option
                      key={color}
                      value={color}
                    >
                      {color}
                    </option>
                  )
                )}
              </select>
            </div>
          )}

          {/* MEDIDA */}

          {medidas.length > 0 && (
            <div className="mt-4">
              <label
                htmlFor={`medida-${handle}`}
                className="mb-2 block text-sm font-semibold text-[#2C241C]"
              >
                Medida
              </label>

              <select
                id={`medida-${handle}`}
                value={medidaSeleccionada}
                onChange={(event) =>
                  cambiarMedida(
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-[#E4DDD5] bg-white px-3 py-3 text-xs text-[#2C241C] outline-none transition focus:border-[#A36A33] focus:ring-2 focus:ring-[#A36A33]/20 sm:text-sm"
              >
                {medidasDisponibles.map(
                  (medida) => (
                    <option
                      key={medida}
                      value={medida}
                    >
                      {medida}
                    </option>
                  )
                )}
              </select>
            </div>
          )}

          {/* OTRAS VARIANTES */}

          {variantesReales.length > 0 &&
          colores.length === 0 &&
          medidas.length === 0 && (
            <div className="mt-4">
              <label
                htmlFor={`variante-${handle}`}
                className="mb-2 block text-sm font-semibold text-[#2C241C]"
              >
                Opciones
              </label>

              <select
                id={`variante-${handle}`}
                value={
                  varianteSeleccionada?.id ??
                  ""
                }
                disabled
                className="w-full rounded-xl border border-[#E4DDD5] bg-white px-3 py-3 text-xs text-[#2C241C] outline-none sm:text-sm"
              >
                {variantesReales.map(
                  (variant) => (
                    <option
                      key={variant.id}
                      value={variant.id}
                    >
                      {variant.title}
                    </option>
                  )
                )}
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
            className="mt-4 flex w-full items-center justify-center rounded-2xl bg-[#211E1B] px-4 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-[#A36A33]"
          >
            Comprar
          </a>
        </div>
      </article>

      <ProductModal
        open={modalOpen}
        images={gallery}
        title={nombre}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}