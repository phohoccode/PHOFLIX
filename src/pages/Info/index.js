import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import clsx from "clsx";
import styles from "./Info.module.scss"

function Info() {
    const params = useParams()
    const [data] = useFetch('https://phimapi.com/phim/'.concat(params.slug))

    return (
        <div className={clsx(styles.Info)}>
            <div className={clsx(styles.Info__background)}>
                <figure>
                    <img src={data?.movie?.thumb_url} />
                    <div className={clsx(styles.Info__backgroundOuter)}>
                        <figure>
                            <img src={data?.movie?.poster_url}/>
                            <span className={clsx('quality', styles.Info__quality)}>{data?.movie?.quality}</span>
                        </figure>
                        <div className={clsx(styles.Info__movie)}>
                            <h4>{data?.movie?.name}</h4>
                            <div className={clsx(styles.Info__actions)}>
                                <button className={clsx('btn btn--primary')}>
                                    <i className="fa-solid fa-bookmark"></i>
                                    Lưu phim
                                </button>
                                <Link to={`/PHOFLIX/watch/${data?.movie?.slug}`} className={clsx('btn btn--sub')}>
                                    <i className="fa-solid fa-play"></i>
                                    Xem ngay
                                </Link>
                            </div>
                            <h5>Thông tin phim</h5>
                            <span>Thời gian: {data?.movie?.time}</span>
                            <span>Tác giả: {data?.movie?.director}</span>
                            <ul>
                                <span>Quốc gia:</span>
                                {data?.movie?.country.map((country, index) => (
                                    <li key={index}>{country.name}</li>
                                ))}
                            </ul>
                            <ul>
                                <span>Thể loại:</span>
                                {data?.movie?.category.map((category, index) => (
                                    <li key={index}>
                                        <Link to={`/PHOFLIX/detail/the-loai/${category.slug}`}>
                                            {category.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <ul>
                                <span>Diễn viên:</span>
                                {data?.movie?.actor.map((actor, index) => (
                                    <li key={index}>{actor}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </figure>
            </div>

            <div className={clsx(styles.Info__content)}>
                <h4>Tóm tắt nội dung phim</h4>
                <p>{data?.movie?.content}</p>
            </div>

            <div className={clsx(styles.Info__trailer)}>
                <h4>Xem Trailer</h4>
                <iframe 
                    src={data?.movie?.trailer_url.replace('watch?v=', '/embed/')} 
                    frameBorder="0" 
                    allowFullScreen
                    allow="accelerometer"
                    referrerPolicy="strict-origin-when-cross-origin" 
                >
                </iframe>
            </div>
        </div>
    );
}

export default Info;