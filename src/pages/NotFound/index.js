import { Link } from 'react-router-dom'
import styles from './NotFound.module.scss'
import clsx from 'clsx';
import { useEffect } from 'react';

function NotFound() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])

    return ( 
        <div className={clsx(styles.not_found)}>
            <h1>404</h1>
            <span>Rất tiếc! Trang không tồn tại</span>
            <p>Xin lỗi, nhưng trang bạn đang tìm kiếm không được tìm thấy. Hãy đảm bảo bạn đã nhập một URL hợp lệ.</p>
            <Link className={clsx('btn btn--primary')} to='/PHOFLIX/'>Quay lại trang chủ</Link>
        </div>
     );
}

export default NotFound;