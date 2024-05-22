import clsx from 'clsx'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styles from './Search.module.scss'
import stylesMovie from '../../components/Layout/components/Movies/Movies.module.scss'
import Movie from '../../components/Layout/components/Movie'
import useFetch from '../../Hooks/useFetch'
import { showSuccessMessage, showInfoMessage } from '../../components/Layout/components/toastMessage'


function Search() {
    let [limit, setLimit] = useState(12)
    const params = useParams()
    const [data] = useFetch(
        `https://phimapi.com/v1/api/tim-kiem?keyword=${params.keyword}&limit=${limit}`)
    const [resultMovies, setResultMovies] = useState([])
    const [titlePage, setTitlePgae] = useState('')

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])
    
    useEffect(() => {
        setResultMovies(data?.data?.items || [])
        setTitlePgae(data?.data?.titlePage || '')
    }, [data])

    useEffect(() => {
        document.title = titlePage
    }, [titlePage])

    useEffect(() => {
        setLimit(prevLimit => prevLimit * 0 + 12)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [params.keyword])

    const handleSeeMoreResult = () => {
        if (resultMovies.length < limit) {
            showInfoMessage('Đã hết phim phù hợp!')
            return
        }
        setLimit(prevLimit => prevLimit + 12)
        showSuccessMessage('Tải phim thành công!')
    }

    return (
        <div className={styles.Search}>
            <div className={stylesMovie.movies__wrapper}>
                <header>
                    <h4>
                        {resultMovies.length > 0 ?
                            titlePage :
                            'Không tìm thấy kết quả phù hợp!'
                        }
                    </h4>
                </header>
                <div className={stylesMovie.movies__list}>
                    {resultMovies && resultMovies.map((movie, index) => (
                        <Movie key={index} data={movie} />
                    ))}
                </div>
            </div>
            {resultMovies.length >= 12 &&
                <button
                    onClick={handleSeeMoreResult}
                    className={clsx('btn', 'btn--primary')}
                >
                    Xem thêm
                </button>
            }
        </div>

    )
}

export default Search