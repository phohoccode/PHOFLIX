import clsx from "clsx"
import styles from "./Watch.module.scss"
import { useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import Comment from "../../components/Layout/components/Comments"

function Watch() {
    const [movie, setMovie] = useState([])
    const [movieName, setMovieName] = useState('')
    const [episode, setEpisode] = useState(1)
    const [linkEmbed, setLinkEmbed] = useState('')
    const params = useParams()
    const movieRef = useRef()

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])

    const handleSetEpisode = (data) => {
        const currentMovie = JSON.parse(localStorage.getItem('current-movie')) || []
        const isExist = currentMovie.link_embed === 
                        data?.episodes[0]?.server_data[currentMovie.episode - 1]?.link_embed
        if (!isExist) {
            setEpisode(1)
            setLinkEmbed(data?.episodes[0]?.server_data[0]?.link_embed)
            return
        }
        setEpisode(currentMovie.episode)
        setLinkEmbed(currentMovie.link_embed)
    }
    
    useEffect(() => {
        const getMovie = async () => {
            try {
                const res = await fetch(`https://phimapi.com/phim/${params.slug}`)
                const data = await res.json()
                setMovie(data?.episodes[0]?.server_data)
                setMovieName(data?.movie?.name)
                handleRecenltyViewed(data)
                handleSetEpisode(data)
                document.title = `Bạn đang xem: ${data?.movie.name}`
            } catch (error) {
                console.error(error)
            }
        }
        getMovie()
    }, [params.slug])

    const handleRecenltyViewed = (data) => {
        const recenltyViewed = JSON.parse(localStorage.getItem('RecentltyViewed')) || []
        const isExist = recenltyViewed.some(movie => movie?.movie?.slug === data?.movie?.slug)
        if (!isExist) {
            localStorage.setItem('RecentltyViewed', JSON.stringify([...recenltyViewed, data]))
        }
    }

    const hanleChangeEpisode = (link_embed, index, filename) => {
        const value = {
            link_embed,
            episode: index,
            filename
        }
        localStorage.setItem('current-movie', JSON.stringify(value))
        setLinkEmbed(link_embed)
        setEpisode(index)
    }

    return (
        <div className={clsx(styles.watch)}>
            <h4>{movieName}</h4>
            <div className={clsx(styles.watch__iframe)}>
                <iframe
                    src={linkEmbed}
                    frameBorder="0"
                    className="video"
                    allow="fullscreen">
                </iframe>
            </div>
            <div className={clsx(styles.watch__listOfEpisodes)}>
                <h4>Danh sách tập phim</h4>
                <ul className={clsx(styles.watch__episodes)}>
                    {movie.map((movie, index) => (
                        <li
                            ref={movieRef}
                            className={
                                ++index === episode ?
                                     clsx(styles.active) : ''
                            }
                            key={index}
                            onClick={() => hanleChangeEpisode(movie.link_embed, index, movie?.filename)}
                        >
                            {movie.name}
                        </li>
                    ))}
                </ul>
            </div>
            <Comment/>
        </div>
    )
}

export default Watch