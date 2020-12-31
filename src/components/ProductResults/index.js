import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsStart } from '../../redux/Products/productsActions'
import FormSelect from '../forms/FormSelect'
import FormInput from '../forms/FormInput'

import { useHistory, useParams, Link } from 'react-router-dom'
import Product from './Product'
import './styles.scss'
import LoadMore from '../LoadMore'

const mapState = ({ productsData }) => ({
    products: productsData.products
})

const ProductResults = ({ }) => {
    const [price, setPrice] = useState(0)
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(100000)
    const [filterData, setFilterData] = useState([])
    const history = useHistory()
    const dispatch = useDispatch();
    const { filterType } = useParams();
    const { products } = useSelector(mapState)

    const { data, queryDoc, isLastPage } = products

    useEffect(() => {
            dispatch(
                fetchProductsStart({ filterType, price })
            )
        // console.log((...data.map(dat => Math.ceil(parseFloat(dat.productPrice, 10)))))

    }, [filterType]);

    useEffect(() => {
        if(data){
            setMaxPrice(Math.max(...data.map(dat => Math.ceil(parseFloat(dat.productPrice, 10)))) + 1)
            setMinPrice(Math.min(...data.map(dat => Math.ceil(parseFloat(dat.productPrice, 10)))))
            console.log("HI THIS IS MAX", maxPrice)
            console.log("HI THIS IS MIN", minPrice)
            console.log("The price now is ", price)
            setFilterData( [...data].filter(dat => parseInt(dat.productPrice) <= price))
            console.log(filterData)
            // console.log(filterData)
        }
    }, [price])

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
                name: 'Mens Clothing',
                value: 'mens'
            }, {
                name: 'Womens Clothing',
                value: 'womens'
            }, {
                name: 'Appliance',
                value: 'appliances'
            }
        ],
        handleChange: handleFilter
    }


    const configPrice = {
        htmlFor: "price",
        label: `PRICE Now at RM ${price}`,
        type: "range",
        name: "price",
        min: minPrice ,
        max:  maxPrice ,
        id: "price",
        value: price
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
        onLoadMoreEvt: handleLoadMore,
    }

    return (
        <div className="products">
            <h1>
                Browse Products
            </h1>

            <FormSelect {...configFilters} />


            <FormInput  {...configPrice}
                handleChange={e => setPrice(e.target.value)}
                className="form-control" 
                style={{width: "50%"}}/>


            <div className="productResults">
                {filterData.map((product, pos) => {
                    const { productThumbnail, productName, productPrice } = product
                    if (!productThumbnail || !productName ||
                        typeof productPrice === "undefined") return null;

                    const configProduct = {
                        ...product
                    }

                    return (
                        <Product key={pos} {...configProduct} />
                    )
                })}
            </div>

            {!isLastPage && <LoadMore {...conFigLoadMore} />}

        </div>
    )
}

export default ProductResults