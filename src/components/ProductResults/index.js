import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsStart } from '../../redux/Products/productsActions'
import Product from './Product'
import './styles.scss'

const mapState = ({ productsData }) => ({
    products: productsData.products
})

const ProductResults = ({ }) => {
    const dispatch = useDispatch();
    const { products } = useSelector(mapState)

    useEffect(() => {
        dispatch(
            fetchProductsStart()
        )
    }, []);

    if (!Array.isArray(products)) {
        console.log(products, "EE")
        return null;
    }
    console.log(products)

    if (products.length < 1) {
        return (

            <div className="products">
                <h1>
                    Browse Products
                </h1>
                <p>
                    No Search Results.
                </p>
            </div>
        )
    }

    return (
        <div className="products">
            <h1>
                Browse Products
            </h1>

            <div className="productResults">
                {products.map((product, pos) => {
                    const { productThumbnail, productName, productPrice } = product
                    if (!productThumbnail || !productName ||
                        typeof productPrice === "undefined") return null;

                    const configProduct = {
                        productThumbnail,
                        productName,
                        productPrice
                    }

                    return (
                        <Product {...configProduct} />
                    )
                })}
            </div>
        </div>
    )
}

export default ProductResults