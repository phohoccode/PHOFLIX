import stylesMovie from '../../components/Layout/components/Movies/Movies.module.scss'
import clsx from "clsx"
import Movie from '../../components/Layout/components/Movie'
import { useEffect, useState } from 'react'


function SaveMovie() {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        document.title = 'Danh sách phim đã lưu gần đây'
        window.scrollTo({ top: 0, behavior: 'smooth' })
        const data = JSON.parse(localStorage.getItem('list-of-saved-movies')) || []
        setMovies(data)
    }, [])

    const handleDeleteAll = () => {
        localStorage.setItem('list-of-saved-movies', JSON.stringify([]))
        setMovies([])
    }
    return (
        <div className={clsx(stylesMovie.movies__wrapper)}>
            <header>
                <h4>
                    {movies.length > 0 ? 'Danh sách phim đã lưu' : 'Danh sách phim trống!'}
                </h4>
                {
                    movies.length > 0 &&
                    <button
                        style={{marginTop: '6px'}}
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
    )
}

export default SaveMovie