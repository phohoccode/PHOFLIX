import clsx from "clsx";
import styles from "./Slide.module.scss"
import { Link } from 'react-router-dom'

function Slide({ data }) {
    return (
        <div className={clsx(styles.Slide)}>
            <figure>
                <img src={data?.thumb_url} />
            </figure>
            <div className={clsx(styles.Slide__info)}>
                <h4>{data?.name}</h4>
                <div>
                    <Link to={`/PHOFLIX/detail/${data.slug}`} className={clsx('btn btn--sub')}>
                        <i className="fa-solid fa-play"></i>
                        Xem ngay
                    </Link>
                    <span className={clsx('year')}>{data?.year}</span>
                </div>
            </div>
        </div>
    );
}

export default Slide;