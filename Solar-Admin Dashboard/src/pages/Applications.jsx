import React, { useState, useEffect } from "react";
import {
  Search,
  Download,
  Eye,
  Trash2,
  Calendar,
  Mail,
  Phone,
  Loader2,
  RefreshCw,
  ExternalLink,
  Briefcase,
  XCircle,
  FileText,
  User,
  Inbox,
} from "lucide-react";

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApp, setSelectedApp] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const API_BASE_URL = `${process.env.VITE_API_URL}/api`;

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/applications`);
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?"))
      return;
    try {
      const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setApplications(applications.filter((app) => app._id !== id));
        setShowModal(false);
        setSelectedApp(null);
      }
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  const getResumeUrl = (resumePath) => {
    if (!resumePath) return "";
    return resumePath.startsWith("http")
      ? resumePath
      : `${API_BASE_URL.replace("/api", "")}/${resumePath}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const filteredApplications = applications.filter(
    (app) =>
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-dashboard-wrapper">
      <style>{`
        .admin-dashboard-wrapper { background: #f8fafc; min-height: 100vh; font-family: 'Inter', sans-serif; padding: 2rem; }
        .dashboard-container { max-width: 1200px; margin: 0 auto; }
        
        /* Header */
        .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2.5rem; }
        .header-brand { display: flex; align-items: center; gap: 1rem; }
        .brand-icon-box { background: #6366f1; padding: 12px; border-radius: 12px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2); }
        .page-header h1 { font-size: 1.5rem; font-weight: 800; color: #1e293b; margin: 0; }
        .page-header p { color: #64748b; margin: 0; font-size: 0.9rem; }
        
        .refresh-btn { background: #1e293b; color: white; border: none; padding: 0.7rem 1.4rem; border-radius: 10px; font-weight: 600; display: flex; align-items: center; gap: 8px; transition: 0.2s; cursor: pointer; }
        .refresh-btn:hover { background: #334155; transform: translateY(-2px); }

        /* Stats & Search Summary */
        .summary-row { display: grid; grid-template-columns: 250px 1fr; gap: 1.5rem; margin-bottom: 2rem; }
        .summary-card { background: white; padding: 1.25rem; border-radius: 16px; border: 1px solid #e2e8f0; display: flex; align-items: center; gap: 1rem; }
        .summary-icon { background: #f1f5f9; padding: 10px; border-radius: 10px; color: #6366f1; }
        .summary-data { display: flex; flex-direction: column; }
        .summary-label { font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase; }
        .summary-value { font-size: 1.25rem; font-weight: 800; color: #1e293b; }

        .search-wrapper { position: relative; display: flex; align-items: center; }
        .search-input { width: 100%; padding: 0.85rem 1rem 0.85rem 3rem; border-radius: 16px; border: 1px solid #e2e8f0; background: white; outline: none; transition: 0.2s; }
        .search-input:focus { border-color: #6366f1; box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1); }
        .search-icon-fixed { position: absolute; left: 1.25rem; color: #94a3b8; }

        /* Modern Card Table */
        .modern-card { background: white; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .modern-table { width: 100%; border-collapse: collapse; }
        .modern-table th { background: #f8fafc; padding: 1.2rem 1.5rem; text-align: left; font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; }
        .modern-table td { padding: 1.2rem 1.5rem; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
        
        .candidate-box { display: flex; align-items: center; gap: 12px; }
        .avatar-circle { width: 40px; height: 40px; border-radius: 12px; background: #eef2ff; color: #6366f1; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.9rem; }
        .candidate-name { font-weight: 700; color: #1e293b; font-size: 0.95rem; }
        .candidate-email { font-size: 0.8rem; color: #64748b; }

        .role-badge { display: flex; align-items: center; gap: 6px; color: #475569; font-weight: 600; font-size: 0.9rem; }
        
        .action-btns { display: flex; gap: 8px; justify-content: flex-end; }
        .btn-icon { padding: 8px; border-radius: 10px; border: 1px solid #e2e8f0; background: white; color: #64748b; transition: 0.2s; cursor: pointer; }
        .btn-icon:hover { border-color: #6366f1; color: #6366f1; background: #f8faff; }
        .btn-icon.delete:hover { border-color: #ef4444; color: #ef4444; background: #fef2f2; }

        /* Detail Modal */
        .focus-modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(5px); display: flex; align-items: center; justify-content: center; z-index: 2000; padding: 20px; }
        .focus-modal { background: white; width: 100%; max-width: 650px; border-radius: 24px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); overflow: hidden; animation: modalIn 0.3s ease-out; }
        .modal-head { padding: 1.5rem 2rem; background: #f8fafc; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; }
        .modal-body { padding: 2rem; }

        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem; }
        .info-item label { font-size: 0.7rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; display: block; margin-bottom: 4px; }
        .info-item p { font-weight: 600; color: #1e293b; margin: 0; display: flex; align-items: center; gap: 8px; }

        .letter-preview { background: #f1f5f9; padding: 1.5rem; border-radius: 16px; font-size: 0.95rem; color: #475569; line-height: 1.6; white-space: pre-wrap; border: 1px solid #e2e8f0; }

        @keyframes modalIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div className="dashboard-container">
        {/* Header Section */}
        <div className="page-header">
          <div className="header-brand">
            <div className="brand-icon-box">
              <Inbox size={24} color="#fff" />
            </div>
            <div>
              <h1>Applications</h1>
              <p>Review and manage candidate submissions</p>
            </div>
          </div>
          <button onClick={fetchApplications} className="refresh-btn">
            <RefreshCw size={18} /> Refresh List
          </button>
        </div>

        {/* Summary & Search */}
        <div className="summary-row">
          <div className="summary-card">
            <div className="summary-icon">
              <User size={20} />
            </div>
            <div className="summary-data">
              <span className="summary-label">Total Volume</span>
              <span className="summary-value">
                {applications.length} Applicants
              </span>
            </div>
          </div>
          <div className="search-wrapper">
            <Search className="search-icon-fixed" size={20} />
            <input
              type="text"
              className="search-input"
              placeholder="Search by name, email, or job title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="modern-card">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Applied Position</th>
                <th>Date Applied</th>
                <th>Resume</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    style={{ textAlign: "center", padding: "4rem" }}
                  >
                    <Loader2 className="spinner" /> Syncing...
                  </td>
                </tr>
              ) : filteredApplications.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: "center",
                      padding: "4rem",
                      color: "#64748b",
                    }}
                  >
                    No applications found.
                  </td>
                </tr>
              ) : (
                filteredApplications.map((app) => (
                  <tr key={app._id} className="job-row">
                    <td>
                      <div className="candidate-box">
                        <div className="avatar-circle">
                          {app.fullName.charAt(0)}
                        </div>
                        <div>
                          <div className="candidate-name">{app.fullName}</div>
                          <div className="candidate-email">{app.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="role-badge">
                        <Briefcase size={14} /> {app.jobTitle}
                      </div>
                    </td>
                    <td style={{ color: "#64748b", fontSize: "0.85rem" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <Calendar size={14} /> {formatDate(app.createdAt)}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <a
                          href={getResumeUrl(app.resume)}
                          target="_blank"
                          className="btn-icon"
                          title="View CV"
                        >
                          <ExternalLink size={16} />
                        </a>
                        <a
                          href={getResumeUrl(app.resume)}
                          download
                          className="btn-icon"
                          title="Download CV"
                        >
                          <Download size={16} />
                        </a>
                      </div>
                    </td>
                    <td>
                      <div className="action-btns">
                        <button
                          className="btn-icon"
                          onClick={() => {
                            setSelectedApp(app);
                            setShowModal(true);
                          }}
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          className="btn-icon delete"
                          onClick={() => handleDelete(app._id)}
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

      {/* Focus Modal for Details */}
      {showModal && selectedApp && (
        <div
          className="focus-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div className="focus-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div
                  className="avatar-circle"
                  style={{ width: "45px", height: "45px" }}
                >
                  {selectedApp.fullName.charAt(0)}
                </div>
                <div>
                  <h2
                    style={{ margin: 0, fontSize: "1.1rem", fontWeight: 800 }}
                  >
                    {selectedApp.fullName}
                  </h2>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: "#6366f1",
                      fontWeight: 700,
                    }}
                  >
                    {selectedApp.jobTitle}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#94a3b8",
                }}
              >
                <XCircle size={24} />
              </button>
            </div>

            <div className="modal-body">
              <div className="info-grid">
                <div className="info-item">
                  <label>Email Address</label>
                  <p>
                    <Mail size={14} /> {selectedApp.email}
                  </p>
                </div>
                <div className="info-item">
                  <label>Phone Number</label>
                  <p>
                    <Phone size={14} /> {selectedApp.phone}
                  </p>
                </div>
                <div className="info-item">
                  <label>Applied On</label>
                  <p>
                    <Calendar size={14} /> {formatDate(selectedApp.createdAt)}
                  </p>
                </div>
                <div className="info-item">
                  <label>Resume File</label>
                  <p>
                    <FileText size={14} />{" "}
                    <a
                      href={getResumeUrl(selectedApp.resume)}
                      target="_blank"
                      style={{ color: "#6366f1", textDecoration: "none" }}
                    >
                      View CV Document
                    </a>
                  </p>
                </div>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    color: "#94a3b8",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  Cover Letter
                </label>
                <div className="letter-preview">
                  {selectedApp.coverLetter ||
                    "No cover letter provided by the candidate."}
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <a
                  href={getResumeUrl(selectedApp.resume)}
                  target="_blank"
                  style={{
                    flex: 1,
                    textAlign: "center",
                    background: "#6366f1",
                    color: "white",
                    padding: "12px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontWeight: 700,
                  }}
                >
                  Review Application
                </a>
                <button
                  onClick={() => handleDelete(selectedApp._id)}
                  style={{
                    flex: 1,
                    background: "#fee2e2",
                    color: "#ef4444",
                    border: "none",
                    padding: "12px",
                    borderRadius: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Discard Candidate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminApplications;
