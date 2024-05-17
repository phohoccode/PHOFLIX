import { useEffect, useRef, useState } from "react"
import styles from "./Slides.module.scss"
import Slide from "../Slide"
import useFetch from "../../../../Hooks/useFetch"

function Slides({ api }) {
    const [index, setIndex] = useState(0)
    const slideInnerRef = useRef()
    const idInterval = useRef()
    const [data] = useFetch(api)
    const slides = data?.items || []

    useEffect(() => {
        idInterval.current = setInterval(handleNext, 5000)
        return () => clearInterval(idInterval.current)
    }, [index])
    
    useEffect(() => {
        slideInnerRef.current.style.transform = `translateX(-${slideInnerRef.current.clientWidth * index}px)`
    }, [index])

    const handlePrev = () => {
        setIndex(prevIndex => 
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1)
    }

    const handleNext = () => {
        setIndex(prevIndex => 
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1)
    }

    return (
        <div className={styles.slides__container}>
            <button
                onClick={handlePrev}
                className='prev'
            >
                <i className="fa-solid fa-chevron-left"></i>
            </button>
            <div 
                ref={slideInnerRef} 
                className={styles.slides__inner}
            >
                {slides.map((slide, index) => (
                    <Slide key={index} data={slide} />
                ))}
            </div>
            <button
                onClick={handleNext}
                className='next'
            >
                <i className="fa-solid fa-chevron-right"></i>
            </button>
        </div>
    )
}

export default Slides
