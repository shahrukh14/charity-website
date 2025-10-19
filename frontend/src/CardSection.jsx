import React from "react";
import "./index.css";
// import sampleImg from "./assets/donation-person.jpg"; 
import { Link } from "react-router-dom";


const CardSection = () => {
    const image1 = "https://img.freepik.com/free-vector/flat-rath-yatra-celebration-illustration_23-2148969761.jpg?ga=GA1.1.481231774.1749314798&semt=ais_items_boosted&w=740";
    const image2 = "https://img.freepik.com/free-vector/gradient-rath-yatra-celebration-illustration_23-2148971453.jpg?ga=GA1.1.481231774.1749314798&semt=ais_items_boosted&w=740";
    const image3 = "https://img.freepik.com/premium-vector/ratha-yatra-lord-jagannath-balabhadra-subhadra-chariot_156779-336.jpg?ga=GA1.1.481231774.1749314798&semt=ais_items_boosted&w=740";


    const cards = [
        {
            id: 1,
            name: "Ravi Kumar",
            cause: "Needs help for kidney transplant",
            image: image1,
        },
        {
            id: 2,
            name: "Anjali Singh",
            cause: "Raising funds for cancer treatment",
            image: image2,
        },
        {
            id: 3,
            name: "Mohammed Faizan",
            cause: "Education support for orphaned child",
            image: image3,
        },
    ];

    return (
        <section className="py-5 bg-light">
            <div className="container">
                <h2 className="text-center mb-4">People Who Need Your Help</h2>
                <div className="row">
                    {cards.map((card) => (
                        <div className="col-md-4 mb-4" key={card.id}>
                            <div className="card donation-card h-100">
                                <img
                                    src={card.image}
                                    className="card-img-top"
                                    alt={card.name}
                                    style={{ height: "220px", objectFit: "cover" }}
                                />
                                <div className="card-body d-flex flex-column justify-content-between">
                                    <h5 className="card-title">{card.name}</h5>
                                    <p className="card-text">{card.cause}</p>
                                    <Link to={`/donate/${card.id}`} className="btn btn-primary mt-auto w-100">Donate Now </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CardSection;
