import { useEffect, useRef, useState } from "react"
import styles from "./Slides.module.scss"
import useFetch from "../../../../Hooks/useFetch"
import Slide from "../Slide"

function Slides({ api }) {
    const [index, setIndex] = useState(0)
    const slideInnerRef = useRef()
    const idInterval = useRef()
    const [data] = useFetch(api)
    const [slides, setSlides] = useState([])
    const [isGrabbing, setIsGrabbing] = useState(false)
    const [startPos, setStartPos] = useState(null)
    const [currentTranslate, setCurrentTranslate] = useState(0)

    useEffect(() => {
        setSlides(data?.items || [])
    }, [data])

    useEffect(() => {
        idInterval.current = setInterval(handleNext, 6000)
        return () => clearInterval(idInterval.current)
    }, [index])

    useEffect(() => {
        slideInnerRef.current.style.transform =
            `translateX(-${index * slideInnerRef.current.clientWidth}px)`
    }, [index])

    const handlePrev = () => {
        setIndex(prevIndex => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1))
    }

    const handleNext = () => {
        setIndex(prevIndex => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1))
    }

    const handleDragStart = (event) => {
        if (event.type.startsWith('mousedown')) {
            event.preventDefault()
        }
        const clientX = getClientX(event)
        setStartPos(clientX)
        setCurrentTranslate(0)
        setIsGrabbing(true)
    }

    const getClientX = (event) => {
        if (event.type.startsWith('touch')) {
            return event.touches[0].clientX
        }
        return event.clientX
    }

    const handleDragMove = (event) => {
        console.log(isGrabbing);
        if (isGrabbing) {
            const clientX = getClientX(event)
            const movedBy = clientX - startPos
            setCurrentTranslate(movedBy)
            slideInnerRef.current.style.transform =
                `translateX(${movedBy - index * slideInnerRef.current.clientWidth}px)`
        }
    }

    const handleDragEnd = () => {
        if (Math.abs(currentTranslate) > 10) {
            currentTranslate > 0 ? handlePrev() : handleNext()
        }
        setStartPos(null)
        setIsGrabbing(false)
        setCurrentTranslate(0)
    }

    return (
        <div className={styles.slides__container}>
            <button onClick={handlePrev} className='prev'>
                <i className="fa-solid fa-chevron-left"></i>
            </button>
            <div
                ref={slideInnerRef}
                className={styles.slides__inner}
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
                style={{ cursor: startPos ? 'grabbing' : 'grab' }}
            >
                {slides.map((slide, index) => (
                    <Slide key={index} data={slide} />
                ))}
            </div>
            <button onClick={handleNext} className='next'>
                <i className="fa-solid fa-chevron-right"></i>
            </button>
        </div>
    )
}

export default Slides
