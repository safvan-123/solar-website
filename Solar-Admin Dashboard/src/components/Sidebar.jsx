import React, { useState } from "react";
import {
  Home,
  MessageSquare,
  Package,
  Briefcase,
  Users,
  Settings,
  Sun,
  Menu,
  Bell,
  Search,
  User,
  LogOut,
} from "lucide-react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

// Toast Component
const Toast = ({ message, onConfirm, onCancel }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
        padding: "24px",
        minWidth: "320px",
        maxWidth: "400px",
      }}
    >
      <div className="d-flex align-items-center mb-3">
        <div
          className="rounded-circle bg-warning bg-opacity-10 d-flex align-items-center justify-content-center me-3"
          style={{ width: "48px", height: "48px" }}
        >
          <LogOut size={24} className="text-warning" />
        </div>
        <h5 className="mb-0 fw-semibold">Confirm Logout</h5>
      </div>
      <p className="text-muted mb-4">{message}</p>
      <div className="d-flex gap-2 justify-content-end">
        <button
          onClick={onCancel}
          className="btn btn-light px-4"
          style={{ fontWeight: 500 }}
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="btn btn-danger px-4"
          style={{ fontWeight: 500 }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

// Backdrop Component
const Backdrop = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9998,
      }}
    />
  );
};

const Sidebar = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showLogoutToast, setShowLogoutToast] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { name, email } = JSON.parse(localStorage.getItem("adminInfo"));

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, path: "/admin" },
    {
      id: "enquiries",
      label: "Enquiries",
      icon: MessageSquare,
      path: "/admin/enquiries",
    },
    {
      id: "productcategories",
      label: "Product Categories",
      icon: Package,
      path: "/admin/productcategories",
    },
    {
      id: "products",
      label: "Products",
      icon: Package,
      path: "/admin/products",
    },
    {
      id: "jobs",
      label: "Jobs",
      icon: Briefcase,
      path: "/admin/jobs",
    },
    {
      id: "jobapplications",
      label: "Job Applications",
      icon: Users,
      path: "/admin/careers",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      path: "/admin/settings",
    },
  ];

  const handleLogoutClick = () => {
    setDropdownOpen(false);
    setShowLogoutToast(true);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutToast(false);
    // Add your logout logic here
    // Example: Clear tokens, redirect to login
    localStorage.removeItem("token");
    navigate("/login");
    console.log("User logged out");
    alert("Logged out successfully!");
  };

  const handleLogoutCancel = () => {
    setShowLogoutToast(false);
  };

  return (
    <>
      <div className="d-flex vh-100 bg-light">
        {/* Sidebar */}
        <div
          className={`bg-dark text-white d-flex flex-column ${
            sidebarCollapsed ? "sidebar-collapsed" : "sidebar-expanded"
          }`}
          style={{
            width: sidebarCollapsed ? "80px" : "260px",
            transition: "width 0.3s ease",
            position: "fixed",
            height: "100vh",
            zIndex: 1000,
          }}
        >
          {/* Logo */}
          <div className="p-3 border-bottom border-secondary d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <Sun size={32} className="text-warning" />
              {!sidebarCollapsed && (
                <span className="ms-2 fw-bold fs-5">Solar Admin</span>
              )}
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-grow-1 overflow-auto py-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                location.pathname === item.path ||
                (item.path === "/admin" && location.pathname === "/admin");

              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={`d-flex align-items-center px-3 py-3 position-relative sidebar-link ${
                    isActive ? "bg-primary" : ""
                  }`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Icon size={20} />
                  {!sidebarCollapsed && (
                    <>
                      <span className="ms-3">{item.label}</span>
                      {item.badge && (
                        <span className="badge bg-danger rounded-pill ms-auto">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                  {sidebarCollapsed && item.badge && (
                    <span
                      className="badge bg-danger rounded-circle position-absolute"
                      style={{
                        top: "8px",
                        right: "8px",
                        width: "8px",
                        height: "8px",
                        padding: 0,
                      }}
                    />
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="border-top border-secondary p-3">
            <div className="d-flex align-items-center">
              <div
                className="rounded-circle bg-primary d-flex align-items-center justify-content-center"
                style={{ width: "40px", height: "40px" }}
              >
                <User size={20} />
              </div>
              {!sidebarCollapsed && (
                <div className="ms-2 flex-grow-1">
                  <div className="fw-semibold small mt-3">
                    {name ? name : "Not login"}
                  </div>
                  <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                    admin@solar.com
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div
          className="flex-grow-1 d-flex flex-column"
          style={{
            marginLeft: sidebarCollapsed ? "80px" : "260px",
            transition: "margin-left 0.3s ease",
          }}
        >
          {/* Top Header */}
          <header className="bg-white border-bottom p-3 d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <button
                className="btn btn-link text-dark p-0 me-3"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              >
                <Menu size={24} />
              </button>
              <div className="input-group" style={{ maxWidth: "400px" }}>
                <span className="input-group-text bg-light border-0">
                  <Search size={18} />
                </span>
                <input
                  type="text"
                  className="form-control bg-light border-0"
                  placeholder="Search..."
                />
              </div>
            </div>
            <div className="d-flex align-items-center gap-3">
              {/* Custom Dropdown */}
              <div className="position-relative">
                <button
                  className="btn btn-light d-flex align-items-center gap-2"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  style={{
                    border: "1px solid #dee2e6",
                    borderRadius: "8px",
                    padding: "6px 12px",
                  }}
                >
                  <div
                    className="rounded-circle bg-primary d-flex align-items-center justify-content-center"
                    style={{ width: "32px", height: "32px" }}
                  >
                    <User size={16} className="text-white" />
                  </div>
                  <span className="d-none d-md-inline fw-semibold">{name}</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    style={{
                      transform: dropdownOpen
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.2s",
                    }}
                  >
                    <path
                      d="M3 4.5L6 7.5L9 4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {dropdownOpen && (
                  <>
                    <div
                      style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 999,
                      }}
                      onClick={() => setDropdownOpen(false)}
                    />
                    <div
                      className="position-absolute bg-white shadow-lg"
                      style={{
                        top: "calc(100% + 8px)",
                        right: 0,
                        minWidth: "200px",
                        borderRadius: "12px",
                        border: "1px solid #e9ecef",
                        zIndex: 1000,
                        overflow: "hidden",
                      }}
                    >
                      <div className="p-3 border-bottom">
                        <div className="fw-semibold small">{name}</div>
                        <div
                          className="text-muted"
                          style={{ fontSize: "0.75rem" }}
                        >
                          {email}
                        </div>
                      </div>

                      <div className="border-top"></div>
                      <button
                        className="w-100 btn btn-link text-start text-decoration-none px-3 py-2 d-flex align-items-center text-danger"
                        style={{
                          border: "none",
                          background: "none",
                          transition: "background-color 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#fff5f5";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }}
                        onClick={handleLogoutClick}
                      >
                        <LogOut size={16} className="me-2" />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </header>

          {/* Content Area */}
          <main className="flex-grow-1 overflow-auto p-4">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Logout Confirmation Toast */}
      {showLogoutToast && (
        <>
          <Backdrop onClick={handleLogoutCancel} />
          <Toast
            message="Are you sure you want to logout from your account?"
            onConfirm={handleLogoutConfirm}
            onCancel={handleLogoutCancel}
          />
        </>
      )}

      <style>{`
        .sidebar-link {
          transition: background-color 0.2s;
        }
        .sidebar-link:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
        .sidebar-link.bg-primary:hover {
          background-color: #0d6efd !important;
        }
        .cursor-pointer {
          cursor: pointer;
        }
        .table > :not(caption) > * > * {
          padding: 0.75rem 0.5rem;
        }
        .card {
          transition: transform 0.2s;
        }
        .card:hover {
          transform: translateY(-2px);
        }
      `}</style>
    </>
  );
};

export default Sidebar;
