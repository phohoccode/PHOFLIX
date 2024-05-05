import PhimLe from "../PhimLe"
import PhimBo from "../PhimBo"
import HoatHinh from "../HoatHinh"
import TvShows from "../TvShows"
import PhimMoiCapNhat from "../PhimMoiCapNhat"

function Home() {
    return (
        <>
            <PhimMoiCapNhat/>
            <PhimLe />
            <PhimBo />
            <HoatHinh />
            <TvShows />
        </>
    );
}

export default Home;