const express = require('express');
const path = require('path');
const todoRoutes = require('./routes/todoRoutes');

const app = express();

app.set('view engine', 'ejs'); // Use EJS as the templating engine
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true })); // Middleware to parse form data
app.use(express.static('public')); // Serve static files

app.use('/', todoRoutes); // Use the routes

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));