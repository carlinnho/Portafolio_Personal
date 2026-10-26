import { useEffect, useRef, useState } from "react";
import { projects } from "../../data/projects";
import Icon from "../Icon";
import { Heading, SectionLabel } from "../SectionHeading";

function ProjectPreview({ project }) {
  return (
    <div
      className={`project-preview ${project.theme}`}
      role="img"
      aria-label={`Imagen temporal para ${project.name}; reemplazar por captura real`}
    >
      <span className="preview-mark" aria-hidden="true">
        {project.name.slice(0, 1)}
      </span>
      <span className="preview-label">IMAGEN TEMPORAL · {project.type}</span>
    </div>
  );
}
function ProjectCard({ project, index }) {
  return (
    <article className="project-card">
      <ProjectPreview project={project} />
      <div className="project-content">
        <div className="project-meta">
          <span>PROYECTO / 0{index + 1}</span>
          <span>{project.type}</span>
        </div>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <div className="tags">
          {project.technologies.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <div className="project-action">
          {project.demoUrl ? (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              Ver demo <Icon name="external" size={16} />
            </a>
          ) : (
            <span>
              Demo próximamente <Icon name="arrow" size={16} />
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
function ProjectsCarousel() {
  const trackRef = useRef(null);
  const [position, setPosition] = useState({
    index: 0,
    canPrev: false,
    canNext: projects.length > 1,
  });
  function updatePosition() {
    const track = trackRef.current;
    if (!track) return;
    const cards = [...track.children];
    const closest = cards.reduce(
      (best, card, index) =>
        Math.abs(card.offsetLeft - cards[0].offsetLeft - track.scrollLeft) <
        Math.abs(
          cards[best].offsetLeft - cards[0].offsetLeft - track.scrollLeft,
        )
          ? index
          : best,
      0,
    );
    setPosition({
      index: closest,
      canPrev: track.scrollLeft > 3,
      canNext: track.scrollLeft < track.scrollWidth - track.clientWidth - 3,
    });
  }
  useEffect(() => {
    const track = trackRef.current;
    const resize = new ResizeObserver(updatePosition);
    resize.observe(track);
    updatePosition();
    return () => resize.disconnect();
  }, []);
  function move(direction) {
    const track = trackRef.current;
    const card = track?.firstElementChild;
    if (!card) return;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    track.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: "smooth",
    });
  }
  return (
    <div className="carousel">
      <div className="carousel-controls">
        <span aria-live="polite">
          {String(position.index + 1).padStart(2, "0")} /{" "}
          {String(projects.length).padStart(2, "0")}
        </span>
        <div>
          <button
            type="button"
            onClick={() => move(-1)}
            disabled={!position.canPrev}
            aria-label="Proyecto anterior"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            disabled={!position.canNext}
            aria-label="Proyecto siguiente"
          >
            →
          </button>
        </div>
      </div>
      <div
        className="projects-track"
        ref={trackRef}
        onScroll={updatePosition}
        role="region"
        aria-roledescription="carrusel"
        aria-label="Proyectos destacados"
        tabIndex="0"
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
export default function ProjectsSection() {
  return (
    <section id="proyectos" className="page-section projects-section">
      <SectionLabel number="02">Proyectos</SectionLabel>
      <Heading description="Los proyectos y sus imágenes son ejemplos temporales.">
        Proyectos <em>destacados.</em>
      </Heading>
      <ProjectsCarousel />
    </section>
  );
}
