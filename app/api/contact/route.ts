import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
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
        <h2>📩 Nueva solicitud de presupuesto</h2>

        <hr>

        <p><strong>👤 Nombre:</strong> ${nombre}</p>

        <p><strong>📧 Correo:</strong> ${email}</p>

        <p><strong>📞 Teléfono:</strong> ${telefono}</p>

        <p><strong>🪵 Tipo de proyecto:</strong> ${servicio}</p>

        <p><strong>📏 Medidas:</strong></p>

        <ul>
          <li>Ancho: ${ancho} cm</li>
          <li>Alto: ${alto} cm</li>
          <li>Fondo: ${fondo} cm</li>
        </ul>

        <p><strong>💰 Presupuesto aproximado:</strong> ${presupuesto}</p>

        <p><strong>📝 Descripción del proyecto:</strong></p>

        <p>${mensaje}</p>

        <hr>

        <p>Solicitud enviada desde la página web de <strong>Muebles del Sur</strong>.</p>
      `,
    });

    return NextResponse.json(data);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Error al enviar el correo." },
      { status: 500 }
    );
  }
}