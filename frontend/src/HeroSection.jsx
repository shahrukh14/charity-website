import React from "react";
import './index.css'

const HeroSection = () => {
    return (
        <section className="hero-section text-white d-flex">
            <div className="container text-center" style={{ marginTop:'130px' }}>
                <h1 className="display-4 fw-bold text-dark">Give a Hand to Those in Need</h1>
                <p className="lead text-dark fw-bolder">
                    Your small donation can bring a big smile. Help someone today by contributing to their cause.
                </p>
            </div>
        </section>
    );
};

export default HeroSection;
