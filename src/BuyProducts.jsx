import React, { useState } from "react";
import {
    Container,
    Navbar,
    Nav,
    Button,
    Offcanvas,
    Row,
    Col,
    Card,
    Form,
    Badge
} from "react-bootstrap";
import {
    FaHome, FaSearch, FaPlus, FaComments, FaEnvelope, FaChartLine, FaUserCircle, FaMapMarkerAlt,
} from "react-icons/fa";
import {
    FaBars,
    FaPlusCircle,
    FaBuilding,
    FaCog,
    FaClipboardList,
    FaFire, FaFireAlt, FaLeaf, FaShoppingCart, FaSyncAlt, FaAd, FaCamera, FaVideo,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function BuyProducts() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [active, setActive] = useState("inbox");

    const navigate = useNavigate();

    const handleChange = (e) => {
        const value = e.target.value;
        if (value) {
            navigate(value); // Navigate to selected page
        }
    };


    const listings = [
        {
            title: "Listing",
            desc: "Get an ad slot for 30 days to post your listing",
            price: "Rs. 3,000",
            icon: <FaLeaf size={28} color="#2ecc71" />,
        },
        {
            title: "Hot Listing",
            desc: "Get an ad slot for 30 days and place your ad above normal listings",
            price: "Rs. 7,800",
            icon: <FaFire size={28} color="#ff6b00" />,
        },
        {
            title: "Super Hot Listing",
            desc: "Get an ad slot for 30 days and place your ad at the top of search results",
            price: "Rs. 21,000",
            icon: <FaFireAlt size={28} color="#ff4d4d" />,
        },
    ];

    const credits = [
        {
            title: "Refresh Credits",
            desc: "Refresh the time of your posted listings and bring them to the top again",
            price: "Rs. 240",
            icon: <FaSyncAlt size={28} color="#1abc9c" />,
        },
        {
            title: "Story Ad Credits",
            desc: "Get more exposure by posting your listing in the story",
            price: "Rs. 1,000",
            icon: <FaAd size={28} color="#27ae60" />,
        },
        {
            title: "Verified Photography Credits",
            desc: "Upgrade your property's visual appeal with our premium \nprofessional photoshoot service.\nService only available in Karachi, Lahore & Islamabad.",
            price: "Rs. 3,600",
            icon: <FaCamera size={28} color="#3498db" />,
            recommended: true,
        },
        {
            title: "Verified Videography Credits",
            desc: "Bring your property to life with our captivating videography service.\nService only available in Karachi, Lahore & Islamabad.",
            price: "Rs. 12,000",
            icon: <FaVideo size={28} color="#f39c12" />,
            recommended: true,
        },
    ];

    return (
        <>
            {/* Top Navbar */}
            <Navbar bg="white" className="shadow-sm px-3" expand="lg">
                <Button
                    variant="light"
                    className="border-0 me-3 d-lg-none"
                    onClick={handleShow}
                >
                    <FaBars size={20} />
                </Button>
                <Navbar.Brand href="#" className="ms-5">
                    <FaMapMarkerAlt
                        size={28} // adjust size as needed
                        style={{ color: "#33A137", marginLeft: "10px" }}
                    />
                    Profolio
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center mt-2 mt-lg-0">
                        <a
                            href="https://landdost.com/"
                            className="text-decoration-none text-dark me-3"
                        >
                            Go to Landdost.com
                        </a>
                        <Link to="/MyListing" className="text-decoration-none text-dark me-3 mt-1">
                            My Listings
                        </Link>
                        <Link to="/PostListing">
                            <Button
                                variant="success"
                                className="me-3 rounded-pill px-4 mt-2"
                            >
                                Post Listing
                            </Button>
                        </Link>

                        <FaUserCircle size={28} className="mt-2" />
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            {/* Sidebar Offcanvas */}
            {/* Sidebar Offcanvas */}
            <div
                className="d-flex"
                onMouseEnter={handleShow}
                onMouseLeave={handleClose}
            >
                {/* Mini Sidebar (Icons) */}
                <div
                    className="d-none d-lg-flex flex-column align-items-center bg-white shadow-sm position-fixed top-0 start-0 h-100 p-3 gap-4"
                    style={{ width: "70px", borderRight: "1px solid #eee", zIndex: 1030 }}
                >
                    <Button variant="light" style={{ border: "none" }}>
                        <FaBars size={20} />
                    </Button>
                    <FaHome size={20} color="#999" />
                    <FaPlusCircle size={20} color="green" />
                    <FaBuilding size={20} color="#999" />
                    <FaEnvelope size={20} color="#999" />
                    <FaCog size={20} color="#999" />
                    <FaClipboardList size={20} color="#999" />
                </div>

                {/* Offcanvas Sidebar */}
                <Offcanvas
                    show={show}
                    onHide={handleClose}
                    backdrop={false}
                    placement="start"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title className="d-flex align-items-center">
                            <img
                                src="images/propertyformlogo.png"
                                alt="Logo"
                                style={{ width: "35px", marginRight: "10px" }}
                            />
                            <span style={{ fontWeight: "bold", fontSize: "18px" }}>Profolio</span>
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="flex-column gap-2">
                            <Nav.Link as={Link} to="/dashboard" className="text-secondary">
                                <FaHome className="me-2 text-secondary" /> Dashboard
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/PostListing"
                                className="active text-secondary"
                                style={{ background: "#e9f7ef", borderRadius: "8px" }}
                            >
                                <FaPlusCircle className="me-2 text-success" /> Post Listing
                            </Nav.Link>
                            <div className="d-flex align-items-center ms-3">
                                <FaBuilding className="me-2 text-secondary" />
                                <select
                                    className="form-select text-secondary border-0"
                                    style={{ width: "200px" }}
                                    onChange={handleChange}
                                    defaultValue=""
                                >
                                    <option value="" disabled>
                                        Property Management
                                    </option>
                                    <option value="/MyListing">All Listing</option>
                                </select>
                            </div>
                            <Nav.Link as={Link} to="/Inbox" className="text-secondary">
                                <FaEnvelope className="me-2 text-secondary" /> Inbox
                            </Nav.Link>
                            <Nav.Link as={Link} to="/Settings" className="text-secondary">
                                <FaCog className="me-2 text-secondary" /> Settings
                            </Nav.Link>
                            <div className="d-flex align-items-center ms-3">
                                <FaBuilding className="me-2 text-secondary" />
                                <select
                                    className="form-select text-secondary border-0"
                                    style={{ width: "200px" }}
                                    onChange={handleChange}
                                    defaultValue=""
                                >
                                    <option value="" disabled>
                                        Prop Shop
                                    </option>
                                    <option value="/BuyProducts">Buy Products</option>
                                    <option value="/OrderHistory">Order History</option>
                                </select>
                            </div>
                        </Nav>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>

            {/* MyListing  Content */}
            <section className="py-4" style={{ background: "#f9fafc" }}>
                <Container >
                    <Row className="g-4">
                        {/* Left Side: Listings & Credits */}
                        <Col lg={8}>
                            {/* Listings Section */}
                            <Card className="shadow-sm mb-4">
                                <Card.Body>
                                    <h5 className="fw-bold mb-3">Listings</h5>
                                    {listings.map((item, index) => (
                                        <div
                                            key={index}
                                            className="d-flex justify-content-between align-items-center border-bottom py-3"
                                        >
                                            <div className="d-flex align-items-start gap-3">
                                                {item.icon}
                                                <div>
                                                    <div className="fw-semibold">{item.title}</div>
                                                    <small className="text-muted">{item.desc}</small>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center gap-4">
                                                <span className="fw-semibold">{item.price}</span>
                                                <Button variant="success" className="px-3">
                                                    Add To Cart
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </Card.Body>
                            </Card>

                            {/* Credits Section */}
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <h5 className="fw-bold mb-3">
                                        Credits{" "}
                                        <small className="text-muted">
                                            (Only applicable on already posted listings)
                                        </small>
                                    </h5>
                                    {credits.map((item, index) => (
                                        <div
                                            key={index}
                                            className="d-flex justify-content-between align-items-center border-bottom py-3"
                                        >
                                            {/* Left side with icon and text */}
                                            <div className="d-flex gap-3 align-items-start">
                                                <div>{item.icon}</div>
                                                <div>
                                                    <div className="fw-semibold">
                                                        {item.title}{" "}
                                                        {item.recommended && (
                                                            <Badge bg="success" pill>
                                                                Recommended
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <small className="text-muted" style={{ whiteSpace: "pre-line" }}>
                                                        {item.desc}
                                                    </small>
                                                </div>
                                            </div>

                                            {/* Right side with price and button */}
                                            <div className="d-flex align-items-center gap-4">
                                                <span className="fw-semibold">{item.price}</span>
                                                <Button variant="success">Add To Cart</Button>
                                            </div>
                                        </div>
                                    ))}
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Right Side: Cart */}
                        <Col lg={4}>
                            <Card className="shadow-sm text-center d-flex align-items-center justify-content-center py-5">
                                <FaShoppingCart size={60} className="text-muted mb-3" />
                                <h6 className="text-muted">No Items</h6>
                                <small className="text-muted">Added in cart</small>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}
