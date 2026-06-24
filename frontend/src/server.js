import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import transactionsRouter from './routes/transactions.js';
import { sequelize } from './models/index.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/transactions', transactionsRouter);

const PORT = process.env.PORT || 3000;

async function start() {
  await sequelize.sync();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start();
