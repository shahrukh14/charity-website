import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Container, Form, Button } from "react-bootstrap";

const Contact = () => {
    return (
        <>
            <Navbar />
            <div className="bg-light py-5">
                <Container>
                    <h1 className="mb-4 text-primary">Contact Us</h1>
                    <p className="mb-5 fs-5">
                        We'd love to hear from you! Whether you have questions, suggestions, or would like to partner with us — feel free to reach out.
                    </p>

                    <hr className="my-5" />

                    <h5 className="text-secondary">Mamata Care Foundation</h5>
                    <p className="mb-1">📞 +91 22233 34444</p>
                    <p className="mb-1">📧 contact@mamatafoundation.org</p>
                    <p>🏠 L-108 BHB Colony, Baramunda, Bhubaneswar,Odisha, India</p>
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default Contact;
