import { useParams } from "react-router-dom";
import Movie from "../../components/Layout/components/Movie";
import { useEffect, useState } from "react";
import useFetch from "../../Hooks/useFetch";
import clsx from "clsx";
import styles from './Detail.module.scss'
import stylesMovie from '../../components/Layout/components/Movies/Movies.module.scss'

function Detail() {
    const params = useParams();
    const [page, setPage] = useState(1);
    const [data] = useFetch('https://phimapi.com/v1/api/'.concat(params.list, '/', params.slug, `?page=${page}`));
    const movies = data?.data?.items;
    const titleName = data?.data?.breadCrumb[0]?.name;
    const totalPages = data?.data?.params?.pagination?.totalPages;

    const handleChangePage = (index) => {
        setPage(index)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    const renderPaginations = () => {
        const paginationItems = [];
        for (let i = 1; i <= totalPages; i++) {
            paginationItems.push(
                <li 
                    className={clsx(i === page ? styles.active : '')}
                    onClick={() => handleChangePage(i)} 
                    key={i}
                >
                    {i}
                </li>
            );
        }
        return paginationItems;
    };

    return (
        <div className={clsx(styles.Detail)}>
            <div className={clsx(stylesMovie.Movies__wrapper)}>
                <header>
                    <h4>{titleName && titleName}</h4>
                    <span>Trang {page}</span>
                </header>
                <div className={clsx(stylesMovie.Movies__list)}>
                    {movies && movies.map((movie, index) => (
                        <Movie key={index} data={movie} />
                    ))}
                </div>
            </div>
            <ul className={clsx(styles.Detail__pages)}>
                {renderPaginations()}
            </ul>
        </div>
    );
}


export default Detail;