import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styles from "./Movies.module.scss"
import Movie from "../Movie"
import useFetch from "../../../../Hooks/useFetch"

function Movies({ api }) {
    const [data] = useFetch(api)
    const [titlePage, setTitlePage] = useState('')
    const [movies, setMovies] = useState([])
    const [breadCrumb, setBreadCrumb] = useState('')

    useEffect(() => {
        setTitlePage(data?.data?.titlePage || '')
        setMovies(data?.data?.items || [])
        setBreadCrumb(data?.data?.breadCrumb[0] || '/')
    }, [data])


    return (
        <div className={styles.movies__wrapper}>
            <header>
                <h4>{titlePage}</h4>
                {data &&
                    <Link to={`/detail${breadCrumb?.slug}`}>
                        Xem tất cả
                        <i className="fa-solid fa-chevron-right"></i>
                    </Link>
                }
            </header>
            <div className={styles.movies__list}>
                {movies.map((movie, index) => (
                    <Movie key={index} data={movie} />
                ))}
            </div>
        </div>
    )
}

export default Movies