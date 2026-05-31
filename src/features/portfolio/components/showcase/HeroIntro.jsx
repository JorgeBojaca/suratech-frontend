import Eyebrow from './Eyebrow';
import DisplayHeadline from './DisplayHeadline';
import AvailabilityPill from './AvailabilityPill';

/**
 * HeroIntro — above-the-fold identity block (spec §1.1).
 * No image dependency: renders immediately, independent of project data.
 * Mobile-first stacked rhythm; the availability pill sits below the headline
 * on mobile and floats to the right of it at lg.
 */
function HeroIntro() {
  return (
    <section className="st:py-16 st:sm:py-20 st:lg:py-28">
      <Eyebrow>Developer</Eyebrow>

      <div className="st:mt-6 st:flex st:flex-col st:gap-6 st:lg:flex-row st:lg:items-end st:lg:justify-between">
        <DisplayHeadline>I build calm, fast interfaces for the web.</DisplayHeadline>
        <div className="st:shrink-0">
          <AvailabilityPill/>
        </div>
      </div>
    </section>
  );
}

export default HeroIntro;
