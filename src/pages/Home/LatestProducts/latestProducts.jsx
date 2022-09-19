import './latestProducts.scss';
import Carousel from 'nuka-carousel';
import { FaRegHeart, FaCheck, FaHeart } from 'react-icons/fa';
import { BsHandbag } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addCart, addFavourite, removeFavourite } from '../../../api/product_API';
import { changeNumberData } from '../../../features/numberSlice';
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";

export const LatestProducts = ({ products, title }) => {
    const [screenWidth, setScreenWidth] = useState("");
    const [screenSize, setScreenSize] = useState(window.innerWidth);
    const navigate = useNavigate();
    const productId = useSelector(state => state.user.cartProductId);
    const favouriteId = useSelector(state => state.user.favouriteId);
    const dispatch = useDispatch();
    const token = useSelector(state => state.user.token);

    const addCartHandler = async (e, id) => {
        e.stopPropagation();

        if (token) {
            const res = await addCart(id);
            if (res.statusText === "OK") {
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
                if (res.statusText === "OK") {
                    toast.success("Product has been deleted");
                    dispatch(changeNumberData(Math.random()));
                }
            } else {
                const res = await addFavourite(id);
                if (res.statusText === "OK") {
                    toast.success("Product has been added");
                    dispatch(changeNumberData(Math.random()));
                }
            }
        } else {
            toast.error("Please first login");
        }
    }

    window.addEventListener("resize", function (e) {
        setScreenSize(this.window.innerWidth);

    });

    useEffect(() => {
        if (window.innerWidth <= 991 && window.innerWidth > 767) {
            setScreenWidth(991);
        } else if (window.innerWidth <= 767 && window.innerWidth > 450) {
            setScreenWidth(767);
        } else if (window.innerWidth <= 450) {
            setScreenWidth(450);
        } else {
            setScreenWidth(1000);
        }
    }, [screenSize]);

    return (
        <section className="top-letest-product-section" id='favourite'>
            <div className="container">
                <div className="section-title">
                    <h2>{title}</h2>
                </div>
                <Carousel
                    slidesToShow={screenWidth === 991 ? 3 : screenWidth === 767 ? 2 : screenWidth === 450 ? 1 : 4}
                    wrapAround={true}
                    autoplay={true}
                    dragThreshold={.2}
                    speed={2000}
                    pauseOnHover={true}
                    zoomScale={0.7}
                    className={"product-slidera"}
                >
                    {products?.map((product) => (
                        <div
                            className="product-item"
                            key={product._id}
                            onClick={() => navigate(`/products/${product._id}`)}
                        >
                            <div className="pi-pic">
                                <img src={product?.productImage[0].url} alt={product.productBrand} />
                                <div className="pi-links">
                                    <div className="a add-card">
                                        {productId?.includes(product._id) ?
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
                                <p>{product.productName} </p>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </section>
    )
}