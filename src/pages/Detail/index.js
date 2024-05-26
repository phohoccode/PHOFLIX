import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import clsx from "clsx"
import styles from './Detail.module.scss'
import stylesMovie from '../../components/Layout/components/Movies/Movies.module.scss'
import useFetch from "../../Hooks/useFetch"
import Movie from '../../components/Layout/components/Movie'
import {showInfoMessage} from '../../components/Layout/components/toastMessage'

function Detail() {
    const params = useParams()
    const [page, setPage] = useState(1)
    const [data] = useFetch(
        `https://phimapi.com/v1/api/${params.describe}/${params.slug}?page=${page}&limit=30`)
    const [movies, setMovie] = useState([])
    const [titleName, setTitleName] = useState('')
    const [totalPages, setTotalPages] = useState(0)
    const [titleDocument, setTitleDocument] = useState('')

    useEffect(() => {
        setMovie(data?.data?.items || [])
        setTitleName(data?.data?.breadCrumb[0]?.name || '')
        setTotalPages(data?.data?.params?.pagination?.totalPages || 0)
        setTitleDocument(data?.data?.seoOnPage?.titleHead || 'Movie detail')
    }, [data])

    useEffect(() => {
        document.title = titleDocument
    }, [titleDocument])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setPage(1)
    }, [params.slug])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [page])

    const handleChangePage = (index) => {
        setPage(index)
        showInfoMessage(`Bạn đang ở trang thứ ${index}`)
    }

    const renderPaginations = () => {
        const paginationItems = []
        for (let index = 1; index <= totalPages; index++) {
            paginationItems.push(
                <li
                    className={clsx({
                        [styles.active]: index === page
                    })}
                    onClick={() => handleChangePage(index)}
                    key={index}
                >
                    {index}
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
                    {data && <span>Trang {page}</span>}
                </header>
                <div className={clsx(stylesMovie.movies__list)}>
                    {movies.map((movie, index) => (
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
