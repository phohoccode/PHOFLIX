import { createContext, useState } from "react";

const Context = createContext()

function Provider({ children }) {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false)

    const handleToggleBar = () => {
        setIsSideBarOpen(!isSideBarOpen);
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

export { Provider, Context }