import React, { useEffect } from 'react'
import './styles.scss'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductStart, setProduct } from './../../redux/Products/productsActions'
import Button from '../forms/Button'
import { addProduct } from '../../redux/Cart/cartActions'

const mapState = state => ({
    product: state.productsData.product
})

const ProductCard = ({ }) => {
    const { product } = useSelector(mapState)
    const dispatch = useDispatch()
    const { productID } = useParams();


    const {
        productThumbnail,
        productName,
        productPrice,
        productDesc
    } = product

    const handleAddToCart = (product) => {
        if(!product) return;
        dispatch(
            addProduct(product)
        )
    }

    useEffect(() => {
        dispatch(
            fetchProductStart(productID)
        )


        return () => {
            dispatch(setProduct({}))
            //the product stored in state will be cleared
            /*so that when we back to product page the previous 
            product info that's being display here will be gone*/
        }
    }, [])

    const configAddToCartBtn = {
        type: 'button'
    }

    return (
        <div className="productCard">
            <div className="hero">
                <img src={productThumbnail} />
            </div>
            <div className="productDetails">
                <ul>
                    <li>
                        <h1>
                            {productName}
                        </h1>
                    </li>
                    <li>
                        <span>
                            RM {productPrice}
                        </span>
                    </li>
                    <li>
                        <div className="addToCart">
                            <Button {...configAddToCartBtn} onClick={() => handleAddToCart(product)}>
                                Add To Cart
                            </Button>
                        </div>
                    </li>
                    <li>
                        <span
                            className="desc"
                            dangerouslySetInnerHTML={{ __html: productDesc }} />
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ProductCard