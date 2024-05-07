import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import useFetch from "../../Hooks/useFetch"
import clsx from "clsx"
import styles from "./Info.module.scss"

function Info() {
    const params = useParams()
    const [data] = useFetch('https://phimapi.com/phim/'.concat(params.slug))
    const [show, setShow] = useState(false)
    const movies = data?.movie
    
    useEffect(() => {
        const savedMovies = JSON.parse(localStorage.getItem('Save-Movie')) || []
        const isMovieSaved = savedMovies.some(saveMovie => saveMovie?.movie?.slug === params.slug)
        setShow(isMovieSaved)
    }, [params.slug])

    const handleSaveMovie = (data) => {
        const saveMovies = JSON.parse(localStorage.getItem('Save-Movie')) || []
        setShow(true)
        if (data !== null) {
            localStorage.setItem('Save-Movie', JSON.stringify([
                ...saveMovies, data
            ]))
        }
    }

    const handleRemoveMovie = (slug) => {
        setShow(false)
        const saveMovies = JSON.parse(localStorage.getItem('Save-Movie')) || []
        const newSaveMovies = saveMovies.filter(saveMovie => saveMovie?.movie?.slug !== slug)
        localStorage.setItem('Save-Movie', JSON.stringify(newSaveMovies))
    }

    return (
        <div className={clsx(styles.Info)}>
            <div className={clsx(styles.Info__background)}>
                <figure>
                    <img src={movies?.thumb_url} />
                    <div className={clsx(styles.Info__backgroundOuter)}>
                        <figure>
                            <img src={movies?.poster_url} />
                            <span className={clsx('quality', styles.Info__quality)}>{movies?.quality}</span>
                        </figure>
                        <div className={clsx(styles.Info__movie)}>
                            <h4>{movies?.name}</h4>
                            <div className={clsx(styles.Info__actions)}>
                                {show === false && <button
                                    className={clsx('btn btn--primary')}
                                    onClick={() => handleSaveMovie(data)}
                                >
                                    <i className="fa-solid fa-bookmark"></i>
                                    Lưu phim
                                </button>}
                                {show && <button
                                    className={clsx('btn btn--primary')}
                                    onClick={() => handleRemoveMovie(movies?.slug)}
                                >
                                    <i className="fa-solid fa-trash"></i>
                                    Xoá phim
                                </button>}
                                <Link to={movies?.slug && `/PHOFLIX/watch/${movies?.slug}`} className={clsx('btn btn--sub')}>
                                    <i className="fa-solid fa-play"></i>
                                    Xem ngay
                                </Link>
                            </div>
                            <h5>Thông tin phim</h5>
                            <span>Thời gian: {movies?.time}</span>
                            <span>Tác giả: {movies?.director}</span>
                            <ul>
                                <span>Quốc gia:</span>
                                {movies?.country.map((country, index) => (
                                    <li key={index}>
                                        <Link to={`/PHOFLIX/detail/quoc-gia/${country.slug}`}>
                                            {country.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <ul>
                                <span>Thể loại:</span>
                                {movies?.category.map((category, index) => (
                                    <li key={index}>
                                        <Link to={`/PHOFLIX/detail/the-loai/${category.slug}`}>
                                            {category.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <ul>
                                <span>Diễn viên:</span>
                                {movies?.actor.map((actor, index) => (
                                    <li key={index}>{actor}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </figure>
            </div>

            <div className={clsx(styles.Info__content)}>
                <h4>Tóm tắt nội dung phim</h4>
                <p>{movies?.content}</p>
            </div>

            <div className={clsx(styles.Info__trailer)}>
                <h4>Xem Trailer</h4>
                <iframe
                    src={movies?.trailer_url.replace('watch?v=', '/embed/')}
                    frameBorder="0"
                    allowFullScreen
                    allow="accelerometer"
                    referrerPolicy="strict-origin-when-cross-origin"
                >
                </iframe>
            </div>
        </div>
    )
}

export default Info