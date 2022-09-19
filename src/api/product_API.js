import axios from './index';

export const getProducts = async () => {
    return await axios.get("product");
}

export const addCart = async (id) => {
    return await axios.post("product/addCart", {
        headers: {
            authorization: localStorage.getItem("token")
        },
        cartId: id
    });
}

export const removeCart = async (id) => {
    return await axios.post("product/removeCart", {
        headers: {
            authorization: localStorage.getItem("token")
        },
        cartId: id
    });
}

export const addFavourite = async (id) => {
    return await axios.post("product/addFavorite", {
        headers: {
            authorization: localStorage.getItem("token")
        },
        favoriteId: id
    });
}

export const removeFavourite = async (id) => {
    return await axios.post("product/removeFavorite", {
        headers: {
            authorization: localStorage.getItem("token")
        },
        favoriteId: id
    });
}