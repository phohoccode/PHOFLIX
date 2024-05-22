import { toast } from "react-toastify"

export function showSuccessMessage(text, time = 1000) {
    toast.success(text, {
        position: "top-right",
        autoClose: time,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    })
}

export function showInfoMessage(text, time = 1000) {
    toast.info(text, {
        position: "top-right",
        autoClose: time,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    })
}

export function showErrorMessage(text, time = 1000) {
    toast.error(text, {
        position: "top-right",
        autoClose: time,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    })
    setTimeout(() => {
        window.location.href = '/'
    }, 4000)
}
