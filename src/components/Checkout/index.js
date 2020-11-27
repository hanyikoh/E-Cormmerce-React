import React from 'react'
import './styles.scss'
import { selectCartItems, selectCartTotal } from './../../redux/Cart/cartSelectors'
import { useSelector, useDispatch } from 'react-redux'
import {useHistory} from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import Button from './../forms/Button'
import Item from './Item'


const mapState = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
})

const Checkout = ({ }) => {
    const history = useHistory()
    const { cartItems, total } = useSelector(mapState)
    const errMsg = " You have no item in your cart"

    return (
        <div className="checkout">
            <h1>
                Checkout
            </h1>

            <div className="cart">
                {cartItems.length > 0 ? (

                    <table border="0" cellPadding="0" cellSpacing="0">
                        <tbody>
                            <tr>
                                <table className="checkoutHeader" border="0" cellPadding="10" cellSpacing="0">
                                    <tbody>
                                        <tr>
                                            <th>
                                                Product
                    </th>
                                            <th>
                                                Description
                    </th>
                                            <th>
                                                Quantity
                    </th>
                                            <th>
                                                Price
                    </th>
                                            <th>
                                                Remove
                    </th>
                                        </tr>
                                    </tbody>
                                </table>
                            </tr>

                            <tr>
                                <table border="0" cellPadding="0" cellSpacing="0">
                                    <tbody>
                                        {cartItems.map((item, pos) => {
                                            return (
                                                <tr key={pos}>
                                                    <Item {...item} />
                                                </tr>
                                            )
                                        })}
                                        <tr>
                                            <td>

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </tr>

                            <tr>
                                <table algin="right" border="0" cellSpacing="0" cellPadding="10">
                                    <tr algin="right">
                                        <td>
                                            <h3>
                                                Total: RM {total}
                    </h3>
                                        </td>
                                    </tr>
                                    <tr>
                                        <table border="0" cellPadding="0" cellSpacing="0">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <Button onClick={()=>history.goBack}>
                                                            Continue Shopping
                                </Button>
                                                    </td>
                                                    <td>
                                                        <Button>
                                                            Checkout
                                </Button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </tr>
                                </table>
                            </tr>
                        </tbody>
                    </table>
                ) : <p>
                    You have no item in your cart
                </p>
                
            }
            </div>
        </div>
    )
}

export default Checkout