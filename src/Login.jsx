import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert, Spinner } from "react-bootstrap";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setToken } from "./Auth"; // ✅ auth helper to store token

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://bostangroupinc.com/api/login",
        { email, password }
      );

      console.log("Login API Response:", response.data); // Debug

      // ✅ Fix: token is inside response.data.data
      const token = response.data.data?.token;

      if (response.data.success && token) {
        // Save token in localStorage via auth helper
        setToken(token);

        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        setError(response.data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.log("Login Error:", err.response?.data);
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="vh-100 d-flex align-items-center"
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

          {/* Right Side - Login Card */}
          <Col md={5}>
            <div className="p-4 bg-white shadow-sm rounded-3">
              <h5 className="fw-semibold mb-3">Login</h5>

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

              {/* Login Form */}
              <Form onSubmit={handleSubmit}>
                {error && <Alert variant="danger">{error}</Alert>}

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="abc@xyz.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Form.Check type="checkbox" label="Remember me" />
                  <a href="#" className="text-decoration-none small text-primary">
                    Forgot Password?
                  </a>
                </div>

                <Button
                  type="submit"
                  className="w-100 mb-3 fw-semibold"
                  style={{ backgroundColor: "#00A651", borderColor: "#00A651" }}
                  disabled={loading}
                >
                  {loading ? <Spinner animation="border" size="sm" /> : "Login"}
                </Button>
              </Form>

              <div className="text-center">
                <span className="text-muted">Don’t have an account?</span>{" "}
                <Link
                  to="/register"
                  className="fw-semibold"
                  style={{ color: "#00A651" }}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
