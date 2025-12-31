import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Upload,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import "./Careers.css";

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingJobs, setLoadingJobs] = useState(true);

  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
    resume: null,
  });

  const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchJobs();
  }, []);

  /* ================= FETCH JOBS ================= */
  const fetchJobs = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/jobs`);
      const data = await res.json();

      setJobs(data || []);
    } catch (error) {
      console.error("Failed to load jobs", error);
    } finally {
      setLoadingJobs(false);
    }
  };

  const scrollToFormTop = () => {
    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  /* ================= DEPARTMENTS ================= */
  const departments = ["all", ...new Set(jobs.map((job) => job.department))];

  const filteredJobs =
    selectedDepartment === "all"
      ? jobs
      : jobs.filter((job) => job.department === selectedDepartment);

  /* ================= APPLY ================= */
  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
    setSubmitStatus(null);
    setErrorMessage("");

    setTimeout(() => {
      document
        .getElementById("application-form")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("File size must be less than 5MB");
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      setErrorMessage("Please upload a PDF, DOC, or DOCX file");
      return;
    }

    setErrorMessage("");
    setFormData((prev) => ({ ...prev, resume: file }));
  };

  /* ================= SUBMIT APPLICATION ================= */
  const handleSubmit = async () => {
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.resume
    ) {
      setErrorMessage("Please fill in all required fields");
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage("");

    try {
      const submitData = new FormData();
      submitData.append("jobTitle", selectedJob.title);
      submitData.append("fullName", formData.fullName);
      submitData.append("email", formData.email);
      submitData.append("phone", formData.phone);
      submitData.append("coverLetter", formData.coverLetter);
      submitData.append("resume", formData.resume);

      const response = await fetch(`${API_BASE_URL}/applications`, {
        method: "POST",
        body: submitData,
      });

      if (!response.ok) throw new Error("Submission failed");

      setSubmitStatus("success");
      scrollToFormTop();
      setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          coverLetter: "",
          resume: null,
        });
        setShowApplicationForm(false);
        setSelectedJob(null);
        setSubmitStatus(null);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 4000);
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(error.message);
      scrollToFormTop();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="careers-hero">
        <div className="careers-hero-content">
          <div className="careers-badge">💼 Join Our Team</div>
          <h1 className="careers-title">
            Power Your Career with Ecogreen Energy
          </h1>
          <p className="careers-subtitle">
            Join <strong>Your Trusted Solar Partner</strong> and Authorized
            Channel Partner of <strong>Tata Power Solaroof</strong>. Work with a
            team committed to excellence in energy and automation solutions.
          </p>
        </div>
      </section>

      {/* ================= JOB LIST ================= */}
      <section className="jobs-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Open Positions</h2>
          </div>

          <div className="filter-buttons">
            {departments.map((dept) => (
              <button
                key={dept}
                className={`filter-btn ${
                  selectedDepartment === dept ? "active" : ""
                }`}
                onClick={() => setSelectedDepartment(dept)}
              >
                {dept === "all" ? "All Positions" : dept}
              </button>
            ))}
          </div>

          <div className="jobs-grid">
            {loadingJobs ? (
              <p>Loading jobs...</p>
            ) : (
              filteredJobs.map((job, index) => (
                <div
                  key={job._id}
                  className="job-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="job-header">
                    <div>
                      <h3 className="job-title">{job.title}</h3>
                      <span className="job-department">{job.department}</span>
                    </div>
                  </div>

                  <div className="job-meta">
                    <div className="job-meta-item">
                      <MapPin size={16} /> {job.location}
                    </div>
                    <div className="job-meta-item">
                      <Clock size={16} /> {job.jobType}
                    </div>
                    <div className="job-meta-item">
                      <Briefcase size={16} /> {job.experience}
                    </div>
                  </div>

                  <p className="job-description">{job.description}</p>

                  <button
                    className="apply-btn"
                    onClick={() => handleApplyClick(job)}
                  >
                    Apply Now <ArrowRight size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ================= APPLICATION FORM (UNCHANGED DESIGN) ================= */}
      {showApplicationForm && selectedJob && (
        <section
          className="application-section"
          id="application-form"
          ref={formRef}
        >
          <div className="section-container">
            <div className="form-container">
              {/* ENHANCED SUCCESS ALERT */}
              {submitStatus === "success" && (
                <div className="better-success-alert">
                  <div className="alert-icon-wrapper">
                    <CheckCircle2 size={24} />
                  </div>
                  <div className="alert-content">
                    <h4>Submission Successful!</h4>
                    <p>
                      Thank you for applying for{" "}
                      <strong>{selectedJob.title}</strong>. Your details have
                      been recorded and we will contact you via email shortly.
                    </p>
                  </div>
                </div>
              )}

              {/* ENHANCED ERROR ALERT */}
              {submitStatus === "error" && errorMessage && (
                <div className="better-error-alert">
                  <AlertCircle size={20} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="section-header">
                <h2 className="section-title">Apply Now</h2>
                <p className="section-subtitle">
                  Position: {selectedJob.title}
                </p>
              </div>

              <div
                className={`form-fields ${
                  submitStatus === "success" ? "form-disabled" : ""
                }`}
              >
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    className="form-input"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    disabled={isSubmitting || submitStatus === "success"}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isSubmitting || submitStatus === "success"}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-input"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={isSubmitting || submitStatus === "success"}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Cover Letter</label>
                  <textarea
                    name="coverLetter"
                    className="form-textarea"
                    placeholder="Tell us why you're interested..."
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    disabled={isSubmitting || submitStatus === "success"}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Resume/CV *</label>
                  <div className="file-input-wrapper">
                    <input
                      type="file"
                      id="resume"
                      className="file-input"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      disabled={isSubmitting || submitStatus === "success"}
                    />
                    <label htmlFor="resume" className="file-input-label">
                      <Upload size={20} />
                      {formData.resume
                        ? formData.resume.name
                        : "Upload Resume (PDF, DOC, DOCX)"}
                    </label>
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => {
                      setShowApplicationForm(false);
                      setSubmitStatus(null);
                    }}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="submit-btn"
                    disabled={isSubmitting || submitStatus === "success"}
                    onClick={handleSubmit}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="spinner" /> Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Careers;
