import { NavLink, useLocation } from "react-router-dom"
import { useContext } from "react";
import clsx from "clsx"
import Context from "../../../../Context";
import styles from "../SideBar/SideBar.module.scss"

function Country({ data }) {
    const { pathname } = useLocation()
    const { handleToggleBar } = useContext(Context)

    return (
        <ul className={clsx(styles.sidebar__sub_list)}>
            {data && data.map((country, index) => (
                <li
                    onClick={handleToggleBar}
                    className={clsx({
                        [styles.active]: pathname === `/detail/quoc-gia/${country.slug}`
                    }, styles.sidebar__item)}
                    key={index}>
                    <NavLink to={`/detail/quoc-gia/${country.slug}`}>
                        {country.name}
                    </NavLink>
                </li>
            ))}
        </ul>
    )
}

export default Country