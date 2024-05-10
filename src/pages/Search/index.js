import clsx from 'clsx'
import stylesMovie from '../../components/Layout/components/Movies/Movies.module.scss'
import styles from './Search.module.scss'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Movie from '../../components/Layout/components/Movie';

function Search() {
    const params = useParams()
    const [resultMovies, setResultMovies] = useState([])
    const [titlePage, setTitlePgae] = useState('')
    let [limit, setLimit] = useState(10)

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])

    useEffect(() => {
        setLimit(prevLimit => prevLimit * 0 + 10)
    }, [params.keyword])

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('limit', limit)
                const res = await fetch(`https://phimapi.com/v1/api/tim-kiem?keyword=${params.keyword}&limit=${limit}`)
                const data = await res.json()
                setResultMovies(data?.data?.items)
                setTitlePgae(data?.data?.titlePage)    
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }
        fetchData()

    }, [params.keyword, limit])


    const handleSeeMoreResult = () => {
        if (resultMovies.length < limit) {
            alert('het phim')
            return
        }
        setLimit(prevLimit => prevLimit + 10);
    }

    return (
        <div className={clsx(styles.Search)}>
            <div className={clsx(stylesMovie.movies__wrapper)}>
                <header>
                    <h4>
                        {resultMovies.length > 0 ?
                            titlePage && titlePage :
                            'Không tìm thấy kết quả phù hợp!'
                        }
                    </h4>
                </header>
                <div className={clsx(stylesMovie.movies__list)}>
                    {resultMovies && resultMovies.map((movie, index) => (
                        <Movie key={index} data={movie} />
                    ))}
                </div>
            </div>
            {resultMovies.length > 0 &&
                <button
                    onClick={handleSeeMoreResult}
                    className={clsx('btn btn--primary')}
                >
                    Xem thêm
                </button>
            }
        </div>
    );
}

export default Search;