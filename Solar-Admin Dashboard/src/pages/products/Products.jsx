import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Badge,
  Alert,
  Spinner,
  InputGroup,
  Table,
} from "react-bootstrap";
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Save,
  Package,
  Search,
  Filter,
  Zap,
  Tag,
  Layers,
  LayoutGrid,
  List as ListIcon,
} from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState("list");
  const [layout, setLayout] = useState("table"); // 'table' or 'grid' for client choice
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const [formData, setFormData] = useState({
    badge: "",
    capacity: "",
    name: "",
    subsidy: "",
    description: "",
    features: "",
    category: "Residential",
    isActive: true,
  });

  const API_URL = `${process.env.VITE_API_URL}/api/products`;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProducts(data);
      setError("");
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      subsidy: Number(formData.subsidy),
      features: formData.features.split("\n").filter((f) => f.trim() !== ""),
    };

    setLoading(true);
    try {
      const url = editingProduct ? `${API_URL}/${editingProduct._id}` : API_URL;
      const method = editingProduct ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        await fetchProducts();
        setSuccess(editingProduct ? "Updated!" : "Created!");
        resetForm();
        setView("list");
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      setError("Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      badge: product.badge || "",
      capacity: product.capacity,
      name: product.name,
      subsidy: product.subsidy,
      description: product.description,
      features: product.features.join("\n"),
      category: product.category,
      isActive: product.isActive,
    });
    setView("form");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Permanent delete?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (res.ok) fetchProducts();
    } catch (err) {
      setError("Delete failed");
    }
  };

  const resetForm = () => {
    setFormData({
      badge: "",
      capacity: "",
      name: "",
      subsidy: "",
      description: "",
      features: "",
      category: "Residential",
      isActive: true,
    });
    setEditingProduct(null);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "All" || product.category === filterCategory;
    const matchesStatus =
      filterStatus === "All" ||
      (filterStatus === "Active" ? product.isActive : !product.isActive);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="admin-wrapper">
      <Container fluid className="px-4 py-4">
        {/* Top Header Section */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
          <div className="d-flex gap-2 ms-auto">
            <Button
              variant="light"
              className="shadow-sm border-0 d-flex align-items-center gap-2"
              onClick={() => setLayout(layout === "table" ? "grid" : "table")}
            >
              {layout === "table" ? (
                <LayoutGrid size={18} />
              ) : (
                <ListIcon size={18} />
              )}
              {layout === "table" ? "Grid View" : "Table View"}
            </Button>
            <Button
              variant="primary"
              className="main-action-btn shadow-sm"
              onClick={() => setView("form")}
            >
              <Plus size={18} className="me-1" /> Create New Product
            </Button>
          </div>
        </div>

        {/* Status Alerts */}
        {success && (
          <Alert variant="success" className="custom-alert shadow-sm">
            {success}
          </Alert>
        )}
        {error && (
          <Alert variant="danger" className="custom-alert shadow-sm">
            {error}
          </Alert>
        )}

        {view === "list" ? (
          <>
            {/* Intelligent Filter Bar */}
            <Card className="border-0 shadow-sm mb-4 rounded-4 overflow-hidden">
              <Card.Body className="p-3">
                <Row className="g-3 align-items-center">
                  <Col lg={5}>
                    <InputGroup className="search-group">
                      <InputGroup.Text className="bg-transparent border-0 pe-0">
                        <Search size={18} className="text-muted" />
                      </InputGroup.Text>
                      <Form.Control
                        className="border-0 shadow-none py-2"
                        placeholder="Search by product name, description..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </InputGroup>
                  </Col>
                  <Col lg={4} className="ms-5">
                    <div className="d-flex align-items-center gap-2 px-2 border-start">
                      <Filter size={16} className="text-muted" />
                      <Form.Select
                        className="border-0 shadow-none fw-medium"
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                      >
                        <option value="All">All Categories</option>
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                      </Form.Select>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="grow" variant="primary" />
              </div>
            ) : layout === "table" ? (
              /* CLEAN TABLE VIEW */
              <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                <Table responsive hover className="mb-0 custom-table">
                  <thead className="bg-light-blue text-uppercase">
                    <tr>
                      <th className="ps-4">Product Info</th>
                      <th>Category</th>
                      <th>Capacity</th>
                      <th>Subsidy</th>
                      <th>Status</th>
                      <th className="text-center pe-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((p) => (
                      <tr key={p._id}>
                        <td className="ps-4 py-3">
                          <div className="d-flex align-items-center">
                            <div className="product-icon-box me-3">
                              <Zap size={20} className="text-primary" />
                            </div>
                            <div>
                              <div className="fw-bold text-dark">{p.name}</div>
                              <div
                                className="text-muted small text-truncate"
                                style={{ maxWidth: "200px" }}
                              >
                                {p.description}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="align-middle">
                          <Badge
                            bg="info"
                            className="bg-opacity-10 text-info px-3 py-2 rounded-pill fw-medium"
                          >
                            {p.category}
                          </Badge>
                        </td>
                        <td className="align-middle fw-medium">{p.capacity}</td>
                        <td className="align-middle fw-bold text-primary">
                          ₹{p.subsidy?.toLocaleString("en-IN")}
                        </td>
                        <td className="align-middle">
                          <div
                            className={`status-indicator ${
                              p.isActive ? "active" : "inactive"
                            }`}
                          >
                            <span></span> {p.isActive ? "Online" : "Draft"}
                          </div>
                        </td>
                        <td className="align-middle text-center pe-4">
                          <div className="d-flex justify-content-center gap-2">
                            <Button
                              variant="link"
                              className="p-2 text-primary"
                              onClick={() => handleEdit(p)}
                            >
                              <Edit2 size={18} />
                            </Button>
                            <Button
                              variant="link"
                              className="p-2 text-danger"
                              onClick={() => handleDelete(p._id)}
                            >
                              <Trash2 size={18} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
            ) : (
              /* MODERN GRID VIEW */
              <Row className="g-4">
                {filteredProducts.map((p) => (
                  <Col key={p._id} md={6} lg={4} xl={3}>
                    <Card className="border-0 shadow-sm h-100 product-card-modern">
                      <Card.Body className="p-4">
                        <div className="d-flex justify-content-between mb-3">
                          <Badge className="bg-primary bg-opacity-10 text-primary">
                            {p.badge || "New"}
                          </Badge>
                          <div
                            className={`status-dot ${
                              p.isActive ? "bg-success" : "bg-secondary"
                            }`}
                          ></div>
                        </div>
                        <h5 className="fw-bold mb-1">{p.name}</h5>
                        <p className="text-muted small mb-3">{p.capacity}</p>
                        <h4 className="fw-bold text-primary mb-3">
                          ₹{p.subsidy.toLocaleString("en-IN")}
                        </h4>
                        <div className="features-preview mb-4">
                          {p.features.slice(0, 3).map((f, i) => (
                            <div
                              key={i}
                              className="small text-muted mb-1 d-flex align-items-center"
                            >
                              <CheckCircle
                                size={12}
                                className="text-success me-2"
                              />{" "}
                              {f}
                            </div>
                          ))}
                        </div>
                        <div className="d-flex gap-2 mt-auto border-top pt-3">
                          <Button
                            variant="outline-primary"
                            className="w-100 btn-sm"
                            onClick={() => handleEdit(p)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline-danger"
                            className="btn-sm"
                            onClick={() => handleDelete(p._id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </>
        ) : (
          /* FORM VIEW - REDESIGNED FOR FOCUS */
          <Row className="justify-content-center">
            <Col lg={10} xl={8}>
              <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
                <div className="p-4 bg-primary text-white d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-3">
                    <Button
                      variant="link"
                      className="text-white p-0"
                      onClick={() => setView("list")}
                    >
                      <ArrowLeft size={24} />
                    </Button>
                    <div>
                      <h4 className="fw-bold mb-0">
                        {editingProduct
                          ? "Update Portfolio"
                          : "Expand Product Catalog"}
                      </h4>
                      <small className="opacity-75">
                        Add new solar product entries
                      </small>
                    </div>
                  </div>
                  <Save size={28} className="opacity-25" />
                </div>
                <Card.Body className="p-5">
                  <Form onSubmit={handleSubmit}>
                    <Row className="g-4">
                      <Col md={8}>
                        <Form.Group className="mb-4">
                          <Form.Label className="fw-bold small text-uppercase text-muted">
                            Product Identity
                          </Form.Label>
                          <Form.Control
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Brand Name + Model"
                            className="form-control-lg bg-light border-0"
                            required
                          />
                        </Form.Group>
                        <Form.Group className="mb-4">
                          <Form.Label className="fw-bold small text-uppercase text-muted">
                            Description
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="What makes this special?"
                            className="bg-light border-0"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-4">
                          <Form.Label className="fw-bold small text-uppercase text-muted">
                            Category
                          </Form.Label>
                          <Form.Select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="bg-light border-0"
                          >
                            <option value="Residential">🏠 Residential</option>
                            <option value="Commercial">🏢 Commercial</option>
                          </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-4">
                          <Form.Label className="fw-bold small text-uppercase text-muted">
                            Capacity Tag
                          </Form.Label>
                          <Form.Control
                            name="capacity"
                            value={formData.capacity}
                            onChange={handleInputChange}
                            placeholder="e.g. 550W"
                            className="bg-light border-0"
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col md={4}>
                        <Form.Label className="fw-bold small text-uppercase text-muted">
                          Subsidy (INR)
                        </Form.Label>
                        <InputGroup className="bg-light rounded">
                          <InputGroup.Text className="bg-transparent border-0 fw-bold text-primary">
                            ₹
                          </InputGroup.Text>
                          <Form.Control
                            type="number"
                            name="subsidy"
                            value={formData.subsidy}
                            onChange={handleInputChange}
                            className="bg-transparent border-0 py-3"
                            required
                          />
                        </InputGroup>
                      </Col>
                      <Col md={4}>
                        <Form.Label className="fw-bold small text-uppercase text-muted">
                          Market Badge
                        </Form.Label>
                        <Form.Select
                          name="badge"
                          value={formData.badge}
                          onChange={handleInputChange}
                          className="bg-light border-0 py-3"
                        >
                          <option value="">None</option>
                          <option value="Popular">🔥 Popular</option>
                          <option value="Best Value">💎 Best Value</option>
                          <option value="Recommended">⭐ Recommended</option>
                        </Form.Select>
                      </Col>
                      <Col md={4}>
                        <Form.Label className="fw-bold small text-uppercase text-muted">
                          Visibility
                        </Form.Label>
                        <div className="p-2 border rounded d-flex align-items-center h-50">
                          <Form.Check
                            type="switch"
                            label="Publicly Visible"
                            name="isActive"
                            checked={formData.isActive}
                            onChange={handleInputChange}
                          />
                        </div>
                      </Col>

                      <Col md={12}>
                        <Form.Group>
                          <Form.Label className="fw-bold small text-uppercase text-muted">
                            Technical Features (One per line)
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={6}
                            name="features"
                            value={formData.features}
                            onChange={handleInputChange}
                            placeholder="Bullet point 1&#10;Bullet point 2"
                            className="bg-light border-0"
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col md={12} className="text-end mt-5 d-flex">
                        <Button
                          variant="light"
                          className="me-3 px-4 py-2 fw-bold"
                          onClick={() => setView("list")}
                        >
                          Discard
                        </Button>
                        <Button
                          variant="primary"
                          type="submit"
                          className="px-5 py-2 fw-bold shadow"
                        >
                          {loading ? <Spinner size="sm" /> : "Publish Product"}
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>

      <style>{`
        body { background-color: #f0f2f5; font-family: 'Inter', sans-serif; }
        .admin-wrapper { animation: fadeIn 0.4s ease-in-out; }
        
        .main-action-btn { 
            background: #0d6efd; 
            border: none; 
            padding: 10px 24px; 
            font-weight: 600; 
            border-radius: 12px;
            transition: transform 0.2s;
        }
        .main-action-btn:hover { transform: translateY(-2px); background: #0b5ed7; }

        .search-group { background: #fff; border-radius: 10px; border: 1px solid #e1e5eb; }
        
        .custom-table thead th { 
            font-size: 11px; 
            color: #6c757d; 
            letter-spacing: 0.05em; 
            border-bottom: none;
            padding: 16px;
        }
        .custom-table tbody tr { border-bottom: 1px solid #f1f4f8; vertical-align: middle; }
        
        .product-icon-box {
            width: 44px; height: 44px; 
            background: #eef2ff; 
            border-radius: 10px; 
            display: flex; align-items: center; justify-content: center;
        }

        .status-indicator { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 500; }
        .status-indicator span { width: 8px; height: 8px; border-radius: 50%; }
        .status-indicator.active span { background: #10b981; box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1); }
        .status-indicator.inactive span { background: #94a3b8; }

        .product-card-modern { border-radius: 16px; transition: all 0.3s ease; }
        .product-card-modern:hover { transform: translateY(-5px); box-shadow: 0 15px 30px rgba(0,0,0,0.08) !important; }
        .status-dot { width: 10px; height: 10px; border-radius: 50%; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
};

export default Products;
