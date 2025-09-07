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
    FaHome, FaSearch, FaPlus, FaComments, FaEnvelope, FaChartLine, FaUserCircle,
} from "react-icons/fa";
import {
    FaBars,
    FaPlusCircle,
    FaBuilding,
    FaCog,
    FaClipboardList,
    FaUser, FaSlidersH, FaKey, FaUpload, FaMapMarkerAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Settings() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [active, setActive] = useState("settings");

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
                                    <option value="/BuyProducts">Buy Products</option>
                                    <option value="/OrderHistory">Order History</option>
                                </select>
                            </div>
                        </Nav>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>

            {/* Setting  Content */}
            <section style={{ background: "#f9fafc", minHeight: "100vh" }}>
                <Container className="py-3">
                    <Row>
                        {/* Sidebar */}
                        <Col xs={12} md={3} className="mb-3 mb-md-0">
                            <Card className="shadow-sm border-0">
                                <Card.Body className="d-flex flex-md-column flex-row gap-2">
                                    <div
                                        onClick={() => setActive("settings")}
                                        className={`d-flex align-items-center gap-2 p-2 rounded ${active === "settings"
                                            ? "bg-light text-success fw-bold"
                                            : "text-muted"
                                            }`}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <FaUser />
                                        <span>User Settings</span>
                                    </div>

                                    <div
                                        onClick={() => setActive("preferences")}
                                        className={`d-flex align-items-center gap-2 p-2 rounded ${active === "preferences"
                                            ? "bg-light text-primary fw-bold"
                                            : "text-muted"
                                            }`}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <FaSlidersH />
                                        <span>Preferences</span>
                                    </div>

                                    <div
                                        onClick={() => setActive("password")}
                                        className={`d-flex align-items-center gap-2 p-2 rounded ${active === "password"
                                            ? "bg-light text-danger fw-bold"
                                            : "text-muted"
                                            }`}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <FaKey />
                                        <span>Change Password</span>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Main Content */}
                        <Col xs={12} md={9}>
                            <Card className="shadow-sm border-0 p-3">
                                <Card.Body>
                                    {active === "settings" && (
                                        <>
                                            <h5 className="fw-bold mb-3">Additional Information</h5>
                                            {/* Name & Email */}
                                            <Row className="mb-3">
                                                <Col md={6}>
                                                    <Form.Group>
                                                        <Form.Label>Name</Form.Label>
                                                        <Form.Control type="text" value="" placeholder="Name" readOnly />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group>
                                                        <Form.Label>Email</Form.Label>
                                                        <Form.Control
                                                            type="email"
                                                            value=""
                                                            placeholder="Email"
                                                            readOnly
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            {/* Mobile & Landline */}
                                            <Row className="mb-3">
                                                <Col md={6}>
                                                    <Form.Group>
                                                        <Form.Label>Mobile</Form.Label>
                                                        <div className="d-flex">
                                                            <Form.Select style={{ maxWidth: "80px" }}>
                                                                <option>🇵🇰</option>
                                                            </Form.Select>
                                                            <Form.Control type="text" placeholder="+92" />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group>
                                                        <Form.Label>Landline</Form.Label>
                                                        <div className="d-flex">
                                                            <Form.Select style={{ maxWidth: "80px" }}>
                                                                <option>🇵🇰</option>
                                                            </Form.Select>
                                                            <Form.Control type="text" placeholder="+92" />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            {/* Whatsapp & City */}
                                            <Row className="mb-3">
                                                <Col md={6}>
                                                    <Form.Group>
                                                        <Form.Label>Whatsapp</Form.Label>
                                                        <div className="d-flex">
                                                            <Form.Select style={{ maxWidth: "80px" }}>
                                                                <option>🇵🇰</option>
                                                            </Form.Select>
                                                            <Form.Control type="text" placeholder="+92" />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group>
                                                        <Form.Label>City</Form.Label>
                                                        <Form.Select>
                                                            <option>Select City</option>
                                                            <option>Karachi</option>
                                                            <option>Lahore</option>
                                                            <option>Islamabad</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            {/* Address */}
                                            <Row className="mb-3">
                                                <Col md={12}>
                                                    <Form.Group>
                                                        <Form.Label>Address</Form.Label>
                                                        <Form.Control type="text" placeholder="Enter Address" />
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            {/* Upload Picture */}
                                            <Row className="mb-4">
                                                <Col md={12}>
                                                    <Form.Group>
                                                        <Form.Label>Upload a picture</Form.Label>
                                                        <div
                                                            className="border border-success rounded d-flex justify-content-center align-items-center p-3 mt-1"
                                                            style={{ borderStyle: "dashed", cursor: "pointer" }}
                                                        >
                                                            <FaUpload className="me-2 text-success" />
                                                            <span className="text-success fw-bold">Browse and Upload</span>
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            {/* Checkbox + Save Button */}
                                            <Row className="align-items-center">
                                                <Col md={6}>
                                                    <Form.Check
                                                        type="checkbox"
                                                        label="Update details in all property listings"
                                                    />
                                                </Col>
                                                <Col md={6} className="text-end">
                                                    <Button variant="success" className="px-4">
                                                        Save Changes
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </>
                                    )}

                                    {active === "preferences" && (
                                        <>
                                            <h5 className="fw-bold mb-3">Preferences</h5>
                                            {/* Email Notification */}
                                            <div className="d-flex justify-content-between align-items-center border-bottom py-3">
                                                <div>
                                                    <div className="fw-semibold">Email Notification</div>
                                                    <small className="text-muted">
                                                        Allow to receive email notifications
                                                    </small>
                                                </div>
                                                <Form.Check type="switch" id="emailNotification" />
                                            </div>

                                            {/* Newsletters */}
                                            <div className="d-flex justify-content-between align-items-center border-bottom py-3">
                                                <div>
                                                    <div className="fw-semibold">Newsletters</div>
                                                    <small className="text-muted">
                                                        Allow to stay updated and receive newsletter
                                                    </small>
                                                </div>
                                                <Form.Check type="switch" id="newsletters" />
                                            </div>

                                            {/* Automated Reports */}
                                            <div className="d-flex justify-content-between align-items-center border-bottom py-3">
                                                <div>
                                                    <div className="fw-semibold">Automated Reports</div>
                                                    <small className="text-muted">
                                                        Allow to send us reports automatically in case of any issue
                                                    </small>
                                                </div>
                                                <Form.Check type="switch" id="automatedReports" />
                                            </div>

                                            {/* Currency */}
                                            <div className="mt-4">
                                                <Form.Group>
                                                    <Form.Label className="fw-semibold">Currency</Form.Label>
                                                    <Form.Select defaultValue="PKR">
                                                        <option>PKR</option>
                                                        <option>USD</option>
                                                        <option>EUR</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </div>

                                            {/* Area Unit */}
                                            <div className="mt-3">
                                                <Form.Group>
                                                    <Form.Label className="fw-semibold">Area Unit</Form.Label>
                                                    <Form.Select defaultValue="Marla">
                                                        <option>Marla</option>
                                                        <option>Kanal</option>
                                                        <option>Square Feet</option>
                                                        <option>Square Yards</option>
                                                        <option>Square Meters</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </div>

                                            {/* Save Button */}
                                            <div className="text-end mt-4">
                                                <Button variant="success" className="px-4">
                                                    Save Changes
                                                </Button>
                                            </div>
                                        </>
                                    )}

                                    {active === "password" && (
                                        <>
                                            <h5 className="fw-bold mb-3">Change Password</h5>
                                            <Form>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Current Password</Form.Label>
                                                    <Form.Control type="password" placeholder="Enter current password" />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>New Password</Form.Label>
                                                    <Form.Control type="password" placeholder="Enter new password" />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Confirm Password</Form.Label>
                                                    <Form.Control type="password" placeholder="Confirm new password" />
                                                </Form.Group>
                                            </Form>
                                        </>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section >
        </>
    );
}
