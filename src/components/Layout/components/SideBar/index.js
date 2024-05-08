import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import clsx from 'clsx'
import styles from "./SideBar.module.scss"
import Category from "../Category";
import Country from "../Country";

function SideBar() {
    const { pathname } = useLocation()
    const [showCategorys, setShowCategorys] = useState(false)
    const [showCountry, setShowCountry] = useState(false)

    return (
        <div className={clsx(styles.sidebar)}>
            <div className={clsx(styles.sidebar__item)}>
                <h4>
                    <i className="fa-regular fa-rectangle-list"></i>
                    Danh mục
                </h4>
                <ul>
                    <li
                        className={pathname === '/PHOFLIX/' ?
                            clsx(styles.active) : ''}>
                        <NavLink to="/PHOFLIX/">

                            Trang Chủ
                        </NavLink>
                    </li>
                    <li
                        className={pathname === '/PHOFLIX/detail/danh-sach/phim-le' ?
                            clsx(styles.active) : ''} >
                        <NavLink to="/PHOFLIX/detail/danh-sach/phim-le">
                            Phim Lẻ
                        </NavLink>
                    </li>
                    <li
                        className={pathname === '/PHOFLIX/detail/danh-sach/phim-bo' ?
                            clsx(styles.active) : ''} >
                        <NavLink to="/PHOFLIX/detail/danh-sach/phim-bo">
                            Phim Bộ
                        </NavLink>
                    </li>
                    <li
                        className={pathname === '/PHOFLIX/detail/danh-sach/hoat-hinh' ?
                            clsx(styles.active) : ''} >
                        <NavLink to="/PHOFLIX/detail/danh-sach/hoat-hinh">
                            Phim Hoạt Hình
                        </NavLink>
                    </li>
                    <li
                        className={pathname === '/PHOFLIX/detail/danh-sach/tv-shows' ?
                            clsx(styles.active) : ''} >
                        <NavLink to="/PHOFLIX/detail/danh-sach/tv-shows">
                            Tv Shows
                        </NavLink>
                    </li>
                    <li>
                        <span onClick={() => setShowCategorys(!showCategorys)}>
                            Thể Loại
                            <i className="fa-solid fa-chevron-down"></i>
                        </span>
                        {showCategorys && <Category />}
                    </li>
                    <li>
                        <span onClick={() => setShowCountry(!showCountry)}>
                            Quốc Gia
                            <i className="fa-solid fa-chevron-down"></i>
                        </span>
                        {showCountry && <Country />}
                    </li>
                </ul>
            </div>
            <div className={clsx('seperate')}></div>
            <div className={clsx(styles.sidebar__item)}>
                <h4>
                    <i className="fa-solid fa-user"></i>
                    Cá nhân
                </h4>
                <ul>
                    <li
                        className={pathname === '/PHOFLIX/savemovie' ?
                            clsx(styles.active) : ''} >
                        <NavLink to="/PHOFLIX/savemovie">Phim đã lưu</NavLink>
                    </li>
                    <li
                        className={pathname === '/PHOFLIX/recenltyviewed' ?
                            clsx(styles.active) : ''} >
                        <NavLink to="/PHOFLIX/recenltyviewed">Đã xem gần đây</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SideBar;