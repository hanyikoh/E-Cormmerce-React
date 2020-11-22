import { combineReducers } from 'redux';
import productsReducer from './Products/productsReducer';

import userReducer from './User/userReducer';

export default combineReducers({
    user: userReducer,
    productsData: productsReducer
}); 