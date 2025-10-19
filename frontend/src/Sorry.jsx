import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const Sorry = () => {
    const location = useLocation();
    const navigate = useNavigate()

    useEffect( () => {
        if (!location.state) {
            navigate("/");
        }
    }, [location.state, navigate]);

    return (
        <>
            <Navbar />
            <div className="bg-light py-5 text-center">
                <Container>
                    <h1 className="display-4 text-danger">Oops! Something Went Wrong</h1>
                    <p className="lead mt-4">
                        We’re sorry, but we couldn’t complete your donation.
                    </p>
                    <p className="fs-5">
                        There was an issue processing your payment. <br />
                        Please try again later or contact us if the problem persists.
                    </p>
                    <p className="mt-4">Your generosity matters — thank you for your intention 💔</p>
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default Sorry;
