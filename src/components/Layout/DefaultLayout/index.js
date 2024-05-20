import { useEffect, useState } from "react"
import { toast } from 'react-toastify'
import Header from "../components/Header"
import SideBar from "../components/SideBar"
import Footer from "../components/Footer"
import styles from "./DefaultLayout.module.scss"
import Provider from "../../../Provider"
import Loading from "../components/Loading"

function DefaultLayout({ children }) {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
        toast.info('Chào mừng bạn đến với PHOFLIX!, chúc bạn có trải nghiệm xem phim vui vẻ nhất.', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
            });
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