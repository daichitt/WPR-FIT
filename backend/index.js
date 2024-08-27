import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'

const PORT = process.env.PORT || 4000; // 4000 is the default port if PORT is not set
const mongoDBURL = process.env.MONGODBURL;


const app = express();
app.get('/', (req, res) =>  {
    console.log(res);
    res.send('Hello World');
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