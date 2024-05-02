import Header from "../components/Header";
import SideBar from "../components/SideBar";

function DefaultLayout({children}) {
    return ( 
        <>
            <Header/>
            <div className="container">
                <SideBar/>
                <div className="content">
                    {children}
                </div>
            </div>
        </>
    );
}

export default DefaultLayout;