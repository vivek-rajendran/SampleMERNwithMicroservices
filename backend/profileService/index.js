const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const app = express();

// Fallback defaults for local execution
const PORT = process.env.PORT || 5001;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://host.docker.internal:27017/streaming-db';

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(MONGO_URL)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Health check
app.get('/health', (req, res) => {
  res.send({ status: 'OK' });
});

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 200
  },
  age: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('user', userSchema);

// Add User endpoint
app.post('/addUser', async (req, res) => {
  try {
    const { name, age } = req.body;
    if (!name || !age) {
      return res.status(400).json({ error: "Both name and age are required." });
    }

    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists." });
    }

    const newUser = new User({ name, age });
    await newUser.save();

    res.status(201).json({ msg: "User Added Successfully", user: newUser });
  } catch (err) {
    console.error('Error adding user:', err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch Users endpoint
app.get('/fetchUser', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});