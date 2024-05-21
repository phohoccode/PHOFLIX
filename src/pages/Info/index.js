import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import clsx from "clsx"
import { toast } from 'react-toastify';
import useFetch from "../../Hooks/useFetch"
import styles from "./Info.module.scss"
import storage from "../../util"
import MovieSuggestions from "../../components/Layout/components/MovieSuggestions";

function Info() {
    const params = useParams()
    const [data] = useFetch(`https://phimapi.com/phim/${params.slug}`)
    const [isShow, setIsShow] = useState(false)
    const [movie, setMovie] = useState([])
    const [countrys, setCountrys] = useState([])
    const [categorys, setCategorys] = useState([])
    const [actors, setActors] = useState([])
    const [titleDocument, setTitleDocument] = useState('')

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    useEffect(() => {
        setMovie(data?.movie || {})
        setCountrys(data?.movie?.country || [])
        setCategorys(data?.movie?.category || [])
        setActors(data?.movie?.actor || [])
        setTitleDocument(data?.movie?.name || 'Info Movie')
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [data])

    useEffect(() => {
        document.title = `Thông tin phim: ${titleDocument}`
    }, [titleDocument])

    useEffect(() => {
        const savedMovies = storage.get('list-of-saved-movies', [])
        const isMovieSaved = savedMovies.some(
            saveMovie => saveMovie?.movie?.slug === params.slug)
        setIsShow(isMovieSaved)
    }, [params.slug])

    const handleSaveMovie = () => {
        try {
            const saveMovies = storage.get('list-of-saved-movies', [])
            localStorage.setItem('list-of-saved-movies', JSON.stringify([
                ...saveMovies, data
            ]))
            setIsShow(true)
            toast.success('Lưu phim thành công!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
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
        toast.success('Xoá phim thành công!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    return (
        <div className={styles.info}>
            <div className={styles.info__background}>
                <figure className={styles.info__thumb}>
                    <img src={movie?.thumb_url} />
                </figure>
                <div className={styles.info__background_outer}>
                    <figure>
                        <img src={movie?.poster_url} />
                    </figure>
                    <div className={styles.info__movie}>
                        <h4>{movie?.name}</h4>
                        <div className={styles.info__actions}>
                            {!isShow &&
                                <button
                                    className={clsx('btn', 'btn--primary')}
                                    onClick={handleSaveMovie}
                                >
                                    <i className="fa-solid fa-bookmark"></i>
                                    Lưu phim
                                </button>
                            }
                            {isShow &&
                                <button
                                    className={clsx('btn', 'btn--primary')}
                                    onClick={() => handleRemoveMovie(movie?.slug)}
                                >
                                    <i className="fa-solid fa-trash"></i>
                                    Xoá phim
                                </button>
                            }
                            <Link
                                to={`/watch/${movie?.slug}`}
                                className={clsx('btn', 'btn--sub')}
                            >
                                <i className="fa-brands fa-google-play"></i>
                                Xem ngay
                            </Link>
                        </div>
                        <h5>Thông tin phim</h5>
                        <span className='text-primary'>
                            Thời gian: <span className='text-white'>{movie?.time}</span>
                        </span>
                        <span className='text-primary'>
                            Đạo diễn: <span className='text-white'>{movie?.director}</span>
                        </span>
                        <ul>
                            <span className='text-primary'>Quốc gia:</span>
                            {countrys.map((country, index) => (
                                <li
                                    style={{ padding: '0 2px'}}
                                    className={clsx('cursor-pointer', 'btn', 'btn--primary')}
                                    key={index}
                                >
                                    <Link to={`/detail/quoc-gia/${country?.slug}`}>
                                        {country?.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <ul>
                            <span className='text-primary '>Thể loại:</span>
                            {categorys.map((category, index) => (
                                <li
                                    style={{ padding: '0 2px'}}
                                    className={clsx('cursor-pointer', 'btn', 'btn--primary')}
                                    key={index}
                                >
                                    <Link to={`/detail/the-loai/${category?.slug}`}>
                                        {category?.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <ul>
                            <span className='text-primary'>Diễn viên:</span>
                            {actors.map((actor, index) => (
                                <li key={index}>{actor}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className={styles.info__content}>
                <h4 className={styles.info__title}>Tóm tắt nội dung phim</h4>
                <p>{movie?.content}</p>
            </div>

            <div className={styles.info__trailer}>
                <h4 className={styles.info__title}>Xem Trailer</h4>
                <iframe
                    src={movie?.trailer_url &&
                        movie?.trailer_url.replace('watch?v=', '/embed/')}
                    frameBorder="0"
                    allowFullScreen
                    allow="accelerometer"
                    referrerPolicy="strict-origin-when-cross-origin"
                >
                </iframe>
            </div>

            {data && <MovieSuggestions data={data}/>}
            
        </div>
    )
}

export default Info