import Movies from "../../components/Layout/components/Movies";

function HoatHinh() {
    return ( 
        <Movies api="https://phimapi.com/v1/api/danh-sach/hoat-hinh?page=1"/>
     );
}

export default HoatHinh;