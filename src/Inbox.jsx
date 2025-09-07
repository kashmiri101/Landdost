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
    FaInbox, FaTrash
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function MyListing() {
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
                                    <option value="/ByProducts">Buy Products</option>
                                    <option value="/OrderHistory">Order History</option>
                                </select>
                            </div>
                        </Nav>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>

            {/* MyListing  Content */}
            <section style={{ background: "#f9fafc", minHeight: "100vh" }}>
                <Container className="py-3">
                    <Row>
                        {/* Sidebar */}
                        <Col
                            xs={12}
                            md={3}
                            className="mb-3 mb-md-0"
                        >
                            <div className="bg-white shadow-sm rounded p-3 d-flex flex-row flex-md-column gap-2 justify-content-center">
                                {/* Inbox */}
                                <div
                                    onClick={() => setActive("inbox")}
                                    className={`d-flex align-items-center gap-2 p-2 rounded ${active === "inbox"
                                        ? "bg-light text-success fw-bold"
                                        : "text-muted"
                                        }`}
                                    style={{ cursor: "pointer" }}
                                >
                                    <FaInbox />
                                    <span>Inbox</span>
                                </div>

                                {/* Trash */}
                                <div
                                    onClick={() => setActive("trash")}
                                    className={`d-flex align-items-center gap-2 p-2 rounded ${active === "trash"
                                        ? "bg-light text-danger fw-bold"
                                        : "text-muted"
                                        }`}
                                    style={{ cursor: "pointer" }}
                                >
                                    <FaTrash />
                                    <span>Trash</span>
                                </div>
                            </div>
                        </Col>

                        {/* Content Area */}
                        <Col xs={12} md={9}>
                            <div className="bg-white shadow-sm rounded p-4 d-flex justify-content-center align-items-center h-100">
                                {active === "inbox" ? (
                                    <h5 className="text-muted">No Record Found in Inbox</h5>
                                ) : (
                                    <h5 className="text-muted">No Record Found in Trash</h5>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}
