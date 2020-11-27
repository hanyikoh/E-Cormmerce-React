import { combineReducers } from 'redux';
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import cartReducer from './Cart/cartReducer';
import productsReducer from './Products/productsReducer';

import userReducer from './User/userReducer';

export const rootReducer = combineReducers({
    user: userReducer, 
    //we persist user through authentication
    productsData: productsReducer,
    //we persist products through route
    cartData: cartReducer
    //persist by redux-persist ("whitelist")
}); 

const configStorage = {
    key: 'root',
    storage,
    whitelist:['cartData']
}

export default persistReducer(configStorage, rootReducer)