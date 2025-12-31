// src/components/Admin/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Spinner, Container } from "react-bootstrap";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("adminToken");

      // No token found
      if (!token) {
        setLoading(false);
        setIsAuthenticated(false);
        return;
      }

      try {
        // Verify token with backend
        const response = await axios.get(
          `${process.env.VITE_API_URL}/api/admin/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Token is valid
        if (response.data) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        // Token is invalid or expired
        console.error("Authentication failed:", error);
        localStorage.removeItem("adminToken");
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  // Show loading spinner while verifying token
  if (loading) {
    return (
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%)",
        }}
      >
        <div className="text-center">
          <Spinner
            animation="border"
            style={{
              color: "#27ae60",
              width: "3rem",
              height: "3rem",
              borderWidth: "0.3rem",
            }}
          />
          <p
            className="mt-3 fw-semibold"
            style={{
              color: "#666",
              fontSize: "16px",
            }}
          >
            Verifying authentication...
          </p>
        </div>
      </Container>
    );
  }

  // If authenticated, show the protected component
  // If not authenticated, redirect to login
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
