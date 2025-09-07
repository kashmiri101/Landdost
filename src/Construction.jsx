import React from "react";
import { Container, Row, Col, Card, Button, Accordion, InputGroup, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faHome } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faMapMarkerAlt, faPhone, faClock } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Construction = () => {

    // section 2 
    const data = [
        {
            title: "3 Marla Construction Cost",
            subtitle: "Double Story",
            size: "1,215 Sq. ft.",
            link: "#"
        },
        {
            title: "4 Marla Construction Cost",
            subtitle: "Double Story",
            size: "1,620 Sq. ft.",
            link: "#"
        },
        {
            title: "5 Marla Construction Cost",
            subtitle: "Double Story",
            size: "2,025 Sq. ft.",
            link: "#"
        },
        {
            title: "6 Marla Construction Cost",
            subtitle: "Double Story",
            size: "2,295 Sq. ft.",
            link: "#"
        },
        {
            title: "7 Marla Construction Cost",
            subtitle: "Double Story",
            size: "2,675 Sq. ft.",
            link: "#"
        },
        {
            title: "7 Marla Construction Cost",
            subtitle: "Double Story",
            size: "2,675 Sq. ft.",
            link: "#"
        },
        {
            title: "7 Marla Construction Cost",
            subtitle: "Double Story",
            size: "2,675 Sq. ft.",
            link: "#"
        },
        {
            title: "7 Marla Construction Cost",
            subtitle: "Double Story",
            size: "2,675 Sq. ft.",
            link: "#"
        },
    ];

    // section 3 
    const tips = [
        {
            icon: "/images/c1.png",
            title: "Labour Quality",
            desc: "High quality & trained labor should be assigned"
        },
        {
            icon: "/images/c2.png",
            title: "Foundation Quality",
            desc: "No compromise on foundation quality."
        },
        {
            icon: "/images/c3.png",
            title: "Building Material",
            desc: "Building material should be Premium Plus grade."
        },
        {
            icon: "/images/c4.png",
            title: "Construction Mode",
            desc: "Sourcing material yourself or outsourcing everything to a contractor."
        },
        {
            icon: "/images/c5.png",
            title: "Cost Calculator",
            desc: "Get quick cost estimate using our calculator"
        },
    ];


    return (
        <>
            {/* section 1 */}
            <section className="Construction mb-5">
                <div
                    style={{
                        background: "linear-gradient(180deg, #B6FE8F, #EAEEFF)",

                    }}
                >
                    {/* Top Section */}
                    <Container className="text-center">
                        <h2 className="fw-bold py-5">Construction Cost Calculator</h2>
                        <p
                            className="text-muted"
                            style={{ maxWidth: "650px", margin: "0 auto" }}
                        >
                            Use our Construction Cost Calculator to get a quick estimate of required
                            building materials along with their costs.
                        </p>

                        {/* Calculator Box */}
                        <Card className="p-4 mt-4 shadow-sm border-0">
                            <Row className="g-3 align-items-center text-start">
                                <Col md={3} sm={12}>
                                    <label className="fw-semibold">City</label>
                                    <select className="form-select">
                                        <option selected>Lahore</option>
                                        <option>Karachi</option>
                                        <option>Islamabad</option>
                                    </select>
                                </Col>

                                <Col md={3} sm={12}>
                                    <label className="fw-semibold">Area Size</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Area Size"
                                    />
                                </Col>

                                <Col md={3} sm={12}>
                                    <label className="fw-semibold">Unit</label>
                                    <select className="form-select">
                                        <option selected>Marla</option>
                                        <option>Kanal</option>
                                        <option>Square Feet</option>
                                    </select>
                                </Col>

                                <Col
                                    md={3}
                                    sm={12}
                                    className="d-flex justify-content-center align-items-end"
                                >
                                    <Button
                                        style={{
                                            backgroundColor: "#00a651",
                                            border: "none",
                                            padding: "12px 24px",
                                            fontWeight: "600",
                                        }}
                                    >
                                        Calculate Cost
                                    </Button>
                                </Col>
                            </Row>
                        </Card>
                    </Container>
                </div>
            </section>


            {/* section 2 */}
            <section className="py-4">
                <Container>
                    <div className="shadow-sm p-4 rounded bg-light">
                        <h5 className="mb-4 fw-semibold">
                            Popular Calculations in Islamabad
                        </h5>

                        <Swiper
                            modules={[Navigation]}
                            spaceBetween={15}
                            slidesPerView={4}
                            navigation={{
                                nextEl: ".swiper-button-next",
                                prevEl: ".swiper-button-prev"
                            }}
                            className="pb-4"
                        >
                            {data.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <Card className="h-100 shadow-sm border rounded-3">
                                        <Card.Body className="d-flex flex-column justify-content-between">
                                            <div>
                                                <Card.Title className="fs-5">
                                                    {item.title}
                                                </Card.Title>
                                                <Card.Text className="mb-1 text-muted small">
                                                    {item.subtitle}
                                                </Card.Text>
                                                <Card.Text className="fw-semibold text-primary small">
                                                    {item.size}
                                                </Card.Text>
                                            </div>
                                            <a
                                                href={item.link}
                                                className="small text-primary fw-semibold mt-2"
                                            >
                                                Details →
                                            </a>
                                        </Card.Body>
                                    </Card>
                                </SwiperSlide>
                            ))}

                            {/* Navigation Buttons */}
                            <div
                                className="swiper-button-next"
                                style={{
                                    backgroundColor: "#00A651",
                                    borderRadius: "50%",
                                    width: "30px",
                                    height: "30px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#fff",
                                    fontSize: "10px",

                                }}
                            ></div>
                        </Swiper>
                    </div>
                </Container>
            </section>

            {/* section 3  */}
            <section className="py-5">
                <Container>
                    {/* Heading + Description */}
                    <Row className="gy-4 justify-content-center">
                        <Col>
                            <h4 className="fw-bold mb-3">
                                Things to Keep In Mind While Constructing Your House
                            </h4>
                            <p className="text-muted">
                                Your house is often the hard earned fruit of your hard work over decades of your life.
                                It only makes sense to be absolutely sure about where, when and particularly how to build your house.
                                Following are some things you should keep in mind while constructing your house.
                            </p>
                        </Col>
                    </Row>

                    {/* Icon + Text Cards */}
                    <Row className="text-center g-4">
                        {tips.map((tip, index) => (
                            <Col key={index}>
                                <Card className="border-0 bg-transparent h-100">
                                    <Card.Body>
                                        <div
                                            className="rounded-3 d-inline-flex align-items-center justify-content-center mb-3"
                                            style={{
                                                backgroundColor: "#f5f7fb",
                                                width: "70px",
                                                height: "70px",
                                            }}
                                        >
                                            <img src={tip.icon} alt={tip.title} width="35" height="35" />
                                        </div>
                                        <h6 className="fw-semibold">{tip.title}</h6>
                                        <p className="small text-muted mb-0">{tip.desc}</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* section 4  */}
            <section className="py-5">
                <Container>
                    <Row className="align-items-center shadow rounded bg-white p-4">
                        {/* Left Column - Text */}
                        <Col md={7}>
                            <h5 className="fw-semibold mb-3">Construction Cost Calculator</h5>
                            <p className="text-muted mb-4">
                                Use our Construction Cost Calculator to get a quick estimate of
                                required building materials along with their costs.
                            </p>

                            <ul className="list-unstyled mb-4">
                                <li className="mb-2 d-flex align-items-center">
                                    <FaCheckCircle className="text-success me-2" />
                                    Flexibility of Area Size and Units
                                </li>
                                <li className="mb-2 d-flex align-items-center">
                                    <FaCheckCircle className="text-success me-2" />
                                    Separate Estimates for Grey Structure and Complete House
                                </li>
                                <li className="mb-2 d-flex align-items-center">
                                    <FaCheckCircle className="text-success me-2" />
                                    Multiple Construction Modes
                                </li>
                                <li className="mb-2 d-flex align-items-center">
                                    <FaCheckCircle className="text-success me-2" />
                                    Flexibility to Change the number of rooms
                                </li>
                            </ul>

                            <Button
                                variant="outline-success"
                                className="fw-semibold px-4 rounded-pill"
                            >
                                Read More →
                            </Button>
                        </Col>

                        {/* Right Column - Image */}
                        <Col md={5} className="text-center">
                            <img
                                src="/images/ccc.png"
                                alt="Cost Calculator Illustration"
                                className="img-fluid"
                                style={{ maxHeight: "260px" }}
                            />
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* section 5  */}
            <section className="py-5 bg-light">
                <Container>
                    <h3 className="fw-bold mb-3">
                        About Landdost.com’s Construction Cost Calculator
                    </h3>
                    <p className="text-muted">
                        One of the biggest challenges homeowners face when planning to build
                        their dream house is estimating the actual construction cost. With so
                        many variables at play — such as the quality and type of materials,
                        the number of floors, and whether the project will be managed
                        personally or through a construction company — it can be difficult to
                        determine an accurate budget.
                    </p>
                    <p className="text-muted">
                        To eliminate the guesswork, Landdost.com proudly introduces
                        its Construction Cost Calculator — a reliable, easy-to-use tool
                        designed to give you a realistic estimate of your home’s construction
                        expenses. Whether you’re building a modest single-story house or a
                        luxury multi-floor residence, our Construction Cost Calculator allows
                        you to:
                    </p>

                    <ul className="text-muted">
                        <li>Select your city of construction</li>
                        <li>Input the area of the house in Marla or Kanal</li>
                        <li>
                            Choose the quality of materials you plan to use (standard, premium,
                            or luxury)
                        </li>
                    </ul>

                    <p className="text-muted">With just a few clicks, you’ll receive a detailed estimate that includes:</p>
                    <ul className="text-muted">
                        <li>
                            <strong>Grey structure cost</strong> – covering the foundation,
                            walls, beams, cement, steel, and framework
                        </li>
                        <li>
                            <strong>Finishing cost</strong> – including tiles, woodwork,
                            bathroom fittings, paint, and final touches
                        </li>
                        <li>
                            <strong>Contractor cost</strong> and price per square foot for
                            better financial planning
                        </li>
                    </ul>

                    <p className="text-muted">
                        This tool is perfect for homeowners, investors, and builders who want
                        transparency and control over their construction budgets. At Landdost.com,
                        we believe in empowering our clients with the right
                        tools to make informed decisions at every stage of the building
                        process. Let us help you bring your dream home to life — with clarity,
                        confidence, and cost control.
                    </p>
                </Container>
            </section>

            {/* section 6  */}
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
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Your Name *</Form.Label>
                                        <Form.Control type="text" placeholder="How should we address you?" required />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Phone Number *</Form.Label>
                                        <div className="d-flex">
                                            <span className="input-group-text bg-light">🇵🇰 +92</span>
                                            <Form.Control type="tel" placeholder="Please enter a valid phone number" required />
                                        </div>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Email Address *</Form.Label>
                                        <Form.Control type="email" placeholder="Your best email address?" required />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Subject *</Form.Label>
                                        <Form.Control type="text" placeholder="General Inquiry" required />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Your Message *</Form.Label>
                                        <Form.Control as="textarea" rows={3} placeholder="What would you like to say?" required />
                                    </Form.Group>

                                    <Button variant="" type="submit" className="w-100 fw-bold text-light" style={{ background: "#00A651" }}>
                                        Send Your Question
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
    );
};

export default Construction;
