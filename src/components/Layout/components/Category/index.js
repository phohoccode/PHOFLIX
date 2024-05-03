import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Category.module.scss"
import clsx from "clsx";

function Category() {
    const [categotys, setCategorys] = useState([])
    useEffect(() => {
        const getCategorys = async () => {
            const res = await fetch('https://phimapi.com/the-loai')
            const data = await res.json()
            setCategorys(data)
        }
        getCategorys()
    }, [])
    return ( 
        <ul className={clsx(styles.SideBar__category)}>
            {categotys.map((categoty, index) => (
                <li key={index}>
                    <Link to={`/PHOFLIX/categoty/${categoty.slug}`}>{categoty.name}</Link>
                </li>
            ))}
        </ul>
     );
}

export default Category;