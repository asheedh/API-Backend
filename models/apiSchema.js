import mongoose from "mongoose"; // Importing mongoose for MongoDB object modeling

// User Schema Definition
const userSchema = new mongoose.Schema({
  userName: { 
    type: String, // User's name
    required: true, // This field is required
    unique: true // Usernames must be unique
  },
  email: { 
    type: String, // User's email
    required: true, // This field is required
    unique: true // Emails must be unique
  },
  password: {
    type: String, // User's password
    required: true // This field is required
  },
});

// Exporting the User model based on the user schema
export const users = mongoose.model("User", userSchema);

// Product Schema Definition
const productSchema = new mongoose.Schema({
    ItemName: {
        type: String, // Name of the product
        required: true // This field is required
    },
    category: {
        type: String, // Category of the product
        required: true // This field is required
    },
    quantity: {
        type: Number, // Available quantity of the product
        required: true // This field is required
    },
    price: {
        type: Number, // Price of the product
        required: true // This field is required
    },
    description: {
        type: String, // Description of the product
        required: true // This field is required
    },
    rating: {
        type: String, // Rating of the product
        required: true // This field is required
    },
    images: {
        type: Array, // Array of image URLs for the product
        required: true // This field is required
    }
});

// Exporting the Product model based on the product schema
export const product = mongoose.model("Product", productSchema);

// Cart Schema Definition
const cartSchema = new mongoose.Schema({
    ItemName: {
        type: String, // Name of the item in the cart
        required: true // This field is required
    },
    category: {
        type: String, // Category of the item
        required: true // This field is required
    },
    count: {
        type: Number, // Quantity of the item in the cart
        required: true // This field is required
    },
    price: {
        type: Number, // Price of the item
        required: true // This field is required
    },
    images: {
        type: Array, // Array of image URLs for the item
        required: true // This field is required
    }
});

// Exporting the Cart model based on the cart schema
export const cart = mongoose.model("Cart", cartSchema);