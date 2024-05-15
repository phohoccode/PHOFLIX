import { NavLink, useLocation } from "react-router-dom"
import styles from "./Category.module.scss"
import clsx from "clsx"
import useFetch from "../../../../Hooks/useFetch"
import { Context } from "../../../../Provider";
import { useContext } from "react";


function Category() {
    const [categorys] = useFetch('https://phimapi.com/the-loai')
    const { pathname} = useLocation()
    const {handleToggleBar} = useContext(Context)

    return ( 
        <ul className={clsx(styles.category)}>
            {categorys && categorys.map((category, index) => (
                <li 
                    onClick={handleToggleBar}
                    className={pathname === `/detail/the-loai/${category.slug}` ? 
                        clsx(styles.active) : ''}
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