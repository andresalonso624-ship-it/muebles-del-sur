"use client";

import Image from "next/image";

export default function Services() {
  const services = [
    {
      title: "Cocinas integrales",
      description:
        "Diseñamos cocinas modernas, funcionales y personalizadas adaptadas a tu espacio.",
      icon: (
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-9 w-9 sm:h-10 sm:w-10"
        >
          {/* Mueble inferior */}
          <rect
            x="7"
            y="29"
            width="50"
            height="25"
            rx="2"
            stroke="currentColor"
            strokeWidth="2"
          />

          {/* Encimera */}
          <path
            d="M6 29H58"
            stroke="currentColor"
            strokeWidth="2"
          />

          {/* Divisiones */}
          <path
            d="M23 29V54"
            stroke="currentColor"
            strokeWidth="2"
          />

          <path
            d="M41 29V54"
            stroke="currentColor"
            strokeWidth="2"
          />

          {/* Mueble superior */}
          <rect
            x="13"
            y="10"
            width="38"
            height="15"
            rx="2"
            stroke="currentColor"
            strokeWidth="2"
          />

          {/* División superior */}
          <path
            d="M32 10V25"
            stroke="currentColor"
            strokeWidth="2"
          />

          {/* Tiradores */}
          <circle
            cx="27"
            cy="18"
            r="1.5"
            fill="currentColor"
          />

          <circle
            cx="37"
            cy="18"
            r="1.5"
            fill="currentColor"
          />
        </svg>
      ),
    },

    {
      title: "Armarios",
      description:
        "Aprovechamos cada centímetro con soluciones de almacenamiento a medida y de alta calidad.",
      icon: (
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-9 w-9 sm:h-10 sm:w-10"
        >
          {/* Armario */}
          <rect
            x="12"
            y="7"
            width="40"
            height="50"
            rx="2"
            stroke="currentColor"
            strokeWidth="2"
          />

          {/* Puertas */}
          <path
            d="M32 7V57"
            stroke="currentColor"
            strokeWidth="2"
          />

          {/* Tiradores */}
          <circle
            cx="29"
            cy="32"
            r="1.5"
            fill="currentColor"
          />

          <circle
            cx="35"
            cy="32"
            r="1.5"
            fill="currentColor"
          />

          {/* Cajones */}
          <path
            d="M13 45H51"
            stroke="currentColor"
            strokeWidth="2"
          />

          <path
            d="M23 45V56"
            stroke="currentColor"
            strokeWidth="2"
          />

          <path
            d="M41 45V56"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ),
    },

    {
      title: "Muebles de salón",
      description:
        "Diseñamos composiciones elegantes para televisión, almacenamiento y decoración.",
      icon: (
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-9 w-9 sm:h-10 sm:w-10"
        >
          {/* Televisor */}
          <rect
            x="9"
            y="8"
            width="46"
            height="29"
            rx="2"
            stroke="currentColor"
            strokeWidth="2"
          />

          {/* Pantalla */}
          <rect
            x="14"
            y="13"
            width="36"
            height="19"
            rx="1"
            stroke="currentColor"
            strokeWidth="1.5"
          />

          {/* Pie */}
          <path
            d="M26 43H38"
            stroke="currentColor"
            strokeWidth="2"
          />

          <path
            d="M32 37V43"
            stroke="currentColor"
            strokeWidth="2"
          />

          {/* Mueble inferior */}
          <rect
            x="7"
            y="45"
            width="50"
            height="11"
            rx="2"
            stroke="currentColor"
            strokeWidth="2"
          />

          <path
            d="M23 45V56"
            stroke="currentColor"
            strokeWidth="2"
          />

          <path
            d="M41 45V56"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ),
    },

    {
      title: "Oficinas y tiendas",
      description:
        "Creamos espacios comerciales y de trabajo funcionales, cómodos y atractivos.",
      icon: (
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-9 w-9 sm:h-10 sm:w-10"
        >
          {/* Fachada */}
          <path
            d="M7 25L13 10H51L57 25"
            stroke="currentColor"
            strokeWidth="2"
          />

          {/* Toldos */}
          <path
            d="M7 25C7 30 11 33 15 33C19 33 23 30 23 25"
            stroke="currentColor"
            strokeWidth="2"
          />

          <path
            d="M23 25C23 30 27 33 32 33C37 33 41 30 41 25"
            stroke="currentColor"
            strokeWidth="2"
          />

          <path
            d="M41 25C41 30 45 33 49 33C53 33 57 30 57 25"
            stroke="currentColor"
            strokeWidth="2"
          />

          {/* Edificio */}
          <path
            d="M13 33V56H51V33"
            stroke="currentColor"
            strokeWidth="2"
          />

          {/* Puerta */}
          <rect
            x="20"
            y="40"
            width="10"
            height="16"
            stroke="currentColor"
            strokeWidth="2"
          />

          {/* Ventana */}
          <rect
            x="35"
            y="40"
            width="10"
            height="9"
            stroke="currentColor"
            strokeWidth="2"
          />

          <path
            d="M40 40V49"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="services"
      className="
        relative
        overflow-hidden
        bg-[#F7F1E8]
        py-12
        sm:py-16
        lg:py-20
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
            CABECERA
        ====================================================== */}

        <div
          className="
            relative
            min-h-0
            lg:min-h-[400px]
          "
        >

          {/* TEXTO */}

          <div
            className="
              relative
              z-20
              max-w-[650px]
              pt-2
              sm:pt-4
              lg:pt-4
            "
          >

            {/* ETIQUETA */}

            <div
              className="
                mb-6
                flex
                items-center
                gap-4
                sm:mb-7
              "
            >
              <span
                className="
                  h-[2px]
                  w-9
                  bg-[#B97820]
                  sm:w-10
                "
              />

              <span
                className="
                  text-[12px]
                  font-semibold
                  uppercase
                  tracking-[0.20em]
                  text-[#B97820]
                  sm:text-[14px]
                  sm:tracking-[0.22em]
                "
              >
                Nuestros servicios
              </span>
            </div>

            {/* TITULO */}

            <h2
              className="
                max-w-[650px]
                text-[40px]
                font-extrabold
                leading-[0.96]
                tracking-[-0.045em]
                text-[#171717]
                sm:text-5xl
                lg:text-[58px]
              "
            >
              Diseñamos soluciones
              <br />
              a medida para
              <br />

              <span className="text-[#C78324]">
                cada espacio.
              </span>
            </h2>

            {/* LINEA */}

            <div
              className="
                mt-6
                h-[2px]
                w-9
                bg-[#B97820]
                sm:mt-7
                sm:w-10
              "
            />

            {/* DESCRIPCION */}

            <p
              className="
                mt-5
                max-w-[560px]
                text-[16px]
                leading-7
                text-[#272727]
                sm:text-lg
                sm:leading-8
              "
            >
              Combinamos funcionalidad, diseño y fabricación
              propia para crear espacios únicos, pensados para ti.
            </p>

          </div>


          {/* =====================================================
              IMAGEN - SOLO ESCRITORIO
          ====================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              right-[-70px]
              top-[-25px]
              z-10
              hidden
              w-[620px]
              lg:block
              xl:right-[-35px]
              xl:w-[680px]
            "
          >

            <div className="relative h-[420px] w-full">

              <Image
                src="/images/servicios-madera.png"
                alt="Diseño y fabricación de muebles a medida"
                fill
                priority
                sizes="(max-width: 1280px) 55vw, 680px"
                className="
                  object-contain
                  object-right
                "
              />

            </div>

          </div>

        </div>


        {/* =====================================================
            TARJETAS DE SERVICIOS
        ====================================================== */}

        <div
          className="
            relative
            z-30

            mt-10

            grid
            grid-cols-2
            gap-3

            sm:mt-12
            sm:grid-cols-2
            sm:gap-5

            lg:-mt-2
            lg:grid-cols-4
            lg:gap-5
          "
        >

          {services.map((service) => (

            <div
              key={service.title}
              className="
                group

                min-h-[235px]

                rounded-[16px]

                border
                border-[#E8DED0]

                bg-[#FCFAF7]

                px-4
                py-5

                shadow-[0_6px_20px_rgba(60,40,20,0.06)]

                transition-all
                duration-300

                sm:min-h-[270px]
                sm:rounded-[18px]
                sm:px-6
                sm:py-7

                lg:min-h-[280px]
              "
            >

              {/* =================================================
                  ICONO
              ================================================== */}

              <div
                className="
                  mb-5
                  flex
                  h-[58px]
                  w-[58px]
                  items-center
                  justify-center

                  rounded-full

                  border
                  border-[#E8DCCA]

                  text-[#C78324]

                  transition-transform
                  duration-300

                  group-hover:scale-105

                  sm:mb-7
                  sm:h-[76px]
                  sm:w-[76px]
                "
              >

                <div
                  className="
                    flex
                    h-[46px]
                    w-[46px]
                    items-center
                    justify-center

                    rounded-full

                    border
                    border-[#E8DCCA]

                    sm:h-[62px]
                    sm:w-[62px]
                  "
                >
                  {service.icon}
                </div>

              </div>


              {/* =================================================
                  TITULO
              ================================================== */}

              <h3
                className="
                  text-[16px]
                  font-extrabold
                  leading-[1.15]
                  tracking-[-0.025em]
                  text-[#171717]

                  sm:text-[19px]
                "
              >
                {service.title}
              </h3>


              {/* =================================================
                  LINEA
              ================================================== */}

              <div
                className="
                  mt-3
                  h-[2px]
                  w-7
                  bg-[#C78324]
                "
              />


              {/* =================================================
                  DESCRIPCION
              ================================================== */}

              <p
                className="
                  mt-3
                  text-[12px]
                  leading-[1.55]
                  text-[#454545]

                  sm:mt-4
                  sm:text-[13px]
                  sm:leading-6
                "
              >
                {service.description}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}