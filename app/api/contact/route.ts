import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {

    const {
      nombre,
      telefono,
      email,
      servicio,
      ancho,
      alto,
      fondo,
      presupuesto,
      mensaje,
    } = await request.json();

    const data = await resend.emails.send({
      from: "Muebles del Sur <onboarding@resend.dev>",
      to: ["mueblesdelsur.es@gmail.com"],
      subject: "Nueva solicitud de presupuesto",

      html: `
        <h2>Nueva solicitud de presupuesto</h2>

        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Proyecto:</strong> ${servicio}</p>

        <p><strong>Medidas:</strong></p>

        <ul>
          <li>Ancho: ${ancho}</li>
          <li>Alto: ${alto}</li>
          <li>Fondo: ${fondo}</li>
        </ul>

        <p><strong>Presupuesto:</strong> ${presupuesto}</p>

        <p>${mensaje}</p>
      `,
    });

    return NextResponse.json(data);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Error enviando correo" },
      { status: 500 }
    );

  }

}