import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const MaterialForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyType: "",
    city: "",
    address: "",
    description: "",
    products: "",
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
    console.log("Material Company Form Submitted:", formData);
    alert("Material company submitted successfully!");
  };

  return (
    <section className="py-5">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="shadow-sm border-0 p-4">
              <h3 className="text-center fw-bold mb-4">Register Material Company</h3>
              <Form onSubmit={handleSubmit}>
                {/* Company Name */}
                <Form.Group className="mb-3">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="companyName"
                    placeholder="Enter Company Name"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Company Type */}
                <Form.Group className="mb-3">
                  <Form.Label>Company Type / Category</Form.Label>
                  <Form.Select
                    name="companyType"
                    value={formData.companyType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select Company Type --</option>
                    <option>Cement</option>
                    <option>Steel</option>
                    <option>Bricks</option>
                    <option>Paint</option>
                    <option>Electrical</option>
                    <option>Plumbing</option>
                    <option>Hardware</option>
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
                        placeholder="Enter Company Address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Description */}
                <Form.Group className="mb-3">
                  <Form.Label>Company Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    placeholder="Briefly describe your company..."
                    value={formData.description}
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* Products / Materials Offered */}
                <Form.Group className="mb-3">
                  <Form.Label>Products / Materials Offered</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="products"
                    placeholder="List your products or materials..."
                    value={formData.products}
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
                  <Form.Label>Upload Company Logo</Form.Label>
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
                    Submit Company
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

export default MaterialForm;
