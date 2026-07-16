export default function Services() {
  const services = [
    {
      title: "Cocinas Integrales",
      description: "Diseños modernos y funcionales adaptados a tu hogar.",
      icon: "🍽️",
    },
    {
      title: "Armarios",
      description: "Aprovechamos cada espacio con soluciones personalizadas.",
      icon: "🚪",
    },
    {
      title: "Muebles de Salón",
      description: "Muebles elegantes para salas y espacios familiares.",
      icon: "📺",
    },
    {
      title: "Oficinas y Tiendas",
      description: "Espacios de trabajo cómodos y profesionales.",
      icon: "💼",
    },
    {
      title: "Muebles Personalizados",
      description: "Fabricamos exactamente lo que imaginas.",
      icon: "🪵",
    },
    {
      title: "Visualización 3D + AR",
      description:
        "Visualiza tu mueble antes de fabricarlo mediante realidad aumentada.",
      icon: "📱",
    },
  ];

  return (
    <section
      id="services"
      className="scroll-mt-24 bg-gradient-to-b from-white to-[#F7F2EC] py-16 md:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* Encabezado */}

        <div className="mx-auto max-w-3xl text-center">

          <h2 className="text-3xl font-bold text-[#2C241C] sm:text-4xl lg:text-5xl">
            Nuestros Servicios
          </h2>

          <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
            Diseñamos soluciones personalizadas para cada espacio,
            combinando calidad, innovación y tecnología.
          </p>

        </div>

        {/* Tarjetas */}

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">

          {services.map((service) => (

            <div
              key={service.title}
              className="flex h-full flex-col rounded-3xl bg-[#FCFAF7] p-7 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl lg:p-9"
            >

              <div className="mb-6 text-5xl lg:text-6xl">
                {service.icon}
              </div>

              <h3 className="text-xl font-bold text-[#2C241C] lg:text-2xl">
                {service.title}
              </h3>

              <p className="mt-4 flex-1 text-base leading-7 text-gray-600">
                {service.description}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}