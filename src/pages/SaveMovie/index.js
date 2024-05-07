import stylesMovie from '../../components/Layout/components/Movies/Movies.module.scss'
import clsx from "clsx"
import styles from "./SaveMovie.module.scss"
import Movie from '../../components/Layout/components/Movie'
import { useEffect, useState } from 'react'


function SaveMovie() {
    const [movies, setMovies] = useState([])
    
    useEffect(() => {
        document.title = 'Danh sách phim đã lưu gần đây'
        const data = JSON.parse(localStorage.getItem('Save-Movie')) || []
        setMovies(data)
    }, [])

    const handleDeleteAll = () => {
        localStorage.setItem('Save-Movie', JSON.stringify([]))
        setMovies([])
    }
    return (
        <div className={clsx(styles.saveMovie)}>
            <div className={clsx(stylesMovie.Movies__wrapper)}>
                <header>
                    <h4>
                        {movies.length > 0 ? 'Danh sách phim đã lưu' : 'Danh sách phim trống!'}
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
    )
}

export default SaveMovie