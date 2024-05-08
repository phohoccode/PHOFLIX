import { NavLink, useLocation } from "react-router-dom"
import styles from "./Country.module.scss"
import clsx from "clsx"
import useFetch from "../../../../Hooks/useFetch"

function Country() {
    const [countrys] = useFetch('https://phimapi.com/quoc-gia')
    const { pathname } = useLocation()

    return ( 
        <ul className={clsx(styles.country)}>
            {countrys && countrys.map((country, index) => (
                <li     
                    className={pathname === `/PHOFLIX/detail/quoc-gia/${country.slug}` ? 
                        clsx(styles.active) : ''}
                    key={index}>
                    <NavLink to={`/PHOFLIX/detail/quoc-gia/${country.slug}`}>
                        {country.name}
                    </NavLink>
                </li>
            ))}
        </ul>
     )
}

export default Country