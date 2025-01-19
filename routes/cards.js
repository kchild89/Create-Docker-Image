const express = require("express");
const fs = require("fs");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");

// Load cards data
const getCards = () => {
  return JSON.parse(fs.readFileSync("./data/cards.json", "utf-8")).cards;
};

const saveCards = (cards) => {
  fs.writeFileSync("./data/cards.json", JSON.stringify({ cards }, null, 2));
};

// Get all cards with optional filtering
router.get("/", (req, res) => {
  const filters = req.query;
  const cards = getCards();

  // Filter cards based on query parameters
  const filteredCards = Object.keys(filters).length
    ? cards.filter((card) =>
        Object.entries(filters).every(
          ([key, value]) => card[key]?.toString() === value
        )
      )
    : cards;

  res.json(filteredCards);
});

// Create a card (protected)
router.post("/create", verifyToken, (req, res) => {
  const cards = getCards();
  const newCard = req.body;

  // Ensure unique card ID
  if (cards.some((card) => card.id === newCard.id)) {
    return res.status(400).json({ errorMessage: "Card ID must be unique" });
  }

  cards.push(newCard);
  saveCards(cards);
  res.json({ successMessage: "Card created successfully", card: newCard });
});

// Update a card by ID (protected)
router.put("/:id", verifyToken, (req, res) => {
  const cards = getCards();
  const cardIndex = cards.findIndex(
    (card) => card.id === parseInt(req.params.id)
  );

  if (cardIndex === -1) {
    return res.status(404).json({ errorMessage: "Card not found" });
  }

  // Update card details
  const updatedCard = { ...cards[cardIndex], ...req.body };
  cards[cardIndex] = updatedCard;
  saveCards(cards);
  res.json({ successMessage: "Card updated successfully", card: updatedCard });
});

// Delete a card by ID (protected)
router.delete("/:id", verifyToken, (req, res) => {
  const cards = getCards();
  const cardIndex = cards.findIndex(
    (card) => card.id === parseInt(req.params.id)
  );

  if (cardIndex === -1) {
    return res.status(404).json({ errorMessage: "Card not found" });
  }

  const deletedCard = cards.splice(cardIndex, 1);
  saveCards(cards);
  res.json({
    successMessage: "Card deleted successfully",
    card: deletedCard[0],
  });
});

module.exports = router;
