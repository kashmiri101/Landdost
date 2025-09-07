import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

function Contact() {
    // contact form API 
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Clear error when user types
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.subject.trim()) newErrors.subject = "Subject is required";
        if (!formData.message.trim()) newErrors.message = "Message is required";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setStatus("Sending...");

        try {
            const response = await fetch("https://bostangroupinc.com/api/message", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus("Message sent successfully!");
                setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
                setErrors({});
            } else {
                setStatus("Failed to send message.");
            }
        } catch (error) {
            console.error(error);
            setStatus("An error occurred.");
        }
    };

    return (
        <section className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
            <Container>
                <Row className="mb-4 text-center">
                    <Col>
                        <h2 className="fw-bold">Contact Us</h2>
                        <p className="text-muted">
                            Have questions about properties or services? Get in touch with us.
                        </p>
                    </Col>
                </Row>

                <Row className="g-4">
                    {/* Contact Details */}
                    <Col md={5}>
                        <Card className="p-4 shadow-sm rounded-3 h-100">
                            <h5 className="fw-bold mb-3">Get in Touch</h5>
                            <p className="mb-4">
                                We are here to answer any questions you may have about buying,
                                selling, or renting property.
                            </p>

                            <div className="mb-3 d-flex align-items-start">
                                <FaMapMarkerAlt className="me-3 text-success fs-5" />
                                <span>7th Floor, Dolmen Executive Tower Karachi Pakistan</span>
                            </div>

                            <div className="mb-3 d-flex align-items-start">
                                <FaEnvelope className="me-3 text-success fs-5" />
                                <span>info@landdost.com</span>
                            </div>
                        </Card>
                    </Col>

                    {/* Contact Form */}
                    <Col md={7}>
                        <Card className="p-4 shadow-sm rounded-3">
                            <h5 className="fw-bold mb-3">Send Us a Message</h5>
                            <Form onSubmit={handleSubmit}>
                                <Row className="mb-3">
                                    <Col md={6}>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            placeholder="Your Name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            isInvalid={!!errors.name}
                                            className="shadow-none"
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            placeholder="Your Email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            isInvalid={!!errors.email}
                                            className="shadow-none"
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Col md={6}>
                                        <Form.Control
                                            type="text"
                                            name="phone"
                                            placeholder="Phone Number"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="shadow-none"
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Form.Control
                                            type="text"
                                            name="subject"
                                            placeholder="Subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            isInvalid={!!errors.subject}
                                            className="shadow-none"
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.subject}</Form.Control.Feedback>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-3">
                                    <Form.Control
                                        as="textarea"
                                        name="message"
                                        rows={4}
                                        placeholder="Your Message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        isInvalid={!!errors.message}
                                        className="shadow-none"
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
                                </Form.Group>

                                <Button type="submit" variant="success" className="px-4 rounded-pill">
                                    Submit
                                </Button>

                                {status && <p className="mt-3">{status}</p>}
                            </Form>
                        </Card>
                    </Col>
                </Row>

                {/* Google Map */}
                <Row className="mt-5">
                    <Col>
                        <div
                            className="shadow-sm rounded-3 overflow-hidden"
                            style={{ height: "400px" }}
                        >
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13610.691033832635!2d74.3239632!3d31.5203695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190f0ab5c1e9e5%3A0x9b15d67c3c7a2d55!2sLahore%2C%20Pakistan!5e0!3m2!1sen!2s!4v1694455070123!5m2!1sen!2s"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Google Map"
                            ></iframe>
                        </div>
                    </Col>
                </Row>

            </Container>
        </section>
    );
}

export default Contact;
