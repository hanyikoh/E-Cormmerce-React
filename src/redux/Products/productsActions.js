import productsTypes from './productsTypes'

export const addProductStart = productData => ({
    type: productsTypes.ADD_NEW_PRODUCT_START,
    payload: productData
})

export const fetchProductsStart = (filters = {}) => ({
    type: productsTypes.FETCH_PRODUCTS_START,
    payload: filters
    //if user not selecting any filter/category then it will be giving a empty object
})

export const setProducts = products => ({
    type: productsTypes.SET_PRODUCTS,
    payload: products
})

export const deleteProductStart = productID => ({
    type: productsTypes.DELETE_PRODUCT_START,
    payload: productID
})