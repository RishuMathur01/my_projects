const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
//products
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);


app.use('/api/cart', require('./routes/Cart'));

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/green-basket")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const User = require("./models/User");
const authMiddleware = require("./middleware/authMiddleware");

// Register Route
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });

    await user.save();

    // Log registration details
    console.log(`New user registered: ${user.email}`);
    console.log(`User role: ${user.role}`);
    
    res.json({ message: 'Registration successful' });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});


// Login Route
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Log user info to console for debugging purposes
    console.log(`User logged in: ${user.email}`);
    console.log(`User role: ${user.role}`);
    
    // Create JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Log JWT token generation
    console.log(`JWT Token generated for ${user.email}: ${token}`);

    res.json({ token, role: user.role });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});


// Protected Route for Farmer
app.get("/api/farmer-data", authMiddleware, (req, res) => {
  if (req.user.role !== "Farmer") return res.status(403).json({ message: "Forbidden" });
  res.json({ message: "Welcome Farmer!", userId: req.user.userId });
});

// Protected Route for Consumer
app.get("/api/consumer-data", authMiddleware, (req, res) => {
  if (req.user.role !== "Consumer") return res.status(403).json({ message: "Forbidden" });
  res.json({ message: "Welcome Consumer!", userId: req.user.userId });
});

// Start Server
app.listen(5002, () => console.log("Server running on http://localhost:5002"));
