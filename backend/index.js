import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'
import Book from './models/bookModel.js';

const PORT = process.env.PORT || 4000; // 4000 is the default port if PORT is not set
const mongoDBURL = process.env.MONGODBURL;


const app = express();
app.get('/', (req, res) =>  {
    console.log(res);
    res.send('Hello World');
});

app.get('/books', async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

app.post('/book', async (req, res) => {
  try {
    if (
    !req.body.title || req.body.auther || req.body.pullisher
    ) {
      return res.status(400).json({ message: 'Title, author and publisher are required' });
    }
    const newBook = {
      title: req.body.title,
      auther: req.body.auther,
      pullisher: req.body.pullisher,
    };
    const book = await book.create(newBook);
    res.status(201).json(book);
  } catch(error){
    res.status(500).json({ message: error.message });
  }
});

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