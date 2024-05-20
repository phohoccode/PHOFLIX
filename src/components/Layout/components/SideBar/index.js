import { NavLink, useLocation } from "react-router-dom"
import { useState, useContext, useEffect } from "react"
import clsx from 'clsx'
import styles from "./SideBar.module.scss"
import Category from "../Category"
import Country from "../Country"
import Context from "../../../../Context"

function SideBar() {
    const { pathname } = useLocation()
    const [showCategorys, setShowCategorys] = useState(false)
    const [showCountry, setShowCountry] = useState(false)
    const { handleToggleBar, isSideBarOpen } = useContext(Context)
    const [width, setWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])


    return (
        <div
            style={{
                display: width > 768 ||
                    isSideBarOpen ? 'block' : 'none'
            }}
            className={styles.sidebar}
        >
            <div className={styles.sidebar__row}>
                <h4>
                    <i className="fa-solid fa-grip"></i>
                    Danh mục
                </h4>
                <ul className={styles.sidebar__list}>
                    <li
                        className={clsx({
                            [styles.active]: pathname === '/'
                        }, styles.sidebar__item)}>
                        <NavLink
                            onClick={handleToggleBar}
                            to="/"
                        >
                            Trang Chủ
                        </NavLink>
                    </li>
                    <li
                        className={clsx({
                            [styles.active]: pathname === '/detail/danh-sach/phim-le'
                        }, styles.sidebar__item)} >
                        <NavLink
                            onClick={handleToggleBar}
                            to="/detail/danh-sach/phim-le"
                        >
                            Phim Lẻ
                        </NavLink>
                    </li>
                    <li
                        className={clsx({
                            [styles.active]: pathname === '/detail/danh-sach/phim-bo'
                        }, styles.sidebar__item)} >
                        <NavLink
                            onClick={handleToggleBar}
                            to="/detail/danh-sach/phim-bo"
                        >
                            Phim Bộ
                        </NavLink>
                    </li>
                    <li
                        className={clsx({
                            [styles.active]: pathname === '/detail/danh-sach/hoat-hinh'
                        }, styles.sidebar__item)} >
                        <NavLink
                            onClick={handleToggleBar}
                            to="/detail/danh-sach/hoat-hinh"
                        >
                            Phim Hoạt Hình
                        </NavLink>
                    </li>
                    <li
                        className={clsx({
                            [styles.active]: pathname === '/detail/danh-sach/tv-shows'
                        }, styles.sidebar__item)} >
                        <NavLink
                            onClick={handleToggleBar}
                            to="/detail/danh-sach/tv-shows"
                        >
                            Tv Shows
                        </NavLink>
                    </li>
                    <li
                        className={styles.sidebar__item}
                        onClick={() => setShowCategorys(!showCategorys)}>
                        <span>
                            Thể Loại
                            {showCategorys ? (
                                <i className="fa-solid fa-chevron-up"></i>
                            ) : (
                                <i className="fa-solid fa-chevron-down"></i>
                            )}
                        </span>
                        {showCategorys && <Category />}
                    </li>
                    <li
                        className={styles.sidebar__item}
                        onClick={() => setShowCountry(!showCountry)}>
                        <span>
                            Quốc Gia
                            {showCountry ? (
                                <i className="fa-solid fa-chevron-up"></i>
                            ) : (
                                <i className="fa-solid fa-chevron-down"></i>
                            )}
                        </span>
                        {showCountry && <Country />}
                    </li>
                </ul>
            </div>
            <div className='seperate'></div>
            <div className={styles.sidebar__row}>
                <h4>
                    <i className="fa-solid fa-user"></i>
                    Cá nhân
                </h4>
                <ul className={styles.sidebar__list}>
                    <li
                        className={clsx({
                            [styles.active]: pathname === '/savemovie'
                        }, styles.sidebar__item)} >
                        <NavLink
                            onClick={handleToggleBar}
                            to="/savemovie"
                        >
                            Phim đã lưu
                        </NavLink>
                    </li>
                    <li
                        className={clsx({
                            [styles.active]: pathname === '/recenltyviewed'
                        }, styles.sidebar__item)} >
                        <NavLink
                            onClick={handleToggleBar}
                            to="/recenltyviewed"
                        >
                            Đã xem gần đây
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar