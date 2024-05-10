// Import required modules
const express = require('express');
const userRoute = express();
const userController = require("../Controller/userController"); // Import user controller
const csvController = require("../Controller/csvController"); // Import CSV controller
const auth = require('../Middleware/authentication'); // Import authentication middleware
require("dotenv").config(); // Import dotenv for environment variables
const uploadFile = require("../Middleware/multerUpload"); // Import file upload middleware

// Middleware setup
userRoute.use(express.json());                          // Parse JSON requests
userRoute.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests
userRoute.use(express.static("public"));            // Serve static files from the "public" directory

// Authentication middleware setup
const Authentication = auth("User");

// Routes
userRoute.get("/checkAuth", Authentication, userController.checkAuth);          // Check authentication route
userRoute.post("/upload", Authentication, uploadFile, csvController.csvUpload); // Upload CSV route
userRoute.post("/register", userController.register);                           // User registration route
userRoute.post("/login", userController.login);                                  // User login route


module.exports = { userRoute };
