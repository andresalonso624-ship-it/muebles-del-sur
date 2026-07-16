import ARButton from "@/app/components/ARButton";
import Link from "next/link";
import { notFound } from "next/navigation";

import { modelos } from "@/app/data/modelos";
import ModelViewer from "@/app/components/ModelViewer";

export default async function ModeloPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const modelo = modelos.find(
    (item) => item.id === Number(id)
  );

  if (!modelo) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FCFAF7] to-[#F3ECE4]">

      {/* Encabezado */}

      <section className="border-b bg-white shadow-sm">

        <div className="mx-auto max-w-7xl px-6 py-10">

          <Link
            href="/modelos"
            className="font-semibold text-[#A36A33] transition hover:underline"
          >
            ← Volver a Modelos
          </Link>

          <h1 className="mt-5 text-4xl font-bold text-[#2C241C] lg:text-5xl">
            {modelo.nombre}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            {modelo.descripcion}
          </p>

        </div>

      </section>

      {/* Contenido */}

      <section className="mx-auto max-w-7xl px-6 py-14">

        <div className="grid gap-14 lg:grid-cols-2">

          {/* Visor */}

          <ModelViewer model={modelo.modelo} />

          {/* Información */}

          <div className="flex flex-col justify-center">

            <h2 className="text-3xl font-bold text-[#2C241C]">
              Explora tu proyecto en 3D
            </h2>

            <p className="mt-6 leading-8 text-gray-600">
              Visualiza el modelo desde cualquier ángulo, acerca los
              detalles, gira el diseño y comprueba el resultado antes
              de comenzar la fabricación.
            </p>

            <div className="mt-10 space-y-5">

              <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow">
                <span className="text-3xl">🔄</span>

                <div>
                  <h3 className="font-bold">
                    Rotación 360°
                  </h3>

                  <p className="text-gray-600">
                    Examina el modelo desde cualquier perspectiva.
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow">
                <span className="text-3xl">🔍</span>

                <div>
                  <h3 className="font-bold">
                    Zoom interactivo
                  </h3>

                  <p className="text-gray-600">
                    Observa cada detalle del diseño.
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow">
                <span className="text-3xl">📐</span>

                <div>
                  <h3 className="font-bold">
                    Escala real
                  </h3>

                  <p className="text-gray-600">
                    El modelo conserva las proporciones del proyecto.
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow">
                <span className="text-3xl">📱</span>

                <div>
                  <h3 className="font-bold">
                    Compatible con Realidad Aumentada
                  </h3>

                  <p className="text-gray-600">
                    Próximamente podrás colocarlo en tu hogar usando la cámara de tu móvil.
                  </p>
                </div>

              </div>

            </div>

            <button
              className="mt-12 rounded-2xl bg-[#A36A33] py-5 text-lg font-bold text-white transition hover:bg-[#8B5A2B]"
            >
              📱 Ver en mi espacio
            </button>

<ARButton
  glb={modelo.modelo}
  usdz={modelo.usdz}
/>

<button
  className="mt-4 rounded-2xl border-2 border-[#A36A33] py-5 text-lg font-bold text-[#A36A33] transition hover:bg-[#A36A33] hover:text-white"
>
  Solicitar este diseño
</button>

          </div>

        </div>

      </section>

    </main>
  );
}