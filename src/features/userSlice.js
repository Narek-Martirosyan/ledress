import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: "user",
    initialState: {
        data: {},
        token: "",
        cartProductId: [],
        favouriteId: [],
    },
    reducers: {
        changeUserData: (state, action) => {
            state.data = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem("token", "Bearer " + action?.payload?.token);
        },
        changeCartProductId: (state, action) => {
            state.cartProductId.splice(0, state.cartProductId.length);
            action.payload?.forEach(product => {
                if (product !== null) {
                    state.cartProductId.push(product._id);
                }
            });
        },
        changeFavouriteId: (state, action) => {
            state.favouriteId.splice(0, state.favouriteId.length);
            action.payload?.forEach(product => {
                if (product !== null) {
                    state.favouriteId.push(product._id);
                }
            });
        }
    }
})


export const { changeUserData, changeCartProductId, changeFavouriteId } = userSlice.actions;

export default userSlice.reducer;