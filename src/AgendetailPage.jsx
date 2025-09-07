import React, { useRef, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, InputGroup } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Swiper styles (only import once in your app)
import "swiper/css";
import "swiper/css/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faArrowRight, faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

/**
 * AgentDetailPage
 *
 * - Image fallbacks to avoid 404 console noise
 * - Reliable Swiper navigation setup via onBeforeInit
 * - MutationObserver removes injected GA/Ads tracking <img> elements
 */

const FALLBACK_CARD = "https://via.placeholder.com/600x400?text=Property+Image";
const FALLBACK_AVATAR = "/images/fallback-avatar.png";

const AgentDetailPage = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // 🔹 Handle broken images (profile, sales, agent promo)
  const handleImgError = (e, fallback = FALLBACK_CARD) => {
    if (e?.target && e.target.src !== fallback) {
      e.target.onerror = null; // prevent infinite loop
      e.target.src = fallback;
    }
  };

  // 🔹 Recent sales data
  const recentSales = [
    { img: "images/p1.jpg", beds: 2, baths: 1, sqft: "1,160", location: "Nevada, MO", sold: "8 years ago" },
    { img: "images/p2.jpg", beds: 3, baths: 2, sqft: "2,584", location: "Nevada, MO", sold: "8 years ago" },
    { img: "images/p3.jpg", beds: 2, baths: 2, sqft: "1,108", location: "Nevada, MO", sold: "8 years ago" },
    { img: "images/p4.jpg", beds: 2, baths: 2, sqft: "1,108", location: "Nevada, MO", sold: "8 years ago" },
    { img: "images/p5.jpg", beds: 2, baths: 2, sqft: "1,108", location: "Nevada, MO", sold: "8 years ago" },
  ];

  // 🔹 MutationObserver removes GA/Ads tracking pixels that cause 404s
  useEffect(() => {
    const isTrackingImg = (img) => {
      if (!img?.src) return false;
      const s = img.src.toLowerCase();
      return (
        s.includes("ga-audiences") ||
        s.includes("/ads/ga-audiences") ||
        s.includes("doubleclick.net") ||
        s.includes("googlesyndication") ||
        s.includes("google-analytics.com/a/collect")
      );
    };

    const removeExisting = () => {
      document.querySelectorAll("img").forEach((img) => {
        if (isTrackingImg(img)) img.remove();
      });
    };

    removeExisting();

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        (m.addedNodes || []).forEach((node) => {
          if (node.nodeType === 1) {
            if (node.tagName === "IMG" && isTrackingImg(node)) {
              node.remove();
            } else {
              node.querySelectorAll?.("img").forEach((img) => {
                if (isTrackingImg(img)) img.remove();
              });
            }
          }
        });
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Section 1 */}
      <section className="py-4">
        <Container>
          <Row className="shadow-sm border rounded p-4">
            {/* Left Side */}
            <Col md={4} className="text-center">
              <img
                src="/images/profile-pic.png"
                alt="Agent"
                className="rounded-circle mb-3"
                style={{ width: 130, height: 130, objectFit: "cover" }}
                onError={(e) => handleImgError(e, FALLBACK_AVATAR)}
              />
              <h5 className="fw-bold">Linda S. Barnes</h5>
              <p className="text-muted">The Barnes Company</p>

              <div className="d-flex justify-content-center align-items-center mb-3">
                <FaStar color="#007bff" />
                <span className="ms-2 fw-semibold">5.0</span>
                <span className="ms-1 text-muted">43 reviews</span>
              </div>
            </Col>

            {/* Right Side */}
            <Col xs={12} md={8}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold">Recent Sales</h6>
                <div>
                  <Button ref={prevRef} variant="light" className="me-2 rounded-circle shadow-sm" aria-label="Previous">
                    ‹
                  </Button>
                  <Button ref={nextRef} variant="light" className="rounded-circle shadow-sm" aria-label="Next">
                    ›
                  </Button>
                </div>
              </div>

              {/* Swiper */}
              <Swiper
                modules={[Navigation]}
                spaceBetween={15}
                slidesPerView={2}
                onBeforeInit={(swiper) => {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                }}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                }}
              >
                {recentSales.map((sale, i) => (
                  <SwiperSlide key={i}>
                    <Card className="shadow-sm border-0 h-100">
                      <Card.Img
                        variant="top"
                        src={sale.img}
                        alt={`Property in ${sale.location}`}
                        style={{ height: 160, objectFit: "cover" }}
                        onError={(e) => handleImgError(e, FALLBACK_CARD)}
                      />
                      <Card.Body>
                        <small className="text-muted d-block mb-1">Seller</small>
                        <p className="mb-1">
                          <strong>{sale.beds} bd</strong> | <strong>{sale.baths} ba</strong> |{" "}
                          <strong>{sale.sqft} sqft</strong>
                        </p>
                        <p className="mb-1">{sale.location}</p>
                        <small className="text-warning fw-semibold">● Sold {sale.sold}</small>
                      </Card.Body>
                    </Card>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Stats */}
              <Row className="text-center mt-4">
                <Col xs={6} md={3}>
                  <h5 className="fw-bold">0</h5>
                  <p className="text-muted small">Sales last 12 months</p>
                </Col>
                <Col xs={6} md={3}>
                  <h5 className="fw-bold">63</h5>
                  <p className="text-muted small">Total sales</p>
                </Col>
                <Col xs={6} md={3}>
                  <h5 className="fw-bold">-</h5>
                  <p className="text-muted small">Price range</p>
                </Col>
                <Col xs={6} md={3}>
                  <h5 className="fw-bold">-</h5>
                  <p className="text-muted small">Average price</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Section 2 */}
      <section className="py-4">
        <Container>
          <Row>
            {/* About */}
            <Col md={8} className="mb-4 mb-md-0">
              <Card className="border-0 shadow-sm p-4">
                <h5 className="fw-bold mb-3">Get to know Linda S. Barnes</h5>
                <p className="fw-semibold">Broker/Owner</p>

                <h6 className="fw-bold mt-4">EXPERIENCE</h6>
                <p className="mb-1">Licensed September 1979</p>
                <p className="mb-1">Broker/Owner 1991 to Present</p>
                <p className="mb-1">Lifetime Member Million Dollar Club</p>
                <p className="mb-1">Multimillion Dollar Producer since 1991</p>
                <p className="mb-1">Certified Relocation Specialist</p>

                <h6 className="fw-bold mt-4">EDUCATION</h6>
                <p className="mb-1">Graduate Realtor Institute 1983</p>
                <p className="mb-1">Certified Residential Specialist 1994</p>
                <p className="mb-1">Accredited Buyers Representative 1997</p>
                <p className="mb-1">Certified Residential Broker 2001</p>

                <h6 className="fw-bold mt-4">PROFESSIONAL AFFILIATIONS</h6>
                <p className="mb-1">Five County Board of Realtors 2012 President</p>
                <p className="mb-1">Nevada Regional Medical Center</p>
                <p className="mb-1">Missouri Association of Realtors</p>
                <p className="mb-1">National Association of Realtors</p>
                <a href="#" className="text-primary fw-semibold" onClick={(e) => e.preventDefault()}>
                  Show more
                </a>
              </Card>
            </Col>

            {/* Contact */}
            <Col md={4}>
              <Card className="border-0 shadow-sm p-4">
                <h6 className="fw-bold mb-3">Contact Linda S. Barnes</h6>
                <Form>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Control type="text" placeholder="Name" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="phone">
                    <Form.Control type="text" placeholder="Phone" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Control type="email" placeholder="Email" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="message">
                    <Form.Control as="textarea" rows={3} placeholder="Message (optional)" />
                  </Form.Group>
                  <Button variant="primary" className="w-100 fw-bold" style={{ backgroundColor: "#0066ff" }}>
                    Contact Linda
                  </Button>
                </Form>
                <small className="text-muted d-block mt-3" style={{ fontSize: 12 }}>
                  By submitting your information, you agree that the real estate professional identified above may
                  call/text you about your search. You don’t need to consent as a condition of buying any property,
                  goods, or services. Message/data rates may apply. You also agree to our <a href="#">Terms of Use</a>.
                </small>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="agent py-5" style={{ background: "#62B563" }}>
        <Container>
          <Row className="align-items-center gy-4">
            <Col lg={5} md={12}>
              <img
                src="images/agent.png"
                alt="Agent"
                className="img-fluid w-100"
                onError={(e) => handleImgError(e, FALLBACK_CARD)}
              />
            </Col>
            <Col lg={4} md={12}>
              <div>
                <h4 className="fw-bold text-white">Become an Agent.</h4>
                <p className="mb-0 text-white-50">
                  Join Landdost and grow your real estate career with trust, tools, and top listings.
                </p>
              </div>
            </Col>
            <Col lg={3} md={12} className="text-md-start">
              <div>
                <Link to="/contact">
                  <button className="btn bg-white rounded-pill py-2 px-4">Register Now</button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Newsletter */}
      <section className="newsletter py-5" style={{ backgroundColor: "#1F1F1F", color: "#BDBDBD" }}>
        <Container>
          <Row className="align-items-center text-center text-md-start gy-4">
            <Col lg={4} md={6}>
              <p className="fw-semibold mb-2">Follow Us on</p>
              <div className="d-flex justify-content-center justify-content-md-start gap-3">
                <FontAwesomeIcon icon={faLinkedinIn} className="bg-light rounded-pill p-1 text-success" />
                <FontAwesomeIcon icon={faFacebookF} className="bg-light rounded-pill p-1 text-success" />
                <FontAwesomeIcon icon={faInstagram} className="bg-light rounded-pill p-1 text-success" />
              </div>
            </Col>

            <Col lg={4} md={6}>
              <div className="d-flex justify-content-center justify-content-md-start gap-3">
                <FontAwesomeIcon icon={faHome} className="bg-light rounded-pill p-1 text-success" />
                <h5 className="mb-0">www.landdost.com</h5>
              </div>
            </Col>

            <Col lg={4} md={12}>
              <h6 className="mb-2 text-center text-md-start">
                Subscribe to our
                <br />
                Newsletter!
              </h6>
              <InputGroup>
                <Form.Control type="email" placeholder="Email Address" />
                <Button style={{ background: "#62B563", color: "white" }}>
                  <FontAwesomeIcon icon={faArrowRight} />
                </Button>
              </InputGroup>
            </Col>
          </Row>
        </Container>
        <hr className="mt-5" />
      </section>
    </>
  );
};

export default AgentDetailPage;
