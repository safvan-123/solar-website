import React from "react";

const Dashboard = () => {
  const stats = [
    {
      label: "Total Enquiries",
      value: "248",
      change: "+12%",
      color: "primary",
    },
    { label: "Active Projects", value: "45", change: "+8%", color: "success" },
    { label: "Products Listed", value: "127", change: "+3%", color: "info" },
    {
      label: "Website Visitors",
      value: "12.5K",
      change: "+23%",
      color: "warning",
    },
  ];
  return (
    <div>
      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        {stats.map((stat, idx) => (
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
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="border-0 px-4 py-3">Name</th>
                      <th className="border-0 py-3">Email</th>
                      <th className="border-0 py-3">Service</th>
                      <th className="border-0 py-3">Date</th>
                      <th className="border-0 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        name: "John Doe",
                        email: "john@example.com",
                        service: "Solar Panel Installation",
                        date: "2024-12-15",
                        status: "New",
                      },
                      {
                        name: "Jane Smith",
                        email: "jane@example.com",
                        service: "Maintenance",
                        date: "2024-12-14",
                        status: "In Progress",
                      },
                      {
                        name: "Mike Johnson",
                        email: "mike@example.com",
                        service: "Consultation",
                        date: "2024-12-13",
                        status: "Completed",
                      },
                    ].map((enquiry, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-3">{enquiry.name}</td>
                        <td className="py-3">{enquiry.email}</td>
                        <td className="py-3">{enquiry.service}</td>
                        <td className="py-3">{enquiry.date}</td>
                        <td className="py-3">
                          <span
                            className={`badge ${
                              enquiry.status === "New"
                                ? "bg-info"
                                : enquiry.status === "In Progress"
                                ? "bg-warning"
                                : "bg-success"
                            }`}
                          >
                            {enquiry.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
                <button className="btn btn-primary">Add New Product</button>
                <button className="btn btn-outline-primary">
                  Create Project
                </button>
                <button className="btn btn-outline-primary">
                  Manage Pages
                </button>
                <button className="btn btn-outline-primary">
                  Post Career Opening
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
