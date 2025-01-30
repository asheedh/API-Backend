import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { routes } from "./routes/apiRoute.js";
import cors from "cors"

const app = express();
app.use(cors());

// Middleware to parse incoming JSON data
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017")
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((error) =>
    console.error("Error connecting to MongoDB:", error.message)
  );

// Register API routes
routes(app);

// Middleware to authenticate users
export function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];  

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, "password", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid JWT token" });
    }
    req.user = user;
    next();
  });
}

// Global error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
  console.log(err.message)
  next();
});

// Start the server
const PORT = 5100;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/api/products`);
});
