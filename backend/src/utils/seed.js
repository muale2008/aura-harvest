const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Job = require("../models/Job");
const Announcement = require("../models/Announcement");
const AdConfig = require("../models/AdConfig");

async function seed() {
  // Admin user
  const adminEmail = "admin@local";
  let admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    const passwordHash = await bcrypt.hash("admin123", 10);
    admin = await User.create({
      email: adminEmail,
      passwordHash,
      roles: ["admin"],
      adminOverride: false,
      adminFrequency: "standard"
    });
    console.log("Seeded admin user: admin@local / admin123");
  }

  // Sample jobs
  const count = await Job.countDocuments();
  if (count === 0) {
    await Job.create([
      {
        title: "Junior Frontend Developer (Remote)",
        description: "Build delightful UIs with React and Next.js. Collaborate with design, write clean code, and ship features weekly.",
        tags: ["frontend", "react", "remote"],
        status: "published",
        versions: [{ title: "Junior Frontend Developer (Remote)", description: "Initial", tags: ["frontend"], versionNote: "seed" }],
        adIntensity: "standard",
        repostHistory: []
      },
      {
        title: "Operations Assistant (Accra)",
        description: "Coordinate schedules, track inventory, and support vendor management. Growth path into Operations Lead.",
        tags: ["operations", "ghana", "entry-level"],
        status: "published",
        versions: [{ title: "Operations Assistant (Accra)", description: "Initial", tags: ["operations"], versionNote: "seed" }],
        adIntensity: "minimal"
      }
    ]);
    console.log("Seeded sample jobs");
  }

  // Announcement
  const ann = await Announcement.findOne();
  if (!ann) {
    await Announcement.create({ message: "Welcome to Aura Harvest — find real opportunities and grow your career!" });
    console.log("Seeded announcement");
  }

  // Ad config default
  const cfg = await AdConfig.findOne();
  if (!cfg) {
    await AdConfig.create({ defaultFrequency: "standard", perJobType: [] });
    console.log("Seeded ad config");
  }
}

module.exports = { seed };
