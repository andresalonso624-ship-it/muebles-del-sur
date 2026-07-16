export default function HowItWorks() {
  const pasos = [
    {
      numero: "01",
      titulo: "Cuéntanos tu idea",
      descripcion:
        "Explícanos qué mueble necesitas, las medidas aproximadas y el espacio donde irá instalado.",
    },
    {
      numero: "02",
      titulo: "Diseño personalizado",
      descripcion:
        "Creamos una propuesta adaptada a tu estilo y necesidades con materiales de alta calidad.",
    },
    {
      numero: "03",
      titulo: "Visualización en 3D + AR",
      descripcion:
        "Antes de fabricar, podrás visualizar tu mueble en 3D y colocarlo en tu espacio utilizando la cámara de tu celular.",
    },
    {
      numero: "04",
      titulo: "Fabricación e instalación",
      descripcion:
        "Una vez aprobado el diseño, fabricamos e instalamos tu mueble con acabados profesionales.",
    },
  ];

  return (
    <section
      id="how"
      className="scroll-mt-24 bg-[#F8F5F1] py-16 md:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* Encabezado */}

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-xs font-semibold tracking-[4px] text-[#A36A33] sm:text-sm sm:tracking-[6px]">
            CÓMO TRABAJAMOS
          </p>

          <h2 className="mt-4 text-3xl font-bold text-[#2C241C] sm:text-4xl lg:text-5xl">
            Tu proyecto en 4 pasos
          </h2>

          <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
            Te acompañamos durante todo el proceso para que obtengas un
            resultado personalizado, funcional y con acabados de alta calidad.
          </p>

        </div>

        {/* Tarjetas */}

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-8">

          {pasos.map((paso) => (

            <div
              key={paso.numero}
              className="flex h-full flex-col rounded-3xl bg-white p-7 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl lg:p-8"
            >

              <div className="mb-6 text-5xl font-extrabold text-[#A36A33] lg:text-6xl">
                {paso.numero}
              </div>

              <h3 className="text-xl font-bold text-[#2C241C] lg:text-2xl">
                {paso.titulo}
              </h3>

              <p className="mt-4 flex-1 text-base leading-7 text-gray-600">
                {paso.descripcion}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}