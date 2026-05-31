import Container from './Container';
import SocialLinks from './SocialLinks';
import Colophon from './Colophon';

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/JorgeBojaca' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jorge-bojaca' }
];
/**
 * SiteFooter — shared page footer (spec §1.1), used by both the showcase and
 * detail views. Hairline top border; social links and colophon stack on
 * mobile and sit on opposite ends at sm+.
 */
function SiteFooter() {
  return (
    <footer className="st:border-t st:border-line">
      <Container className="st:flex st:flex-col st:gap-4 st:py-8 st:sm:flex-row st:sm:items-center st:sm:justify-between">
        <SocialLinks links={LINKS} />
        <Colophon />
      </Container>
    </footer>
  );
}

export default SiteFooter;
