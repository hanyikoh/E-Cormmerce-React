import { createSelector } from 'reselect'

const selectCartData = state => state.cartData;

export const selectCartItems = createSelector(
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

//This will calculate how much we need to pay for the things in cart
export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems =>
        cartItems.reduce(
            (quantity, cartItem) =>
                quantity + cartItem.quantity * cartItem.productPrice, 0
        )
)