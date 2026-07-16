"use client";

export default function PresupuestoPage() {
  return (
    <main className="min-h-screen bg-[#F8F5F1] py-24">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        <h1 className="text-4xl font-bold text-[#2C241C] text-center">
          Solicita tu presupuesto
        </h1>

        <p className="text-center text-gray-600 mt-4">
          Cuéntanos tu proyecto y nos pondremos en contacto contigo lo antes posible.
        </p>

        <form className="mt-10 space-y-6">

          <div>
            <label className="block mb-2 font-semibold">
              Nombre completo
            </label>

            <input
              type="text"
              placeholder="Escribe tu nombre"
              className="w-full border rounded-xl p-4"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Correo electrónico
            </label>

            <input
              type="email"
              placeholder="correo@email.com"
              className="w-full border rounded-xl p-4"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Teléfono
            </label>

            <input
              type="tel"
              placeholder="+34..."
              className="w-full border rounded-xl p-4"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Tipo de proyecto
            </label>

            <select className="w-full border rounded-xl p-4">
              <option>Cocina</option>
              <option>Armario</option>
              <option>Oficina</option>
              <option>Tienda</option>
              <option>Mueble personalizado</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Describe tu proyecto
            </label>

            <textarea
              rows={6}
              placeholder="Cuéntanos qué necesitas..."
              className="w-full border rounded-xl p-4"
            />
          </div>

          <button
            className="w-full bg-[#A36A33] text-white py-4 rounded-xl text-lg font-semibold hover:bg-[#8C5A2D] transition"
          >
            Enviar solicitud
          </button>

        </form>

      </div>
    </main>
  );
}