import React from 'react'
import Button from './../../forms/Button'

const Product = ({
    productThumbnail,
    productName,
    productPrize
}) => {
    if (!productThumbnail || !productName ||
        typeof productPrize === 'undefiend') return null

    const configAddToCardBtn = {
        type: "button"
    }

    return (
        <div className="product">
            <div className="thumb">
                <img src={productThumbnail} alt={productName} />
            </div>

            <div className="details">
                <ul>
                    <li>
                        <span className="name">
                            {productName}
                        </span>
                    </li>
                    <li>
                        <span className="price">
                            {productPrize}
                        </span>
                    </li>
                    <li>
                        <div className="addToCart">
                            <Button {...configAddToCardBtn}>
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