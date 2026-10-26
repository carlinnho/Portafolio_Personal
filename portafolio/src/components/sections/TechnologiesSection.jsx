import { technologyGroups } from "../../data/technologies";
import { Heading, SectionLabel } from "../SectionHeading";

export default function TechnologiesSection() {
  return (
    <section id="tecnologias" className="page-section tech-section">
      <SectionLabel number="03">Tecnologías</SectionLabel>
      <div className="tech-heading">
        <Heading description="Herramientas organizadas por lo que permiten construir. Esta selección es temporal y se puede editar fácilmente.">
          Tecnología con
          <br />
          <em>intención.</em>
        </Heading>
      </div>
      <div className="tech-groups">
        {technologyGroups.map((group, index) => (
          <div className="tech-group" key={group.name}>
            <div className="tech-group-heading">
              <span>0{index + 1}</span>
              <h3>{group.name}</h3>
              <p>{group.description}</p>
            </div>
            <div className="tech-items">
              {group.items.map((item) => (
                <div
                  className="tech-chip"
                  key={item.name}
                  tabIndex="0"
                  aria-label={`${item.name}: ${item.detail}`}
                >
                  <span className="tech-monogram" aria-hidden="true">
                    {item.symbol}
                  </span>
                  <span>{item.name}</span>
                  <span className="chip-arrow" aria-hidden="true">
                    ↗
                  </span>
                  <span className="tech-popover" aria-hidden="true">
                    {item.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
