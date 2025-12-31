import React, { useEffect, useState } from "react";
import {
  Sun,
  Building2,
  Home,
  Factory,
  MapPin,
  Calendar,
  Zap,
  TrendingUp,
  Award,
  Users,
  ArrowRight,
  ChevronRight,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "residential", label: "Residential" },
    { id: "commercial", label: "Commercial" },
    { id: "industrial", label: "Industrial" },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const projects = [
    {
      id: 1,
      category: "residential",
      title: "Luxury Villa Solar Installation",
      location: "Kozhikode, Kerala",
      capacity: "12 kW",
      date: "November 2024",
      image: "🏡",
      description:
        "Complete rooftop solar installation for a luxury villa with battery backup system",
      savings: "₹1.2L/year",
      co2Reduction: "8 tons/year",
      color: "#3b82f6",
      stats: {
        panels: 32,
        area: "180 sq.ft",
        completion: "45 days",
      },
    },
    {
      id: 2,
      category: "commercial",
      title: "IT Park Solar Project",
      location: "Kochi, Kerala",
      capacity: "150 kW",
      date: "October 2024",
      image: "🏢",
      description:
        "Large-scale commercial installation for a technology park with 500+ employees",
      savings: "₹18L/year",
      co2Reduction: "120 tons/year",
      color: "#10b981",
      stats: {
        panels: 400,
        area: "2500 sq.ft",
        completion: "90 days",
      },
    },
    {
      id: 3,
      category: "industrial",
      title: "Manufacturing Unit Solar System",
      location: "Thrissur, Kerala",
      capacity: "500 kW",
      date: "September 2024",
      image: "🏭",
      description:
        "Industrial-scale solar installation for 24/7 manufacturing operations",
      savings: "₹55L/year",
      co2Reduction: "400 tons/year",
      color: "#f59e0b",
      stats: {
        panels: 1250,
        area: "8000 sq.ft",
        completion: "120 days",
      },
    },
    {
      id: 4,
      category: "residential",
      title: "Eco-Friendly Apartment Complex",
      location: "Trivandrum, Kerala",
      capacity: "75 kW",
      date: "August 2024",
      image: "🏘️",
      description:
        "Multi-unit residential complex with shared solar power system",
      savings: "₹8.5L/year",
      co2Reduction: "60 tons/year",
      color: "#3b82f6",
      stats: {
        panels: 200,
        area: "1200 sq.ft",
        completion: "60 days",
      },
    },
    {
      id: 5,
      category: "commercial",
      title: "Shopping Mall Solar Installation",
      location: "Kannur, Kerala",
      capacity: "200 kW",
      date: "July 2024",
      image: "🏬",
      description:
        "Energy-efficient solution for a major retail shopping complex",
      savings: "₹22L/year",
      co2Reduction: "160 tons/year",
      color: "#10b981",
      stats: {
        panels: 530,
        area: "3200 sq.ft",
        completion: "75 days",
      },
    },
    {
      id: 6,
      category: "industrial",
      title: "Food Processing Plant",
      location: "Palakkad, Kerala",
      capacity: "300 kW",
      date: "June 2024",
      image: "🏗️",
      description:
        "High-capacity solar system for food processing and cold storage facility",
      savings: "₹35L/year",
      co2Reduction: "240 tons/year",
      color: "#f59e0b",
      stats: {
        panels: 800,
        area: "5000 sq.ft",
        completion: "100 days",
      },
    },
  ];

  const achievements = [
    {
      icon: Zap,
      value: "50+ MW",
      label: "Total Capacity Installed",
      color: "#f59e0b",
    },
    {
      icon: Users,
      value: "500+",
      label: "Happy Customers",
      color: "#3b82f6",
    },
    {
      icon: TrendingUp,
      value: "₹200Cr+",
      label: "Customer Savings",
      color: "#10b981",
    },
    {
      icon: Award,
      value: "15+",
      label: "Industry Awards",
      color: "#8b5cf6",
    },
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Homeowner",
      location: "Kozhikode",
      content:
        "The installation was seamless and professional. We are already seeing significant savings on our electricity bills!",
      rating: 5,
    },
    {
      name: "Priya Menon",
      role: "Business Owner",
      location: "Kochi",
      content:
        "Outstanding service and quality products. Our IT park is now 70% solar powered. Highly recommended!",
      rating: 5,
    },
    {
      name: "Arun Nair",
      role: "Factory Manager",
      location: "Thrissur",
      content:
        "Professional team, excellent execution. The ROI is better than expected. Great investment for our facility.",
      rating: 5,
    },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
          background: #ffffff;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .projects-hero {
          background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #3b82f6 100%);
          padding: 120px 24px 80px;
          text-align: center;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .projects-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></svg>');
          opacity: 0.5;
        }

        .projects-hero-content {
          max-width: 900px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          animation: fadeInUp 0.8s ease-out;
        }

        .projects-badge {
          display: inline-block;
          background: rgba(251, 191, 36, 0.2);
          color: #fbbf24;
          padding: 8px 20px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 24px;
          border: 2px solid rgba(251, 191, 36, 0.3);
          animation: scaleIn 0.6s ease-out 0.2s backwards;
        }

        .projects-title {
          font-size: 56px;
          font-weight: 800;
          margin-bottom: 24px;
          line-height: 1.2;
          animation: fadeInUp 0.8s ease-out 0.3s backwards;
        }

        .projects-subtitle {
          font-size: 20px;
          opacity: 0.95;
          line-height: 1.6;
          animation: fadeInUp 0.8s ease-out 0.4s backwards;
        }

        .achievements-section {
          padding: 80px 24px;
          background: white;
        }

        .section-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .achievements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }

        .achievement-card {
          text-align: center;
          padding: 40px 24px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          animation: scaleIn 0.6s ease-out backwards;
        }

        .achievement-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
        }

        .achievement-icon {
          width: 70px;
          height: 70px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          animation: float 3s ease-in-out infinite;
        }

        .achievement-value {
          font-size: 36px;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 8px;
        }

        .achievement-label {
          color: #64748b;
          font-size: 15px;
          font-weight: 500;
        }

        .projects-section {
          padding: 80px 24px;
          background: linear-gradient(to bottom, #f8fafc, #ffffff);
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-title {
          font-size: 42px;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 16px;
        }

        .section-subtitle {
          font-size: 18px;
          color: #64748b;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .filter-tabs {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 50px;
        }

        .filter-tab {
          padding: 12px 28px;
          border-radius: 50px;
          border: 2px solid #e2e8f0;
          background: white;
          color: #64748b;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-tab:hover {
          border-color: #cbd5e1;
          transform: translateY(-2px);
        }

        .filter-tab.active {
          background: linear-gradient(135deg, #3b82f6, #60a5fa);
          color: white;
          border-color: transparent;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 30px;
        }

        .project-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.4s ease;
          animation: fadeInUp 0.6s ease-out backwards;
          border: 2px solid transparent;
        }

        .project-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          border-color: #e0e7ff;
        }

        .project-image {
          height: 200px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 80px;
          position: relative;
          overflow: hidden;
        }

        .project-image::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%);
        }

        .project-emoji {
          position: relative;
          z-index: 1;
          animation: float 3s ease-in-out infinite;
        }

        .project-content {
          padding: 28px;
        }

        .project-header {
          margin-bottom: 20px;
        }

        .project-category {
          display: inline-block;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          color: white;
          margin-bottom: 12px;
          text-transform: capitalize;
        }

        .project-title {
          font-size: 22px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 12px;
          line-height: 1.3;
        }

        .project-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 16px;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #64748b;
          font-size: 14px;
        }

        .meta-icon {
          color: #94a3b8;
        }

        .project-description {
          color: #64748b;
          line-height: 1.6;
          font-size: 15px;
          margin-bottom: 20px;
        }

        .project-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          padding: 20px;
          background: #f8fafc;
          border-radius: 12px;
          margin-bottom: 20px;
        }

        .stat-item {
          text-align: center;
        }

        .stat-value {
          font-size: 18px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 12px;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .project-highlights {
          display: flex;
          gap: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #e2e8f0;
          margin-bottom: 20px;
        }

        .highlight {
          flex: 1;
        }

        .highlight-value {
          font-size: 20px;
          font-weight: 700;
          background: linear-gradient(135deg, #10b981, #34d399);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 4px;
        }

        .highlight-label {
          font-size: 12px;
          color: #64748b;
        }

        .project-btn {
          width: 100%;
          padding: 14px 24px;
          background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .project-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
        }

        .testimonials-section {
          padding: 80px 24px;
          background: white;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
        }

        .testimonial-card {
          background: white;
          padding: 32px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          animation: scaleIn 0.6s ease-out backwards;
        }

        .testimonial-content {
          color: #64748b;
          line-height: 1.8;
          font-size: 15px;
          margin-bottom: 20px;
          font-style: italic;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
        }

        .author-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea, #764ba2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 18px;
        }

        .author-info {
          flex: 1;
        }

        .author-name {
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 4px;
        }

        .author-role {
          font-size: 13px;
          color: #64748b;
        }

        .rating {
          display: flex;
          gap: 4px;
        }

        .star {
          color: #fbbf24;
        }

        .cta-section {
          padding: 80px 24px;
          background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
          text-align: center;
          color: white;
        }

        .cta-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .cta-title {
          font-size: 42px;
          font-weight: 800;
          margin-bottom: 20px;
        }

        .cta-subtitle {
          font-size: 18px;
          margin-bottom: 40px;
          opacity: 0.95;
        }

        .cta-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary {
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          color: #1e3a8a;
          border: none;
          padding: 16px 32px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(251, 191, 36, 0.4);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
          padding: 16px 32px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-2px);
        }

        @media (max-width: 991px) {
          .projects-title {
            font-size: 40px;
          }

          .section-title {
            font-size: 32px;
          }

          .cta-title {
            font-size: 32px;
          }

          .projects-grid {
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          }
        }

        @media (max-width: 576px) {
          .projects-hero {
            padding: 80px 20px 60px;
          }

          .projects-title {
            font-size: 32px;
          }

          .projects-subtitle {
            font-size: 16px;
          }

          .section-title {
            font-size: 28px;
          }

          .projects-grid {
            grid-template-columns: 1fr;
          }

          .achievements-grid {
            grid-template-columns: 1fr;
          }

          .testimonials-grid {
            grid-template-columns: 1fr;
          }

          .filter-tabs {
            gap: 8px;
          }

          .filter-tab {
            padding: 10px 20px;
            font-size: 14px;
          }

          .cta-buttons {
            flex-direction: column;
          }

          .btn-primary,
          .btn-secondary {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="projects-hero">
        <div className="projects-hero-content">
          <div className="projects-badge">
            <Sun size={14} style={{ display: "inline", marginRight: "6px" }} />
            Our Projects
          </div>
          <h1 className="projects-title">Powering India's Solar Future</h1>
          <p className="projects-subtitle">
            Explore our portfolio of successful solar installations across
            residential, commercial, and industrial sectors. Each project
            represents our commitment to quality, innovation, and
            sustainability.
          </p>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="achievements-section">
        <div className="section-container">
          <div className="achievements-grid">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="achievement-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className="achievement-icon"
                  style={{
                    background: `${achievement.color}15`,
                    animationDelay: `${index * 0.5}s`,
                  }}
                >
                  <achievement.icon size={32} color={achievement.color} />
                </div>
                <div className="achievement-value">{achievement.value}</div>
                <div className="achievement-label">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">
              Discover how we've helped businesses and homeowners transition to
              clean energy
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="filter-tabs">
            {filters.map((filter) => (
              <button
                key={filter.id}
                className={`filter-tab ${
                  activeFilter === filter.id ? "active" : ""
                }`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="project-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className="project-image"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}dd 0%, ${project.color}99 100%)`,
                  }}
                >
                  <span className="project-emoji">{project.image}</span>
                </div>
                <div className="project-content">
                  <div className="project-header">
                    <div
                      className="project-category"
                      style={{ background: project.color }}
                    >
                      {project.category}
                    </div>
                    <h3 className="project-title">{project.title}</h3>
                  </div>

                  <div className="project-meta">
                    <div className="meta-item">
                      <MapPin size={16} className="meta-icon" />
                      {project.location}
                    </div>
                    <div className="meta-item">
                      <Zap size={16} className="meta-icon" />
                      {project.capacity}
                    </div>
                    <div className="meta-item">
                      <Calendar size={16} className="meta-icon" />
                      {project.date}
                    </div>
                  </div>

                  <p className="project-description">{project.description}</p>

                  <div className="project-stats">
                    <div className="stat-item">
                      <div className="stat-value">{project.stats.panels}</div>
                      <div className="stat-label">Solar Panels</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-value">{project.stats.area}</div>
                      <div className="stat-label">Area</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-value">
                        {project.stats.completion}
                      </div>
                      <div className="stat-label">Completion</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-value">{project.capacity}</div>
                      <div className="stat-label">Capacity</div>
                    </div>
                  </div>

                  <div className="project-highlights">
                    <div className="highlight">
                      <div className="highlight-value">{project.savings}</div>
                      <div className="highlight-label">Annual Savings</div>
                    </div>
                    <div className="highlight">
                      <div className="highlight-value">
                        {project.co2Reduction}
                      </div>
                      <div className="highlight-label">CO₂ Reduced</div>
                    </div>
                  </div>

                  <button className="project-btn">
                    View Details <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-subtitle">
              Real experiences from real customers who chose solar energy
            </p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="testimonial-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="star">
                      ★
                    </span>
                  ))}
                </div>
                <p className="testimonial-content">"{testimonial.content}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="author-info">
                    <div className="author-name">{testimonial.name}</div>
                    <div className="author-role">
                      {testimonial.role} • {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Start Your Solar Journey Today</h2>
          <p className="cta-subtitle">
            Join hundreds of satisfied customers who have made the switch to
            clean, renewable energy. Get a free consultation and customized
            quote.
          </p>
          <div className="cta-buttons">
            {/* <button className="btn-primary">
              Schedule Consultation <ArrowRight size={20} />
            </button> */}
            <Link
              style={{ textDecoration: "none" }}
              to="/contact"
              className="btn-primary"
            >
              Schedule Consultation <ArrowRight size={20} />
            </Link>
            {/* <button className="btn-secondary">View All Projects</button> */}
            {/* <Link
              style={{ textDecoration: "none" }}
              to="/projects"
              className="btn-secondary"
            >
              View All Projects
            </Link> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
