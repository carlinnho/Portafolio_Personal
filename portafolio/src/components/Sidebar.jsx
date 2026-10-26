import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import "./Sidebar.css";

const nav = [
  ["inicio", "Inicio", "home"],
  ["sobre-mi", "Sobre mí", "user"],
  ["proyectos", "Proyectos", "grid"],
  ["tecnologias", "Tecnologías", "layers"],
  ["logros", "Logros", "award"],
  ["contacto", "Contacto", "mail"],
];

function NavigationLinks({ active, onNavigate }) {
  return nav.map(([id, label, icon], index) => (
    <a
      key={id}
      href={`#${id}`}
      className={`sidebar-link ${active === id ? "active" : ""}`}
      aria-current={active === id ? "location" : undefined}
      onClick={onNavigate}
    >
      <Icon name={icon} size={20} />
      <span className="sidebar-link-label">{label}</span>
      <span className="sidebar-link-number" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
    </a>
  ));
}

export default function Sidebar({ active }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const activeLabel = nav.find(([id]) => id === active)?.[1] ?? "Inicio";

  useEffect(() => {
    const media = window.matchMedia("(max-width: 900px)");
    const closeOnDesktop = () => {
      if (!media.matches) setIsOpen(false);
    };
    media.addEventListener("change", closeOnDesktop);
    return () => media.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector("a")?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
      if (event.key !== "Tab") return;

      const focusable = [
        toggleRef.current,
        ...menuRef.current.querySelectorAll("a"),
      ];
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <nav className="sidebar" aria-label="Navegación principal">
        <div className="sidebar-links">
          <NavigationLinks active={active} />
        </div>
      </nav>

      <div
        className={`mobile-navigation ${isOpen ? "is-open" : ""}`}
        role={isOpen ? "dialog" : undefined}
        aria-modal={isOpen ? "true" : undefined}
        aria-label={isOpen ? "Menú de navegación" : undefined}
      >
        <div className="mobile-nav-header">
          <div className="mobile-current-section">
            <span>Sección actual</span>
            <strong>{activeLabel}</strong>
          </div>
          <button
            ref={toggleRef}
            type="button"
            className="mobile-menu-toggle"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu-links"
            onClick={() => setIsOpen((open) => !open)}
          >
            <span className="mobile-menu-icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
        <nav
          id="mobile-menu-links"
          ref={menuRef}
          className="mobile-menu-links"
          aria-label="Atajos a secciones"
          hidden={!isOpen}
        >
          <p>Ir a una sección</p>
          <NavigationLinks
            active={active}
            onNavigate={() => {
              setIsOpen(false);
              toggleRef.current?.focus();
            }}
          />
        </nav>
      </div>
    </>
  );
}
