import './productsColors.scss';

export const ProductsColors = () => {
    return (
        <div className="filter-widget mb-0">
            <h2 className="fw-title">color by</h2>

            <div className="fw-color-choose">
                <div className="cs-item">
                    <input type="radio" name="cs" id="gray-color" />

                    <label className="cs-gray" htmlFor="gray-color">
                        <span>(3)</span>
                    </label>
                </div>

                <div className="cs-item">
                    <input type="radio" name="cs" id="orange-color" />
                    <label className="cs-orange" htmlFor="orange-color">
                        <span>(25)</span>
                    </label>
                </div>

                <div className="cs-item">
                    <input type="radio" name="cs" id="yollow-color" />
                    <label className="cs-yollow" htmlFor="yollow-color">
                        <span>(112)</span>
                    </label>
                </div>

                <div className="cs-item">
                    <input type="radio" name="cs" id="green-color" />
                    <label className="cs-green" htmlFor="green-color">
                        <span>(75)</span>
                    </label>
                </div>

                <div className="cs-item">
                    <input type="radio" name="cs" id="purple-color" />
                    <label className="cs-purple" htmlFor="purple-color">
                        <span>(9)</span>
                    </label>
                </div>

                <div className="cs-item">
                    <input type="radio" name="cs" id="blue-color" />
                    <label className="cs-blue" htmlFor="blue-color">
                        <span>(29)</span>
                    </label>
                </div>
            </div>
        </div>
    )
}