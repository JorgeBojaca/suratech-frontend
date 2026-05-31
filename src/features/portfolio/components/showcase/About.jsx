import SectionLabel from './SectionLabel';

/**
 * About — short bio section (referenced by the nav's "About" link).
 * Mono section label over prose, capped at max-w-prose for readability.
 * Section content is intentionally brief, in keeping with the minimalist tone.
 */
function About() {
  return (
    <section aria-labelledby="about-label">
      <SectionLabel id="about-label">About</SectionLabel>

      <div className="st:mt-8 st:flex st:max-w-prose st:flex-col st:gap-4 st:text-lg st:leading-relaxed st:text-muted">
        <p>
          I&apos;m a Systems Engineer and Full-stack Developer focused on bridging
          the gap between robust data architecture and clean, high-performance interfaces.
          I care deeply about software maintainability, query efficiency, and the fine
          details that make complex enterprise workflows feel simple and effortless.
        </p>

        <p>
          My background is rooted in core backend engineering and relational databases,
          building and optimizing scalable data pipelines for corporate productivity platforms.
          Currently, I am actively accelerating my capabilities in modern frontend development,
          focusing my execution on building fast, reliable client-side applications with React,
          vanilla JavaScript, and utility-first styling.
        </p>

        <p>
          I prefer a pragmatic approach to engineering: leveraging my full-stack background
          to build frontend solutions oriented around real business value, while writing
          predictable code rather than chasing every new framework trend.
        </p>
      </div>
    </section>
  );
}

export default About;
