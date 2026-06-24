import express from 'express';
import { signup, login, credit, withdraw, history, balance } from '../controllers/transactionController.js';

const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);
router.post('/credit', credit);
router.post('/withdraw', withdraw);
router.get('/history', history);
router.get('/balance', balance);

export default router;
