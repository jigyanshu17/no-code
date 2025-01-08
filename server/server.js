import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; // Import the database connection function

// Import Routes
import formRoutes from "./routes/forms.js";
// import responseRoutes from "./routes/responses.js";

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB(); // Call the function to connect to MongoDB

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/forms", formRoutes); // For managing forms
// app.use("/api/responses", responseRoutes); // For managing form responses

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running successfully!" });
});

// Fallback Route for Undefined Endpoints
app.use((req, res, next) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
