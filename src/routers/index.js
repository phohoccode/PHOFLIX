import Home from "../pages/Home"
import SaveMovie from "../pages/SaveMovie"
import RecenltyViewed from "../pages/RecenltyViewed"
import Search from "../pages/Search"
import LatestMovies from "../pages/LatestMovies"
import NotFound from "../pages/NotFound"
import Detail from "../pages/Detail"
import Watch from "../pages/Watch"
import Info from "../pages/Info"

const publicRoutes = [
    { path: '/PHOFLIX/', component: Home},
    { path: '/PHOFLIX/savemovie', component: SaveMovie},
    { path: '/PHOFLIX/lastestmovies', component: LatestMovies},
    { path: '/PHOFLIX/recenltyviewed', component: RecenltyViewed},
    { path: '/PHOFLIX/search/:keyword', component: Search},
    { path: '/PHOFLIX/detail/:describe/:slug', component: Detail},
    { path: '/PHOFLIX/info/:slug', component: Info},
    { path: '/PHOFLIX/watch/:slug', component: Watch},
    { path: '*', component: NotFound}
]
export default publicRoutes