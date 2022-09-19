import './cartPage.scss';
import { getUser } from '../../api/user_API';
import { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { BsHandbag } from 'react-icons/bs';
import { FaRegHeart, FaHeart, FaCheck, FaMoneyBillAlt } from 'react-icons/fa';
import { removeCart, removeFavourite, addCart, addFavourite, getProducts } from '../../api/product_API';
import { useDispatch, useSelector } from 'react-redux';
import { changeNumberData } from '../../features/numberSlice';
import Swal from 'sweetalert2';
import { LatestProducts } from '../Home/LatestProducts/latestProducts';
import { useNavigate, Link } from 'react-router-dom';
import { ProductImages } from '../SingleProduct/ProductImages';
import { Checkout } from '../Checkout';
import { toast } from "react-toastify";

export const CartPage = () => {
    const [currentUser, setCurrentUser] = useState([]);
    const [favouriteProducts, setFavouriteProducts] = useState([]);
    const dispatch = useDispatch();
    const number = useSelector(state => state.number.data);
    const productId = useSelector(state => state.user.cartProductId);
    const favouriteId = useSelector(state => state.user.favouriteId);
    const navigate = useNavigate();
    const [singleProduct, setSingleProduct] = useState({});
    const [screenSize, setScreenSize] = useState(window.innerWidth);
    const [spwidth1, setSpwidth1] = useState(435);
    const [spwidth2, setSpwidth2] = useState(425);
    const [showCheckout, setShowCheckout] = useState(false);
    const token = useSelector(state => state.user.token);

    useEffect(() => {
        getUser().then(res => setCurrentUser(res.data.user));
    }, [number]);

    useEffect(() => {
        const products = currentUser?.favorites?.filter(product => product !== null)

        setFavouriteProducts(products);
    }, [currentUser]);

    const totalPrice = () => {
        const prices = []
        currentUser?.userCart?.forEach(product => {
            if (product !== null) {
                prices.push(product?.productPrice)
            }
        });

        return prices.reduce((one, two) => {
            return +one + +two
        }, 0)
    }

    const removeCartHandler = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                removeCart(id).then(res => {
                    if (res.statusText === "OK") {
                        dispatch(changeNumberData(Math.random()));
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Product has been deleted',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                });
            }
        });
    }

    const addCartHandler = async (e, id) => {
        e.stopPropagation();

        const res = await addCart(id);
        if (res.statusText === "OK") {
            toast.success("Product has been added");
            dispatch(changeNumberData(Math.random()));
        }
    }

    const addFavouriteHandler = async (e, id) => {
        e.stopPropagation();

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
    }

    const singleProductHandler = async (id) => {
        const res = await getProducts();
        setSingleProduct(res.data.products.filter(product => product._id === id)[0]);
    }

    // window sizes
    window.addEventListener("resize", function (e) {
        setScreenSize(this.window.innerWidth);
    });

    useEffect(() => {
        if (window.innerWidth <= 480) {
            setSpwidth1(250);
            setSpwidth2(270);
        } else {
            setSpwidth1(435);
            setSpwidth2(425);
        }
    }, [screenSize]);

    return (
        <section className="cart-section spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="cart-table">
                            <h3>Your Cart</h3>
                            <div className="cart-table-warp">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="product-th">Product</th>
                                            <th className="total-th">Price</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {/* eslint-disable-next-line */}
                                        {currentUser?.userCart?.map((product, index) => {
                                            if (product !== null) {
                                                return (
                                                    <tr key={product._id + index}>
                                                        <td
                                                            className="product-col"
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => singleProductHandler(product._id)}
                                                        >
                                                            <img
                                                                src={product?.productImage[0]?.url}
                                                                alt={product?.productTitle}
                                                            />

                                                            <div className="pc-title">
                                                                <h4>{product?.productName}</h4>
                                                                <p>${product?.productPrice}.00</p>
                                                            </div>
                                                        </td>

                                                        <td className="total-col">
                                                            <h4>${product?.productPrice}.00</h4>
                                                        </td>

                                                        <td
                                                            className='removeProduct'
                                                            onClick={() => removeCartHandler(product._id)}
                                                        >
                                                            <IoMdClose />
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        })}

                                    </tbody>
                                </table>
                            </div>

                            <div className="total-cost">
                                <span onClick={() => setShowCheckout(true)}><FaMoneyBillAlt /> Buy</span>
                                <h6>Total <span>${totalPrice()}.00</span></h6>
                            </div>

                            {showCheckout ? <Checkout
                                setShowCheckout={setShowCheckout}
                                total={totalPrice()}
                                userCart={currentUser?.userCart}
                            /> : null}
                        </div>
                    </div>

                    <div className='col-lg-4 single-product-block'>
                        {singleProduct._id ?
                            <ProductImages
                                singleProduct={singleProduct}
                                width_1={spwidth1}
                                width_2={spwidth2}
                            /> :
                            currentUser?.favorites?.length > 0 && <ProductImages
                                singleProduct={currentUser?.userCart[0]}
                                width_1={spwidth1}
                                width_2={spwidth2}
                            />
                        }
                    </div>
                </div>

                {favouriteProducts?.length >= 4 ?
                    <LatestProducts
                        products={favouriteProducts}
                        title={"Favourite Products"}
                    /> :
                    <div className="row text-center mt-5">
                        {favouriteProducts?.length > 0 &&
                            <h2 className='text-center'
                                id='favourite'>
                                Favourite Products
                            </h2>
                        }

                        {favouriteProducts?.map(product => (
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
                }
            </div>
        </section>
    )
}
