import Icon from "../Icon";

export default function HomeSection() {
  return (
    <section id="inicio" className="page-section hero-section">
      <div className="hero-grid">
        <div className="hero-copy">
          <h1>
            Carlos Daniel
            <br />
            <em>
              Pure<span>.</span>
            </em>
          </h1>
          <p className="hero-description">
            Desarrollador de software enfocado en crear experiencias
            digitales claras, funcionales y cuidadas hasta el último
            detalle.
          </p>
          <div className="hero-actions">
            <a href="#proyectos" className="button-primary">
              Explorar proyectos <Icon name="arrow" size={18} />
            </a>
            <a href="#contacto" className="text-link">
              Hablemos ↗
            </a>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <span className="art-symbol">&lt;/&gt;</span>
        </div>
      </div>
    </section>
  );
}
