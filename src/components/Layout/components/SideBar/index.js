import { Link } from "react-router-dom";
import clsx from 'clsx'
import styles from "./SideBar.module.scss"
import Category from "../Category";
import Country from "../Country";
import { useState } from "react";

function SideBar() {
    const [showCategorys, setShowCategorys] = useState(false)
    const [showCountry, setShowCountry] = useState(false)

    return (
        <div className={clsx(styles.SideBar)}>
            <div className={clsx(styles.SideBar__item)}>
                <h4>Danh mục</h4>
                <ul>
                    <li>
                        <Link to="/PHOFLIX/">
                            Trang Chủ
                        </Link>
                    </li>
                    <li>
                        <Link to="/PHOFLIX/detail/danh-sach/phim-le">
                            Phim Lẻ
                        </Link>
                    </li>
                    <li>
                        <Link to="/PHOFLIX/detail/danh-sach/phim-bo">
                            Phim Bộ
                        </Link>
                    </li>
                    <li>
                        <Link to="/PHOFLIX/detail/danh-sach/hoat-hinh">
                            Phim Hoạt Hình
                        </Link>
                    </li>
                    <li>
                        <Link to="/PHOFLIX/detail/danh-sach/tv-shows">
                            Tv Shows
                        </Link>
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
            <div className={clsx(styles.SideBar__item)}>
                <h4>Cá nhân</h4>
                <ul>
                    <li>
                        <Link to="/PHOFLIX/savemovie">Phim đã lưu</Link>
                    </li>
                    <li>
                        <Link to="/PHOFLIX/recenltyviewed">Đã xem gần đây</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SideBar;