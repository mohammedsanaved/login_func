import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './database/connect.js';
import router from './routes/route.js';
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

const PORT = 5000;

// HTTP GET request

app.get('/', (req, res) => {
  res.status(201).json('Home Get Request');
});
app.use('/api', router);

// start Server when we have valid connection
connectDB()
  .then(() => {
    try {
      app.listen(PORT, () => {
        console.log(`SERVER CONNECTED TO http://localhost:${PORT}`);
      });
    } catch (error) {
      console.log('Cant connect with server');
    }
  })
  .catch((error) => {
    console.log('Invalid DataBase Connection');
  });
