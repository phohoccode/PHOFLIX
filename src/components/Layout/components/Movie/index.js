import { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./Movie.module.scss"
import { Link } from "react-router-dom";

function Movie({ data }) {
    return (
        <div className={clsx(styles.Movie)}>
            <Link to={`/PHOFLIX/detail/${data.slug}`}>
                <figure>
                    <img 
                        loading="lazy"
                        src={data.poster_url.includes('https://img.phimapi.com') ?
                            data.poster_url : `https://img.phimapi.com/${data.poster_url}`
                        } 
                    />
                    <i class="fa-solid fa-play"></i>
                </figure>
                <span>{data.name}</span>
            </Link>
        </div>
    );
}

export default Movie;