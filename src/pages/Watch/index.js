import clsx from "clsx";
import styles from "./Watch.module.scss"
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function Watch() {
    const [movie, setMovie] = useState([])
    const [movieName, setMovieName] = useState('')
    const [episode, setEpisode] = useState(1)
    const [linkEmbed, setLinkEmbed] = useState('')
    const params = useParams()
    const movieRef = useRef()

    const handleSetEpisode = (data) => {
        const currentMovie = JSON.parse(localStorage.getItem('current-movie'))
        const isExist = currentMovie.link_embed === data?.episodes[0]?.server_data[currentMovie.index - 1]?.link_embed
        isExist ? setEpisode(currentMovie.index) : setEpisode(1)
        if (isExist) {
            setEpisode(currentMovie.index)
            setLinkEmbed(currentMovie.link_embed)
        } else {
            setEpisode(1)
            setLinkEmbed(data?.episodes[0]?.server_data[0]?.link_embed)
        }
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
            localStorage.setItem('RecentltyViewed', JSON.stringify([...recenltyViewed, data]));
        } else {
            console.log('Đã tồn tại trong lịch sử xem gần đây.');
        }
    }


    const hanleChangeEpisode = (link_embed, index) => {
        const value = {
            link_embed,
            index
        }
        localStorage.setItem('current-movie', JSON.stringify(value))
        setLinkEmbed(link_embed)
        setEpisode(index)
    }

    return (
        <div className={clsx(styles.Watch)}>
            <h4>{movieName}</h4>
            <div className={clsx(styles.Watch__iframe)}>
                <iframe
                    src={linkEmbed}
                    frameBorder="0"
                    className="video"
                    allow="fullscreen">
                </iframe>
            </div>
            <div>
                <h4>Danh sách tập phim</h4>
                <ul className={clsx(styles.Watch__episodes)}>
                    {movie.map((movie, index) => (
                        <li
                            ref={movieRef}
                            className={
                                ++index === episode ?
                                     clsx(styles.active) : ''
                            }
                            key={index}
                            onClick={() => hanleChangeEpisode(movie.link_embed, index)}
                        >
                            {movie.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Watch;