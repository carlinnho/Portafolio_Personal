import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import "./Sidebar.css";

const nav = [
  ["inicio", "Inicio", "home"],
  ["sobre-mi", "Sobre mí", "user"],
  ["proyectos", "Proyectos", "grid"],
  ["tecnologias", "Tecnologías", "layers"],
  ["servicios", "Qué puedo aportar", "code"],
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
  const [menuReady, setMenuReady] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const activeLabel = nav.find(([id]) => id === active)?.[1] ?? "Inicio";

  function closeMenu() {
    setMenuReady(false);
    setIsOpen(false);
  }

  useEffect(() => {
    const media = window.matchMedia("(max-width: 900px)");
    const closeOnDesktop = () => {
      if (!media.matches) {
        setMenuReady(false);
        setIsOpen(false);
      }
    };
    media.addEventListener("change", closeOnDesktop);
    return () => media.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(
      () => setMenuReady(true),
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1000,
    );

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuReady(false);
        setIsOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      if (menuRef.current?.inert) {
        event.preventDefault();
        toggleRef.current?.focus();
        return;
      }

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
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (menuReady) menuRef.current?.querySelector("a")?.focus();
  }, [menuReady]);

  return (
    <>
      <nav className="sidebar" aria-label="Navegación principal">
        <a className="nav-emblem" href="#inicio" aria-label="Ir al inicio">
          <Icon name="trebleClef" size={28} />
        </a>
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
          <span className="mobile-nav-emblem" aria-hidden="true">
            <Icon name="trebleClef" size={28} />
          </span>
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
            onClick={() => (isOpen ? closeMenu() : setIsOpen(true))}
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
          aria-hidden={!menuReady}
          inert={!menuReady}
        >
          <p>Ir a una sección</p>
          <NavigationLinks
            active={active}
            onNavigate={() => {
              closeMenu();
              toggleRef.current?.focus();
            }}
          />
        </nav>
      </div>
    </>
  );
}
