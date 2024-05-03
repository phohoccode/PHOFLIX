import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Country.module.scss"
import clsx from "clsx";

function Country() {
    const [countrys, setCountrys] = useState([])
    useEffect(() => {
        const getCountrys = async () => {
            const res = await fetch('https://phimapi.com/quoc-gia')
            const data = await res.json()
            setCountrys(data)
        }
        getCountrys()
    }, [])
    return ( 
        <ul className={clsx(styles.SideBar__country)}>
            {countrys.map((country, index) => (
                <li key={index}>
                    <Link to={`/PHOFLIX/country/${country.slug}`}>{country.name}</Link>
                </li>
            ))}
        </ul>
     );
}

export default Country;