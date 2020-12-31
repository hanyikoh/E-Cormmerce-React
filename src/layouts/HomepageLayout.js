import React from 'react'
import FloatingButton from '../components/FloatingButton'
import Footer from '../components/footer'
import Header from './../components/Header/index'


const HomepageLayout = (props) => {
    return (
        <div className="fullHeight">
            <Header {...props}/>
            {props.children}
            <FloatingButton/>
            <Footer/>
        </div>
    )
}

export default HomepageLayout
