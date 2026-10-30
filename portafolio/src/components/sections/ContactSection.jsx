import { useState } from "react";
import Icon from "../Icon";
import MusicNotes from "../MusicNotes";
import { Heading, SectionLabel } from "../SectionHeading";

const WHATSAPP_NUMBER = "51960142988";
const initialValues = { name: "", email: "", subject: "", message: "" };

function ContactForm() {
  const [method, setMethod] = useState("email");
  const [values, setValues] = useState(initialValues);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [sending, setSending] = useState(false);
  const sent = status.type === "success";
  const buttonState = sending ? "sending" : sent ? "success" : status.type === "whatsapp" ? "whatsapp" : "default";
  const buttonLabel = {
    sending: "Enviando...",
    success: "Mensaje enviado correctamente",
    whatsapp: "Continúa en WhatsApp",
    default: "Enviar mensaje",
  }[buttonState];
  const emailConfigured = Boolean(
    import.meta.env.VITE_EMAILJS_SERVICE_ID &&
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID &&
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  );

  function selectMethod(nextMethod) {
    setMethod(nextMethod);
    setStatus({ type: "", message: "" });
  }

  function updateField(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (status.type) setStatus({ type: "", message: "" });
  }

  async function submit(event) {
    event.preventDefault();
    const name = values.name.trim();
    const message = values.message.trim();

    if (!name || !message || (method === "email" && !values.subject.trim())) {
      setStatus({ type: "error", message: "Completa todos los campos obligatorios." });
      return;
    }

    if (method === "whatsapp") {
      const text = `Hola, soy ${name}.\n\n${message}`;
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
        "_blank",
        "noopener,noreferrer",
      );
      setStatus({ type: "whatsapp", message: "Continúa en WhatsApp" });
      return;
    }

    if (!emailConfigured) {
      setStatus({
        type: "error",
        message:
          "El formulario aún no está configurado. Consulta el README para conectar EmailJS.",
      });
      return;
    }

    setSending(true);
    setStatus({ type: "", message: "" });
    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID,
          template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          user_id: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
          template_params: {
            from_name: name,
            reply_to: values.email.trim(),
            subject: values.subject.trim(),
            message,
          },
        }),
      });
      if (!response.ok) throw new Error("EmailJS rechazó el envío");
      setValues(initialValues);
      setStatus({
        type: "success",
        message: "Mensaje enviado correctamente",
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
      <div className="contact-method-switch" role="group" aria-label="Medio de contacto">
        <button
          type="button"
          aria-pressed={method === "email"}
          className={method === "email" ? "is-active" : ""}
          onClick={() => selectMethod("email")}
          disabled={sending}
        >
          Correo
        </button>
        <button
          type="button"
          aria-pressed={method === "whatsapp"}
          className={method === "whatsapp" ? "is-active" : ""}
          onClick={() => selectMethod("whatsapp")}
          disabled={sending}
        >
          WhatsApp
        </button>
      </div>
      <div className="contact-form-divider" aria-hidden="true" />

      <div className={`form-row${method === "whatsapp" ? " single" : ""}`}>
        <label>
          <span>Nombre <b aria-hidden="true">*</b></span>
          <input
            name="name"
            autoComplete="name"
            placeholder="Tu nombre"
            required
            maxLength="100"
            value={values.name}
            onChange={updateField}
          />
        </label>
        {method === "email" && (
          <label>
            <span>Correo electrónico <b aria-hidden="true">*</b></span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="tu@correo.com"
              required
              maxLength="200"
              value={values.email}
              onChange={updateField}
            />
          </label>
        )}
      </div>
      {method === "email" && (
        <label>
          <span>Asunto <b aria-hidden="true">*</b></span>
          <input
            name="subject"
            placeholder="¿De qué hablamos?"
            required
            maxLength="150"
            value={values.subject}
            onChange={updateField}
          />
        </label>
      )}
      <label>
        <span>Mensaje <b aria-hidden="true">*</b></span>
        <textarea
          name="message"
          rows="5"
          placeholder="Cuéntame sobre tu idea o proyecto..."
          required
          maxLength="5000"
          value={values.message}
          onChange={updateField}
        />
      </label>
      <div className="form-footer">
        <button
          type="submit"
          className={`contact-submit${sent ? " is-success" : ""}`}
          disabled={sending || sent}
        >
          <span key={buttonState} className="contact-submit-content" aria-live="polite">
            {buttonLabel}
            <Icon name={sent ? "check" : "arrow"} size={18} />
          </span>
        </button>
        <span>Los campos con * son obligatorios.</span>
      </div>
      {method === "email" && !emailConfigured && (
        <p className="form-notice">Formulario pendiente de configuración con EmailJS.</p>
      )}
      {status.message && status.type === "error" && (
        <p className={`form-status ${status.type}`} role="status" aria-live="polite">
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
        <div className="contact-intro">
          <Heading description="Si tienes un proyecto, una pregunta o simplemente quieres conversar, déjame un mensaje.">
            Hagamos algo
            <br />
            <em>increíble.</em>
          </Heading>
          <nav className="contact-socials" aria-label="Redes sociales">
            <a href="https://www.linkedin.com/in/carlos-daniel-pure-tocre/" target="_blank" rel="noopener noreferrer">
              <Icon name="linkedin" size={20} /> LinkedIn
            </a>
            <a href="https://github.com/carlinnho" target="_blank" rel="noopener noreferrer">
              <Icon name="github" size={20} /> GitHub
            </a>
          </nav>
          <MusicNotes />
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
