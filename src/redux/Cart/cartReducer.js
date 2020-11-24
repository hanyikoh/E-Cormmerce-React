import cartTypes from './cartTypes';
import {handleAddToCart} from './cartUtils'

const INITIAL_STATE = {
    cartItems: []
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case cartTypes.ADD_TO_CART:
            return {
                ...state,
                cartItems: handleAddToCart({
                    prevCartItems: state.cartItems,
                    nextCartItem: action.payload
                })
            }
        default:
            return state
    }
}
export default cartReducer;