import './brands.scss';

export const Brands = ({ brands, count, onClick }) => {
    return (
        <div className="filter-widget">
            <h2 className="fw-title">Brand</h2>

            <ul className="category-menu">
                {brands?.map((brand, index) => (
                    <li
                        key={brand + "-" + index}
                        onClick={(e) => onClick(e.target.innerText.split(" (")[0])}
                    >
                        <p>{brand} <span>({count[brand]})</span></p>
                    </li>
                ))}
            </ul>
        </div>
    )
}