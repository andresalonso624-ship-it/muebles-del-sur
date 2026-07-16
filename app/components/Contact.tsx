"use client";

import { useState } from "react";

export default function Contact() {
  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    telefono: "",
    servicio: "",
    ancho: "",
    alto: "",
    fondo: "",
    presupuesto: "",
    mensaje: "",
  });

  const [enviando, setEnviando] = useState(false);
  const [respuesta, setRespuesta] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setEnviando(true);
    setRespuesta("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formulario),
      });

      if (res.ok) {
        setRespuesta(
          "✅ Hemos recibido tu solicitud. Muy pronto nos pondremos en contacto contigo."
        );

        setFormulario({
          nombre: "",
          email: "",
          telefono: "",
          servicio: "",
          ancho: "",
          alto: "",
          fondo: "",
          presupuesto: "",
          mensaje: "",
        });
      } else {
        setRespuesta(
          "❌ No fue posible enviar la solicitud."
        );
      }
    } catch (error) {
      setRespuesta(
        "❌ Error al conectar con el servidor."
      );
    }

    setEnviando(false);
  };

  return (
<section
  id="contact"
  className="bg-gradient-to-b from-white to-[#F7F2EC] py-24 lg:py-28"
>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* Encabezado */}

        <p className="text-center text-xs sm:text-sm uppercase tracking-[4px] sm:tracking-[8px] text-[#A36A33] font-semibold">
          - CONTACTO -
        </p>

        <h2 className="mt-4 text-3xl sm:text-4xl lg:text-6xl font-bold text-center text-[#2C241C]">
          Hagamos realidad tu proyecto
        </h2>

        <p className="mt-6 max-w-3xl mx-auto text-center text-lg text-gray-600 leading-8">
          Cuéntanos qué necesitas y nuestro equipo te asesorará para crear un
          mueble completamente personalizado.
        </p>

      <div className="mt-16 grid grid-cols-1 items-stretch gap-10 lg:grid-cols-2">
                  {/* Información */}
          <div className="bg-white rounded-3xl shadow-xl p-10">

            <h3 className="text-3xl font-bold text-[#2C241C]">
              Estamos para ayudarte
            </h3>

            <p className="mt-5 text-gray-600 leading-8">
              Diseñamos cocinas, armarios, puertas, oficinas,
              muebles de salon, estanterías, tiendas y todo tipo
              de muebles a medida.
              Escríbenos y recibe asesoría sin compromiso.
            </p>

            <div className="mt-10 space-y-8">

              <div>
                <h4 className="text-xl font-bold text-[#2C241C]">
                  📞 Teléfono
                </h4>

                <p className="text-gray-600 mt-2">
                  +34 641 17 68 21
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-[#2C241C]">
                  📧 Correo
                </h4>

                <p className="text-gray-600 mt-2">
                  mueblesdelsur.es@gmail.com
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-[#2C241C]">
                  🕒 Horario
                </h4>

                <p className="text-gray-600 mt-2">
                  Lunes a sábado
                  <br />
                  9:00 AM - 18:00 PM
                </p>
              </div>

            </div>

            <a
              href="https://wa.me/34641176821"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex w-full justify-center rounded-xl bg-green-500 px-8 py-4 font-semibold text-white transition hover:bg-green-600 lg:w-auto"
            >
              Escribir por WhatsApp
            </a>

          </div>

          {/* Formulario */}
          <div className="bg-white rounded-3xl shadow-xl p-10">

<form
  onSubmit={handleSubmit}
  className="space-y-6"
><input
  type="text"
  name="nombre"
  value={formulario.nombre}
  onChange={handleChange}
  placeholder="Nombre completo"
  required
  className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#A36A33]"
/>

<input
  type="email"
  name="email"
  value={formulario.email}
  onChange={handleChange}
  placeholder="Correo electrónico"
  required
  className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#A36A33]"
/>

<input
  type="tel"
  name="telefono"
  value={formulario.telefono}
  onChange={handleChange}
  placeholder="Teléfono"
  required
  className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#A36A33]"
/>

<select
  name="servicio"
  value={formulario.servicio}
  onChange={handleChange}
  required
  className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#A36A33]"
>
  <option value="">Selecciona el tipo de proyecto</option>
  <option value="Cocina">Cocina</option>
  <option value="Armario">Armario</option>
  <option value="Puertas">Puertas</option>
  <option value="Vestidor">Vestidor</option>
  <option value="Oficina">Oficina</option>
  <option value="Tienda">Tienda</option>
  <option value="Muebles de salon">
    Mueble de salon
  </option>
  <option value="Mueble personalizado">
    Mueble personalizado
  </option>
  <option value="Otro">Otro</option>
</select>

<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

  <input
    type="text"
    name="ancho"
    value={formulario.ancho}
    onChange={handleChange}
    placeholder="Ancho (cm)"
    className="border border-gray-300 rounded-xl px-4 py-4"
  />

  <input
    type="text"
    name="alto"
    value={formulario.alto}
    onChange={handleChange}
    placeholder="Alto (cm)"
    className="border border-gray-300 rounded-xl px-4 py-4"
  />

  <input
    type="text"
    name="fondo"
    value={formulario.fondo}
    onChange={handleChange}
    placeholder="Fondo (cm)"
    className="border border-gray-300 rounded-xl px-4 py-4"
  />

</div>

<select
  name="presupuesto"
  value={formulario.presupuesto}
  onChange={handleChange}
  className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#A36A33]"
>
  <option value="">Presupuesto aproximado</option>
  <option value="Menos de 1.000 €">Menos de 1.000 €</option>
  <option value="1.000 € - 3.000 €">1.000 € - 3.000 €</option>
  <option value="3.000 € - 6.000 €">3.000 € - 6.000 €</option>
  <option value="Más de 6.000 €">Más de 6.000 €</option>
</select>

<textarea
  rows={6}
  name="mensaje"
  value={formulario.mensaje}
  onChange={handleChange}
  placeholder="Cuéntanos sobre tu proyecto..."
  required
  className="w-full border border-gray-300 rounded-xl px-5 py-4 resize-none focus:outline-none focus:ring-2 focus:ring-[#A36A33]"
/><button
  type="submit"
  disabled={enviando}
  className="w-full bg-[#A36A33] text-white py-4 rounded-xl text-lg font-semibold hover:bg-[#8B5A2B] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
>
  {enviando ? "Enviando solicitud..." : "Solicitar mi presupuesto"}
</button>

{respuesta && (
  <div
    className={`rounded-xl p-4 text-center font-medium ${
      respuesta.startsWith("✅")
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {respuesta}
  </div>
)}

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}