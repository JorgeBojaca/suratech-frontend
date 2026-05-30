/**
 * Tag — mono tech chip.
 * Used in showcase cards (TagList) and the detail meta bar.
 */
function Tag({ text }) {
    return (
        <span className="st:inline-flex st:items-center st:rounded-md st:border st:border-line st:px-2 st:py-0.5 st:font-mono st:text-xs st:text-muted">
            {text}
        </span>
    );
}

export default Tag;
