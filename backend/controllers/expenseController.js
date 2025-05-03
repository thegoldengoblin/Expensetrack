// Correct controller structure
import asyncHandler from 'express-async-handler';
import Expense from '../models/Expense.js';

export const addExpense = asyncHandler(async (req, res) => {
  const { description, amount, category } = req.body;
  
  const expense = await Expense.create({
    userId: req.user._id,
    description,
    amount,
    category
  });

  res.status(201).json(expense);
});

export const getExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expense.find({ userId: req.user._id })
    .sort('-createdAt');
  res.json(expenses);
});
