import { NavLink } from "react-router-dom"
import logo from './logo.jpg'
import styles from "./Header.module.scss"
import clsx from 'clsx'
import { useState, useContext } from "react"
import { Context } from "../../../../Provider"

function Header() {
    const [valueSearch, setValueSearch] = useState('')
    const {handleToggleBar, isSideBarOpen } = useContext(Context)

    return ( 
        <>
            <nav className={clsx(styles.navbar)}>
                <div onClick={handleToggleBar} className={clsx(styles.navbar__bar)}>
                    {!isSideBarOpen && <i className="fa-solid fa-bars-staggered"></i>}
                    {isSideBarOpen && <i className="fa-solid fa-xmark"></i>}
                </div>
                <div className={clsx(styles.navbar__logo)}>
                    <NavLink to="/PHOFLIX/">
                        <img src={logo}/>
                    </NavLink>
                    <h4>PHOFLIX</h4>
                </div>
                <div className={clsx(styles.navbar__search)}>
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
            </nav>
        </>
     )
}

export default Header