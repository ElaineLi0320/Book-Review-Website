import express from "express";
import pkg from "@prisma/client";
import morgan from "morgan";
import cors from "cors";

// express init
const app = express();

// express configurations
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// Validate data types and constraints
const validateBook = (req, res, next) => {
  const { id, title, author, description } = req.body;

  // Validate ID type and range
  if (id) {
    const idNumber = parseInt(id);
    if (isNaN(idNumber) || idNumber < 0 || idNumber > 999) {
      return res
        .status(400)
        .json({ error: "ID must be a number between 0 and 999" });
    }
  } else {
    return res.status(400).json({ error: "ID must be provided" });
  }
  // Validate title
  if (typeof title !== "string" || title.trim().length === 0) {
    return res.status(400).json({ error: "Title must be a non-empty string" });
  }
  // Validate author
  if (typeof author !== "string" || author.trim().length === 0) {
    return res.status(400).json({ error: "Author must be a non-empty string" });
  }
  // Validate description length
  if (typeof description !== "string" || description.trim().length > 500) {
    return res
      .status(400)
      .json({ error: "Description must be a string of max 500 characters" });
  }

  next();
};

// ==== Endpoints ====
// Create a book review
app.post("/books", validateBook, async (req, res) => {
  const { id, title, author, description } = req.body;
  try {
    const book = await prisma.book.create({
      data: { id, title, author, description },
    });
    // Return 201 Created for successful creation
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: "Error creating book review" });
  }
});

// Get a book review by id
app.get("/books/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await prisma.book.findUnique({
      where: { id: parseInt(id) },
    });
    if (book) {
      // Return 200 OK for successful retrieval
      res.status(200).json(book);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching book review" });
  }
});

// Get all book reviews
app.get("/books", async (req, res) => {
  try {
    const books = await prisma.book.findMany();
    // Return 200 OK for successful retrieval
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: "Error fetching book reviews" });
  }
});

// update a book review by id
app.put("/books/:id", validateBook, async (req, res) => {
  const { id } = req.params;
  const { title, author, description } = req.body;
  try {
    const updatedBook = await prisma.book.update({
      where: { id: parseInt(id) },
      data: { title, author, description },
    });
    // Return 200 OK for successful update
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: "Error updating book review" });
  }
});

// Delete a book review by id
app.delete("/books/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.book.delete({
      where: { id: parseInt(id) },
    });
    // Return 204 No Content for successful deletion
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error deleting book review" });
  }
});

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000 🎉 🚀");
});
