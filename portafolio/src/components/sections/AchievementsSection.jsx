import { achievements } from "../../data/achievements";
import Icon from "../Icon";
import { Heading, SectionLabel } from "../SectionHeading";

export default function AchievementsSection() {
  return (
    <section id="logros" className="page-section achievements-section">
      <SectionLabel number="04">Logros y certificaciones</SectionLabel>
      <Heading description="Un lugar para documentar formación, reconocimientos e hitos verificables. Los elementos actuales son marcadores temporales.">
        Logros y <em>certificaciones.</em>
      </Heading>
      <div className="achievements-list">
        {achievements.map((item, index) => (
          <article className="achievement" key={item.title}>
            <div className="achievement-icon">
              <Icon name={item.icon} size={24} />
            </div>
            <div className="achievement-main">
              <span>
                0{index + 1} / {item.category}
              </span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            <div className="achievement-end">
              {item.url ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Verificar ${item.title}`}
                >
                  <Icon name="external" size={18} />
                </a>
              ) : (
                <span>POR AÑADIR</span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
