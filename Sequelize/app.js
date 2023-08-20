require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT;
const router = require('./routes/productRoutes');

var corOptions = {
    origin: 'http://localhost:3000'
}

app.use(cors(corOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/products',router);

// app.use('/',(req,res) => {
//     res.json({name: 'Drgham'});
// })

app.listen(PORT,()=>{
    console.log(`Listening on port: ${PORT}`);
});