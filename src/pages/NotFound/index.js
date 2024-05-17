import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { useEffect } from 'react'
import styles from './NotFound.module.scss'

function NotFound() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    return (
        <div className={styles.not_found}>
            <h1>404</h1>
            <span>Rất tiếc! Trang không tồn tại</span>
            <p>Xin lỗi, nhưng trang bạn đang tìm kiếm không được tìm thấy. Hãy đảm bảo bạn đã nhập một URL hợp lệ.</p>
            <Link
                className={clsx('btn', 'btn--primary')}
                to='/'
            >
                Quay lại trang chủ
            </Link>
        </div>
    )
}

export default NotFound