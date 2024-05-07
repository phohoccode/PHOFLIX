import stylesMovie from '../../components/Layout/components/Movies/Movies.module.scss'
import clsx from "clsx"
import styles from "./RecentltyViewed.module.scss"
import Movie from '../../components/Layout/components/Movie'
import { useEffect, useState } from 'react'

function RecentlyViewed() {
    const [movies, setMovies] = useState([])
    
    useEffect(() => {
        document.title = 'Lịch sử đã xem gần đây'
        const data = JSON.parse(localStorage.getItem('RecentltyViewed')) || []
        setMovies(data)
    }, [])

    const handleDeleteAll = () => {
        localStorage.setItem('RecentltyViewed', JSON.stringify([]))
        setMovies([])
    }

    return (
        <div className={clsx(styles.recentltyViewed)}>
            <div className={clsx(stylesMovie.Movies__wrapper)}>
                <header>
                    <h4>
                        {movies.length > 0 ? 'Lịch sử đã xem gần đây' : 'Lịch sử trống!'}
                    </h4>
                    {
                        movies.length > 0 &&
                        <button
                            onClick={handleDeleteAll}
                            className={clsx('btn btn--primary')}
                        >
                            Xoá tất cả
                        </button>
                    }
                </header>
                <div className={clsx(stylesMovie.Movies__list)}>
                    {movies && movies.map((movie, index) => (
                        <Movie key={index} data={movie?.movie} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RecentlyViewed;