import { takeLatest, put, all, call } from 'redux-saga/effects'
import productTypes from './productsTypes'
import { handleAddProduct, handleDeleteProduct, handleFetchProducts } from './productsHelpers'
import { auth } from './../../firebase/utils'
import {setProducts, fetchProductsStart} from './productsActions'
import productsTypes from './productsTypes'

export function* addProduct({ payload }) {
    try {
        const timestamp = new Date()
        yield handleAddProduct({
            ...payload,
            productAdminUserUID: auth.currentUser.uid,
            createdDate: timestamp
        })
        yield put(
            fetchProductsStart()
        )
    } catch (err) {

    }
}

export function* onAddProductStart() {
    yield takeLatest(productTypes.ADD_NEW_PRODUCT_START, addProduct)
}

export function* fetchProducts() {
    try {
        const products = yield handleFetchProducts()
        yield put(
            setProducts(products)
        )
    } catch (err) {

    }
}

export function* onFetchProductsStart() {
    yield takeLatest(productTypes.FETCH_PRODUCTS_START, fetchProducts)
}

export function* deleteProduct({payload}){
    try{
        yield handleDeleteProduct(payload)
        yield put(
            fetchProductsStart()
        )
    }catch(err){
        console.log(err)
    }
}

export function* onDeleteProductStart(){
    yield takeLatest(productsTypes.DELETE_PRODUCT_START, deleteProduct)
}

export default function* productSagas() {
    yield all([
        call(onAddProductStart),
        call(onFetchProductsStart),
        call(onDeleteProductStart)
    ])
}