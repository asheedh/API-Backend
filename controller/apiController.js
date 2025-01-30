import { users, product, cart } from "../models/apiSchema.js";
import jwt from "jsonwebtoken";

// Register Logic
export const userRegister = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    // Validate input fields
    if (!userName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user already exists by email or username
    const existingUser =
      (await users.findOne({ email })) || (await users.findOne({ userName }));
    if (existingUser) {
      return res.status(409).json({
        message: "User or username already exists, please change username/email",
      });
    }

    // Create and save the new user in the database
    const newUser = new users({ userName, email, password }); // Password stored as plaintext (not recommended for production)
    await newUser.save();

    res.status(201).json({
      message: `${newUser.userName} registered successfully`,
    });
  } catch (error) {
    // Handle unexpected server errors
    res.status(500).json({
      message: "An error occurred while registering the user",
      error: error.message,
    });
  }
};

// Login Logic
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if the user exists in the database
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate the password (currently plaintext comparison)
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token for authenticated sessions
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "password", // Use an environment variable for production
      { expiresIn: "1h" } // Token valid for 1 hour
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    // Handle unexpected server errors
    res.status(500).json({
      message: "An error occurred during login",
      error: error.message,
    });
  }
};

// Add Item to Cart
export async function addCartItem(req, res) {
  try {
    // Create a new cart item from the request body
    const cartItem = new cart(req.body);
    if (!cartItem) {
      return res
        .status(404)
        .json({ message: "Item not available, unable to add item to cart" });
    }

    // Save the cart item in the database
    await cartItem.save();
    const cartItems = await cart.find().lean();
    res.status(201).json(cartItems);
  } catch (error) {
    // Handle unexpected server errors
    res.status(500).json({
      message: "Unable to add item to cart",
      error: error.message,
    });
  }
}

// Remove Item from Cart
export const removeFromCart = async (req, res) => {
  try {
    const itemId = req.params.id;
    if (!itemId) {
      return res.status(400).json({ message: "Item ID is required" });
    }

    // Find and delete the cart item by ID
    const removedItem = await cart.findByIdAndDelete(itemId);
    if (!removedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Return the updated cart items as an array
    const cartItems = await cart.find().lean();
    res.status(200).json({message: "Successfully deleted ",
      deletedItem : removedItem,
      cartItems: cartItems});

  } catch (error) {
    // Handle unexpected server errors
    res.status(500).json({
      message: "Unable to remove the item from the cart",
      error: error.message,
    });
  }
};

// Update Cart Item
export const updateCartItem = async (req, res) => {
  try {
    // Find and update the cart item by ID with new data
    const updatedItem = await cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } // Return the updated item
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    const allCartItems = await cart.find().lean();
    res.status(201).json({ message: "Item updated successfully",
      updatedItem,
      cartItems: allCartItems,
     });
  } catch (error) {
    // Handle unexpected server errors
    res.status(500).json({
      message: "Unable to update the item",
      error: error.message,
    });
  }
};

// Get All Products
export const getProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await product.find();
    if (!products.length) {
      return res.status(404).json({ message: "No products are available" });
    }
    res.status(200).json({ products });
  } catch (error) {
    // Handle unexpected server errors
    res.status(500).json({
      message: "Error in fetching products",
      error: error.message,
    });
  }
};

// Get Product Details by ID
export const productDetails = async (req, res) => {
  try {
    // Fetch product details by ID
    const productDetails = await product.findById(req.params.id);
    if (!productDetails) {
      return res.status(404).json({ message: "Product details not available" });
    }
    res.status(200).json(productDetails);
  } catch (error) {
    // Handle unexpected server errors
    res.status(500).json({
      message: "Unable to fetch product details",
      error: error.message,
      
    });
  }
};
