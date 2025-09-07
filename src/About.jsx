import React, { useState } from "react";
import { Container, Row, Col, Card, Image, InputGroup, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faHome } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { faMapMarkerAlt, faPhone, faClock } from "@fortawesome/free-solid-svg-icons";
import { FaCheckCircle, FaUsers, FaGlobe, FaHandshake, FaLaptop, FaHome } from "react-icons/fa";
import axios from "axios";

function About() {
    // section No 5 
    //   Form API Integration 
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        // clear error if user types something
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: "" });
        }
    };

    // Validate fields before submit
    const validate = () => {
        let newErrors = {};
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.phone) newErrors.phone = "Phone number is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.subject) newErrors.subject = "Subject is required";
        if (!formData.message) newErrors.message = "Message is required";
        return newErrors;
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return; // stop submission
        }

        setLoading(true);
        try {
            const response = await axios.post(
                "https://bostangroupinc.com/api/qaQuestion/",
                formData
            );

            console.log("Response:", response.data);
            alert("Your question has been sent successfully!");
            setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
            setErrors({});
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Section 1  */}
            <section className="our-journey position-relative mb-5" style={{ background: "#F7F9FC" }}>
                {/* ✅ Top Banner */}
                <div
                    style={{
                        background: "linear-gradient(90deg, #B7FF90, #7ED957)",
                        minHeight: "110px",
                    }}
                    className="d-flex align-items-center"
                >
                    <h2 className="fw-bold mb-0 text-dark mt-5 ms-5">
                        OUR JOURNEY
                    </h2>
                </div>

                {/* ✅ Content */}
                <Container className="py-5">
                    <Row className="align-items-center gy-5">

                        {/* Left Side - Text + Stats */}
                        <Col lg={6}>
                            <p className="mb-4 text-muted" style={{ fontSize: "1.1rem", lineHeight: "1.9" }}>
                                <strong className="text-dark"><span style={{ cursor: "pointer" }}>Landdost.com –</span> Your Trusted Partner in Real Estate</strong>
                                <br /><br />
                                At Landdost.com, our journey began with a single, powerful vision — to
                                revolutionize Pakistan’s real estate landscape with trust, transparency,
                                and technology. We set out not just to connect buyers, sellers, investors,
                                and agents — but to become a true <em>dost</em> (friend) in every land-related journey.
                                <br /><br />
                                Today, Landdost.com is a dynamic property platform offering verified listings,
                                market insights, and real-time solutions across Pakistan. From residential plots
                                to commercial ventures, we simplify property dealings to make them smarter,
                                safer, and more transparent.
                                <br /><br />
                                <strong className="text-dark">Landdost.com is more than a marketplace —
                                    it’s a movement toward a more connected, informed, and accessible real estate future.</strong>
                            </p>

                            {/* ✅ Stats */}
                            <Row className="mt-4 g-4 text-center">
                                {[
                                    { number: "200+", text: "Happy Customers", icon: "bi-emoji-smile" },
                                    { number: "10k+", text: "Properties Listed", icon: "bi-buildings" },
                                    { number: "16+", text: "Years of Experience", icon: "bi-award" },
                                ].map((stat, i) => (
                                    <Col xs={12} sm={4} key={i}>
                                        <Card
                                            className="py-4 px-2 shadow-sm h-100 stat-card"
                                            style={{
                                                background: "#33A137",
                                                border: "1px solid #eee",
                                                borderRadius: "14px",
                                            }}
                                        >
                                            <i className={`bi ${stat.icon}`}></i>
                                            <h4 className="fw-bold text-light mb-1">{stat.number}</h4>
                                            <small className="text-light">{stat.text}</small>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Col>

                        {/* ✅ Right Side - Modern Images Grid */}
                        <Col lg={6} className="text-center">
                            <div className="shadow-sm rounded-3">
                                <img
                                    src="images/about4.jpg"
                                    alt="Journey"
                                    className="img-fluid rounded-4 w-75"
                                />
                            </div>
                        </Col>

                    </Row>
                </Container>
            </section>

            {/* section 2  */}
            <section className='about-us py-5'>
                <Container>
                    <Row className='align-items-center gy-5'>
                        {/* Image Column */}
                        <Col lg={6} md={12} className='text-center'>
                            <img
                                src='images/aboutus.jpg'
                                alt='About Bee Haven'
                                className='img-fluid rounded-4   w-md-75'
                            />
                        </Col>

                        {/* Text Column */}
                        <Col lg={6} md={12}>
                            <div>
                                <h2 className='fw-bold mb-3' style={{ color: '#2c3e50' }}>
                                    About Us
                                </h2>
                                <h6 className='mb-3'>
                                    Landdost.com – Making Real Estate Simple, Smart, and Secure </h6>
                                <p className='text-muted'>
                                    <span className='fw-bold text-dark' style={{ cursor: "pointer" }}> Landdost.com </span>is Pakistan’s trusted digital real estate platform, created to make property transactions easier, faster, and more transparent for everyone. Whether you’re looking to buy, sell, rent, or invest, we’re here to be your dost (friend) every step of the way.

                                    Our platform connects property seekers with verified listings, real estate agents, developers, and market insights — all in one place. From residential plots to commercial investments, we bring you reliable information and powerful tools to help you make smart real estate decisions.

                                    We are committed to:

                                    Transparency in every deal

                                    Technology-driven solutions for property seekers and sellers

                                    Expert support for better decision-making

                                    Accessibility to property listings across Pakistan


                                    At Landdost.com, we combine local knowledge with cutting-edge technology to create a real estate experience that is both personalized and professional. Our growing team of experts works tirelessly to keep you informed, empowered, and confident — no matter where you are in your property journey.

                                    Because with Landdost, it’s not just about land — it’s about trust, ease, and long-term partnerships.
                                    <span className='text-primary fw-bold' style={{ cursor: 'pointer' }}>Read More</span>
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* secton 3  */}
            <section className="why-us py-5" style={{ background: "#F7F9FC" }}>
                <Container>
                    {/* Section Heading */}
                    <div className="text-center mb-5">
                        <h6 className="text-success fw-semibold">Why Choose Us</h6>
                        <h2 className="fw-bold">Landdost.com – Your Trusted Real Estate Partner</h2>
                        <p className="text-muted w-75 mx-auto">
                            At Landdost.com, we go beyond being a property portal. We’re your real estate
                            partner — your <span className="fw-semibold">dost</span> in every land-related journey.
                        </p>
                    </div>

                    <Row className="align-items-center gy-5">
                        {/* Left Content */}
                        <Col lg={6} md={12}>
                            <div className="pe-lg-5">
                                <div className="d-flex mb-4">
                                    <FaHandshake size={28} className="text-success me-3" />
                                    <div>
                                        <h6 className="fw-bold text-dark mb-1">Trust & Transparency</h6>
                                        <p className="text-muted mb-0">
                                            Every listing is verified, every deal handled with integrity. We
                                            believe honesty builds stronger foundations than concrete.
                                        </p>
                                    </div>
                                </div>

                                <div className="d-flex mb-4">
                                    <FaLaptop size={28} className="text-success me-3" />
                                    <div>
                                        <h6 className="fw-bold text-dark mb-1">Tech-Driven Simplicity</h6>
                                        <p className="text-muted mb-0">
                                            Smart filters, real-time updates, and location-based searches
                                            make property hunting fast and stress-free.
                                        </p>
                                    </div>
                                </div>

                                <div className="d-flex mb-4">
                                    <FaUsers size={28} className="text-success me-3" />
                                    <div>
                                        <h6 className="fw-bold text-dark mb-1">Expert Guidance</h6>
                                        <p className="text-muted mb-0">
                                            From first-time buyers to seasoned investors, our experts are here
                                            to guide you with market insights and personalized support.
                                        </p>
                                    </div>
                                </div>

                                <div className="d-flex mb-4">
                                    <FaGlobe size={28} className="text-success me-3" />
                                    <div>
                                        <h6 className="fw-bold text-dark mb-1">Nationwide Reach</h6>
                                        <p className="text-muted mb-0">
                                            Explore listings across Pakistan, from major cities to emerging
                                            markets — all under one roof.
                                        </p>
                                    </div>
                                </div>

                                <div className="d-flex mb-4">
                                    <FaHome size={28} className="text-success me-3" />
                                    <div>
                                        <h6 className="fw-bold text-dark mb-1">All-in-One Solution</h6>
                                        <p className="text-muted mb-0">
                                            Buy, sell, rent, or invest — manage all your property needs
                                            seamlessly on a single platform.
                                        </p>
                                    </div>
                                </div>

                                <div className="d-flex">
                                    <FaCheckCircle size={28} className="text-success me-3" />
                                    <div>
                                        <h6 className="fw-bold text-dark mb-1">Customer-Centric Approach</h6>
                                        <p className="text-muted mb-0">
                                            Your satisfaction is our success. We ensure a smooth, secure, and
                                            trustworthy property experience.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        {/* Right Image */}
                        <Col lg={6} md={12} className="text-center">
                            <Image
                                src="images/whyus1.png"
                                alt="Why choose us"
                                className="img-fluid rounded"
                            />
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* section 5  */}
            <section className="py-5" style={{ backgroundColor: "#d9fdd3", minHeight: "100vh", padding: "50px 0" }}>
                <Container>
                    <Row className="align-items-center">
                        {/* Left Side */}
                        <Col md={6} className="mb-4">
                            <h2 className="fw-bold mb-3">Let's Talk About Everything!</h2>
                            <p>
                                Hello there! If you'd like to ask us something, you can get in touch
                                with us here! We'd love to address any and all concerns you may have.
                            </p>

                            <div className="mt-4">
                                <h5 className="fw-bold">Head Office</h5>
                                <ul className="list-unstyled mt-3">
                                    <li className="mb-2">
                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2 text-success" />
                                        7th Floor, Dolmen Executive Tower Karachi Pakistan
                                    </li>
                                    <li className="mb-2">
                                        <FontAwesomeIcon icon={faPhone} className="me-2 text-success" />
                                        0900 Landdost (84533)
                                    </li>
                                    <li>
                                        <FontAwesomeIcon icon={faClock} className="me-2 text-success" />
                                        Monday to Saturday (9AM to 6PM)
                                    </li>
                                </ul>
                            </div>
                        </Col>

                        {/* Right Side */}
                        <Col md={6}>
                            <Card className="p-4 shadow-sm border-0">
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Your Name *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="How should we address you?"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            isInvalid={!!errors.name}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.name}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Phone Number *</Form.Label>
                                        <div className="d-flex w-100">
                                            <span className="input-group-text bg-light">🇵🇰 +92</span>
                                            <Form.Control
                                                type="tel"
                                                placeholder="Please enter a valid phone number"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                isInvalid={!!errors.phone}
                                            />
                                        </div>
                                        {errors.phone && (
                                            <div className="invalid-feedback d-block">{errors.phone}</div>
                                        )}
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Email Address *</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Your best email address?"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            isInvalid={!!errors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Subject *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="General Inquiry"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            isInvalid={!!errors.subject}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.subject}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Your Message *</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            placeholder="What would you like to say?"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            isInvalid={!!errors.message}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Button
                                        variant=""
                                        type="submit"
                                        className="w-100 fw-bold text-light"
                                        style={{ background: "#00A651" }}
                                        disabled={loading}
                                    >
                                        {loading ? "Sending..." : "Send Your Question"}
                                    </Button>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* section 6  */}
            <section className="agent py-5" style={{ background: "#62B563" }}>
                <Container>
                    <Row className="align-items-center gy-4">
                        {/* Image Column */}
                        <Col lg={5} md={12}>
                            <img
                                src="images/agent.png"
                                alt="Visa"
                                className="img-fluid w-100"
                            />
                        </Col>

                        {/* Text Column */}
                        <Col lg={4} md={12}>
                            <div>
                                <h4 className="fw-bold">Become a Agent.</h4>
                                <p className="mb-0 text-muted">
                                    Join Landdost and grow your real estate career with trust, tools, and top listings.
                                </p>
                            </div>
                        </Col>

                        {/* Button Column */}
                        <Col lg={3} md={12} className="text-md-start">
                            <div>
                                <Link to="/Contact">
                                    <button className="btn bg-white rounded-pill py-2 px-4">
                                        Register Now
                                    </button>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* newletter  */}
            <section className="newsletter py-5" style={{ backgroundColor: "#1F1F1F", color: "#BDBDBD" }}>
                <Container>
                    <Row className="align-items-center text-center text-md-start gy-4">
                        {/* Social Media Icons */}
                        <Col lg={4} md={6}>
                            <p className="fw-semibold mb-2">Follow Us on</p>
                            <div className="d-flex justify-content-center justify-content-md-start gap-3">
                                <FontAwesomeIcon
                                    icon={faLinkedinIn}
                                    className="cursor-pointer bg-light rounded-pill p-1 text-success"
                                />
                                <FontAwesomeIcon
                                    icon={faFacebookF}
                                    className="cursor-pointer bg-light rounded-pill p-1 text-success"
                                />
                                <FontAwesomeIcon
                                    icon={faInstagram}
                                    className="cursor-pointer bg-light rounded-pill p-1 text-success"
                                />
                            </div>
                        </Col>

                        {/* Company Name */}
                        <Col lg={4} md={6}>
                            <div className="d-flex justify-content-center justify-content-md-start gap-3">
                                <FontAwesomeIcon
                                    icon={faHome}
                                    className="bg-light p-2 bg-light rounded-pill p-1 text-success"
                                />
                                <h5 className="mb-0">www.landdost.com</h5>

                            </div>
                        </Col>

                        {/* Newsletter */}
                        <Col lg={4} md={12}>
                            <h6 className="mb-2 text-center text-md-start">
                                Subscribe to our<br></br> Newsletter!
                            </h6>
                            <InputGroup>
                                <Form.Control type="email" placeholder="Email Address" />
                                <Button
                                    variant=""
                                    style={{ background: "#62B563", color: "white" }}
                                >
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </Button>
                            </InputGroup>
                        </Col>
                    </Row>
                </Container>
                <hr className="mt-5"></hr>
            </section>
        </>
    )
}
export default About
