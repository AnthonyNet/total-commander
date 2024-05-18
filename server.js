const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3101;

// Middleware to enable CORS for the frontend to access the API
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Define API handler to serve files and folder contents based on given path
app.get("/", (req, res) => {
  const { path: requestedPath = "" } = req.query;

  // Set the absolute path to the 'users/' directory
  const absolutePath = path.join(__dirname, "users", requestedPath);

  fs.readdir(absolutePath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error("Error reading directory.", err);
      return res.status(500).json({ error: "Error reading directory." });
    }

    const fileInfo = files.map((file) => ({
      name: file.name,
      isDirectory: file.isDirectory(),
    }));

    res.json({ files: fileInfo });
  });
});

app.get("/users/*", (req, res) => {
  const requestedPath = req.params.path || "";

  // Set the absolute path to the 'users/' directory
  const absolutePath = path.join(__dirname, "users", requestedPath);
  console.log(absolutePath);

  fs.readdir(absolutePath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error("Error reading directory.", err);
      return res.status(500).json({ error: "Error reading directory." });
    }

    const fileInfo = files.map((file) => ({
      name: file.name,
      isDirectory: file.isDirectory(),
    }));

    res.json({ files: fileInfo });
  });
});

const PORT = process.env.PORT || port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
