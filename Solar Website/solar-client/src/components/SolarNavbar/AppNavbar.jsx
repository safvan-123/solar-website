import { useState, useEffect } from "react";
import { Sun, Download, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import logoIcon from "../../assets/images/ecogreen_logo.jpeg";
import logotext from "../../assets/images/ecogreen_text.jpeg";
import "./SolarNavbar.css";

const SolarNavbar = () => {
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (expanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [expanded]);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/products", label: "Products" },
    { path: "/careers", label: "Careers" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          {/* Logo */}
          <NavLink to="/" className="logo" onClick={() => setExpanded(false)}>
            <div className="logo-icon-wrapper">
              <img
                src={logoIcon}
                alt="EcoGreen Icon"
                className="logo-icon-img"
              />
            </div>
            <div className="logo-text-container">
              <div className="logo-brand-wrapper">
                <img
                  src={logotext}
                  alt="EcoGreen Text"
                  className="logo-text-img"
                />
              </div>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {/* <button
              className="brochure-btn"
              onClick={() => (window.location.href = "/brochure")}
            >
              <Download size={18} />
              Brochure
            </button> */}
          </div>

          {/* Mobile Toggle */}
          <button
            className="toggle-btn"
            onClick={() => setExpanded((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {expanded ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      <div
        className={`mobile-menu-backdrop ${expanded ? "show" : ""}`}
        onClick={() => setExpanded(false)}
      />

      {/* Mobile Menu Sidebar */}
      <div className={`mobile-menu-sidebar ${expanded ? "show" : ""}`}>
        <button
          className="close-btn"
          onClick={() => setExpanded(false)}
          aria-label="Close menu"
        >
          <X size={24} />
        </button>

        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `mobile-nav-link ${isActive ? "active" : ""}`
            }
            onClick={() => setExpanded(false)}
          >
            {link.label}
          </NavLink>
        ))}

        <button
          className="brochure-btn mobile-brochure-btn"
          onClick={() => {
            window.location.href = "/brochure";
            setExpanded(false);
          }}
        >
          <Download size={18} />
          Download Brochure
        </button>
      </div>
    </>
  );
};

export default SolarNavbar;
