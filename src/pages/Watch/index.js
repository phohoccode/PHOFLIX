import clsx from "clsx";
import styles from "./Watch.module.scss"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Watch() {
    const [movie, setMovie] = useState([])
    const [movieName, setMovieName] = useState('')
    const [episode, setEpisode] = useState(1)
    const [linkEmbed, setLinkEmbed] = useState('')
    const params = useParams()

    useEffect(() => {
        setEpisode(1)
    }, [params.slug])

    useEffect(() => {
        console.log(episode)
        const getMovie = async () => {
            try {
                const res = await fetch(`https://phimapi.com/phim/${params.slug}`)
                const data = await res.json()
                console.log(data)
                setMovie(data?.episodes[0]?.server_data)
                setMovieName(data?.movie?.name)
                setLinkEmbed(data?.episodes[0]?.server_data[0]?.link_embed)
            } catch (error) {
                console.error(error)
            }
        }
        getMovie()
    }, [params.slug])


    const hanleChangeEpisode = (link_embed, index) => {
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
                            className={++index === episode ? clsx(styles.active) : ''}
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