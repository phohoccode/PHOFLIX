import clsx from "clsx";
import styles from './MovieSuggestions.module.scss'
import Movies from "../Movies";
import { useState } from "react";

function MovieSuggestions({ data }) {
    const [categorys, setCategorys] = useState(data?.movie?.category || [])
    const [currentApi, setCurrentApi] = useState(
        `https://phimapi.com/v1/api/the-loai/${data?.movie?.category[0]?.slug}?page=2&limit=12`)
    const [currentIndex, setCurrentIndex] = useState(0)

    const handleSetApi = (index, slug) => {
        setCurrentIndex(index)
        setCurrentApi(`https://phimapi.com/v1/api/the-loai/${slug}?page=2&limit=12`)
    }

    return (
        <div className={styles.filter_movie}>
            <header>
                <h4>Gợi ý phim theo thể loại</h4>
                <div className={styles.filter__options}>
                    {categorys.map((category, index) => (
                        <button
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