import {
  Target,
  Eye,
  Heart,
  Lightbulb,
  Shield,
  Zap,
  CheckCircle,
} from "lucide-react";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const values = [
    {
      icon: Shield,
      title: "Reliability",
      description:
        "Delivering consistent, high-quality solar solutions you can depend on as a Tata Power partner.",
      color: "#0ea5e9",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Embracing cutting-edge automation and energy technology for futuristic solutions.",
      color: "#22c55e",
    },
    {
      icon: Heart,
      title: "Customer First",
      description:
        "Your satisfaction and energy independence are at the heart of our mission.",
      color: "#0ea5e9",
    },
    {
      icon: CheckCircle,
      title: "Transparency",
      description:
        "Clear communication and honest solar practices in every interaction.",
      color: "#22c55e",
    },
  ];

  const whyChoose = [
    "Authorised Channel Partner of Tata Power Solaroof",
    "Proven track record in Energy & Automation Solutions",
    "Premium quality installations with 24/7 support",
    "Real-time monitoring and performance tracking",
    "Transparent pricing with no hidden costs",
    "Expert team serving Pallana and across Kerala",
  ];

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        /* --- DESKTOP STYLES (ORIGINAL) --- */
        .about-hero {
          background: linear-gradient(135deg, #0ea5e9 0%, #22c55e 100%);
          padding: 140px 24px 100px;
          text-align: center;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .about-hero::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 50px;
          background: white;
          clip-path: polygon(0 100%, 100% 100%, 100% 0);
        }

        .about-hero-content {
          max-width: 900px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          animation: fadeInUp 0.8s ease-out;
        }

        .about-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(5px);
          color: white;
          padding: 8px 20px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 24px;
          border: 1px solid rgba(255, 255, 255, 0.4);
        }

        .about-title {
          font-size: 56px;
          font-weight: 800;
          margin-bottom: 24px;
          line-height: 1.2;
        }

        .about-subtitle {
          font-size: 18px;
          opacity: 0.95;
          line-height: 1.6;
          max-width: 700px;
          margin: 0 auto;
        }

        .story-section, .mission-vision, .values-section, .why-section {
          padding: 100px 24px;
        }

        .section-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .story-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 60px;
          align-items: center;
        }

        .section-label {
          color: #22c55e;
          font-weight: 700;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 16px;
        }

        .story-title {
          font-size: 42px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 24px;
        }

        .story-text {
          font-size: 16px;
          color: #475569;
          line-height: 1.8;
          margin-bottom: 20px;
        }

        .story-image-box {
          background: linear-gradient(135deg, #0ea5e9 0%, #22c55e 100%);
          border-radius: 30px;
          padding: 50px 30px;
          text-align: center;
          color: white;
          box-shadow: 0 25px 50px -12px rgba(34, 197, 94, 0.25);
          animation: float 4s ease-in-out infinite;
        }

        .mv-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          margin-top: 50px;
        }

        .mv-card {
          background: white;
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          border-bottom: 4px solid #22c55e;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px;
          margin-top: 50px;
        }

        .value-card {
          padding: 30px;
          border-radius: 20px;
          background: #ffffff;
          border: 1px solid #f1f5f9;
          text-align: center;
          transition: all 0.3s ease;
        }

        /* --- MOBILE RESPONSIVE (REDUCED PADDING & FONTS) --- */
        @media (max-width: 768px) {
          .about-hero {
            padding: 90px 20px 60px;
          }
          .about-title {
            font-size: 30px;
            margin-bottom: 16px;
          }
          .about-subtitle {
            font-size: 15px;
          }
          .about-badge {
            font-size: 12px;
            padding: 6px 14px;
            margin-bottom: 16px;
          }
          
          .story-section, .mission-vision, .values-section, .why-section {
            padding: 45px 20px; /* Medium padding */
          }

          .story-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .story-title {
            font-size: 26px;
            margin-bottom: 16px;
          }

          .story-text {
            font-size: 14.5px;
            line-height: 1.6;
            margin-bottom: 14px;
          }

          .story-image-box {
            padding: 35px 20px;
            border-radius: 20px;
          }

          .mv-grid {
            margin-top: 30px;
            gap: 20px;
          }

          .mv-card {
            padding: 25px;
          }

          .value-card {
            padding: 20px;
          }

          .why-grid {
            margin-top: 30px;
          }
          
          .why-item {
            padding: 14px;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <div className="about-badge">⚡ Authorised Tata Power Partner</div>
          <h1 className="about-title">Ecogreen Energy & Automation Solution</h1>
          <p className="about-subtitle">
            Ecogreen is a trusted partner of Tata Power Solaroof, delivering
            premium solar and automation solutions to homes and businesses
            across Kerala.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="section-container">
          <div className="story-grid">
            <div className="story-content">
              <div className="section-label">WHO WE ARE</div>
              <h2 className="story-title">
                Your Trusted Tata Power Solaroof Partner
              </h2>
              <p className="story-text">
                At Ecogreen Energy & Automation Solution, we specialize in
                providing high-performance solar systems backed by the legacy of
                Tata Power. Our mission is to lead the transition to renewable
                energy through precision engineering and unmatched customer
                service.
              </p>
              <p className="story-text">
                Based in Pallana, Thrikkunnapuzha, we combine local expertise
                with global technology standards. We ensure your energy usage is
                as efficient as its production.
              </p>
            </div>
            <div className="story-image">
              <div className="story-image-box">
                <Zap size={40} style={{ marginBottom: "15px" }} />
                <h3 style={{ fontSize: "28px", marginBottom: "8px" }}>
                  Authorised
                </h3>
                <p style={{ fontSize: "15px", opacity: 0.9 }}>
                  Channel Partner for <br />
                  <strong>Tata Power Solaroof</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="section-container">
          <div style={{ textAlign: "center" }}>
            <h2 className="story-title">Our Mission & Vision</h2>
          </div>
          <div className="mv-grid">
            <div className="mv-card">
              <div
                className="mv-icon-wrapper"
                style={{
                  background: "#f0fdf4",
                  width: "50px",
                  height: "50px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                <Target size={28} color="#22c55e" />
              </div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  marginBottom: "12px",
                  color: "#0f172a",
                }}
              >
                Our Mission
              </h3>
              <p className="story-text" style={{ marginBottom: 0 }}>
                To empower communities with reliable, sustainable energy through
                quality solar installations and smart automation technology.
              </p>
            </div>
            <div className="mv-card" style={{ borderColor: "#0ea5e9" }}>
              <div
                className="mv-icon-wrapper"
                style={{
                  background: "#f0f9ff",
                  width: "50px",
                  height: "50px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                <Eye size={28} color="#0ea5e9" />
              </div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  marginBottom: "12px",
                  color: "#0f172a",
                }}
              >
                Our Vision
              </h3>
              <p className="story-text" style={{ marginBottom: 0 }}>
                To be Kerala's premier provider of energy solutions, recognized
                for environmental stewardship and technical excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="values-section">
        <div className="section-container">
          <div style={{ textAlign: "center" }}>
            <h2 className="story-title">Our Core Values</h2>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div
                  className="value-icon"
                  style={{
                    background: `${value.color}15`,
                    width: "45px",
                    height: "45px",
                    margin: "0 auto 16px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <value.icon size={22} color={value.color} />
                </div>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    marginBottom: "10px",
                    color: "#0f172a",
                  }}
                >
                  {value.title}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#64748b",
                    lineHeight: "1.5",
                  }}
                >
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-section">
        <div className="section-container">
          <div style={{ textAlign: "center" }}>
            <h2 className="story-title">Why Choose Ecogreen?</h2>
          </div>
          <div
            className="why-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "15px",
              marginTop: "40px",
            }}
          >
            {whyChoose.map((reason, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "16px",
                  background: "white",
                  borderRadius: "12px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                <CheckCircle
                  size={20}
                  color="#22c55e"
                  style={{ flexShrink: 0 }}
                />
                <span
                  style={{
                    fontWeight: 600,
                    color: "#1e293b",
                    fontSize: "14px",
                  }}
                >
                  {reason}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
