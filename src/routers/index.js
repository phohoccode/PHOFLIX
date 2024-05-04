import Home from "../pages/Home"
import Country from "../pages/Country"
import Category from "../pages/Category"
import PhimLe from "../pages/PhimLe"
import PhimBo from "../pages/PhimBo"
import HoatHinh from "../pages/HoatHinh"
import TvShows from "../pages/TvShows"
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
    { path: '/PHOFLIX/phimle', component: PhimLe},
    { path: '/PHOFLIX/phimbo', component: PhimBo},
    { path: '/PHOFLIX/hoathinh', component: HoatHinh},
    { path: '/PHOFLIX/tvshows', component: TvShows},
    { path: '/PHOFLIX/category/:slug', component: Category},
    { path: '/PHOFLIX/country/:slug', component: Country},
    { path: '/PHOFLIX/savemovie', component: SaveMovie},
    { path: '/PHOFLIX/lastestmovies', component: LatestMovies},
    { path: '/PHOFLIX/recenltyviewed', component: RecenltyViewed},
    { path: '/PHOFLIX/search/:slug', component: Search},
    { path: '/PHOFLIX/detail/:list/:slug', component: Detail},
    { path: '/PHOFLIX/info/:slug', component: Info},
    { path: '/PHOFLIX/watch/:slug', component: Watch},
    { path: '*', component: NotFound}
]
export default publicRoutes