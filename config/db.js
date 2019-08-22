// Import Package
const mongoose = require('mongoose');

// DB Config
const config = require('./default');
const db = config.mongoURI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));