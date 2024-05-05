import Slides from "../../components/Layout/components/Slides";

function PhimMoiCapNhat() {
    return ( 
        <Slides api={'https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=1'}/>
    );
}

export default PhimMoiCapNhat;