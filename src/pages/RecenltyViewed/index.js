import { useEffect, useState } from 'react'
import clsx from "clsx"
import stylesMovie from '../../components/Layout/components/Movies/Movies.module.scss'
import styles from "./RecentltyViewed.module.scss"
import Movie from '../../components/Layout/components/Movie'
import storage from "../../util"

function RecentlyViewed() {
    const [movies, setMovies] = useState([])
    
    useEffect(() => {
        document.title = 'Lịch sử đã xem gần đây'
        const data = storage.get('recentlty-viewed', [])
        setMovies(data)
    }, [])

    const handleDeleteAll = () => {
        storage.set('recentlty-viewed', [])
        setMovies([])
    }

    return (
        <div className={clsx(styles.recentltyViewed)}>
            <div className={clsx(stylesMovie.movies__wrapper)}>
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
                <div className={clsx(stylesMovie.movies__list)}>
                    {movies && movies.map((movie, index) => (
                        <Movie key={index} data={movie?.movie} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RecentlyViewed;