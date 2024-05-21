import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function useFetch(url) {
    const [data, setData] = useState(null)

    useEffect(() => {
        fetch(url)
            .then(response => {
                if(!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then(data => setData(data))
            .catch(error => {
                console.error(error)
                toast.error(`Đã xảy ra lỗi trong quá trình tải phim!`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                    });
            })
    }, [url])
    
    return [data]
}

export default useFetch
