import CareerApplication from "../models/Application.js";

// Submit application (Public)
export const submitApplication = async (req, res) => {
  try {
    const { jobTitle, fullName, email, phone, coverLetter } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Resume is required" });
    }

    const application = await CareerApplication.create({
      jobTitle,
      fullName,
      email,
      phone,
      coverLetter,
      resume: req.file.path, // 🔥 SAVE FILE PATH
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get all applications (Admin)
export const getApplications = async (req, res) => {
  try {
    const applications = await CareerApplication.find().sort({
      createdAt: -1,
    });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update application status (Admin)
export const updateApplicationStatus = async (req, res) => {
  try {
    const updated = await CareerApplication.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete application (Admin)
export const deleteApplication = async (req, res) => {
  try {
    const application = await CareerApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    await application.deleteOne();
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
