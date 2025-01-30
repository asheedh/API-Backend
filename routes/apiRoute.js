import { addCartItem, getProducts, productDetails, removeFromCart, userRegister, login, updateCartItem } from "../controller/apiController.js";
import { authenticateUser } from "../server.js";

export function routes(app) {
    // Route to add an item to the cart (requires user authentication)
    app.post("/api/products/cart", authenticateUser, addCartItem);

    // Route to fetch all available products
    app.get("/api/products", getProducts);

    // Route to fetch details of a specific product by its ID
    app.get("/api/products/:id", productDetails);

    // Route to remove an item from the cart (requires user authentication)
    app.delete("/api/products/cart/:id", authenticateUser, removeFromCart);

    // Route for user registration
    app.post("/register", userRegister);

    // Route for user login
    app.post("/login", login);

    // Route to update Cart Item
    app.put("/api/products/cart/:id", authenticateUser, updateCartItem)
}
