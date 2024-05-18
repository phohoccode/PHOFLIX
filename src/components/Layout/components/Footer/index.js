import { useState } from 'react'
import clsx from 'clsx'
import styles from './Footer.module.scss'

function Footer() {
    const [valueSubmid, setValueSubmit] = useState('')

    const handleSubmit = (e) => {
        if (valueSubmid === '') {
            alert('Chưa nhập lời nhắn!')
        }
        e.preventDefault()
        const subject = encodeURIComponent('Xin chào tôi đến từ PHOFLIX!')
        const body = encodeURIComponent(valueSubmid)
        window.location.href = `mailto:qviet092@gmail.com?subject=${subject}&body=${body}`
    }

    return (
        <footer>
            <div className={styles.footer__row}>
                <div className={styles.footer__column}>
                    <h3>Về chúng tôi</h3>
                    <p>PHOFLIX - Được thực hiện bởi Nhan Quốc Việt, là sinh viên Công nghệ thông tin tại trường Đại học Sư phạm Kỹ thuật Vĩnh Long. Trang web đem đến trải nghiệm xem phim mượt mà, không quảng cáo làm phiền. Tận hưởng bộ sưu tập phong phú từ mọi thể loại, không giới hạn, không gò bó. Chỉ cần tập trung vào việc thưởng thức và khám phá, PHOFLIX sẽ lo phần còn lại.</p>
                </div>
                <div className={styles.footer__column}>
                    <h3>Mạng xã hội</h3>
                    <ul>
                        <li>
                            <a title='PHOFLIX trên Facebook' href="https://www.facebook.com/PHODEV.2004/" target="_blank">
                                <i className="fa-brands fa-square-facebook"></i>
                                <span>Facebook</span>
                            </a>

                        </li>
                        <li>
                            <a title='PHOFLIX trên Instagram' href="https://www.instagram.com/phodziet.04/" target="_blank">
                                <i className="fa-brands fa-square-instagram"></i>
                                <span>Instagram</span>
                            </a>
                        </li>
                        <li>
                            <a title='PHOFLIX trên Github' href="https://github.com/phohoccode/" target="_blank">
                                <i className="fa-brands fa-square-github"></i>
                                <span>Github</span>
                            </a>
                        </li>
                        <li>
                            <a title='PHOFLIX trên Tiktok' href="https://www.tiktok.com/@phohoccode.04/" target="_blank">
                                <i className="fa-brands fa-tiktok"></i>
                                <span>Tiktok</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className={styles.footer__column}>
                    <h3>Nguồn phim kkphim.com</h3>
                    <p>
                        Tất cả nội dung của trang web này đều được tìm kiếm và thu thập ở các trang web phát video trực tuyến chính thống trên Internet, cũng như không cung cấp phát trực tuyến chính hãng.
                        Nếu quyền lợi của bạn bị vi phạm, hãy liên hệ với chúng tôi. Chúng tôi sẽ xử lý và xóa các nội dung liên quan đó kịp thời. Xin cảm ơn!
                    </p>
                </div>
                <div className={styles.footer__column}>
                    <h3>Gửi phản hồi</h3>
                    <form className={styles.footer__form}>
                        <label>
                            <i className="fa-regular fa-message"></i>
                            Lời nhắn
                        </label>
                        <textarea
                            value={valueSubmid}
                            onChange={(e) => setValueSubmit(e.target.value)}
                            placeholder='Hãy phản hồi một cách văn minh và lịch sự!'>
                        </textarea>

                        <button
                            onClick={(e) => handleSubmit(e)}
                            className={clsx('btn', 'btn--primary')}
                        >
                            Gửi
                        </button>
                    </form>
                </div>
            </div>
            <div className={styles.footer__row}>
                <p className={styles.footer__copyright}>© 2024 - PHOFLIX. Web xem phim chất lượng hàng đầu Việt Nam</p>
            </div>
        </footer>
    );
}

export default Footer;