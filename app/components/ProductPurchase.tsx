"use client";

import { useMemo, useState } from "react";
import type { ShopifyVariant } from "../lib/shopify-products";

interface ProductPurchaseProps {
  productTitle: string;
  variants: ShopifyVariant[];
  availableForSale: boolean;
}

export default function ProductPurchase({
  productTitle,
  variants,
  availableForSale,
}: ProductPurchaseProps) {
  const variantesDisponibles = useMemo(() => {
    return Array.isArray(variants) ? variants : [];
  }, [variants]);

  const primeraDisponible =
    variantesDisponibles.find(
      (variant) => variant.availableForSale
    ) ||
    variantesDisponibles[0] ||
    null;

  const [variantId, setVariantId] = useState<string>(
    primeraDisponible?.id || ""
  );

  const [cantidad, setCantidad] = useState<number>(1);

  const [loading, setLoading] = useState(false);

  const [mensaje, setMensaje] = useState("");

  const [error, setError] = useState("");

  const varianteSeleccionada =
    variantesDisponibles.find(
      (variant) => variant.id === variantId
    ) || null;

  /*
   * =========================================================
   * CANTIDAD
   * =========================================================
   */

  const disminuirCantidad = () => {
    setCantidad((actual) => Math.max(1, actual - 1));
  };

  const aumentarCantidad = () => {
    setCantidad((actual) =>
      Math.min(999, actual + 1)
    );
  };

  const cambiarCantidad = (valor: string) => {
    if (valor === "") {
      return;
    }

    const numero = Number(valor);

    if (!Number.isFinite(numero)) {
      return;
    }

    setCantidad(
      Math.min(
        999,
        Math.max(1, Math.floor(numero))
      )
    );
  };

  /*
   * =========================================================
   * AGREGAR AL CARRITO
   * =========================================================
   */

  const agregarAlCarrito = async () => {
    setMensaje("");
    setError("");

    if (!availableForSale) {
      setError(
        "Este producto no está disponible actualmente."
      );
      return;
    }

    if (!varianteSeleccionada) {
      setError(
        "Selecciona una opción del producto."
      );
      return;
    }

    if (!varianteSeleccionada.availableForSale) {
      setError(
        "La opción seleccionada no está disponible."
      );
      return;
    }

    if (cantidad < 1) {
      setError(
        "La cantidad debe ser como mínimo 1."
      );
      return;
    }

    try {
      setLoading(true);

      const cartId =
        localStorage.getItem(
          "shopify-cart-id"
        ) || "";

      const response = await fetch(
        "/api/cart",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            cartId,
            variantId:
              varianteSeleccionada.id,
            quantity: cantidad,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "No se pudo agregar el producto al carrito."
        );
      }

      /*
       * Guardar carrito
       */

      if (data.cartId) {
        localStorage.setItem(
          "shopify-cart-id",
          data.cartId
        );
      }

      /*
       * Avisar al Header y al CartDrawer
       */

      window.dispatchEvent(
        new Event("cartUpdated")
      );

      /*
       * Mostrar mensaje
       */

      setMensaje(
        `${cantidad} ${
          cantidad === 1
            ? "unidad añadida"
            : "unidades añadidas"
        } al carrito.`
      );

      /*
       * Abrir carrito automáticamente
       */

      window.dispatchEvent(
        new Event("openCart")
      );

      /*
       * Ocultar mensaje después de unos segundos
       */

      setTimeout(() => {
        setMensaje("");
      }, 3000);
    } catch (err) {
      console.error(
        "Error agregando al carrito:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "No se pudo agregar el producto al carrito."
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * =========================================================
   * PRODUCTO NO DISPONIBLE
   * =========================================================
   */

  if (
    !availableForSale ||
    variantesDisponibles.length === 0
  ) {
    return (
      <div className="mt-10">
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
          Producto no disponible
        </div>
      </div>
    );
  }

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <div className="mt-8 space-y-6">

      {/* =====================================================
          VARIANTES
      ===================================================== */}

      {variantesDisponibles.length > 1 && (
        <div>
          <h2 className="mb-3 text-lg font-semibold text-[#2C241C]">
            Opciones disponibles
          </h2>

          <div className="space-y-3">
            {variantesDisponibles.map(
              (variant) => {
                const seleccionada =
                  variant.id === variantId;

                return (
                  <button
                    key={variant.id}
                    type="button"
                    disabled={
                      !variant.availableForSale
                    }
                    onClick={() => {
                      setVariantId(
                        variant.id
                      );

                      setError("");
                      setMensaje("");
                    }}
                    className={`
                      w-full rounded-xl border p-4 text-left transition
                      ${
                        seleccionada
                          ? "border-[#A36A33] bg-[#FCFAF7] shadow-sm"
                          : "border-[#E9E2D9] bg-white hover:border-[#A36A33]"
                      }

                      ${
                        !variant.availableForSale
                          ? "cursor-not-allowed opacity-50"
                          : ""
                      }
                    `}
                  >
                    <div className="flex items-center justify-between gap-4">

                      <div>
                        <p className="font-medium text-[#2C241C]">
                          {variant.title}
                        </p>

                        {variant.selectedOptions?.length >
                          0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {variant.selectedOptions.map(
                              (option) => (
                                <span
                                  key={`${variant.id}-${option.name}-${option.value}`}
                                  className="rounded-md bg-[#F6F1EA] px-2 py-1 text-xs text-[#6B6259]"
                                >
                                  {option.name}:{" "}
                                  {option.value}
                                </span>
                              )
                            )}
                          </div>
                        )}
                      </div>

                      <div className="text-right">

                        <p className="font-semibold text-[#A36A33]">
                          {Number(
                            variant.price.amount
                          ).toLocaleString(
                            "es-ES",
                            {
                              style: "currency",
                              currency:
                                variant.price
                                  .currencyCode,
                            }
                          )}
                        </p>

                        <p className="mt-1 text-xs text-[#6B6259]">
                          {variant.availableForSale
                            ? "Disponible"
                            : "Agotado"}
                        </p>

                      </div>

                    </div>
                  </button>
                );
              }
            )}
          </div>
        </div>
      )}

      {/* =====================================================
          UNA SOLA VARIANTE
      ===================================================== */}

      {variantesDisponibles.length === 1 &&
        varianteSeleccionada && (
          <div className="rounded-xl border border-[#E9E2D9] bg-white p-4">

            <div className="flex items-center justify-between gap-4">

              <div>

                <p className="font-medium text-[#2C241C]">
                  {varianteSeleccionada.title}
                </p>

                {varianteSeleccionada.selectedOptions?.length >
                  0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {varianteSeleccionada.selectedOptions.map(
                      (option) => (
                        <span
                          key={`${varianteSeleccionada.id}-${option.name}-${option.value}`}
                          className="rounded-md bg-[#F6F1EA] px-2 py-1 text-xs text-[#6B6259]"
                        >
                          {option.name}:{" "}
                          {option.value}
                        </span>
                      )
                    )}
                  </div>
                )}

              </div>

              <div className="text-right">

                <p className="font-semibold text-[#A36A33]">
                  {Number(
                    varianteSeleccionada.price.amount
                  ).toLocaleString(
                    "es-ES",
                    {
                      style: "currency",
                      currency:
                        varianteSeleccionada.price
                          .currencyCode,
                    }
                  )}
                </p>

                <p className="mt-1 text-xs text-[#6B6259]">
                  Disponible
                </p>

              </div>

            </div>

          </div>
        )}

      {/* =====================================================
          CANTIDAD
      ===================================================== */}

      <div>

        <h2 className="mb-3 text-lg font-semibold text-[#2C241C]">
          Cantidad
        </h2>

        <div className="flex w-fit items-center overflow-hidden rounded-xl border border-[#E9E2D9] bg-white">

          <button
            type="button"
            onClick={disminuirCantidad}
            disabled={
              cantidad <= 1 ||
              loading
            }
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              text-xl
              text-[#2C241C]
              transition
              hover:bg-[#F6F1EA]
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
            aria-label="Disminuir cantidad"
          >
            −
          </button>

          <input
            type="number"
            min={1}
            max={999}
            value={cantidad}
            onChange={(event) =>
              cambiarCantidad(
                event.target.value
              )
            }
            disabled={loading}
            className="
              h-12
              w-16
              border-x
              border-[#E9E2D9]
              bg-white
              text-center
              text-lg
              font-semibold
              text-[#2C241C]
              outline-none
            "
          />

          <button
            type="button"
            onClick={aumentarCantidad}
            disabled={
              cantidad >= 999 ||
              loading
            }
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              text-xl
              text-[#2C241C]
              transition
              hover:bg-[#F6F1EA]
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
            aria-label="Aumentar cantidad"
          >
            +
          </button>

        </div>

      </div>

      {/* =====================================================
          AGREGAR AL CARRITO
      ===================================================== */}

      <button
        type="button"
        onClick={agregarAlCarrito}
        disabled={
          loading ||
          !varianteSeleccionada ||
          !varianteSeleccionada.availableForSale
        }
        className="
          flex
          w-full
          items-center
          justify-center
          rounded-xl
          bg-[#A36A33]
          px-7
          py-4
          text-base
          font-semibold
          text-white
          transition
          hover:bg-[#7A4E24]
          disabled:cursor-not-allowed
          disabled:bg-[#C8B8A8]
          sm:w-auto
        "
      >
        {loading
          ? "Añadiendo..."
          : `Agregar al carrito (${cantidad})`}
      </button>

      {/* =====================================================
          MENSAJE ÉXITO
      ===================================================== */}

      {mensaje && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700">
          ✓ {mensaje}
        </div>
      )}

      {/* =====================================================
          MENSAJE ERROR
      ===================================================== */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

    </div>
  );
}