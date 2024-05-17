import { NavLink, useLocation } from "react-router-dom"
import { useState, useContext, useEffect } from "react"
import clsx from 'clsx'
import styles from "./SideBar.module.scss"
import Category from "../Category"
import Country from "../Country"
import { Context } from "../../../../Provider"

function SideBar() {
    const { pathname } = useLocation()
    const [showCategorys, setShowCategorys] = useState(false)
    const [showCountry, setShowCountry] = useState(false)
    const {handleToggleBar, isSideBarOpen } = useContext(Context)
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
            style={{display: width > 768 ||
                 isSideBarOpen ? 'block' : 'none'}}
            className={styles.sidebar}
        >
            <div className={styles.sidebar__item}>
                <h4>
                    <i className="fa-regular fa-rectangle-list"></i>
                    Danh mục
                </h4>
                <ul>
                    <li
                        className={clsx({
                            [styles.active] : pathname === '/'
                        })}>
                        <NavLink 
                            onClick={handleToggleBar} 
                            to="/"
                        >
                            Trang Chủ
                        </NavLink>
                    </li>
                    <li
                        className={clsx({
                            [styles.active] : pathname === '/detail/danh-sach/phim-le'
                        })} >
                        <NavLink 
                            onClick={handleToggleBar} 
                            to="/detail/danh-sach/phim-le"
                        >
                            Phim Lẻ
                        </NavLink>
                    </li>
                    <li
                        className={clsx({
                            [styles.active] : pathname === '/detail/danh-sach/phim-bo'
                        })} >
                        <NavLink 
                            onClick={handleToggleBar} 
                            to="/detail/danh-sach/phim-bo"
                        >
                            Phim Bộ
                        </NavLink>
                    </li>
                    <li
                        className={clsx({
                            [styles.active] : pathname === '/detail/danh-sach/hoat-hinh'
                        })} >
                        <NavLink 
                            onClick={handleToggleBar} 
                            to="/detail/danh-sach/hoat-hinh"
                        >
                            Phim Hoạt Hình
                        </NavLink>
                    </li>
                    <li
                        className={clsx({
                            [styles.active] : pathname === '/detail/danh-sach/tv-shows'
                        })} >
                        <NavLink 
                            onClick={handleToggleBar} 
                            to="/detail/danh-sach/tv-shows"
                        >
                            Tv Shows
                        </NavLink>
                    </li>
                    <li onClick={() => setShowCategorys(!showCategorys)}>
                        <span>
                            Thể Loại
                            <i className="fa-solid fa-chevron-down"></i>
                        </span>
                        {showCategorys && <Category />}
                    </li>
                    <li onClick={() => setShowCountry(!showCountry)}>
                        <span>
                            Quốc Gia
                            <i className="fa-solid fa-chevron-down"></i>
                        </span>
                        {showCountry && <Country />}
                    </li>
                </ul>
            </div>
            <div className='seperate'></div>
            <div className={styles.sidebar__item}>
                <h4>
                    <i className="fa-solid fa-user"></i>
                    Cá nhân
                </h4>
                <ul>
                    <li
                        className={clsx({
                            [styles.active] : pathname === '/savemovie'
                        })} >
                        <NavLink 
                            onClick={handleToggleBar} 
                            to="/savemovie"
                        >
                            Phim đã lưu
                        </NavLink>
                    </li>
                    <li
                        className={clsx({
                            [styles.active] : pathname === '/recenltyviewed'
                        })} >
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