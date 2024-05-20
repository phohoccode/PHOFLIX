import clsx from 'clsx'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import styles from './Search.module.scss'
import stylesMovie from '../../components/Layout/components/Movies/Movies.module.scss'
import Movie from '../../components/Layout/components/Movie'
import useFetch from '../../Hooks/useFetch'

function Search() {
    let [limit, setLimit] = useState(10)
    const params = useParams()
    const [data] = useFetch(`https://phimapi.com/v1/api/tim-kiem?keyword=${params.keyword}&limit=${limit}`)
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
        setLimit(prevLimit => prevLimit * 0 + 10)
    }, [params.keyword])

    const handleSeeMoreResult = () => {
        if (resultMovies.length < limit) {
            toast.error('Đã hết phim phù hợp!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            return
        }
        setLimit(prevLimit => prevLimit + 10)
        toast.success('Tải phim thành công!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        })
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
            {resultMovies.length >= 10 &&
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