const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const csrf = require('csurf');
const authMiddleware = require('./middlewares/authMiddleware');
const config = require('./config');

const app = express();
const port = 3000;

// MongoDB connection
mongoose.connect(config.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Express middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: config.sessionSecret, resave: false, saveUninitialized: true }));
app.use(csrf());
app.use(authMiddleware);

// Routes
const authRoutes = require('./routes/authRoutes');
const carRoutes = require('./routes/carRoutes');
const serviceEntryRoutes = require('./routes/serviceEntryRoutes');
app.use('/auth', authRoutes);
app.use('/cars', carRoutes);
app.use('/service-entries', serviceEntryRoutes);

// Additional configurations and error handling

// Start the server
app.listen(3000)
