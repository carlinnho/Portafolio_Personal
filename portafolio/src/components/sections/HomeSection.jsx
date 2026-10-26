import Icon from "../Icon";
import "./HomeSection.css";

export default function HomeSection() {
  return (
    <section id="inicio" className="page-section hero-section">
      <div className="hero-scene" aria-hidden="true" />
      <div className="hero-content">
        <div className="hero-copy">
          <span className="hero-kicker">Desarrollador Full Stack</span>
          <h1>
            Hola, soy
            <br />
            <em>Carlos Daniel Pure.</em>
          </h1>
          <p className="hero-description">
            Diseño y construyo productos web de principio a fin, desde la idea
            hasta su publicación. Me importa que cada solución sea clara,
            funcional y esté cuidada hasta el último detalle.
          </p>
          <div className="hero-actions">
            <a href="#proyectos" className="button-primary">
              Mira mis proyectos <Icon name="arrow" size={18} />
            </a>
            <a href="#contacto" className="text-link">
              Hablemos ↗
            </a>
          </div>
        </div>
      </div>
      <a className="hero-scroll" href="#sobre-mi">
        Descubre más <span aria-hidden="true">↓</span>
      </a>
    </section>
  );
}
