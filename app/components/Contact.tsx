"use client";

import Image from "next/image";
import {
  User,
  Pencil,
  Phone,
  Mail,
  Clock,
  MapPin,
  Send,
  Lock,
  Headphones,
  Ruler,
  Award,
  ShieldCheck,
} from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="
        scroll-mt-24
        bg-[#F7F1E8]
        px-4
        py-10
        sm:px-6
        lg:px-8
        lg:py-14
      "
    >
      <div className="mx-auto max-w-[1320px]">

        {/* =====================================================
            ENCABEZADO
        ===================================================== */}

        <div className="mb-8 text-center lg:mb-10">

          <div className="mb-3 flex items-center justify-center gap-4">
            <span className="h-[2px] w-9 bg-[#B97820]" />

            <span className="text-[15px] font-semibold uppercase tracking-[0.3em] text-[#B97820] sm:text-[16px]">
              CONTACTO
            </span>

            <span className="h-[2px] w-9 bg-[#B97820]" />
          </div>

          <h2
            className="
              text-3xl
              font-extrabold
              tracking-[-0.04em]
              text-[#2C241C]
              sm:text-4xl
              lg:text-[44px]
            "
          >
            Hacemos realidad tu proyecto
          </h2>

          <p
            className="
              mx-auto
              mt-2
              max-w-[650px]
              text-sm
              leading-6
              text-[#52627A]
              sm:text-[15px]
            "
          >
            Cuéntanos qué necesitas y nuestro equipo te asesorará para crear
            un mueble completamente personalizado.
          </p>

        </div>


        {/* =====================================================
            CONTENIDO PRINCIPAL
        ===================================================== */}

        <div
          className="
            overflow-hidden
            rounded-[24px]
            border
            border-[#E8DED0]
            bg-[#FCFAF7]
            shadow-[0_12px_40px_rgba(60,40,20,0.09)]

            lg:grid
            lg:grid-cols-[0.82fr_1.38fr]
          "
        >

          {/* =====================================================
              COLUMNA IZQUIERDA
          ===================================================== */}

          <div
            className="
              relative
              min-h-[560px]
              overflow-hidden

              lg:min-h-[620px]
            "
          >

            {/* =================================================
                IMAGEN
            ================================================= */}

            <Image
              src="/images/contacto.png"
              alt="Diseño y fabricación de muebles a medida"
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 42vw"
              className="
                object-cover
                object-center
              "
            />

            {/* =================================================
                CAPA OSCURA
            ================================================= */}

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/85
                via-black/45
                to-black/15
              "
            />

            {/* =================================================
                CONTENIDO DE CONTACTO
            ================================================= */}

            <div
              className="
                absolute
                inset-x-0
                bottom-0
                z-10
                p-6

                sm:p-8
                lg:p-9
                xl:p-10
              "
            >

              {/* TITULO */}

              <div className="mb-4 flex items-center gap-3">

                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#B97820]
                    text-white
                  "
                >
                  <User
                    size={20}
                    strokeWidth={1.8}
                  />
                </div>

                <h3
                  className="
                    text-[22px]
                    font-bold
                    leading-tight
                    text-white
                    sm:text-[24px]
                  "
                >
                  Estamos para ayudarte
                </h3>

              </div>


              {/* DESCRIPCION */}

              <p
                className="
                  max-w-[470px]
                  text-[14px]
                  leading-6
                  text-white/90

                  sm:text-[16px]
                "
              >
                Diseñamos cocinas, armarios, puertas, oficinas, muebles de
                salón, estanterías, tiendas y todo tipo de muebles a medida.
                Escríbenos y recibe asesoría sin compromiso.
              </p>


              {/* LINEA */}

              <div className="my-5 h-px bg-white/25" />


              {/* =================================================
                  TELEFONO
              ================================================= */}

              <div className="mb-3.5 flex items-center gap-3">

                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-white/15
                    text-white
                  "
                >
                  <Phone
                    size={16}
                    strokeWidth={1.8}
                  />
                </div>

                <div>

                  <p className="text-[14px] font-semibold text-white sm:text-[15px]">
                    Teléfono
                  </p>

                  <p className="text-[13px] text-white/80">
                    +34 646 61 33 59
                  </p>

                </div>

              </div>


              {/* =================================================
                  CORREO
              ================================================= */}

              <div className="mb-3.5 flex items-center gap-3">

                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-white/15
                    text-white
                  "
                >
                  <Mail
                    size={16}
                    strokeWidth={1.8}
                  />
                </div>

                <div>

                  <p className="text-[13px] font-semibold text-white">
                    Correo
                  </p>

                  <p className="text-[13px] text-white/80 sm:text-[14px]">
                    estanteriamsc@gmail.com
                  </p>

                </div>

              </div>


              {/* =================================================
                  HORARIO
              ================================================= */}

              <div className="mb-3.5 flex items-center gap-3">

                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-white/15
                    text-white
                  "
                >
                  <Clock
                    size={16}
                    strokeWidth={1.8}
                  />
                </div>

                <div>

                  <p className="text-[13px] leading-5 text-white/90">
                    Horario
                  </p>

                  <p className="text-[13px] leading-5 text-white/80">
                    Lunes a sábado
                    <br />
                    9:00 AM - 18:00 PM
                  </p>

                </div>

              </div>


              {/* =================================================
                  UBICACION
              ================================================= */}

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-white/15
                    text-white
                  "
                >
                  <MapPin
                    size={16}
                    strokeWidth={1.8}
                  />
                </div>

                <div>

                  <p className="text-[13px] font-semibold text-white">
                    Ubicación
                  </p>

                  <p className="text-[11px] text-white/75">
                    Sevilla, España
                  </p>

                </div>

              </div>


              {/* =================================================
                  WHATSAPP
              ================================================= */}

              <a
                href="https://wa.me/34646613359"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-5
                  flex
                  h-12
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#25D366]
                  text-sm
                  font-semibold
                  text-white
                  shadow-md
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-[#20BD5A]
                  hover:shadow-lg
                "
              >
                <span className="text-lg">
                  ◔
                </span>

                Escribir por WhatsApp
              </a>

            </div>

          </div>


          {/* =====================================================
              FORMULARIO
          ===================================================== */}

          <div
            className="
              bg-[#FCFAF7]
              p-6

              sm:p-8

              lg:p-9
              xl:p-10
            "
          >

            {/* TITULO */}

            <div className="mb-6 flex items-center gap-3">

              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#B97820]
                  text-white
                "
              >
                <Pencil
                  size={19}
                  strokeWidth={1.8}
                />
              </div>

              <h3
                className="
                  text-[20px]
                  font-bold
                  tracking-[-0.02em]
                  text-[#171717]
                  sm:text-[22px]
                "
              >
                Cuéntanos sobre tu proyecto
              </h3>

            </div>


            {/* FORMULARIO */}

            <form className="space-y-3.5">

              {/* NOMBRE / EMAIL */}

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                <input
                  type="text"
                  placeholder="Nombre completo *"
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-[#E3D8CA]
                    bg-white
                    px-4
                    text-[13px]
                    text-[#2C241C]
                    outline-none
                    transition
                    placeholder:text-[#999]
                    focus:border-[#B97820]
                    focus:ring-1
                    focus:ring-[#B97820]
                  "
                />

                <input
                  type="email"
                  placeholder="Correo electrónico *"
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-[#E3D8CA]
                    bg-white
                    px-4
                    text-[13px]
                    text-[#2C241C]
                    outline-none
                    transition
                    placeholder:text-[#999]
                    focus:border-[#B97820]
                    focus:ring-1
                    focus:ring-[#B97820]
                  "
                />

              </div>


              {/* TELEFONO */}

              <input
                type="tel"
                placeholder="Teléfono *"
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-[#E3D8CA]
                  bg-white
                  px-4
                  text-[13px]
                  outline-none
                  transition
                  placeholder:text-[#999]
                  focus:border-[#B97820]
                  focus:ring-1
                  focus:ring-[#B97820]
                "
              />


              {/* TIPO DE PROYECTO */}

              <select
                defaultValue=""
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-[#E3D8CA]
                  bg-white
                  px-4
                  text-[13px]
                  text-[#52627A]
                  outline-none
                  transition
                  focus:border-[#B97820]
                  focus:ring-1
                  focus:ring-[#B97820]
                "
              >

                <option
                  value=""
                  disabled
                >
                  Selecciona el tipo de proyecto *
                </option>

                <option>
                  Cocina integral
                </option>

                <option>
                  Armario
                </option>

                <option>
                  Mueble de salón
                </option>

                <option>
                  Oficina
                </option>

                <option>
                  Tienda
                </option>

                <option>
                  Estantería
                </option>

                <option>
                  Mueble personalizado
                </option>

                <option>
                  Otro
                </option>

              </select>


              {/* MEDIDAS */}

              <div className="grid grid-cols-3 gap-3">

                <input
                  type="text"
                  placeholder="Ancho (cm)"
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-[#E3D8CA]
                    bg-white
                    px-4
                    text-[13px]
                    outline-none
                    placeholder:text-[#999]
                    focus:border-[#B97820]
                  "
                />

                <input
                  type="text"
                  placeholder="Alto (cm)"
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-[#E3D8CA]
                    bg-white
                    px-4
                    text-[13px]
                    outline-none
                    placeholder:text-[#999]
                    focus:border-[#B97820]
                  "
                />

                <input
                  type="text"
                  placeholder="Fondo (cm)"
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-[#E3D8CA]
                    bg-white
                    px-4
                    text-[13px]
                    outline-none
                    placeholder:text-[#999]
                    focus:border-[#B97820]
                  "
                />

              </div>


              {/* PRESUPUESTO */}

              <select
                defaultValue=""
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-[#E3D8CA]
                  bg-white
                  px-4
                  text-[13px]
                  text-[#52627A]
                  outline-none
                  focus:border-[#B97820]
                "
              >

                <option
                  value=""
                  disabled
                >
                  Presupuesto aproximado
                </option>

                <option>
                  Menos de 500 €
                </option>

                <option>
                  500 € - 1.000 €
                </option>

                <option>
                  1.000 € - 2.500 €
                </option>

                <option>
                  2.500 € - 5.000 €
                </option>

                <option>
                  Más de 5.000 €
                </option>

              </select>


              {/* MENSAJE */}

              <textarea
                placeholder="Cuéntanos sobre tu proyecto..."
                rows={5}
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-[#E3D8CA]
                  bg-white
                  px-4
                  py-3
                  text-[13px]
                  outline-none
                  transition
                  placeholder:text-[#999]
                  focus:border-[#B97820]
                  focus:ring-1
                  focus:ring-[#B97820]
                "
              />


              {/* BOTON */}

              <button
                type="submit"
                className="
                  flex
                  h-12
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#B97820]
                  text-sm
                  font-semibold
                  text-white
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-[#9F6518]
                  hover:shadow-md
                "
              >

                <Send
                  size={17}
                  strokeWidth={1.8}
                />

                Enviar solicitud

              </button>


              {/* SEGURIDAD */}

              <div
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  pt-1
                  text-[10px]
                  text-[#888]
                "
              >

                <Lock size={12} />

                <span>
                  Tu información está segura. No compartimos tus datos.
                </span>

              </div>

            </form>

          </div>

        </div>


        {/* =====================================================
            VENTAJAS
        ===================================================== */}

        <div
          className="
            mt-4
            grid
            grid-cols-2
            overflow-hidden
            rounded-[18px]
            border
            border-[#E8DED0]
            bg-[#FCFAF7]
            shadow-[0_8px_25px_rgba(60,40,20,0.06)]

            sm:grid-cols-4
          "
        >

          {/* RESPUESTA */}

          <div
            className="
              flex
              items-center
              gap-3
              border-b
              border-[#E8DED0]
              p-4

              sm:border-b-0
              sm:border-r
            "
          >

            <Headphones
              size={25}
              strokeWidth={1.6}
              className="shrink-0 text-[#B97820]"
            />

            <div>

              <p className="text-xs font-bold text-[#2C241C]">
                Respuesta rápida
              </p>

              <p className="text-[10px] leading-4 text-[#6C6C6C]">
                Te respondemos en menos de 24 horas
              </p>

            </div>

          </div>


          {/* ASESORIA */}

          <div
            className="
              flex
              items-center
              gap-3
              border-b
              border-[#E8DED0]
              p-4

              sm:border-b-0
              sm:border-r
            "
          >

            <Ruler
              size={25}
              strokeWidth={1.6}
              className="shrink-0 text-[#B97820]"
            />

            <div>

              <p className="text-xs font-bold text-[#2C241C]">
                Asesoría personalizada
              </p>

              <p className="text-[10px] leading-4 text-[#6C6C6C]">
                Te guiamos en cada paso
              </p>

            </div>

          </div>


          {/* EXPERIENCIA */}

          <div
            className="
              flex
              items-center
              gap-3
              border-r
              border-[#E8DED0]
              p-4
            "
          >

            <Award
              size={25}
              strokeWidth={1.6}
              className="shrink-0 text-[#B97820]"
            />

            <div>

              <p className="text-xs font-bold text-[#2C241C]">
                Experiencia garantizada
              </p>

              <p className="text-[10px] leading-4 text-[#6C6C6C]">
                Más de 4 años creando espacios
              </p>

            </div>

          </div>


          {/* CALIDAD */}

          <div
            className="
              flex
              items-center
              gap-3
              p-4
            "
          >

            <ShieldCheck
              size={25}
              strokeWidth={1.6}
              className="shrink-0 text-[#B97820]"
            />

            <div>

              <p className="text-xs font-bold text-[#2C241C]">
                Calidad asegurada
              </p>

              <p className="text-[10px] leading-4 text-[#6C6C6C]">
                Materiales y acabados de primera
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}