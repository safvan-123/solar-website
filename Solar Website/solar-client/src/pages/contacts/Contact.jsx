import React, { useEffect, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Check,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Loader2,
} from "lucide-react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    projectType: "",
    estimatedCapacity: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const API_BASE_URL = `${process.env.VITE_API_URL}/api/contacts`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.projectType ||
      !formData.message
    ) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          projectType: "",
          estimatedCapacity: "",
          message: "",
        });

        setTimeout(() => setSubmitted(false), 5000);
      } else {
        throw new Error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMessage(error.message || "Failed to connect to the server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["0477-2292212", "+91 8884146499"],
      color: "#3b82f6",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@ecogreensolar.in"],
      color: "#10b981",
    },
    {
      icon: MapPin,
      title: "Address",
      details: [
        "EcoGreen Energy and Automation Solutions",
        "Vadayil Building, Pallana, Thrikkunnapuzha, Kerala 690515",
      ],
      color: "#f59e0b",
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Mon - Sat: 9:00 AM - 6:00 PM", "Sunday: Closed"],
      color: "#8b5cf6",
    },
  ];

  const faqs = [
    {
      question: "How long does installation take?",
      answer:
        "Typically 2-5 days for residential, 1-3 weeks for commercial projects.",
    },
    {
      question: "What is the warranty period?",
      answer:
        "25-year performance warranty on panels, 5-year warranty on inverters.",
    },
    {
      question: "Do you provide financing options?",
      answer:
        "Yes, we offer flexible EMI plans and help with government subsidy applications.",
    },
  ];

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <div className="contact-badge">
            <MessageSquare size={14} className="badge-icon" />
            Get In Touch
          </div>
          <h1 className="contact-title">
            Start Your Sustainable Future with Ecogreen
          </h1>
          <p className="contact-subtitle">
            <strong>Your Trusted Solar Partner</strong> and Authorized Channel
            Partner of
            <strong> Tata Power Solaroof</strong>. Our experts are ready to
            provide custom energy solutions for your home or business.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="contact-main">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Info */}
            <div className="contact-info">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="info-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="info-header">
                    <div
                      className="info-icon"
                      style={{ backgroundColor: `${info.color}15` }}
                    >
                      <info.icon size={24} color={info.color} />
                    </div>
                    <div className="info-title">{info.title}</div>
                  </div>
                  <div className="info-details">
                    {info.details.map((detail, idx) => (
                      <div key={idx} className="info-detail">
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="contact-form-card">
              <div className="form-header">
                <h2 className="form-title">Send us a Message</h2>
                <p className="form-subtitle">
                  Fill out the form below and we'll get back to you within 24
                  hours
                </p>
              </div>

              {submitted && (
                <div className="success-message">
                  <Check size={20} />
                  <span>
                    Thank you! Your message has been sent successfully.
                  </span>
                </div>
              )}

              {errorMessage && (
                <div className="error-alert">{errorMessage}</div>
              )}

              <div className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      className="form-control"
                      placeholder="Enter Your Full Name"
                      value={formData.fullName}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter Your Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-control"
                      placeholder="Enter Your Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Project Type *</label>
                    <select
                      name="projectType"
                      className="form-select"
                      value={formData.projectType}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    >
                      <option value="">Select project type</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea
                    name="message"
                    className="form-control"
                    placeholder="Tell us about your project requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="spinner" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={20} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Find answers to common questions about our solar solutions
            </p>
          </div>
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="faq-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="faq-question">{faq.question}</h3>
                <p className="faq-answer">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Visit Our Office</h2>
            <p className="section-subtitle">Come meet us at our location</p>
          </div>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3937.2968334668994!2d76.38312837502231!3d9.306944990765928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOcKwMTgnMjUuMCJOIDc2wrAyMycwOC41IkU!5e0!3m2!1sen!2sin!4v1766827240266!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="EcoGreen Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Social Section */}
      {/* <section className="social-section">
        <div className="container">
          <h2 className="social-title">Connect With Us</h2>
          <p className="social-subtitle">
            Follow us on social media for updates and insights
          </p>
          <div className="social-icons">
            <a href="#" className="social-icon" aria-label="Facebook">
              <Facebook size={24} />
            </a>
            <a href="#" className="social-icon" aria-label="Twitter">
              <Twitter size={24} />
            </a>
            <a href="#" className="social-icon" aria-label="LinkedIn">
              <Linkedin size={24} />
            </a>
            <a href="#" className="social-icon" aria-label="Instagram">
              <Instagram size={24} />
            </a>
            <a href="#" className="social-icon" aria-label="YouTube">
              <Youtube size={24} />
            </a>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Contact;
