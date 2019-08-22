const express = require('express');
const auth = require('./routes/api/auth');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const post = require('./routes/api/post');
const db = require('./config/db');
const app = express();


// Initialize Middleware
app.use(express.json({extended: false}));

app.get('/', (req, res) => res.send('Hello'));

// Use Routes
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/post', post);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Running on port ${port}`));
