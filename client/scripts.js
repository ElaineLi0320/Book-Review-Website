document.addEventListener("DOMContentLoaded", fetchBooks);

async function fetchBooks() {
  try {
    const response = await fetch("http://localhost:8000/books");
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    const books = await response.json();

    const bookListContainer = document.getElementById("book-list");
    bookListContainer.innerHTML = ""; // Clear previous content

    books.forEach((book) => {
      const bookItem = document.createElement("div");
      bookItem.classList.add("book-item");
      bookItem.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p>${book.description}</p>
        <button class="button" onclick="showDetailView(${book.id})">View Details</button>
      `;
      bookListContainer.appendChild(bookItem);
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    document.getElementById("book-list").innerHTML =
      "<p>Error loading books. Please try again later.</p>";
  }
}

function showAddForm() {
  document.getElementById("add-form").style.display = "block";
}

function closeAddForm() {
  document.getElementById("add-form").style.display = "none";
}

function showDetailView(bookId) {
  fetchBookDetails(bookId);
  document.getElementById("detail-view").style.display = "block";
}

function closeDetailView() {
  document.getElementById("detail-view").style.display = "none";
}

function showEditForm() {
  document.getElementById("edit-form").style.display = "block";
}

function closeEditForm() {
  document.getElementById("edit-form").style.display = "none";
}

async function addBook(event) {
  event.preventDefault();
  const id = parseInt(document.getElementById("id").value);
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const description = document.getElementById("description").value;

  const newBook = { id, title, author, description };

  try {
    const response = await fetch("http://localhost:8000/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });
    if (!response.ok) {
      throw new Error("Error creating book review");
    }
    closeAddForm();
    fetchBooks();
  } catch (error) {
    console.error("Error creating book review:", error);
  }
}

async function fetchBookDetails(bookId) {
  try {
    const response = await fetch(`http://localhost:8000/books/${bookId}`);
    if (!response.ok) {
      throw new Error("Error fetching book details");
    }
    const book = await response.json();
    const bookDetailsContainer = document.getElementById("book-details");
    bookDetailsContainer.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p>${book.description}</p>
    `;
    document.getElementById("edit-id").value = book.id;
    document.getElementById("edit-title").value = book.title;
    document.getElementById("edit-author").value = book.author;
    document.getElementById("edit-description").value = book.description;
    document.getElementById("editBookForm").dataset.bookId = book.id;
    document.getElementById("delete-button").dataset.bookId = book.id;
  } catch (error) {
    console.error("Error fetching book details:", error);
  }
}

async function updateBook(event) {
  event.preventDefault();
  const bookId = event.target.dataset.bookId;
  const id = parseInt(document.getElementById("edit-id").value);
  const title = document.getElementById("edit-title").value;
  const author = document.getElementById("edit-author").value;
  const description = document.getElementById("edit-description").value;

  const updatedBook = { id, title, author, description };

  try {
    const response = await fetch(`http://localhost:8000/books/${bookId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBook),
    });
    if (!response.ok) {
      throw new Error("Error updating book review");
    }
    closeEditForm();
    closeDetailView();
    fetchBooks();
  } catch (error) {
    console.error("Error updating book review:", error);
  }
}

async function deleteBook() {
  const bookId = document.getElementById("delete-button").dataset.bookId;

  try {
    const response = await fetch(`http://localhost:8000/books/${bookId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error deleting book review");
    }
    closeDetailView();
    fetchBooks();
  } catch (error) {
    console.error("Error deleting book review:", error);
  }
}
