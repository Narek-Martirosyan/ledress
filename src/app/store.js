import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import numberReducer from '../features/numberSlice';

export default configureStore({
    reducer: {
        user: userReducer,
        number: numberReducer
    },
  })