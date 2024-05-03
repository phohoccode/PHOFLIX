import { Link } from "react-router-dom";
import logo from './logo.jpg'
import styles from "./Header.module.scss"
import clsx from 'clsx'

function Header() {
    return ( 
        <>
            <nav className={clsx(styles.NavBar)}>
                <div className={clsx(styles.NavBar__logo)}>
                    <Link to="/PHOFLIX">
                        <img src={logo}/>
                    </Link>
                    <h4>PHOFLIX</h4>
                </div>
                <div className={clsx(styles.NavBar__search)}>
                    <input placeholder="Tìm kiếm..."/>
                    <Link to>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </Link>
                </div>
                <div className={clsx('btn', styles.NavBar__actions)}>
                    <Link>Đăng nhập</Link>
                </div>
            </nav>
        </>
     );
}

export default Header