/**
 * RichText — renders the project body as readable prose.
 * Splits the source into paragraphs on blank lines and renders them as TEXT
 * (not innerHTML), so untrusted content can never inject markup.
 *
 * NOTE: if the body source becomes real HTML/markdown and you want it
 * rendered, sanitize it first (e.g. DOMPurify) before switching to
 * dangerouslySetInnerHTML — never inject unsanitized backend HTML.
 */
function RichText({ body }) {
  const paragraphs = String(body)
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="st:flex st:max-w-prose st:flex-col st:gap-4 st:text-base st:leading-relaxed st:text-muted">
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

/**
 * ProjectOverview — the "brief" of the case study (spec §2.1/§2.2).
 * A mono section label over body prose, capped at max-w-prose for a
 * comfortable reading measure.
 *
 * @param {string} body  the project narrative
 */
function ProjectOverview({ body }) {
  if (!body) return null;

  return (
    <section className="st:flex st:flex-col st:gap-4">
      <h2 className="st:font-mono st:text-xs st:uppercase st:tracking-widest st:text-subtle">
        The Brief
      </h2>
      <RichText body={body} />
    </section>
  );
}

export default ProjectOverview;
