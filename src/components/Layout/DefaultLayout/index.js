import { useEffect, useState } from "react"
import styles from "./DefaultLayout.module.scss"
import Header from "../components/Header"
import SideBar from "../components/SideBar"
import Footer from "../components/Footer"
import Provider from "../../../Provider"
import Loading from "../components/Loading"
import { showInfoMessage } from "../components/toastMessage"

function DefaultLayout({ children }) {
    const [isLoading, setIsLoading] = useState(true)
    const [isShowButtonScroll, setIsShowButtonScroll] = useState(false)

    useEffect(() => {
        setTimeout(() => {
        }, 2000)
        setIsLoading(false)
        showInfoMessage('Chào mừng bạn đến với PHOFLIX! Chúc bạn có trải nghiệm xem phim vui vẻ nhất.')
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 1000) {
                setIsShowButtonScroll(true)
            } else {
                setIsShowButtonScroll(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

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
                {isShowButtonScroll &&
                    <div
                        onClick={handleScrollToTop}
                        title="Cuộn lên đầu trang"
                        className='scroll-top btn btn--primary'
                    >
                        <i className="fa-solid fa-arrow-up"></i>
                    </div>
                }
            </>}
            {isLoading && <Loading />}
        </Provider>
    )
}

export default DefaultLayout