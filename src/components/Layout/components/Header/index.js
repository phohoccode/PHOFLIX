import { NavLink } from "react-router-dom"
import logo from './logo.jpg'
import styles from "./Header.module.scss"
import clsx from 'clsx'
import { useState, useContext } from "react"
import { Context } from "../../../../Provider"

function Header() {
    const [valueSearch, setValueSearch] = useState('')
    const [showOnMobile, setShowOnMobile] = useState(false)
    const { handleToggleBar, isSideBarOpen } = useContext(Context)

    return (
        <>
            <nav className={clsx(styles.navbar)}>
                {!showOnMobile &&
                    <div onClick={handleToggleBar} className={clsx(styles.navbar__bar)}>
                        {!isSideBarOpen && <i className="fa-solid fa-bars-staggered"></i>}
                        {isSideBarOpen && <i className="fa-solid fa-xmark"></i>}
                    </div>}
                {!showOnMobile &&
                    <div className={clsx(styles.navbar__logo)}>
                        <NavLink to="/PHOFLIX/">
                            <img src={logo} />
                        </NavLink>
                        <h4>PHOFLIX</h4>
                    </div>}
                <div
                    style={{flex: showOnMobile ? 1 : ''}}
                    className={clsx(styles.navbar__search)}>
                    <div 
                        onClick={() => setShowOnMobile(!showOnMobile)}
                        style={{ display: showOnMobile ? 'block' : 'none' }}
                        className={clsx(styles.navbar__search_left)}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </div>
                    <div
                        style={{ display: window.innerWidth > 768 || showOnMobile ? 'block' : 'none' }}
                        className={clsx(styles.navbar__search_center)}>
                        <input
                            placeholder="Tìm kiếm phim..."
                            value={valueSearch}
                            onChange={(e) => setValueSearch(e.target.value)}
                        />
                        <span onClick={() => setValueSearch('')}>
                            <i className="fa-solid fa-xmark"></i>
                        </span>
                        <NavLink to={`/PHOFLIX/search/${valueSearch}`}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </NavLink>
                    </div>
                    {!showOnMobile && 
                        <div
                            onClick={() => setShowOnMobile(!showOnMobile)}
                            className={clsx(styles.navbar__search_right)}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                    }
                </div>
            </nav>
        </>
    )
}

export default Header