import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const ConstructionForm = () => {
  const [formData, setFormData] = useState({
    serviceType: "",
    propertyType: "",
    city: "",
    location: "",
    budget: "",
    description: "",
    name: "",
    email: "",
    mobile: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted: ", formData);
    alert("Your request has been submitted!");
  };

  return (
    <section className="py-5">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="shadow-sm border-0 p-4">
              <h3 className="text-center fw-bold mb-4">
                Construction Services Request
              </h3>
              <Form onSubmit={handleSubmit}>
                {/* Service Type */}
                <Form.Group className="mb-3">
                  <Form.Label>Service Type</Form.Label>
                  <Form.Select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select Service --</option>
                    <option>New Construction</option>
                    <option>Renovation</option>
                    <option>Interior Design</option>
                    <option>Plumbing & Electrical</option>
                    <option>Painting</option>
                    <option>Other</option>
                  </Form.Select>
                </Form.Group>

                {/* Property Type */}
                <Form.Group className="mb-3">
                  <Form.Label>Property Type</Form.Label>
                  <Form.Select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select Property --</option>
                    <option>House</option>
                    <option>Apartment</option>
                    <option>Commercial Building</option>
                    <option>Office</option>
                    <option>Plot / Land</option>
                  </Form.Select>
                </Form.Group>

                {/* City & Location */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        placeholder="Enter City"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Location</Form.Label>
                      <Form.Control
                        type="text"
                        name="location"
                        placeholder="Enter Location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Budget */}
                <Form.Group className="mb-3">
                  <Form.Label>Budget (PKR)</Form.Label>
                  <Form.Control
                    type="number"
                    name="budget"
                    placeholder="Enter Budget Estimate"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Description */}
                <Form.Group className="mb-3">
                  <Form.Label>Project Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    placeholder="Describe your project requirements..."
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Contact Info */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobile"
                    placeholder="03XXXXXXXXX"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* File Upload */}
                <Form.Group className="mb-4">
                  <Form.Label>Upload Design / Plan (Optional)</Form.Label>
                  <Form.Control
                    type="file"
                    name="file"
                    accept="image/*,.pdf"
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* Submit Button */}
                <div className="text-center">
                  <Button
                    type="submit"
                    size="lg"
                    className="px-5"
                    style={{ backgroundColor: "#00A651", borderColor: "#00A651" }}
                  >
                    Submit Request
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ConstructionForm;
