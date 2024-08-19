import express from 'express';
import { PORT } from './config.js';



const app = express();
app.get('/', (req, res) =>  {
    console.log(res);
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`);
});
