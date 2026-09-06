"use client";

import { useEffect, useState } from "react";

interface CartLine {
  id: string;
  quantity: number;
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  merchandise: {
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    product: {
      title: string;
      handle: string;
      featuredImage: {
        url: string;
        altText: string | null;
      } | null;
    };
  };
}

interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  lines: {
    edges: {
      node: CartLine;
    }[];
  };
}

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({
  open,
  onClose,
}: CartDrawerProps) {
  const [cart, setCart] =
    useState<Cart | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [eliminandoLineas, setEliminandoLineas] =
    useState<Set<string>>(new Set());

  // =========================================================
  // CARGAR CARRITO
  // =========================================================

  const cargarCarrito = async () => {
    const cartId =
      localStorage.getItem(
        "shopify-cart-id"
      );

    if (!cartId) {
      setCart(null);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `/api/cart?cartId=${encodeURIComponent(
          cartId
        )}`,
        {
          cache: "no-store",
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "No se pudo cargar el carrito."
        );
      }

      setCart(data.cart || null);
    } catch (error) {
      console.error(
        "Error cargando carrito:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // ABRIR CARRITO
  // =========================================================

  useEffect(() => {
    if (open) {
      cargarCarrito();
    }
  }, [open]);

  // =========================================================
  // ACTUALIZAR CARRITO DESDE OTROS COMPONENTES
  // =========================================================

  useEffect(() => {
    const actualizar = () => {
      // Solo hacemos una nueva consulta si
      // el carrito está actualmente abierto.
      if (open) {
        cargarCarrito();
      }
    };

    window.addEventListener(
      "cartUpdated",
      actualizar
    );

    return () => {
      window.removeEventListener(
        "cartUpdated",
        actualizar
      );
    };
  }, [open]);

  // =========================================================
  // CAMBIAR CANTIDAD
  // =========================================================

  const cambiarCantidad = async (
    lineId: string,
    quantity: number
  ) => {
    const cartId =
      localStorage.getItem(
        "shopify-cart-id"
      );

    if (!cartId) return;

    // Evitar cantidades menores a 1
    if (quantity < 1) {
      await eliminarProducto(lineId);
      return;
    }

    try {
      const response = await fetch(
        "/api/cart",
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            cartId,
            lineId,
            quantity,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "No se pudo actualizar."
        );
      }

      // Usamos directamente la respuesta
      // sin volver a consultar Shopify.
      setCart(data.cart || null);
    } catch (error) {
      console.error(
        "Error cambiando cantidad:",
        error
      );
    }
  };

  // =========================================================
  // ELIMINAR PRODUCTO
  // =========================================================

  const eliminarProducto = async (
    lineId: string
  ) => {
    const cartId =
      localStorage.getItem(
        "shopify-cart-id"
      );

    if (!cartId || !cart) return;

    // -------------------------------------------------------
    // ELIMINACIÓN INMEDIATA EN PANTALLA
    // -------------------------------------------------------

    const carritoAnterior = cart;

    const lineaEliminada =
      cart.lines.edges.find(
        ({ node }) =>
          node.id === lineId
      )?.node;

    if (!lineaEliminada) return;

    const nuevasLineas =
      cart.lines.edges.filter(
        ({ node }) =>
          node.id !== lineId
      );

    setCart({
      ...cart,
      totalQuantity: Math.max(
        0,
        cart.totalQuantity -
          lineaEliminada.quantity
      ),
      lines: {
        edges: nuevasLineas,
      },
    });

    setEliminandoLineas((actual) => {
      const nuevo = new Set(actual);
      nuevo.add(lineId);
      return nuevo;
    });

    try {
      const response = await fetch(
        "/api/cart",
        {
          method: "DELETE",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            cartId,
            lineId,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "No se pudo eliminar."
        );
      }

      // Shopify confirma la eliminación.
      // Usamos directamente la respuesta.
      setCart(data.cart || null);
    } catch (error) {
      console.error(
        "Error eliminando producto:",
        error
      );

      // Si falla Shopify,
      // restauramos el carrito anterior.
      setCart(carritoAnterior);
    } finally {
      setEliminandoLineas((actual) => {
        const nuevo = new Set(actual);
        nuevo.delete(lineId);
        return nuevo;
      });
    }
  };

  // =========================================================
  // CERRAR SI NO ESTÁ ABIERTO
  // =========================================================

  if (!open) {
    return null;
  }

  const lineas =
    cart?.lines.edges || [];

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="fixed inset-0 z-[100]">

      {/* Fondo */}

      <button
        type="button"
        aria-label="Cerrar carrito"
        onClick={onClose}
        className="absolute inset-0 w-full bg-black/40"
      />

      {/* Carrito */}

      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">

        {/* =================================================
            CABECERA
        ================================================= */}

        <div className="flex items-center justify-between border-b border-[#E9E2D9] px-6 py-5">

          <div>
            <h2 className="text-xl font-semibold text-[#2C241C]">
              Tu carrito
            </h2>

            <p className="mt-1 text-sm text-[#8B5E34]">
              {cart?.totalQuantity || 0}{" "}
              {cart?.totalQuantity === 1
                ? "producto"
                : "productos"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E9E2D9] text-xl text-[#2C241C] transition hover:bg-[#F8F5F1]"
            aria-label="Cerrar carrito"
          >
            ×
          </button>
        </div>

        {/* =================================================
            CONTENIDO
        ================================================= */}

        <div className="flex-1 overflow-y-auto px-6 py-5">

          {loading ? (

            <div className="flex min-h-[200px] items-center justify-center text-sm text-[#8B5E34]">
              Cargando carrito...
            </div>

          ) : lineas.length === 0 ? (

            <div className="flex min-h-[300px] flex-col items-center justify-center text-center">

              <div className="mb-4 text-5xl">
                🛒
              </div>

              <h3 className="text-lg font-semibold text-[#2C241C]">
                Tu carrito está vacío
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Añade productos para continuar
                con tu compra.
              </p>

            </div>

          ) : (

            <div className="space-y-5">

              {lineas.map(({ node }) => {

                const imagen =
                  node.merchandise.product
                    .featuredImage?.url;

                const eliminando =
                  eliminandoLineas.has(
                    node.id
                  );

                return (
                  <div
                    key={node.id}
                    className={`flex gap-4 border-b border-[#E9E2D9] pb-5 transition-opacity duration-150 ${
                      eliminando
                        ? "opacity-50"
                        : "opacity-100"
                    }`}
                  >

                    {/* Imagen */}

                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-[#F8F5F1]">

                      {imagen ? (
                        <img
                          src={imagen}
                          alt={
                            node.merchandise
                              .product
                              .featuredImage
                              ?.altText ||
                            node.merchandise
                              .product
                              .title
                          }
                          className="h-full w-full object-cover"
                        />
                      ) : null}

                    </div>

                    {/* Información */}

                    <div className="min-w-0 flex-1">

                      <h3 className="text-sm font-semibold text-[#2C241C]">
                        {
                          node.merchandise
                            .product
                            .title
                        }
                      </h3>

                      {node.merchandise.title &&
                        node.merchandise.title !==
                          "Default Title" && (
                          <p className="mt-1 text-xs text-gray-500">
                            {
                              node.merchandise
                                .title
                            }
                          </p>
                        )}

                      <p className="mt-2 text-sm font-semibold text-[#A36A33]">
                        {
                          node.cost.totalAmount
                            .amount
                        }{" "}
                        {
                          node.cost.totalAmount
                            .currencyCode
                        }
                      </p>

                      {/* Cantidad */}

                      <div className="mt-3 flex items-center justify-between">

                        <div className="flex items-center rounded-lg border border-[#E9E2D9]">

                          <button
                            type="button"
                            disabled={eliminando}
                            onClick={() =>
                              cambiarCantidad(
                                node.id,
                                node.quantity - 1
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center text-lg text-[#2C241C] hover:bg-[#F8F5F1] disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            −
                          </button>

                          <span className="w-8 text-center text-sm">
                            {node.quantity}
                          </span>

                          <button
                            type="button"
                            disabled={eliminando}
                            onClick={() =>
                              cambiarCantidad(
                                node.id,
                                node.quantity + 1
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center text-lg text-[#2C241C] hover:bg-[#F8F5F1] disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            +
                          </button>

                        </div>

                        <button
                          type="button"
                          disabled={eliminando}
                          onClick={() =>
                            eliminarProducto(
                              node.id
                            )
                          }
                          className="text-xs text-gray-500 underline hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {eliminando
                            ? "Eliminando..."
                            : "Eliminar"}
                        </button>

                      </div>
                    </div>
                  </div>
                );
              })}

            </div>
          )}
        </div>

        {/* =================================================
            PIE
        ================================================= */}

        {lineas.length > 0 && (
          <div className="border-t border-[#E9E2D9] bg-white px-6 py-5">

            <div className="mb-4 flex items-center justify-between">

              <span className="text-sm text-gray-600">
                Subtotal
              </span>

              <span className="text-lg font-semibold text-[#2C241C]">
                {
                  cart?.cost
                    .subtotalAmount
                    .amount
                }{" "}
                {
                  cart?.cost
                    .subtotalAmount
                    .currencyCode
                }
              </span>

            </div>

            <a
              href={
                cart?.checkoutUrl || "#"
              }
              className="flex w-full items-center justify-center rounded-xl bg-[#A36A33] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#7A4E24]"
            >
              Finalizar compra
            </a>

            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full rounded-xl border border-[#E9E2D9] px-5 py-3 text-sm font-medium text-[#2C241C] transition hover:bg-[#F8F5F1]"
            >
              Seguir comprando
            </button>

          </div>
        )}

      </aside>
    </div>
  );
}