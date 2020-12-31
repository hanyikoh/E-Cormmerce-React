import React from 'react'
import shoppingbg from './../../assets/shoppingbg.jpg'
import ShopWomen from './../../assets/shopWomen.jpg'
import './styles.scss'
const Directory = props => {
    return (
        <div className="directory">
            <div className="wrap">
                <div
                    className="item"
                    style={{
                        backgroundImage: `url(${shoppingbg})`
                    }}
                >
                    <a href="">
                        SHOPPING NOW
                </a>
                </div>

                {/* <div
                    className="item"
                    style={{
                        backgroundImage: `url(${ShopMen})`
                    }}
                >
                    <a href="">
                        Shop Men
                </a>
                </div> */}
            </div>
        </div>
    )
}

export default Directory;