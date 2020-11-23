import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsStart } from '../../redux/Products/productsActions'
import FormSelect from '../forms/FormSelect'
import {useHistory, useParams} from 'react-router-dom'
import Product from './Product'
import './styles.scss'
import LoadMore from '../LoadMore'

const mapState = ({ productsData }) => ({
    products: productsData.products
})

const ProductResults = ({ }) => {
    const history = useHistory()
    const dispatch = useDispatch();
    const {filterType} = useParams();
    const { products } = useSelector(mapState)

    const {data, queryDoc, isLastPage} = products

    useEffect(() => {
        dispatch(
            fetchProductsStart({filterType})
        )
    }, [filterType]);

    if (!Array.isArray(data)) {
        return null;
    }

    if (data.length < 1) {
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

    const handleFilter = (e) => {
        const nextFilter = e.target.value;
        history.push(`/search/${nextFilter}`)
    }

    const configFilters = {
        defaultValue: filterType,
        options: [
            {
                name: 'Show All',
                value: ''
            }, {
                name: 'Mens',
                value: 'mens'
            }, {
                name: 'Womens',
                value: 'womens'
            }
        ],
        handleChange: handleFilter
    }

    const handleLoadMore = () => {
        dispatch(
            fetchProductsStart({
                filterType, 
                startAfterDoc: queryDoc,
                persistProducts: data
            })
        )
    }

    const conFigLoadMore = {
        onLoadMoreEvt: handleLoadMore(),
    }

    return (
        <div className="products">
            <h1>
                Browse Products
            </h1>

            <FormSelect {...configFilters}/>

            <div className="productResults">
                {data.map((product, pos) => {
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
            
            {!isLastPage && <LoadMore {...conFigLoadMore}/>}

        </div>
    )
}

export default ProductResults