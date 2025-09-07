import { useState } from "react";
import { Container, Nav, Navbar, Offcanvas, Modal, Button, Form, Row, Col, Image } from "react-bootstrap";
import { BsPersonCircle } from "react-icons/bs";
import { FaCog, FaFlag } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
import { Link } from "react-router-dom";

export default function Header() {
  // login/ register modal 
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleSignupShow = () => setShowSignup(true);
  const handleSignupClose = () => setShowSignup(false);

  // languages modal 
  const [showLanguages, setShowLanguages] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("ur"); // default

  const languages = [
    { code: "en", name: "English" },
    { code: "ur", name: "اردو" },
    { code: "ar", name: "العربية" },
    { code: "fr", name: "Français" },
    { code: "es", name: "Español" },
    { code: "de", name: "Deutsch" },
    { code: "zh", name: "中文" },
    { code: "hi", name: "हिन्दी" },
  ];

  const handleSelectLanguage = (langCode) => {
    setSelectedLanguage(langCode);
    console.log("Selected language:", langCode);
    setShowLanguages(false);
    // Add your language change logic here
  };

  // Countries Modal 
  const countries = [
    { code: "PK", name: "Pakistan", flag: "https://flagcdn.com/w40/pk.png" },
    { code: "US", name: "United States", flag: "https://flagcdn.com/w40/us.png" },
    { code: "GB", name: "United Kingdom", flag: "https://flagcdn.com/w40/gb.png" },
    { code: "CA", name: "Canada", flag: "https://flagcdn.com/w40/ca.png" },
    { code: "IN", name: "India", flag: "https://flagcdn.com/w40/in.png" },
    { code: "FR", name: "France", flag: "https://flagcdn.com/w40/fr.png" },
    { code: "DE", name: "Germany", flag: "https://flagcdn.com/w40/de.png" },
    { code: "JP", name: "Japan", flag: "https://flagcdn.com/w40/jp.png" },
    // Add more countries as needed
  ];
  const [showCountries, setShowCountries] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("PK");

  const handleSelectCountry = (countryCode) => {
    setSelectedCountry(countryCode);
    console.log("Selected country:", countryCode);
    setShowCountries(false);
    // Add your logic to change country-related content
  };

  return (
    <>
      {/* ✅ Top Green Bar */}
      <Navbar expand="lg" className="py-1" style={{ background: "#33A137" }}>
        <Container>
          <Navbar.Toggle aria-controls="topnavbar-collapse" />
          <Navbar.Collapse id="topnavbar-collapse" className="justify-content-between">
            {/* Left Links */}
            <Nav className="nav-list gap-3">
              <Nav.Link as={Link} to="/homeloan" className="nav-items rounded-pill">
                Home Loan Calculator
              </Nav.Link>
              <Nav.Link as={Link} to="/construction" className="nav-items rounded-pill">
                Construction Cost Calculator
              </Nav.Link>
              <Nav.Link as={Link} to="/addproperty" className="nav-items rounded-pill">
                Add Property
              </Nav.Link>
              <Nav.Link as={Link} to="/Contact" className="nav-items rounded-pill">
                Contact Us
              </Nav.Link>
            </Nav>

            {/* Right Icons */}
            <Nav className="align-items-center">
              <span style={{ color: "white", cursor: "pointer" }}>
                <Link to="/Login" style={{ color: "white", textDecoration: "none" }}>
                  Login/
                </Link>
              </span>{" "}
              <span style={{ color: "white", cursor: "pointer" }}>
                <Link to="/Register" style={{ color: "white", textDecoration: "none" }}>
                  Register
                </Link>
              </span>
              {/* Other elements */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


      {/* ✅ Bottom White Navbar */}
      <Navbar bg="" expand="lg" className="navbar border-bottom">
        <Container>
          <Navbar.Toggle aria-controls="bottom-offcanvas" className="bottom-canvas" />
          <Navbar.Offcanvas id="bottom-offcanvas" placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Main Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="d-flex flex-column flex-lg-row justify-content-between w-100">
              {/* Left Nav */}
              <Nav className="nav-list gap-3 flex-column flex-lg-row mb-3 mb-lg-0">
                <Nav.Link as={Link} to="/" className="nav-links rounded-pill">Home</Nav.Link>
                <Nav.Link as={Link} to="/about" className="nav-links rounded-pill">About Us</Nav.Link>
                <Nav.Link as={Link} to="/house" className="nav-links rounded-pill">House</Nav.Link>
                <Nav.Link as={Link} to="/apartment" className="nav-links rounded-pill">Apartment</Nav.Link>
                <Nav.Link as={Link} to="/plot" className="nav-links rounded-pill">Plot</Nav.Link>
                <Nav.Link as={Link} to="/farmhouse" className="nav-links rounded-pill">Farm House</Nav.Link>
                <Nav.Link as={Link} to="/Newproject" className="nav-links rounded-pill">New Project</Nav.Link>
                <Nav.Link as={Link} to="/Agents" className="nav-links rounded-pill">Agents</Nav.Link>
                <Nav.Link as={Link} to="#" className="nav-links rounded-pill">Jobs</Nav.Link>
                <Nav.Link as={Link} to="#" className="nav-links rounded-pill">Tools</Nav.Link>
              </Nav>

              {/* Right Nav */}
              <Nav className="mt-3 mt-lg-0">
                <Nav.Link as={Link} to="/booking" className="booking-button fw-bold">
                  BOOKING FORM
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

    </>
  );
}
