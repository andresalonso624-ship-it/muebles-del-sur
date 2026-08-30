import { NextResponse } from "next/server";
import { getShopifyProducts } from "@/app/lib/shopify-products";

export async function GET() {
  try {
    const products = await getShopifyProducts();

    return NextResponse.json({
      success: true,
      total: products.length,
      products,
    });
  } catch (error) {
    console.error("Error Shopify:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Error desconocido",
      },
      { status: 500 }
    );
  }
}