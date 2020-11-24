import { createSelector } from 'reselect'

const selectCartData = state => state.cartData;

const selectCartItems = createSelector(
    [selectCartData],
    cartData => cartData.cartItems
)

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems =>
        cartItems.reduce(
            (quantity, cartItems) =>
                quantity + cartItems.quantity
            , 0)
)