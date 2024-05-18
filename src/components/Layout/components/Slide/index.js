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
                <h4>{data?.name}</h4>
                <div>
                    <Link to={`/watch/${data.slug}`} className={clsx('btn', 'btn--sub')}>
                        <i className="fa-brands fa-google-play"></i>
                        Xem ngay
                    </Link>
                    <span className='year'>
                        <i class="fa-regular fa-calendar"></i>
                        {data?.year}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Slide