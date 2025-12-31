import React, { useEffect, useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Briefcase,
  MapPin,
  Clock,
  Layers,
  ChevronRight,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    jobType: "",
    experience: "",
    description: "",
    isActive: true,
  });

  const API_URL = `${process.env.VITE_API_URL}/api/jobs`;

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      department: "",
      location: "",
      jobType: "",
      experience: "",
      description: "",
      isActive: true,
    });
    setEditingJob(null);
    setShowForm(false);
  };

  const handleSubmit = async () => {
    const url = editingJob ? `${API_URL}/${editingJob._id}` : API_URL;
    const method = editingJob ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchJobs();
        resetForm();
      }
    } catch (error) {
      console.error("Error submitting job:", error);
      alert("Error saving job.");
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setFormData(job);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchJobs();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

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
        
        .add-job-btn { background: #1e293b; color: white; border: none; padding: 0.7rem 1.4rem; border-radius: 10px; font-weight: 600; display: flex; align-items: center; gap: 8px; transition: 0.2s; }
        .add-job-btn:hover { background: #334155; transform: translateY(-2px); }

        /* Modern Table */
        .modern-card { background: white; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .modern-table { width: 100%; border-collapse: collapse; }
        .modern-table th { background: #f8fafc; padding: 1.2rem 1.5rem; text-align: left; font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; }
        .modern-table td { padding: 1.2rem 1.5rem; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
        .job-row:hover { background: #fcfdfe; }

        .job-identity { display: flex; flex-direction: column; }
        .job-title { font-weight: 700; color: #1e293b; font-size: 1rem; }
        .job-dept { font-size: 0.8rem; color: #6366f1; font-weight: 600; }

        .meta-info { display: flex; align-items: center; gap: 6px; color: #64748b; font-size: 0.85rem; }

        .status-badge { display: inline-flex; align-items: center; gap: 5px; padding: 5px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; }
        .status-active { background: #dcfce7; color: #15803d; }
        .status-inactive { background: #f1f5f9; color: #475569; }

        .action-btns { display: flex; gap: 8px; justify-content: flex-end; }
        .action-icon { padding: 8px; border-radius: 8px; border: none; background: transparent; color: #94a3b8; transition: 0.2s; }
        .action-icon:hover { background: #f1f5f9; color: #6366f1; }
        .action-icon.delete:hover { background: #fee2e2; color: #ef4444; }

        /* Modal Overlay */
        .focus-modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(5px); display: flex; align-items: center; justify-content: center; z-index: 2000; padding: 20px; }
        .focus-modal { background: white; width: 100%; max-width: 650px; border-radius: 24px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); overflow: hidden; animation: modalIn 0.3s ease-out; }
        
        .modal-head { padding: 1.5rem 2rem; background: #f8fafc; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; }
        .modal-body { padding: 2rem; }
        
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .form-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 1.25rem; }
        .form-field.full { grid-column: span 2; }
        .form-field label { font-size: 0.75rem; font-weight: 700; color: #475569; text-transform: uppercase; }
        
        .job-input { padding: 0.75rem 1rem; border-radius: 10px; border: 1px solid #e2e8f0; background: #f8fafc; outline: none; transition: 0.2s; }
        .job-input:focus { border-color: #6366f1; background: white; box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1); }
        
        .toggle-container { display: flex; align-items: center; gap: 12px; background: #f1f5f9; padding: 12px 16px; border-radius: 12px; margin-top: 0.5rem; }
        
        .submit-job-btn { width: 100%; background: #6366f1; color: white; border: none; padding: 0.8rem; border-radius: 10px; font-weight: 700; margin-top: 1rem; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2); }

        @keyframes modalIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div className="dashboard-container">
        {/* Header Section */}
        <div className="page-header">
          <div className="header-brand">
            <div className="brand-icon-box">
              <Briefcase size={24} color="#fff" />
            </div>
            <div>
              <h1>Post Your Jobs Here</h1>
              <p>Manage your organization's open positions</p>
            </div>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="add-job-btn shadow-sm"
          >
            <Plus size={18} /> Post New Job
          </button>
        </div>

        {/* Table Section */}
        <div className="modern-card">
          <div className="table-responsive">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Role & Dept</th>
                  <th>Location</th>
                  <th>Job Details</th>
                  {/* <th>Visibility</th> */}
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-5">
                      Loading positions...
                    </td>
                  </tr>
                ) : jobs.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-5 text-muted">
                      No jobs posted yet.
                    </td>
                  </tr>
                ) : (
                  jobs.map((job) => (
                    <tr key={job._id} className="job-row">
                      <td>
                        <div className="job-identity">
                          <span className="job-title">{job.title}</span>
                          <span className="job-dept">{job.department}</span>
                        </div>
                      </td>
                      <td>
                        <div className="meta-info">
                          <MapPin size={14} /> {job.location}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-column gap-1">
                          <div className="meta-info">
                            <Clock size={14} /> {job.jobType}
                          </div>
                          <div className="meta-info">
                            <Layers size={14} /> {job.experience}
                          </div>
                        </div>
                      </td>
                      {/* <td>
                        <span
                          className={`status-badge ${
                            job.isActive ? "status-active" : "status-inactive"
                          }`}
                        >
                          {job.isActive ? (
                            <CheckCircle2 size={14} />
                          ) : (
                            <AlertCircle size={14} />
                          )}
                          {job.isActive ? "Live" : "Draft"}
                        </span>
                      </td> */}
                      <td>
                        <div className="action-btns">
                          <button
                            onClick={() => handleEdit(job)}
                            className="action-icon"
                            title="Edit"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(job._id)}
                            className="action-icon delete"
                            title="Delete"
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
      </div>

      {/* Focus Modal for Add/Edit */}
      {showForm && (
        <div className="focus-modal-overlay" onClick={resetForm}>
          <div className="focus-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h2 className="h5 fw-bold mb-0">
                {editingJob ? "Update Position" : "Post New Position"}
              </h2>
              <button
                onClick={resetForm}
                className="btn-close shadow-none"
              ></button>
            </div>

            <div className="modal-body">
              <div className="form-grid">
                <div className="form-field full">
                  <label>Position Title</label>
                  <input
                    name="title"
                    className="job-input"
                    placeholder="e.g. Senior Solar Consultant"
                    onChange={handleChange}
                    value={formData.title}
                  />
                </div>

                <div className="form-field">
                  <label>Department</label>
                  <input
                    name="department"
                    className="job-input"
                    placeholder="e.g. Operations"
                    onChange={handleChange}
                    value={formData.department}
                  />
                </div>

                <div className="form-field">
                  <label>Job Type</label>
                  <input
                    name="jobType"
                    className="job-input"
                    placeholder="e.g. Full-time"
                    onChange={handleChange}
                    value={formData.jobType}
                  />
                </div>

                <div className="form-field">
                  <label>Office Location</label>
                  <input
                    name="location"
                    className="job-input"
                    placeholder="e.g. Remote / Mumbai"
                    onChange={handleChange}
                    value={formData.location}
                  />
                </div>

                <div className="form-field">
                  <label>Experience</label>
                  <input
                    name="experience"
                    className="job-input"
                    placeholder="e.g. 3+ Years"
                    onChange={handleChange}
                    value={formData.experience}
                  />
                </div>

                <div className="form-field full">
                  <label>Job Description</label>
                  <textarea
                    name="description"
                    className="job-input"
                    rows="4"
                    placeholder="Outline responsibilities and requirements..."
                    onChange={handleChange}
                    value={formData.description}
                  />
                </div>
              </div>

              {/* <div className="toggle-container">
                <input
                  type="checkbox"
                  name="isActive"
                  className="form-check-input mt-0"
                  id="activeCheck"
                  checked={formData.isActive}
                  onChange={handleChange}
                />
                <label
                  htmlFor="activeCheck"
                  className="small fw-bold text-slate-700"
                >
                  Enable this listing immediately (Publicly visible)
                </label>
              </div> */}

              <button onClick={handleSubmit} className="submit-job-btn">
                {editingJob ? "Save Changes" : "Publish Job Listing"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
