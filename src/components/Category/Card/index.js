import React from 'react'
import './styles.scss'

const CategoryCard = (props) => {

    const {name, img:categoryImg} = props.children;

    return (
        <div className="card-border">
            <div className="card-image">
                <img src={categoryImg} alt=""/>
            </div>
            <div className="card-name">
                {name}
            </div>
        </div>  
    )
}

export default CategoryCard