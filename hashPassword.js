const bcrypt = require("bcrypt");

const plainPassword = "password123";
const saltRounds = 10;

const hashedPassword = bcrypt.hashSync(plainPassword, saltRounds);
console.log(`Hashed Password: ${hashedPassword}`);
