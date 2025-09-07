import React, { useState, useEffect } from "react";
import {
    Container,
    Navbar,
    Nav,
    Button,
    Offcanvas,
    Row,
    Col,
    Card
} from "react-bootstrap";
import {
    FaHome,
    FaFire,
    FaSnowflake,
    FaEye,
    FaMousePointer,
    FaPhone,
    FaWhatsapp,
    FaSms,
    FaEnvelope,
    FaChartLine,
    FaPlus,
    FaUserCircle,
    FaMapMarkerAlt
} from "react-icons/fa";
import {
    FaBars,
    FaPlusCircle,
    FaBuilding,
    FaCog,
    FaClipboardList,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getToken, clearAuth } from "./Auth";

export default function Dashboard() {
     const [show, setShow] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // ✅ Check authentication on mount
  useEffect(() => {
    const token = getToken(); // get from Auth.js
    if (!token) {
      navigate("/login"); // Redirect if no token
    }
  }, [navigate]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const value = e.target.value;
    if (value) navigate(value);
  };

  const handlePostClick = () => {
    switch (selectedCategory) {
      case "property":
        navigate("/PostListing");
        break;
      case "projects":
        navigate("/ProjectForm");
        break;
      case "business":
        navigate("/BusinessForm");
        break;
      case "construction":
        navigate("/ConstructionForm");
        break;
      case "materials":
        navigate("/MaterialForm");
        break;
      case "jobs":
        navigate("/JobForm");
        break;
      case "home":
        navigate("/HomeServicesForm");
        break;
      default:
        alert("⚠️ Please select a category first!");
    }
  };

  // ✅ Logout function
  const handleLogout = () => {
    clearAuth(); // Clear token & user
    navigate("/login");
  };

  // ✅ Fetch properties with proper token
  useEffect(() => {
    const fetchProperties = async () => {
      const token = getToken(); // must match login token
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          "https://bostangroupinc.com/api/user/properties",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.success) {
          setProperties(response.data.data);
        } else {
          console.error("API responded with an error:", response.data.message);
        }
      } catch (error) {
        console.error("Failed to fetch properties:", error.response || error);
        if (error.response?.status === 401) {
          // Token invalid or expired
          clearAuth();
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [navigate]);


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
                        <div className="d-flex align-items-center gap-3">
                            {/* Category Selector */}
                            <select
                                className="form-select w-auto"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="">-- Select Category --</option>
                                <option value="property">Property</option>
                                <option value="projects">Projects</option>
                                <option value="business">Business</option>
                                <option value="construction">Construction Services</option>
                                <option value="materials">Material Companies</option>
                                <option value="jobs">Job Opportunities</option>
                                <option value="home">Home Services</option>
                            </select>

                            {/* Post Listing Button */}
                            <Button
                                variant="success"
                                className="rounded-pill px-4"
                                onClick={handlePostClick}
                            >
                                Post Listing
                            </Button>
                        </div>

                        {/* ✅ Logout + User Icon */}
                        <div className="d-flex align-items-center gap-2">
                            {/* <FaUserCircle size={28} className="mt-2" /> */}
                            <Button
                                variant="outline-success"
                                size="sm"
                                className="ms-2"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </div>
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

            {/* Dashboard Content */}
            <section style={{ marginLeft: "70px" }}>
                <Container fluid className="p-4 bg-light">
                    <Row className="mb-4">
                        {/* Listings Section */}
                        <Col xs={12} md={8} className="mb-3 mb-md-0">
                            <Card className="shadow-sm p-3 h-100">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h6 className="fw-bold">Listings</h6>
                                    <a href="#" className="text-success fw-semibold">
                                        View all Landdost Listings
                                    </a>
                                </div>
                                <Row className="text-center g-3">
                                    <Col xs={6} sm={4} md>
                                        <FaHome color="green" size={22} />
                                        <div className="fw-bold">Active</div>
                                        <span>0</span>
                                    </Col>
                                    <Col xs={6} sm={4} md>
                                        <FaHome color="#00b894" size={22} />
                                        <div>For Sale</div>
                                        <span>0</span>
                                    </Col>
                                    <Col xs={6} sm={4} md>
                                        <FaSnowflake color="#0984e3" size={22} />
                                        <div>For Rent</div>
                                        <span>0</span>
                                    </Col>
                                    <Col xs={6} sm={4} md>
                                        <FaFire color="#e17055" size={22} />
                                        <div>Hot</div>
                                        <span>0</span>
                                    </Col>
                                    <Col xs={6} sm={4} md>
                                        <FaFire color="red" size={22} />
                                        <div>Super Hot</div>
                                        <span>0</span>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>

                        {/* Quota Section */}
                        <Col xs={12} md={4}>
                            <Card className="shadow-sm p-3 h-100">
                                <h6 className="fw-bold">Quota and Credits</h6>
                                <div className="d-flex justify-content-between small mt-2 flex-wrap">
                                    <span className="fw-bold">Available Quota: 0</span>
                                    <span className="fw-bold">Used: 0</span>
                                    <span className="fw-bold">Total: 0</span>
                                </div>
                                <div
                                    style={{
                                        height: "5px",
                                        background: "#eee",
                                        borderRadius: "4px",
                                        marginTop: "10px",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "0%",
                                            background: "green",
                                            height: "100%",
                                            borderRadius: "4px",
                                        }}
                                    ></div>
                                </div>
                            </Card>
                        </Col>
                    </Row>

                    {/* Analytics Section */}
                    <Row>
                        <Col xs={12}>
                            <Card className="shadow-sm p-3">
                                {/* Header with Filters */}
                                <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
                                    <h6 className="fw-bold">Analytics</h6>
                                    <div className="d-flex gap-2 flex-wrap">
                                        <Button size="sm" variant="success">
                                            All
                                        </Button>
                                        <Button size="sm" variant="outline-success">
                                            For Sale
                                        </Button>
                                        <Button size="sm" variant="outline-success">
                                            For Rent
                                        </Button>
                                        <Button size="sm" variant="outline-secondary">
                                            Last 30 Days
                                        </Button>
                                    </div>
                                </div>

                                {/* Analytics Tabs Row */}
                                <div className="d-flex flex-wrap text-center border-bottom">
                                    <div
                                        className="flex-fill p-3 border-end"
                                        style={{
                                            minWidth: "120px",
                                            borderBottom: "3px solid green",
                                        }}
                                    >
                                        <FaEye size={22} color="green" />
                                        <h6 className="fw-bold mt-2 text-success">Views</h6>
                                        <p className="mb-0 text-muted">0 No Data</p>
                                    </div>
                                    <div className="flex-fill p-3 border-end" style={{ minWidth: "120px" }}>
                                        <FaMousePointer size={22} color="#f39c12" />
                                        <h6 className="fw-bold mt-2">Clicks</h6>
                                        <p className="mb-0 text-muted">0 No Data</p>
                                    </div>
                                    <div className="flex-fill p-3 border-end" style={{ minWidth: "120px" }}>
                                        <FaPhone size={22} color="#3498db" />
                                        <h6 className="fw-bold mt-2">Leads</h6>
                                        <p className="mb-0 text-muted">0 No Data</p>
                                    </div>
                                    <div className="flex-fill p-3 border-end" style={{ minWidth: "120px" }}>
                                        <FaPhone size={22} color="black" />
                                        <h6 className="fw-bold mt-2">Calls</h6>
                                        <p className="mb-0 text-muted">0 No Data</p>
                                    </div>
                                    <div className="flex-fill p-3 border-end" style={{ minWidth: "120px" }}>
                                        <FaWhatsapp size={22} color="green" />
                                        <h6 className="fw-bold mt-2">WhatsApp</h6>
                                        <p className="mb-0 text-muted">0 No Data</p>
                                    </div>
                                    <div className="flex-fill p-3 border-end" style={{ minWidth: "120px" }}>
                                        <FaSms size={22} color="#e67e22" />
                                        <h6 className="fw-bold mt-2">SMS</h6>
                                        <p className="mb-0 text-muted">0 No Data</p>
                                    </div>
                                    <div className="flex-fill p-3" style={{ minWidth: "120px" }}>
                                        <FaEnvelope size={22} color="#7f8c8d" />
                                        <h6 className="fw-bold mt-2">Emails</h6>
                                        <p className="mb-0 text-muted">0 No Data</p>
                                    </div>
                                </div>

                                {/* Bottom Section - Insights */}
                                <div className="text-center p-4">
                                    <FaChartLine size={50} color="green" />
                                    <h6 className="fw-bold mt-3">View In-Depth Insights</h6>
                                    <p className="text-muted">
                                        See the number of views, clicks and leads that your listing has received.
                                    </p>
                                </div>
                            </Card>
                        </Col>
                    </Row>

                    {/* Recent Listing Section*/}
                    <Row className="mt-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="fw-bold">Recent Listings</h6>
                            <a
                                href="#"
                                className="text-success text-decoration-none fw-semibold"
                                style={{ fontSize: "14px" }}
                            >
                                View All Listings <span>&#8599;</span>
                            </a>
                        </div>

                        <Col xs={12}>
                            <Card className="shadow-sm p-3">
                                {/* If loading */}
                                {loading ? (
                                    <div className="text-center p-5">Loading...</div>
                                ) : properties.length === 0 ? (
                                    // Empty state
                                    <div className="text-center p-5">
                                        <div style={{ fontSize: "60px", color: "#dfe6e9" }}>📝</div>
                                        <h6 className="fw-bold mt-3">No Active Listings</h6>
                                        <p className="text-muted">Your active listings will appear here</p>
                                        <Button variant="success">
                                            <FaPlus className="me-2" />
                                            Post Listing
                                        </Button>
                                    </div>
                                ) : (
                                    // Display properties
                                    <Row>
                                        {properties.map((property) => (
                                            <Col key={property.id} md={6} lg={4} className="mb-3">
                                                <Card className="h-100 shadow-sm p-3">
                                                    <h6 className="fw-bold">{property.title}</h6>
                                                    <p className="text-muted mb-1">
                                                        {property.city}, {property.location}
                                                    </p>
                                                    <p className="mb-1">
                                                        <strong>Price:</strong> {property.price}
                                                    </p>
                                                    <p className="mb-1">
                                                        <strong>Area:</strong> {property.area} {property.areaUnit}
                                                    </p>
                                                    <p className="mb-1">
                                                        <strong>Purpose:</strong> {property.purpose}
                                                    </p>
                                                    <Button variant="success" size="sm">
                                                        View Details
                                                    </Button>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                )}
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}
