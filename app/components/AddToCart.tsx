"use client";

import { useState } from "react";

export interface AddToCartVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: {
    amount: string;
    currencyCode: string;
  };
  selectedOptions: {
    name: string;
    value: string;
  }[];
}

interface AddToCartProps {
  variants: AddToCartVariant[];
  productAvailable: boolean;
}

export default function AddToCart({
  variants,
  productAvailable,
}: AddToCartProps) {
  const variantesDisponibles = variants.filter(
    (variant) => variant.availableForSale
  );

  const primeraVariante =
    variantesDisponibles[0] ?? variants[0] ?? null;

  const [selectedVariantId, setSelectedVariantId] =
    useState<string>(
      primeraVariante?.id ?? ""
    );

  const [quantity, setQuantity] =
    useState<number>(1);

  const [loading, setLoading] =
    useState(false);

  const [mensaje, setMensaje] =
    useState<string>("");

  const [error, setError] =
    useState<string>("");

  const selectedVariant =
    variants.find(
      (variant) =>
        variant.id === selectedVariantId
    ) ?? null;

  const disminuirCantidad = () => {
    setQuantity((actual) =>
      Math.max(1, actual - 1)
    );
  };

  const aumentarCantidad = () => {
    setQuantity((actual) =>
      Math.min(999, actual + 1)
    );
  };

  const cambiarCantidad = (
    value: string
  ) => {
    const numero = Number(value);

    if (!Number.isFinite(numero)) {
      setQuantity(1);
      return;
    }

    setQuantity(
      Math.min(
        999,
        Math.max(1, Math.floor(numero))
      )
    );
  };

  const agregarAlCarrito = async () => {
    if (!selectedVariantId) {
      setError(
        "Selecciona una opción del producto."
      );
      return;
    }

    if (!selectedVariant?.availableForSale) {
      setError(
        "Esta variante no está disponible."
      );
      return;
    }

    try {
      setLoading(true);
      setMensaje("");
      setError("");

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
            variantId:
              selectedVariantId,
            cartId,
            quantity,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "No se pudo agregar el producto al carrito."
        );
      }

      if (data.cartId) {
        localStorage.setItem(
          "shopify-cart-id",
          data.cartId
        );
      }

      window.dispatchEvent(
        new Event("cartUpdated")
      );

      setMensaje(
        `${quantity} ${
          quantity === 1
            ? "unidad añadida"
            : "unidades añadidas"
        } al carrito.`
      );

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

  if (
    !productAvailable ||
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

  return (
    <div className="mt-8 space-y-6">

      {/* VARIANTES */}
      {variants.length > 1 && (
        <div>
          <h2 className="mb-3 text-lg font-semibold text-[#2C241C]">
            Opciones disponibles
          </h2>

          <div className="space-y-3">
            {variants.map(
              (variant) => {
                const seleccionada =
                  variant.id ===
                  selectedVariantId;

                return (
                  <button
                    key={variant.id}
                    type="button"
                    disabled={
                      !variant.availableForSale
                    }
                    onClick={() => {
                      setSelectedVariantId(
                        variant.id
                      );
                      setError("");
                      setMensaje("");
                    }}
                    className={`w-full rounded-xl border p-4 text-left transition ${
                      seleccionada
                        ? "border-[#A36A33] bg-[#FCFAF7] shadow-sm"
                        : "border-[#E9E2D9] bg-white hover:border-[#A36A33]"
                    } ${
                      !variant.availableForSale
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">

                      <div>
                        <p className="font-medium text-[#2C241C]">
                          {variant.title}
                        </p>

                        {variant
                          .selectedOptions
                          ?.length > 0 && (
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
                              style:
                                "currency",
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

      {/* SI SOLO HAY UNA VARIANTE */}
      {variants.length === 1 &&
        selectedVariant && (
          <div className="rounded-xl border border-[#E9E2D9] bg-white p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-medium text-[#2C241C]">
                  {selectedVariant.title}
                </p>

                {selectedVariant
                  .selectedOptions
                  ?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedVariant.selectedOptions.map(
                      (option) => (
                        <span
                          key={`${selectedVariant.id}-${option.name}-${option.value}`}
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
                    selectedVariant.price.amount
                  ).toLocaleString(
                    "es-ES",
                    {
                      style:
                        "currency",
                      currency:
                        selectedVariant
                          .price
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

      {/* CANTIDAD */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-[#2C241C]">
          Cantidad
        </h2>

        <div className="flex w-fit items-center overflow-hidden rounded-xl border border-[#E9E2D9] bg-white">

          <button
            type="button"
            onClick={disminuirCantidad}
            disabled={
              quantity <= 1 ||
              loading
            }
            className="flex h-12 w-12 items-center justify-center text-xl text-[#2C241C] transition hover:bg-[#F6F1EA] disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Disminuir cantidad"
          >
            −
          </button>

          <input
            type="number"
            min={1}
            max={999}
            value={quantity}
            onChange={(event) =>
              cambiarCantidad(
                event.target.value
              )
            }
            disabled={loading}
            className="h-12 w-16 border-x border-[#E9E2D9] bg-white text-center text-lg font-semibold text-[#2C241C] outline-none"
          />

          <button
            type="button"
            onClick={aumentarCantidad}
            disabled={
              quantity >= 999 ||
              loading
            }
            className="flex h-12 w-12 items-center justify-center text-xl text-[#2C241C] transition hover:bg-[#F6F1EA] disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Aumentar cantidad"
          >
            +
          </button>

        </div>
      </div>

      {/* BOTÓN */}
      <button
        type="button"
        onClick={agregarAlCarrito}
        disabled={
          loading ||
          !selectedVariant ||
          !selectedVariant.availableForSale
        }
        className="flex w-full items-center justify-center rounded-xl bg-[#A36A33] px-7 py-4 text-base font-semibold text-white transition hover:bg-[#7A4E24] disabled:cursor-not-allowed disabled:bg-[#C8B8A8] sm:w-auto"
      >
        {loading
          ? "Añadiendo..."
          : "Agregar al carrito"}
      </button>

      {/* MENSAJE ÉXITO */}
      {mensaje && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700">
          ✓ {mensaje}
        </div>
      )}

      {/* MENSAJE ERROR */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

    </div>
  );
}