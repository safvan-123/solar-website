import React, { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Filter,
  X,
  Download,
  Search,
  ChevronRight,
  User,
  Zap,
  Clock,
} from "lucide-react";

const Enquiries = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    projectType: "",
    searchTerm: "",
  });

  const API_URL = "http://localhost:5000/api/contacts";

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [contacts, filters]);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...contacts];
    if (filters.startDate) {
      filtered = filtered.filter(
        (c) => new Date(c.createdAt) >= new Date(filters.startDate)
      );
    }
    if (filters.endDate) {
      const endDate = new Date(filters.endDate);
      endDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter((c) => new Date(c.createdAt) <= endDate);
    }
    if (filters.projectType) {
      filtered = filtered.filter((c) => c.projectType === filters.projectType);
    }
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.fullName?.toLowerCase().includes(searchLower) ||
          c.email?.toLowerCase().includes(searchLower) ||
          c.phone?.includes(searchLower)
      );
    }
    setFilteredContacts(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const clearFilters = () => {
    setFilters({ startDate: "", endDate: "", projectType: "", searchTerm: "" });
  };

  const viewDetails = (contact) => {
    setSelectedContact(contact);
    setShowDetailModal(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const exportToCSV = () => {
    const headers = [
      "Date",
      "Name",
      "Email",
      "Phone",
      "Project",
      // "Capacity",
      "Message",
    ];
    const rows = filteredContacts.map((c) => [
      formatDate(c.createdAt),
      c.fullName,
      c.email,
      c.phone,
      c.projectType,
      // c.estimatedCapacity || "N/A",
      c.message.replace(/,/g, ";"),
    ]);
    const csvContent = [
      headers.join(","),
      ...rows.map((r) => r.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  return (
    <div className="admin-dashboard-wrapper">
      <style>{`
        .admin-dashboard-wrapper { background: #f8fafc; min-height: 100vh; font-family: 'Inter', sans-serif; padding: 2rem; }
        .dashboard-container { max-width: 1300px; margin: 0 auto; }
        
        /* Header */
        .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .page-header h1 { font-size: 1.75rem; font-weight: 800; color: #1e293b; margin: 0; }
        .export-btn { background: #10b981; color: white; border: none; padding: 0.6rem 1.2rem; border-radius: 10px; font-weight: 600; display: flex; align-items: center; gap: 8px; transition: 0.2s; }
        .export-btn:hover { background: #059669; transform: translateY(-1px); }

        /* Filter Card */
        .filter-card { background: white; border-radius: 16px; padding: 1.5rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; margin-bottom: 2rem; }
        .filter-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr auto; gap: 1rem; align-items: flex-end; }
        .filter-input-group { display: flex; flex-direction: column; gap: 6px; }
        .filter-input-group label { font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase; }
        .filter-input { background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.6rem; font-size: 0.9rem; outline: none; transition: 0.2s; }
        .filter-input:focus { border-color: #3b82f6; background: white; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }

        /* Table */
        .table-card { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; }
        .enquiry-table { width: 100%; border-collapse: collapse; }
        .enquiry-table th { background: #f8fafc; padding: 1rem 1.5rem; text-align: left; font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; }
        .enquiry-table td { padding: 1.2rem 1.5rem; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
        .enquiry-row { transition: 0.2s; cursor: pointer; }
        .enquiry-row:hover { background: #f0f7ff; }

        .user-info { display: flex; align-items: center; gap: 12px; }
        .avatar-circle { width: 40px; height: 40px; background: #dbeafe; color: #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; }
        
        .status-pill { padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; display: inline-flex; align-items: center; gap: 4px; }
        .status-Residential { background: #dcfce7; color: #166534; }
        .status-Commercial { background: #dbeafe; color: #1e40af; }
        .status-Industrial { background: #fef9c3; color: #854d0e; }

        /* Modal */
        .modern-modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; }
        .modern-modal { background: white; width: 100%; max-width: 600px; border-radius: 24px; overflow: hidden; animation: zoomIn 0.3s ease; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); }
        .modal-header { padding: 2rem; background: #f8fafc; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: flex-start; }
        .modal-body { padding: 2rem; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem; }
        .info-item { display: flex; flex-direction: column; gap: 4px; }
        .info-label { font-size: 0.75rem; color: #64748b; font-weight: 600; text-transform: uppercase; }
        .info-value { font-size: 1rem; color: #1e293b; font-weight: 500; }
        .message-box { background: #f1f5f9; padding: 1.5rem; border-radius: 12px; color: #334155; line-height: 1.6; font-size: 0.95rem; }
        .modal-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .action-btn { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 0.8rem; border-radius: 12px; font-weight: 600; text-decoration: none; transition: 0.2s; }
        .btn-call { background: #3b82f6; color: white; }
        .btn-mail { background: #1e293b; color: white; }
        .action-btn:hover { opacity: 0.9; transform: translateY(-1px); }

        @keyframes zoomIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      `}</style>

      <div className="dashboard-container">
        {/* Header */}
        <div className="page-header">
          <div>
            <h1>Enquiries</h1>
            <p className="text-muted mt-1">
              Manage and respond to solar installation enquiries
            </p>
          </div>
          <button onClick={exportToCSV} className="export-btn shadow-sm">
            <Download size={18} /> Export CSV
          </button>
        </div>

        {/* Filter Section */}
        <div className="filter-card">
          <div className="filter-grid">
            <div className="filter-input-group">
              <label>
                <Search size={12} className="me-1" /> Search
              </label>
              <input
                name="searchTerm"
                placeholder="Name, email, or phone..."
                className="filter-input"
                value={filters.searchTerm}
                onChange={handleFilterChange}
              />
            </div>
            <div className="filter-input-group">
              <label>From</label>
              <input
                type="date"
                name="startDate"
                className="filter-input"
                value={filters.startDate}
                onChange={handleFilterChange}
              />
            </div>
            <div className="filter-input-group">
              <label>To</label>
              <input
                type="date"
                name="endDate"
                className="filter-input"
                value={filters.endDate}
                onChange={handleFilterChange}
              />
            </div>
            <div className="filter-input-group">
              <label>Project Type</label>
              <select
                name="projectType"
                className="filter-input"
                value={filters.projectType}
                onChange={handleFilterChange}
              >
                <option value="">All Categories</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Industrial">Industrial</option>
              </select>
            </div>
            {(filters.searchTerm ||
              filters.startDate ||
              filters.projectType) && (
              <button
                onClick={clearFilters}
                className="btn btn-link text-danger p-0 mb-2"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Data Table */}
        <div className="table-card">
          <table className="enquiry-table">
            <thead>
              <tr>
                <th>Lead Source</th>
                <th>Contact Information</th>
                <th>Category</th>
                {/* <th>Capacity</th> */}
                <th>Date Received</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-5">
                    Syncing data...
                  </td>
                </tr>
              ) : filteredContacts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-5 text-muted">
                    No enquiries found for these filters
                  </td>
                </tr>
              ) : (
                filteredContacts.map((contact) => (
                  <tr
                    key={contact._id}
                    className="enquiry-row"
                    onClick={() => viewDetails(contact)}
                  >
                    <td>
                      <div className="user-info">
                        <div className="avatar-circle">
                          {contact.fullName.charAt(0)}
                        </div>
                        <div className="fw-bold text-dark">
                          {contact.fullName}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="small text-dark fw-medium">
                        {contact.email}
                      </div>
                      <div className="small text-muted">{contact.phone}</div>
                    </td>
                    <td>
                      <span
                        className={`status-pill status-${contact.projectType}`}
                      >
                        <Zap size={12} /> {contact.projectType}
                      </span>
                    </td>
                    {/* <td>
                      <span className="fw-semibold text-primary">
                        {contact.estimatedCapacity || "N/A"}
                      </span>
                    </td> */}
                    <td>
                      <div className="d-flex align-items-center gap-2 text-muted small">
                        <Clock size={14} />{" "}
                        {formatDate(contact.createdAt).split(",")[0]}
                      </div>
                    </td>
                    <td className="text-end">
                      <ChevronRight size={18} className="text-slate-300" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modern Detail Slide-in/Modal */}
      {showDetailModal && selectedContact && (
        <div
          className="modern-modal-overlay"
          onClick={() => setShowDetailModal(false)}
        >
          <div className="modern-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="status-pill status-Residential mb-2">
                  New Enquiry
                </div>
                <h2 className="h4 fw-bold mb-0 text-dark">
                  {selectedContact.fullName}
                </h2>
                <p className="text-muted small mb-0 mt-1">
                  Received on {formatDate(selectedContact.createdAt)}
                </p>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="btn-close shadow-none"
              ></button>
            </div>

            <div className="modal-body">
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Email Address</span>
                  <span className="info-value">{selectedContact.email}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Phone Number</span>
                  <span className="info-value">{selectedContact.phone}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Project Type</span>
                  <span className="info-value">
                    {selectedContact.projectType}
                  </span>
                </div>
                {/* <div className="info-item">
                  <span className="info-label">Capacity Req.</span>
                  <span className="info-value text-primary fw-bold">
                    {selectedContact.estimatedCapacity || "Not specified"}
                  </span>
                </div> */}
              </div>

              <div className="mb-4">
                <span className="info-label d-block mb-2">
                  Customer Message
                </span>
                <div className="message-box">"{selectedContact.message}"</div>
              </div>

              <div className="modal-actions">
                {/* <a
                  href={`mailto:${selectedContact.email}`}
                  className="action-btn btn-mail"
                >
                  <Mail size={18} /> Reply via Email
                </a> */}
                <a
                  href={`tel:${selectedContact.phone}`}
                  className="action-btn btn-call"
                >
                  <Phone size={18} /> Call Customer
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Enquiries;
