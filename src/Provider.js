import { useState } from "react"
import Context from "./Context"

function Provider({ children }) {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false)

    const handleToggleBar = () => {
        setIsSideBarOpen(!isSideBarOpen)
    }

    const value = {
        handleToggleBar,
        isSideBarOpen
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export default Provider