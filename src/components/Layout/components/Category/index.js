import { NavLink, useLocation } from "react-router-dom"
import clsx from "clsx"
import { useContext } from "react"
import Context from "../../../../Context"
import styles from "../SideBar/SideBar.module.scss"

function Category({ data }) {
    const { pathname } = useLocation()
    const { handleToggleBar } = useContext(Context)

    return (
        <ul className={clsx(styles.sidebar__sub_list)}>
            {data && data.map((category, index) => (
                <li
                    onClick={handleToggleBar}
                    className={clsx({
                        [styles.active]: pathname === `/detail/the-loai/${category.slug}`
                    }, styles.sidebar__item)}
                    key={index}>
                    <NavLink to={`/detail/the-loai/${category.slug}`}>
                        {category.name}
                    </NavLink>
                </li>
            ))}
        </ul>
    )
}

export default Category