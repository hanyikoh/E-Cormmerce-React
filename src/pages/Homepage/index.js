import React from 'react'
import Carousel_Slide from '../../components/Carousel'
import Category_List from '../../components/Category'
import Directory from "./../../components/Directory"
import './styles.scss'
const Homepage = () => {
    return (
        <section className="homepage">
            <Directory />
            <div className="promotionSection">
                <Carousel_Slide />
            </div>
            <div>
                <h1 className="title">Category</h1>
                <Category_List />
            </div>
        </section>
    )
}

export default Homepage
