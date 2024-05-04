import clsx from "clsx";
import styles from "./Slides.module.scss"
import Slide from "../Slide";
import useFetch from "../../../../Hooks/useFetch";
import { useEffect, useRef, useState } from "react";

function Slides({ api }) {
    const [index, setIndex] = useState(0);
    const slideInnerRef = useRef();
    const idInterval = useRef()
    const [data] = useFetch(api);
    const slides = data?.items;
    
    useEffect(() => {
        idInterval.current = setInterval(() => {
            handleNext()
        }, 5000)

        return () => clearInterval(idInterval.current)
    }, [index])

    const handlePrev = () => {
        const newIndex = index === 0 ? 9 : index - 1;
        setIndex(newIndex);
        slideInnerRef.current.style.transform = `translateX(-${slideInnerRef.current.clientWidth * newIndex}px)`;
    };

    const handleNext = () => {
        const newIndex = index === 9 ? 0 : index + 1;
        setIndex(newIndex);
        slideInnerRef.current.style.transform = `translateX(-${slideInnerRef.current.clientWidth * newIndex}px)`;
    };

    return (
        <div className={clsx(styles.Sides__container)}>
            <button 
                onClick={handlePrev} 
                className={clsx('prev')}
            >
                <i className="fa-solid fa-chevron-left"></i>
            </button>
            <div ref={slideInnerRef} className={clsx(styles.Sides__inner)}>
                {slides && slides.map((slide, index) => (
                    <Slide key={index} data={slide} />
                ))}
            </div>
            <button 
                onClick={handleNext} 
                className={clsx('next')}
            >
                <i className="fa-solid fa-chevron-right"></i>
            </button>
        </div>
    );
}

export default Slides;
