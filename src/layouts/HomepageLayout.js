import React from 'react'
import Footer from '../components/footer'
import Header from './../components/Header/index'


const HomepageLayout = (props) => {
    return (
        <div className="fullHeight">
            <Header/>
            {props.children}
            <Footer/>
        </div>
    )
}

export default HomepageLayout
