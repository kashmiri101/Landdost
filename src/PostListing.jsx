import React, { useState, useEffect, useRef } from "react";
import { Container, Navbar, Nav, Button, Offcanvas, Row, Col, Form, Tabs, Tab, Card, Badge, InputGroup } from "react-bootstrap";
import { FaBars, FaHome, FaPlusCircle, FaBuilding, FaEnvelope, FaCog, FaClipboardList, FaUserCircle } from "react-icons/fa";
import { AiOutlineEnvironment, AiOutlineHome } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { faHouse, faBed, faBath, faLightbulb, faFileAlt, faT, faImage, faVideo, faEnvelope, faPhone, faMobileAlt, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";


export default function PostListing() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // API INTEGRATION 
    // Switches
    // Switches
    const navigate = useNavigate();

    // States
    const [installment, setInstallment] = useState(false);
    const [possession, setPossession] = useState(false);
    const [selectedBedroom, setSelectedBedroom] = useState(null);
    const [selectedBathroom, setSelectedBathroom] = useState(null);
    const bedrooms = [1, 2, 3, 4, 5];
    const bathrooms = [1, 2, 3, 4];

    const [features, setFeatures] = useState([]);
    const [amenities, setAmenities] = useState([]);
    const [videos, setVideos] = useState([]);
    const [images, setImages] = useState([]);
    const imageInputRef = useRef();

    const [formData, setFormData] = useState({
        title: "",
        purpose: "",
        propertyType: "Home",
        city: "",
        location: "",
        price: "",
        area: "",
        areaUnit: "Sq. M",
        description: "",
        email: "",
        mobile: "",
        landline: "",
    });

    const [errors, setErrors] = useState({});

    // Auth check
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) navigate("/login");
    }, [navigate]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setImages((prev) => [...prev, ...files]);
    };

    const handleAddVideo = () => {
        const link = prompt("Paste YouTube video link:");
        if (link) setVideos((prev) => [...prev, link]);
    };

    const handleAddAmenity = () => {
        const amenity = prompt("Enter amenity:");
        if (amenity) setAmenities((prev) => [...prev, amenity]);
    };

    // Validation
    const validateForm = () => {
        const newErrors = {};
        if (!formData.title) newErrors.title = "Title is required";
        if (!formData.purpose) newErrors.purpose = "Purpose is required";
        if (!formData.propertyType) newErrors.propertyType = "Property type is required";
        if (!formData.city) newErrors.city = "City is required";
        if (!formData.location) newErrors.location = "Location is required";

        if (!formData.price) newErrors.price = "Price is required";
        else if (isNaN(formData.price) || Number(formData.price) <= 0) newErrors.price = "Enter a valid price";

        if (!formData.area) newErrors.area = "Area is required";
        else if (isNaN(formData.area) || Number(formData.area) <= 0) newErrors.area = "Enter a valid area";

        if (!formData.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Enter a valid email";

        if (!formData.mobile) newErrors.mobile = "Mobile number is required";
        else if (!/^[0-9]{10,15}$/.test(formData.mobile)) newErrors.mobile = "Enter a valid mobile number";

        if (!selectedBedroom) newErrors.bedrooms = "Select number of bedrooms";
        if (!selectedBathroom) newErrors.bathrooms = "Select number of bathrooms";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please login first!");
                navigate("/login");
                return;
            }

            const payload = new FormData();
            payload.append("title", formData.title);
            payload.append("purpose", formData.purpose);
            payload.append("propertyType", formData.propertyType);
            payload.append("city", formData.city);
            payload.append("location", formData.location);
            payload.append("price", Number(formData.price));
            payload.append("area", Number(formData.area));
            payload.append("areaUnit", formData.areaUnit);
            payload.append("description", formData.description);
            payload.append("email", formData.email);
            payload.append("mobile", formData.mobile);
            payload.append("landline", formData.landline);
            payload.append("bedrooms", selectedBedroom);
            payload.append("bathrooms", selectedBathroom);
            payload.append("installmentAvailable", installment ? 1 : 0);
            payload.append("readyForPossession", possession ? 1 : 0);

            features.forEach((f, i) => payload.append(`features[${i}]`, f));
            amenities.forEach((a, i) => payload.append(`amenities[${i}]`, a));
            videos.forEach((v, i) => payload.append(`videos[${i}]`, v));
            images.forEach((img) => payload.append("images[]", img));

            const response = await axios.post(
                "https://bostangroupinc.com/api/properties",
                payload,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Submitted:", response.data);
            alert("Property submitted successfully!");
        } catch (error) {
            console.error("Error submitting property:", error);
            alert("Failed to submit property.");
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


            {/* Main Content */}
            <main className="" style={{ marginLeft: "0px" }}>
                {/* Section 1 */}
                <section className="bg-light pt-5">
                    <Container className="py-4">
                        <div className="bg-light p-3 rounded mb-4 text-center">
                            <img src="images/header-add-property.png" alt="" className="img-fluid" />
                        </div>

                        <div className="bg-white p-4 shadow-sm rounded">
                            <Row className="gy-4">
                                <Col xs={12} md={3} className="mb-3 mb-md-0 d-flex flex-column align-items-center text-center">
                                    <AiOutlineEnvironment size={40} className="mb-2 text-success" />
                                    <h6>Location and Purpose</h6>
                                </Col>

                                <Col xs={12} md={9}>
                                    {/* Purpose */}
                                    <h6>Select Purpose</h6>
                                    <div className={`d-flex flex-wrap mb-3 gap-2 ${errors.purpose ? 'border border-danger rounded p-2' : ''}`}>
                                        <Button
                                            variant={formData.purpose === "Sale" ? "success" : "outline-success"}
                                            className="rounded-pill"
                                            onClick={() => setFormData({ ...formData, purpose: "Sale" })}
                                        >
                                            Sell
                                        </Button>
                                        <Button
                                            variant={formData.purpose === "Rent" ? "success" : "outline-secondary"}
                                            className="rounded-pill"
                                            onClick={() => setFormData({ ...formData, purpose: "Rent" })}
                                        >
                                            Rent
                                        </Button>
                                    </div>
                                    {errors.purpose && <small className="text-danger">{errors.purpose}</small>}

                                    {/* Property Type */}
                                    <h6 className="mt-3">Select Property Type</h6>
                                    <Tabs defaultActiveKey="home" className="mb-3">
                                        <Tab eventKey="home" title="Home">
                                            <div className={`d-flex flex-wrap gap-2 ${errors.propertyType ? 'border border-danger rounded p-2' : ''}`}>
                                                {["House", "Flat", "Upper Portion", "Lower Portion", "Farm House", "Room", "Penthouse"].map((type) => (
                                                    <Button
                                                        key={type}
                                                        variant={formData.propertyType === type ? "success" : "outline-success"}
                                                        className="rounded-pill"
                                                        onClick={() => setFormData({ ...formData, propertyType: type })}
                                                    >
                                                        {type}
                                                    </Button>
                                                ))}
                                            </div>
                                            {errors.propertyType && <small className="text-danger">{errors.propertyType}</small>}
                                        </Tab>
                                        <Tab eventKey="plots" title="Plots"></Tab>
                                        <Tab eventKey="commercial" title="Commercial"></Tab>
                                    </Tabs>

                                    {/* City */}
                                    <Form.Group className="mt-3 mb-4">
                                        <Form.Label>City</Form.Label>
                                        <Form.Select
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            isInvalid={!!errors.city}
                                        >
                                            <option value="">Select City</option>
                                            <option>Lahore</option>
                                            <option>Karachi</option>
                                            <option>Islamabad</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
                                    </Form.Group>

                                    {/* Location */}
                                    <div className="mb-3">
                                        <h6 className="mb-2">Location</h6>
                                        <Form.Select
                                            className={`mb-3 ${errors.location ? 'is-invalid' : ''}`}
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                        >
                                            <option value="">Search Location</option>
                                            <option>Phase 1</option>
                                            <option>Phase 2</option>
                                        </Form.Select>
                                        {errors.location && <small className="text-danger">{errors.location}</small>}

                                        <div className="d-flex justify-content-center align-items-center rounded"
                                            style={{ height: "120px", backgroundColor: "#f8f8f8", border: "1px solid #e0e0e0", position: "relative" }}>
                                            <span style={{ fontSize: "24px", color: "#33A137" }}>📍</span>
                                            <Button variant="outline-success" size="sm" className="position-absolute" style={{ bottom: "10px" }}>
                                                Set Location on Map
                                            </Button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </section>

                {/* Section 2 */}
                <section className="py-4 bg-light">
                    <Container>
                        <Card className="my-4 shadow-sm rounded-3 border-0">
                            <Card.Body className="p-4">
                                {/* Header */}
                                <div className="d-flex align-items-center border-bottom pb-3 mb-4">
                                    <div className="d-flex align-items-center justify-content-center rounded me-3"
                                        style={{ width: "40px", height: "40px", background: "#f5f7fa", border: "1px solid #e6e6e6" }}>
                                        <FontAwesomeIcon icon={faTags} className="text-success" />
                                    </div>
                                    <h5 className="mb-0 fw-semibold">Price and Area</h5>
                                </div>

                                {/* Area */}
                                <Form.Group as={Row} className="mb-4 align-items-center">
                                    <Form.Label column sm="3" className="fw-semibold">Area Size</Form.Label>
                                    <Col sm="9">
                                        <Row>
                                            <Col>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Unit"
                                                    name="area"
                                                    value={formData.area}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.area}
                                                    className="rounded-2"
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.area}
                                                </Form.Control.Feedback>
                                            </Col>
                                            <Col sm="4">
                                                <Form.Select
                                                    name="areaUnit"
                                                    value={formData.areaUnit}
                                                    onChange={handleChange}
                                                    className="rounded-2"
                                                >
                                                    <option>Marla</option>
                                                    <option>Kanal</option>
                                                    <option>Sq. Ft</option>
                                                    <option>Sq. M</option>
                                                </Form.Select>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Form.Group>

                                {/* Price */}
                                <Form.Group as={Row} className="mb-4 align-items-center">
                                    <Form.Label column sm="3" className="fw-semibold">Price</Form.Label>
                                    <Col sm="9">
                                        <Row>
                                            <Col>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Price"
                                                    name="price"
                                                    value={formData.price}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.price}
                                                    className="rounded-2"
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.price}
                                                </Form.Control.Feedback>
                                            </Col>
                                            <Col sm="4">
                                                <Form.Select className="rounded-2"></Form.Select>
                                            </Col>
                                            <Col sm="3">
                                                <Button variant="outline-success" className="w-100 d-flex align-items-center justify-content-center rounded-2">
                                                    <FontAwesomeIcon icon={faCircleInfo} className="me-1" /> Price Check
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Form.Group>

                                {/* Installment */}
                                <Form.Group as={Row} className="mb-3">
                                    <Col>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <Form.Label className="fw-semibold mb-0">Installment available</Form.Label>
                                                <p className="text-muted mb-0 small">Enable if listing is available on installments</p>
                                            </div>
                                            <Form.Check
                                                type="switch"
                                                id="installment-switch"
                                                checked={installment}
                                                onChange={(e) => setInstallment(e.target.checked)}
                                            />
                                        </div>
                                    </Col>
                                </Form.Group>

                                {/* Possession */}
                                <Form.Group as={Row}>
                                    <Col>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <Form.Label className="fw-semibold mb-0">Ready for Possession</Form.Label>
                                                <p className="text-muted mb-0 small">Enable if listing is ready for possession</p>
                                            </div>
                                            <Form.Check
                                                type="switch"
                                                id="possession-switch"
                                                checked={possession}
                                                onChange={(e) => setPossession(e.target.checked)}
                                            />
                                        </div>
                                    </Col>
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Container>
                </section>


                {/* section 3  */}
                <section className="py-4 bg-light">
                    <Container>
                        <Card className="my-4 shadow-sm rounded-3 border-0">
                            <Card.Body className="p-4">

                                {/* Header */}
                                <div className="d-flex align-items-center border-bottom pb-3 mb-4">
                                    <div
                                        className="d-flex align-items-center justify-content-center rounded me-3"
                                        style={{
                                            width: "40px",
                                            height: "40px",
                                            background: "#f5f7fa",
                                            border: "1px solid #e6e6e6",
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faHouse} className="text-success" />
                                    </div>
                                    <h5 className="mb-0 fw-semibold">Feature and Amenities</h5>
                                </div>

                                {/* Bedrooms */}
                                <div className="mb-4">
                                    <h6 className="fw-semibold mb-2">
                                        <FontAwesomeIcon icon={faBed} className="me-2 text-success" />
                                        Bedrooms
                                    </h6>
                                    <div className="d-flex flex-wrap gap-2">
                                        {bedrooms.map((bed, index) => (
                                            <Button
                                                key={index}
                                                variant={selectedBedroom === bed ? "success" : "outline-success"}
                                                className="rounded-pill px-3 py-1"
                                                onClick={() => setSelectedBedroom(bed)}
                                            >
                                                {bed}
                                            </Button>
                                        ))}
                                    </div>
                                    {errors.bedrooms && <div className="text-danger mt-1">{errors.bedrooms}</div>}
                                </div>

                                {/* Bathrooms */}
                                <div className="mb-4">
                                    <h6 className="fw-semibold mb-2">
                                        <FontAwesomeIcon icon={faBath} className="me-2 text-success" />
                                        Bathrooms
                                    </h6>
                                    <div className="d-flex flex-wrap gap-2">
                                        {bathrooms.map((bath, index) => (
                                            <Button
                                                key={index}
                                                variant={selectedBathroom === bath ? "success" : "outline-success"}
                                                className="rounded-pill px-3 py-1"
                                                onClick={() => setSelectedBathroom(bath)}
                                            >
                                                {bath}
                                            </Button>
                                        ))}
                                    </div>
                                    {errors.bathrooms && <div className="text-danger mt-1">{errors.bathrooms}</div>}
                                </div>

                                {/* Amenities */}
                                <div className="mb-3 d-flex flex-column">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h6 className="fw-semibold mb-1">Feature and Amenities</h6>
                                            <p className="text-muted small mb-0">
                                                Add additional features e.g. parking spaces, waste disposal, internet etc.
                                            </p>
                                        </div>
                                        <Button variant="success" className="rounded-1" onClick={handleAddAmenity}>
                                            Add Amenities
                                        </Button>
                                    </div>
                                    <ul className="mt-2">
                                        {amenities.map((a, i) => (
                                            <li key={i}>{a}</li>
                                        ))}
                                    </ul>
                                    {errors.amenities && <div className="text-danger mt-1">{errors.amenities}</div>}
                                </div>

                                {/* Quality Tip Box */}
                                <div
                                    className="d-flex justify-content-between align-items-center p-3 rounded-2"
                                    style={{
                                        background: "#f1fdf4",
                                        border: "1px solid #d6f5de",
                                    }}
                                >
                                    <div className="d-flex align-items-center">
                                        <FontAwesomeIcon icon={faLightbulb} className="me-2 text-success" />
                                        <div>
                                            <strong>Quality Tip</strong>
                                            <p className="text-muted small mb-0">Add at least 5 amenities</p>
                                        </div>
                                    </div>
                                    <Badge bg="danger" pill>
                                        0%
                                    </Badge>
                                </div>

                            </Card.Body>
                        </Card>
                    </Container>
                </section>


                {/* section 4  */}
                <section className="py-4 bg-light">
                    <Container>
                        <Card className="my-4 shadow-sm rounded-3 border-0">
                            <Card.Body className="p-4">

                                {/* Header */}
                                <div className="d-flex align-items-center border-bottom pb-3 mb-4">
                                    <div
                                        className="d-flex align-items-center justify-content-center rounded me-3"
                                        style={{
                                            width: "40px",
                                            height: "40px",
                                            background: "#f5f7fa",
                                            border: "1px solid #e6e6e6",
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faFileAlt} className="text-success" />
                                    </div>
                                    <h5 className="mb-0 fw-semibold">Ad Information</h5>
                                </div>

                                {/* Title */}
                                <div className="mb-4 d-flex flex-column">
                                    <div className="d-flex align-items-start">
                                        <div
                                            className="d-flex align-items-center justify-content-center rounded me-3"
                                            style={{
                                                width: "32px",
                                                height: "32px",
                                                background: "#f5f7fa",
                                                border: "1px solid #e6e6e6",
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faT} className="text-secondary" />
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="fw-semibold mb-2">Title</h6>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter property title e.g. Beautiful House in DHA Phase 5"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleChange}
                                            />
                                            {errors.title && <div className="text-danger mt-1">{errors.title}</div>}
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="d-flex flex-column">
                                    <div className="d-flex align-items-start">
                                        <div
                                            className="d-flex align-items-center justify-content-center rounded me-3"
                                            style={{
                                                width: "32px",
                                                height: "32px",
                                                background: "#f5f7fa",
                                                border: "1px solid #e6e6e6",
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faFileAlt} className="text-secondary" />
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="fw-semibold mb-2">Description</h6>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                placeholder="Describe your property, its features, area it is in etc."
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                            />
                                            {errors.description && <div className="text-danger mt-1">{errors.description}</div>}
                                        </div>
                                    </div>
                                </div>

                            </Card.Body>
                        </Card>
                    </Container>
                </section>


                {/* section 5  */}
                <section className="py-4 bg-light">
                    <Container>
                        <Card className="my-4 shadow-sm rounded-3 border-0">
                            <Card.Body className="p-4">

                                {/* Header */}
                                <div className="d-flex align-items-center border-bottom pb-3 mb-4">
                                    <div
                                        className="d-flex align-items-center justify-content-center rounded me-3"
                                        style={{
                                            width: "40px",
                                            height: "40px",
                                            background: "#f5f7fa",
                                            border: "1px solid #e6e6e6",
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faFileAlt} className="text-success" />
                                    </div>
                                    <h5 className="mb-0 fw-semibold">Property Images and Videos</h5>
                                </div>

                                {/* Upload Images */}
                                <div className="d-flex flex-column mb-4">
                                    <div className="d-flex align-items-start">
                                        <div
                                            className="d-flex align-items-center justify-content-center rounded me-3"
                                            style={{
                                                width: "32px",
                                                height: "32px",
                                                background: "#f5f7fa",
                                                border: "1px solid #e6e6e6",
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faImage} className="text-secondary" />
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="fw-semibold mb-2">Upload Images of your Property</h6>
                                            <div
                                                className="p-3 rounded border border-success-subtle mb-1"
                                                style={{ borderStyle: "dashed" }}
                                            >
                                                <div className="d-flex align-items-center mb-3 gap-2">
                                                    <Button
                                                        variant="success"
                                                        className="px-4 fw-semibold"
                                                        onClick={() => imageInputRef.current.click()}
                                                    >
                                                        Upload Images
                                                    </Button>
                                                    <input
                                                        type="file"
                                                        ref={imageInputRef}
                                                        multiple
                                                        accept="image/*"
                                                        style={{ display: "none" }}
                                                        onChange={handleImageUpload}
                                                    />
                                                    <Button variant="light" className="px-4 border">
                                                        Image Bank
                                                    </Button>
                                                    <small className="text-muted ms-2">
                                                        Max size 5MB, .jpg, .png only
                                                    </small>
                                                </div>

                                                {/* Preview */}
                                                <div className="d-flex flex-wrap gap-2">
                                                    {images.map((img, i) => (
                                                        <img
                                                            key={i}
                                                            src={URL.createObjectURL(img)}
                                                            alt="preview"
                                                            width="80"
                                                            height="80"
                                                            className="rounded border"
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            {/* Error Message */}
                                            {errors.images && <div className="text-danger mt-1">{errors.images}</div>}
                                        </div>
                                    </div>
                                </div>

                                {/* Add Video */}
                                <div className="d-flex flex-column">
                                    <div className="d-flex align-items-start">
                                        <div
                                            className="d-flex align-items-center justify-content-center rounded me-3"
                                            style={{
                                                width: "32px",
                                                height: "32px",
                                                background: "#f5f7fa",
                                                border: "1px solid #e6e6e6",
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faVideo} className="text-secondary" />
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="fw-semibold mb-2">Add Videos of your Property</h6>
                                            <p className="text-muted small">
                                                Add videos of your property from Youtube. Upload on Youtube and paste the link below.
                                            </p>
                                            <Button
                                                variant="outline-success"
                                                className="px-4 fw-semibold"
                                                onClick={handleAddVideo}
                                            >
                                                Add Video
                                            </Button>
                                            <ul className="mt-2">
                                                {videos.map((v, i) => (
                                                    <li key={i}>{v}</li>
                                                ))}
                                            </ul>
                                            {/* Error Message */}
                                            {errors.videos && <div className="text-danger mt-1">{errors.videos}</div>}
                                        </div>
                                    </div>
                                </div>

                            </Card.Body>
                        </Card>
                    </Container>
                </section>


                {/* section 6  */}
                <section className="py-4 bg-light">
                    <Container>
                        <Card className="shadow-sm border-0 rounded-3">
                            <Card.Body className="p-4">
                                <Row>
                                    {/* Left Side Label */}
                                    <Col md={3} className="border-end">
                                        <div className="d-flex flex-column align-items-center">
                                            <div
                                                className="d-flex align-items-center justify-content-center rounded mb-3"
                                                style={{
                                                    width: "48px",
                                                    height: "48px",
                                                    background: "#f5f7fa",
                                                    border: "1px solid #e6e6e6",
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faCheckCircle} className="text-success" />
                                            </div>
                                            <h6 className="fw-semibold text-center">Contact Information</h6>
                                        </div>
                                    </Col>

                                    {/* Right Side Fields */}
                                    <Col md={9}>
                                        <Form>
                                            {/* Email */}
                                            <Form.Group className="mb-4 d-flex align-items-center">
                                                <div
                                                    className="d-flex align-items-center justify-content-center rounded me-3"
                                                    style={{
                                                        width: "32px",
                                                        height: "32px",
                                                        background: "#f5f7fa",
                                                        border: "1px solid #e6e6e6",
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faEnvelope} className="text-secondary" />
                                                </div>
                                                <div className="flex-grow-1">
                                                    <Form.Label className="fw-semibold mb-1">Email</Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        placeholder="Enter your email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        name="email"
                                                    />
                                                    {errors.email && <div className="text-danger mt-1">{errors.email}</div>}
                                                </div>
                                            </Form.Group>

                                            {/* Mobile */}
                                            <Form.Group className="mb-4 d-flex align-items-center">
                                                <div
                                                    className="d-flex align-items-center justify-content-center rounded me-3"
                                                    style={{
                                                        width: "32px",
                                                        height: "32px",
                                                        background: "#f5f7fa",
                                                        border: "1px solid #e6e6e6",
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faMobileAlt} className="text-secondary" />
                                                </div>
                                                <div className="flex-grow-1">
                                                    <Form.Label className="fw-semibold mb-1">Mobile</Form.Label>
                                                    <InputGroup>
                                                        <InputGroup.Text>
                                                            <span role="img" aria-label="flag">🇵🇰</span>
                                                        </InputGroup.Text>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="+92"
                                                            value={formData.mobile}
                                                            onChange={handleChange}
                                                            name="mobile"
                                                        />
                                                        <Button variant="outline-success">+</Button>
                                                    </InputGroup>
                                                    {errors.mobile && <div className="text-danger mt-1">{errors.mobile}</div>}
                                                </div>
                                            </Form.Group>

                                            {/* Landline */}
                                            <Form.Group className="mb-4 d-flex align-items-center">
                                                <div
                                                    className="d-flex align-items-center justify-content-center rounded me-3"
                                                    style={{
                                                        width: "32px",
                                                        height: "32px",
                                                        background: "#f5f7fa",
                                                        border: "1px solid #e6e6e6",
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faPhone} className="text-secondary" />
                                                </div>
                                                <div className="flex-grow-1">
                                                    <Form.Label className="fw-semibold mb-1">Landline</Form.Label>
                                                    <InputGroup>
                                                        <InputGroup.Text>
                                                            <span role="img" aria-label="flag">🇵🇰</span>
                                                        </InputGroup.Text>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="+92"
                                                            value={formData.landline}
                                                            onChange={handleChange}
                                                            name="landline"
                                                        />
                                                    </InputGroup>
                                                    {errors.landline && <div className="text-danger mt-1">{errors.landline}</div>}
                                                </div>
                                            </Form.Group>

                                        </Form>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Container>

                    {/* Submit Button */}
                    <div className="d-flex justify-content-center">
                        <Button
                            variant="success"
                            className="px-5 fw-semibold mt-5"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </div>
                </section>

            </main>
        </>
    );
}
