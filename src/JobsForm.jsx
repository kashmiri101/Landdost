import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const JobsForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    category: "",
    jobType: "",
    city: "",
    address: "",
    salary: "",
    experience: "",
    skills: "",
    description: "",
    companyName: "",
    contactName: "",
    email: "",
    mobile: "",
    applyLink: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Opportunity Form Submitted:", formData);
    alert("Job posted successfully!");
  };

  return (
    <section className="py-5">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="shadow-sm border-0 p-4">
              <h3 className="text-center fw-bold mb-4">Post a Job Opportunity</h3>
              <Form onSubmit={handleSubmit}>
                {/* Job Title */}
                <Form.Group className="mb-3">
                  <Form.Label>Job Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="jobTitle"
                    placeholder="Enter Job Title"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Job Category */}
                <Form.Group className="mb-3">
                  <Form.Label>Job Category / Department</Form.Label>
                  <Form.Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select Category --</option>
                    <option>IT</option>
                    <option>Construction</option>
                    <option>Sales</option>
                    <option>Marketing</option>
                    <option>HR</option>
                    <option>Finance</option>
                    <option>Other</option>
                  </Form.Select>
                </Form.Group>

                {/* Job Type */}
                <Form.Group className="mb-3">
                  <Form.Label>Job Type</Form.Label>
                  <Form.Select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select Job Type --</option>
                    <option>Full-Time</option>
                    <option>Part-Time</option>
                    <option>Internship</option>
                    <option>Contract</option>
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
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Salary & Experience */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Salary Range (PKR)</Form.Label>
                      <Form.Control
                        type="text"
                        name="salary"
                        placeholder="e.g. 50,000 - 80,000"
                        value={formData.salary}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Experience Required</Form.Label>
                      <Form.Control
                        type="text"
                        name="experience"
                        placeholder="e.g. 2-5 years"
                        value={formData.experience}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Skills / Qualifications */}
                <Form.Group className="mb-3">
                  <Form.Label>Skills / Qualifications</Form.Label>
                  <Form.Control
                    type="text"
                    name="skills"
                    placeholder="Enter required skills or qualifications"
                    value={formData.skills}
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* Job Description */}
                <Form.Group className="mb-3">
                  <Form.Label>Job Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    placeholder="Describe the job responsibilities..."
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Company Info */}
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

                {/* Contact Person */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Contact Person Name</Form.Label>
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

                {/* Apply Link */}
                <Form.Group className="mb-4">
                  <Form.Label>Application Link / Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="applyLink"
                    placeholder="Enter link or email for application"
                    value={formData.applyLink}
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
                    Post Job
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

export default JobsForm;
