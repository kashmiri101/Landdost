import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    projectType: "",
    city: "",
    address: "",
    budget: "",
    startDate: "",
    endDate: "",
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
    console.log("Project Form Submitted:", formData);
    alert("Project has been submitted successfully!");
  };

  return (
    <section className="py-5">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="shadow-sm border-0 p-4">
              <h3 className="text-center fw-bold mb-4">Submit Your Project</h3>
              <Form onSubmit={handleSubmit}>
                {/* Project Title */}
                <Form.Group className="mb-3">
                  <Form.Label>Project Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Enter Project Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Project Type */}
                <Form.Group className="mb-3">
                  <Form.Label>Project Type</Form.Label>
                  <Form.Select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select Project Type --</option>
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>Industrial</option>
                    <option>Infrastructure</option>
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
                      <Form.Label>Address / Location</Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        placeholder="Enter Project Location"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Budget */}
                <Form.Group className="mb-3">
                  <Form.Label>Estimated Budget (PKR)</Form.Label>
                  <Form.Control
                    type="number"
                    name="budget"
                    placeholder="Enter Budget Estimate"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Start & End Date */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>End Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Description */}
                <Form.Group className="mb-3">
                  <Form.Label>Project Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    placeholder="Describe your project..."
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
                  <Form.Label>Upload Project Plan / File (Optional)</Form.Label>
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
                    Submit Project
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

export default ProjectForm;
