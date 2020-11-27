import React from 'react'
import { useDispatch } from 'react-redux'
import { removeCartItem, addProduct, reduceCartItem } from './../../../redux/Cart/cartActions'

const Item = (product) => {
    const dispatch = useDispatch()
    const {
        productName,
        productThumbnail,
        productPrice,
        quantity,
        documentID
    } = product

    const handleAddProduct = product => {
        dispatch(
            addProduct(product)
        )
    }

    const handleRemoveCartItem = documentID => {
        dispatch(
            removeCartItem({
                documentID
            })
        )
    }

    const handleReduceItem = product => {
        dispatch(
            reduceCartItem(product)
        )
    }

    return (
        <table className="cartItem" border="0" cellSpacing="0" cellPadding="0">
            <tbody>
                <tr>
                    <td>
                        <img src={productThumbnail} alt={productName} />
                    </td>
                    <td>
                        {productName}
                    </td>
                    <td>
                        <span className="cartBtn"
                            onClick={() => handleReduceItem(product)}>
                            {`< `}
                        </span>
                        <span>
                            {quantity}
                        </span>
                        <span className="cartBtn"
                            onClick={() => handleAddProduct(product)}>
                            {` >`}
                        </span>
                    </td>
                    <td>
                        RM {productPrice}
                    </td>
                    <td align="center">
                        <span className="cartBtn" onClick={() => handleRemoveCartItem(documentID)}>
                            X
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default Item;