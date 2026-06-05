"use server";

import { Resend } from "resend";

interface ContactState {
  status: "idle" | "success" | "error";
  message?: string;
}

export async function sendContactEmail(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = formData.get("name")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const message = formData.get("message")?.toString().trim() ?? "";

  if (!name || !email || !message) {
    return { status: "error", message: "Rellena todos los campos." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { status: "error", message: "El email no es válido." };
  }

  if (message.length < 10) {
    return { status: "error", message: "El mensaje es demasiado corto." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      status: "error",
      message: "El servicio de email no está configurado aún.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "juandavid.gilcv@gmail.com",
      replyTo: email,
      subject: `[Portfolio] Mensaje de ${name}`,
      text: `Nombre: ${name}\nEmail: ${email}\n\n${message}`,
    });
    return { status: "success" };
  } catch {
    return {
      status: "error",
      message: "No se pudo enviar el mensaje. Inténtalo de nuevo.",
    };
  }
}
