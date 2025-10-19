import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Container } from "react-bootstrap";

const About = () => {
    return (
        <>
            <Navbar />
            <div className="bg-light py-5">
                <Container>
                    <h1 className="mb-4 text-primary">About Mamata Care Foundation</h1>
                    <p className="fs-5">
                        Mamata Care Foundation is a non-profit organization committed to making a real difference in the lives of the underprivileged. 
                        Founded with the vision of spreading compassion and support, we strive to help individuals and families facing extreme hardships.
                    </p>

                    <h3 className="mt-5 text-secondary">Our Mission</h3>
                    <p>
                        To empower the underserved communities by providing financial aid, education, healthcare, and emergency assistance through transparent and impactful donations.
                    </p>

                    <h3 className="mt-4 text-secondary">Our Values</h3>
                    <ul>
                        <li>Transparency and accountability</li>
                        <li>Empathy and inclusivity</li>
                        <li>Empowerment through action</li>
                        <li>Community-driven support</li>
                    </ul>

                    <h3 className="mt-4 text-secondary">Join Our Movement</h3>
                    <p>
                        Whether you want to donate, volunteer, or collaborate — we welcome every hand that wants to make the world a better place.
                        Together, we can bring hope, healing, and happiness to those who need it the most.
                    </p>
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default About;
