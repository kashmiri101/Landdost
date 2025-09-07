import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert, Spinner } from "react-bootstrap";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    city: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [apiError, setApiError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setApiError("");
  };

  // Frontend validation
  const validateForm = () => {
    const validationErrors = {};
    if (!formData.fullName) validationErrors.fullName = "Full Name is required";
    if (!formData.email) validationErrors.email = "Email is required";
    if (!formData.mobileNumber) validationErrors.mobileNumber = "Phone Number is required";
    if (!formData.city) validationErrors.city = "City is required";
    if (!formData.password) validationErrors.password = "Password is required";
    if (!formData.role) validationErrors.role = "Role is required";
    return validationErrors;
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    setSuccess("");
    setApiError("");

    try {
      const response = await axios.post(
        "https://bostangroupinc.com/api/register",
        formData
      );

      if (response.data?.success) {
        setSuccess(response.data.message || "Successfully registered! Redirecting to login...");
        // Redirect user to Login page after 2s
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setApiError(response.data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      // Handle 409 Conflict (email already exists) and other backend errors
      if (error.response?.status === 409) {
        setApiError(error.response.data.message || "Email already exists.");
      } else if (error.response?.data?.errors) {
        const backendErrors = {};
        for (let key in error.response.data.errors) {
          backendErrors[key] = error.response.data.errors[key][0];
        }
        setErrors(backendErrors);
      } else if (error.response?.data?.message) {
        setApiError(error.response.data.message);
      } else {
        setApiError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="py-5 d-flex align-items-center"
      style={{ background: "linear-gradient(to right, #EAEEFF, #B6FE8F)" }}
    >
      <Container>
        <Row className="justify-content-center align-items-center">
          {/* Left Side - Illustration */}
          <Col md={6} className="text-center mb-4 mb-md-0">
            <img
              src="/images/addproperty.png"
              alt="Buildings"
              className="img-fluid mb-3"
              style={{ maxHeight: "280px" }}
            />
            <h5 className="fw-bold">Browse a Wide Range of Properties</h5>
            <p className="text-muted">
              Explore Thousands of property listings and save your favorites across devices
            </p>
          </Col>

          {/* Right Side - Register Form */}
          <Col md={5}>
            <div className="p-4 bg-white shadow-sm rounded-3">
              <h5 className="fw-semibold mb-3">Register</h5>

              {/* Social Buttons */}
              <div className="d-flex gap-2 mb-3">
                <Button
                  variant=""
                  className="flex-fill d-flex border align-items-center justify-content-center"
                >
                  <FaGoogle /> Continue with Google
                </Button>
                <Button
                  variant=""
                  className="flex-fill d-flex border align-items-center justify-content-center"
                >
                  <FaFacebook className="me-2 text-primary" /> Continue with Facebook
                </Button>
              </div>

              <div className="text-center text-muted mb-3">or</div>

              {/* Success & API Error Messages */}
              {success && <Alert variant="success">{success}</Alert>}
              {apiError && <Alert variant="danger">{apiError}</Alert>}

              {/* Register Form */}
              <Form onSubmit={handleSubmit}>
                {[
                  { label: "Full Name", name: "fullName", type: "text", placeholder: "Enter your full name" },
                  { label: "Email Address", name: "email", type: "email", placeholder: "Enter your email" },
                  { label: "Phone Number", name: "mobileNumber", type: "text", placeholder: "03XXXXXXXXX" },
                  { label: "City", name: "city", type: "text", placeholder: "Enter your city" },
                  { label: "Password", name: "password", type: "password", placeholder: "Enter password" },
                ].map((field) => (
                  <Form.Group key={field.name} className="mb-3" controlId={`register${field.name}`}>
                    <Form.Label>{field.label}</Form.Label>
                    <Form.Control
                      type={field.type}
                      placeholder={field.placeholder}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      isInvalid={!!errors[field.name]}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors[field.name]}
                    </Form.Control.Feedback>
                  </Form.Group>
                ))}

                {/* Role Dropdown */}
                <Form.Group className="mb-3" controlId="registerRole">
                  <Form.Label>Register As</Form.Label>
                  <Form.Select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    isInvalid={!!errors.role}
                  >
                    <option value="">Select Role</option>
                    <option value="Buyer">Buyer</option>
                    <option value="Seller">Seller</option>
                    <option value="Agent">Agent</option>
                    <option value="Developer">Developer</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.role}</Form.Control.Feedback>
                </Form.Group>

                <Button
                  variant="success"
                  type="submit"
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? <Spinner animation="border" size="sm" /> : "Register"}
                </Button>
              </Form>

              <div className="text-center mt-3">
                <span className="text-muted">Already have an account?</span>{" "}
                <Link to="/login" className="fw-semibold" style={{ color: "#00A651" }}>
                  Login
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
