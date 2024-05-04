import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Category.module.scss"
import clsx from "clsx";
import useFetch from "../../../../Hooks/useFetch";

function Category() {
    const [categorys] = useFetch('https://phimapi.com/the-loai')
    return ( 
        <ul className={clsx(styles.SideBar__category)}>
            {categorys && categorys.map((category, index) => (
                <li key={index}>
                    <Link to={`/PHOFLIX/category/${category.slug}`}>{category.name}</Link>
                </li>
            ))}
        </ul>
     );
}

export default Category;