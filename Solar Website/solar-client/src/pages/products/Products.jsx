import {
  Home,
  Building2,
  Factory,
  Zap,
  Shield,
  Award,
  TrendingUp,
  Check,
  ArrowRight,
  Sun,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products`
        );
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();
  }, []);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/productcategories`
        );

        setProductCategories(res.data.filter((cat) => cat.isActive));
      } catch (error) {
        console.error("Error fetching categories", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);
  const getBadgeColor = (badge) => {
    switch (badge) {
      case "Popular":
        return "#22c55e";
      case "Best Value":
        return "#3b82f6";
      case "Recommended":
        return "#f59e0b";
      default:
        return "#64748b";
    }
  };
  if (loading) return null;

  const benefits = [
    {
      icon: Zap,
      title: "High Efficiency",
      description:
        "Industry-leading efficiency ratings for maximum power generation",
      color: "#f59e0b",
    },
    {
      icon: Shield,
      title: "25-Year Warranty",
      description: "Comprehensive warranty coverage for complete peace of mind",
      color: "#3b82f6",
    },
    {
      icon: Award,
      title: "Certified Quality",
      description: "All products meet international quality standards",
      color: "#10b981",
    },
    {
      icon: TrendingUp,
      title: "Smart Monitoring",
      description: "Track your energy production in real-time",
      color: "#8b5cf6",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="products-hero">
        <div className="products-hero-content">
          <div className="products-badge">
            <Sun size={14} style={{ display: "inline", marginRight: "6px" }} />
            Our Products
          </div>
          <h1 className="products-title">
            Tata Power Solar Solutions for Every Need
          </h1>
          <p className="products-subtitle">
            As <strong>Your Trusted Solar Partner</strong> and Authorized
            Channel Partner, we bring you world-class{" "}
            <strong>Tata Power Solaroof</strong> technology. From residential
            rooftops to industrial operations, our premium solutions are
            engineered for maximum efficiency, lifetime reliability, and
            ultimate savings.
          </p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Product Categories</h2>
            <p className="section-subtitle">
              Explore our range of solar solutions tailored to different
              requirements
            </p>
          </div>
          <div className="categories-grid">
            {productCategories.map((category, index) => (
              <div
                key={category._id}
                className="category-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* ICON FROM DB */}
                <span
                  className="category-emoji"
                  style={{ animationDelay: `${index * 0.5}s` }}
                >
                  {category.icon}
                </span>

                <div className="category-subtitle">{category.subtitle}</div>

                <h3 className="category-title">{category.title}</h3>

                <p className="category-description">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="products-grid-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Our Solar Products</h2>
            <p className="section-subtitle">
              High-quality solar systems with industry-leading warranties and
              performance
            </p>
          </div>
          <div className="products-grid">
            {products.map((product, index) => (
              <div
                key={product._id}
                className="product-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Badge */}
                {product.badge && (
                  <div
                    className="product-badge"
                    style={{ background: getBadgeColor(product.badge) }}
                  >
                    {product.badge}
                  </div>
                )}

                {/* Header */}
                <div className="product-header">
                  <div className="product-capacity">{product.capacity}</div>
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-price">
                    <span style={{ fontSize: "19px" }}>
                      {product.subsidy == undefined ? "" : "subsidy upto"}
                    </span>{" "}
                    {product.subsidy && `₹${product.subsidy?.toLocaleString()}`}
                  </div>
                </div>

                {/* Features */}
                <ul className="product-features">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="product-feature">
                      <Check size={12} className="feature-icon" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  to="/contact"
                  className="product-btn"
                  style={{ textDecoration: "none" }}
                >
                  Get Quote <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Why Choose Our Products?</h2>
            <p className="section-subtitle">
              Premium quality backed by industry-leading warranties
            </p>
          </div>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="benefit-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className="benefit-icon"
                  style={{
                    background: `${benefit.color}15`,
                    animationDelay: `${index * 0.5}s`,
                  }}
                >
                  <benefit.icon size={32} color={benefit.color} />
                </div>
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-description">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Go Solar?</h2>
          <p className="cta-subtitle">
            Get a free consultation and customized quote for your solar project.
            Our experts are here to help you choose the perfect solution.
          </p>
          <div className="cta-buttons">
            <Link
              style={{ textDecoration: "none" }}
              to="/contact"
              className="btn-primary"
            >
              Request Free Quote <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
