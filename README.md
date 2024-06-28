
# Book-Review-Website

This project is a full-stack web application for managing book reviews. It allows users to perform CRUD operations (Create, Read, Update, Delete) on book reviews through a simple and intuitive interface.

## Features

- View a list of book reviews
- View detailed information about a specific book
- Add new book reviews
- Edit existing book reviews
- Delete book reviews

## Technologies Used

- **Frontend:**
  - HTML
  - CSS
  - JavaScript

- **Backend:**
  - Node.js
  - Express.js
  - Prisma ORM
  - MySQL

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- MySQL server running and accessible

### Installation

1. **Clone the repository:**

   \`\`\`bash
   git clone https://github.com/ElaineLi0320/Book-Review-Website.git
   cd Book-Review-Website
   \`\`\`

2. **Set up the backend:**

   - Navigate to the `API` folder:

     \`\`\`bash
     cd API
     \`\`\`

   - Install dependencies:

     \`\`\`bash
     npm install
     \`\`\`

   - Set up environment variables by creating a `.env` file and adding your MySQL database credentials:

     \`\`\`plaintext
     DATABASE_URL="mysql://username:password@localhost:3306/database_name"
     \`\`\`

   - Push the Prisma schema to your MySQL database:

     \`\`\`bash
     npx prisma db push
     \`\`\`

   - Start the backend server:

     \`\`\`bash
     npm start
     \`\`\`

3. **Set up the frontend:**

   - Ensure you are in the root directory of the repository:

     \`\`\`bash
     cd ..
     \`\`\`

   - Open the `index.html` file in your browser to view the application.

## API Endpoints

### Book Endpoints

- **GET /books**: Retrieve all book reviews
- **GET /books/:id**: Retrieve a single book review by ID
- **POST /books**: Create a new book review
- **PUT /books/:id**: Update a book review by ID
- **PATCH /books/:id**: Partially update a book review by ID
- **DELETE /books/:id**: Delete a book review by ID

## Example Request Bodies

### Create a New Book Review

\`\`\`json
{
  "id": 1,
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "description": "A novel set in the Roaring Twenties."
}
\`\`\`

### Update an Existing Book Review

\`\`\`json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "description": "A classic novel set in the Roaring Twenties."
}
\`\`\`

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request. Issues and feature requests are welcome.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
