import express from 'express';
import { addExpense, getExpenses } from '../controllers/expenseController.js';
import protect from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .post(protect, addExpense)
  .get(protect, getExpenses);

export default router;