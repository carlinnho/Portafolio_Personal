import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { technologyGroups } from "../../data/technologies";
import DotGrid from "../DotGrid";
import { Heading, SectionLabel } from "../SectionHeading";
import "devicon/devicon.min.css";
import "./TechnologiesSection.css";

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.065 } },
};

const entryVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function TechnologiesSection() {
  const reducedMotion = useReducedMotion();
  const technologies = technologyGroups.flatMap((group) => group.items);

  return (
    <section id="tecnologias" className="page-section tech-section">
      <DotGrid
        className="tech-dot-grid"
        baseColor="#5d7597"
        activeColor="#b9dcff"
        shape="circle"
        dotSize={3}
        gap={19}
        proximity={55}
        strength={1}
        bounce={0.15}
        tension={0.4}
        returnDuration={1.4}
        shockRadius={320}
        shockStrength={7}
        swell={0.45}
        stretch={0.5}
        glow={0.5}
        fade={0.2}
        opacity={0.7}
        intro={!reducedMotion}
        mouseInteraction={!reducedMotion}
        clickShock={!reducedMotion}
        paused={Boolean(reducedMotion)}
      />
      <SectionLabel number="03">Tecnologías</SectionLabel>
      <Heading description="Herramientas con las que trabajo, creo y elaboro páginas web">
        Tecnología con
        <br />
        <em>intención.</em>
      </Heading>
      <m.ul
        className="tech-grid"
        initial={reducedMotion ? false : "hidden"}
        whileInView={reducedMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.15 }}
        variants={gridVariants}
      >
        {technologies.map((item) => (
          <m.li className="tech-entry" key={item.name} variants={entryVariants}>
            <div
              className="tech-card"
              style={{ "--tech-icon-hover": item.hoverColor }}
            >
              <span className="tech-card-icon" aria-hidden="true">
                <i className={item.icon} />
              </span>
              <span className="tech-card-name">{item.name}</span>
            </div>
          </m.li>
        ))}
      </m.ul>
    </section>
  );
}
