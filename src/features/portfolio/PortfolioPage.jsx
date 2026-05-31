import Container from "../../components/Container";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import HeroIntro from "./components/showcase/HeroIntro";
import ProjectShowcase from "./components/showcase/ProjectShowcase";
import PortfolioErrorBoundary from "./components/showcase/PortfolioErrorBoundary";
import About from "./components/showcase/About";
import ContactCTA from "./components/showcase/ContactCTA";
import { useEffect } from "react";

function PortfolioPage() {

    useEffect(() => {
        const el = document.getElementById('top');
        el?.scrollIntoView({ behavior: 'smooth' });
    }, []);
    
    return <>
        <SiteHeader />

        <main id="top">
            <Container className="st:pb-8">
                <HeroIntro />
                <div id="work">
                    <PortfolioErrorBoundary>
                        <ProjectShowcase />
                    </PortfolioErrorBoundary>
                </div>
                <div id="about" className="st:mt-16 st:sm:mt-20">
                    <About />
                </div>
                <div id="contact">
                    <ContactCTA />
                </div>
            </Container>
        </main>

        <SiteFooter />
    </>;
}

export default PortfolioPage;
