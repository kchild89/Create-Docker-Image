const express = require("express");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const bcrypt = require("bcrypt");
const router = express.Router();
const SECRET = process.env.JWT_SECRET;

router.post("/getToken", (req, res) => {
  try {
    const { username, password } = req.body;

    const usersData = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
    const users = usersData.users;

    if (!Array.isArray(users)) {
      return res
        .status(500)
        .json({ errorMessage: "Invalid users data format" });
    }

    const user = users.find((u) => u.username === username);
    if (!user) {
      return res.status(401).json({ errorMessage: "Invalid credentials" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ errorMessage: "Invalid credentials" });
    }

    const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    console.error("Error in /getToken:", err);
    res.status(500).json({ errorMessage: "An unexpected error occurred" });
  }
});

module.exports = router;
