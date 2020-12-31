import React, { useState } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';
import "./styles.scss"

const items = [
    {
        src: 'https://i0.wp.com/bloomingtrenz.com/wp-content/uploads/2018/03/Deal-Post-Banner.jpg?fit=1540%2C768',
        altText: 'Slide 1',
        caption: 'Slide 1'
    },
    {
        src: 'https://i1.wp.com/bloomingtrenz.com/wp-content/uploads/2018/03/Coupon-Banner.jpg?fit=1536%2C768',
        altText: 'Slide 2',
        caption: 'Slide 2'
    },
    {
        src: 'https://previews.123rf.com/images/gmast3r/gmast3r1706/gmast3r170600624/79995338-shopping-cart-discount-tag-sale-special-offer-banner-flat-vector-illustration.jpg',
        altText: 'Slide 3',
        caption: 'Slide 3'
    }
];

const Carousel_Slide = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    const slides = items.map((item) => {
        return (
            <CarouselItem
                className="h-100 w-100 carousel-container"
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.src}
            >
                <img className="d-block w-100" src={item.src} alt={item.altText} />
                <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
            </CarouselItem>
        );
    });

    return (
        <Carousel
            className="w-50 h-100"
            activeIndex={activeIndex}
            next={next}
            previous={previous}
        >
            <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
    );
}

export default Carousel_Slide;