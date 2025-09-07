    import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const BusinessForm = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    city: "",
    address: "",
    description: "",
    services: "",
    website: "",
    facebook: "",
    linkedin: "",
    contactName: "",
    email: "",
    mobile: "",
    landline: "",
    logo: null,
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
    console.log("Business Form Submitted:", formData);
    alert("Your business has been submitted successfully!");
  };

  return (
    <section className="py-5">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="shadow-sm border-0 p-4">
              <h3 className="text-center fw-bold mb-4">Register Your Business</h3>
              <Form onSubmit={handleSubmit}>
                {/* Business Name */}
                <Form.Group className="mb-3">
                  <Form.Label>Business Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="businessName"
                    placeholder="Enter Business Name"
                    value={formData.businessName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Business Type */}
                <Form.Group className="mb-3">
                  <Form.Label>Business Category</Form.Label>
                  <Form.Select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select Category --</option>
                    <option>Construction</option>
                    <option>Real Estate</option>
                    <option>IT & Software</option>
                    <option>Food & Restaurant</option>
                    <option>Education</option>
                    <option>Healthcare</option>
                    <option>Retail</option>
                    <option>Other</option>
                  </Form.Select>
                </Form.Group>

                {/* City & Address */}
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
                        placeholder="Enter Business Address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Description */}
                <Form.Group className="mb-3">
                  <Form.Label>Business Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    placeholder="Briefly describe your business..."
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Services */}
                <Form.Group className="mb-3">
                  <Form.Label>Services Offered</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="services"
                    placeholder="List your services..."
                    value={formData.services}
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* Website & Social Links */}
                <Form.Group className="mb-3">
                  <Form.Label>Website</Form.Label>
                  <Form.Control
                    type="url"
                    name="website"
                    placeholder="https://yourwebsite.com"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Facebook</Form.Label>
                      <Form.Control
                        type="url"
                        name="facebook"
                        placeholder="https://facebook.com/yourpage"
                        value={formData.facebook}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>LinkedIn</Form.Label>
                      <Form.Control
                        type="url"
                        name="linkedin"
                        placeholder="https://linkedin.com/company/yourpage"
                        value={formData.linkedin}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Contact Info */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Contact Person</Form.Label>
                      <Form.Control
                        type="text"
                        name="contactName"
                        placeholder="Enter Full Name"
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

                <Row>
                  <Col md={6}>
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
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Landline</Form.Label>
                      <Form.Control
                        type="text"
                        name="landline"
                        placeholder="051-XXXXXXX"
                        value={formData.landline}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Logo Upload */}
                <Form.Group className="mb-4">
                  <Form.Label>Upload Business Logo</Form.Label>
                  <Form.Control
                    type="file"
                    name="logo"
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
                    Submit Business
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

export default BusinessForm;
