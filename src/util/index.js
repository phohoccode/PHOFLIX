export default {
    get(key, type) {
        return JSON.parse(localStorage.getItem(key)) || type
    },
    set(key, data) {
        return localStorage.setItem(key, JSON.stringify(data))
    }
}

export function formatTime(time) {
    const diff = Math.floor((new Date() - new Date(time)) / 1000)
    if (diff < 60) {
        return `Vừa xong`
    } else if (diff < 3600) {
        return `${Math.floor(diff / 60)} phút trước`
    } else if (diff < 86400) {
        return `${Math.floor(diff / 3600)} giờ trước`
    } else {
        const day = time.getDate()
        const month = time.getMonth() + 1
        const year = time.getFullYear()
        return `${day}/${month}/${year}`
    }

}