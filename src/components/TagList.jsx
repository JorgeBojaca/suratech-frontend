import Tag from './Tag';

/**
 * TagList — renders a project's stack[] as a row of mono Tag chips.
 * Used in showcase cards and the detail meta bar.
 */
function TagList({ tags }) {
    if (!tags?.length) return null;

    return (
        <ul className="st:flex st:flex-wrap st:gap-2">
            {tags.map((tag) => (
                <li key={tag}>
                    <Tag text={tag} />
                </li>
            ))}
        </ul>
    );
}

export default TagList;
