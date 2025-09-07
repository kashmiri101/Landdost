import { useState } from "react";
import {
    Container,
    Row,
    Col,
    Button,
    Form,
    ToggleButton,
    ToggleButtonGroup,
    Card, Image, InputGroup
} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faHome} from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { faMapMarkerAlt, faPhone, faClock } from "@fortawesome/free-solid-svg-icons";
import { FaCheckCircle, FaUsers, FaGlobe, FaHandshake, FaLaptop, FaHome } from "react-icons/fa";

export default function Booking() {

    //   section 2 
    const [activeTab, setActiveTab] = useState("Home");

    // ================== CONTENT FOR EACH TAB ==================
    const renderContent = () => {
        switch (activeTab) {
            // ----------------- HOME -----------------
            case "Home":
                return (
                    <>
                        {/* Bedrooms */}
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold">Bedrooms</Form.Label>
                            <div className="d-flex flex-wrap gap-2 mt-2">
                                <ToggleButtonGroup type="radio" name="bedrooms" defaultValue="Studio">
                                    <ToggleButton id="studio" value="Studio" variant="outline-secondary" size="sm">
                                        Studio
                                    </ToggleButton>
                                    {[...Array(10)].map((_, i) => (
                                        <ToggleButton
                                            key={i + 1}
                                            id={`bed-${i + 1}`}
                                            value={i + 1}
                                            variant="outline-secondary"
                                            size="sm"
                                        >
                                            {i + 1}
                                        </ToggleButton>
                                    ))}
                                    <ToggleButton id="bed-10plus" value="10+" variant="outline-secondary" size="sm">
                                        10+
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                        </Form.Group>

                        {/* Bathrooms */}
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold">Bathrooms</Form.Label>
                            <div className="d-flex flex-wrap gap-2 mt-2">
                                <ToggleButtonGroup type="radio" name="bathrooms" defaultValue={1}>
                                    {[1, 2, 3, 4, 5, "6+"].map((val, i) => (
                                        <ToggleButton
                                            key={i}
                                            id={`bath-${val}`}
                                            value={val}
                                            variant="outline-secondary"
                                            size="sm"
                                        >
                                            {val}
                                        </ToggleButton>
                                    ))}
                                </ToggleButtonGroup>
                            </div>
                        </Form.Group>

                        {/* Basement */}
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold">Basement</Form.Label>
                            <div className="d-flex gap-3 mt-2">
                                <ToggleButtonGroup type="radio" name="basement">
                                    <ToggleButton id="basement-yes" value="Yes" variant="outline-secondary" size="sm">
                                        Yes
                                    </ToggleButton>
                                    <ToggleButton id="basement-no" value="No" variant="outline-secondary" size="sm">
                                        No
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                        </Form.Group>

                        {/* Design Preference */}
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold">Design Preference</Form.Label>
                            <div className="d-flex gap-3 mt-2">
                                <ToggleButtonGroup type="radio" name="design">
                                    <ToggleButton id="design-classical" value="Classical" variant="outline-secondary" size="sm">
                                        Classical
                                    </ToggleButton>
                                    <ToggleButton id="design-modern" value="Modern" variant="outline-secondary" size="sm">
                                        Modern
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                        </Form.Group>

                        {/* City */}
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold">City</Form.Label>
                            <Form.Control type="text" placeholder="Select City" />
                        </Form.Group>

                        {/* Location */}
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold">Location</Form.Label>
                            <Form.Control type="text" placeholder="Select Location" />
                        </Form.Group>

                        {/* Map */}
                        <div className="mb-4">
                            <div
                                style={{
                                    height: "250px",
                                    backgroundColor: "#eaf7ec",
                                    border: "1px solid #ddd",
                                    borderRadius: "6px",
                                    position: "relative",
                                }}
                            >
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        fontSize: "32px",
                                        color: "green",
                                    }}
                                >
                                    📍
                                </div>
                            </div>
                            <Button variant="link" className="text-success fw-semibold mt-2 p-0">
                                + Select Location On Map
                            </Button>
                        </div>
                    </>
                );

            // ----------------- PLOTS -----------------
            case "Plots":
                return (
                    <>
                        {/* Plot Size */}
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold">Plot Size</Form.Label>
                            <Form.Control type="text" placeholder="e.g. 5 Marla, 10 Marla, 1 Kanal" />
                        </Form.Group>

                        {/* Corner Plot */}
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold">Corner Plot</Form.Label>
                            <div className="d-flex gap-3 mt-2">
                                <ToggleButtonGroup type="radio" name="corner">
                                    <ToggleButton id="corner-yes" value="Yes" variant="outline-secondary" size="sm">
                                        Yes
                                    </ToggleButton>
                                    <ToggleButton id="corner-no" value="No" variant="outline-secondary" size="sm">
                                        No
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                        </Form.Group>

                        {/* Facing Park */}
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold">Facing Park</Form.Label>
                            <div className="d-flex gap-3 mt-2">
                                <ToggleButtonGroup type="radio" name="park">
                                    <ToggleButton id="park-yes" value="Yes" variant="outline-secondary" size="sm">
                                        Yes
                                    </ToggleButton>
                                    <ToggleButton id="park-no" value="No" variant="outline-secondary" size="sm">
                                        No
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                        </Form.Group>

                        {/* City */}
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold">City</Form.Label>
                            <Form.Control type="text" placeholder="Select City" />
                        </Form.Group>
                    </>
                );

            // ----------------- APARTMENTS -----------------
            case "Apartments":
                return (
                    <>
                        {/* Bedrooms */}
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold">Bedrooms</Form.Label>
                            <div className="d-flex flex-wrap gap-2 mt-2">
                                <ToggleButtonGroup type="radio" name="apt-bedrooms" defaultValue={1}>
                                    {[1, 2, 3, 4].map((val) => (
                                        <ToggleButton key={val} id={`apt-bed-${val}`} value={val} variant="outline-secondary" size="sm">
                                            {val}
                                        </ToggleButton>
                                    ))}
                                </ToggleButtonGroup>
                            </div>
                        </Form.Group>

                        {/* Floor Level */}
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold">Floor Level</Form.Label>
                            <Form.Control type="number" placeholder="e.g. 5 (for 5th floor)" />
                        </Form.Group>

                        {/* Furnished */}
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold">Furnished</Form.Label>
                            <div className="d-flex gap-3 mt-2">
                                <ToggleButtonGroup type="radio" name="furnished">
                                    <ToggleButton id="furnished-yes" value="Yes" variant="outline-secondary" size="sm">
                                        Yes
                                    </ToggleButton>
                                    <ToggleButton id="furnished-no" value="No" variant="outline-secondary" size="sm">
                                        No
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                        </Form.Group>
                    </>
                );

            // ----------------- FARM HOUSE -----------------
            case "Farm House":
                return (
                    <>
                        {/* Land Area */}
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold">Land Area</Form.Label>
                            <Form.Control type="text" placeholder="e.g. 2 Kanal, 5 Kanal, 10 Kanal" />
                        </Form.Group>

                        {/* Swimming Pool */}
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold">Swimming Pool</Form.Label>
                            <div className="d-flex gap-3 mt-2">
                                <ToggleButtonGroup type="radio" name="pool">
                                    <ToggleButton id="pool-yes" value="Yes" variant="outline-secondary" size="sm">
                                        Yes
                                    </ToggleButton>
                                    <ToggleButton id="pool-no" value="No" variant="outline-secondary" size="sm">
                                        No
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                        </Form.Group>

                        {/* Garden */}
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold">Garden</Form.Label>
                            <div className="d-flex gap-3 mt-2">
                                <ToggleButtonGroup type="radio" name="garden">
                                    <ToggleButton id="garden-yes" value="Yes" variant="outline-secondary" size="sm">
                                        Yes
                                    </ToggleButton>
                                    <ToggleButton id="garden-no" value="No" variant="outline-secondary" size="sm">
                                        No
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                        </Form.Group>
                    </>
                );

            default:
                return null;
        }
    };

    // section 3
    const [advance, setAdvance] = useState(0);
    const [installments, setInstallments] = useState(0);
    const [monthly, setMonthly] = useState(0);

    // Calculate total amount
    const totalAmount = Number(advance) + Number(installments) * Number(monthly);

    return (
        <>
            {/* section 1 */}
            <section className="py-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={10}>
                            {/* ✅ controls box width */}
                            <div
                                style={{
                                    background: "linear-gradient(to bottom, #b7ff90, #dbeafe)",
                                    borderRadius: "16px",
                                    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                                }}
                            >
                                <Row className="align-items-center ms-5">
                                    {/* ✅ Left Text & Steps */}
                                    <Col md={8}>
                                        <h5 className="fw-bold mb-1">
                                            Reach Millions of Buyers on our Platforms
                                        </h5>
                                        <p className="text-muted mb-4">In a few simple steps!</p>

                                        <div className="d-flex gap-4">
                                            <div className="d-flex align-items-center gap-2">
                                                <div
                                                    style={{
                                                        width: "16px",
                                                        height: "16px",
                                                        borderRadius: "50%",
                                                        backgroundColor: "#d1d5db",
                                                    }}
                                                ></div>
                                                <span style={{ color: "#6b7280", fontWeight: 500 }}>
                                                    Houses Information
                                                </span>
                                            </div>

                                            <div className="d-flex align-items-center gap-2">
                                                <div
                                                    style={{
                                                        width: "16px",
                                                        height: "16px",
                                                        borderRadius: "50%",
                                                        backgroundColor: "#d1d5db",
                                                    }}
                                                ></div>
                                                <span style={{ color: "#6b7280", fontWeight: 500 }}>
                                                    Property Price
                                                </span>
                                            </div>

                                            <div className="d-flex align-items-center gap-2">
                                                <div
                                                    style={{
                                                        width: "16px",
                                                        height: "16px",
                                                        borderRadius: "50%",
                                                        backgroundColor: "#d1d5db",
                                                    }}
                                                ></div>
                                                <span style={{ color: "#6b7280", fontWeight: 500 }}>
                                                    Good Property Images
                                                </span>
                                            </div>
                                        </div>
                                    </Col>

                                    {/* ✅ Right Illustration */}
                                    <Col md={4} className="text-end">
                                        <img
                                            src="images/booking.png"
                                            alt="house"
                                            className="img-fluid"
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* section 2 */}
            <section className="py-5">
                <Container className="p-5 shadow" style={{ maxWidth: "700px" }}>
                    {/* Tabs */}
                    <Row className="mb-4 border-bottom pb-2">
                        <Col>
                            <div className="d-flex gap-4">
                                {["Home", "Plots", "Apartments", "Farm House"].map((tab) => (
                                    <Button
                                        key={tab}
                                        variant="link"
                                        className={`border-0 p-0 ${activeTab === tab ? "text-success fw-bold" : "text-dark"}`}
                                        onClick={() => setActiveTab(tab)}
                                    >
                                        {tab}
                                    </Button>
                                ))}
                            </div>
                        </Col>
                    </Row>

                    {/* Tab Content */}
                    {renderContent()}
                </Container>
            </section>

            {/* section 3  */}
            <section className="py-5">
                <Container className="p-5 shadow" style={{ maxWidth: "700px" }}>
                    {/* Area Size */}
                    <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold">Area Size</Form.Label>
                        <Form.Control type="text" placeholder="Enter Unit" />
                    </Form.Group>

                    {/* Price */}
                    <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold">Price</Form.Label>
                        <Form.Control type="text" placeholder="Enter Price" />
                    </Form.Group>

                    {/* Installments */}
                    <div className="mb-3">
                        <h6 className="fw-semibold">Installment Available</h6>
                    </div>

                    <Form.Group className="mb-3">
                        <Form.Label>Advance Amount</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter Amount"
                            value={advance}
                            onChange={(e) => setAdvance(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>No of Installments</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter Amount"
                            value={installments}
                            onChange={(e) => setInstallments(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Monthly Installments</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter Amount"
                            value={monthly}
                            onChange={(e) => setMonthly(e.target.value)}
                        />
                    </Form.Group>

                    {/* Total Amount */}
                    <div
                        className="p-2 border rounded text-success fw-semibold mt-3"
                        style={{ display: "inline-block" }}
                    >
                        Total Amount = {totalAmount.toLocaleString()}
                    </div>
                </Container>
            </section>

            {/* section 4  */}
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
                                        Pearl One, 94-B/I, MM Alam Road, Gulberg III, Lahore, Pakistan
                                    </li>
                                    <li className="mb-2">
                                        <FontAwesomeIcon icon={faPhone} className="me-2 text-success" />
                                        0900 Bee Haven (84533)
                                    </li>
                                    <li>
                                        <FontAwesomeIcon icon={faClock} className="me-2 text-success" />
                                        Monday To Friday (9AM–6PM)
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

            {/* section 8  */}
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
                                    Fusce venenatis tellus a felis scelerisque. venenatis tellus a felis scelerisque.
                                </p>
                            </div>
                        </Col>

                        {/* Button Column */}
                        <Col lg={3} md={12} className="text-md-start">
                            <div>
                                <button className="btn bg-white rounded-pill py-2 px-4">
                                    Register Now
                                </button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* newletter  */}
            <section className="newsletter py-5" style={{ background: "#B7FF90" }}>
                <Container>
                    <Row className="align-items-center text-center text-md-start gy-4">
                        {/* Social Media Icons */}
                        <Col lg={4} md={6}>
                            <p className="fw-semibold mb-2">Follow Us on</p>
                            <div className="d-flex justify-content-center justify-content-md-start gap-3">
                                <FontAwesomeIcon
                                    icon={faLinkedinIn}
                                    className="cursor-pointer"
                                />
                                <FontAwesomeIcon
                                    icon={faFacebookF}
                                    className="cursor-pointer"
                                />
                                <FontAwesomeIcon
                                    icon={faInstagram}
                                    className="cursor-pointer"
                                />
                            </div>
                        </Col>

                        {/* Company Name */}
                        <Col lg={4} md={6}>
                            <div className="d-flex justify-content-center justify-content-md-start gap-3">
                                <FontAwesomeIcon
                                    icon={faHome}
                                    className="bg-light p-2 rounded-pill"
                                />
                                <h5 className="mb-0">Bee Haven International</h5>

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
            </section>
        </>
    );
}
