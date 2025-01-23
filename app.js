const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const cardRoutes = require("./routes/cards");
const errorHandler = require("./middleware/errorHandler");

const PORT = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/auth", authRoutes);
app.use("/cards", cardRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
