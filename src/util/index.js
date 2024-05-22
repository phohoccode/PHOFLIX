export default {
    get(key, type) {
        return JSON.parse(localStorage.getItem(key)) || type
    },
    set(key, data) {
        return localStorage.setItem(key, JSON.stringify(data))
    }
}

export function formatTime(time) {
    const currentTime = new Date()
    const storageTime = new Date(time)
    const diff = Math.floor((currentTime - storageTime) / 1000) 

    if (diff < 60) {
        return `Vừa xong`
    } else if (diff < 3600) {
        return `${Math.floor(diff / 60)} phút trước`
    } else if (diff < 86400) {
        return `${Math.floor(diff / 3600)} giờ trước`
    } else {
        const day = storageTime.getDate()
        const month = storageTime.getMonth() + 1
        const year = storageTime.getFullYear()
        return `${day}/${month}/${year}`
    }
}


