import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

function Propertypage() {
    const [formData, setFormData] = useState({
        propertyType: "",
        city: "",
        location: "",
    });

    const [results, setResults] = useState(null);

    // Handle dropdown / input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle search
    const handleSearch = () => {
        // Simulated content (in real app, you would fetch from API here)
        setResults({
            message: `Showing results for ${formData.propertyType} in ${formData.city}, Location: ${formData.location}`,
        });
    };

    return (
        <>
            {/* section 1  */}
            <section className="py-4">
                <Container>
                    <Row className="g-2 align-items-center justify-content-center">
                        {/* Property Type */}
                        <Col xs={12} sm={6} md={3}>
                            <Form.Select
                                name="propertyType"
                                value={formData.propertyType}
                                onChange={handleChange}
                            >
                                <option value="">Select Property Type</option>
                                <option>House</option>
                                <option>Plot</option>
                                <option>Commercial</option>
                            </Form.Select>
                        </Col>

                        {/* City */}
                        <Col xs={12} sm={6} md={3}>
                            <Form.Select
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                            >
                                <option value="">Select City</option>
                                <option>Islamabad</option>
                                <option>Lahore</option>
                                <option>Karachi</option>
                            </Form.Select>
                        </Col>

                        {/* Location */}
                        <Col xs={12} sm={6} md={3}>
                            <Form.Control
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Type Area Name..."
                            />
                        </Col>

                        {/* Search Button */}
                        <Col xs={12} sm={6} md={2}>
                            <Button
                                variant="success"
                                className="w-100 fw-bold"
                                style={{ background: "#33A137", border: "none" }}
                                onClick={handleSearch}
                            >
                                Search
                            </Button>
                        </Col>
                    </Row>

                    {/* Results Section */}
                    {results && (
                        <Row className="mt-4">
                            <Col md={8} className="mx-auto">
                                <Card className="shadow-sm">
                                    <Card.Body>
                                        <h5 className="fw-bold">Search Results</h5>
                                        <p>{results.message}</p>
                                        {/* Here you can show listings, images, or dynamic API data */}
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    )}
                </Container>
            </section>
        </>
    );
}

export default Propertypage;
