import ProjectCardSkeleton from "./ProjectCardSkeleton";

const SKELETON_COUNT = 3;

function ProjectListSkeleton() {

    return (<ul className="st:flex st:flex-col st:gap-12">
        {Array.from({ length: SKELETON_COUNT }).map((_, idx) => (
            <ProjectCardSkeleton key={idx} />
        ))}
    </ul>)
}

export default ProjectListSkeleton;