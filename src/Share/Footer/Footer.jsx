import React from 'react';

function Footer(props) {
    return (
        <footer className="bg-dark text-white">
            <div className="container py-4">
                <div className="row py-5">
                    <div className="col-md-4 mb-3 mb-md-0">
                        <h6 className="text-uppercase mb-3">Dịch vụ khách hàng</h6>
                        <ul className="list-unstyled mb-0">
                            <li><a className="footer-link" href="#">Trợ giúp &amp; Liên hệ với chúng tôi</a></li>
                            <li><a className="footer-link" href="#">Trả lại &amp; Hoàn tiền</a></li>
                            <li><a className="footer-link" href="#">Cửa hàng trực tuyến</a></li>
                            <li><a className="footer-link" href="#">Điều khoản &amp; điều kiện</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4 mb-3 mb-md-0">
                        <h6 className="text-uppercase mb-3">Công ty</h6>
                        <ul className="list-unstyled mb-0">
                            <li><a className="footer-link" href="#">Chúng tôi làm gì</a></li>
                            <li><a className="footer-link" href="#">Dịch vụ có sẵn</a></li>
                            <li><a className="footer-link" href="#">Bài viết mới nhất</a></li>
                            <li><a className="footer-link" href="#">Câu hỏi thường gặp</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h6 className="text-uppercase mb-3">Truyền thông xã hội</h6>
                        <ul className="list-unstyled mb-0">
                            <li><a className="footer-link" href="#">Twitter</a></li>
                            <li><a className="footer-link" href="#">Instagram</a></li>
                            <li><a className="footer-link" href="#">Tumblr</a></li>
                            <li><a className="footer-link" href="#">Pinterest</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-top pt-4" style={{ borderColor: '#1d1d1d !important' }}>
                    <div className="row">
                        <div className="col-lg-6">
                            <p className="small text-muted mb-0">&copy; 2023 All rights reserved.</p>
                        </div>
                        <div className="col-lg-6 text-lg-right">
                            <p className="small text-muted mb-0">Template designed by <a className="text-white reset-anchor" href="#">Phuong Thao</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;