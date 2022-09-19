import './productSizes.scss';

export const ProductSizes = () => {
    return (
        <div className="filter-widget mb-0">
            <h2 className="fw-title">Size</h2>

            <div className="fw-size-choose">
                <div className="sc-item">
                    <input type="radio" name="sc" id="xs-size" />
                    <label htmlFor="xs-size">XS</label>
                </div>

                <div className="sc-item">
                    <input type="radio" name="sc" id="s-size" />
                    <label htmlFor="s-size">S</label>
                </div>

                <div className="sc-item">
                    <input type="radio" name="sc" id="m-size" />
                    <label htmlFor="m-size">M</label>
                </div>

                <div className="sc-item">
                    <input type="radio" name="sc" id="l-size" />
                    <label htmlFor="l-size">L</label>
                </div>

                <div className="sc-item">
                    <input type="radio" name="sc" id="xl-size" />
                    <label htmlFor="xl-size">XL</label>
                </div>

                <div className="sc-item">
                    <input type="radio" name="sc" id="xxl-size" />
                    <label htmlFor="xxl-size">XXL</label>
                </div>
            </div>
        </div>
    )
}