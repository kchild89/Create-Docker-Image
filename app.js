const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const cardRoutes = require("./routes/cards");
const errorHandler = require("./middleware/errorHandler");

const PORT = process.env.PORT || 3000;

const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use("/auth", authRoutes);
app.use("/cards", cardRoutes);

// Error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
