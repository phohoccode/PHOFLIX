import Home from "../pages/Home"
import SaveMovie from "../pages/SaveMovie"
import RecenltyViewed from "../pages/RecenltyViewed"
import Search from "../pages/Search"
import NotFound from "../pages/NotFound"
import Detail from "../pages/Detail"
import Watch from "../pages/Watch"
import Info from "../pages/Info"

const publicRoutes = [
    { path: '/', component: Home},
    { path: '/savemovie', component: SaveMovie},
    { path: '/recenltyviewed', component: RecenltyViewed},
    { path: '/search/:keyword', component: Search},
    { path: '/search/', component: Search},
    { path: '/detail/:describe/:slug', component: Detail},
    { path: '/info/:slug', component: Info},
    { path: '/watch/:slug', component: Watch},
    { path: '*', component: NotFound}
]
export default publicRoutes