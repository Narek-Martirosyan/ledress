import './products.scss';
import { FaRegHeart, FaCheck, FaHeart } from 'react-icons/fa';
import { BsHandbag } from 'react-icons/bs';
import { FiFilter } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { PriceRange } from './PriceRange';
import { CategoriesField } from './CategoriesField';
import { ProductsColors } from './ProductsColors';
import { ProductSizes } from './ProductSizes';
import { Brands } from './Brands';
import { PageInfo } from '../../components/PageInfo';
import { useNavigate } from 'react-router-dom';
import { addCart, addFavourite, removeFavourite, getProducts } from '../../api/product_API';
import { useDispatch, useSelector } from 'react-redux';
import { changeNumberData } from '../../features/numberSlice';
import { toast } from 'react-toastify';

export const Products = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([])
    const [tags, setTags] = useState([]);
    const [brands, setBrands] = useState([]);
    const [allBrands, setAllBrands] = useState([]);
    const [maxCount, setMaxCount] = useState(12);
    const [isActive, setIsActive] = useState(true);
    const [prices, setPrices] = useState([]);
    const productId = useSelector(state => state.user.cartProductId);
    const favouriteId = useSelector(state => state.user.favouriteId);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector(state => state.user.token);

    useEffect(() => {
        getProducts().then(res => setProducts(res.data.products));
    }, []);

    useEffect(() => {
        products.forEach(product => {
            if (!tags.includes(product.productTag)) {
                tags.push(product.productTag);
                setTags([...tags]);
            }

            if (!brands.includes((product.productBrand).trim())) {
                brands.push(product.productBrand);
                setBrands([...brands]);
            }
        });

        setAllBrands(products.map(product => product.productBrand));
        setFilteredProducts(products?.slice(0, maxCount));
        setPrices(products.map(product => product.productPrice));

        // eslint-disable-next-line
    }, [products]);

    const count = allBrands.reduce((aggr, value) => {
        if (aggr[value] === undefined) {
            aggr[value] = 1;
        } else {
            aggr[value] += 1;
        }

        return aggr;
    }, {});

    useEffect(() => {
        setFilteredProducts(products?.slice(0, maxCount));
        if (products.length > 0 && maxCount >= products.length) {
            setIsActive(false);
        }

        // eslint-disable-next-line
    }, [maxCount]);

    const filterByTags = (value) => {
        setFilteredProducts(products.filter(product => product.productTag === value));
        setIsActive(false);
        window.scrollTo(0, 400);
    }

    const filterByBrands = (value) => {
        setFilteredProducts(products.filter(product => product.productBrand === value));
        setIsActive(false);
        window.scrollTo(0, 400);
    }

    const filterByPrice = (value) => {
        setFilteredProducts(products?.filter(product =>
            product.productPrice >= value[0] &&
            product.productPrice <= value[1]
        ).slice(0, maxCount));
    }

    const addCartHandler = async (e, id) => {
        e.stopPropagation();

        if (token) {
            const res = await addCart(id);
            if (res.statusText === "OK") {
                toast.success("Product has been added");
                dispatch(changeNumberData(Math.random()));
            }
        } else {
            toast.error("Please first log in");
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
            toast.error("Please first log in");
        }


    }

    return (
        <>
            <PageInfo />

            <section className="category-section spad">
                <h3 className='filter' onClick={() => window.location.href = "#filter"}>
                    <FiFilter className='icon' />
                    Filter
                </h3>
                
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 order-2 order-lg-1" id="filter">
                            <CategoriesField tags={tags} onClick={filterByTags} />
                            {isActive ? <PriceRange prices={prices} getValue={filterByPrice} /> : null}
                            <ProductsColors />
                            <ProductSizes />
                            <Brands brands={brands} count={count} onClick={filterByBrands} />
                        </div>

                        <div className="col-lg-9  order-1 order-lg-2 mb-5 mb-lg-0">
                            <div className="row">
                                {filteredProducts?.map(product => (
                                    <div className="col-lg-4 col-sm-6" key={product?._id} >
                                        <div
                                            className="product-item"
                                            onClick={() => navigate(`/products/${product._id}`)}
                                        >
                                            <div className="pi-pic">
                                                <img
                                                    src={product?.productImage[0]?.url}
                                                    alt={product?.productName}
                                                />
                                                <div className="pi-links">
                                                    <div
                                                        className="p add-card"

                                                    >
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
                                                        className="p wishlist-btn ms-1"
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
                                                <h6>${product?.productPrice}.00</h6>
                                                <p>{product?.productName}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="text-center w-100 pt-3">
                                    {isActive ?
                                        <button
                                            className="site-btn sb-line sb-dark"
                                            onClick={() => setMaxCount(maxCount + 12)}
                                        >
                                            LOAD MORE
                                        </button> :
                                        null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
