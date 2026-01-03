// import React from "react";

// const Dashboard = () => {
//   const stats = [
//     {
//       label: "Total Enquiries",
//       value: "248",
//       change: "+12%",
//       color: "primary",
//     },
//     { label: "Active Projects", value: "45", change: "+8%", color: "success" },
//     { label: "Products Listed", value: "127", change: "+3%", color: "info" },
//     {
//       label: "Website Visitors",
//       value: "12.5K",
//       change: "+23%",
//       color: "warning",
//     },
//   ];
//   return (
//     <div>
//       {/* Stats Cards */}
//       <div className="row g-4 mb-4">
//         {stats.map((stat, idx) => (
//           <div key={idx} className="col-md-6 col-xl-3">
//             <div className="card border-0 shadow-sm h-100">
//               <div className="card-body">
//                 <div className="d-flex justify-content-between align-items-start mb-3">
//                   <div>
//                     <p className="text-muted mb-1 small">{stat.label}</p>
//                     <h3 className="mb-0">{stat.value}</h3>
//                   </div>
//                   <span
//                     className={`badge bg-${stat.color} bg-opacity-10 text-${stat.color}`}
//                   >
//                     {stat.change}
//                   </span>
//                 </div>
//                 <div className="progress" style={{ height: "4px" }}>
//                   <div
//                     className={`progress-bar bg-${stat.color}`}
//                     style={{ width: "70%" }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Recent Activity */}
//       <div className="row g-4">
//         <div className="col-lg-8">
//           <div className="card border-0 shadow-sm">
//             <div className="card-header bg-white border-0 py-3">
//               <h5 className="mb-0">Recent Enquiries</h5>
//             </div>
//             <div className="card-body p-0">
//               <div className="table-responsive">
//                 <table className="table table-hover mb-0">
//                   <thead className="bg-light">
//                     <tr>
//                       <th className="border-0 px-4 py-3">Name</th>
//                       <th className="border-0 py-3">Email</th>
//                       <th className="border-0 py-3">Service</th>
//                       <th className="border-0 py-3">Date</th>
//                       <th className="border-0 py-3">Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {[
//                       {
//                         name: "John Doe",
//                         email: "john@example.com",
//                         service: "Solar Panel Installation",
//                         date: "2024-12-15",
//                         status: "New",
//                       },
//                       {
//                         name: "Jane Smith",
//                         email: "jane@example.com",
//                         service: "Maintenance",
//                         date: "2024-12-14",
//                         status: "In Progress",
//                       },
//                       {
//                         name: "Mike Johnson",
//                         email: "mike@example.com",
//                         service: "Consultation",
//                         date: "2024-12-13",
//                         status: "Completed",
//                       },
//                     ].map((enquiry, idx) => (
//                       <tr key={idx}>
//                         <td className="px-4 py-3">{enquiry.name}</td>
//                         <td className="py-3">{enquiry.email}</td>
//                         <td className="py-3">{enquiry.service}</td>
//                         <td className="py-3">{enquiry.date}</td>
//                         <td className="py-3">
//                           <span
//                             className={`badge ${
//                               enquiry.status === "New"
//                                 ? "bg-info"
//                                 : enquiry.status === "In Progress"
//                                 ? "bg-warning"
//                                 : "bg-success"
//                             }`}
//                           >
//                             {enquiry.status}
//                           </span>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="col-lg-4">
//           <div className="card border-0 shadow-sm">
//             <div className="card-header bg-white border-0 py-3">
//               <h5 className="mb-0">Quick Actions</h5>
//             </div>
//             <div className="card-body">
//               <div className="d-grid gap-2">
//                 <button className="btn btn-primary">Add New Product</button>
//                 <button className="btn btn-outline-primary">
//                   Create Project
//                 </button>
//                 <button className="btn btn-outline-primary">
//                   Manage Pages
//                 </button>
//                 <button className="btn btn-outline-primary">
//                   Post Career Opening
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEnquiries: 0,
    activeProjects: 0,
    productsListed: 0,
    websiteVisitors: 0,
  });
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace with your actual API URL
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all data in parallel
      const [contactsRes, productsRes, jobsRes] = await Promise.allSettled([
        fetch(`${API_URL}/api/contacts`).then((res) =>
          res.ok ? res.json() : []
        ),
        fetch(`${API_URL}/api/products`).then((res) =>
          res.ok ? res.json() : []
        ),
        fetch(`${API_URL}/api/jobs`).then((res) => (res.ok ? res.json() : [])),
      ]);

      // Extract data from settled promises
      const contacts =
        contactsRes.status === "fulfilled" && Array.isArray(contactsRes.value)
          ? contactsRes.value
          : [];
      const products =
        productsRes.status === "fulfilled" && Array.isArray(productsRes.value)
          ? productsRes.value
          : [];
      const jobs =
        jobsRes.status === "fulfilled" && Array.isArray(jobsRes.value)
          ? jobsRes.value
          : [];

      // Calculate stats
      setStats({
        totalEnquiries: contacts.length,
        activeProjects: jobs.length,
        productsListed: products.length,
        websiteVisitors: Math.floor(Math.random() * 20000) + 10000, // Mock data
      });

      // Get recent enquiries (last 5)
      const sortedContacts = contacts
        .sort((a, b) => {
          const dateA = new Date(a.createdAt || a.date || 0);
          const dateB = new Date(b.createdAt || b.date || 0);
          return dateB - dateA;
        })
        .slice(0, 5);

      setRecentEnquiries(sortedContacts);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      new: "bg-info",
      pending: "bg-warning",
      "in progress": "bg-warning",
      completed: "bg-success",
      resolved: "bg-success",
    };
    const statusLower = status?.toLowerCase() || "new";
    return statusMap[statusLower] || "bg-secondary";
  };

  const statsDisplay = [
    {
      label: "Total Enquiries",
      value: stats.totalEnquiries,
      change: "+12%",
      color: "primary",
    },
    {
      label: "Active Projects",
      value: stats.activeProjects,
      change: "+8%",
      color: "success",
    },
    {
      label: "Products Listed",
      value: stats.productsListed,
      change: "+3%",
      color: "info",
    },
    {
      label: "Website Visitors",
      value: `${(stats.websiteVisitors / 1000).toFixed(1)}K`,
      change: "+23%",
      color: "warning",
    },
  ];

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "400px" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
        <button
          className="btn btn-sm btn-outline-danger ms-3"
          onClick={fetchDashboardData}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        {statsDisplay.map((stat, idx) => (
          <div key={idx} className="col-md-6 col-xl-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <p className="text-muted mb-1 small">{stat.label}</p>
                    <h3 className="mb-0">{stat.value}</h3>
                  </div>
                  <span
                    className={`badge bg-${stat.color} bg-opacity-10 text-${stat.color}`}
                  >
                    {stat.change}
                  </span>
                </div>
                <div className="progress" style={{ height: "4px" }}>
                  <div
                    className={`progress-bar bg-${stat.color}`}
                    style={{ width: "70%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0">Recent Enquiries</h5>
            </div>
            <div className="card-body p-0">
              {recentEnquiries.length === 0 ? (
                <div className="text-center py-5 text-muted">
                  No enquiries found
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th className="border-0 px-4 py-3">Name</th>
                        <th className="border-0 py-3">Email</th>
                        <th className="border-0 py-3">Message</th>
                        <th className="border-0 py-3">Date</th>
                        <th className="border-0 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentEnquiries.map((enquiry, idx) => (
                        <tr key={enquiry._id || idx}>
                          <td className="px-4 py-3">{enquiry.name || "N/A"}</td>
                          <td className="py-3">
                            <small>{enquiry.email || "N/A"}</small>
                          </td>
                          <td className="py-3">
                            <small
                              className="text-truncate d-inline-block"
                              style={{ maxWidth: "200px" }}
                            >
                              {enquiry.message || enquiry.subject || "N/A"}
                            </small>
                          </td>
                          <td className="py-3">
                            <small>
                              {formatDate(enquiry.createdAt || enquiry.date)}
                            </small>
                          </td>
                          <td className="py-3">
                            <span
                              className={`badge ${getStatusBadge(
                                enquiry.status || "new"
                              )}`}
                            >
                              {enquiry.status || "New"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0">Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <button
                  className="btn btn-primary"
                  onClick={() => (window.location.href = "/admin/products/add")}
                >
                  Add New Product
                </button>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => (window.location.href = "/admin/jobs/add")}
                >
                  Post Career Opening
                </button>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => (window.location.href = "/admin/contacts")}
                >
                  View All Enquiries
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={fetchDashboardData}
                >
                  Refresh Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
