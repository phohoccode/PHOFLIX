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
                    <span className={styles.status}>{data?.lang}</span>
                </figure>
                <span className={styles.name}>{data?.name}</span>
            </Link>
        </div>
    )
}

export default Movie