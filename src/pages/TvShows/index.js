import Movies from "../../components/Layout/components/Movies";

function TvShows() {
    return ( 
        <Movies api="https://phimapi.com/v1/api/danh-sach/tv-shows?page=1"/>
     );
}

export default TvShows;