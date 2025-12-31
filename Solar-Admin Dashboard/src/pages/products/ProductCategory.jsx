// import React, { useState, useEffect } from "react";
// import { Pencil, Trash2, Plus, X, Save } from "lucide-react";
// import "./ProductCategory.css";

// const ProductCategory = () => {
//   const [categories, setCategories] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [currentCategory, setCurrentCategory] = useState(null);
//   const [alert, setAlert] = useState({ show: false, message: "", variant: "" });
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     icon: "",
//     title: "",
//     subtitle: "",
//     description: "",
//     isActive: true,
//   });

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(
//         "http://localhost:5000/api/productcategories"
//       );
//       const data = await response.json();
//       setCategories(data);
//     } catch (error) {
//       showAlert("Failed to fetch categories", "danger");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = async () => {
//     if (!formData.icon.trim())
//       return showAlert("Please enter an icon", "danger");
//     if (!formData.title.trim())
//       return showAlert("Please enter a title", "danger");
//     if (!formData.subtitle.trim())
//       return showAlert("Please enter a subtitle", "danger");
//     if (!formData.description.trim())
//       return showAlert("Please enter a description", "danger");

//     setLoading(true);

//     try {
//       const url = editMode
//         ? `http://localhost:5000/api/productcategories/${currentCategory._id}`
//         : "http://localhost:5000/api/productcategories";

//       const response = await fetch(url, {
//         method: editMode ? "PUT" : "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         const err = await response.json();
//         throw new Error(err.message);
//       }

//       showAlert(
//         `Category ${editMode ? "updated" : "created"} successfully`,
//         "success"
//       );

//       resetForm();
//       setShowForm(false);
//       fetchCategories();
//     } catch (error) {
//       showAlert(error.message, "danger");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (category) => {
//     setEditMode(true);
//     setCurrentCategory(category);
//     setFormData({
//       icon: category.icon,
//       title: category.title,
//       subtitle: category.subtitle,
//       description: category.description,
//       isActive: category.isActive,
//     });
//     setShowForm(true);
//     // Scroll to form
//     setTimeout(() => {
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }, 100);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this category?"))
//       return;

//     setLoading(true);
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/productcategories/${id}`,
//         { method: "DELETE" }
//       );

//       if (!response.ok) {
//         const err = await response.json();
//         throw new Error(err.message);
//       }

//       showAlert("Category deleted successfully", "success");
//       fetchCategories();
//     } catch (error) {
//       showAlert(error.message, "danger");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       icon: "",
//       title: "",
//       subtitle: "",
//       description: "",
//       isActive: true,
//     });
//     setEditMode(false);
//     setCurrentCategory(null);
//   };

//   const showAlert = (message, variant) => {
//     setAlert({ show: true, message, variant });
//     setTimeout(() => setAlert({ show: false, message: "", variant: "" }), 4000);
//   };

//   const handleCancel = () => {
//     setShowForm(false);
//     resetForm();
//   };

//   return (
//     <div className="admin-container">
//       <div className="header">
//         <h1 className="page-title">Product Categories</h1>
//         {!showForm && (
//           <button
//             className="add-btn"
//             onClick={() => setShowForm(true)}
//             disabled={loading}
//           >
//             <Plus size={20} /> Add Category
//           </button>
//         )}
//       </div>

//       {alert.show && (
//         <div className={`alert ${alert.variant}`}>
//           <span>{alert.message}</span>
//           <button
//             className="close-btn"
//             onClick={() => setAlert({ show: false })}
//           >
//             <X size={16} />
//           </button>
//         </div>
//       )}

//       {showForm && (
//         <div className="form-card">
//           <div className="form-header">
//             <h2 className="form-title">
//               {editMode ? "Edit Category" : "Add New Category"}
//             </h2>
//             <button className="close-btn" onClick={handleCancel}>
//               <X size={20} />
//             </button>
//           </div>

//           <div className="form-body">
//             <div className="form-row">
//               <div className="form-group">
//                 <label className="form-label">
//                   Icon/Emoji <span className="required">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="icon"
//                   value={formData.icon}
//                   onChange={handleInputChange}
//                   placeholder="e.g., ⚡, 🏠, 🔋"
//                   className="form-input"
//                   disabled={loading}
//                 />
//                 <small className="form-hint">
//                   Use an emoji or icon character
//                 </small>
//               </div>

//               <div className="form-group">
//                 <label className="form-label">
//                   Title <span className="required">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleInputChange}
//                   placeholder="e.g., Power Your Home"
//                   className="form-input"
//                   disabled={loading}
//                 />
//               </div>
//             </div>

//             <div className="form-group">
//               <label className="form-label">
//                 Subtitle <span className="required">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="subtitle"
//                 value={formData.subtitle}
//                 onChange={handleInputChange}
//                 placeholder="e.g., Residential Solar"
//                 className="form-input"
//                 disabled={loading}
//               />
//             </div>

//             <div className="form-group">
//               <label className="form-label">
//                 Description <span className="required">*</span>
//               </label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 placeholder="Enter a detailed description of this category"
//                 className="form-textarea"
//                 rows="4"
//                 disabled={loading}
//               />
//             </div>

//             <div className="form-group">
//               <div className="checkbox-group">
//                 <input
//                   type="checkbox"
//                   id="isActive"
//                   name="isActive"
//                   checked={formData.isActive}
//                   onChange={handleInputChange}
//                   className="checkbox"
//                   disabled={loading}
//                 />
//                 <label htmlFor="isActive" className="checkbox-label">
//                   Active (visible to users)
//                 </label>
//               </div>
//             </div>
//           </div>

//           <div className="form-footer">
//             <button
//               className="btn btn-secondary"
//               onClick={handleCancel}
//               disabled={loading}
//             >
//               <X size={18} /> Cancel
//             </button>
//             <button
//               className="btn btn-primary"
//               onClick={handleSubmit}
//               disabled={loading}
//             >
//               <Save size={18} />
//               {loading
//                 ? "Saving..."
//                 : editMode
//                 ? "Update Category"
//                 : "Create Category"}
//             </button>
//           </div>
//         </div>
//       )}

//       <div className="card">
//         <div className="table-container">
//           {loading && <div className="loading-overlay">Loading...</div>}

//           <table>
//             <thead>
//               <tr>
//                 <th>Icon</th>
//                 <th>Title</th>
//                 <th>Subtitle</th>
//                 <th>Description</th>
//                 <th>Status</th>
//                 <th>Created</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {categories.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="empty-state">
//                     {loading
//                       ? "Loading categories..."
//                       : "No categories found. Click 'Add Category' to create one."}
//                   </td>
//                 </tr>
//               ) : (
//                 categories.map((category) => (
//                   <tr key={category._id}>
//                     <td>
//                       <div className="icon-cell">{category.icon}</div>
//                     </td>
//                     <td className="title-cell">{category.title}</td>
//                     <td>{category.subtitle}</td>
//                     <td
//                       className="description-cell"
//                       title={category.description}
//                     >
//                       {category.description}
//                     </td>
//                     <td>
//                       <span
//                         className={`status-badge ${
//                           category.isActive ? "active" : "inactive"
//                         }`}
//                       >
//                         {category.isActive ? "Active" : "Inactive"}
//                       </span>
//                     </td>
//                     <td className="date-cell">
//                       {new Date(category.createdAt).toLocaleDateString()}
//                     </td>
//                     <td>
//                       <div className="action-buttons">
//                         <button
//                           className="action-btn edit"
//                           onClick={() => handleEdit(category)}
//                           disabled={loading || showForm}
//                           title="Edit category"
//                         >
//                           <Pencil size={16} />
//                         </button>
//                         <button
//                           className="action-btn delete"
//                           onClick={() => handleDelete(category._id)}
//                           disabled={loading || showForm}
//                           title="Delete category"
//                         >
//                           <Trash2 size={16} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCategory;

import React, { useState, useEffect } from "react";
import {
  Pencil,
  Trash2,
  Plus,
  X,
  Save,
  Layout,
  ArrowLeft,
  Globe,
  Eye,
  EyeOff,
} from "lucide-react";
import "./ProductCategory.css";

const ProductCategory = () => {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    icon: "",
    title: "",
    subtitle: "",
    description: "",
    isActive: true,
  });

  const API_URL = "http://localhost:5000/api/productcategories";

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      showAlert("Failed to fetch categories", "danger");
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

  const handleSubmit = async () => {
    if (
      !formData.icon.trim() ||
      !formData.title.trim() ||
      !formData.subtitle.trim() ||
      !formData.description.trim()
    ) {
      return showAlert("Please fill all required fields", "danger");
    }

    setLoading(true);
    try {
      const url = editMode ? `${API_URL}/${currentCategory._id}` : API_URL;
      const response = await fetch(url, {
        method: editMode ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Operation failed");

      showAlert(
        `Category ${editMode ? "updated" : "created"} successfully`,
        "success"
      );
      handleCancel();
      fetchCategories();
    } catch (error) {
      showAlert(error.message, "danger");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category) => {
    setEditMode(true);
    setCurrentCategory(category);
    setFormData({
      icon: category.icon,
      title: category.title,
      subtitle: category.subtitle,
      description: category.description,
      isActive: category.isActive,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure? This cannot be undone.")) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete");
      showAlert("Category deleted successfully", "success");
      fetchCategories();
    } catch (error) {
      showAlert(error.message, "danger");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      icon: "",
      title: "",
      subtitle: "",
      description: "",
      isActive: true,
    });
    setEditMode(false);
    setCurrentCategory(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    resetForm();
  };

  const showAlert = (message, variant) => {
    setAlert({ show: true, message, variant });
    setTimeout(() => setAlert({ show: false, message: "", variant: "" }), 4000);
  };

  return (
    <div className="admin-dashboard-wrapper">
      <div className="content-container">
        {/* Header Section */}
        <div className="dashboard-header">
          <div className="header-left">
            <div className="brand-icon">
              <Layout size={24} color="#fff" />
            </div>
            <div>
              <h1>Enter Product Categories</h1>
              <p>Organize and structure your solar solutions portfolio</p>
            </div>
          </div>
          {!showForm && (
            <button className="create-btn" onClick={() => setShowForm(true)}>
              <Plus size={20} /> New Category
            </button>
          )}
        </div>

        {/* Global Alert */}
        {alert.show && (
          <div className={`modern-alert ${alert.variant}`}>
            <p>{alert.message}</p>
            <button onClick={() => setAlert({ show: false })}>
              <X size={18} />
            </button>
          </div>
        )}

        {showForm ? (
          /* Focus-Mode Form Card */
          <div className="focus-form-card">
            <div className="form-card-header">
              <button className="back-link" onClick={handleCancel}>
                <ArrowLeft size={18} /> Back to List
              </button>
              <h2>{editMode ? "Refine Category" : "Build New Category"}</h2>
            </div>

            <div className="form-card-body">
              <div className="input-grid">
                <div className="input-field">
                  <label>Icon / Emoji</label>
                  <input
                    name="icon"
                    value={formData.icon}
                    onChange={handleInputChange}
                    placeholder="e.g. ⚡"
                  />
                </div>
                <div className="input-field">
                  <label>Title</label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g. Residential Energy"
                  />
                </div>
              </div>

              <div className="input-field full-width">
                <label>Subtitle</label>
                <input
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                  placeholder="e.g. Sustainable Home Power Solutions"
                />
              </div>

              <div className="input-field full-width">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Tell clients what this category covers..."
                  rows="5"
                />
              </div>

              <div className="visibility-toggle">
                <div className="toggle-text">
                  <span className="bold">Visibility Status</span>
                  <span>
                    {formData.isActive ? "Live on website" : "Hidden in drafts"}
                  </span>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>

            <div className="form-card-footer">
              <button className="btn-cancel" onClick={handleCancel}>
                Discard
              </button>
              <button
                className="btn-save"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading
                  ? "Processing..."
                  : editMode
                  ? "Update Changes"
                  : "Create Category"}
              </button>
            </div>
          </div>
        ) : (
          /* Professional Table View */
          <div className="modern-table-card">
            <div className="table-responsive">
              <table className="modern-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Subtitle</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th className="text-right">Manage</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="empty-state">
                        {loading ? "Syncing..." : "No categories found."}
                      </td>
                    </tr>
                  ) : (
                    categories.map((cat) => (
                      <tr key={cat._id}>
                        <td className="cat-identity">
                          <span className="cat-icon">{cat.icon}</span>
                          <span className="cat-name">{cat.title}</span>
                        </td>
                        <td className="text-muted">{cat.subtitle}</td>
                        <td className="desc-cell">{cat.description}</td>
                        <td>
                          <div
                            className={`modern-status ${
                              cat.isActive ? "active" : "draft"
                            }`}
                          >
                            {cat.isActive ? (
                              <Globe size={14} />
                            ) : (
                              <EyeOff size={14} />
                            )}
                            {cat.isActive ? "Live" : "Draft"}
                          </div>
                        </td>
                        <td className="text-right">
                          <div className="manage-btns">
                            <button
                              className="edit-icon"
                              onClick={() => handleEdit(cat)}
                            >
                              <Pencil size={18} />
                            </button>
                            <button
                              className="delete-icon"
                              onClick={() => handleDelete(cat._id)}
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCategory;
