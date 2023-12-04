const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const override = require('method-override');
const homeRoute = require('./routes/home');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');

const app = express();

dotenv.config()

//middleware
app.use(express.json()) //parse incoming requests
app.use(helmet());
app.use(morgan('common'));

app.use('/api/home', homeRoute);
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);




mongoose.connect((process.env.MONGO_URL))

app.listen(8080, () => {
    console.log('backend server running')
})