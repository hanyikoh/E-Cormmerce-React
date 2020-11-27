import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import Button from './../../forms/Button'
import {useDispatch} from 'react-redux'
import { addProduct } from '../../../redux/Cart/cartActions'

const Product = (product) => {
    const dispatch = useDispatch();
    const history = useHistory()
    const {
        documentID,
        productThumbnail,
        productName,
        productPrize
    } = product

    const handleAddToCart = product => {
        if(!product) return;
        dispatch(
            addProduct(product)
        )
        history.push('/cart')
    }

    if (!documentID || !productThumbnail || !productName ||
        typeof productPrize === 'undefiend') return null

    const configAddToCardBtn = {
        type: "button"
    }

    return (
        <div className="product">
            <div className="thumb">
                <Link to={`/product/${documentID}`}>
                    <img src={productThumbnail} alt={productName} />

                </Link>
            </div>

            <div className="details">
                <ul>
                    <li>
                        <span className="name">
                            <Link to={`/product/${documentID}`}>
                                {productName}
                            </Link>
                        </span>
                    </li>
                    <li>
                        <span className="price">
                            {productPrize}
                        </span>
                    </li>
                    <li>
                        <div className="addToCart">
                            <Button {...configAddToCardBtn} onClick = {() => handleAddToCart(product)}>
                                Add to Card
                            </Button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Product