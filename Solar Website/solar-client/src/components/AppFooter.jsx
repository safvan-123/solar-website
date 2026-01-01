import React from "react";
import {
  Sun,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Linkedin,
  Instagram,
  Clock,
} from "lucide-react";

const AppFooter = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Products", href: "/products" },
    // { label: "Projects", href: "/projects" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/share/17jdiuE2TZ/",
      label: "Facebook",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/ecogreensolaralpy",
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/ecogreen_solar?utm_source=qr&igsh=b3NlYmNwNnBubWoy",
      label: "Instagram",
    },
  ];

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .footer-container {
          background-color: #ffffff;
          background-image: 
            radial-gradient(circle at 0% 100%, rgba(34, 197, 94, 0.12) 0%, transparent 40%),
            radial-gradient(circle at 100% 0%, rgba(14, 165, 233, 0.08) 0%, transparent 40%),
            linear-gradient(135deg, #f0fdf4 0%, #ffffff 50%, #e0f2fe 100%);
          color: #1e293b;
          position: relative;
          overflow: hidden;
          border-top: 1px solid #e2e8f0;
        }

        .footer-container::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: url("data:image/svg+xml,%3Csvg viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,1000 C300,800 700,900 1000,600 L1000,1000 L0,1000 Z' fill='rgba(34, 197, 94, 0.04)'/%3E%3C/svg%3E");
          background-size: cover;
          pointer-events: none;
        }

        .footer-top {
          padding: 60px 24px;
          position: relative;
          z-index: 1;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          /* Default for > 1000px: 3 columns in one row */
          grid-template-columns: 1.5fr 1fr 1fr;
          gap: 32px;
        }

        .footer-brand {
          animation: fadeInUp 0.8s ease-out;
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(8px);
          padding: 24px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.6);
        }

        .footer-logo {
          display: flex;
          align-items: center;
          margin-bottom: 16px;
          font-size: 24px;
          font-weight: 800;
          color: #064e3b;
          text-decoration: none;
        }

        .footer-description {
          color: #475569;
          line-height: 1.5;
          margin-bottom: 20px;
          font-size: 14px;
        }

        .footer-contact-item {
          display: flex;
          align-items: start;
          gap: 10px;
          margin-bottom: 12px;
          color: #334155;
          font-size: 13px;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .footer-contact-icon {
          color: #0ea5e9;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .footer-title {
          font-size: 17px;
          font-weight: 700;
          margin-bottom: 20px;
          color: #0f172a;
          position: relative;
        }

        .footer-title::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -6px;
          width: 24px;
          height: 3px;
          background: linear-gradient(90deg, #22c55e, #0ea5e9);
          border-radius: 10px;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-link {
          margin-bottom: 10px;
        }

        .footer-link a {
          color: #475569;
          text-decoration: none;
          font-size: 14px;
          transition: all 0.2s ease;
        }

        .footer-link a:hover {
          color: #22c55e;
          padding-left: 4px;
        }

        .social-links {
          display: flex;
          gap: 8px;
          margin-top: 8px;
          flex-wrap: wrap;
        }

        .social-link {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background: white;
          border: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
          transition: all 0.3s ease;
        }

        .social-link:hover {
          background: #0ea5e9;
          color: white;
          transform: translateY(-2px);
        }

        .footer-bottom {
          background: #f8fafc;
          padding: 20px;
          border-top: 1px solid #e2e8f0;
          position: relative;
          z-index: 1;
        }

        .footer-bottom-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .footer-copyright {
          color: #64748b;
          font-size: 13px;
        }

        .footer-legal-link {
          color: #64748b;
          text-decoration: none;
          font-size: 13px;
          margin-left: 16px;
        }

        /* --- RESPONSIVE ADJUSTMENTS --- */
        
        /* When screen is less than 1000px but more than 500px */
        @media (max-width: 1000px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .mobile-row-links {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
        }

        /* Mobile specific adjustments (below 500px) */
        @media (max-width: 500px) {
          .footer-top { padding: 30px 16px; }
          
          /* Ensuring Brand is top and links are side-by-side */
          .footer-content {
            display: flex;
            flex-direction: column;
            gap: 24px;
          }
          
          .mobile-row-links {
            display: grid;
            grid-template-columns: 1fr 1fr; /* Forced side-by-side row */
            gap: 12px;
          }

          .footer-brand { padding: 16px; border-radius: 16px; }
          .footer-logo { font-size: 21px; }
          .footer-title { font-size: 15px; margin-bottom: 12px; }
          .footer-description { font-size: 13px; margin-bottom: 15px; }
          
          .footer-bottom-content { flex-direction: column; text-align: center; gap: 8px; }
          .footer-legal-link { margin: 0 8px; }
        }
      `}</style>

      <footer className="footer-container">
        <div className="footer-top">
          <div className="footer-content">
            {/* Brand Section */}
            <div className="footer-brand">
              <a href="/" className="footer-logo">
                <Sun
                  size={28}
                  color="#22c55e"
                  style={{ marginRight: "10px" }}
                />
                EcoGreen
              </a>
              <p className="footer-description">
                Your authorized Tata Power channel partner. Providing reliable,
                innovative solar systems that empower communities and protect
                our planet.
              </p>
              <div className="footer-contact-item">
                <Phone size={16} className="footer-contact-icon" />
                <span>0477-2292212 , +91 88481 32212</span>
              </div>
              <div className="footer-contact-item">
                <Mail size={16} className="footer-contact-icon" />
                <span>info@ecogreensolar.in</span>
              </div>
              <div className="footer-contact-item">
                <MapPin size={16} className="footer-contact-icon" />
                <span>
                  Vadayil Building, Pallana, Thrikkunnapuzha, Kerala - 690515
                </span>
              </div>
            </div>

            {/* This wrapper holds Quick Links and Follow Us to control their row behavior */}
            <div className="mobile-row-links" style={{ display: "grid" }}>
              {/* Quick Links */}
              <div className="footer-section">
                <h3 className="footer-title">Quick Links</h3>
                <ul className="footer-links">
                  {quickLinks.map((link, index) => (
                    <li key={index} className="footer-link">
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Follow Us */}
              <div className="footer-section">
                <h3 className="footer-title">Follow Us</h3>
                <div className="social-links">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="social-link"
                      aria-label={social.label}
                    >
                      <social.icon size={16} />
                    </a>
                  ))}
                </div>
                <div
                  className="footer-contact-item"
                  style={{ marginTop: "16px" }}
                >
                  <Clock size={16} className="footer-contact-icon" />
                  <span style={{ fontSize: "11px" }}>9:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-copyright">
              © {currentYear} EcoGreen Energy Solutions.
            </div>
            <div className="footer-legal-links">
              <a href="/privacy-policy" className="footer-legal-link">
                Privacy Policy
              </a>
              <a href="/terms-conditions" className="footer-legal-link">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default AppFooter;
