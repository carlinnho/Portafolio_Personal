import { useEffect, useState } from "react";
import { LazyMotion, domAnimation } from "motion/react";
import Sidebar from "./components/Sidebar";
import CustomCursor from "./components/CustomCursor";
import HomeSection from "./components/sections/HomeSection";
import AboutSection from "./components/sections/AboutSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import TechnologiesSection from "./components/sections/TechnologiesSection";
import ServicesSection from "./components/sections/ServicesSection";
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
    <LazyMotion features={domAnimation} strict>
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <Sidebar active={active} />
      <main id="contenido">
        <HomeSection />
        <AboutSection />
        <ProjectsSection />
        <TechnologiesSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <footer className="site-footer">
        <div className="site-footer-inner">
          <div className="site-footer-identity">
            <span>Carlos Daniel Pure</span>
            <small>Desarrollador Full Stack</small>
          </div>
          <a className="site-footer-back-to-top" href="#inicio">
            Volver arriba <span aria-hidden="true">↑</span>
          </a>
          <span className="site-footer-copyright">© {new Date().getFullYear()} Carlos Daniel Pure</span>
        </div>
      </footer>
      <CustomCursor />
    </LazyMotion>
  );
}
export default App;
