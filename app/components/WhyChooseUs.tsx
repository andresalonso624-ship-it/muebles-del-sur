"use client";

import Image from "next/image";

export default function WhyChooseUs() {
  const reasons = [
    {
      title: "Diseño personalizado",
      description:
        "Cada Proyecto se diseña segun tu espacio, necesidades y estilo.",
      icon: (
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
        >
          <rect
            x="10"
            y="9"
            width="44"
            height="46"
            rx="2"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M17 17H47" stroke="currentColor" strokeWidth="2" />
          <path d="M17 25H47" stroke="currentColor" strokeWidth="2" />
          <path d="M17 33H36" stroke="currentColor" strokeWidth="2" />
          <path d="M17 41H29" stroke="currentColor" strokeWidth="2" />

          <path
            d="M39 45L49 35L53 39L43 49L37 50L39 45Z"
            stroke="currentColor"
            strokeWidth="2"
          />

          <path
            d="M47 37L51 41"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ),
    },

    {
      title: "Materiales Premium",
      description:
        "Trabajamos con materiales de alta calidad para garantizar durabilidad.",
      icon: (
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
        >
          <rect
            x="9"
            y="15"
            width="46"
            height="12"
            rx="2"
            stroke="currentColor"
            strokeWidth="2"
          />

          <rect
            x="9"
            y="29"
            width="46"
            height="12"
            rx="2"
            stroke="currentColor"
            strokeWidth="2"
          />

          <rect
            x="9"
            y="43"
            width="46"
            height="8"
            rx="2"
            stroke="currentColor"
            strokeWidth="2"
          />

          <path
            d="M15 19C20 17 23 22 28 19C33 16 38 22 43 19C47 17 50 19 53 20"
            stroke="currentColor"
            strokeWidth="1.5"
          />

          <path
            d="M15 33C20 31 23 36 28 33C33 30 38 36 43 33C47 31 50 33 53 34"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      ),
    },

    {
      title: "Fabricación propia",
      description:
        "Controlamos todo el proceso de fabricación e instalación.",
      icon: (
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
        >
          <rect
            x="9"
            y="34"
            width="46"
            height="17"
            rx="2"
            stroke="currentColor"
            strokeWidth="2"
          />

          <rect
            x="16"
            y="12"
            width="32"
            height="22"
            rx="2"
            stroke="currentColor"
            strokeWidth="2"
          />

          <path
            d="M32 12V20"
            stroke="currentColor"
            strokeWidth="2"
          />

          <path
            d="M26 20H38"
            stroke="currentColor"
            strokeWidth="2"
          />

          <path
            d="M29 20V27"
            stroke="currentColor"
            strokeWidth="2"
          />

          <path
            d="M35 20V27"
            stroke="currentColor"
            strokeWidth="2"
          />

          <rect
            x="21"
            y="39"
            width="22"
            height="7"
            stroke="currentColor"
            strokeWidth="2"
          />

          <path
            d="M15 51V56"
            stroke="currentColor"
            strokeWidth="2"
          />

          <path
            d="M49 51V56"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ),
    },

    {
      title: "Instalación profesional",
      description:
        "Nuestro equipo se encarga de que el resultado final quede perfecto.",
      icon: (
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
        >
          <path
            d="M10 29L32 11L54 29"
            stroke="currentColor"
            strokeWidth="2"
          />

          <path
            d="M15 27V54H49V27"
            stroke="currentColor"
            strokeWidth="2"
          />

          <path
            d="M26 54V38H38V54"
            stroke="currentColor"
            strokeWidth="2"
          />

          <rect
            x="20"
            y="31"
            width="8"
            height="8"
            stroke="currentColor"
            strokeWidth="2"
          />

          <path
            d="M42 16L50 24"
            stroke="currentColor"
            strokeWidth="2"
          />

          <path
            d="M48 14L52 18"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="why-choose-us"
      className="
        relative
        overflow-hidden
        bg-[#F7F1E8]
        py-10
        sm:py-12
        lg:py-16
      "
    >
      <div
        className="
          mx-auto
          max-w-[1400px]
          px-5
          sm:px-8
          lg:px-10
        "
      >

        {/* =====================================================
            BLOQUE PRINCIPAL
            MÓVIL: SOLO TEXTO
            DESKTOP: IMAGEN IZQUIERDA + TEXTO DERECHA
        ===================================================== */}

        <div
          className="
            grid
            grid-cols-1
            items-center
            lg:grid-cols-2
            lg:gap-16
          "
        >

          {/* =====================================================
              IMAGEN
              OCULTA COMPLETAMENTE EN MÓVIL
          ===================================================== */}

          <div
            className="
              relative
              hidden
              h-[500px]
              w-full
              lg:order-1
              lg:block
            "
          >
            <Image
              src="/images/porque-elegirnos.png"
              alt="Diseño y fabricación de muebles a medida"
              fill
              priority
              sizes="50vw"
              className="
                object-contain
                object-left
              "
            />
          </div>


          {/* =====================================================
              TEXTO
          ===================================================== */}

          <div
            className="
              relative
              z-10
              w-full
              lg:order-2
            "
          >

            {/* ETIQUETA */}

            <div
              className="
                mb-5
                flex
                items-center
                gap-3
                sm:mb-6
                sm:gap-4
              "
            >
              <span
                className="
                  h-[2px]
                  w-9
                  shrink-0
                  bg-[#B97820]
                  sm:w-10
                "
              />

              <span
                className="
                  text-[15px]
                  font-semibold
                  uppercase
                  tracking-[0.24em]
                  text-[#B97820]
                  sm:text-[16px]
                  sm:tracking-[0.28em]
                "
              >
                ¿POR QUÉ ELEGIRNOS?
              </span>
            </div>


            {/* TITULO */}

            <h2
              className="
                max-w-[700px]
                text-[42px]
                font-extrabold
                leading-[0.94]
                tracking-[-0.045em]
                text-[#171717]

                sm:text-[52px]

                lg:text-[68px]
              "
            >
              Muchos más
              <br />
              que muebles
              <br />

              <span className="text-[#B97820]">
                para tu negocio.
              </span>
            </h2>


            {/* LINEA */}

            <div
              className="
                mt-7
                h-[3px]
                w-12
                bg-[#B97820]
                sm:mt-8
                sm:w-14
              "
            />


            {/* DESCRIPCION */}

            <p
              className="
                mt-5
                max-w-[600px]
                text-[16px]
                leading-7
                text-[#315B8C]

                sm:mt-6
                sm:text-[18px]
                sm:leading-8
              "
            >
              En Estanterías MSC combinamos diseño, tecnología y
              fabricación profesional para crear espacios únicos,
              funcionales y duraderos.
            </p>

          </div>

        </div>


        {/* =====================================================
            TARJETAS
        ===================================================== */}

        <div
          className="
            relative
            z-20

            mt-8

            grid
            grid-cols-2
            gap-3

            sm:mt-10
            sm:gap-4

            lg:mt-12
            lg:grid-cols-4
            lg:gap-5
          "
        >

          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="
                group
                min-h-[245px]

                rounded-[18px]

                border
                border-[#E8DED0]

                bg-[#FCFAF7]

                px-4
                py-5

                shadow-[0_8px_25px_rgba(60,40,20,0.07)]

                transition-all
                duration-300

                hover:-translate-y-1
                hover:shadow-[0_14px_30px_rgba(60,40,20,0.12)]

                sm:min-h-[270px]
                sm:px-6
                sm:py-7
              "
            >

              {/* =================================================
                  ICONO
              ================================================= */}

              <div
                className="
                  mb-5
                  flex
                  h-[62px]
                  w-[62px]
                  items-center
                  justify-center

                  rounded-full

                  border
                  border-[#E8DCCA]

                  text-[#C78324]

                  transition-transform
                  duration-300

                  group-hover:scale-105

                  sm:mb-6
                  sm:h-[72px]
                  sm:w-[72px]
                "
              >
                <div
                  className="
                    flex
                    h-[50px]
                    w-[50px]
                    items-center
                    justify-center

                    rounded-full

                    border
                    border-[#E8DCCA]

                    sm:h-[58px]
                    sm:w-[58px]
                  "
                >
                  {reason.icon}
                </div>
              </div>


              {/* =================================================
                  TITULO
              ================================================= */}

              <h3
                className="
                  text-[16px]
                  font-extrabold
                  leading-tight
                  tracking-[-0.02em]
                  text-[#171717]

                  sm:text-[19px]
                "
              >
                {reason.title}
              </h3>


              {/* LINEA */}

              <div
                className="
                  mt-3
                  h-[2px]
                  w-7
                  bg-[#C78324]

                  sm:w-8
                "
              />


              {/* DESCRIPCION */}

              <p
                className="
                  mt-3
                  text-[12px]
                  leading-5
                  text-[#315B8C]

                  sm:mt-4
                  sm:text-[13px]
                  sm:leading-6
                "
              >
                {reason.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}