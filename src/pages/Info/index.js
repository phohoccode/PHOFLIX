import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import clsx from "clsx"
import useFetch from "../../Hooks/useFetch"
import styles from "./Info.module.scss"
import storage from "../../util"

function Info() {
    const params = useParams()
    const [data] = useFetch(`https://phimapi.com/phim/${params.slug}`)
    const [isShow, setIsShow] = useState(false)
    const movies = data?.movie

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    useEffect(() => {
        const savedMovies = storage.get('list-of-saved-movies', [])
        const isMovieSaved = savedMovies.some(
            saveMovie => saveMovie?.movie?.slug === params.slug)
        setIsShow(isMovieSaved)
    }, [params.slug])

    const handleSaveMovie = () => {
        try {
            if (!data) return
            const saveMovies = storage.get('list-of-saved-movies', [])
            localStorage.setItem('list-of-saved-movies', JSON.stringify([
                ...saveMovies, data
            ]))
            setIsShow(true)
        } catch (error) {
            console.error(error)
        }
    }

    const handleRemoveMovie = (slug) => {
        const saveMovies = storage.get('list-of-saved-movies', [])
        const newSaveMovies = saveMovies.filter(
            saveMovie => saveMovie?.movie?.slug !== slug)
        storage.set('list-of-saved-movies', newSaveMovies)
        setIsShow(false)
    }

    return (
        <div className={clsx(styles.info)}>
            <div className={clsx(styles.info__background)}>
                <figure className={clsx(styles.info__thumb)}>
                    <img src={movies?.thumb_url} />
                </figure>
                <div className={clsx(styles.info__background_outer)}>
                    <figure>
                        <img src={movies?.poster_url} />
                        <span className={clsx('quality', styles.info__quality)}>
                            {movies?.quality}
                        </span>
                    </figure>
                    <div className={clsx(styles.info__movie)}>
                        <h4>{movies?.name}</h4>
                        <div className={clsx(styles.info__actions)}>
                            {!isShow &&
                                <button
                                    className={clsx('btn btn--primary')}
                                    onClick={handleSaveMovie}
                                >
                                    <i className="fa-solid fa-bookmark"></i>
                                    Lưu phim
                                </button>
                            }
                            {isShow &&
                                <button
                                    className={clsx('btn btn--primary')}
                                    onClick={() => handleRemoveMovie(movies?.slug)}
                                >
                                    <i className="fa-solid fa-trash"></i>
                                    Xoá phim
                                </button>
                            }
                            <Link to={movies?.slug && `/PHOFLIX/watch/${movies?.slug}`} className={clsx('btn btn--sub')}>
                                <i className="fa-solid fa-play"></i>
                                Xem ngay
                            </Link>
                        </div>
                        <h5>Thông tin phim</h5>
                        <span className={clsx('text-primary')}>
                            Thời gian: <span className={clsx('text-white')}>{movies?.time}</span>
                        </span>
                        <span className={clsx('text-primary')}>
                            Đạo diễn: <span className={clsx('text-white')}>{movies?.director}</span>
                        </span>
                        <ul>
                            <span className={clsx('text-primary')}>Quốc gia:</span>
                            {movies?.country.map((country, index) => (
                                <li className={clsx('cursor-pointer')} key={index}>
                                    <Link to={`/PHOFLIX/detail/quoc-gia/${country.slug}`}>
                                        {country.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <ul>
                            <span className={clsx('text-primary')}>Thể loại:</span>
                            {movies?.category.map((category, index) => (
                                <li className={clsx('cursor-pointer')} key={index}>
                                    <Link to={`/PHOFLIX/detail/the-loai/${category.slug}`}>
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <ul>
                            <span className={clsx('text-primary')}>Diễn viên:</span>
                            {movies?.actor.map((actor, index) => (
                                <li key={index}>{actor}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className={clsx(styles.info__content)}>
                <h4>Tóm tắt nội dung phim</h4>
                <p>{movies?.content}</p>
            </div>

            <div className={clsx(styles.info__trailer)}>
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