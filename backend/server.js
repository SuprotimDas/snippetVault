const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const snippetRoutes = require('./routes/snippetRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/snippets', snippetRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`snippetVault Engine operating smoothly on port ${PORT}`);
  });
});