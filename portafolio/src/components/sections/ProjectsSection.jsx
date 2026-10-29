import { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { projects } from "../../data/projects";
import Icon from "../Icon";
import { Heading, SectionLabel } from "../SectionHeading";

function ProjectPreview({ project }) {
  return (
    <div className={`project-preview ${project.theme}`} aria-hidden="true">
      <div className="preview-browser">
        <span className="preview-browser-bar">
          <span className="preview-browser-dots">● ● ●</span>
          <span>{new URL(project.demoUrl).hostname}</span>
        </span>
        <img
          className="preview-browser-image"
          src={project.image}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}
function ProjectCard({ project }) {
  const creditsRef = useRef(null);
  const isTeamProject = Boolean(project.collaborators?.length);

  return (
    <article className="project-card">
      <ProjectPreview project={project} />
      <div className="project-content">
        <div className="project-meta">
          <span>{project.type}</span>
          <span>{isTeamProject ? "En equipo" : "Individual"}</span>
        </div>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <div className="project-action">
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
            Ver sitio <Icon name="external" size={16} />
          </a>
          {isTeamProject && (
            <button
              type="button"
              onClick={() => creditsRef.current?.showModal()}
            >
              Ver créditos
            </button>
          )}
        </div>
      </div>
      {isTeamProject && (
        <dialog
          ref={creditsRef}
          className="project-credits-dialog"
          aria-labelledby={`${project.id}-credits-title`}
          onClick={(event) => {
            if (event.target === event.currentTarget)
              event.currentTarget.close();
          }}
        >
          <div className="project-credits-content">
            <button
              type="button"
              className="credits-close"
              onClick={() => creditsRef.current?.close()}
              aria-label="Cerrar créditos"
            >
              <Icon name="close" size={18} />
            </button>
            <span className="credits-eyebrow">
              {project.organization} · Trabajo en equipo
            </span>
            <h4 id={`${project.id}-credits-title`}>
              Créditos de {project.name}
            </h4>
            <h5>Mi participación</h5>
            <p>{project.contribution}</p>
            <h5>Colaboradores</h5>
            <ul>
              {project.collaborators.map((person) => (
                <li key={person.name}>
                  <a
                    href={person.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {person.name} <Icon name="external" size={14} />
                  </a>
                  {person.contribution && <span>{person.contribution}</span>}
                </li>
              ))}
            </ul>
            {project.creditNote && (
              <p className="credits-note">{project.creditNote}</p>
            )}
          </div>
        </dialog>
      )}
    </article>
  );
}
function ProjectsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });
  const [carouselState, setCarouselState] = useState({
    selected: 0,
    snaps: [],
    canPrev: false,
    canNext: false,
  });

  useEffect(() => {
    if (!emblaApi) return;

    const updateControls = () => {
      setCarouselState({
        selected: emblaApi.selectedScrollSnap(),
        snaps: emblaApi.scrollSnapList(),
        canPrev: emblaApi.canScrollPrev(),
        canNext: emblaApi.canScrollNext(),
      });
    };

    updateControls();
    emblaApi.on("select", updateControls).on("reInit", updateControls);
    return () => {
      emblaApi.off("select", updateControls).off("reInit", updateControls);
    };
  }, [emblaApi]);

  return (
    <div className="carousel">
      <div className="carousel-buttons">
        <button
          className="carousel-arrow"
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!carouselState.canPrev}
          aria-label="Proyecto anterior"
        >
          <Icon name="arrowLeft" size={19} />
        </button>
        <button
          className="carousel-arrow"
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!carouselState.canNext}
          aria-label="Proyecto siguiente"
        >
          <Icon name="arrow" size={19} />
        </button>
      </div>
      <div
        className="projects-viewport"
        ref={emblaRef}
        role="region"
        aria-roledescription="carrusel"
        aria-label="Proyectos destacados"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            emblaApi?.scrollPrev();
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            emblaApi?.scrollNext();
          }
        }}
      >
        <div className="projects-track">
          {projects.map((project) => (
            <div className="project-slide" key={project.id}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
      <div className="carousel-controls">
        <div
          className="carousel-dots"
          role="group"
          aria-label="Elegir proyecto"
        >
          {carouselState.snaps.map((_, index) => (
            <button
              className={`carousel-dot${index === carouselState.selected ? " is-selected" : ""}`}
              key={index}
              type="button"
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={`Ir al proyecto ${index + 1}: ${projects[index]?.name ?? ""}`}
              aria-current={
                index === carouselState.selected ? "true" : undefined
              }
            />
          ))}
        </div>
        <span className="carousel-count" aria-live="polite">
          {String(carouselState.selected + 1).padStart(2, "0")} /{" "}
          {String(projects.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
export default function ProjectsSection() {
  return (
    <section id="proyectos" className="page-section projects-section">
      <SectionLabel number="02">Proyectos</SectionLabel>
      <Heading description="Sitios que diseñé y desarrollé de forma individual y en equipo">
        Proyectos <em>Desarrollados.</em>
      </Heading>
      <ProjectsCarousel />
      <p className="projects-rights-note">
        Las marcas y los contenidos de cada sitio corresponden a sus respectivos
        titulares. Aquí describo mi participación en cada proyecto y reconozco
        el trabajo de mis compañeros.
      </p>
    </section>
  );
}
