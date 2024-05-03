import { useState, useEffect } from 'react'

function useFetch(urls) {
    const [data, setData] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responses = await Promise.all(
                    urls.map(url => fetch(url))
                )
                const data = await Promise.all(
                    responses.map(response => response.json())
                )
                setData(data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])
    return data
}

export default useFetch
