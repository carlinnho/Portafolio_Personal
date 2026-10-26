import { Heading, SectionLabel } from "../SectionHeading";

export default function AboutSection() {
  return (
    <section id="sobre-mi" className="page-section about-section">
      <SectionLabel number="01">Sobre mí</SectionLabel>
      <div className="about-grid">
        <div>
          <Heading>
            Curiosidad que se
            <br />
            <em>convierte en ideas.</em>
          </Heading>
          <div
            className="about-photo"
            role="img"
            aria-label="Espacio reservado para una fotografía de Carlos Daniel Pure"
          >
            <span>Tu fotografía aquí</span>
          </div>
        </div>
        <div className="about-text">
          <p className="lead">
            Hola, soy Carlos. Me interesa construir productos digitales que
            se sientan simples de usar y sólidos por dentro.
          </p>
          <p>
            Este espacio está preparado para contar mi trayectoria, lo que
            estoy aprendiendo y las áreas del desarrollo que más me motivan.
            El contenido personal definitivo se agregará próximamente.
          </p>
        </div>
      </div>
    </section>
  );
}
