import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'
import Book from './models/bookModel.js';

const PORT = process.env.PORT || 4000; // 4000 is the default port if PORT is not set
const mongoDBURL = process.env.MONGODBURL;


const app = express();
app.use(express.json());
app.get('/', (req, res) =>  {
    console.log(res);
    res.send('Hello World');
});

app.get('/books', async (req, res) =>  {
  try {
    const books = await Book.find();
    res.status(200).json({
      count : books.length,
      data: books
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.get('/books/:id', async (req, res) =>  {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    console.log("books is "  , book);
    res.status(200).json({
      data: book
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/books/:id', async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publisher) {
      return res.status(400).send({ message: 'Send all reqired fields : title : author : publisher' });
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).json({ message: 'Book not found' });
    }
    return res.status(200).send({ message: 'Book updated sucefully ' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});


app.delete('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Book not found' });
    }
    return res.status(200).send({ message: 'Book deleted sucefully ' });
  } catch (error) {
    console.log(error);
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