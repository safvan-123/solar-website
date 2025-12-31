// utils/createAdmin.js
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

const createDefaultAdmin = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    if (existingAdmin) {
      console.log("✅ Admin already exists");
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    // Create new admin
    const admin = new Admin({
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
    });

    await admin.save();

    console.log("✅ Default admin created successfully!");
    console.log("📧 Email:", process.env.ADMIN_EMAIL);
    console.log("🔑 Password:", process.env.ADMIN_PASSWORD);
  } catch (error) {
    console.error("❌ Error creating default admin:", error);
  }
};

export default createDefaultAdmin;
