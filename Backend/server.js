const express = require('express');
const connectDb = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();
const cors = require('cors');

connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use('/api/todo', require('./routes/todoRoutes'));
app.use('/api/category', require('./routes/categoryRoutes'));
app.use('/api/subtask', require('./routes/subtaskRoutes'));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
