const mongoose = require("mongoose");
const HealthProgram = require("../models/programModel"); // Adjust path as needed
const connectDB = require("./connect");
const programs = [
  {
    name: "Tuberculosis (TB) Control",
    description:
      "A program aimed at preventing, diagnosing, and treating tuberculosis. Includes DOTS (Directly Observed Treatment, Short-course) for effective management.",
  },
  {
    name: "Malaria Prevention",
    description:
      "Focuses on reducing malaria transmission through mosquito nets, indoor spraying, and community awareness campaigns.",
  },
  {
    name: "HIV/AIDS Care",
    description:
      "Provides antiretroviral therapy (ART), counseling, and support services for people living with HIV/AIDS.",
  },
  {
    name: "Maternal and Child Health",
    description:
      "Ensures safe pregnancies, deliveries, and postnatal care for mothers and children under five.",
  },
  {
    name: "Diabetes Management",
    description:
      "Offers lifestyle education, glucose monitoring, and insulin therapy for diabetic patients.",
  },
  {
    name: "Immunization",
    description:
      "Delivers routine vaccinations for diseases like measles, polio, and hepatitis B.",
  },
  {
    name: "Mental Health Support",
    description:
      "Provides counseling, therapy, and psychiatric care for individuals with mental health conditions.",
  },
  {
    name: "Hypertension Screening",
    description:
      "Regular blood pressure checks and medication management to prevent cardiovascular complications.",
  },
];

const seedDB = async () => {
  await connectDB(
    "mongodb+srv://briankipkiruimunyat:healthcare@cluster0.g3r77i1.mongodb.net/?retryWrites=true&w=majority&appName=healthcaremanagement"
  );
  await HealthProgram.deleteMany({}); // Clear existing data
  await HealthProgram.insertMany(programs); // Insert new data
  console.log("Database seeded!");
  mongoose.connection.close();
};

seedDB().catch((err) => console.error(err));
