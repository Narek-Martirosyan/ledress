import { useState } from 'react';
import './productImages.scss';
import ReactImageZoom from 'react-image-zoom';

export const ProductImages = ({ singleProduct, width_1, width_2 }) => {
    const [imageNumber, setImageNumber] = useState(0);
    const [zoom, setZoom] = useState(false);

    return (
        <div className="col-lg-6">
            <div className="product-pic-zoom" style={{width: `${width_1}px`}}>
                {zoom && singleProduct ?
                    <div
                        onClick={() => setZoom(!zoom)}
                        title={"Click to minimize image"}
                        style={{ cursor: "zoom-out", userSelect: "none" }}
                    >
                        <ReactImageZoom
                            img={singleProduct?.productImage[imageNumber]?.url}
                            zoomPosition={"original"}
                        />
                    </div> :
                    <img
                        src={singleProduct?.productImage[imageNumber]?.url}
                        alt={singleProduct?.productName}
                        title="Click to zoom image"
                        onClick={() => setZoom(!zoom)}
                        style={{ cursor: "zoom-in", userSelect: "none" }}
                    />}
            </div>

            <div className="product-thumbs" tabIndex="1" style={{width: `${width_2}px`}}>
                <div className="product-thumbs-track">
                    {singleProduct?.productImage?.map((image, index) => (
                        <div
                            className="pt"
                            data-imgbigurl="img/single-product/1.jpg"
                            key={image.public_id}
                            onClick={(e) => setImageNumber(index)}
                        >
                            <img src={image?.url} alt={image.public_id} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}