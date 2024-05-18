import { useEffect, useState } from "react"
import Header from "../components/Header"
import SideBar from "../components/SideBar"
import Footer from "../components/Footer"
import styles from "./DefaultLayout.module.scss"
import { Provider } from "../../../Provider"
import Loading from "../components/Loading"

function DefaultLayout({ children }) {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }, [])

    return (
        <Provider>
            {!isLoading && <>
                <Header />
                <div className={styles.Container}>
                    <SideBar />
                    <div className={styles.Container__content}>
                        {children}
                    </div>
                </div>
                <Footer />
            </>}
            {isLoading && <Loading />}
        </Provider>
    )
}

export default DefaultLayout