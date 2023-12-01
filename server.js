const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const homeRouter = require('./routes/home');
const userRouter = require('./routes/users');

const app = express();

dotenv.config()

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

app.use('/api/home', homeRouter);
app.use('/api/users', userRouter);

mongoose.connect((process.env.MONGO_URL))

app.listen(8080, () => {
    console.log('backend server running')
})