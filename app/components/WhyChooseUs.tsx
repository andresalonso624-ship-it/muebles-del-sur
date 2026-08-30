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
          {/* Plano + lápiz */}
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
          {/* Tableros de madera */}
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

          {/* Vetado */}
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
          {/* Máquina */}
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
          {/* Casa */}
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

          {/* Herramienta */}
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
      className="relative overflow-hidden bg-[#F7F1E8] py-8 sm:py-10 lg:py-5"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">

        {/* PARTE SUPERIOR */}

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

          {/* IMAGEN - IZQUIERDA */}

          <div className="relative order-2 h-[340px] w-full sm:h-[420px] lg:order-1 lg:h-[500px]">
            <Image
              src="/images/porque-elegirnos.png"
              alt="Diseño y fabricación de muebles a medida"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain object-center lg:object-left"
            />
          </div>

          {/* TEXTO - DERECHA */}

          <div className="relative order-1 z-10 lg:order-2">

            <div className="mb-6 flex items-center gap-4">
              <span className="h-[2px] w-10 bg-[#B97820]" />

              <span className="text-[14px] font-semibold uppercase tracking-[0.28em] text-[#B97820] sm:text-[15px]">
                ¿POR QUÉ ELEGIRNOS?
              </span>
            </div>

            <h2 className="max-w-[650px] text-5xl font-extrabold leading-[0.94] tracking-[-0.045em] text-[#171717] sm:text-6xl lg:text-[68px]">
              Muchos más
              <br />
              que muebles
              <br />
              <span className="text-[#B97820]">
                para tu negocio.
              </span>
            </h2>

            <div className="mt-8 h-[3px] w-14 bg-[#B97820]" />

            <p className="mt-6 max-w-[600px] text-base leading-7 text-[#315B8C] sm:text-lg sm:leading-8">
              En Estanterías MSC combinamos diseño, tecnología y
              fabricación profesional para crear espacios únicos,
              funcionales y duraderos.
            </p>

          </div>

        </div>

        {/* TARJETAS */}

        <div className="relative z-20 mt-8 grid grid-cols-2 gap-4 lg:mt-[-15px] lg:grid-cols-4 lg:gap-5">

          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="
                min-h-[270px]
                rounded-[18px]
                border
                border-[#E8DED0]
                bg-[#FCFAF7]
                px-5
                py-6
                shadow-[0_8px_25px_rgba(60,40,20,0.07)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-[0_14px_30px_rgba(60,40,20,0.12)]
                sm:px-6
                sm:py-7
              "
            >

              {/* ICONO */}

              <div
                className="
                  mb-6
                  flex
                  h-[72px]
                  w-[72px]
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#E8DCCA]
                  text-[#C78324]
                "
              >
                <div
                  className="
                    flex
                    h-[58px]
                    w-[58px]
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#E8DCCA]
                  "
                >
                  {reason.icon}
                </div>
              </div>

              {/* TITULO */}

              <h3 className="text-[17px] font-extrabold tracking-[-0.02em] text-[#171717] sm:text-[19px]">
                {reason.title}
              </h3>

              {/* LINEA */}

              <div className="mt-3 h-[2px] w-8 bg-[#C78324]" />

              {/* DESCRIPCION */}

              <p className="mt-4 text-[12px] leading-5 text-[#315B8C] sm:text-[13px] sm:leading-6">
                {reason.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}