import React from 'react'
import CategoryCard from './Card'
import './styles.scss'

const Category_List = () => {
    const categories = [
        {
            name: 'Women\'s Clothing',
            img: 'https://mms-images.out.customink.com/mms/images/catalog/categories/148_large.jpg'
        },
        {
            name: 'Appliance',
            img: 'https://ak1.ostkcdn.com/wp-content/uploads/2019/03/32019-Top-10-Small-Appliances-Mixer.jpg'
        },
        {
            name: 'Stationary',
            img: 'https://previews.123rf.com/images/len44ik/len44ik1302/len44ik130200251/17981189-school-and-office-stationary-isolated-on-white-back-to-school-concept.jpg'
        },
        {
            name: 'Women\'s Clothing',
            img: 'https://mms-images.out.customink.com/mms/images/catalog/categories/148_large.jpg'
        },
        {
            name: 'Appliance',
            img: 'https://ak1.ostkcdn.com/wp-content/uploads/2019/03/32019-Top-10-Small-Appliances-Mixer.jpg'
        },
        {
            name: 'Stationary',
            img: 'https://previews.123rf.com/images/len44ik/len44ik1302/len44ik130200251/17981189-school-and-office-stationary-isolated-on-white-back-to-school-concept.jpg'
        },
        {
            name: 'Women\'s Clothing',
            img: 'https://mms-images.out.customink.com/mms/images/catalog/categories/148_large.jpg'
        },
        {
            name: 'Appliance',
            img: 'https://ak1.ostkcdn.com/wp-content/uploads/2019/03/32019-Top-10-Small-Appliances-Mixer.jpg'
        },
        {
            name: 'Stationary',
            img: 'https://previews.123rf.com/images/len44ik/len44ik1302/len44ik130200251/17981189-school-and-office-stationary-isolated-on-white-back-to-school-concept.jpg'
        },
        {
            name: 'Women\'s Clothing',
            img: 'https://mms-images.out.customink.com/mms/images/catalog/categories/148_large.jpg'
        },
        {
            name: 'Appliance',
            img: 'https://ak1.ostkcdn.com/wp-content/uploads/2019/03/32019-Top-10-Small-Appliances-Mixer.jpg'
        },
        {
            name: 'Stationary',
            img: 'https://previews.123rf.com/images/len44ik/len44ik1302/len44ik130200251/17981189-school-and-office-stationary-isolated-on-white-back-to-school-concept.jpg'
        },
        {
            name: 'Women\'s Clothing',
            img: 'https://mms-images.out.customink.com/mms/images/catalog/categories/148_large.jpg'
        },
        {
            name: 'Appliance',
            img: 'https://ak1.ostkcdn.com/wp-content/uploads/2019/03/32019-Top-10-Small-Appliances-Mixer.jpg'
        },
        {
            name: 'Stationary',
            img: 'https://previews.123rf.com/images/len44ik/len44ik1302/len44ik130200251/17981189-school-and-office-stationary-isolated-on-white-back-to-school-concept.jpg'
        },
        {
            name: 'Women\'s Clothing',
            img: 'https://mms-images.out.customink.com/mms/images/catalog/categories/148_large.jpg'
        },
        {
            name: 'Appliance',
            img: 'https://ak1.ostkcdn.com/wp-content/uploads/2019/03/32019-Top-10-Small-Appliances-Mixer.jpg'
        },
        {
            name: 'Stationary',
            img: 'https://previews.123rf.com/images/len44ik/len44ik1302/len44ik130200251/17981189-school-and-office-stationary-isolated-on-white-back-to-school-concept.jpg'
        }

    ]

    return (
        <div className="category-wrapper">
            <ul className="category-list">
                {
                    categories.map((category, index) => {
                        return (
                            <li key={index}>
                                <CategoryCard>
                                    {category}
                                </CategoryCard>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Category_List