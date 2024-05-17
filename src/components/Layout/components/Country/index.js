import { NavLink, useLocation } from "react-router-dom"
import styles from "./Country.module.scss"
import clsx from "clsx"
import useFetch from "../../../../Hooks/useFetch"
import { Context } from "../../../../Provider";
import { useContext } from "react";

function Country() {
    const [countrys] = useFetch('https://phimapi.com/quoc-gia')
    const { pathname } = useLocation()
    const {handleToggleBar } = useContext(Context)

    return ( 
        <ul className={clsx(styles.country)}>
            {countrys && countrys.map((country, index) => (
                <li    
                    onClick={handleToggleBar} 
                    className={pathname === `/detail/quoc-gia/${country.slug}` ? 
                        clsx(styles.active) : ''}
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