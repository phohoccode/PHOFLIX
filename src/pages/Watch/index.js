import clsx from "clsx"
import { useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import styles from "./Watch.module.scss"
import Comment from "../../components/Layout/components/Comments"
import storage from "../../util"

function Watch() {
    const [movie, setMovie] = useState([])
    const [slug, setSlug] = useState('')
    const [movieName, setMovieName] = useState('')
    const [episode, setEpisode] = useState(1)
    const [linkEmbed, setLinkEmbed] = useState('')
    const params = useParams()
    const movieRef = useRef()

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    const handleSetEpisode = (data) => {
        const currentMovie = storage.get('save-watched-episodes', [])
        const movieExist = currentMovie.find(
            movie => movie?.link_embed ===
                data?.episodes[0]?.server_data[movie.episode - 1]?.link_embed)
        console.log(movieExist)
        if (movieExist) {
            alert(`Chào mừng bạn đã quay lại lúc trước bạn đang xem tập ${movieExist.episode}`)
            setEpisode(movieExist.episode)
            setLinkEmbed(movieExist.link_embed)
            return
        }
        setEpisode(1)
        setLinkEmbed(data?.episodes[0]?.server_data[0]?.link_embed)
    }

    useEffect(() => {
        const getMovie = async () => {
            try {
                const res = await fetch(`https://phimapi.com/phim/${params.slug}`)
                const data = await res.json()
                setMovie(data?.episodes[0]?.server_data)
                setSlug(data?.movie?.slug)
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
        const recenltyViewed = storage.get('recentlty-viewed', [])
        const isExist = recenltyViewed.some(
            movie => movie?.movie?.slug === data?.movie?.slug)
        if (!isExist) {
            storage.set('recentlty-viewed', [...recenltyViewed, data])
        }
    }

    const hanleChangeEpisode = (link_embed, index, slug) => {
        const value = {
            link_embed,
            episode: index,
            slug
        }
        setEpisode(index)
        setLinkEmbed(link_embed)
        const currentMovieStorage = storage.get('save-watched-episodes', [])
        const indexMovie = currentMovieStorage.findIndex(
            movie => movie.slug === slug
        )
        if (indexMovie !== -1) {
            currentMovieStorage[indexMovie].episode = index
            currentMovieStorage[indexMovie].link_embed = link_embed
            storage.set('save-watched-episodes', currentMovieStorage)
            return
        }
        storage.set('save-watched-episodes', [...currentMovieStorage, value])
    }

    const handleCopyLinkM3u8 = () => {
        navigator.clipboard.writeText(linkEmbed) // trả về promise
            .then(() => {
                alert('Copied the link: ' + linkEmbed)
            })
            .catch(err => {
                console.error('Failed to copy: ', err)
            })
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
                            onClick={() => hanleChangeEpisode(movie.link_embed, index, slug)}
                        >
                            {movie.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className={clsx(styles.watch__copy_link_m3u8)}>
                <h4>Link m3u8</h4>
                <div>
                    <button
                        onClick={handleCopyLinkM3u8}
                        className={clsx('btn btn--primary')}>Copy</button>
                    <p>{linkEmbed}</p>
                </div>
            </div>

            {slug && <Comment slug={slug} />}
        </div>
    )
}

export default Watch