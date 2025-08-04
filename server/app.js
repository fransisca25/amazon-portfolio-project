const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.DB_URI)
  .then(() => app.listen(5000, () => console.log("Server ready")))
  .catch((err) => console.error(err));