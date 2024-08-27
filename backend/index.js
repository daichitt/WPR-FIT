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

app.post('/books', async (req, res) => {
  try {
    const { title, author, publisher } = req.body;
    if (!title || !author || !publisher) {
      return res.status(400).json({ message: 'Title, author, and publisher are required' });
    }
    const newBook = {
      title,
      author,
      publisher,
    };

    const book = await Book.create(newBook); // Assuming 'Book' is the correct model name
    return res.status(201).send(book);
  } catch (error) {
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