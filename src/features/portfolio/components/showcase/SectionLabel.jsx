/**
 * SectionLabel — mono, uppercase section heading sitting above a hairline
 * top border (spec §1.2), e.g. "Selected Work — 2024 →". Renders as <h2>
 * since it labels the showcase section.
 */
function SectionLabel({ children, id }) {
  return (
    <div className="st:border-t st:border-line st:pt-4">
      <h2
        id={id}
        className="st:font-mono st:text-xs st:uppercase st:tracking-widest st:text-subtle"
      >
        {children}
      </h2>
    </div>
  );
}

export default SectionLabel;
