import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import HomeSection from "./components/sections/HomeSection";
import AboutSection from "./components/sections/AboutSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import TechnologiesSection from "./components/sections/TechnologiesSection";
import AchievementsSection from "./components/sections/AchievementsSection";
import ContactSection from "./components/sections/ContactSection";
import "./App.css";

function App() {
  const [active, setActive] = useState("inicio");
  useEffect(() => {
    const sections = [...document.querySelectorAll("main section[id]")];
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const marker = window.innerHeight * 0.35;
        const current = [...sections]
          .reverse()
          .find((section) => section.getBoundingClientRect().top <= marker);
        setActive(current?.id || "inicio");
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return (
    <>
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <Sidebar active={active} />
      <main id="contenido">
        <HomeSection />
        <AboutSection />
        <ProjectsSection />
        <TechnologiesSection />
        <AchievementsSection />
        <ContactSection />
      </main>
      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Carlos Daniel Pure</span>
        <span>Diseñado y construido con intención.</span>
        <a href="#inicio">Volver arriba ↑</a>
      </footer>
    </>
  );
}
export default App;
