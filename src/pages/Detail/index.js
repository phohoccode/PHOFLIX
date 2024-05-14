import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import clsx from "clsx"
import Movie from "../../components/Layout/components/Movie"
import styles from './Detail.module.scss'
import stylesMovie from '../../components/Layout/components/Movies/Movies.module.scss'

function Detail() {
    const params = useParams()
    const [movies, setMovies] = useState([])
    const [titleName, setTitleName] = useState('')
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(1)

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setPage(1)
    }, [params.slug])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(
                    `https://phimapi.com/v1/api/${params.describe}/${params.slug}?page=${page}`)
                const data = await res.json()
                setMovies(data?.data?.items)
                setTitleName(data?.data?.breadCrumb[0]?.name)
                setTotalPages(data?.data?.params?.pagination?.totalPages)
                document.title = data?.data?.seoOnPage?.titleHead || 'Movie detail'
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }
        fetchData()
    }, [params.describe, params.slug, page])

    const handleChangePage = (index) => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setPage(index)
    }

    const renderPaginations = () => {
        const paginationItems = []
        for (let i = 1; i <= totalPages; i++) {
            paginationItems.push(
                <li
                    className={clsx({
                        [styles.active] : i === page
                    })}
                    onClick={() => handleChangePage(i)}
                    key={i}
                >
                    {i}
                </li>
            )
        }
        return paginationItems
    }

    return (
        <div className={clsx(styles.detail)}>
            <div className={clsx(stylesMovie.movies__wrapper)}>
                <header>
                    <h4>{titleName}</h4>
                    <span>Trang {page}</span>
                </header>
                <div className={clsx(stylesMovie.movies__list)}>
                    {movies && movies.map((movie, index) => (
                        <Movie key={index} data={movie} />
                    ))}
                </div>
            </div>
            <ul className={clsx(styles.detail__pages)}>
                {renderPaginations()}
            </ul>
        </div>
    )
}

export default Detail
