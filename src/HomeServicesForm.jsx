import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const HomeServicesForm = () => {
  const [formData, setFormData] = useState({
    serviceName: "",
    category: "",
    city: "",
    address: "",
    description: "",
    availability: "",
    rate: "",
    contactName: "",
    email: "",
    mobile: "",
    image: null,
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
    console.log("Home Services Form Submitted:", formData);
    alert("Home service submitted successfully!");
  };

  return (
    <section className="py-5">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="shadow-sm border-0 p-4">
              <h3 className="text-center fw-bold mb-4">Register Your Home Service</h3>
              <Form onSubmit={handleSubmit}>
                {/* Service Name */}
                <Form.Group className="mb-3">
                  <Form.Label>Service Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="serviceName"
                    placeholder="Enter Service Name"
                    value={formData.serviceName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Category */}
                <Form.Group className="mb-3">
                  <Form.Label>Service Category</Form.Label>
                  <Form.Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select Category --</option>
                    <option>Plumbing</option>
                    <option>Electrical</option>
                    <option>Cleaning</option>
                    <option>Painting</option>
                    <option>Carpentry</option>
                    <option>Renovation</option>
                    <option>Other</option>
                  </Form.Select>
                </Form.Group>

                {/* Location */}
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
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        placeholder="Enter Address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Description */}
                <Form.Group className="mb-3">
                  <Form.Label>Service Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    placeholder="Describe your service..."
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Availability & Rate */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Availability</Form.Label>
                      <Form.Select
                        name="availability"
                        value={formData.availability}
                        onChange={handleChange}
                        required
                      >
                        <option value="">-- Select Availability --</option>
                        <option>Full-Time</option>
                        <option>Part-Time</option>
                        <option>Weekends</option>
                        <option>Flexible</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Pricing / Rate</Form.Label>
                      <Form.Control
                        type="text"
                        name="rate"
                        placeholder="Enter Rate (PKR)"
                        value={formData.rate}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Contact Info */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Contact Person Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="contactName"
                        placeholder="Enter Name"
                        value={formData.contactName}
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

                {/* Image Upload */}
                <Form.Group className="mb-4">
                  <Form.Label>Upload Image / Logo (Optional)</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    accept="image/*"
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
                    Submit Service
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

export default HomeServicesForm;
