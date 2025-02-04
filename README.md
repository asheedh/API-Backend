# Build APIs with Node.js and Express

## Description
This project is an e-commerce backend application, built using Node.js, Express, and MongoDB. It provides a RESTful API for managing products, user authentication, and shopping cart functionality.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)

## Installation Instructions
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## API Endpoints
- **POST /register**: Register a new user.
- **POST /login**: Authenticate a user and return a JWT token.
- **GET /api/products**: Retrieve all products.
- **GET /api/products/:id**: Retrieve product details by ID.
- **POST /api/products/cart**: Add an item to the shopping cart (requires authentication).
- **PUT /api/products/cart/:id**: Update the quantity of an item in the cart (requires authentication).
- **DELETE /api/products/cart/:id**: Remove an item from the cart (requires authentication).

## Usage
To use the API, send requests to the endpoints listed above. Ensure that you include the necessary authentication token in the headers for protected routes.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.

