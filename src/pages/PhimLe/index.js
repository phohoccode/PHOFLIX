import Movies from "../../components/Layout/components/Movies";

function PhimLe() {
    return ( 
        <Movies api="https://phimapi.com/v1/api/danh-sach/phim-le?page=1"/>
     );
}

export default PhimLe;