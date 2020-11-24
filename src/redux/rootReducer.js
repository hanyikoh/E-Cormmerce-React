import { combineReducers } from 'redux';
import cartReducer from './Cart/cartReducer';
import productsReducer from './Products/productsReducer';

import userReducer from './User/userReducer';

export default combineReducers({
    user: userReducer,
    productsData: productsReducer,
    cartData: cartReducer
}); 