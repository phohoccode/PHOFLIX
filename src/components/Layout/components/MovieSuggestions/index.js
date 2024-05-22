import clsx from "clsx";
import styles from './MovieSuggestions.module.scss'
import Movies from "../Movies";
import { useEffect, useState } from "react";

function MovieSuggestions({ data }) {
    const [categorys, setCategorys] = useState([])
    const [currentApi, setCurrentApi] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        setCategorys(data?.movie?.category || [])
        setCurrentApi(
            `https://phimapi.com/v1/api/the-loai/${data?.movie?.category[0]?.slug}?page=2&limit=12` || '') 
        setCurrentIndex(0)
    }, [data])

    const handleSetApi = (index, slug) => {
        setCurrentIndex(index)
        setCurrentApi(
            `https://phimapi.com/v1/api/the-loai/${slug}?page=2&limit=12`)
    }

    return (
        <div className={styles.suggestions}>
            <header>
                <h4>Gợi ý phim liên quan</h4>
                <div className={styles.suggestions__options}>
                    {categorys.map((category, index) => (
                        <button
                            style={{padding: '2px'}}
                            key={index}
                            className={clsx('btn', 'btn--primary', {
                                [styles.active]: index === currentIndex
                            })}
                            onClick={() => handleSetApi(index, category?.slug)}
                        >
                            {category?.name}
                        </button>
                    ))}
                </div>
            </header>
            {currentApi && <Movies api={currentApi} />}
        </div>
    );
}

export default MovieSuggestions;