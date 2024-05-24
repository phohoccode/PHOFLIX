import { NavLink, useNavigate } from "react-router-dom"
import { useState, useContext, useEffect } from "react"
import logo from './logo.jpg'
import styles from "./Header.module.scss"
import Context from "../../../../Context"

function Header() {
    const [valueSearch, setValueSearch] = useState('')
    const [showOnMobile, setShowOnMobile] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)
    const { handleToggleBar, isSideBarOpen } = useContext(Context)
    // useNavigatetrả về một hàm cho phép bạn điều hướng theo chương trình
    const navigate = useNavigate()

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            navigate(`/search/${valueSearch}`)
        }
    }

    return (

        <nav className={styles.navbar}>
            {!showOnMobile &&
                <div onClick={handleToggleBar} className={styles.navbar__bar}>
                    {isSideBarOpen ? (
                        <i className="fa-solid fa-xmark"></i>
                    ) : (
                        <i className="fa-solid fa-bars-staggered"></i>
                    )}
                </div>}
            {!showOnMobile &&
                <div className={styles.navbar__logo}>
                    <NavLink to="/">
                        <img src={logo} />
                    </NavLink>
                    <h4>PHOFLIX</h4>
                </div>}
            <div
                style={{ flex: showOnMobile ? 1 : '' }}
                className={styles.navbar__search}
            >
                <div
                    onClick={() => setShowOnMobile(!showOnMobile)}
                    style={{ display: showOnMobile ? 'block' : 'none' }}
                    className={styles.navbar__search_left}
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </div>
                <div
                    style={{ display: width > 768 || showOnMobile ? 'block' : 'none' }}
                    className={styles.navbar__search_center}
                >
                    <input
                        placeholder="Tìm kiếm..."
                        value={valueSearch}
                        onChange={(e) => setValueSearch(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    <span onClick={() => setValueSearch('')}>
                        <i className="fa-regular fa-circle-xmark"></i>
                    </span>
                    <NavLink to={`/search/${valueSearch}`}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </NavLink>
                </div>
                {!showOnMobile &&
                    <div
                        onClick={() => setShowOnMobile(!showOnMobile)}
                        className={styles.navbar__search_right}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                }
            </div>
        </nav>

    )
}

export default Header