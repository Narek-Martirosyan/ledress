import './productDetails.scss';
import { ProductSizes } from '../ProductSizes';
import { useNavigate } from 'react-router-dom';
import { Quantity } from './Quantity';
import { ProductAccordion } from './ProductAccordion';
import { SocialSharing } from './SocialSharing';
import { useParams } from 'react-router-dom';
import { addCart } from '../../../api/product_API';
import { useDispatch, useSelector } from 'react-redux';
import { changeNumberData } from '../../../features/numberSlice';
import { toast } from "react-toastify";

export const ProductDetails = ({ singleProduct }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const productId = useSelector(state => state.user.cartProductId);
    const token = useSelector(state => state.user.token);
    const navigate = useNavigate();

    const addCartHandler = async () => {
        if (token) {
            if (!productId.includes(id)) {
                const res = await addCart(id);
                if (res.statusText === "OK") {
                    navigate("/cart");
                    dispatch(changeNumberData(Math.random()));
                }
            } else {
                navigate("/cart");
            }
        } else {
            toast.error("Please first login");
        }

    }

    return (
        <div className="col-lg-6 product-details">
            <h2 className="p-title">{singleProduct?.productTitle}</h2>
            <h3 className="p-price">${singleProduct?.productPrice}.00</h3>
            <h4 className="p-stock">Available: <span>In Stock</span></h4>

            <div className="p-review">
                <span>3 reviews</span>|<span>Add your review</span>
            </div>

            <ProductSizes />
            <Quantity />

            <span className="site-btn" onClick={() => addCartHandler()} >SHOP NOW</span>

            <ProductAccordion singleProduct={singleProduct} />
            <SocialSharing />

        </div>
    )
}