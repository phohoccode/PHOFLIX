import { NavLink, useLocation } from "react-router-dom"
import { useState, useContext, useEffect } from "react"
import clsx from 'clsx'
import styles from "./SideBar.module.scss"
import Context from "../../../../Context"
import Category from "../Category"
import Country from "../Country"
import useFetch from "../../../../Hooks/useFetch"

function SideBar() {
    const { handleToggleBar, isSideBarOpen } = useContext(Context)
    const { pathname } = useLocation()
    const [showCategory, setShowCategory] = useState(false)
    const [showCountry, setShowCountry] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)
    const [dataCategory] = useFetch('https://phimapi.com/the-loai')
    const [dataCountry] = useFetch('https://phimapi.com/quoc-gia')

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
                        onClick={() => setShowCategory(!showCategory)}>
                        <span>
                            Thể Loại
                            {showCategory ? (
                                <i className="fa-solid fa-chevron-up"></i>
                            ) : (
                                <i className="fa-solid fa-chevron-down"></i>
                            )}
                        </span>
                        {showCategory &&
                            <Category data={dataCategory && dataCategory} />
                        }
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
                        {showCountry &&
                            <Country data={dataCountry && dataCountry} />
                        }
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