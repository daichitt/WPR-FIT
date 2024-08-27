import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'
import cors from 'cors';

app.use(cors());
// middleware
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);

const PORT = process.env.PORT || 4000; // 4000 is the default port if PORT is not set
const mongoDBURL = process.env.MONGODBURL;
import bookRoute from './routes/booksRoute.js';


const app = express();
app.use(express.json());
app.get('/', (req, res) =>  {
    console.log(res);
    res.send('Hello World');
});
app.use('/books', bookRoute);


mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });