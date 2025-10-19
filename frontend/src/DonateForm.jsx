 import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import Loader from "./Loader";

const DonateForm = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        event_id: id,
        name: "",
        email: "",
        mobile: "",
        pan: "",
        amount: "",
        address: "",
        pan_image: null
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Full Name is required";

        if (!formData.mobile.trim()) {
            newErrors.mobile = "Mobile Number is required";
        } else if (!/^\d{10}$/.test(formData.mobile.trim())) {
            newErrors.mobile = "Mobile Number must be 10 digits";
        }

        if (!formData.pan.trim()) {
            newErrors.pan = "PAN Card Number is required";
        } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan.trim())) {
            newErrors.pan = "Invalid PAN Card format";
        }

        if (!formData.email.trim()) newErrors.email = "Email is required";

        if (!formData.amount) {
            newErrors.amount = "Amount is required";
        } else if (parseInt(formData.amount) < 100) {
            newErrors.amount = "Minimum amount is ₹100";
        }

        if (!formData.pan_image) {
            newErrors.pan_image = "PAN Card image is required";
        }

        return newErrors;
    };

    const BASE_URL = window.location.hostname === 'localhost' ? 'http://127.0.0.1:8000/api' : 'https://api.mamatacarefoundation.com/api';

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        if (name === "pan") {
            newValue = value.toUpperCase();
        }

        setFormData({ ...formData, [name]: newValue });
        setErrors({ ...errors, [name]: "" });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, pan_image: file });
            setImagePreview(URL.createObjectURL(file));
            setErrors({ ...errors, pan_image: "" });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        try {
            const data = new FormData();
            for (const key in formData) {
                data.append(key, formData[key]);
            }

            const response = await axios.post(`${BASE_URL}/donate`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            const { order_id, razorpay_key, amount, donation_id } = response.data;

            const options = {
                key: razorpay_key,
                amount: amount,
                currency: "INR",
                name: "Mamata Care Foundation",
                description: "Donation Transaction",
                order_id: order_id,
                handler: async function (response) {
                    try {
                        await axios.post(`${BASE_URL}/payment/verify`, {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            donation_id: donation_id
                        });

                        navigate("/thank-you", {
                            state: { donorId: donation_id }
                        });
                    } catch (err) {
                        console.error("Payment verification failed", err);
                        window.location.href = "/sorry";
                        navigate("/sorry", {
                            state: true
                        });
                    }
                },
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.mobile
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (err) {
            console.error("Donation submission failed", err);
        } finally {
            console.log("Donation submission successfull");
        }
    };

    return (
        <>
            {loading && <Loader />}
            <Navbar />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow">
                            <div className="card-body">
                                <h3 className="mb-4 text-center">Donate to Cause #{id}</h3>
                                <form onSubmit={handleSubmit} className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label" htmlFor="name">Full Name</label>
                                        <input type="text" name="name" className={`form-control ${errors.name && 'is-invalid'}`} id="name" onChange={handleChange} value={formData.name} autoComplete="off" />
                                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label" htmlFor="mobile">Mobile Number</label>
                                        <input type="number" name="mobile" className={`form-control ${errors.mobile && 'is-invalid'}`} id="mobile" onChange={handleChange} value={formData.mobile} autoComplete="off" />
                                        {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label" htmlFor="email">Email</label>
                                        <input type="email" name="email" className={`form-control ${errors.email && 'is-invalid'}`} id="email" onChange={handleChange} value={formData.email} autoComplete="off" />
                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label" htmlFor="amount">Amount (INR)</label>
                                        <input type="number" name="amount" className={`form-control ${errors.amount && 'is-invalid'}`} id="amount" onChange={handleChange} value={formData.amount} autoComplete="off" />
                                        {errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">PAN Card Number</label>
                                        <input type="text" name="pan" className={`form-control ${errors.pan && 'is-invalid'}`} onChange={handleChange} value={formData.pan} autoComplete="off" />
                                        {errors.pan && <div className="invalid-feedback">{errors.pan}</div>}
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Upload PAN Card Image</label>
                                        <input type="file" accept="image/*" className={`form-control ${errors.pan_image && 'is-invalid'}`} onChange={handleFileChange} />
                                        {errors.pan_image && <div className="invalid-feedback">{errors.pan_image}</div>}
                                        {imagePreview && (
                                            <div className="mt-2">
                                                <img src={imagePreview} alt="PAN Preview" className="img-thumbnail" style={{ maxWidth: "200px" }} />
                                            </div>
                                        )}
                                    </div>

                                    <div className="col-md-12 mb-3">
                                        <label className="form-label" htmlFor="address">Address</label>
                                        <textarea name="address" id="address" rows="2" className="form-control" onChange={handleChange} autoComplete="off"></textarea>
                                    </div>

                                    <button type="submit" className="btn btn-primary w-100">Proceed to Pay</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default DonateForm;