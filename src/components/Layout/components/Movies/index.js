import { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./Movies.module.scss"
import Movie from "../Movie";
import { Link } from "react-router-dom";

function Movies({ api }) {
    const [movies, setMovies] = useState([])
    const [titlePage, setTitlePage] = useState('')
    useEffect(() => {
        const getDataMovie = async () => {
            const res = await fetch(api)
            const data = await res.json()
            setMovies(data?.data?.items)
            setTitlePage(data?.data?.titlePage)
            console.log(data)
        }
        getDataMovie()
    }, [])

    return (
        <div className={clsx(styles.Movies__wrapper)}>
            <h4>{titlePage}</h4>
            <div className={clsx(styles.Movies__list)}>
                {movies.map((movie, index) => (
                    <Movie key={index} data={movie} />
                ))}
            </div>
        </div>
    );
}

export default Movies;