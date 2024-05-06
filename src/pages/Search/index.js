import clsx from 'clsx'
import stylesMovie from '../../components/Layout/components/Movies/Movies.module.scss'
import styles from './Search.module.scss'
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Movie from '../../components/Layout/components/Movie';

function Search() {
    const params = useParams()
    const [resultMovies, setResultMovies] = useState([])
    let [limit, setLimit] = useState(10)
    let [index, setIndex] = useState(1)

    useEffect(() => {
        setLimit(10)
        setIndex(1)
    }, [params.keyword])

    useEffect(() => {
        const getMovies = async () => {
            const res = await fetch(`https://phimapi.com/v1/api/tim-kiem?keyword=${params.keyword}&limit=${limit}`)
            const data = await res.json()
            console.log(data);
            console.log(limit)
            setResultMovies(data?.data?.items)
        }
        getMovies()
    }, [params.keyword, limit])


    const handleSeeMoreResult = () => {
        let newIndex = index + 1
        setIndex(newIndex)
        setLimit(newIndex * 10)
    }
    return (
        <div className={clsx(styles.Search)}>
            <div className={clsx(stylesMovie.Movies__wrapper)}>
                <header>
                    <h4>
                        {resultMovies.length > 0 ?
                            `Kết quả tìm kiếm cho từ khoá: ${params.keyword}` :
                            'Không tìm thấy kết quả phù hợp!'
                        }
                    </h4>
                </header>
                <div className={clsx(stylesMovie.Movies__list)}>
                    {resultMovies && resultMovies.map((movie, index) => (
                        <Movie key={index} data={movie} />
                    ))}
                </div>
            </div>
            {resultMovies.length > 0 && <button
                onClick={handleSeeMoreResult}
                className={clsx('btn btn--primary')}
            >
                Xem thêm
            </button>}
        </div>
    );
}

export default Search;