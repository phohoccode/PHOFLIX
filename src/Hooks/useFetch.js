import { useState, useEffect } from 'react'

function useFetch(url) {
    const [data, setData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url)
                const result = await response.json()
                setData(result)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [url])
    return data
}

export default useFetch
