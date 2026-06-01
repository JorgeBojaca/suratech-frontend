import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "../../components/Container";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import useProject from "./hooks/useProject";
import DetailErrorBoundary from "./components/detail/DetailErrorBoundary";
import ProjectDetailSkeleton from "./components/detail/ProjectDetailSkeleton";
import DetailErrorState from "./components/detail/DetailErrorState";
import ProjectHeader from "./components/detail/ProjectHeader";
import HeroMedia from "./components/detail/HeroMedia";
import ProjectOverview from "./components/detail/ProjectOverview";
import ProjectGallery from "./components/detail/ProjectGallery";
import OutcomeBlock from "./components/detail/OutcomeBlock";
import ProjectPager from "./components/detail/ProjectPager";

/**
 * ProjectDetailPage — the case-study view container (spec §2.1).
 * Owns data via useProject(); renders the matching state (loading → skeleton,
 * not-found / error → DetailErrorState, success → article). The article is
 * wrapped in DetailErrorBoundary so a render crash never takes down the
 * shared header/footer.
 *
 * The project slug comes from the /work/:slug route param.
 */
function ProjectDetailPage() {
    const { slug } = useParams();
    const { project, isLoading, isError, isNotFound, refetch } = useProject(slug);

    useEffect(() => {
        const el = document.getElementById('top');
        el?.scrollIntoView({ behavior: 'smooth' });
    }, [slug]);

    return (
        <>
            <SiteHeader />

            <main id='top'>
                <Container className="st:py-12">
                    <DetailErrorBoundary onReset={refetch}>
                        <article className="st:flex st:flex-col st:gap-16 st:sm:gap-20">
                            {isLoading ? (
                                <ProjectDetailSkeleton />
                            ) : isNotFound ? (
                                <DetailErrorState variant="notFound" />
                            ) : isError ? (
                                <DetailErrorState variant="error" onRetry={refetch} />
                            ) : project ? (
                                <>
                                    <ProjectHeader project={project} />
                                    <HeroMedia src={project.coverUrl} alt={project.name} />
                                    <ProjectOverview body={project.body} />
                                    <ProjectGallery items={project.gallery} />
                                    <OutcomeBlock>{project.outcome}</OutcomeBlock>
                                    <ProjectPager prev={project.prev} next={project.next} />
                                </>
                            ) : null}
                        </article>
                    </DetailErrorBoundary>
                </Container>
            </main>

            <SiteFooter />
        </>
    );
}

export default ProjectDetailPage;
