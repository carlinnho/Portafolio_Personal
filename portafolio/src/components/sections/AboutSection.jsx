import { useState } from "react";
import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { Heading, SectionLabel } from "../SectionHeading";

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const revealVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const tabs = [
  { id: "foto", file: "foto.jpg" },
  { id: "codigo", file: "sobre-mi.js" },
];

const services = [
  "Desarrollo web full stack",
  "Diseño de interfaces",
  "Productos de la idea a la publicación",
];

const facts = [
  ["ubicación", "Lima, Perú"],
  ["rol", "Full Stack"],
  ["estado", "abierto a proyectos"],
];

// Edita aquí tus gustos: [clave, valor]
const tastes = [
  ["Genero Favorito", "Rock/Metal"],
  ["Artistas Favoritos", "SOAD, MCR, Oasis, Queen"],
  ["Anime Favorito", "Jojos"],
];

// Sangría con espacios (no con padding) para no mover los números de línea
const i1 = "  ";
const i2 = "    ";

function CodeWindow() {
  const [active, setActive] = useState("foto");

  function onKeyDown(event) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    const next = active === "foto" ? "codigo" : "foto";
    setActive(next);
    document.getElementById(`tab-${next}`)?.focus();
  }

  return (
    <div className="code-window">
      <div className="window-bar">
        <div className="window-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div
          className="window-tabs"
          role="tablist"
          aria-label="Foto o código"
          onKeyDown={onKeyDown}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={active === tab.id}
              aria-controls={`panel-${tab.id}`}
              tabIndex={active === tab.id ? 0 : -1}
              className={`window-tab ${active === tab.id ? "is-active" : ""}`}
              onClick={() => setActive(tab.id)}
            >
              {tab.file}
            </button>
          ))}
        </div>
      </div>

      <div className="window-body">
        <div
          id="panel-foto"
          role="tabpanel"
          aria-labelledby="tab-foto"
          hidden={active !== "foto"}
          className="photo-panel"
        >
          <img
            src="/Foto_Personal.png"
            alt="Carlos Daniel Pure"
            className="photo-img"
          />
        </div>

        <div
          id="panel-codigo"
          role="tabpanel"
          aria-labelledby="tab-codigo"
          hidden={active !== "codigo"}
          className="code-panel"
        >
          <pre>
            <code>
              <span className="code-line">
                <span className="tok-kw">const</span>{" "}
                <span className="tok-var">carlos</span> = {"{"}
              </span>
              <span className="code-line">
                {i1}
                <span className="tok-key">rol</span>:{" "}
                <span className="tok-str">"Desarrollador Full Stack"</span>,
              </span>
              <span className="code-line">
                {i1}
                <span className="tok-key">disponible</span>:{" "}
                <span className="tok-bool">true</span>,
              </span>
              <span className="code-line">
                {i1}
                <span className="tok-key">servicios</span>: [
              </span>
              {services.map((service) => (
                <span className="code-line" key={service}>
                  {i2}
                  <span className="tok-str">{`"${service}"`}</span>,
                </span>
              ))}
              <span className="code-line">
                {i1}
                {"],"}
              </span>
              <span className="code-line">
                {i1}
                <span className="tok-key">gustos</span>: {"{"}
              </span>
              {tastes.map(([key, value]) => (
                <span className="code-line" key={key}>
                  {i2}
                  <span className="tok-key">{key}</span>:{" "}
                  <span className="tok-str">{`"${value}"`}</span>,
                </span>
              ))}
              <span className="code-line">
                {i1}
                {"},"}
              </span>
              <span className="code-line">{"};"}</span>
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default function AboutSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="sobre-mi" className="page-section about-section">
      <m.div
        variants={sectionVariants}
        initial={reducedMotion ? false : "hidden"}
        whileInView={reducedMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.15 }}
      >
        <m.div variants={revealVariants}>
          <SectionLabel number="01">Sobre mí</SectionLabel>
        </m.div>
        <div className="about-grid">
          <div className="about-copy">
            <m.div variants={revealVariants}>
              <Heading>
                Diseño experiencias
                <br />
                <em>digitales.</em>
              </Heading>
            </m.div>
            <m.div className="about-text" variants={revealVariants}>
              <p className="lead">
                Soy Carlos Daniel Pure Tocre, desarrollador Full Stack en Perú.
              </p>
              <p>
                Diseño y construyo soluciones web funcionales, desde páginas y
                landing pages hasta aplicaciones web.
              </p>
            </m.div>
            <m.dl className="about-facts" variants={revealVariants}>
              {facts.map(([key, value]) => (
                <div key={key}>
                  <dt>{key}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </m.dl>
          </div>
          <m.div variants={revealVariants}>
            <CodeWindow />
          </m.div>
        </div>
      </m.div>
    </section>
  );
}
