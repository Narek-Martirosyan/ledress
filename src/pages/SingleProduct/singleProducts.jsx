import './singleProduct.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { getProducts } from '../../api/product_API';
import { useEffect, useState } from 'react';
import { TbArrowBackUp } from 'react-icons/tb';
import { ProductImages } from './ProductImages';
import { ProductDetails } from './ProductDetails';
import { LatestProducts } from '../Home/LatestProducts';

export const SingleProducts = () => {
    const { id } = useParams();
    const [singleProduct, setSingleProduct] = useState();
    const [products, setProducts] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getProducts().then(res => {
            setProducts(res.data.products);
            setSingleProduct(res.data.products.filter((product) => product._id === id)[0]);
        });
        // eslint-disable-next-line
    }, [id]);

    useEffect(() => {
        setRelatedProducts(products.filter(product => product.productTag === singleProduct.productTag
            && product._id !== singleProduct._id
        ));
        // eslint-disable-next-line
    }, [products]);

    return (
        <section className="product-section">
            <div className="container">
                <div className="back-link">
                    <span href="./category.html" onClick={() => navigate(-1)}>
                        <TbArrowBackUp /> Back to previous page
                    </span>
                </div>

                <div className="row">
                    <ProductImages singleProduct={singleProduct} />
                    <ProductDetails singleProduct={singleProduct} />
                </div>

                <LatestProducts products={relatedProducts} text={"RELATED PRODUCTS"} />
            </div>
        </section>
    )
}