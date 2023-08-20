require('dotenv').config();
const express =  require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));

app.use('/api',require('./routes/products'));

app.use('/api',require('./routes/categories'));

app.listen(PORT,()=>{
    console.log(`Listening on port: ${PORT}`);
});