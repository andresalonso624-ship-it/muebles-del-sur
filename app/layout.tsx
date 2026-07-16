import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Estanterias MSC",
  description:
    "Diseñamos, fabricamos e instalamos muebles a medida con visualización 3D y realidad aumentada.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${manrope.variable} antialiased`}>
      <body className="min-h-screen bg-[#F8F5F1] text-[#2C241C] font-sans">
        {children}
      </body>
    </html>
  );
}