import { Link } from 'react-router-dom'
import clsx from 'clsx'
import styles from "./Slide.module.scss"

function Slide({ data }) {
    return (
        <div className={styles.slide}>
            <figure>
                <img src={data?.thumb_url} />
            </figure>
            <div className={styles.slide__info}>
                <figure>
                    <img src={data?.poster_url}/>
                </figure>
                <div className={styles.slide__info_right}>
                    <h4>{data?.name}</h4>
                    <div className={styles.slide__actions}>
                        <Link
                            to={`/watch/${data?.slug}`}
                            className={clsx('btn', 'btn--sub')}
                        >
                            <i className="fa-brands fa-google-play"></i>
                            Xem ngay
                        </Link>
                        <Link
                            to={`/info/${data?.slug}`}
                            className={clsx('btn', 'btn--primary')}
                        >
                            <i className="fa-solid fa-circle-info"></i>
                            Chi tiết
                        </Link>
                        <span className='year'>
                            <i className="fa-regular fa-calendar"></i>
                            {data?.year}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Slide