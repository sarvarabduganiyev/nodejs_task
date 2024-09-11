require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const router = require('./routes');

const app = express();
connectDB();

app.use(express.json());
app.use('/api', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
