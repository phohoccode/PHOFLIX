import Movies from "../../components/Layout/components/Movies";

function PhimBo() {
    return ( 
        <Movies api="https://phimapi.com/v1/api/danh-sach/phim-bo"/>
     );
}

export default PhimBo;