import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEnquiries: 0,
    activeProjects: 0,
    productsListed: 0,
    websiteVisitors: 0,
  });
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [contactsRes, productsRes, jobsRes] = await Promise.allSettled([
        fetch(`${API_URL}/api/contacts`).then((res) =>
          res.ok ? res.json() : []
        ),
        fetch(`${API_URL}/api/products`).then((res) =>
          res.ok ? res.json() : []
        ),
        fetch(`${API_URL}/api/jobs`).then((res) => (res.ok ? res.json() : [])),
      ]);

      const contacts =
        contactsRes.status === "fulfilled" && Array.isArray(contactsRes.value)
          ? contactsRes.value
          : [];
      const products =
        productsRes.status === "fulfilled" && Array.isArray(productsRes.value)
          ? productsRes.value
          : [];
      const jobs =
        jobsRes.status === "fulfilled" && Array.isArray(jobsRes.value)
          ? jobsRes.value
          : [];

      setStats({
        totalEnquiries: contacts.length,
        activeProjects: jobs.length,
        productsListed: products.length,
        websiteVisitors: Math.floor(Math.random() * 20000) + 10000,
      });

      const sortedContacts = contacts
        .sort((a, b) => {
          const dateA = new Date(a.createdAt || a.date || 0);
          const dateB = new Date(b.createdAt || b.date || 0);
          return dateB - dateA;
        })
        .slice(0, 5);

      setRecentEnquiries(sortedContacts);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    const statusMap = {
      new: { bg: "primary", text: "primary" },
      pending: { bg: "warning", text: "warning" },
      "in progress": { bg: "info", text: "info" },
      completed: { bg: "success", text: "success" },
      resolved: { bg: "success", text: "success" },
    };
    return (
      statusMap[status?.toLowerCase()] || { bg: "secondary", text: "secondary" }
    );
  };

  const statsDisplay = [
    {
      label: "Total Enquiries",
      value: stats.totalEnquiries,
      // change: "+12%",
      // changeType: "increase",
      icon: "📧",
      color: "primary",
      bgGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      label: "Active Projects",
      value: stats.activeProjects,
      // change: "+8%",
      // changeType: "increase",
      icon: "🚀",
      color: "success",
      bgGradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      label: "Products Listed",
      value: stats.productsListed,
      // change: "+3%",
      // changeType: "increase",
      icon: "📦",
      color: "info",
      bgGradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    // {
    //   label: "Website Visitors",
    //   value: `${(stats.websiteVisitors / 1000).toFixed(1)}K`,
    //   // change: "+23%",
    //   // changeType: "increase",
    //   icon: "👥",
    //   color: "warning",
    //   bgGradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    // },
  ];

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "70vh" }}
      >
        <div className="text-center">
          <div
            className="spinner-border text-primary mb-3"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div
          className="alert alert-danger d-flex align-items-center"
          role="alert"
        >
          <div className="flex-grow-1">
            <h5 className="alert-heading mb-2">⚠️ Error Loading Dashboard</h5>
            <p className="mb-0">{error}</p>
          </div>
          <button
            className="btn btn-outline-danger ms-3"
            onClick={fetchDashboardData}
          >
            <i className="bi bi-arrow-clockwise me-2"></i>Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-4 py-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1 fw-bold">Dashboard Overview</h2>
          <p className="text-muted mb-0">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <button
          className="btn btn-outline-secondary"
          onClick={fetchDashboardData}
          style={{ borderRadius: "8px" }}
        >
          <span style={{ marginRight: "8px" }}>🔄</span>
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        {statsDisplay.map((stat, idx) => (
          <div key={idx} className="col-12 col-sm-6 col-xl-3">
            <div
              className="card border-0 h-100 position-relative overflow-hidden"
              style={{
                borderRadius: "16px",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
              }}
            >
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="flex-grow-1">
                    <p
                      className="text-muted mb-2 small text-uppercase fw-semibold"
                      style={{ letterSpacing: "0.5px" }}
                    >
                      {stat.label}
                    </p>
                    <h2 className="mb-0 fw-bold" style={{ fontSize: "2rem" }}>
                      {stat.value}
                    </h2>
                  </div>
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "12px",
                      background: stat.bgGradient,
                      fontSize: "24px",
                    }}
                  >
                    {stat.icon}
                  </div>
                </div>
                {/* <div className="d-flex align-items-center">
                  <span
                    className={`badge me-2`}
                    style={{
                      background:
                        stat.changeType === "increase" ? "#dcfce7" : "#fee2e2",
                      color:
                        stat.changeType === "increase" ? "#16a34a" : "#dc2626",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                    }}
                  >
                    {stat.changeType === "increase" ? "↑" : "↓"} {stat.change}
                  </span>
                  <span className="text-muted small">vs last month</span>
                </div> */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="row g-4">
        {/* Recent Enquiries Table */}
        <div className="col-12 col-lg-8">
          <div
            className="card border-0 h-100"
            style={{
              borderRadius: "16px",
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          >
            <div
              className="card-header bg-white border-0 py-4 px-4"
              style={{ borderRadius: "16px 16px 0 0" }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1 fw-bold">Recent Enquiries</h5>
                  <p className="text-muted small mb-0">
                    Latest customer inquiries and contacts
                  </p>
                </div>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => (window.location.href = "/admin/contacts")}
                  style={{ borderRadius: "8px" }}
                >
                  View All
                </button>
              </div>
            </div>
            <div className="card-body p-0">
              {recentEnquiries.length === 0 ? (
                <div className="text-center py-5">
                  <div className="mb-3" style={{ fontSize: "48px" }}>
                    📭
                  </div>
                  <h6 className="text-muted">No enquiries found</h6>
                  <p className="text-muted small mb-0">
                    New enquiries will appear here
                  </p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead style={{ background: "#f8f9fa" }}>
                      <tr>
                        <th className="border-0 px-4 py-3 fw-semibold text-muted small text-uppercase">
                          Name
                        </th>
                        <th className="border-0 py-3 fw-semibold text-muted small text-uppercase">
                          Email
                        </th>
                        <th className="border-0 py-3 fw-semibold text-muted small text-uppercase">
                          Message
                        </th>
                        <th className="border-0 py-3 fw-semibold text-muted small text-uppercase">
                          Date
                        </th>
                        <th className="border-0 py-3 fw-semibold text-muted small text-uppercase">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentEnquiries.map((enquiry, idx) => (
                        <tr
                          key={enquiry._id || idx}
                          style={{ cursor: "pointer" }}
                        >
                          <td className="px-4 py-3">
                            <div className="d-flex align-items-center">
                              <div
                                className="d-flex align-items-center justify-content-center me-3"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  borderRadius: "10px",
                                  background:
                                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                  color: "white",
                                  fontWeight: "600",
                                  fontSize: "14px",
                                }}
                              >
                                {(enquiry.name || "?").charAt(0).toUpperCase()}
                              </div>
                              <span className="fw-semibold">
                                {enquiry.name || "N/A"}
                              </span>
                            </div>
                          </td>
                          <td className="py-3">
                            <span className="text-muted small">
                              {enquiry.email || "N/A"}
                            </span>
                          </td>
                          <td className="py-3">
                            <span
                              className="text-muted small d-inline-block text-truncate"
                              style={{ maxWidth: "250px" }}
                              title={
                                enquiry.message || enquiry.subject || "N/A"
                              }
                            >
                              {enquiry.message || enquiry.subject || "N/A"}
                            </span>
                          </td>
                          <td className="py-3">
                            <span className="text-muted small">
                              {formatDate(enquiry.createdAt || enquiry.date)}
                            </span>
                          </td>
                          <td className="py-3">
                            <span
                              className={`badge bg-${
                                getStatusColor(enquiry.status || "new").bg
                              } bg-opacity-10 text-${
                                getStatusColor(enquiry.status || "new").text
                              }`}
                              style={{
                                padding: "6px 12px",
                                borderRadius: "8px",
                                fontWeight: "500",
                                fontSize: "0.75rem",
                              }}
                            >
                              {enquiry.status || "New"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions & Activity */}
        <div className="col-12 col-lg-4">
          {/* Quick Actions */}
          <div
            className="card border-0 mb-4"
            style={{
              borderRadius: "16px",
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          >
            <div
              className="card-header bg-white border-0 py-4 px-4"
              style={{ borderRadius: "16px 16px 0 0" }}
            >
              <h5 className="mb-1 fw-bold">Quick Actions</h5>
              <p className="text-muted small mb-0">Frequently used shortcuts</p>
            </div>
            <div className="card-body p-4">
              <div className="d-grid gap-3">
                {[
                  {
                    label: "Add New Product",
                    icon: "📦",
                    href: "/admin/products",
                    gradient:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  },
                  {
                    label: "Post Career Opening",
                    icon: "💼",
                    href: "/admin/jobs",
                    gradient:
                      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                  },
                  {
                    label: "View All Enquiries",
                    icon: "📧",
                    href: "/admin/enquiries",
                    gradient:
                      "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                  },
                  {
                    label: "Manage Products",
                    icon: "⚙️",
                    href: "/admin/products",
                    gradient:
                      "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
                  },
                ].map((action, idx) => (
                  <button
                    key={idx}
                    className="btn text-start d-flex align-items-center p-3"
                    onClick={() => (window.location.href = action.href)}
                    style={{
                      background: "white",
                      border: "2px solid #e5e7eb",
                      borderRadius: "12px",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = action.gradient;
                      e.currentTarget.style.borderColor = "transparent";
                      e.currentTarget.style.color = "white";
                      e.currentTarget.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "white";
                      e.currentTarget.style.borderColor = "#e5e7eb";
                      e.currentTarget.style.color = "inherit";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    <span className="me-3" style={{ fontSize: "20px" }}>
                      {action.icon}
                    </span>
                    <span className="fw-semibold">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Activity Summary */}
          <div
            className="card border-0"
            style={{
              borderRadius: "16px",
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          >
            <div
              className="card-header bg-white border-0 py-4 px-4"
              style={{ borderRadius: "16px 16px 0 0" }}
            >
              <h5 className="mb-1 fw-bold">Activity Summary</h5>
              <p className="text-muted small mb-0">Recent system activity</p>
            </div>
            <div className="card-body p-4">
              <div className="d-flex flex-column gap-3">
                <div className="d-flex align-items-start">
                  <div
                    className="d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      background: "#dcfce7",
                      color: "#16a34a",
                      fontSize: "16px",
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </div>
                  <div className="flex-grow-1">
                    <p className="mb-1 fw-semibold small">
                      New enquiry received
                    </p>
                    <p className="text-muted small mb-0">2 minutes ago</p>
                  </div>
                </div>
                <div className="d-flex align-items-start">
                  <div
                    className="d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      background: "#dbeafe",
                      color: "#2563eb",
                      fontSize: "16px",
                      flexShrink: 0,
                    }}
                  >
                    📦
                  </div>
                  <div className="flex-grow-1">
                    <p className="mb-1 fw-semibold small">Product updated</p>
                    <p className="text-muted small mb-0">1 hour ago</p>
                  </div>
                </div>
                <div className="d-flex align-items-start">
                  <div
                    className="d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      background: "#fef3c7",
                      color: "#d97706",
                      fontSize: "16px",
                      flexShrink: 0,
                    }}
                  >
                    💼
                  </div>
                  <div className="flex-grow-1">
                    <p className="mb-1 fw-semibold small">
                      New job application
                    </p>
                    <p className="text-muted small mb-0">3 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
