import express from 'express';
import Book from '../models/bookModel.js';
const router = express.Router();

router.get('/', async (req, res) =>  {
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


router.post('/', async (req, res) => {
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
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  });
  
router.get('/:id', async (req, res) =>  {
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
  
router.put('/:id', async (req, res) => {
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
  
  
router.delete('/:id', async (req, res) => {
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
export default router;