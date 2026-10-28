import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import Aurora from "../Aurora";
import Icon from "../Icon";
import "./HomeSection.css";

const contentVariants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.12, staggerChildren: 0.14 },
  },
};

const revealVariants = {
  hidden: { opacity: 0, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const scrollVariants = {
  hidden: { opacity: 0, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.65, delay: 0.9 },
  },
};

export default function HomeSection() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <section
      id="inicio"
      className="page-section hero-section"
    >
      <div className="hero-scene" aria-hidden="true">
        <Aurora
          colorStops={["#5c90f8", "#1d3cf3", "#b1c7fa"]}
          amplitude={0.7}
          blend={0.5}
          height={0.57}
          speed={0.7}
          glow={0.6}
          scale={1}
          brightness={1}
          layers={1}
          direction="top"
          opacity={1}
          mouseInteraction
          intro
          lightMode={false}
        />
      </div>
      <div className="hero-content">
        <m.div
          className="hero-copy"
          variants={contentVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
        >
          <m.span className="hero-kicker" variants={revealVariants}>
            Desarrollador Full Stack
          </m.span>
          <m.h1 variants={revealVariants}>
            Hola, soy
            <br />
            <em>Carlos Daniel Pure.</em>
          </m.h1>
          <m.p className="hero-description" variants={revealVariants}>
            Diseño y construyo productos web de principio a fin, desde la idea
            hasta su publicación. Me importa que cada solución sea clara,
            funcional y esté cuidada hasta el último detalle.
          </m.p>
          <m.div className="hero-actions" variants={revealVariants}>
            <a href="#proyectos" className="button-primary">
              Mira mis proyectos <Icon name="arrow" size={18} />
            </a>
            <a href="#contacto" className="text-link">
              Hablemos ↗
            </a>
          </m.div>
        </m.div>
      </div>
      <m.a
        className="hero-scroll"
        href="#sobre-mi"
        variants={scrollVariants}
        initial={shouldReduceMotion ? false : "hidden"}
        animate="visible"
      >
        Descubre más{" "}
        <m.span
          aria-hidden="true"
          animate={shouldReduceMotion ? { y: 0 } : { y: [-3, 5, -3] }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
          }
        >
          ↓
        </m.span>
      </m.a>
    </section>
  );
}
