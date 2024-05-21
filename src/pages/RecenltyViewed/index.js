import { useEffect, useState } from 'react'
import clsx from "clsx"
import { toast } from 'react-toastify';
import stylesMovie from '../../components/Layout/components/Movies/Movies.module.scss'
import Movie from '../../components/Layout/components/Movie'
import storage from "../../util"

function RecentlyViewed() {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        document.title = 'Lịch sử đã xem gần đây'
        window.scrollTo({ top: 0, behavior: 'smooth' })
        const data = storage.get('recentlty-viewed', [])
        setMovies(data)
    }, [])

    const handleDeleteAll = () => {
        storage.set('recentlty-viewed', [])
        setMovies([])
        toast.success('Đã xoá lịch sử xem gần đây!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    return (
        <div className={clsx(stylesMovie.movies__wrapper)}>
            <header>
                <h4>
                    {movies.length > 0 ? 
                        `Lịch sử đã xem gần đây ( ${movies.length} )` : 
                        'Lịch sử xem trống!'}
                </h4>
                {
                    movies.length > 0 &&
                    <button
                        style={{ marginTop: '6px' }}
                        onClick={handleDeleteAll}
                        className={clsx('btn btn--primary')}
                    >
                        Xoá tất cả
                    </button>
                }
            </header>
            <div className={clsx(stylesMovie.movies__list)}>
                {movies && movies.map((movie, index) => (
                    <Movie key={index} data={movie?.movie} />
                ))}
            </div>
        </div>
    )
}

export default RecentlyViewed;