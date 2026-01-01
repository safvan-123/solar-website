// import {
//   Zap,
//   Shield,
//   TrendingUp,
//   Users,
//   MapPin,
//   Target,
//   Award,
//   ArrowRight,
//   Phone,
//   Mail,
//   Sun,
//   Battery,
// } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useEffect } from "react";
// import { Carousel } from "react-bootstrap";
// import solar_bg_1 from "../../assets/images/solar_bg_1.jpg";
// import solar_bg_2 from "../../assets/images/solar_bg_2.jpg";
// import solar_bg_3 from "../../assets/images/solar_bg_3.jpg";
// import solar_bg_4 from "../../assets/images/solar_bg_4.jpg";
// import "./Home.css";

// const Home = () => {
//   const backgroundImages = [solar_bg_1, solar_bg_2, solar_bg_3, solar_bg_4];

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const features = [
//     {
//       icon: Shield,
//       title: "Most Reliable & Trusted",
//       description:
//         "As an authorized channel partner of Tata Power, we deliver premium solar solutions backed by India's most trusted energy brand.",
//       color: "#3b82f6",
//     },
//     {
//       icon: Sun,
//       title: "On-Grid Solar Systems",
//       description:
//         "Connect directly to the power grid and enjoy seamless energy supply with net metering benefits and reduced electricity bills.",
//       color: "#f59e0b",
//     },
//     {
//       icon: Battery,
//       title: "Hybrid Solar Solutions",
//       description:
//         "Experience uninterrupted power with our advanced hybrid systems that combine grid connectivity with battery backup storage.",
//       color: "#10b981",
//     },
//     {
//       icon: Target,
//       title: "Trackable Performance",
//       description:
//         "Monitor your solar system's performance in real-time with advanced tracking and analytics for complete transparency.",
//       color: "#8b5cf6",
//     },
//     {
//       icon: Users,
//       title: "Customer Satisfaction First",
//       description:
//         "Your satisfaction drives everything we do. We ensure every project exceeds expectations with dedicated support.",
//       color: "#ec4899",
//     },
//     {
//       icon: Award,
//       title: "Quality Assurance",
//       description:
//         "Premium Tata Power products with comprehensive warranties and ongoing support for complete peace of mind.",
//       color: "#06b6d4",
//     },
//   ];

//   return (
//     <>
//       {/* Hero Section */}
//       <section className="hero-section ">
//         {/* Background Carousel */}
//         <div className="hero-carousel-wrapper">
//           <Carousel
//             fade
//             indicators={false}
//             controls={false}
//             interval={4000}
//             pause={false}
//           >
//             {backgroundImages.map((img, idx) => (
//               <Carousel.Item key={idx}>
//                 <div
//                   className="hero-bg-slide"
//                   style={{
//                     backgroundImage: `url(${img})`,
//                     backgroundSize: "100% 100%",
//                   }}
//                 ></div>
//               </Carousel.Item>
//             ))}
//           </Carousel>
//           <div className="hero-overlay"></div>
//         </div>

//         <div className="hero-content">
//           <div className="hero-badge">
//             ⚡ Authorized Channel Partner - Tata Power
//           </div>
//           <h1 className="hero-title">
//             EcoGreen Energy Solutions - Your Trusted Solar Partner
//           </h1>
//           <p className="hero-subtitle">
//             Leading the solar revolution as Tata Power's authorized channel
//             partner. We deliver cutting-edge on-grid and hybrid solar solutions
//             with unmatched reliability, transparency, and expert support.
//           </p>
//           <div className="hero-buttons">
//             <Link
//               style={{ textDecoration: "none" }}
//               to="/contact"
//               className="btn-primary"
//             >
//               Get Started <ArrowRight size={20} />
//             </Link>
//             <Link
//               style={{ textDecoration: "none" }}
//               to="/products"
//               className="btn-secondary"
//             >
//               Explore Products
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Why Choose Us Section */}
//       <section className="narrative-section">
//         <div className="section-container">
//           <div className="section-header">
//             <div className="section-badge">
//               <Zap
//                 size={16}
//                 style={{ display: "inline", marginRight: "6px" }}
//               />
//               Why EcoGreen Energy Solutions
//             </div>
//             <h2 className="section-title">
//               Tata Power's Trusted Partner for Solar Excellence
//             </h2>
//             <p className="section-subtitle">
//               As an authorized channel partner of Tata Power, we combine the
//               strength of India's leading energy brand with our commitment to
//               exceptional service.
//             </p>
//           </div>

//           <div className="features-grid">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className="feature-card"
//                 style={{ animationDelay: `${index * 0.1}s` }}
//               >
//                 <div
//                   className="feature-icon"
//                   style={{
//                     background: `${feature.color}15`,
//                   }}
//                 >
//                   <feature.icon size={28} color={feature.color} />
//                 </div>
//                 <h3 className="feature-title">{feature.title}</h3>
//                 <p className="feature-description">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Solar Solutions Section */}
//       <section className="narrative-section" style={{ background: "#f8fafc" }}>
//         <div className="section-container">
//           <div className="section-header">
//             <div className="section-badge">
//               <Sun
//                 size={16}
//                 style={{ display: "inline", marginRight: "6px" }}
//               />
//               Our Solar Solutions
//             </div>
//             <h2 className="section-title">
//               Comprehensive Solar Systems for Every Need
//             </h2>
//           </div>

//           <div
//             className="features-grid"
//             style={{
//               gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
//             }}
//           >
//             <div className="feature-card">
//               <div className="feature-icon" style={{ background: "#f59e0b15" }}>
//                 <Sun size={28} color="#f59e0b" />
//               </div>
//               <h3 className="feature-title">On-Grid Solar Systems</h3>
//               <p className="feature-description">
//                 Connect seamlessly to the power grid. Enjoy net metering
//                 benefits and quick ROI. Perfect for homes and businesses.
//               </p>
//               <ul className="solution-list">
//                 <li>✓ Zero electricity bills</li>
//                 <li>✓ Net metering benefits</li>
//                 <li>✓ Quick ROI</li>
//                 <li>✓ Minimal maintenance</li>
//               </ul>
//             </div>

//             <div className="feature-card">
//               <div className="feature-icon" style={{ background: "#10b98115" }}>
//                 <Battery size={28} color="#10b981" />
//               </div>
//               <h3 className="feature-title">Hybrid Solar Systems</h3>
//               <p className="feature-description">
//                 Experience the best of both worlds. Combine grid connectivity
//                 with battery backup for uninterrupted power supply.
//               </p>
//               <ul className="solution-list">
//                 <li>✓ 24/7 power backup</li>
//                 <li>✓ Grid + battery storage</li>
//                 <li>✓ Energy independence</li>
//                 <li>✓ Smart energy management</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="cta-section">
//         <div className="cta-content">
//           <h2 className="cta-title">Ready to Switch to Solar?</h2>
//           <p className="cta-subtitle">
//             Join hundreds of satisfied customers who trusted{" "}
//             <strong>EcoGreen Energy Solutions</strong> — your authorized Tata
//             Power channel partner.
//           </p>

//           <div className="contact-info">
//             <div className="contact-item">
//               <Phone size={20} />
//               <span>0477-2292212 , +91 8848132212</span>
//             </div>
//             <div className="contact-item">
//               <Mail size={20} />
//               <span>info@ecogreensolar.in</span>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Home;
import {
  Zap,
  Shield,
  TrendingUp,
  Users,
  MapPin,
  Target,
  Award,
  ArrowRight,
  Phone,
  Mail,
  Sun,
  Battery,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Carousel } from "react-bootstrap";
import solar_bg_1 from "../../assets/images/solar_bg_1.jpg";
import solar_bg_2 from "../../assets/images/solar_bg_2.jpg";
import solar_bg_3 from "../../assets/images/solar_bg_3.jpg";
import solar_bg_4 from "../../assets/images/solar_bg_4.jpg";
import tata_power_logo from "../../assets/images/tata_power_solaroof_image.jpeg"; // Add this import
import "./Home.css";

const Home = () => {
  const backgroundImages = [solar_bg_1, solar_bg_2, solar_bg_3, solar_bg_4];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      icon: Shield,
      title: "Most Reliable & Trusted",
      description:
        "As an authorized channel partner of Tata Power, we deliver premium solar solutions backed by India's most trusted energy brand.",
      color: "#3b82f6",
    },
    {
      icon: Sun,
      title: "On-Grid Solar Systems",
      description:
        "Connect directly to the power grid and enjoy seamless energy supply with net metering benefits and reduced electricity bills.",
      color: "#f59e0b",
    },
    {
      icon: Battery,
      title: "Hybrid Solar Solutions",
      description:
        "Experience uninterrupted power with our advanced hybrid systems that combine grid connectivity with battery backup storage.",
      color: "#10b981",
    },
    {
      icon: Target,
      title: "Trackable Performance",
      description:
        "Monitor your solar system's performance in real-time with advanced tracking and analytics for complete transparency.",
      color: "#8b5cf6",
    },
    {
      icon: Users,
      title: "Customer Satisfaction First",
      description:
        "Your satisfaction drives everything we do. We ensure every project exceeds expectations with dedicated support.",
      color: "#ec4899",
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description:
        "Premium Tata Power products with comprehensive warranties and ongoing support for complete peace of mind.",
      color: "#06b6d4",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section ">
        {/* Background Carousel */}
        <div className="hero-carousel-wrapper">
          <Carousel
            fade
            indicators={false}
            controls={false}
            interval={4000}
            pause={false}
          >
            {backgroundImages.map((img, idx) => (
              <Carousel.Item key={idx}>
                <div
                  className="hero-bg-slide"
                  style={{
                    backgroundImage: `url(${img})`,
                    backgroundSize: "100% 100%",
                  }}
                ></div>
              </Carousel.Item>
            ))}
          </Carousel>
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content">
          <div className="hero-badge">
            ⚡ Authorized Channel Partner - Tata Power
          </div>
          <h1 className="hero-title">
            EcoGreen Energy Solutions - Your Trusted Solar Partner
          </h1>
          <p className="hero-subtitle">
            Leading the solar revolution as Tata Power's authorized channel
            partner. We deliver cutting-edge on-grid and hybrid solar solutions
            with unmatched reliability, transparency, and expert support.
          </p>
          <div className="hero-buttons">
            <Link
              style={{ textDecoration: "none" }}
              to="/contact"
              className="btn-primary"
            >
              Get Started <ArrowRight size={20} />
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              to="/products"
              className="btn-secondary"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </section>

      {/* Tata Power Partner Section - NEW */}
      <section
        className="narrative-section"
        style={{ background: "#fff", padding: "60px 20px" }}
      >
        <div className="section-container">
          <div
            className="section-header"
            style={{ textAlign: "center", marginBottom: "10px" }}
          >
            <h2
              className="section-title"
              style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}
            >
              Proud Partner of
            </h2>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
            }}
          >
            <img
              src={tata_power_logo}
              alt="Tata Power Solaroof"
              style={{
                maxWidth: "500px",
                width: "90%",
                height: "auto",
                objectFit: "contain",
                marginBottom: "0px",
              }}
              className="tata-power-logo-responsive"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="narrative-section">
        <div className="section-container">
          <div className="section-header">
            <div className="section-badge">
              <Zap
                size={16}
                style={{ display: "inline", marginRight: "6px" }}
              />
              Why EcoGreen Energy Solutions
            </div>
            <h2 className="section-title">
              Tata Power's Trusted Partner for Solar Excellence
            </h2>
            <p className="section-subtitle">
              As an authorized channel partner of Tata Power, we combine the
              strength of India's leading energy brand with our commitment to
              exceptional service.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className="feature-icon"
                  style={{
                    background: `${feature.color}15`,
                  }}
                >
                  <feature.icon size={28} color={feature.color} />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solar Solutions Section */}
      <section className="narrative-section" style={{ background: "#f8fafc" }}>
        <div className="section-container">
          <div className="section-header">
            <div className="section-badge">
              <Sun
                size={16}
                style={{ display: "inline", marginRight: "6px" }}
              />
              Our Solar Solutions
            </div>
            <h2 className="section-title">
              Comprehensive Solar Systems for Every Need
            </h2>
          </div>

          <div
            className="features-grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            }}
          >
            <div className="feature-card">
              <div className="feature-icon" style={{ background: "#f59e0b15" }}>
                <Sun size={28} color="#f59e0b" />
              </div>
              <h3 className="feature-title">On-Grid Solar Systems</h3>
              <p className="feature-description">
                Connect seamlessly to the power grid. Enjoy net metering
                benefits and quick ROI. Perfect for homes and businesses.
              </p>
              <ul className="solution-list">
                <li>✓ Zero electricity bills</li>
                <li>✓ Net metering benefits</li>
                <li>✓ Quick ROI</li>
                <li>✓ Minimal maintenance</li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="feature-icon" style={{ background: "#10b98115" }}>
                <Battery size={28} color="#10b981" />
              </div>
              <h3 className="feature-title">Hybrid Solar Systems</h3>
              <p className="feature-description">
                Experience the best of both worlds. Combine grid connectivity
                with battery backup for uninterrupted power supply.
              </p>
              <ul className="solution-list">
                <li>✓ 24/7 power backup</li>
                <li>✓ Grid + battery storage</li>
                <li>✓ Energy independence</li>
                <li>✓ Smart energy management</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Switch to Solar?</h2>
          <p className="cta-subtitle">
            Join hundreds of satisfied customers who trusted{" "}
            <strong>EcoGreen Energy Solutions</strong> — your authorized Tata
            Power channel partner.
          </p>

          <div className="contact-info">
            <div className="contact-item">
              <Phone size={20} />
              <span>0477-2292212 , +91 8848132212</span>
            </div>
            <div className="contact-item">
              <Mail size={20} />
              <span>info@ecogreensolar.in</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
