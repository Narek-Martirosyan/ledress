import { createSlice } from '@reduxjs/toolkit';

export const numberSlice = createSlice({
    name: "number",
    initialState: {
        data: 0
    },
    reducers: {
        changeNumberData: (state, action) => {
            state.data = action.payload;
        }
    }
})


export const { changeNumberData } = numberSlice.actions;

export default numberSlice.reducer;