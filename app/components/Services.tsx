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
          className="h-12 w-12"
        >
          <rect x="8" y="27" width="48" height="25" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M8 35H56" stroke="currentColor" strokeWidth="2" />
          <path d="M20 27V52" stroke="currentColor" strokeWidth="2" />
          <path d="M44 27V52" stroke="currentColor" strokeWidth="2" />
          <rect x="12" y="12" width="14" height="12" rx="1" stroke="currentColor" strokeWidth="2" />
          <path d="M19 12V24" stroke="currentColor" strokeWidth="2" />
          <path d="M36 12V24" stroke="currentColor" strokeWidth="2" />
          <path d="M32 18H40" stroke="currentColor" strokeWidth="2" />
          <circle cx="36" cy="18" r="1" fill="currentColor" />
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
          className="h-12 w-12"
        >
          <rect x="14" y="7" width="36" height="50" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M32 7V43" stroke="currentColor" strokeWidth="2" />
          <path d="M14 43H50" stroke="currentColor" strokeWidth="2" />
          <path d="M14 50H50" stroke="currentColor" strokeWidth="2" />
          <path d="M29 24H31" stroke="currentColor" strokeWidth="2" />
          <path d="M33 24H35" stroke="currentColor" strokeWidth="2" />
          <path d="M25 46V50" stroke="currentColor" strokeWidth="2" />
          <path d="M39 46V50" stroke="currentColor" strokeWidth="2" />
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
          className="h-12 w-12"
        >
          <rect x="10" y="10" width="44" height="27" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M32 37V45" stroke="currentColor" strokeWidth="2" />
          <path d="M23 45H41" stroke="currentColor" strokeWidth="2" />
          <rect x="7" y="45" width="50" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M18 45V55" stroke="currentColor" strokeWidth="2" />
          <path d="M46 45V55" stroke="currentColor" strokeWidth="2" />
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
          className="h-12 w-12"
        >
          <path
            d="M8 26L13 14H51L56 26"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M8 26C8 31 12 34 16 34C20 34 24 31 24 26"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M24 26C24 31 28 34 32 34C36 34 40 31 40 26"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M40 26C40 31 44 34 48 34C52 34 56 31 56 26"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M13 34V56H51V34" stroke="currentColor" strokeWidth="2" />
          <rect x="20" y="41" width="9" height="15" stroke="currentColor" strokeWidth="2" />
          <rect x="34" y="40" width="11" height="9" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#F7F1E8] py-16 sm:py-20 lg:py-15"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">

        {/* CONTENIDO SUPERIOR */}

        <div className="relative min-h-[360px] lg:min-h-[400px]">

          {/* TEXTO */}

          <div className="relative z-20 max-w-[650px] pt-2 lg:pt-4">

            <div className="mb-6 flex items-center gap-4">
              <span className="h-[2px] w-10 bg-[#B97820]" />

              <span className="text-[15px] font-semibold uppercase tracking-[0.22em] text-[#B97820]">
                Nuestros servicios
              </span>
            </div>

            <h2 className="max-w-[650px] text-4xl font-extrabold leading-[0.98] tracking-[-0.04em] text-[#171717] sm:text-5xl lg:text-[58px]">
              Diseñamos soluciones
              <br />
              a medida para
              <br />
              <span className="text-[#C78324]">
                cada espacio.
              </span>
            </h2>

            <div className="mt-7 h-[2px] w-10 bg-[#B97820]" />

            <p className="mt-5 max-w-[560px] text-base leading-7 text-[#272727] sm:text-lg">
              Combinamos funcionalidad, diseño y fabricación propia para crear
              espacios únicos, pensados para ti.
            </p>

          </div>


          {/* IMAGEN 3D */}

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
            {/* CUADRO DE FONDO */}

            <div
          
            />

            {/* IMAGEN */}

            <div className="relative h-[420px] w-full">
              <Image
                src="/images/servicios-madera.png"
                alt="Madera para fabricación de muebles a medida"
                fill
                priority
                sizes="(max-width: 1280px) 55vw, 680px"
                className="object-contain object-right"
              />
            </div>
          </div>

        </div>


        {/* TARJETAS */}

        <div
          className="
            relative
            z-30
            -mt-2
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            lg:grid-cols-4
            lg:gap-5
          "
        >

          {services.map((service) => (
            <div
              key={service.title}
              className="
                group
                min-h-[280px]
                rounded-[18px]
                border
                border-[#E8DED0]
                bg-[#FCFAF7]
                px-6
                py-7
                shadow-[0_8px_25px_rgba(60,40,20,0.08)]
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-[0_16px_35px_rgba(60,40,20,0.13)]
                sm:px-7
              "
            >

              {/* ICONO */}

              <div
                className="
                  mb-7
                  flex
                  h-[76px]
                  w-[76px]
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#E8DCCA]
                  text-[#C78324]
                  transition-transform
                  duration-300
                  group-hover:scale-105
                "
              >
                <div
                  className="
                    flex
                    h-[62px]
                    w-[62px]
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#E8DCCA]
                  "
                >
                  {service.icon}
                </div>
              </div>


              {/* TITULO */}

              <h3 className="text-[19px] font-extrabold tracking-[-0.02em] text-[#171717]">
                {service.title}
              </h3>


              {/* LINEA */}

              <div className="mt-3 h-[2px] w-7 bg-[#C78324]" />


              {/* DESCRIPCION */}

              <p className="mt-4 text-[13px] leading-6 text-[#454545]">
                {service.description}
              </p>


              {/* FLECHA */}

 

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}