const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const User = require('./models/user.model');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});




// Route imports
const userRouter = require('./routes/user.routes');
const chatRouter = require('./routes/chatbot');
// Route middlewares
app.use('/users', userRouter);
app.use('/api/chat', chatRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
