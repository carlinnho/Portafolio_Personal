import { useState } from "react";
import Icon from "../Icon";
import { Heading, SectionLabel } from "../SectionHeading";

function ContactForm() {
  const [status, setStatus] = useState({ type: "", message: "" });
  const [sending, setSending] = useState(false);
  const configured = Boolean(
    import.meta.env.VITE_EMAILJS_SERVICE_ID &&
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID &&
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  );
  async function submit(event) {
    event.preventDefault();
    if (!configured) {
      setStatus({
        type: "error",
        message:
          "El formulario aún no está configurado. Consulta el README para conectar EmailJS.",
      });
      return;
    }
    const form = event.currentTarget;
    const data = new FormData(form);
    setSending(true);
    setStatus({ type: "", message: "" });
    try {
      const response = await fetch(
        "https://api.emailjs.com/api/v1.0/email/send",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID,
            template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            user_id: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
            template_params: {
              from_name: String(data.get("name")).trim(),
              reply_to: String(data.get("email")).trim(),
              subject: String(data.get("subject")).trim(),
              message: String(data.get("message")).trim(),
            },
          }),
        },
      );
      if (!response.ok) throw new Error("EmailJS rechazó el envío");
      form.reset();
      setStatus({
        type: "success",
        message: "Mensaje enviado correctamente. ¡Gracias por escribirme!",
      });
    } catch {
      setStatus({
        type: "error",
        message: "No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.",
      });
    } finally {
      setSending(false);
    }
  }
  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-row">
        <label>
          Nombre
          <input
            name="name"
            autoComplete="name"
            placeholder="Tu nombre"
            required
            maxLength="100"
          />
        </label>
        <label>
          Correo electrónico
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="tu@correo.com"
            required
            maxLength="200"
          />
        </label>
      </div>
      <label>
        Asunto
        <input
          name="subject"
          placeholder="¿De qué hablamos?"
          required
          maxLength="150"
        />
      </label>
      <label>
        Mensaje
        <textarea
          name="message"
          rows="5"
          placeholder="Cuéntame sobre tu idea o proyecto..."
          required
          maxLength="5000"
        />
      </label>
      <div className="form-footer">
        <button type="submit" disabled={sending}>
          {sending ? "Enviando..." : "Enviar mensaje"}{" "}
          <Icon name="arrow" size={17} />
        </button>
        <span>Todos los campos son obligatorios.</span>
      </div>
      {!configured && (
        <p className="form-notice">
          Formulario pendiente de configuración con EmailJS.
        </p>
      )}
      {status.message && (
        <p
          className={`form-status ${status.type}`}
          role="status"
          aria-live="polite"
        >
          {status.message}
        </p>
      )}
    </form>
  );
}
export default function ContactSection() {
  return (
    <section id="contacto" className="page-section contact-section">
      <SectionLabel number="05">Contacto</SectionLabel>
      <div className="contact-grid">
        <div>
          <Heading description="Si tienes un proyecto, una pregunta o simplemente quieres conversar, déjame un mensaje.">
            Hagamos algo
            <br />
            <em>increíble.</em>
          </Heading>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
