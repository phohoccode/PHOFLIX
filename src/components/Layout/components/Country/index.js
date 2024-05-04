import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Country.module.scss"
import clsx from "clsx";
import useFetch from "../../../../Hooks/useFetch";

function Country() {
    const [countrys] = useFetch('https://phimapi.com/quoc-gia')
    return ( 
        <ul className={clsx(styles.SideBar__country)}>
            {countrys && countrys.map((country, index) => (
                <li key={index}>
                    <Link to={`/PHOFLIX/country/${country.slug}`}>{country.name}</Link>
                </li>
            ))}
        </ul>
     );
}

export default Country;