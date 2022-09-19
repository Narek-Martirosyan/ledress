import './categoriesField.scss';

export const CategoriesField = ({ tags, onClick }) => {
    return (
        <div className="filter-widget">
            <h2 className="fw-title">Categories</h2>
            <ul className="category-menu">
                {tags?.map((tag, index) => (
                    <li
                        key={tag + "-" + index}
                        onClick={(e) => onClick(e.target.innerHTML)}
                    >
                        <p>{tag}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}