import clsx from "clsx"
import styles from "./Movies.module.scss"
import Movie from "../Movie"
import { Link } from "react-router-dom"
import useFetch from "../../../../Hooks/useFetch"

function Movies({ api }) {
    const [data] = useFetch(api)
    const titlePage = data?.data?.titlePage
    const movies = data?.data?.items
    const breadCrumb = data?.data?.breadCrumb[0]

    return (
        <div className={clsx(styles.movies__wrapper)}>
            <header>
                <h4>{titlePage && titlePage}</h4>
                <Link to={breadCrumb && `/detail${breadCrumb?.slug}`}>
                    Xem tất cả
                    <i className="fa-solid fa-chevron-right"></i>
                </Link>
            </header>
            <div className={clsx(styles.movies__list)}>
                {movies && movies.map((movie, index) => (
                    <Movie key={index} data={movie} />
                ))}
            </div>  
        </div>
    )
}

export default Movies