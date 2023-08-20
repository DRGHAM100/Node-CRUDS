import {} from 'dotenv/config'
import express  from "express";
import mongoose from "mongoose";
import userRoutes from './routes/user-routes';
import blogRoutes from './routes/blog-routes';
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use('/api/user',userRoutes);
app.use('/api/blog',blogRoutes);


mongoose.connect(process.env.DB_URL)  
.then(() => {
    console.log('Connected To DataBase');
    app.listen(PORT,() => {
        console.log(`Listening On Port: ${PORT}`);
    })
})
.catch(err => {
    console.log(err);
});

