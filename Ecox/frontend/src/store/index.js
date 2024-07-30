import dataReducer from './data-slice';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';

const store = configureStore({
    reducer: {
        data: dataReducer,
        auth: authReducer,
    }, 
});
  
export default store;