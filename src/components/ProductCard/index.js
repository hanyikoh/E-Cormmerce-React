import React, { useEffect } from 'react'
import './styles.scss'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductStart, setProduct } from './../../redux/Products/productsActions'
import Button from '../forms/Button'
import { addProduct } from '../../redux/Cart/cartActions'
import Carousel from 'react-bootstrap/Carousel'
import user from '../../assets/user.png'
import FormImput from '../forms/FormInput'
const mapState = state => ({
    product: state.productsData.product
})

const ProductCard = ({ }) => {
    const { product } = useSelector(mapState)
    const history = useHistory()
    const dispatch = useDispatch()
    const { productID } = useParams();


    const {
        productThumbnail,
        productName,
        productPrice,
        productDesc
    } = product

    const handleAddToCart = (product) => {
        if (!product) return;
        dispatch(
            addProduct(product)
        )
        history.push('/cart')
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
        <div className="productContainer">
            <div className="productCardContainer">
                <div className="productCard">
                    <Carousel className="productCarousel" style={{ width: "359px" }}>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={productThumbnail}
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={productThumbnail}
                                alt="Third slide"
                            />

                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                    {/* <div className="hero">
                <img src={productThumbnail} />
            </div> */}
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
                            {/* <li>
                            <span
                                className="desc"
                                dangerouslySetInnerHTML={{ __html: productDesc }} />
                        </li> */}
                        </ul>
                    </div>
                </div>
                <div className="productMainContent">
                    <iframe width="880" height="305"
                        src="https://www.youtube.com/embed/plDLmC7dLDY?autoplay=1&mute=1"
                        className="promoVideo">
                    </iframe>
                    <div className="productDesc">
                        <h2><b>Product Description</b></h2>
                        <span
                            className="desc"
                            dangerouslySetInnerHTML={{ __html: productDesc }} />
                    </div>
                </div>
            </div >
            <div className="reviewContainer">
                <h2><b>People's Comments</b></h2>
                <ul>
                    <li>
                        <img src={user}></img>
                        <span className="comment">HELO</span>
                    </li>
                    <li>
                        <img src={user}></img>
                        HELO This movie is nice
                    </li>
                    <li>
                        <img src={user}></img>
                        HELO
                    </li>
                </ul>
                
                <div className="inputComment">
                    <FormImput type="text" placeholder="type your comment here" />
                </div>
            </div>
        </div>
    )
}

export default ProductCard