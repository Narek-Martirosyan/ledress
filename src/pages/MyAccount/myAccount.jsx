import "./myAccount.scss";
import { getUser } from "../../api/user_API";
import { useEffect } from "react";
import { useState } from "react";
import { LatestProducts } from "../Home/LatestProducts/latestProducts";
import { FaHandHoldingHeart } from 'react-icons/fa';
import { BsHandbag } from 'react-icons/bs';

export const MyAccount = () => {
    const [user, setUser] = useState({});
    const [userCart, setUserCart] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        getUser().then(res => setUser(res.data.user));
    }, []);

    useEffect(() => {
        setUserCart(user.userCart);
        setFavorites(user.favorites);
    }, [user]);

    return (
        <div className="account-page">
            <div className="user-top-section">
                <div><BsHandbag fontSize={200} color={"#F51167"} style={{ opacity: ".5" }} /></div>
                <div className="user-details">
                    <img src={user?.avatar?.[0]?.url} alt={`${user?.userName} ${user?.lastName}`} />
                    <h1>{`${user?.userName} ${user?.lastName}`}</h1>
                </div>
                <div><FaHandHoldingHeart fontSize={200} color={"#F51167"} style={{ opacity: ".5" }} /></div>
            </div>



            <LatestProducts products={userCart} title="Your Bag / Shopping Cart" />
            <div className="line"></div>
            <LatestProducts products={favorites} title="Your Favorites" />
        </div>
    )
}