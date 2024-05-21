import { Link } from "react-router-dom"
import styles from "./Movie.module.scss"

function Movie({ data }) {
    return (
        <div className={styles.movie}>
            <Link to={`/info/${data?.slug}`}>
                <figure>
                    <img
                        src={data?.poster_url.includes('https://img.phimapi.com') ?
                            data?.poster_url :
                            `https://img.phimapi.com/${data?.poster_url}`
                        }
                    />
                    <i className="fa-brands fa-google-play"></i>
                    <div className={styles.movie__info}>
                        <span className={styles.status}>{data?.lang}</span>
                        <span className={styles.quality}>{data?.quality}</span>
                        <span className={styles.episode_current}>{data?.episode_current}</span>
                    </div>
                </figure>
                <span className={styles.movie__name}>{data?.name}</span>
            </Link>
        </div>
    )
}

export default Movie