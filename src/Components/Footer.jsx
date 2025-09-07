import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebookF,
  faPinterestP,
  faInstagram,
  faLinkedinIn,
  faGooglePlay,
  faAppStoreIos,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#1F1F1F",
        color: "#BDBDBD",
        padding: "40px 0",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Container>
        <Row>
          {/* Column 1: Properties by Type */}
          <Col lg={2} md={6} sm={6} xs={12}>
            <h5 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "15px" }}>
              Properties by Type
            </h5>
            {[
              "Houses for Sale",
              "Flats for Sale",
              "Plots for Sale",
              "Commercial Properties",
              "Rental Properties",
              "Farmhouses",
              "Luxury Homes",
            ].map((text, idx) => (
              <a
                key={idx}
                href="#"
                style={{
                  display: "block",
                  fontSize: "14px",
                  color: "#BDBDBD",
                  textDecoration: "none",
                  marginBottom: "8px",
                }}
              >
                {text}
              </a>
            ))}
          </Col>

          {/* Column 2: Properties by City */}
          <Col lg={2} md={6} sm={6} xs={12}>
            <h5 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "15px" }}>
              Properties by City
            </h5>
            {[
              "Karachi",
              "Lahore",
              "Islamabad",
              "Rawalpindi",
              "Faisalabad",
              "Multan",
              "Peshawar",
              "Hyderabad",
            ].map((city, idx) => (
              <a
                key={idx}
                href="#"
                style={{
                  display: "block",
                  fontSize: "14px",
                  color: "#BDBDBD",
                  textDecoration: "none",
                  marginBottom: "8px",
                }}
              >
                {city}
              </a>
            ))}
          </Col>

          {/* Column 3: Explore LandDost */}
          <Col lg={2} md={6} sm={6} xs={12}>
            <h5 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "15px" }}>
              Explore LandDost
            </h5>
            {[
              "Buy Property",
              "Rent Property",
              "New Projects",
              "Real Estate Agents",
              "Guides & Blogs",
              "FAQs",
              "Sitemap",
            ].map((text, idx) => (
              <a
                key={idx}
                href="#"
                style={{
                  display: "block",
                  fontSize: "14px",
                  color: "#BDBDBD",
                  textDecoration: "none",
                  marginBottom: "8px",
                }}
              >
                {text}
              </a>
            ))}
          </Col>

          {/* Column 4: LandDost.com */}
          <Col lg={2} md={6} sm={6} xs={12}>
            <h5 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "15px" }}>
              LandDost.com
            </h5>
            {[
              "About Us",
              "Advertise with Us",
              "How to Buy & Sell",
              "Refunds & Returns",
              "Careers",
              "Contact Us",
            ].map((text, idx) => (
              <a
                key={idx}
                href="#"
                style={{
                  display: "block",
                  fontSize: "14px",
                  color: "#BDBDBD",
                  textDecoration: "none",
                  marginBottom: "8px",
                }}
              >
                {text}
              </a>
            ))}
          </Col>

          {/* Column 5: Newsletter + Social + Apps */}
          <Col lg={4} md={12} sm={12} xs={12}>
            <h5 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "15px" }}>
              Subscribe to our Newsletter
            </h5>
            <div style={{ display: "flex", marginBottom: "20px" }}>
              <input
                type="email"
                placeholder="name@email.com"
                style={{
                  padding: "10px",
                  border: "none",
                  borderRadius: "4px 0 0 4px",
                  flex: 1,
                }}
              />
              <button
                style={{
                  background: "#62B765",
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "0 4px 4px 0",
                  cursor: "pointer",
                }}
              >
                Subscribe
              </button>
            </div>

            {/* Social Media Icons */}
            <div style={{ marginBottom: "20px" }}>
              <h6 style={{ fontSize: "14px", marginBottom: "10px" }}>Follow Us</h6>
              <div style={{ display: "flex", gap: "10px" }}>
                <span style={iconStyle}>
                  <FontAwesomeIcon icon={faTwitter} />
                </span>
                <span style={iconStyle}>
                  <FontAwesomeIcon icon={faFacebookF} />
                </span>
                <span style={iconStyle}>
                  <FontAwesomeIcon icon={faPinterestP} />
                </span>
                <span style={iconStyle}>
                  <FontAwesomeIcon icon={faInstagram} />
                </span>
                <span style={iconStyle}>
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </span>
              </div>
            </div>

            {/* Mobile App Badges */}
            <div>
              <h6 style={{ fontSize: "14px", marginBottom: "10px" }}>Download Mobile Apps</h6>
              <div style={{ display: "flex", gap: "10px" }}>
                <span style={badgeStyle}>
                  <FontAwesomeIcon icon={faGooglePlay} size="2x" />
                </span>
                <span style={badgeStyle}>
                  <FontAwesomeIcon icon={faAppStoreIos} size="2x" />
                </span>
              </div>
            </div>
          </Col>
        </Row>

        <hr style={{ borderColor: "#4d4c4cff", margin: "30px 0" }} />

        <p style={{ textAlign: "center", fontSize: "12px", color: "#777" }}>
          Copyright © {new Date().getFullYear()} LandDost.com - All Rights Reserved. <br />
          Terms of Service | Privacy Policy
        </p>
      </Container>
    </footer>
  );
}

/* Reusable styles */
const iconStyle = {
  width: "32px",
  height: "32px",
  background: "#3a3a3a",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  color: "#BDBDBD",
};

const badgeStyle = {
  background: "#3a3a3a",
  padding: "10px",
  borderRadius: "8px",
  cursor: "pointer",
  color: "#BDBDBD",
};
