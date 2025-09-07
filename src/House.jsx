import React, { useState, useCallback, useEffect, useRef } from "react";
import { Container, Row, Col, Button, Form, Badge, Card, Nav, Accordion, Image, InputGroup } from "react-bootstrap";
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faArrowRight, faHome } from "@fortawesome/free-solid-svg-icons";
import { Home, Map, Building2 } from "lucide-react";
import { faMapMarkerAlt, faPhone, faClock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";


export default function House() {
    const [city, setCity] = useState("Islamabad");
    const [showFilters, setShowFilters] = useState(false);
    // city and location API 
    const [files, setFiles] = useState([]);
    const [coverIndex, setCoverIndex] = useState(null);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [locationInput, setLocationInput] = useState("");
    const [locationSuggestions, setLocationSuggestions] = useState([]);


    const cityLocationMap = {
        Lahore: [], Karachi: [], Islamabad: [], Rawalpindi: [], Multan: [],
        Faisalabad: [], Peshawar: [], Gujranwala: [], Sialkot: [], Hyderabad: [],
        Quetta: [], Bahawalpur: [], Sargodha: [], Sahiwal: [], Abbottabad: [],
        Murree: [], WahCantt: [], Mardan: [], Mansehra: [], Jhelum: [],
        AhmedpurEast: [], Arifwala: [], Attock: [], Bannu: [], Batkhela: [],
        Bhakkar: [], Burewala: [], Chakwal: [], Charsadda: [], Chiniot: [],
        Dadu: [], Daska: [], DeraGhaziKhan: [], DeraIsmailKhan: [], Gawadar: [],
        Gujrat: [], Hafizabad: [], Haripur: [], Jacobabad: [], Jaranwala: [],
        Jhang: [], Kamoke: [], Kasur: [], Khairpur: [], Khanewal: [],
        Khanpur: [], Khushab: [], Kohat: [], KotAddu: [], Kotli: [],
        Layyah: [], Lodhran: [], MandiBahauddin: [], MianChannu: [], Mianwali: [],
        MirpurAJK: [], MirpurKhas: [], Muzaffargarh: [], MuzaffarabadAJK: [],
        NankanaSahib: [], Narowal: [], Nawabshah: [], Okara: [], Pakpattan: [],
        RahimYarKhan: [], Sadiqabad: [], Sheikhupura: [], Shikarpur: [], Sukkur: [],
        Swabi: [], Swat: [], TandoAdam: [], TandoAllahyar: [], Taxila: [],
        TobaTekSingh: [], Vehari: [],
    };

    const handleTradeTypeSelect = (type) => setSelectedTradeTypeBtn(type);

    const onDrop = useCallback((acceptedFiles) => {
        const mapped = acceptedFiles.map(file =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
        );
        setFiles(curr => [...curr, ...mapped]);
        if (coverIndex === null && mapped.length) setCoverIndex(0);
    }, [coverIndex]);

    const { getRootProps, getInputProps } = useDropzone({ accept: { 'image/*': [] }, onDrop });

    useEffect(() => {
        return () => files.forEach(f => URL.revokeObjectURL(f.preview));
    }, [files]);

    useEffect(() => {
        if (!selectedCity || locationInput.length < 3) {
            setLocationSuggestions([]);
            return;
        }

        const fetchLocations = async () => {
            setLoading(true);
            try {
                const query = `${locationInput}, ${selectedCity}, Pakistan`;
                const url = `https://corsproxy.io/?https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                    query
                )}&limit=5&addressdetails=1&countrycodes=pk`;

                const res = await fetch(url);
                const data = await res.json();
                const suggestions = data.map((loc) => loc.display_name);
                setLocationSuggestions(suggestions);
            } catch (err) {
                console.error("Error fetching location suggestions:", err);
                setLocationSuggestions([]);
            } finally {
                setLoading(false);
            }
        };

        const delayDebounceFn = setTimeout(fetchLocations, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [locationInput, selectedCity]);

    useEffect(() => {
        setSelectedLocation('');
        setLocationInput('');
        setLocationSuggestions([]);
    }, [selectedCity]);

    const handleLocationSelect = (loc) => {
        setLocationInput(loc);
        setLocationSuggestions([]);
        setSelectedLocation(loc);
    };

    //   section 1 
    // property 
    const [activeTab, setActiveTab] = useState("popular");

    const renderOptions = (options) =>
        options.map((option, i) => (
            <Button
                key={i}
                variant="light"
                className=" px-3 py-2 border me-2 mb-2 shadow-sm"
                style={{ fontSize: "14px" }}
            >
                {option}
            </Button>
        ));

    const homeOptions = {
        popular: ["5 Marla Houses", "10 Marla Houses", "15 Marla Houses", "New Houses", "Low Prices All Homes", "Small Houses"],
        type: ["Luxury Houses", "Commercial Houses", "Independent Houses"],
        area: ["3 Marla", "5 Marla", "10 Marla", "1 Kanal"]
    };

    const plotOptions = {
        popular: ["5 Marla Plots", "10 Marla Plots", "1 Kanal Plots", "New Plots", "Low Prices Plots", "Commercial Plots"],
        type: ["Residential Plots", "Commercial Plots", "Agricultural Land"],
        area: ["3 Marla", "5 Marla", "10 Marla", "1 Kanal"]
    };

    const apartmentOptions = {
        popular: ["2 Bed Apartments", "3 Bed Apartments", "Luxury Apartments", "New Apartments", "Low Price Apartments",],
        type: ["Studio", "Penthouse", "Duplex"],
        area: ["500 sq ft", "1000 sq ft", "1500 sq ft"]
    };

    const renderCard = (icon, title, options) => (
        <Card className="p-3 shadow-sm rounded-3 h-100" style={{ border: "2px solid #9AA0A1" }}>
            <div className="d-flex align-items-center mb-3">
                {icon}
                <h5 className="fw-bold mb-0 ms-2">{title}</h5>
            </div>
            <Nav
                variant="tabs"
                activeKey={activeTab}
                onSelect={(selectedKey) => setActiveTab(selectedKey)}
                className="mb-3"
            >
                <Nav.Item>
                    <Nav.Link eventKey="popular" className="text-dark">Popular</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="type" className="text-dark">Type</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="area" className="text-dark">Area Size</Nav.Link>
                </Nav.Item>
            </Nav>
            <div className="d-flex flex-wrap">{renderOptions(options[activeTab])}</div>
        </Card>
    );


    // section 2 
    // Featured Properties 
    const properties = [
        {
            title: "Luxury Family Home",
            price: "$395,000",
            address: "1800-1818 79th St",
            beds: 4,
            baths: 1,
            sqft: 400,
            img: "/images/f1.jpg",
            tags: ["For Sale", "Featured"],
        },
        {
            title: "Skyper Pool Apartment",
            price: "$280,000",
            address: "1020 Bloomingdale Ave",
            beds: 4,
            baths: 2,
            sqft: 450,
            img: "/images/f2.jpg",
            tags: ["For Sale"],
        },
        {
            title: "North Dillard Street",
            price: "$250/month",
            address: "4330 Bell Shoals Rd",
            beds: 4,
            baths: 2,
            sqft: 400,
            img: "/images/f3.jpg",
            tags: ["For Rent"],
        },
        {
            title: "Eaton Garth Penthouse",
            price: "$180,000",
            address: "7722 18th Ave, Brooklyn",
            beds: 4,
            baths: 2,
            sqft: 450,
            img: "/images/f4.jpg",
            tags: ["For Sale", "Featured"],
        },
        {
            title: "New Apartment Nice View",
            price: "$850/month",
            address: "42 Avenue D, Brooklyn",
            beds: 4,
            baths: 1,
            sqft: 400,
            img: "/images/f5.jpg",
            tags: ["For Rent", "Featured"],
        },
        {
            title: "Diamond Manor Apartment",
            price: "$259,000",
            address: "7802 20th Ave, Brooklyn",
            beds: 4,
            baths: 2,
            sqft: 500,
            img: "/images/f6.jpg",
            tags: ["For Sale", "Featured"],
        },
        {
            title: "Eaton Garth Penthouse",
            price: "$180,000",
            address: "7722 18th Ave, Brooklyn",
            beds: 4,
            baths: 2,
            sqft: 450,
            img: "/images/f7.jpg",
            tags: ["For Sale", "Featured"],
        },
        {
            title: "New Appartment",
            price: "$850/month",
            address: "7802 20th Ave, Brooklyn",
            beds: 4,
            baths: 2,
            sqft: 500,
            img: "/images/f8.jpg",
            tags: ["For Sale", "Featured"],
        },
        {
            title: "Diamond Manor Apartment",
            price: "$259,000",
            address: "7802 20th Ave, Brooklyn",
            beds: 4,
            baths: 2,
            sqft: 500,
            img: "/images/f9.jpg",
            tags: ["For Sale", "Featured"],
        },
    ];

    // section 3 
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

        // Clear error for this field
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: "" });
        }
    };

    // Validate form fields
    const validate = () => {
        let newErrors = {};
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.phone) newErrors.phone = "Phone number is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.subject) newErrors.subject = "Subject is required";
        if (!formData.message) newErrors.message = "Message is required";
        return newErrors;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                "https://bostangroupinc.com/api/qaQuestion", // remove trailing slash
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    timeout: 15000,
                }
            );

            console.log("Response:", response.data);
            alert("Your question has been sent successfully!");
            setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
            setErrors({});
        } catch (error) {
            if (error.response) {
                // Server responded with an error
                console.error("Response error:", error.response);
                const serverMsg =
                    typeof error.response.data === "string"
                        ? error.response.data
                        : JSON.stringify(error.response.data);
                alert(`Request failed (status ${error.response.status}).\nDetails: ${serverMsg}`);
            } else if (error.request) {
                // No response (likely CORS)
                console.error("No response received:", error.request);
                alert(
                    "No response from server. This is often a CORS or network issue.\n" +
                    "Check browser Console → Network tab for details."
                );
            } else {
                console.error("Error setting up request:", error.message);
                alert(`Error: ${error.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* House hero section  */}
            {/* Hero section  */}
            <section className='hero'>
                <div
                    style={{
                        background: "rgba(0, 0, 0, 0.6) url('/images/Househero.jpg')", // Change to your image path
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundBlendMode: "darken",
                        minHeight: "100vh",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        color: "white",
                        textAlign: "center",
                    }}
                >
                    {/* Heading */}
                    <Container className="py-5">
                        <h1 className="fw-bold display-5">
                            Find Your Perfect Home,<br></br> Achieve True Comfort
                        </h1>
                        <p className="lead" style={{ maxWidth: "650px", margin: "0 auto" }}>
                            Browse our diverse property listings, offering expert guidance for buying, renting, or selling your ideal home.
                        </p>

                        {/* Category Buttons */}
                        <div className="mt-4 mb-5">
                            <Button
                                variant=""
                                className="mx-2 px-4 py-2 fw-semibold border-light text-light"
                                style={{ background: "#33A137" }}
                            >
                                BUY
                            </Button>
                            <Button
                                variant=""
                                className="mx-2 px-4 py-2 fw-semibold text-light border-light"
                            >
                                SELL
                            </Button>
                            <Button
                                variant=""
                                className="mx-2 px-4 py-2 fw-semibold border-light text-light"
                                style={{ background: "#33A137" }}
                            >
                                RENT
                            </Button>
                        </div>

                        {/* Search Bar */}
                        <div
                            className="p-3 rounded shadow-lg"
                            style={{
                                backgroundColor: "white",
                                color: "black",
                                maxWidth: "900px",
                                margin: "0 auto",
                            }}
                        >
                            {/* First Row */}
                            <Row className="g-2">
                                {/* City Dropdown */}
                                <Col lg={4}>
                                    <Form.Group className="rounded bg-light border">
                                        <Form.Select
                                            value={selectedCity}
                                            onChange={(e) => setSelectedCity(e.target.value)}
                                            className="shadow-none bg-light"
                                        >
                                            <option value="">Select City</option>
                                            {Object.keys(cityLocationMap).map((city) => (
                                                <option key={city} value={city}>
                                                    {city.replace(/([A-Z])/g, " $1").trim()}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>

                                {/* Location Input */}
                                <Col lg={6}>
                                    <Form.Group className="rounded bg-light border">
                                        <Form.Control
                                            type="text"
                                            placeholder="Type location here"
                                            value={locationInput}
                                            onChange={(e) => setLocationInput(e.target.value)}
                                            autoComplete="off"
                                            className="shadow-none bg-light"
                                            onFocus={() => setShowFilters(true)}
                                        />
                                        {loading && <div className="position-absolute mt-1">Loading...</div>}
                                        {locationSuggestions.length > 0 && (
                                            <ul className="list-group position-absolute w-100" style={{ zIndex: 1000, maxHeight: "200px", overflowY: "auto" }}>
                                                {locationSuggestions.map((loc, i) => (
                                                    <li
                                                        key={i}
                                                        className="list-group-item list-group-item-action"
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => handleLocationSelect(loc)}
                                                    >
                                                        {loc}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </Form.Group>
                                </Col>

                                {/* Find Button */}
                                <Col lg={2}>
                                    <Button variant="light" className="w-100 border text-light" style={{ background: "#33A137" }}>
                                        FINDE
                                    </Button>
                                </Col>
                            </Row>

                            {/* Second Row - Extra Filters */}
                            {showFilters && (
                                <Row className="mt-3 g-2">
                                    {/* Property Type */}
                                    <Col lg={3}>
                                        <Form.Select>
                                            <option>Property Type</option>
                                            <option>House</option>
                                            <option>Flat</option>
                                            <option>Plot</option>
                                        </Form.Select>
                                    </Col>

                                    {/* Price */}
                                    <Col lg={3}>
                                        <Form.Select>
                                            <option>Price</option>
                                            <option>Below 50 Lakh</option>
                                            <option>50 Lakh - 1 Crore</option>
                                            <option>Above 1 Crore</option>
                                        </Form.Select>
                                    </Col>

                                    {/* Area (Marla) */}
                                    <Col lg={3}>
                                        <Form.Select>
                                            <option>Area (Marla)</option>
                                            <option>3 Marla</option>
                                            <option>5 Marla</option>
                                            <option>10 Marla</option>
                                            <option>1 Kanal</option>
                                        </Form.Select>
                                    </Col>

                                    {/* Beds */}
                                    <Col lg={3}>
                                        <Form.Select>
                                            <option>Beds</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4+</option>
                                        </Form.Select>
                                    </Col>
                                </Row>
                            )}

                            {/* Bottom Links */}
                            <Row className="mt-2">
                                <Col className="text-start">
                                    <a href="#" className="me-3 text-muted small">
                                        ▾ More Options
                                    </a>
                                    <a href="#" className="me-3 text-primary small">
                                        Change Currency
                                    </a>
                                    <a href="#" className="me-3 text-primary small">
                                        Change Area Unit
                                    </a>
                                    <a href="#" className="text-danger small">
                                        Reset Search
                                    </a>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </div>
            </section>

            {/* section 1  */}
            <section className="py-5">
                <Container>
                    <h3 className="fw-bold mb-5">Browse Property</h3>
                    <Row className="g-4">
                        <Col md={4}>
                            {renderCard(<Home size={24} color="green" />, "Home", homeOptions)}
                        </Col>
                        <Col md={4}>
                            {renderCard(<Map size={24} color="green" />, "Plots", plotOptions)}
                        </Col>
                        <Col md={4}>
                            {renderCard(<Building2 size={24} color="green" />, "Apartments", apartmentOptions)}
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* section 2  */}
            <section className="py-5">
                <Container>
                    <div className="text-center mb-4">
                        <h2 className="fw-bold">Featured Properties</h2>
                        <p className="text-muted">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                    </div>

                    <Row className="g-4">
                        {properties.map((property, idx) => (
                            <Col md={6} lg={4} key={idx}>
                                <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                                    <div style={{ position: "relative" }}>
                                        <Card.Img
                                            variant="top"
                                            src={property.img}
                                            style={{ height: "200px", objectFit: "cover" }}
                                        />
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: "10px",
                                                left: "10px",
                                                display: "flex",
                                                gap: "5px",
                                            }}
                                        >
                                            {property.tags.map((tag, i) => (
                                                <Badge
                                                    key={i}
                                                    bg={tag === "Featured" ? "warning" : "success"}
                                                    text={tag === "Featured" ? "dark" : "light"}
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                    <Card.Body>
                                        <Card.Title className="d-flex justify-content-between align-items-center">
                                            <span>{property.title}</span>
                                            <span className="text-danger">{property.price}</span>
                                        </Card.Title>
                                        <Card.Text className="text-muted small mb-2">
                                            {property.address}
                                        </Card.Text>
                                        <div className="d-flex justify-content-between text-muted small">
                                            <span>🛏 {property.beds} Beds</span>
                                            <span>🛁 {property.baths} Baths</span>
                                            <span>📐 {property.sqft} sqft</span>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* section 3  */}
            <section
                className="py-5"
                style={{ backgroundColor: "#d9fdd3", minHeight: "100vh", padding: "50px 0" }}
            >
                <Container>
                    <Row className="align-items-center">
                        {/* Left Side */}
                        <Col md={6} className="mb-4">
                            <h2 className="fw-bold mb-3">Let's Talk About Everything!</h2>
                            <p>
                                Hello there! If you'd like to ask us something, you can get in touch with us here!
                                We'd love to address any and all concerns you may have.
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
                                        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
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
                                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
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
                                        <Form.Control.Feedback type="invalid">{errors.subject}</Form.Control.Feedback>
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
                                        <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
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

            {/* section 4  */}
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
