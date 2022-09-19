import './productSizes.scss';

export const ProductSizes = () => {
    return (
        <div className="fw-size-choose">
            <p>Size</p>

            <div className="sc-item">
                <input type="radio" name="sc" id="xs-size" />
                <label htmlFor="xs-size">32</label>
            </div>

            <div className="sc-item">
                <input type="radio" name="sc" id="s-size" />
                <label htmlFor="s-size">34</label>
            </div>

            <div className="sc-item">
                <input type="radio" name="sc" id="m-size" />
                <label htmlFor="m-size">36</label>
            </div>

            <div className="sc-item">
                <input type="radio" name="sc" id="l-size" />
                <label htmlFor="l-size">38</label>
            </div>

            <div className="sc-item disable">
                <input type="radio" name="sc" id="xl-size" />
                <label htmlFor="xl-size">40</label>
            </div>

            <div className="sc-item">
                <input type="radio" name="sc" id="xxl-size" />
                <label htmlFor="xxl-size">42</label>
            </div>
        </div>
    )
}