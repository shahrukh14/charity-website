import React from "react";

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-4 mt-5">
            <div className="container">
                <div className="row">
                    {/* Foundation Info */}
                    <div className="col-md-6 mb-3">
                        <h5>Mamata Care Foundation</h5>
                        <p>Helping hands for those in need</p>
                        <p>Email: mamatafoundation@gmail.com</p>
                        <p>Phone: +91 63334 44342</p>
                    </div>

                    {/* Useful Links */}
                    <div className="col-md-3 mb-3">
                        <h6>Quick Links</h6>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-white text-decoration-none">Home</a></li>
                            <li><a href="#" className="text-white text-decoration-none">Donate</a></li>
                            <li><a href="#" className="text-white text-decoration-none">About Us</a></li>
                            <li><a href="#" className="text-white text-decoration-none">Contact</a></li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div className="col-md-3">
                        <h6>Follow Us</h6>
                        <ul className="list-unstyled gap-3">
                            <li><a href="#" className="text-white text-decoration-none"><i className="fab fa-facebook-f me-2"></i>Facebook</a></li>
                            <li><a href="#" className="text-white text-decoration-none"><i className="fab fa-twitter me-2"></i>Twitter</a></li>
                            <li><a href="#" className="text-white text-decoration-none"><i className="fab fa-instagram me-2"></i>Instagram</a></li>
                        </ul>
                    </div>
                </div>
                <hr className="bg-light" />
                <p className="text-center mb-0">&copy; 2025 Mamata Care Foundation. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
