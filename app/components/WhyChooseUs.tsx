export default function WhyChooseUs() {
  const beneficios = [
    {
      icono: "🎨",
      titulo: "Diseño personalizado",
      descripcion:
        "Cada proyecto se diseña según tu espacio, necesidades y estilo.",
    },
    {
      icono: "🪵",
      titulo: "Materiales Premium",
      descripcion:
        "Trabajamos con materiales de alta calidad para garantizar durabilidad.",
    },
    {
      icono: "🛠️",
      titulo: "Fabricación propia",
      descripcion:
        "Controlamos todo el proceso de fabricación e instalación.",
    },
    {
      icono: "💻",
      titulo: "Visualización 3D",
      descripcion:
        "Podrás revisar el diseño antes de fabricar cualquier mueble. Próximamente.",
    },
    {
      icono: "📱",
      titulo: "Realidad Aumentada",
      descripcion:
        "Visualiza tu mueble en tu hogar utilizando la cámara de tu celular.",
    },
    {
      icono: "🤝",
      titulo: "Acompañamiento completo",
      descripcion:
        "Te asesoramos desde la idea inicial hasta la instalación final.",
    },
  ];

  return (
    <section
      id="why"
      className="bg-gradient-to-b from-white to-[#F7F2EC] py-16 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* Encabezado */}

        <p className="text-center text-xs font-semibold uppercase tracking-[4px] text-[#A36A33] sm:text-sm sm:tracking-[6px]">
          ¿POR QUÉ ELEGIRNOS?
        </p>

        <h2 className="mt-4 text-center text-3xl font-bold text-[#2C241C] sm:text-4xl lg:text-6xl">
          Mucho más que muebles
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-center text-base leading-7 text-gray-600 sm:text-lg lg:leading-8">
          En Estanterías MSC combinamos diseño, tecnología y fabricación
          profesional para crear espacios únicos, funcionales y duraderos.
        </p>

        {/* Tarjetas */}

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">

          {beneficios.map((item) => (

            <div
              key={item.titulo}
              className="flex h-full flex-col rounded-3xl border border-[#EFE7DD] bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl lg:p-8"
            >

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#A36A33] text-2xl text-white lg:h-16 lg:w-16 lg:text-3xl">
                {item.icono}
              </div>

              <h3 className="text-xl font-bold text-[#2C241C] lg:text-2xl">
                {item.titulo}
              </h3>

              <p className="mt-4 flex-1 text-sm leading-7 text-gray-600 lg:text-base">
                {item.descripcion}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}