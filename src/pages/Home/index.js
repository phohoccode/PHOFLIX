import { useEffect, useState } from "react"
import Slides from "../../components/Layout/components/Slides"
import Movies from "../../components/Layout/components/Movies"

function Home() {

    useEffect(() => {
        document.title = 'Chào mừng đến với PHOFLIX!'
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    return (
        <>
            <Slides api={'https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=1'} />
            <Movies api="https://phimapi.com/v1/api/danh-sach/phim-le?page=1" />
            <Movies api="https://phimapi.com/v1/api/danh-sach/phim-bo?page=1" />
            <Movies api="https://phimapi.com/v1/api/danh-sach/hoat-hinh?page=1" />
            <Movies api="https://phimapi.com/v1/api/danh-sach/tv-shows?page=1" />
        </>
    )
}

export default Home