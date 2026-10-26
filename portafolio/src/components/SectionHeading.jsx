export function SectionLabel({ number, children }) {
  return (
    <div className="section-index">
      <strong>{number}</strong>
      <span>{children}</span>
    </div>
  );
}
export function Heading({ children, description }) {
  return (
    <div className="section-heading">
      <h2>{children}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
