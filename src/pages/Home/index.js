import DefaultLayout from "../../components/Layout/DefaultLayout";
import PhimLe from "../PhimLe"
import PhimBo from "../PhimBo"
import HoatHinh from "../HoatHinh"
import TvShows from "../TvShows"

function Home() {
    return (
        <>
            <PhimLe />
            <PhimBo />
            <HoatHinh />
            <TvShows />
        </>
    );
}

export default Home;