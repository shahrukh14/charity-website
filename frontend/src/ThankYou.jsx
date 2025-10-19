import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const ThankYou = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const donorId = location.state?.donorId;
    const BASE_URL = window.location.hostname === 'localhost' ? 'http://127.0.0.1:8000/api' : 'https://api.mamatacarefoundation.com/api';

    useEffect(() => {
        if (!donorId) {
        // Prevent direct access
            navigate("/");
        }
    }, [donorId, navigate]);

    const handleDownload = () => {
        window.open(`${BASE_URL}/certificate/download/${donorId}`, '_blank');
    };

    return (
        <>
            <Navbar />
            <div className="bg-light py-5 text-center">
                <Container>
                    <h1 className="display-4 text-success">Thank You for Your Kindness!</h1>
                    <p className="lead mt-4">
                        Your donation has been received successfully.
                    </p>
                    <p className="fs-5">
                        Your support means the world to someone in need. <br />
                        You've not just donated money, you've spread hope and compassion. 💚
                    </p>
                    <p className="mt-4">We’ve sent you a confirmation email for your records.</p>
                    <button className="btn btn-outline-success mt-2" onClick={handleDownload}>
                        Download Donation Certificate
                    </button>
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default ThankYou;
