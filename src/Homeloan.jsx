import React, { useState, useCallback, useEffect, useRef } from "react";
import { Container, Row, Col, Card, Button, Accordion, InputGroup, Form, Nav, Table, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight, faHome } from "@fortawesome/free-solid-svg-icons";
import { FaPlus, FaMinus } from "react-icons/fa";
import { faFacebookF, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { faMapMarkerAlt, faPhone, faClock } from "@fortawesome/free-solid-svg-icons";
import { FaUserTie, FaMoneyBillWave, FaBuilding, FaBalanceScale } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { SpadeIcon } from "lucide-react";


const Homeloan = () => {
    // section 6 
    // faq section 

    const faqData = [
        {
            question: " What is LandDost.com?",
            answer:
                "LandDost.com is an online real estate platform that connects buyers, sellers, landlords, and renters across Pakistan. We offer verified property listings, market insights, and expert assistance to help you make informed real estate decisions.",
        },
        {
            question: " How is LandDost.com different from traditional real estate agents?",
            answer:
                "Unlike traditional agents, LandDost.com gives you 24/7 access to thousands of property listings online, complete with images, prices, and location maps. We also offer expert support, property valuation tools, and project updates in real-time.",
        },
        {
            question: "Is it free to list my property on LandDost.com?",
            answer:
                "Yes, individuals can list their property for free. However, we also offer premium listing options to give your property more visibility on our platform.",
        },
        {
            question: "How do I search for properties on LandDost.com?",
            answer:
                "Simply use our search bar to filter properties by city, area, type, price range, or purpose (buy/rent). You can also use our map view to explore property locations visually.",
        },
        {
            question: "Can I trust the listings on LandDost.com?",
            answer:
                "We work hard to ensure quality and trust. Most listings are verified, and we regularly monitor the platform for accuracy. However, we always recommend visiting the property and verifying documentation before making any transactions.",
        },
        {
            question: "Do you offer services for real estate agents and developers?",
            answer:
                "Absolutely! Real estate agents and property developers can create business profiles, post multiple listings, and reach a larger audience through targeted marketing solutions on LandDost.com.",
        },
        {
            question: "Does LandDost.com help with home loans or legal advice?",
            answer:
                "Yes, we offer guidance through our partner network of banks and legal experts. Whether it’s mortgage consultation or property legal verification, we’re here to help.",
        },
        {
            question: "How do I contact customer support?",
            answer:
                "You can reach our support team via the Contact Us page on our website, email us at support@landdost.com, or call our helpline during business hours. We’re always ready to assist you.",
        },
    ];
    const [activeKey, setActiveKey] = useState(null);

    // section 6 
    const [showMore, setShowMore] = useState(false);

    return (
        <>
            {/* section 1 */}
            <section
                style={{ backgroundColor: "#f4f6f9", padding: "60px 0" }}
            >
                <Container>
                    <Row className="align-items-center g-5">
                        {/* Left Side */}
                        <Col md={6} className="text-center">
                            <img
                                src="images/about1.jpg"
                                alt="House with keys"
                                className="img-fluid rounded-3 shadow w-75"
                            />
                            <h3 className="mt-4 fw-bold text-dark">
                                Real Estate Loan & Property Finance Calculator in Pakistan
                            </h3>
                            <p className="text-muted mt-2 px-3">
                                Compare property finance options, calculate loan payments, and find
                                the best plan that suits your real estate investment.
                            </p>
                        </Col>

                        {/* Right Side */}
                        <Col md={6}>
                            <div
                                className="p-4 rounded-4 shadow-lg bg-white border"
                                style={{ maxWidth: "500px", margin: "0 auto" }}
                            >
                                <h4 className="text-center fw-bold mb-4" style={{ color: "#33A137" }}>
                                    Real Estate Loan Calculator
                                </h4>

                                {/* Tabs */}


                                {/* Form */}
                                <Form className="mt-4 p-4 rounded bg-white">
                                    {/* Segment */}
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fs-6 fw-semibold text-dark">Segment</Form.Label>
                                        <Form.Select className="shadow-sm text-muted">
                                            <option value="">Select Segment</option>
                                            <option>Self Employed Business/Professions</option>
                                            <option>Salaried</option>
                                            <option>Salaried Employee Banking Customer</option>
                                        </Form.Select>
                                    </Form.Group>

                                    {/* Product Variant */}
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fs-6 fw-semibold text-dark">Product Variant</Form.Label>
                                        <Form.Select className="shadow-sm text-muted">
                                            <option value="">Select Product Variant</option>
                                            <option>Purchase</option>
                                            <option>Construction</option>
                                            <option>Renovate</option>
                                        </Form.Select>
                                    </Form.Group>

                                    {/* Tenure */}
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fs-6 fw-semibold text-dark">Tenure (Years)</Form.Label>
                                        <Form.Select className="shadow-sm text-muted">
                                            <option value="">Select Tenure</option>
                                            {[...Array(15)].map((_, i) => (
                                                <option key={i + 1}>{i + 1}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>

                                    {/* Property Price */}
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="propertyPrice" className="fs-6 fw-semibold text-dark">
                                            Property Price
                                        </Form.Label>
                                        <Form.Control
                                            type="number"
                                            id="propertyPrice"
                                            placeholder="Enter property price (PKR)"
                                            className="shadow-sm"
                                        />
                                    </Form.Group>

                                    {/* Desired Financing Amount */}
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="financingAmount" className="fs-6 fw-semibold text-dark">
                                            Desired Financing Amount
                                        </Form.Label>
                                        <Form.Control
                                            type="number"
                                            id="financingAmount"
                                            placeholder="Enter desired financing amount (PKR)"
                                            className="shadow-sm"
                                        />
                                    </Form.Group>

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        className="w-100 fw-semibold py-2 border-0"
                                        style={{
                                            backgroundColor: "#33A137",
                                            borderRadius: "10px",
                                            fontSize: "16px",
                                        }}
                                    >
                                        Calculate
                                    </Button>
                                </Form>

                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>


            {/* section 2 */}
            <section className="py-5" style={{ backgroundColor: "#fff" }}>
                <Container>
                    {/* Section Title */}
                    <h3 className="text-center fw-bold mb-5">
                        Why Choose Us For Real Estate Finance In Pakistan?
                    </h3>

                    <Row className="g-4 justify-content-center">
                        {/* 1 */}
                        <Col md={3} sm={6}>
                            <Card className="text-center shadow-sm border-0 h-100" style={{ backgroundColor: "#f4faf5" }}>
                                <div
                                    className="d-flex align-items-center justify-content-center mx-auto rounded-circle shadow"
                                    style={{
                                        width: "60px",
                                        height: "60px",
                                        marginTop: "-30px",
                                        backgroundColor: "#fff",
                                    }}
                                >
                                    <FaUserTie size={25} style={{ color: "#33A137" }} />
                                </div>
                                <Card.Body>
                                    <Card.Title className="fw-bold">Expert Advisors</Card.Title>
                                    <Card.Text>
                                        Experienced consultants to guide you through property loans and investment financing.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* 2 */}
                        <Col md={3} sm={6}>
                            <Card className="text-center shadow-sm border-0 h-100" style={{ backgroundColor: "#f4faf5" }}>
                                <div
                                    className="d-flex align-items-center justify-content-center mx-auto rounded-circle shadow"
                                    style={{
                                        width: "60px",
                                        height: "60px",
                                        marginTop: "-30px",
                                        backgroundColor: "#fff",
                                    }}
                                >
                                    <FaMoneyBillWave size={25} style={{ color: "#33A137" }} />
                                </div>
                                <Card.Body>
                                    <Card.Title className="fw-bold">Lowest Rates</Card.Title>
                                    <Card.Text>
                                        Get access to the most competitive property finance rates from top banks.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* 3 */}
                        <Col md={3} sm={6}>
                            <Card className="text-center shadow-sm border-0 h-100" style={{ backgroundColor: "#f4faf5" }}>
                                <div
                                    className="d-flex align-items-center justify-content-center mx-auto rounded-circle shadow"
                                    style={{
                                        width: "60px",
                                        height: "60px",
                                        marginTop: "-30px",
                                        backgroundColor: "#fff",
                                    }}
                                >
                                    <FaBuilding size={25} style={{ color: "#33A137" }} />
                                </div>
                                <Card.Body>
                                    <Card.Title className="fw-bold">Flexible Plans</Card.Title>
                                    <Card.Text>
                                        Tailored property finance plans to meet your residential or commercial needs.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* 4 */}
                        <Col md={3} sm={6}>
                            <Card className="text-center shadow-sm border-0 h-100" style={{ backgroundColor: "#f4faf5" }}>
                                <div
                                    className="d-flex align-items-center justify-content-center mx-auto rounded-circle shadow"
                                    style={{
                                        width: "60px",
                                        height: "60px",
                                        marginTop: "-30px",
                                        backgroundColor: "#fff",
                                    }}
                                >
                                    <FaBalanceScale size={25} style={{ color: "#33A137" }} />
                                </div>
                                <Card.Body>
                                    <Card.Title className="fw-bold">Compare Options</Card.Title>
                                    <Card.Text>
                                        Evaluate financing options from multiple banks to find the best deal for you.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* section 3  */}
            <section className="py-5" style={{ backgroundColor: "#f9f9f9" }}>
                <Container>
                    {/* Title */}
                    <h3 className="fw-bold text-center mb-5">
                        Real Estate Finance Process
                    </h3>

                    <Row className="gy-4">
                        {/* Step 1 */}
                        <Col md={6} className="d-flex align-items-start">
                            <div
                                className="d-flex align-items-center justify-content-center rounded-circle fw-bold me-3"
                                style={{
                                    width: "35px",
                                    height: "35px",
                                    border: "2px solid #33A137",
                                    color: "#33A137",
                                }}
                            >
                                1
                            </div>
                            <p className="mb-0 fw-semibold">
                                Apply for Property Financing Online
                            </p>
                        </Col>

                        {/* Step 2 */}
                        <Col md={6} className="d-flex align-items-start">
                            <div
                                className="d-flex align-items-center justify-content-center rounded-circle fw-bold me-3"
                                style={{
                                    width: "35px",
                                    height: "35px",
                                    border: "2px solid #33A137",
                                    color: "#33A137",
                                }}
                            >
                                2
                            </div>
                            <p className="mb-0 fw-semibold">
                                Our Representative Will Verify Your Details
                            </p>
                        </Col>

                        {/* Step 3 */}
                        <Col md={6} className="d-flex align-items-start">
                            <div
                                className="d-flex align-items-center justify-content-center rounded-circle fw-bold me-3"
                                style={{
                                    width: "35px",
                                    height: "35px",
                                    border: "2px solid #33A137",
                                    color: "#33A137",
                                }}
                            >
                                3
                            </div>
                            <p className="mb-0 fw-semibold">
                                Share Your Real Estate Loan Request with Our Partner Banks
                            </p>
                        </Col>

                        {/* Step 4 */}
                        <Col md={6} className="d-flex align-items-start">
                            <div
                                className="d-flex align-items-center justify-content-center rounded-circle fw-bold me-3"
                                style={{
                                    width: "35px",
                                    height: "35px",
                                    border: "2px solid #33A137",
                                    color: "#33A137",
                                }}
                            >
                                4
                            </div>
                            <p className="mb-0 fw-semibold">
                                Partner Bank Will Initiate the Loan Process
                            </p>
                        </Col>

                        {/* Step 5 */}
                        <Col md={6} className="d-flex align-items-start">
                            <div
                                className="d-flex align-items-center justify-content-center rounded-circle fw-bold me-3"
                                style={{
                                    width: "35px",
                                    height: "35px",
                                    border: "2px solid #33A137",
                                    color: "#33A137",
                                }}
                            >
                                5
                            </div>
                            <p className="mb-0 fw-semibold">
                                Get Approved for Property Financing
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* section 4  */}
            <section className="py-5">
                <Container>
                    <h3 className="text-center fw-bold mb-5">
                        Advantages of Real Estate Investment in Pakistan
                    </h3>

                    <Row className="align-items-center">
                        {/* Left Side */}
                        <Col md={4}>
                            <ul className="list-unstyled">
                                <li className="mb-4 d-flex">
                                    <FaCheckCircle
                                        size={20}
                                        style={{ color: "#33A137", marginRight: "10px", marginTop: "4px" }}
                                    />
                                    <div>
                                        <span style={{ fontWeight: "600", color: "#333" }}>
                                            Low Initial Investment
                                        </span>
                                        <p className="mb-0 text-muted">
                                            Own your dream property with affordable down payments.
                                        </p>
                                    </div>
                                </li>
                                <li className="mb-4 d-flex">
                                    <FaCheckCircle
                                        size={20}
                                        style={{ color: "#33A137", marginRight: "10px", marginTop: "4px" }}
                                    />
                                    <div>
                                        <span style={{ fontWeight: "600", color: "#333" }}>
                                            Flexible Payment Plans
                                        </span>
                                        <p className="mb-0 text-muted">
                                            Choose installment options that suit your budget and lifestyle.
                                        </p>
                                    </div>
                                </li>
                                <li className="mb-4 d-flex">
                                    <FaCheckCircle
                                        size={20}
                                        style={{ color: "#33A137", marginRight: "10px", marginTop: "4px" }}
                                    />
                                    <div>
                                        <span style={{ fontWeight: "600", color: "#333" }}>
                                            Hassle-Free Process
                                        </span>
                                        <p className="mb-0 text-muted">
                                            Our experts handle documentation and financing with partner banks.
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </Col>

                        {/* Center Image */}
                        <Col md={4} className="text-center">
                            <img
                                src="/images/about2.jpg" // Replace with your property image
                                alt="Real Estate"
                                className="img-fluid rounded shadow"
                            />
                        </Col>

                        {/* Right Side */}
                        <Col md={4}>
                            <ul className="list-unstyled">
                                <li className="mb-4 d-flex">
                                    <FaCheckCircle
                                        size={20}
                                        style={{ color: "#33A137", marginRight: "10px", marginTop: "4px" }}
                                    />
                                    <div>
                                        <span style={{ fontWeight: "600", color: "#333" }}>
                                            Tax Benefits
                                        </span>
                                        <p className="mb-0 text-muted">
                                            Claim tax deductions on home financing and investments.
                                        </p>
                                    </div>
                                </li>
                                <li className="mb-4 d-flex">
                                    <FaCheckCircle
                                        size={20}
                                        style={{ color: "#33A137", marginRight: "10px", marginTop: "4px" }}
                                    />
                                    <div>
                                        <span style={{ fontWeight: "600", color: "#333" }}>
                                            Build Property Assets
                                        </span>
                                        <p className="mb-0 text-muted">
                                            Secure your future with real estate investments that grow in value.
                                        </p>
                                    </div>
                                </li>
                                <li className="mb-4 d-flex">
                                    <FaCheckCircle
                                        size={20}
                                        style={{ color: "#33A137", marginRight: "10px", marginTop: "4px" }}
                                    />
                                    <div>
                                        <span style={{ fontWeight: "600", color: "#333" }}>
                                            No Need for Years of Savings
                                        </span>
                                        <p className="mb-0 text-muted">
                                            Get your desired property today with easy monthly installments.
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* section 5  */}
            <section className="py-5 bg-light">
                <Container>
                    <h3 className="text-center mb-4">
                        Best Real Estate Financing Banks and Rates in Pakistan
                    </h3>

                    <div className="table-responsive">
                        <Table bordered hover className="shadow-sm bg-white rounded">
                            <thead style={{ backgroundColor: "#33A137", color: "#fff" }}>
                                <tr>
                                    <th>Bank Name</th>
                                    <th>Home Financing Rate</th>
                                    <th>Insurance Rate</th>
                                    <th>Processing Fee</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <Image
                                            src="images/hbl.png"
                                            alt="HBL"
                                            width="30"
                                            className="me-2"
                                        />
                                        <a href="https://www.hbl.com/" target="_blank" rel="noreferrer">
                                            HBL (Habib Bank Ltd.)
                                        </a>
                                    </td>
                                    <td>15.25%</td>
                                    <td>1.5%</td>
                                    <td>PKR 10,000</td>
                                </tr>
                                <tr>
                                    <td>
                                        <Image
                                            src="images/mcb.svg"
                                            alt="MCB"
                                            width="30"
                                            className="me-2"
                                        />
                                        <a href="https://www.mcb.com.pk/" target="_blank" rel="noreferrer">
                                            MCB Bank Ltd.
                                        </a>
                                    </td>
                                    <td>14.85%</td>
                                    <td>1.4%</td>
                                    <td>PKR 8,500</td>
                                </tr>
                                <tr>
                                    <td>
                                        <Image
                                            src="images/mezan.png"
                                            alt="Meezan Bank"
                                            width="30"
                                            className="me-2"
                                        />
                                        <a href="https://www.meezanbank.com/" target="_blank" rel="noreferrer">
                                            Meezan Bank (Islamic)
                                        </a>
                                    </td>
                                    <td>13.95%</td>
                                    <td>1.3%</td>
                                    <td>PKR 7,500</td>
                                </tr>
                                <tr>
                                    <td>
                                        <Image
                                            src="images/alflah.png"
                                            alt="Bank Alfalah"
                                            width="50"
                                            className="me-2"
                                        />
                                        <a href="https://www.bankalfalah.com/" target="_blank" rel="noreferrer">
                                            Bank Alfalah
                                        </a>
                                    </td>
                                    <td>15.10%</td>
                                    <td>1.6%</td>
                                    <td>PKR 12,000</td>
                                </tr>
                                <tr>
                                    <td>
                                        <Image
                                            src="images/allied.png"
                                            alt="Allied Bank"
                                            width="50"
                                            className="me-2"
                                        />
                                        <a href="https://www.abl.com/" target="_blank" rel="noreferrer">
                                            Allied Bank Ltd.
                                        </a>
                                    </td>
                                    <td>14.50%</td>
                                    <td>1.45%</td>
                                    <td>PKR 9,000</td>
                                </tr>
                                <tr>
                                    <td>
                                        <Image
                                            src="images/sc.png"
                                            alt="Standard Chartered"
                                            width="30"
                                            className="me-2"
                                        />
                                        <a href="https://www.sc.com/pk/" target="_blank" rel="noreferrer">
                                            Standard Chartered Bank
                                        </a>
                                    </td>
                                    <td>15.75%</td>
                                    <td>1.55%</td>
                                    <td>PKR 11,000</td>
                                </tr>
                                <tr>
                                    <td>
                                        <Image
                                            src="images/ubl.jpg"
                                            alt="UBL"
                                            width="30"
                                            className="me-2"
                                        />
                                        <a href="https://www.ubldirect.com/" target="_blank" rel="noreferrer">
                                            UBL (United Bank Ltd.)
                                        </a>
                                    </td>
                                    <td>14.90%</td>
                                    <td>1.5%</td>
                                    <td>PKR 8,000</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </Container>
            </section>

            {/* section 6  */}
            <section className="py-5">
                <Container>
                    <Card className="p-4 shadow-sm border">
                        <h4 className="fw-semibold mb-3">
                            Affordable Real Estate Financing in Pakistan
                        </h4>

                        <p className="text-muted" style={{ fontSize: "15px" }}>
                            You can secure your dream property with an affordable budget through
                            extensive research on real estate financing procedures offered by
                            leading banks in Pakistan. We provide a user-friendly property
                            finance calculator to help investors and home buyers plan their
                            monthly payments with confidence.
                        </p>

                        {showMore && (
                            <>
                                <p className="text-muted" style={{ fontSize: "15px" }}>
                                    With flexible installment options, buyers can own residential or
                                    commercial property without waiting for years of savings.
                                    <br />
                                    <br />
                                    Our partner banks offer reliable home financing packages,
                                    ensuring transparent documentation and easy approval processes.
                                    So, explore the convenience of real estate financing today with
                                    our expert guidance!
                                </p>

                                <p className="text-secondary small mb-2">
                                    Disclaimer: Prices and calculations might have slight variation
                                    depending on KIBOR or other variable rates. Prices can be
                                    verified from respective bank(s).
                                </p>

                                <div className="p-4 mt-5">
                                    <h4 className="fw-semibold mb-3 text-dark">
                                        KIBOR Rates of Different Banks in Pakistan for Bank Car Loan
                                    </h4>

                                    <p className="text-muted" style={{ fontSize: "15px" }}>
                                        KIBOR stands for Karachi Interbank's Offered Rate, which
                                        serves as a benchmark for interest rates. You can stay updated
                                        through the official website of the State Bank of Pakistan for
                                        current rates. Below are the KIBOR-based rates for car
                                        financing from various banks in Pakistan:
                                    </p>

                                    <Table striped bordered hover responsive>
                                        <thead>
                                            <tr>
                                                <th>Bank Name</th>
                                                <th>KIBOR Rate Plus</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>MCB Bank</td>
                                                <td>Fixed rate of 22%</td>
                                            </tr>
                                            <tr>
                                                <td>Dubai Islamic Bank</td>
                                                <td>3.5%</td>
                                            </tr>
                                            <tr>
                                                <td>Bank Al Falah</td>
                                                <td>4%</td>
                                            </tr>
                                            <tr>
                                                <td>Al Barakah Bank</td>
                                                <td>5%</td>
                                            </tr>
                                            <tr>
                                                <td>Bank of Punjab (BOP)</td>
                                                <td>21% (New cars only)</td>
                                            </tr>
                                            <tr>
                                                <td>Faysal Bank</td>
                                                <td>KIBOR + 4.5 – 5.5%</td>
                                            </tr>
                                            <tr>
                                                <td>Allied Bank</td>
                                                <td>KIBOR rate of 3.5 – 4% (for one year tenure)</td>
                                            </tr>
                                        </tbody>
                                    </Table>

                                    <p className="text-secondary small mb-0">
                                        Note: Rates may vary depending on the current KIBOR. Always
                                        confirm with the bank before proceeding.
                                    </p>
                                </div>
                            </>
                        )}

                        {/* Toggle Button */}
                        <span
                            onClick={() => setShowMore(!showMore)}
                            style={{
                                color: "#33A137",
                                cursor: "pointer",
                                fontSize: "14px",
                                fontWeight: "500",
                            }}
                        >
                            {showMore ? "Show Less ▲" : "Show More ▼"}
                        </span>
                    </Card>
                </Container>
            </section>

            {/* section 7  */}
            <section className="faq py-5">
                <Container>
                    <h3 className="text-center fw-bold mb-4">
                        Frequently Asked Questions – <span style={{ cursor: "pointer" }}>LandDost.com</span>
                    </h3>
                    <Accordion
                        activeKey={activeKey}
                        onSelect={(key) => setActiveKey(activeKey === key ? null : key)}
                    >
                        {faqData.map((item, index) => (
                            <Accordion.Item
                                eventKey={index.toString()}
                                key={index}
                                className="faq-item"
                            >
                                <Accordion.Header
                                    onClick={() =>
                                        setActiveKey(
                                            activeKey === index.toString() ? null : index.toString()
                                        )
                                    }
                                >
                                    <div className="faq-icon">
                                        {activeKey === index.toString() ? (
                                            <FaMinus size={14} />
                                        ) : (
                                            <FaPlus size={14} />
                                        )}
                                    </div>
                                    <span className="faq-text">{item.question}</span>
                                </Accordion.Header>

                                <Accordion.Collapse eventKey={index.toString()}>
                                    <div className="accordion-body">{item.answer}</div>
                                </Accordion.Collapse>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </Container>
            </section>

            {/* section 4  */}
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

export default Homeloan;
