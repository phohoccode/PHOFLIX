import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DefaultLayout from './components/Layout/DefaultLayout'
import publicRoutes from './routers'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
    return (
        <Router>
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Layout = DefaultLayout
                    const Page = route.component
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                    <ToastContainer/>
                                </Layout>
                            }
                        />
                    )
                })}
            </Routes>
        </Router>
    )
}

export default App
