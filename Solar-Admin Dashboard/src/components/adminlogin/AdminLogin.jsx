import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
  Spinner,
} from "react-bootstrap";
import { Eye, EyeOff, Lock, Mail, Shield } from "lucide-react";
import axios from "axios";
import "./AdminLogin.css";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `${process.env.VITE_API_URL}/api/admin/login`,
        formData
      );

      console.log(response);

      // ✅ Store token
      localStorage.setItem("adminToken", response.data.token);

      // ✅ Store admin info (NEW)
      localStorage.setItem("adminInfo", JSON.stringify(response.data.admin));

      setSuccess("Login successful! Redirecting...");

      setTimeout(() => {
        navigate("/admin", { replace: true });
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col xs={12} sm={10} md={8} lg={5} xl={4}>
            <Card className="admin-login-card shadow-lg">
              <Card.Body className="p-4 p-md-5">
                {/* Header */}
                <div className="text-center mb-4">
                  <div className="admin-icon-wrapper mb-3">
                    <Shield size={48} className="admin-icon" />
                  </div>
                  <h2 className="admin-title mb-2">Admin Login</h2>
                  <p className="admin-subtitle text-muted">
                    Enter your credentials to access the dashboard
                  </p>
                </div>

                {/* Error Alert */}
                {error && (
                  <Alert
                    variant="danger"
                    dismissible
                    onClose={() => setError("")}
                  >
                    {error}
                  </Alert>
                )}

                {/* Success Alert */}
                {success && <Alert variant="success">{success}</Alert>}

                {/* Login Form */}
                <Form onSubmit={handleSubmit}>
                  {/* Email Field */}
                  <Form.Group className="mb-3">
                    <Form.Label className="form-label-custom">
                      <Mail size={16} className="me-2" />
                      Email Address
                    </Form.Label>
                    <div className="input-icon-wrapper">
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="admin@ecogreen.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-control-custom"
                      />
                    </div>
                  </Form.Group>

                  {/* Password Field */}
                  <Form.Group className="mb-4">
                    <Form.Label className="form-label-custom">
                      <Lock size={16} className="me-2" />
                      Password
                    </Form.Label>
                    <div className="password-input-wrapper">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="form-control-custom"
                      />
                      <button
                        type="button"
                        className="password-toggle-btn"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </Form.Group>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="login-btn w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Logging in...
                      </>
                    ) : (
                      <>
                        <Lock size={18} className="me-2" />
                        Login to Dashboard
                      </>
                    )}
                  </Button>
                </Form>

                {/* Footer */}
                <div className="text-center mt-4">
                  <p className="admin-footer-text text-muted">
                    Secured with end-to-end encryption
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminLogin;
