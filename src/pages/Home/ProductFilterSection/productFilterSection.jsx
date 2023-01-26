import './productFilterSection.scss';
import { BsHandbag } from 'react-icons/bs';
import { FaRegHeart, FaCheck, FaHeart } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addCart, addFavourite, removeFavourite } from '../../../api/product_API';
import { changeNumberData } from '../../../features/numberSlice';
import { toast } from "react-toastify";

export const ProductFilterSection = ({ products }) => {
    const tags = [];
    const [slicedProducts, setSlicedProducts] = useState([]);
    const [inactive, setInactive] = useState(true);
    const navigate = useNavigate();
    const productId = useSelector(state => state.user.cartProductId);
    const favouriteId = useSelector(state => state.user.favouriteId);
    const dispatch = useDispatch();
    const token = useSelector(state => state.user.token);

    products.forEach((product) => {
        if (!tags.includes(product.productTag)) {
            tags.push(product.productTag);
        }
    });

    useEffect(() => {
        setSlicedProducts(products.slice(20, 28));
    }, [products]);

    const filterByTag = (value) => {
        setSlicedProducts(products.filter((product) => product.productTag === value).slice(0, 16));
        setInactive(false);
    }

    const addCartHandler = async (e, id) => {
        e.stopPropagation();

        if (token) {
            const res = await addCart(id);
            if (res.status === 200) {
                toast.success("Product has been added");
                dispatch(changeNumberData(Math.random()));
            }
        } else {
            toast.error("Please first login");
        }
    }

    const addFavouriteHandler = async (e, id) => {
        e.stopPropagation();

        if (token) {
            if (favouriteId?.includes(id)) {

                const res = await removeFavourite(id);
                if (res.status === 200) {
                    toast.success("Product has been deleted");
                    dispatch(changeNumberData(Math.random()));
                }
            } else {
                const res = await addFavourite(id);
                if (res.status === 200) {
                    toast.success("Product has been added");
                    dispatch(changeNumberData(Math.random()));
                }
            }
        } else {
            toast.error("Please first login");
        }
    }

    return (
        <section className="product-filter-section">
            <div className="container">
                <div className="section-title">
                    <h2>BROWSE TOP SELLING PRODUCTS</h2>
                </div>

                <ul className="product-filter-menu">
                    {tags.slice(0, 8).map((tag, index) => (
                        <li key={tag + "-" + index}>
                            <span onClick={(e) => filterByTag(e.target.innerHTML)}>{tag}</span>
                        </li>
                    ))}
                </ul>

                <div className="row">
                    {slicedProducts.map(product => (
                        <div className="col-lg-3 col-sm-6" key={product._id}>
                            <div className="product-item" onClick={() => navigate(`/products/${product._id}`)}>
                                <div className="pi-pic">
                                    <img src={product.productImage[0].url} alt="img5" />
                                    <div className="pi-links">
                                        <div className="a add-card">
                                            {productId.includes(product._id) ?
                                                <>
                                                    <FaCheck style={{ color: "green" }} />
                                                    <span style={{ color: "green" }}>Added</span>
                                                </> :
                                                <div onClick={(e) => addCartHandler(e, product._id)}>
                                                    <BsHandbag />
                                                    <span>ADD TO CART</span>
                                                </div>
                                            }
                                        </div>

                                        <div
                                            className="a wishlist-btn ms-1"
                                            onClick={(e) => addFavouriteHandler(e, product._id)}
                                        >
                                            {favouriteId?.includes(product._id) ?
                                                <FaHeart style={{ color: "red" }} /> :
                                                <FaRegHeart />
                                            }

                                        </div>
                                    </div>
                                </div>
                                <div className="pi-text">
                                    <h6>${product.productPrice}.00</h6>
                                    <p>{product.productName}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center pt-5">
                    <button className={inactive ? "site-btn sb-line sb-dark" : "site-btn sb-line sb-dark inactive"}
                        onClick={() => {
                            setSlicedProducts(products.slice(20, 36));
                            setInactive(false);
                        }}
                    >LOAD MORE</button>
                </div>
            </div>
        </section>
    )
}
