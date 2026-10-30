import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import Icon from "../Icon";
import { Heading, SectionLabel } from "../SectionHeading";
import "./ServicesSection.css";

const services = [
  {
    title: "Páginas web",
    icon: "monitor",
    description: "Sitios corporativos, informativos y portafolios que se adaptan a cada pantalla.",
  },
  {
    title: "Landing pages",
    icon: "layout",
    description: "Páginas claras y atractivas para presentar productos, servicios o campañas.",
  },
  {
    title: "Aplicaciones web",
    icon: "code",
    description: "Interfaces interactivas con funciones y datos pensados para una necesidad concreta.",
  },
];

const steps = [
  {
    title: "Entiendo la necesidad",
    description: "Escucho tu idea y definimos los objetivos.",
  },
  {
    title: "Planifico y diseño",
    description: "Organizo la solución y diseño su estructura.",
  },
  {
    title: "Desarrollo y valido",
    description: "Construyo, probamos y ajustamos en conjunto.",
  },
  {
    title: "Publico y ajusto",
    description: "Lanzamos la web y verificamos que funcione bien.",
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const reveal = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ServicesSection() {
  const reducedMotion = useReducedMotion();
  const animation = {
    variants: stagger,
    initial: reducedMotion ? false : "hidden",
    whileInView: reducedMotion ? undefined : "visible",
    viewport: { once: true, amount: 0.15 },
  };

  return (
    <section id="servicios" className="page-section services-section">
      <m.div className="services-intro" {...animation}>
        <m.div variants={reveal}>
          <SectionLabel number="04">Qué puedo aportar</SectionLabel>
        </m.div>
        <m.div variants={reveal}>
          <Heading description="De la idea a la publicación: creo contigo una web clara, funcional y hecha para tus objetivos.">
            Diseño y desarrollo <em>soluciones web.</em>
          </Heading>
        </m.div>
      </m.div>

      <div className="services-layout">
        <div className="services-content">
          <h3>Lo que puedo desarrollar</h3>
          <m.div className="services-grid" {...animation}>
            {services.map((service) => (
              <m.div className="service-card-reveal" key={service.title} variants={reveal}>
                <article className="service-card">
                  <span className="service-card-icon">
                    <Icon name={service.icon} size={22} />
                  </span>
                  <div>
                    <h4>{service.title}</h4>
                    <p>{service.description}</p>
                  </div>
                </article>
              </m.div>
            ))}
          </m.div>
        </div>

        <div className="services-process">
          <h3>Cómo trabajo</h3>
          <m.ol className="services-steps" {...animation}>
            {steps.map((step, index) => (
              <m.li className="services-step" key={step.title} variants={reveal}>
                <span className="services-step-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </div>
              </m.li>
            ))}
          </m.ol>
        </div>
      </div>
    </section>
  );
}
